import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Crafted Group collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl prose prose-lg dark:prose-invert">
          <h2>Introduction</h2>
          <p>
            Crafted Group ("we," "our," or "us") respects your privacy and is committed to
            protecting your personal data. This privacy policy explains how we collect, use,
            and safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Information You Provide</h3>
          <p>We may collect information you provide directly to us, including:</p>
          <ul>
            <li>Name and contact information (email address, phone number)</li>
            <li>Company name and job title</li>
            <li>Messages and communications you send to us</li>
            <li>Information provided when scheduling consultations</li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>Device and browser information</li>
            <li>IP address and general location data</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website information</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Schedule and conduct consultations</li>
            <li>Send you updates about our services (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations (e.g., hosting, analytics)</li>
            <li>Professional advisors (lawyers, accountants) as needed</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            personal data against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience. You can control
            cookie preferences through your browser settings. For more information, see our{" "}
            <Link href="/cookies" className="text-primary hover:underline">
              Cookie Policy
            </Link>.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible
            for the privacy practices of these external sites.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under 18. We do not knowingly
            collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of
            any material changes by posting the new policy on this page with an updated
            revision date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or our data practices, please
            contact us:
          </p>
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
