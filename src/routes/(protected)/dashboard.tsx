import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { useAuthStore } from "#/stores/auth-store";
import { requireAuth } from "./route";

const Dashboard = () => {
	const user = useAuthStore((state) => state.user);
	const oauthToken = useAuthStore((state) => state.oauthToken);
	const signOut = useAuthStore((state) => state.signOut);
	const isLoading = useAuthStore((state) => state.isLoading);

	return (
		<main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
			<h1 className="text-2xl font-bold tracking-tight text-primary">
				Dashboard
			</h1>
			<p className="mt-2 text-primary/70">
				Signed in as {user?.email ?? user?.user_metadata?.full_name ?? "X user"}
			</p>

			<Card className="mt-6 border-primary/10">
				<CardHeader>
					<CardTitle>OAuth Token</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-primary/70">
						Use this token for X API calls after authentication.
					</p>
					<pre className="overflow-x-auto rounded-md border border-primary/10 bg-primary/5 p-4 text-sm text-primary">
						{oauthToken ??
							"No OAuth provider token returned yet. Ensure your Supabase X provider scopes are configured."}
					</pre>
					<Button
						variant="outline"
						onClick={() => {
							void signOut();
						}}
						disabled={isLoading}
					>
						{isLoading ? "Signing out..." : "Sign out"}
					</Button>
				</CardContent>
			</Card>
		</main>
	);
};

export const Route = createFileRoute("/(protected)/dashboard")({
	beforeLoad: requireAuth,
	component: Dashboard,
});
