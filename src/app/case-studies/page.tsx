import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CaseStudies() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Success Stories
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Real transformation, measurable results
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how strategic marketing leadership has transformed businesses across industries.
          </p>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {/* Case Study 1 */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-muted/50 p-8 flex items-center">
                  <div>
                    <div className="text-sm text-primary font-medium mb-2">SaaS • Series A</div>
                    <h3 className="text-2xl font-bold mb-4">TechStart Inc.</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A B2B SaaS company struggling with lead quality and lengthy sales cycles. 
                      Revenue had plateaued at $500K ARR despite significant product development investment.
                    </p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">The Challenge</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Poor lead quality resulting in 3% conversion rate</li>
                        <li>• 180-day average sales cycle</li>
                        <li>• Disconnected marketing and sales teams</li>
                        <li>• No clear customer acquisition strategy</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">The Results</h4>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">300%</div>
                          <div className="text-xs text-muted-foreground">Lead Quality</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">$2M</div>
                          <div className="text-xs text-muted-foreground">ARR in 18mo</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">90 days</div>
                          <div className="text-xs text-muted-foreground">Sales Cycle</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Brian transformed our entire go-to-market strategy. We now have a predictable 
                        pipeline and our sales team actually thanks marketing for the quality of leads."
                      </p>
                      <p className="text-sm font-medium mt-2">— Sarah Brown, CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Case Study 2 */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 order-2 lg:order-1">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">The Challenge</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• High customer acquisition costs ($450 CAC)</li>
                        <li>• 15% cart abandonment rate</li>
                        <li>• Limited organic traffic growth</li>
                        <li>• Fragmented customer experience</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">The Results</h4>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">65%</div>
                          <div className="text-xs text-muted-foreground">Lower CAC</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">40%</div>
                          <div className="text-xs text-muted-foreground">More Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">8%</div>
                          <div className="text-xs text-muted-foreground">Cart Abandon</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "The comprehensive funnel optimization Brian implemented transformed our 
                        entire customer journey. ROI improved dramatically across all channels."
                      </p>
                      <p className="text-sm font-medium mt-2">— Mike Johnson, Founder</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 p-8 flex items-center order-1 lg:order-2">
                  <div>
                    <div className="text-sm text-primary font-medium mb-2">E-commerce • Growth Stage</div>
                    <h3 className="text-2xl font-bold mb-4">GrowthCorp</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A direct-to-consumer e-commerce brand with strong products but inefficient 
                      marketing spend and suboptimal conversion rates across their funnel.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Case Study 3 */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-muted/50 p-8 flex items-center">
                  <div>
                    <div className="text-sm text-primary font-medium mb-2">Professional Services • Enterprise</div>
                    <h3 className="text-2xl font-bold mb-4">InnovateNow Consulting</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A management consulting firm struggling to differentiate in a crowded market 
                      and lacking thought leadership presence to command premium pricing.
                    </p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">The Challenge</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Commoditized pricing pressure</li>
                        <li>• No digital thought leadership presence</li>
                        <li>• Reactive business development approach</li>
                        <li>• Limited referral network activation</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">The Results</h4>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">150%</div>
                          <div className="text-xs text-muted-foreground">Avg Project Value</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">75%</div>
                          <div className="text-xs text-muted-foreground">Inbound Leads</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">4x</div>
                          <div className="text-xs text-muted-foreground">Content Reach</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "Brian helped us build a thought leadership platform that positioned us as 
                        industry experts. We now attract higher-value clients who seek us out."
                      </p>
                      <p className="text-sm font-medium mt-2">— Lisa Wang, Managing Partner</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-muted-foreground">
              Consistent performance improvements across different business models
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$15M+</div>
              <div className="text-sm text-muted-foreground">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200%</div>
              <div className="text-sm text-muted-foreground">Avg Revenue Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3x</div>
              <div className="text-sm text-muted-foreground">Lead Quality Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Client Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Framework Behind Results
            </h2>
            <p className="text-xl text-muted-foreground">
              A proven methodology for sustainable marketing transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-3">Audit & Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive analysis of current state, competitive landscape, and growth opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-3">Strategic Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Data-driven strategy development with clear KPIs, timelines, and success metrics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-3">Execute & Optimize</h3>
                <p className="text-sm text-muted-foreground">
                  Systematic implementation with continuous testing, measurement, and optimization.
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
            Ready for Your Success Story?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how we can achieve similar results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule Strategy Call</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
