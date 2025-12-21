import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

interface SectorLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  heroImage: string;
  color?: "primary" | "accent";
}

const SectorLayout = ({ children, title, subtitle, heroImage, color = "primary" }: SectorLayoutProps) => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
          <div className="absolute inset-0 islamic-pattern opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link to="/">
            <Button variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-2 animate-fade-in">
            {title}
          </h1>
          <p className="text-xl text-primary-foreground/80 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {subtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Content */}
      <div className="py-12">
        {children}
      </div>
    </Layout>
  );
};

export default SectorLayout;
