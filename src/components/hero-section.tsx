import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  callToAction?: {
    title?: string;
    buttonText: string;
    buttonLink: string;
    style?: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
  showProfileImage?: boolean;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  heroImage,
  callToAction,
  secondaryButton,
  showProfileImage = false,
  className = ""
}: HeroSectionProps) {
  return (
    <section className={`relative py-20 px-4 bg-gradient-to-b from-background to-muted/50 ${className}`}>
      {/* Hero Image Background */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </div>
      )}
      
      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {title}
          {subtitle && (
            <>
              {" "}
              <span className="text-primary">{subtitle}</span>
            </>
          )}
        </h1>
        
        {description && (
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {description}
          </p>
        )}
        
        {/* Hero Image Display */}
        {heroImage && showProfileImage && (
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Call to Action Buttons */}
        {(callToAction || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {callToAction && (
              <Button size="lg" asChild>
                <Link href={callToAction.buttonLink}>
                  {callToAction.buttonText}
                </Link>
              </Button>
            )}
            {secondaryButton && (
              <Button variant="outline" size="lg" asChild>
                <Link href={secondaryButton.link}>
                  {secondaryButton.text}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
