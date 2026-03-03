import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { searchMyPostsServerFn } from "../../server/dashboard/search";
import { BadWordsRemove } from "../../server/dashboard/bad-words-remove";
import { useAuthStore } from "#/stores/auth-store";

const getXUsername = (
	user: ReturnType<typeof useAuthStore.getState>["user"],
) => {
	if (!user) {
		return null;
	}

	const metadata = user.user_metadata as Record<string, unknown> | undefined;

	const usernameCandidate =
		(typeof metadata?.user_name === "string" && metadata.user_name) ||
		(typeof metadata?.preferred_username === "string" &&
			metadata.preferred_username) ||
		(typeof metadata?.username === "string" && metadata.username) ||
		null;

	return usernameCandidate;
};

const Dashboard = () => {
	const user = useAuthStore((state) => state.user);
	const username = getXUsername(user);

	const [query, setQuery] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [searchMode, setSearchMode] = useState<"manual" | "badWords">("manual");
	const [results, setResults] = useState<{
		posts: Array<{
			id: string;
			text: string;
			createdAt: string | null;
			authorUsername: string | null;
		}>;
		resultCount: number;
		nextToken: string | null;
	} | null>(null);

	const runSearch = async (nextToken?: string) => {
		if (!username) {
			setError("Unable to resolve your X username from the current session.");
			return;
		}

		setIsSearching(true);
		setSearchMode("manual");
		setError(null);

		try {
			const response = await searchMyPostsServerFn({
				data: {
					username,
					query,
					nextToken,
				},
			});

			if (!response.success) {
				setError(response.message);
				return;
			}

			setResults((current) => {
				if (!nextToken || !current) {
					return response;
				}

				return {
					...response,
					posts: [...current.posts, ...response.posts],
				};
			});
		} catch (searchError) {
			setError(
				searchError instanceof Error
					? searchError.message
					: "Unable to search posts right now.",
			);
		} finally {
			setIsSearching(false);
		}
	};

	const runBadWordsSearch = async (nextToken?: string) => {
		if (!username) {
			setError("Unable to resolve your X username from the current session.");
			return;
		}

		setIsSearching(true);
		setSearchMode("badWords");
		setError(null);

		try {
			const response = await BadWordsRemove({
				data: {
					username,
					nextToken,
				},
			});

			if (!response.success) {
				setError(response.message);
				return;
			}

			setResults((current) => {
				if (!nextToken || !current) {
					return response;
				}

				return {
					...response,
					posts: [...current.posts, ...response.posts],
				};
			});
		} catch (searchError) {
			setError(
				searchError instanceof Error
					? searchError.message
					: "Unable to search posts right now.",
			);
		} finally {
			setIsSearching(false);
		}
	};

	return (
		<section className="min-w-0">
			<Card className="border-primary/10">
				<CardHeader>
					<CardTitle>Search My Posts</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-primary/70">
						Search your X posts using the v2 search API.
					</p>

					<form
						onSubmit={(event) => {
							event.preventDefault();
							void runSearch();
						}}
						className="flex flex-col gap-3 sm:flex-row"
					>
						<Input
							value={query}
							onChange={(event) => {
								setQuery(event.target.value);
							}}
							placeholder='Query (example: "delete" OR "cleanup")'
						/>
						<Button
							type="submit"
							disabled={isSearching}
						>
							{isSearching ? "Searching..." : "Search"}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								void runBadWordsSearch();
							}}
							disabled={isSearching}
						>
							{isSearching ? "Searching..." : "Find bad posts"}
						</Button>
					</form>

					<p className="text-xs text-primary/60">
						{username
							? `Scope: from:${username}`
							: "Scope: unable to resolve X username from session"}
					</p>

					{error ? (
						<p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
							{error}
						</p>
					) : null}

					{results ? (
						<div className="space-y-3">
							<p className="text-sm text-primary/70">
								Found {results.resultCount} posts
							</p>
							<ul className="space-y-2">
								{results.posts.map((post) => (
									<li
										key={post.id}
										className="rounded-md border border-primary/10 bg-primary/5 p-3"
									>
										<p className="text-sm text-primary whitespace-pre-wrap">
											{post.text}
										</p>
										<p className="mt-2 text-xs text-primary/60">
											{post.authorUsername
												? `@${post.authorUsername}`
												: "Unknown user"}
											{post.createdAt
												? ` • ${new Date(post.createdAt).toLocaleString()}`
												: ""}
										</p>
									</li>
								))}
							</ul>

							{results.nextToken ? (
								<Button
									variant="outline"
									onClick={() => {
										if (searchMode === "badWords") {
											void runBadWordsSearch(results.nextToken ?? undefined);
											return;
										}

										void runSearch(results.nextToken ?? undefined);
									}}
									disabled={isSearching}
								>
									{isSearching ? "Loading..." : "Load more"}
								</Button>
							) : null}
						</div>
					) : null}
				</CardContent>
			</Card>
		</section>
	);
};

export const Route = createFileRoute("/(protected)/dashboard")({
	component: Dashboard,
});
