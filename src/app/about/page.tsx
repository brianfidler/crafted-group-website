import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchData } from "../../../sanity/client";
import { aboutPageQuery } from "../../../sanity/lib/queries";
import { PortableText } from "@/components/portable-text";
import { HeroSection } from "@/components/hero-section";

// Type for About page data
interface AboutPageData {
  _id: string;
  title: string;
  pageTitle: string;
  pageSubtitle?: string;
  heroImage?: string;
  personalStory?: any;
  experienceTitle?: string;
  experienceContent?: any;
  expertiseTitle?: string;
  expertiseAreas?: Array<{
    area: string;
    description: string;
    icon?: any;
  }>;
  philosophyTitle?: string;
  philosophy?: any;
  locationInfo?: string;
  callToAction?: {
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

export default async function About() {
  // Fetch content from Sanity CMS
  const aboutData = await fetchData<AboutPageData>(aboutPageQuery);

  // Fallback content if CMS data is not available
  if (!aboutData) {
    return (
      <div className="flex flex-col">
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Content Loading...
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Please check your Sanity CMS configuration
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title={aboutData.pageTitle || 'About Brian Fidler'}
        subtitle={aboutData.pageSubtitle || 'Fractional CMO & Marketing Strategist'}
        heroImage={aboutData.heroImage}
        showProfileImage={true}
        secondaryButton={{
          text: 'Learn More',
          link: '/services'
        }}
      />
      
      {/* Location Badge */}
      {aboutData.locationInfo && (
        <div className="flex justify-center -mt-8 mb-12">
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            📌 {aboutData.locationInfo}
          </div>
        </div>
      )}

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Personal Story */}
            {aboutData.personalStory && (
              <div className="mb-16">
                <PortableText value={aboutData.personalStory} className="text-xl text-muted-foreground leading-relaxed" />
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Experience Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {aboutData.experienceTitle || 'Executive Marketing Leadership'}
                </h2>
                {aboutData.experienceContent && (
                  <PortableText value={aboutData.experienceContent} className="text-muted-foreground leading-relaxed" />
                )}
              </div>
              
              {/* Philosophy Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {aboutData.philosophyTitle || 'My Philosophy'}
                </h2>
                {aboutData.philosophy && (
                  <PortableText value={aboutData.philosophy} className="text-muted-foreground leading-relaxed" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      {aboutData.expertiseAreas && aboutData.expertiseAreas.length > 0 && (
        <section className="py-20 px-4 bg-muted/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {aboutData.expertiseTitle || 'Areas of Expertise'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aboutData.expertiseAreas.map((expertise: any, index: number) => (
                <Card key={index} className="p-8">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold">{expertise.area}</h3>
                    </div>
                    <p className="text-muted-foreground">
                      {expertise.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {aboutData.callToAction && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {aboutData.callToAction.title}
            </h2>
            <Button size="lg" asChild>
              <Link href={aboutData.callToAction.buttonLink || '/contact'}>
                {aboutData.callToAction.buttonText || 'Schedule a Strategy Call'}
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
