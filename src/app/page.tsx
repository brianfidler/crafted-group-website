import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchData } from "../../sanity/client";
import { homePageQuery } from "../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Web Design & Development Services",
  description: "Transform your digital presence with expert web design and development. Custom websites, full-stack applications, and e-commerce solutions that drive results.",
  alternates: {
    canonical: "/",
  },
};

// Type for Home page data
interface HomePageData {
  _id: string;
  title: string;
  heroHeadline?: string;
  heroSubheading?: string;
  heroDescription?: string;
  heroImage?: string;
  heroCallToAction?: {
    title: string;
    buttonText: string;
    buttonLink: string;
    style?: string;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  servicesTitle?: string;
  servicesDescription?: string;
  testimonialsTitle?: string;
  finalCallToAction?: {
    title: string;
    buttonText: string;
    buttonLink: string;
    style?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
  };
}

export default async function Home() {
  // Fetch content from Sanity CMS
  const homeData = await fetchData<HomePageData>(homePageQuery);

  // Fallback content if CMS data is not available
  if (!homeData) {
    return (
      <div className="flex flex-col">
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Content Loading...
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Please check your Sanity CMS configuration
            </p>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        {/* Hero Image Background */}
        {homeData.heroImage && (
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
              style={{ backgroundImage: `url(${homeData.heroImage})` }}
            />
          </div>
        )}
        
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {homeData.heroHeadline || 'Transform Your Digital Presence with'} {" "}
            <span className="text-primary">{homeData.heroSubheading || 'Expert Design & Development'}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {homeData.heroDescription || 'Professional web design and development services that drive results.'}
          </p>
          
          {/* Hero Image Display */}
          {homeData.heroImage && (
            <div className="flex justify-center mb-12">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                <img 
                  src={homeData.heroImage} 
                  alt={homeData.heroHeadline || 'Fractional CMO Leadership'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href={homeData.heroCallToAction?.buttonLink || '/contact'}>
                {homeData.heroCallToAction?.buttonText || 'Start Your Project'}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          
          {/* Stats */}
          {homeData.stats && homeData.stats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {homeData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Design & Development Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From custom web design to full-stack development, we help businesses 
              create powerful digital experiences that convert.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Custom Web Design</h3>
                <p className="text-sm text-muted-foreground">Beautiful, responsive websites that convert visitors into customers</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Full-Stack Development</h3>
                <p className="text-sm text-muted-foreground">Modern web applications with robust backend systems</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">E-commerce Solutions</h3>
                <p className="text-sm text-muted-foreground">Complete online stores that drive sales and growth</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">CMS Integration</h3>
                <p className="text-sm text-muted-foreground">Content management systems that make updates easy</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from real partnerships
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-primary">SB</span>
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Brown</div>
                    <div className="text-sm text-muted-foreground">CEO, TechStart</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Crafted Group transformed our online presence. We went from struggling 
                  with an outdated website to having a modern, converting digital experience."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-primary">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">Mike Johnson</div>
                    <div className="text-sm text-muted-foreground">Founder, GrowthCorp</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The e-commerce platform Crafted Group built helped us scale from $100K 
                  to $1M in online sales in 12 months. Their expertise is invaluable."
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-primary">LW</span>
                  </div>
                  <div>
                    <div className="font-semibold">Lisa Wang</div>
                    <div className="text-sm text-muted-foreground">CMO, InnovateNow</div>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Working with Crafted Group was like having a seasoned development team 
                  on our side. Their expertise elevated our entire digital presence."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's discuss how expert design and development can accelerate your business.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}