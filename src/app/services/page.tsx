import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Fractional CMO Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Executive marketing leadership without the full-time investment
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Book a Strategy Session</Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Fractional CMO Services Work
            </h2>
            <p className="text-xl text-muted-foreground">
              Get executive-level marketing leadership on your timeline and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Discovery & Strategy</h3>
              <p className="text-muted-foreground">
                We start with a comprehensive audit of your current marketing efforts, 
                identify gaps, and develop a strategic roadmap aligned with your business goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Implementation</h3>
              <p className="text-muted-foreground">
                Execute the strategy through hands-on campaign management, team leadership, 
                and system optimization to drive measurable results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Optimization</h3>
              <p className="text-muted-foreground">
                Continuously monitor performance, optimize campaigns, and scale successful 
                initiatives while building internal marketing capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Service Areas
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive marketing leadership across four key pillars
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Fractional CMO Leadership</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Strategic marketing leadership that drives business growth without the full-time executive cost.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Marketing strategy development and execution
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Executive reporting and stakeholder management
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Budget planning and resource allocation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Marketing technology stack optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Marketing Strategy & Execution</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Data-driven marketing frameworks that align with business objectives and drive measurable results.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Market research and competitive analysis
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Brand positioning and messaging development
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multi-channel campaign development
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Content strategy and SEO optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Team Leadership & Coaching</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Building marketing capabilities within your organization through mentorship and strategic guidance.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Marketing team assessment and development
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sales and marketing alignment
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Process development and optimization
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Performance tracking and KPI management
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Funnel & Campaign Building</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  High-converting marketing campaigns designed to generate leads and drive revenue growth.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Lead generation funnel development
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email marketing automation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Paid advertising optimization
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-primary mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Conversion rate optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Matrix */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Service Comparison Matrix
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the level of engagement that fits your needs
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-background rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-4 font-semibold">Service Area</th>
                  <th className="text-center p-4 font-semibold">Starter</th>
                  <th className="text-center p-4 font-semibold">Growth</th>
                  <th className="text-center p-4 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-4 font-medium">Strategic Planning</td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Campaign Execution</td>
                  <td className="p-4 text-center">
                    <span className="text-muted-foreground">Limited</span>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Team Leadership</td>
                  <td className="p-4 text-center">
                    <span className="text-muted-foreground">-</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-muted-foreground">Coaching</span>
                  </td>
                  <td className="p-4 text-center">
                    <svg className="w-5 h-5 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Monthly Hours</td>
                  <td className="p-4 text-center">10-15</td>
                  <td className="p-4 text-center">20-30</td>
                  <td className="p-4 text-center">40+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss which service level is right for your business and growth objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Strategy Session</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
