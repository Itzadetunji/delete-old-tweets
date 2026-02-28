import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import {
	Check,
	Download,
	FileSearch,
	Shield,
	Sparkles,
	Trash2,
} from "lucide-react";
import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import {
	SignedIn,
	UserButton,
	SignedOut,
	SignInButton,
	SignUpButton,
} from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/")({ component: Home });

const navItems = [
	{ label: "Features", href: "#features" },
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Pricing", href: "#pricing" },
];

const features = [
	{
		icon: FileSearch,
		title: "Search offensive tweets",
		description:
			"Find tweets that might be embarrassing or offensive with keyword and content filters. Review before you delete.",
	},
	{
		icon: Trash2,
		title: "Delete old tweets",
		description:
			"Bulk delete by date range or keyword. Clean years of timeline in minutes with a simple, guided flow.",
	},
	{
		icon: Download,
		title: "Archive & export",
		description:
			"Download your timeline as a backup before deleting. Keep a copy for yourself—nothing is lost forever.",
	},
];

const steps = [
	{
		step: 1,
		title: "Connect your X account",
		description:
			"Sign in with X (Twitter). We use official APIs—read-only until you choose to delete.",
	},
	{
		step: 2,
		title: "Set your filters",
		description:
			"Pick a date range, search for offensive or sensitive keywords, or select tweets to remove.",
	},
	{
		step: 3,
		title: "Review & delete",
		description:
			"Preview what will be removed, then confirm. Deletions are permanent on X.",
	},
];

