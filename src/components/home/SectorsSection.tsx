import { BookOpen, Heart, Users } from "lucide-react";
import SectorCard from "./SectorCard";
import quranImage from "@/assets/quran-recitation.jpg";
import charityImage from "@/assets/charity-giving.jpg";
import dawaImage from "@/assets/dawa-outreach.jpg";

const sectors = [
  {
    title: "Qirat Sector",
    description: "Dedicated to Quranic recitation and education, fostering a deeper connection with the Holy Quran through proper Tajweed and memorization programs.",
    icon: BookOpen,
    image: quranImage,
    path: "/qirat",
  },
  {
    title: "Charity Sector",
    description: "Focused on community support and welfare, organizing relief efforts and humanitarian initiatives to help those in need.",
    icon: Heart,
    image: charityImage,
    path: "/charity",
  },
  {
    title: "Dawa Sector",
    description: "Committed to Islamic outreach and invitation, spreading the message of Islam through education, dialogue, and community engagement.",
    icon: Users,
    image: dawaImage,
    path: "/dawa",
  },
];

const SectorsSection = () => {
  // Three Pillars of HUMSJ Service
  return (
    <section className="py-20 bg-secondary/50 islamic-pattern" id="sectors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Sectors
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three Pillars of Service
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our specialized sectors, each dedicated to a unique aspect of 
            community service and Islamic values.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <SectorCard
              key={sector.title}
              {...sector}
              delay={`${index * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;
