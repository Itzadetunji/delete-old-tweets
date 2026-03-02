import { createFileRoute } from "@tanstack/react-router";
import { ReactLenis } from "lenis/react";
import { FileText } from "lucide-react";
import "lenis/dist/lenis.css";

export const Route = createFileRoute("/terms")({
	component: TermsPage,
});

function TermsPage() {
	return (
		<ReactLenis root>
			<div className="bg-white text-primary overflow-x-hidden">
				{/* Header Section */}
				<section className="pt-16 pb-12 px-4 sm:px-6">
					<div className="max-w-4xl mx-auto text-center">
						<div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 mb-6">
							<FileText className="w-8 h-8 text-primary" />
						</div>
						<h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
							Terms and Conditions
						</h1>
						<p className="text-primary/70">Last updated: February 28, 2026</p>
					</div>
				</section>

				{/* Content */}
				<section className="pb-24 px-4 sm:px-6">
					<div className="max-w-4xl mx-auto flex flex-col gap-12">
						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Acceptance of Terms
							</h2>
							<p className="text-primary/80 leading-relaxed">
								By accessing and using DeleteOldTweets ("the Service"), you
								accept and agree to be bound by these terms. If you do not
								agree, please do not use the Service.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Description of Service
							</h2>
							<p className="text-primary/80 leading-relaxed">
								DeleteOldTweets is a web-based tool that lets you search,
								filter, archive, and delete your X (Twitter) posts. The Service
								connects to your X account via official APIs and performs only
								the actions you explicitly request (e.g., search by keyword,
								delete by date range).
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								User Accounts and X Connection
							</h2>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										Connecting Your X Account
									</h3>
									<p className="text-primary/80 leading-relaxed">
										To use the Service, you must connect your X account through
										X's official OAuth. You are responsible for maintaining the
										security of your X account. We do not store your X password.
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										Your Responsibility
									</h3>
									<p className="text-primary/80 leading-relaxed">
										You are responsible for all use of the Service through your
										connected account. You agree to notify us if you believe
										your account has been used without your permission.
									</p>
								</div>
							</div>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Use of the Service
							</h2>
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										Permitted Use
									</h3>
									<p className="text-primary/80 leading-relaxed">
										You may use the Service to search, archive, and delete your
										own tweets in accordance with these Terms and X's rules.
									</p>
								</div>
								<div className="flex flex-col gap-2">
									<h3 className="text-xl font-medium text-primary">
										Prohibited Use
									</h3>
									<p className="text-primary/80 leading-relaxed">
										You agree not to:
									</p>
									<ul className="list-disc list-inside flex flex-col gap-2 text-primary/80 leading-relaxed">
										<li>
											Use the Service for any illegal or unauthorized purpose
										</li>
										<li>Violate X's Terms of Service or any applicable laws</li>
										<li>Attempt to access other users' accounts or data</li>
										<li>
											Interfere with or disrupt the Service or its
											infrastructure
										</li>
										<li>
											Use the Service to automate actions in violation of X's
											rules
										</li>
									</ul>
								</div>
							</div>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								X (Twitter) and Third-Party Terms
							</h2>
							<p className="text-primary/80 leading-relaxed">
								The Service relies on X's API. Your use of X and our Service is
								subject to{" "}
								<a
									href="https://twitter.com/en/tos"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary underline hover:no-underline"
								>
									X's Terms of Service
								</a>
								. We are not responsible for X's policies, availability, or
								changes to their API. Deletions performed through our Service
								are permanent on X; we cannot restore deleted tweets.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Intellectual Property
							</h2>
							<p className="text-primary/80 leading-relaxed">
								You retain ownership of your content. The Service (including its
								design, branding, and software) is owned by us and protected by
								copyright and other laws. We grant you a limited license to use
								the Service in accordance with these Terms.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Service Availability
							</h2>
							<p className="text-primary/80 leading-relaxed">
								We aim to keep the Service available but do not guarantee
								uninterrupted access. The Service may be affected by
								maintenance, X API changes, or events outside our control. We
								are not liable for loss or damage due to unavailability.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Limitation of Liability
							</h2>
							<p className="text-primary/80 leading-relaxed">
								To the maximum extent permitted by law, we are not liable for
								any indirect, incidental, special, consequential, or punitive
								damages, or any loss of data, revenue, or goodwill, arising from
								your use of the Service. You use the Service at your own risk.
								We are not responsible for the content of your tweets or the
								consequences of deleting them.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Disclaimer of Warranties
							</h2>
							<p className="text-primary/80 leading-relaxed">
								The Service is provided "as is" and "as available." We disclaim
								all warranties, express or implied, including that the Service
								will be uninterrupted, secure, or error-free.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Termination
							</h2>
							<p className="text-primary/80 leading-relaxed">
								We may suspend or terminate your access to the Service at our
								discretion if we believe you have violated these Terms or for
								other operational or legal reasons. You may stop using the
								Service and revoke our access to your X account at any time via
								X's settings.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Changes to Terms
							</h2>
							<p className="text-primary/80 leading-relaxed">
								We may update these Terms from time to time. We will post the
								new Terms on this page and update the "Last updated" date. Your
								continued use of the Service after changes constitutes
								acceptance of the updated Terms.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Governing Law
							</h2>
							<p className="text-primary/80 leading-relaxed">
								These Terms are governed by the laws of the jurisdiction in
								which we operate, without regard to conflict of law principles.
							</p>
						</section>

						<section className="flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary">
								Contact Information
							</h2>
							<p className="text-primary/80 leading-relaxed">
								For questions about these Terms, contact us through the
								application or the contact information provided on this site.
							</p>
						</section>
					</div>
				</section>
			</div>
		</ReactLenis>
	);
}
