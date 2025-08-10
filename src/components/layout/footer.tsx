import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">Crafted</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Executive marketing strategy without the full-time cost. 
              Helping startups and growing businesses achieve sustainable, 
              revenue-driven growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Enter your email"
                className="flex-1 max-w-xs"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Join 500+ founders getting strategic growth tips
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Fractional CMO
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Marketing Strategy
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Team Leadership
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary">
                  Funnel Building
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/case-studies" className="text-muted-foreground hover:text-primary">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Crafted Group. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
