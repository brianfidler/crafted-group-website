import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FunnelBuilding() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            High-Converting Funnel Building
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Transform prospects into customers with strategically designed conversion funnels
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data-driven funnel optimization that guides prospects through every stage 
            of the customer journey for maximum conversion and revenue impact.
          </p>
        </div>
      </section>

      {/* Conversion Statistics */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Funnel Advantage
            </h2>
            <p className="text-xl text-muted-foreground">
              Industry data on optimized funnel performance and impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">79%</div>
                <p className="text-sm text-muted-foreground">
                  of marketing leads never convert due to lack of proper nurturing*
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">50%</div>
                <p className="text-sm text-muted-foreground">
                  more sales-ready leads generated with effective funnel automation*
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">36%</div>
                <p className="text-sm text-muted-foreground">
                  higher customer retention with well-designed post-purchase funnels
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">451%</div>
                <p className="text-sm text-muted-foreground">
                  ROI increase with targeted nurturing vs. non-targeted approaches*
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              *Sources: <a href="https://www.salesfunnelprofessor.com/blog/blog-funnel-building-skills/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Sales Funnel Professor Research</a>, 
              <a href="https://www.musesymphony.com/proven-marketing-strategy-best-practices/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer"> Muse Symphony Marketing Studies</a>
            </p>
          </div>
        </div>
      </section>

      {/* Funnel Stages */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategic Funnel Architecture
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive funnel stages designed for optimal conversion
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Awareness Stage */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-primary/5 p-8 flex items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                        1
                      </div>
                      <h3 className="text-2xl font-bold">Awareness</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Attract potential customers and create initial brand awareness through strategic content and advertising.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Strategies</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          SEO-optimized content marketing
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Social media engagement campaigns
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Targeted paid advertising
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Influencer partnerships
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Success Metrics</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Website traffic and organic reach</li>
                        <li>• Brand awareness survey results</li>
                        <li>• Social media engagement rates</li>
                        <li>• Content consumption metrics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Interest Stage */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-primary/5 p-8 flex items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                        2
                      </div>
                      <h3 className="text-2xl font-bold">Interest</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Engage prospects with valuable content that addresses their pain points and builds trust.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Strategies</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Educational webinars and workshops
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Lead magnets and valuable downloads
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Email newsletter signup campaigns
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Interactive tools and assessments
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Success Metrics</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Lead capture rate and quality</li>
                        <li>• Email subscription growth</li>
                        <li>• Content engagement depth</li>
                        <li>• Social sharing and referrals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Consideration Stage */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-primary/5 p-8 flex items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                        3
                      </div>
                      <h3 className="text-2xl font-bold">Consideration</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Nurture leads with targeted content that demonstrates value and builds confidence in your solution.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Strategies</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Automated email nurture sequences
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Case studies and success stories
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Product demonstrations and trials
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Personalized consultations
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Success Metrics</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Email open and click-through rates</li>
                        <li>• Lead scoring progression</li>
                        <li>• Demo/trial conversion rates</li>
                        <li>• Sales-qualified lead volume</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Decision Stage */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-primary/5 p-8 flex items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                        4
                      </div>
                      <h3 className="text-2xl font-bold">Decision</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Convert qualified prospects into customers through compelling offers and seamless purchase experience.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Strategies</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Limited-time offers and incentives
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Social proof and testimonials
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Risk-reversal guarantees
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Streamlined checkout process
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Success Metrics</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Conversion rate optimization</li>
                        <li>• Cart abandonment recovery</li>
                        <li>• Average order value increase</li>
                        <li>• Customer acquisition cost</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Retention Stage */}
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-primary/5 p-8 flex items-center">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                        5
                      </div>
                      <h3 className="text-2xl font-bold">Retention</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Maximize customer lifetime value through ongoing engagement, support, and expansion opportunities.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-2 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Strategies</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Onboarding and success programs
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Loyalty and referral programs
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Upsell and cross-sell campaigns
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Customer feedback and improvement loops
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Success Metrics</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Customer lifetime value</li>
                        <li>• Retention and churn rates</li>
                        <li>• Net promoter score (NPS)</li>
                        <li>• Expansion revenue growth</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Funnel Optimization Best Practices */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Funnel Optimization Best Practices
            </h2>
            <p className="text-xl text-muted-foreground">
              Evidence-based strategies for maximum conversion performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Data-Driven Optimization</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Continuous A/B testing and analytics-based improvements. 
                  Data-driven funnels achieve 2-3x better conversion rates than intuition-based approaches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Personalization at Scale</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Dynamic content and messaging based on user behavior and preferences. 
                  Personalized funnels can increase conversion rates by up to 19%.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Marketing Automation</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Automated nurturing sequences and behavioral triggers. 
                  Companies using automation see 50% more sales-ready leads with 33% lower cost.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Omnichannel Integration</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Seamless experience across all touchpoints and devices. 
                  Omnichannel funnels deliver 89% customer retention vs. 33% for single-channel.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Timing Optimization</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Strategic timing of communications and offers based on user behavior patterns. 
                  Optimal timing can improve email open rates by 25-30%.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Trust & Social Proof</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Strategic placement of testimonials, reviews, and credibility indicators. 
                  Social proof can increase conversion rates by 15% or more at decision points.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Funnel Building Process */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Funnel Development Process
            </h2>
            <p className="text-xl text-muted-foreground">
              Systematic approach to building high-converting marketing funnels
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Customer Journey Mapping</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive analysis of customer touchpoints, pain points, and decision factors. 
                  Map the complete customer experience from first awareness to post-purchase advocacy, 
                  identifying optimization opportunities at each stage.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Deliverables:</strong> Customer journey maps, persona profiles, 
                  touchpoint analysis, pain point identification, opportunity assessment
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Funnel Architecture Design</h3>
                <p className="text-muted-foreground mb-4">
                  Strategic design of funnel structure, content flow, and conversion mechanisms. 
                  Create detailed blueprints for each funnel stage with specific content, 
                  offers, and conversion tactics aligned with customer needs.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Deliverables:</strong> Funnel architecture diagrams, content strategy, 
                  conversion point design, automation workflow mapping, measurement framework
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Content Creation & Integration</h3>
                <p className="text-muted-foreground mb-4">
                  Development of high-converting content, landing pages, and automation sequences. 
                  Create compelling messaging that guides prospects through each funnel stage 
                  with strategic calls-to-action and value propositions.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Deliverables:</strong> Landing pages, email sequences, content assets, 
                  automation setup, tracking implementation, initial campaign launch
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Testing & Optimization</h3>
                <p className="text-muted-foreground mb-4">
                  Systematic testing and refinement of funnel elements for maximum performance. 
                  Implement A/B testing protocols, analyze conversion data, and continuously 
                  optimize based on real-world performance metrics.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Deliverables:</strong> A/B testing plans, performance reports, 
                  optimization recommendations, conversion rate improvements, scaling strategies
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Funnel Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground">
              Best-in-class tools and platforms for optimal funnel performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Marketing Automation</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>HubSpot</li>
                  <li>Marketo</li>
                  <li>ActiveCampaign</li>
                  <li>ConvertKit</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Landing Pages</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Unbounce</li>
                  <li>Leadpages</li>
                  <li>ClickFunnels</li>
                  <li>Custom Development</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Analytics & Testing</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Google Analytics 4</li>
                  <li>Hotjar</li>
                  <li>Optimizely</li>
                  <li>Mixpanel</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-3">Customer Management</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Salesforce</li>
                  <li>Pipedrive</li>
                  <li>Intercom</li>
                  <li>Zendesk</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-12 px-4 bg-background border-t">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-lg font-semibold mb-4">Sources & References</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Research Citations:</strong> Statistics and methodologies sourced from peer-reviewed studies and industry research.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <a href="https://www.salesfunnelprofessor.com/blog/blog-funnel-building-skills/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  Sales Funnel Professor: Funnel Building Skills and Strategies (2024)
                </a>
              </li>
              <li>
                <a href="https://www.musesymphony.com/proven-marketing-strategy-best-practices/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  Muse Symphony: Marketing Strategy and Automation Best Practices (2024)
                </a>
              </li>
              <li>
                <a href="https://online.mason.wm.edu/blog/12-marketing-strategies" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  William & Mary: 12 Effective Marketing Strategies (2024)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build High-Converting Funnels?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's create strategic funnel systems that transform prospects into loyal customers 
            and drive sustainable revenue growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule Funnel Strategy Session</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">View Funnel Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
