import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
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

type SearchMyPostsParams = {
	username: string;
	query: string;
	nextToken?: string;
	maxResults?: number;
};

type SearchMyPostsResult =
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

const buildMyPostsQuery = (username: string, query: string) => {
	const userScope = `from:${username}`;
	const trimmedQuery = query.trim();

	if (!trimmedQuery) {
		return userScope;
	}

	return `(${trimmedQuery}) ${userScope}`;
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

const searchMyPosts = async ({
	username,
	query,
	nextToken,
	maxResults = 25,
}: SearchMyPostsParams): Promise<SearchMyPostsResult> => {
	const queryUsed = buildMyPostsQuery(username, query);
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
			message: "Posts fetched successfully",
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

			console.error("X search request failed", {
				status: error.response?.status,
				title: responseProblem?.title,
				detail: responseProblem?.detail,
			});
		} else if (error instanceof Error) {
			errorMessages.push(error.message);
			console.error("X search request failed", error.message);
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

const searchInputSchema = z.object({
	username: z.string().min(1, "Missing X username."),
	query: z.string().max(4096).default(""),
	nextToken: z.string().optional(),
	maxResults: z.number().int().min(10).max(500).optional(),
});

export const searchMyPostsServerFn = createServerFn({ method: "POST" })
	.inputValidator(searchInputSchema)
	.handler(async ({ data }) => {
		return searchMyPosts({
			username: data.username,
			query: data.query,
			nextToken: data.nextToken,
			maxResults: data.maxResults,
		});
	});
