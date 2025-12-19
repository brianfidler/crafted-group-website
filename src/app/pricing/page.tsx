import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing - Web Design & Development Plans",
  description: "Transparent pricing for web design and development services. Choose from flexible engagement models designed for startups and growing businesses.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function Pricing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Fractional CMO Pricing
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Executive marketing leadership at a fraction of the full-time cost
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare the value: A full-time CMO costs $200K-$400K+ annually. 
            Get the same strategic expertise with flexible engagement models.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Growth Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Flexible packages designed for different stages of business growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Tier */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Starter</CardTitle>
                <p className="text-muted-foreground mb-4">Perfect for early-stage companies needing strategic direction</p>
                <div className="text-4xl font-bold mb-2">$3,500</div>
                <p className="text-muted-foreground">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">10-15 hours per month</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Marketing strategy development</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Monthly strategy sessions</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Performance reporting</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Email and Slack support</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-muted-foreground">Limited campaign execution</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="w-full" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Growth Tier - Featured */}
            <Card className="relative border-primary shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Growth</CardTitle>
                <p className="text-muted-foreground mb-4">Ideal for scaling businesses ready to accelerate growth</p>
                <div className="text-4xl font-bold mb-2">$6,500</div>
                <p className="text-muted-foreground">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">20-30 hours per month</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Everything in Starter</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Campaign execution & management</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Team coaching & development</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Marketing automation setup</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Bi-weekly strategy calls</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="w-full" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Tier */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                <p className="text-muted-foreground mb-4">Comprehensive marketing leadership for established companies</p>
                <div className="text-4xl font-bold mb-2">$12,000</div>
                <p className="text-muted-foreground">per month</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">40+ hours per month</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Everything in Growth</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Full team leadership & hiring</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Advanced analytics & reporting</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Executive stakeholder management</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Priority support & access</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="w-full" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Value of Fractional Leadership
            </h2>
            <p className="text-xl text-muted-foreground">
              Compare the investment against traditional hiring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl text-destructive">Full-Time CMO</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Annual Salary</span>
                  <span className="font-semibold">$200K - $400K+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Benefits & Equity</span>
                  <span className="font-semibold">$50K - $100K+</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Recruiting Costs</span>
                  <span className="font-semibold">$50K - $80K</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Onboarding Time</span>
                  <span className="font-semibold">3-6 months</span>
                </div>
                <div className="flex justify-between items-center py-2 font-bold text-lg">
                  <span>Total First Year</span>
                  <span className="text-destructive">$300K - $580K+</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-primary">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl text-primary">Fractional CMO</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Monthly Investment</span>
                  <span className="font-semibold">$3.5K - $12K</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>No Benefits/Equity</span>
                  <span className="font-semibold">$0</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>No Recruiting</span>
                  <span className="font-semibold">$0</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Start Immediately</span>
                  <span className="font-semibold">1-2 weeks</span>
                </div>
                <div className="flex justify-between items-center py-2 font-bold text-lg">
                  <span>Total First Year</span>
                  <span className="text-primary">$42K - $144K</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Save 70-85% in Year One</h3>
              <p className="text-muted-foreground">
                Get the same strategic expertise and leadership with significantly lower risk and faster time to value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pricing FAQ
            </h2>
            <p className="text-xl text-muted-foreground">
              Common questions about investment and engagement
            </p>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are there setup fees or contracts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No setup fees. We work on month-to-month agreements with a 3-month minimum commitment 
                  to ensure we can implement strategies and deliver results.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What&apos;s included in the monthly hours?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All strategic planning, execution oversight, team meetings, reporting, and communication. 
                  Additional project work or campaign management may require adjusted hours.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you require minimum ad spend?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No minimum ad spend required. I work with your existing budget and help optimize 
                  allocation across channels. We&apos;ll discuss reasonable marketing budgets based on your growth goals.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I upgrade or downgrade my plan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we can adjust your engagement level based on business needs and growth stage. 
                  Changes typically take effect at the next billing cycle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started Today?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Schedule a free strategy call to discuss which plan is right for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Book Free Strategy Call</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">See Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
