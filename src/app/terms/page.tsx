import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Crafted Group's website and services. Understand your rights and responsibilities.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfService() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl prose prose-lg dark:prose-invert">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using the Crafted Group website and services, you agree to be
            bound by these Terms of Service. If you do not agree to these terms, please
            do not use our services.
          </p>

          <h2>Services Description</h2>
          <p>
            Crafted Group provides professional web design and development services,
            including but not limited to:
          </p>
          <ul>
            <li>Custom website design and development</li>
            <li>Full-stack web application development</li>
            <li>E-commerce solutions</li>
            <li>Content management system integration</li>
            <li>Consulting and strategy services</li>
          </ul>

          <h2>Client Responsibilities</h2>
          <p>When engaging our services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Respond to requests for feedback and approvals in a timely manner</li>
            <li>Ensure you have the rights to any content you provide</li>
            <li>Make payments according to agreed-upon terms</li>
            <li>Maintain confidentiality of project details as appropriate</li>
          </ul>

          <h2>Intellectual Property</h2>
          <h3>Our Property</h3>
          <p>
            The Crafted Group website, including its design, content, and functionality,
            is owned by Crafted Group and protected by intellectual property laws.
          </p>

          <h3>Client Projects</h3>
          <p>
            Upon full payment, clients receive ownership of custom work created
            specifically for their project, unless otherwise specified in the project
            agreement. We retain the right to showcase completed work in our portfolio.
          </p>

          <h3>Third-Party Components</h3>
          <p>
            Projects may include third-party libraries, fonts, or components subject
            to their own licenses. We will inform you of any such dependencies.
          </p>

          <h2>Payment Terms</h2>
          <ul>
            <li>Payment schedules are outlined in individual project agreements</li>
            <li>Deposits are typically required before work begins</li>
            <li>Late payments may incur additional fees</li>
            <li>Refund policies are specified in project agreements</li>
          </ul>

          <h2>Project Timelines</h2>
          <p>
            Estimated timelines are provided in good faith but may be affected by:
          </p>
          <ul>
            <li>Scope changes or additional requirements</li>
            <li>Delays in client feedback or content delivery</li>
            <li>Technical challenges discovered during development</li>
            <li>Third-party dependencies</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Crafted Group shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages,
            including but not limited to loss of profits, data, or business opportunities.
          </p>

          <h2>Warranties and Disclaimers</h2>
          <p>
            Our services are provided "as is" without warranties of any kind, either
            express or implied. We do not guarantee that our services will be
            uninterrupted, error-free, or meet all your expectations.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Crafted Group from any claims,
            damages, or expenses arising from your use of our services or violation
            of these terms.
          </p>

          <h2>Termination</h2>
          <p>
            Either party may terminate a project agreement according to its terms.
            Upon termination:
          </p>
          <ul>
            <li>Payment is due for all completed work</li>
            <li>Deliverables will be provided for paid work</li>
            <li>Confidential information must be returned or destroyed</li>
          </ul>

          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Arizona, United States.
            Any disputes shall be resolved in the courts of Arizona.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be
            effective immediately upon posting. Your continued use of our services
            constitutes acceptance of the updated terms.
          </p>

          <h2>Severability</h2>
          <p>
            If any provision of these terms is found to be unenforceable, the remaining
            provisions will continue in full force and effect.
          </p>

          <h2>Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us:</p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:hello@crafted.group" className="text-primary hover:underline">
                hello@crafted.group
              </a>
            </li>
            <li>
              Visit our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact Page
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
