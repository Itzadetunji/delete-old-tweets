import { createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import LoginWithXButton from "#/components/LoginWithXButton";
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

export const Route = createFileRoute("/")({ component: Home });

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
								<LoginWithXButton />
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
									<LoginWithXButton
										className="mt-8 w-full sm:w-auto"
										size="lg"
									>
										Get started with X
									</LoginWithXButton>
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
								<LoginWithXButton
									size="lg"
									variant="secondary"
									className="mt-8 bg-white text-primary hover:bg-white/90"
								/>
							</div>
						</div>
					</section>
				</main>
			</div>
		</ReactLenis>
	);
}