function Home() {
	return (
		<ReactLenis root>
			<div className="min-h-screen bg-white text-primary">
				<header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 backdrop-blur-sm">
					<nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
						<div className="text-lg font-semibold tracking-tight">
							DeleteOldTweets
						</div>

						<ul className="hidden items-center gap-8 text-sm font-medium md:flex">
							{navItems.map((item) => (
								<li key={item.href}>
									<a
										className="transition-colors hover:text-primary/70"
										href={item.href}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
						<SignInButton>
							<Button>
								<XLogo />
								Login with X
							</Button>
						</SignInButton>
					</nav>
				</header>

				<main>
					{/* Hero */}
					<section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6">
						<div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/6 blur-3xl" />
						<div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-primary/4 blur-3xl" />

						<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary/80">
								<Sparkles className="size-4" />
								Clean up your timeline
							</div>
							<h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
								Delete old tweets in minutes.
							</h1>
							<p className="mt-6 max-w-2xl text-base text-primary/70 sm:text-lg">
								Connect your X account, choose the date or keyword filters, and
								remove old posts safely with a simple guided flow.
							</p>
							<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
								<SignInButton>
									<Button>
										<XLogo />
										Login with X
									</Button>
								</SignInButton>
								<a href="#features">
									<Button
										variant="outline"
										className="border-primary/20 text-primary hover:bg-primary/5"
									>
										See how it works
									</Button>
								</a>
							</div>
						</div>
					</section>

					{/* Features */}
					<section
						id="features"
						className="border-t border-primary/10 bg-primary/2 px-4 py-24 sm:px-6"
					>
						<div className="mx-auto max-w-6xl">
							<div className="mb-16 text-center">
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
									Everything you need to clean your timeline
								</h2>
								<p className="mx-auto mt-4 max-w-2xl text-primary/70">
									Search, filter, archive, and delete—all in one place.
								</p>
							</div>

							<div className="grid gap-8 md:grid-cols-3">
								{features.map((f) => (
									<div
										key={f.title}
										className="rounded-2xl border border-primary/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
									>
										<div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10">
											<f.icon className="size-6 text-primary" />
										</div>
										<h3 className="text-xl font-semibold text-primary">
											{f.title}
										</h3>
										<p className="mt-3 text-primary/70">{f.description}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* How it works */}
					<section
						id="how-it-works"
						className="border-t border-primary/10 px-4 py-24 sm:px-6"
					>
						<div className="mx-auto max-w-6xl">
							<div className="mb-16 text-center">
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
									From timeline to clean in three steps
								</h2>
								<p className="mx-auto mt-4 max-w-2xl text-primary/70">
									No scripts, no spreadsheets. Just connect, filter, and delete.
								</p>
							</div>

							<div className="grid gap-12 md:grid-cols-3">
								{steps.map((s) => (
									<div
										key={s.step}
										className="text-center"
									>
										<div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
											{s.step}
										</div>
										<h3 className="text-xl font-semibold text-primary">
											{s.title}
										</h3>
										<p className="mt-3 text-primary/70">{s.description}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Pricing */}
					<section
						id="pricing"
						className="border-t border-primary/10 bg-primary/2 px-4 py-24 sm:px-6"
					>
						<div className="mx-auto max-w-2xl">
							<div className="mb-12 text-center">
								<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
									One price. No subscription.
								</h2>
								<p className="mx-auto mt-4 max-w-xl text-primary/70">
									Pay once, use forever. No recurring charges.
								</p>
							</div>

							<div className="rounded-2xl border-2 border-primary/20 bg-white p-8 shadow-lg sm:p-10">
								<div className="text-center">
									<p className="text-sm font-semibold uppercase tracking-wider text-primary/60">
										One-time payment
									</p>
									<p className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
										$24.99
									</p>
									<p className="mt-2 text-primary/70">
										Full access to search, archive, and delete. No limits.
									</p>
									<SignInButton>
										<Button
											className="mt-8 w-full sm:w-auto"
											size="lg"
										>
											<XLogo />
											Get started with X
										</Button>
									</SignInButton>
								</div>

								<ul className="mt-10 space-y-3 border-t border-primary/10 pt-8">
									{[
										"Search offensive or sensitive tweets",
										"Bulk delete by date or keyword",
										"Archive & export before deleting",
										"Secure checkout · No subscription",
									].map((item) => (
										<li
											key={item}
											className="flex items-center gap-3 text-sm text-primary/80"
										>
											<Check className="size-4 shrink-0 text-primary" />
											{item}
										</li>
									))}
								</ul>
							</div>

							<div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-primary/60">
								<span className="flex items-center gap-2">
									<Shield className="size-4" />
									Secure
								</span>
								<span className="flex items-center gap-2">
									<Check className="size-4" />
									One-time payment
								</span>
							</div>
						</div>
					</section>

					{/* CTA */}
					<section className="border-t border-primary/10 px-4 py-24 sm:px-6">
						<div className="mx-auto max-w-4xl text-center">
							<div className="rounded-3xl bg-primary px-8 py-16 text-primary-foreground sm:px-16">
								<h2 className="text-3xl font-bold sm:text-4xl">
									Ready to clean your timeline?
								</h2>
								<p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
									Connect your X account and remove old or offensive tweets in
									minutes.
								</p>
								<SignInButton>
									<Button
										size="lg"
										variant="secondary"
										className="mt-8 bg-white text-primary hover:bg-white/90"
									>
										<XLogo />
										Login with X
									</Button>
								</SignInButton>
							</div>
						</div>
					</section>
				</main>

				<footer className="border-t border-primary/10 bg-primary text-primary-foreground">
					<div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
						<div>
							<p className="text-lg font-semibold">DeleteOldTweets</p>
							<p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
								Simple tweet cleanup tools to help you keep your profile fresh.
							</p>
						</div>

						<div>
							<p className="text-sm font-semibold text-primary-foreground/90">
								Explore
							</p>
							<ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
								<li>
									<a
										className="hover:text-primary-foreground"
										href="#features"
									>
										Features
									</a>
								</li>
								<li>
									<a
										className="hover:text-primary-foreground"
										href="#how-it-works"
									>
										How it works
									</a>
								</li>
								<li>
									<a
										className="hover:text-primary-foreground"
										href="#pricing"
									>
										Pricing
									</a>
								</li>
							</ul>
						</div>

						<div>
							<p className="text-sm font-semibold text-primary-foreground/90">
								Legal
							</p>
							<ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
								<li>
									<a
										className="hover:text-primary-foreground"
										href="/privacy"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										className="hover:text-primary-foreground"
										href="/terms"
									>
										Terms of Service
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-primary-foreground/10">
						<div className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-primary-foreground/60 sm:px-6">
							© {new Date().getFullYear()} DeleteOldTweets. All rights reserved.
						</div>
					</div>
				</footer>
			</div>
		</ReactLenis>
	);
}

function XLogo() {
	return (
		<svg
			viewBox="0 0 1200 1227"
			fill="currentColor"
			role="img"
			className="size-4"
			aria-hidden="true"
		>
			<path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
		</svg>
	);
}
