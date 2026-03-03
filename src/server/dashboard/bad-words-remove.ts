import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import { BAD_KEYWORDS } from "#/lib/bad-keywords";
import { z } from "zod";

type XSearchPost = {
	id: string;
	text: string;
	author_id?: string;
	created_at?: string;
};

type XSearchUser = {
	id: string;
	username?: string;
	name?: string;
};

type XSearchAllResponse = {
	data?: XSearchPost[];
	includes?: {
		users?: XSearchUser[];
	};
	meta?: {
		result_count?: number;
		next_token?: string;
	};
	errors?: Array<{
		title?: string;
		detail?: string;
	}>;
};

type XProblemResponse = {
	title?: string;
	detail?: string;
	type?: string;
	status?: number;
};

type BadWordsRemoveResult =
	| {
			success: true;
			message: string;
			errors: [];
			posts: Array<{
				id: string;
				text: string;
				createdAt: string | null;
				authorUsername: string | null;
			}>;
			queryUsed: string;
			resultCount: number;
			nextToken: string | null;
	  }
	| {
			success: false;
			message: string;
			errors: string[];
	  };

const X_API_CONFIG = {
	baseUrl: "https://api.x.com",
	routes: {
		searchAllPosts: "/2/tweets/search/all",
	},
} as const;

const getXApiUrl = (route: keyof typeof X_API_CONFIG.routes) => {
	return `${X_API_CONFIG.baseUrl}${X_API_CONFIG.routes[route]}`;
};

const getAppBearerToken = () => {
	const token = process.env.X_APP_KEY;

	if (!token) {
		throw new Error(
			"Missing X app bearer token. Set X_APP_KEY in your environment.",
		);
	}

	return token;
};

const normalizeXSearchTerm = (term: string) =>
	term.toLowerCase().trim().replace(/["“”]/g, "").replace(/\s+/g, " ");

const normalizeXUsername = (username: string) => {
	const normalized = username.trim().replace(/^@+/, "");

	if (!/^[a-zA-Z0-9_]{1,15}$/.test(normalized)) {
		throw new Error("Invalid X username format for from: operator.");
	}

	return normalized;
};

const getBadWordTerms = () => {
	const flattenedTerms = Object.values(BAD_KEYWORDS).flatMap((category) => [
		...category.keywords,
		...category.phrases,
	]);

	return Array.from(
		new Set(
			flattenedTerms
				.map(normalizeXSearchTerm)
				.filter((term) => term.length > 0),
		),
	);
};

const X_QUERY_CHAR_LIMIT = 480;

const buildBadWordsOnlyQuery = (username: string) => {
	const normalizedUsername = normalizeXUsername(username);

	const terms = getBadWordTerms();
	const orSegments: string[] = [];
	let joinedLength = 0;

	for (const term of terms) {
		const escaped = term.replace(/"/g, '\\"');
		const token = `"${escaped}"`;
		const additionLength =
			orSegments.length === 0 ? token.length : token.length + 4;

		if (joinedLength + additionLength > X_QUERY_CHAR_LIMIT) {
			break;
		}

		orSegments.push(token);
		joinedLength += additionLength;
	}

	if (orSegments.length === 0) {
		throw new Error("Bad-word search terms are empty.");
	}

	return `(${orSegments.join(" OR ")}) from:${normalizedUsername}`;
};

type BadWordsRemoveParams = {
	username: string;
	nextToken?: string;
	maxResults?: number;
};

const searchBadWordsForUser = async ({
	username,
	nextToken,
	maxResults = 100,
}: BadWordsRemoveParams): Promise<BadWordsRemoveResult> => {
	const queryUsed = buildBadWordsOnlyQuery(username);
	const requestParams = {
		query: queryUsed,
		max_results: maxResults,
		"tweet.fields": "created_at,author_id",
		expansions: "author_id",
		"user.fields": "username,name",
		next_token: nextToken,
	};

	const mapResponse = (json: XSearchAllResponse) => {
		const usersById = new Map(
			(json.includes?.users ?? []).map((user) => [user.id, user]),
		);

		const posts = (json.data ?? []).map((post) => ({
			id: post.id,
			text: post.text,
			createdAt: post.created_at ?? null,
			authorUsername: post.author_id
				? (usersById.get(post.author_id)?.username ?? null)
				: null,
		}));

		return {
			posts,
			resultCount: json.meta?.result_count ?? posts.length,
			nextToken: json.meta?.next_token ?? null,
		};
	};

	try {
		const response = await axios.get<XSearchAllResponse>(
			getXApiUrl("searchAllPosts"),
			{
				headers: {
					Authorization: `Bearer ${getAppBearerToken()}`,
				},
				params: requestParams,
			},
		);

		const mappedResponse = mapResponse(response.data);

		return {
			success: true,
			message: "Bad words search completed",
			errors: [],
			posts: mappedResponse.posts,
			queryUsed,
			resultCount: mappedResponse.resultCount,
			nextToken: mappedResponse.nextToken,
		};
	} catch (error) {
		const errorMessages: string[] = [];

		if (axios.isAxiosError(error)) {
			const responseErrors = (
				error.response?.data as XSearchAllResponse | undefined
			)?.errors;
			const responseProblem = error.response?.data as
				| XProblemResponse
				| undefined;

			if (responseErrors?.length) {
				errorMessages.push(
					...responseErrors
						.map((entry) => entry.detail ?? entry.title)
						.filter((entry): entry is string => Boolean(entry)),
				);
			}

			if (!errorMessages.length && responseProblem?.detail) {
				errorMessages.push(responseProblem.detail);
			}

			if (!errorMessages.length && responseProblem?.title) {
				errorMessages.push(responseProblem.title);
			}

			if (!errorMessages.length && error.message) {
				errorMessages.push(error.message);
			}

			console.error("X bad words search request failed", {
				status: error.response?.status,
				title: responseProblem?.title,
				detail: responseProblem?.detail,
			});
		} else if (error instanceof Error) {
			errorMessages.push(error.message);
			console.error("X bad words search request failed", error.message);
		}

		if (!errorMessages.length) {
			errorMessages.push("Unable to search posts right now.");
		}

		return {
			success: false,
			message: errorMessages[0],
			errors: errorMessages,
		};
	}
};

const badWordsRemoveInputSchema = z.object({
	username: z.string().min(1, "Missing X username."),
	nextToken: z.string().optional(),
	maxResults: z.number().int().min(10).max(500).optional(),
});

export const BadWordsRemove = createServerFn({ method: "POST" })
	.inputValidator(badWordsRemoveInputSchema)
	.handler(async ({ data }) => {
		return searchBadWordsForUser({
			username: data.username,
			nextToken: data.nextToken,
			maxResults: data.maxResults,
		});
	});
