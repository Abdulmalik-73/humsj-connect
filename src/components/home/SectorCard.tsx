import { Link } from "react-router-dom";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  path: string;
  delay?: string;
}

const SectorCard = ({ title, description, icon: Icon, image, path, delay = "0s" }: SectorCardProps) => {
  return (
    <Link 
      to={path}
      className="group block animate-slide-up"
      style={{ animationDelay: delay }}
    >
      <article className="card-elevated overflow-hidden h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-gold">
              <Icon className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
            Learn More
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default SectorCard;
