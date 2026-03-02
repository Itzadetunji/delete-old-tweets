import { Link } from "@tanstack/react-router";
import LoginWithXButton from "./LoginWithXButton";

const navItems = [
	{ label: "Features", href: "/#features" },
	{ label: "How it works", href: "/#how-it-works" },
	{ label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 backdrop-blur-sm">
			<nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
				<Link
					to="/"
					className="text-lg font-semibold tracking-tight text-primary hover:text-primary/80 transition-colors"
				>
					DeleteOldTweets
				</Link>

				<ul className="hidden items-center gap-8 text-sm font-medium md:flex">
					{navItems.map((item) => (
						<li key={item.href}>
							<a
								className="transition-colors hover:text-primary/70 text-primary"
								href={item.href}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>

				<LoginWithXButton className="rounded-full px-6" />
			</nav>
		</header>
	);
}
