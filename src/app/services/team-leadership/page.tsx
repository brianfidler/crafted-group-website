import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamLeadership() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Marketing Team Leadership & Coaching
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Build high-performing marketing teams that drive sustainable growth
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform marketing teams through strategic leadership, coaching, and alignment 
            with business objectives for maximum impact and productivity.
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Leadership Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Research-backed data on effective team leadership outcomes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">67%</div>
                <p className="text-sm text-muted-foreground">
                  Higher employee engagement with effective leadership vs. poor leadership*
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">25%</div>
                <p className="text-sm text-muted-foreground">
                  Increase in team productivity with proper coaching and development*
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <p className="text-sm text-muted-foreground">
                  Lower turnover rates in teams with strong leadership and clear vision
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">2.3x</div>
                <p className="text-sm text-muted-foreground">
                  Better financial performance for organizations with engaged teams*
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              *Sources: <a href="https://www.americanexpress.com/en-us/business/trends-and-insights/articles/9-ways-to-help-lead-your-team-more-effectively/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">American Express Business Leadership Research</a>, 
              <a href="https://www.peptalk.com/post/10-leadership-techniques-to-build-high-performing-teams" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer"> PepTalk Leadership Studies</a>
            </p>
          </div>
        </div>
      </section>

      {/* Core Leadership Areas */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leadership Development Areas
            </h2>
            <p className="text-xl text-muted-foreground">
              Strategic focus areas for building exceptional marketing teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2V3a2 2 0 012-2h4a2 2 0 012 2v5z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Strategic Communication</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Develop clear, transparent communication that aligns teams with business objectives and fosters collaboration.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Vision articulation and goal alignment frameworks
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Cross-functional collaboration protocols
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Active listening and feedback systems
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Transparent decision-making processes
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
                  <CardTitle className="text-xl">Team Development & Coaching</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Build individual capabilities and team cohesion through structured development programs and mentoring.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Individual skill assessment and development plans
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mentoring and coaching methodologies
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Career advancement pathway creation
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Team building and collaboration enhancement
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Performance Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Establish clear performance standards, measurement systems, and accountability frameworks for consistent results.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    KPI development and tracking systems
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Regular performance review processes
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Recognition and reward systems
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Constructive feedback and improvement plans
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
                  <CardTitle className="text-xl">Sales & Marketing Alignment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Bridge the gap between marketing and sales teams for unified revenue generation and customer experience.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Shared goals and metrics development
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Lead qualification and handoff processes
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Joint planning and strategy sessions
                  </li>
                  <li className="flex items-start">
                    <svg className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Customer feedback loop optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Methodology */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leadership Development Framework
            </h2>
            <p className="text-xl text-muted-foreground">
              Proven methodology for building high-performing marketing teams
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Team Assessment & Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive evaluation of current team dynamics, individual strengths, skill gaps, 
                  and organizational alignment. This foundation phase identifies opportunities for 
                  improvement and establishes baseline performance metrics.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Activities:</strong> Skills assessment, team dynamics evaluation, 
                  communication audit, performance review analysis, goal alignment assessment
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Leadership Structure & Vision Development</h3>
                <p className="text-muted-foreground mb-4">
                  Establish clear organizational structure, define roles and responsibilities, 
                  and create a compelling vision that aligns team efforts with business objectives. 
                  Focus on building trust and establishing leadership credibility.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Activities:</strong> Organizational design, vision articulation, 
                  role clarification, communication protocols, leadership development planning
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Skill Development & Coaching Implementation</h3>
                <p className="text-muted-foreground mb-4">
                  Launch targeted development programs addressing identified skill gaps and 
                  career aspirations. Implement coaching frameworks and mentorship programs 
                  to accelerate individual and team growth.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Activities:</strong> Training program delivery, one-on-one coaching, 
                  mentorship matching, skill workshops, certification support
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Performance Optimization & Culture Building</h3>
                <p className="text-muted-foreground mb-4">
                  Establish sustainable performance management systems, recognition programs, 
                  and cultural initiatives that maintain high engagement and productivity. 
                  Focus on building a culture of continuous improvement and innovation.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Key Activities:</strong> Performance system implementation, culture initiatives, 
                  recognition programs, team building events, continuous improvement processes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Leadership Techniques */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Evidence-Based Leadership Techniques
            </h2>
            <p className="text-xl text-muted-foreground">
              Research-proven approaches for effective team leadership
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2V3a2 2 0 012-2h4a2 2 0 012 2v5z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Active Listening & Feedback</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Create environments where team members feel heard and valued. 
                  Active listening increases trust and leads to 25% better team performance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Clear Vision Communication</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Articulate compelling organizational vision that provides direction and purpose. 
                  Clear vision increases employee engagement by up to 67%.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Growth Mindset Development</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Foster continuous learning and adaptability within teams. 
                  Growth mindset approaches increase team resilience and innovation by 40%.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Effective Delegation</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Empower team members through strategic task assignment and autonomy. 
                  Proper delegation increases team capability and leader effectiveness by 30%.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Recognition & Appreciation</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Implement systematic recognition programs that acknowledge contributions. 
                  Regular recognition increases employee retention by 31% and productivity by 12%.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-center">Innovation & Collaboration</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Encourage cross-functional collaboration and creative problem-solving. 
                  Collaborative teams are 5x more likely to achieve high performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Development Outcomes */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expected Development Outcomes
            </h2>
            <p className="text-xl text-muted-foreground">
              Measurable improvements from strategic team leadership initiatives
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl">Short-term Wins (30-90 days)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Improved team communication and transparency
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Clear role definitions and accountability structures
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Enhanced sales and marketing alignment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Streamlined processes and decision-making
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Increased team morale and engagement
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-xl">Long-term Impact (6-12 months)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    25-40% improvement in team productivity metrics
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Reduced employee turnover and increased retention
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Enhanced skill sets and career development pathways
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Self-sustaining high-performance culture
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Measurable business impact and revenue growth
                  </li>
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
                <a href="https://www.americanexpress.com/en-us/business/trends-and-insights/articles/9-ways-to-help-lead-your-team-more-effectively/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  American Express: 9 Ways to Help Lead Your Team More Effectively (2024)
                </a>
              </li>
              <li>
                <a href="https://www.peptalk.com/post/10-leadership-techniques-to-build-high-performing-teams" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  PepTalk: 10 Leadership Techniques to Build High-Performing Teams (2024)
                </a>
              </li>
              <li>
                <a href="https://www.forbes.com/sites/forbesbooksauthors/2024/12/04/leadership-techniques-how-to-lead-effectively/" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                  Forbes: Leadership Techniques - How to Lead Effectively (2024)
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
            Ready to Transform Your Marketing Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's develop the leadership capabilities and team culture that drive 
            exceptional marketing performance and business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Schedule Leadership Assessment</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/case-studies">View Team Transformations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
