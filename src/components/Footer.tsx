import { Link } from "@tanstack/react-router";

export default function Footer() {
	return (
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
								href="/#features"
							>
								Features
							</a>
						</li>
						<li>
							<a
								className="hover:text-primary-foreground"
								href="/#how-it-works"
							>
								How it works
							</a>
						</li>
						<li>
							<a
								className="hover:text-primary-foreground"
								href="/#pricing"
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
							<Link
								to="/privacy"
								className="hover:text-primary-foreground"
							>
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link
								to="/terms"
								className="hover:text-primary-foreground"
							>
								Terms of Service
							</Link>
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
	);
}
