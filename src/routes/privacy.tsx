import { createFileRoute } from "@tanstack/react-router";
import { ReactLenis } from "lenis/react";
import { Shield } from "lucide-react";
import "lenis/dist/lenis.css";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPage,
});

function PrivacyPage() {
	return (
		<ReactLenis root>
			<div className="min-h-screen bg-white text-primary overflow-x-hidden">
				{/* Header Section */}
				<section className="pt-16 pb-12 px-4 sm:px-6">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-6">
							<Shield className="w-8 h-8 text-primary" />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
							Privacy Policy
						</h1>
						<p className="text-primary/70">Last updated: February 28, 2026</p>
					</div>
				</section>

				{/* Content */}
				<section className="pb-24 px-4 sm:px-6">
					<div className="max-w-4xl mx-auto flex flex-col gap-12">
						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Introduction
							</h2>
							<p className="text-primary/80 leading-relaxed">
								Welcome to DeleteOldTweets ("we," "our," or "us"). We are
								committed to protecting your privacy and being transparent about
								how we collect, use, and protect your information. This Privacy
								Policy explains our practices when you use our service to
								search, archive, and delete your X (Twitter) posts.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Information We Collect
							</h2>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										X (Twitter) Account Information
									</h3>
									<p className="text-primary/80 leading-relaxed">
										When you connect your X account, we use X's official OAuth.
										We receive access to read your timeline and, only when you
										choose to delete, permission to delete tweets on your
										behalf. We do not store your X password or have access
										beyond what you authorize.
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										Tweet and Timeline Data
									</h3>
									<p className="text-primary/80 leading-relaxed">
										We access your tweets and timeline data only to display them
										to you, apply your chosen filters (e.g., date range,
										keywords), and perform actions you request (search, archive,
										delete). This data is processed in accordance with your
										choices and is not used for advertising or sold to third
										parties.
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										Usage Information
									</h3>
									<p className="text-primary/80 leading-relaxed">
										We may collect basic usage information such as when you use
										the service and which features you use. This helps us
										improve the product and fix issues.
									</p>
								</div>
							</div>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								How We Use Your Information
							</h2>
							<ul className="list-disc list-inside flex flex-col gap-2 text-primary/80 leading-relaxed">
								<li>To connect your X account and show your timeline</li>
								<li>To run searches and filters you set (keywords, dates)</li>
								<li>To archive or export your tweets when you request it</li>
								<li>To delete tweets only when you explicitly confirm</li>
								<li>To improve our service and fix bugs</li>
								<li>
									To communicate with you about your account or the service
								</li>
							</ul>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Third-Party Services
							</h2>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										X (Twitter) API
									</h3>
									<p className="text-primary/80 leading-relaxed">
										We use X's official API to read your timeline and perform
										deletions when you authorize them. Your use of our service
										is also subject to{" "}
										<a
											href="https://twitter.com/en/tos"
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary underline hover:no-underline"
										>
											X's Terms of Service
										</a>{" "}
										and their privacy practices. We do not control X's data
										policies.
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										Payment and Infrastructure
									</h3>
									<p className="text-primary/80 leading-relaxed">
										If you make a purchase, payment processing is handled by
										third-party providers. We do not store your full payment
										details. Our infrastructure may use standard hosting and
										analytics services; we choose providers that respect privacy
										and security.
									</p>
								</div>
							</div>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Data Sharing
							</h2>
							<p className="text-primary/80 leading-relaxed">
								We do not sell, trade, or rent your personal information. We
								only share information as necessary to:
							</p>
							<ul className="list-disc list-inside flex flex-col gap-2 text-primary/80 leading-relaxed">
								<li>
									Provide the service (e.g., X API for timeline and deletions)
								</li>
								<li>Process payments if you purchase</li>
								<li>Comply with legal obligations or lawful requests</li>
								<li>Protect our rights, safety, or property</li>
							</ul>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Data Security
							</h2>
							<p className="text-primary/80 leading-relaxed">
								We use industry-standard practices to protect your data and
								credentials. No method of transmission or storage is 100%
								secure; we strive to use commercially reasonable measures and
								cannot guarantee absolute security.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Your Rights
							</h2>
							<p className="text-primary/80 leading-relaxed">
								You can disconnect your X account at any time through X's
								settings or our app. You may request access to or deletion of
								data we hold about you. To exercise these rights or ask
								questions, contact us using the information provided in the app
								or on this site.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Data Retention
							</h2>
							<p className="text-primary/80 leading-relaxed">
								We retain your data only as long as needed to provide the
								service and as required by law. If you disconnect your account
								or delete your data, we will remove or anonymize it subject to
								any legal obligations.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Changes to This Privacy Policy
							</h2>
							<p className="text-primary/80 leading-relaxed">
								We may update this Privacy Policy from time to time. We will
								post the updated policy on this page and change the "Last
								updated" date. We encourage you to review it periodically.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Contact Us
							</h2>
							<p className="text-primary/80 leading-relaxed">
								If you have questions about this Privacy Policy or your data,
								please contact us through the application or the contact
								information provided on this site.
							</p>
						</section>
					</div>
				</section>
			</div>
		</ReactLenis>
	);
}
