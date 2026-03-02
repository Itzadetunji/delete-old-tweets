import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuthStore } from "../stores/auth-store";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "App",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: RootNotFound,
});

function RootNotFound() {
	return (
		<main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
			<h1 className="text-3xl font-semibold tracking-tight text-primary">
				Page not found
			</h1>
			<p className="mt-3 text-sm text-primary/70">
				The page you are looking for doesn&apos;t exist.
			</p>
			<Link
				to="/"
				className="mt-6 inline-flex rounded-md border border-primary/20 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
			>
				Go home
			</Link>
		</main>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const initializeAuth = useAuthStore((state) => state.initialize);
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const hideGlobalChrome = pathname === "/dashboard";

	useEffect(() => {
		void initializeAuth();
	}, [initializeAuth]);

	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased flex flex-col min-h-dvh wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]">
				{hideGlobalChrome ? null : <Header />}
				<div className="flex flex-col flex-1">{children}</div>
				{hideGlobalChrome ? null : <Footer />}

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
