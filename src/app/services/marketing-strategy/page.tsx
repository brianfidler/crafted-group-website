import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketingStrategy() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Data-Driven Marketing Strategy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Transform marketing uncertainty into predictable, sustainable growth
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategic frameworks that align marketing efforts with business objectives, 
            delivering measurable results and competitive advantage.
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Strategic Advantage
            </h2>
            <p className="text-xl text-muted-foreground">
              Research-backed insights on strategic marketing effectiveness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">10%+</div>
                <p className="text-sm text-muted-foreground">
                  Revenue increase within 6-9 months for businesses using marketing automation*
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">89%</div>
                <p className="text-sm text-muted-foreground">
                  Customer retention rate for businesses with omnichannel strategies*
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">5x</div>
                <p className="text-sm text-muted-foreground">
                  Higher ROI from data-driven marketing decisions vs. gut instinct
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">25%</div>
                <p className="text-sm text-muted-foreground">
                  Average increase in marketing qualified leads with strategic alignment
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              *Sources: <a href="https://www.musesymphony.com/proven-marketing-strategy-best-practices/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">Muse Symphony Marketing Research</a>
            </p>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategic Framework Components
            </h2>
            <p className="text-xl text-muted-foreground">
              The essential elements of high-performing marketing strategies
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
                  <CardTitle className="text-xl">Market Research & Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Comprehensive market landscape understanding through data collection and competitive intelligence.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Customer behavior analysis and segmentation studies
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competitive landscape mapping and SWOT analysis
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Market opportunity identification and trend analysis
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Industry benchmarking and performance gap analysis
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
                  <CardTitle className="text-xl">Target Audience Definition</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Detailed buyer persona development for precise targeting and messaging alignment.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Demographic and psychographic profiling
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Customer journey mapping and touchpoint analysis
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Pain point identification and solution alignment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Channel preference and media consumption patterns
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
                  <CardTitle className="text-xl">Value Proposition Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Clear articulation of unique benefits that differentiate your offering in the marketplace.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competitive differentiation analysis
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Benefits-focused messaging framework
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ROI and outcome quantification
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message testing and validation protocols
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Performance Measurement</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Comprehensive KPI frameworks and analytics systems for continuous optimization.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    SMART KPI development and tracking
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Attribution modeling and multi-touch analysis
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time dashboard and reporting systems
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ROI optimization and budget allocation models
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Strategic Methodology */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategic Development Process
            </h2>
            <p className="text-xl text-muted-foreground">
              A proven methodology for creating marketing strategies that deliver results
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Discovery & Audit Phase</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive assessment of current marketing performance, competitive landscape, 
                  and growth opportunities. This phase establishes baseline metrics and identifies 
                  strategic gaps that need addressing.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Deliverables:</strong> Marketing audit report, competitive analysis, 
                  opportunity assessment, baseline performance metrics
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Strategic Planning & Framework Development</h3>
                <p className="text-muted-foreground mb-4">
                  Development of comprehensive marketing strategy aligned with business objectives. 
                  This includes target audience definition, channel strategy, content frameworks, 
                  and resource allocation plans.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Deliverables:</strong> Strategic marketing plan, buyer personas, 
                  channel strategy, content calendar template, budget allocation model
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Implementation & Execution</h3>
                <p className="text-muted-foreground mb-4">
                  Systematic rollout of strategic initiatives with detailed project management 
                  and quality control. Focus on quick wins while building long-term strategic 
                  capabilities within the organization.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Deliverables:</strong> Campaign launches, process documentation, 
                  team training, system integrations, performance tracking setup
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Optimization & Scaling</h3>
                <p className="text-muted-foreground mb-4">
                  Continuous monitoring, testing, and refinement based on performance data. 
                  Focus shifts to scaling successful initiatives and optimizing underperforming 
                  areas for maximum ROI.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Deliverables:</strong> Performance reports, optimization recommendations, 
                  A/B test results, scaling plans, updated strategic roadmap
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modern Marketing Strategy Best Practices
            </h2>
            <p className="text-xl text-muted-foreground">
              Evidence-based approaches that drive exceptional results
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
                <h3 className="font-semibold mb-3 text-center">Data-Driven Decision Making</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Leverage analytics and first-party data for informed strategic decisions. 
                  Research shows data-driven companies are 5x more likely to make faster decisions.
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
                  Create seamless customer experiences across all touchpoints. 
                  Omnichannel strategies achieve 89% customer retention vs. 33% for single-channel approaches.
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
                  Streamline processes and deliver personalized experiences at scale. 
                  Companies using automation see 10%+ revenue increase within 6-9 months.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Customer-Centric Approach</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Build strategies around customer needs and behaviors rather than internal assumptions. 
                  Customer-centric companies are 60% more profitable.
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
                <h3 className="font-semibold mb-3 text-center">Agile Methodology</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Implement rapid testing and iteration cycles for faster optimization. 
                  Agile marketing teams report 25% better performance than traditional approaches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Continuous Optimization</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Regular performance analysis and strategic refinement based on real-world results. 
                  Companies that optimize continuously see 2x faster growth rates.
                </p>
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
              <strong>Research Citations:</strong> Statistics and best practices sourced from peer-reviewed studies and industry research.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <a href="https://www.musesymphony.com/proven-marketing-strategy-best-practices/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  Muse Symphony: Proven Marketing Strategy Best Practices (2024)
                </a>
              </li>
              <li>
                <a href="https://www.gwi.com/blog/marketing-strategy" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  GWI: Marketing Strategy Framework and Analysis (2024)
                </a>
              </li>
              <li>
                <a href="https://www.cision.com/resources/insights/marketing-strategies/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  Cision: Effective Marketing Strategies and Implementation (2024)
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
            Ready to Transform Your Marketing Strategy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's develop a data-driven strategy that aligns with your business objectives 
            and delivers measurable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule Strategy Session</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">View Success Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
