import { User, Phone, Mail } from "lucide-react";

interface AmirProfileProps {
  name: string;
  phone: string;
  email?: string;
  image?: string;
}

const AmirProfile = ({ name, phone, email }: AmirProfileProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-elegant">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
          <User className="h-8 w-8 text-primary-foreground" />
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <span className="text-sm font-medium text-accent">Sector Amir</span>
          <h3 className="font-serif text-xl font-semibold text-foreground">{name}</h3>
        </div>
      </div>
      
      {/* Contact */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <a 
          href={`tel:${phone}`}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Phone className="h-4 w-4" />
          {phone}
        </a>
        {email && (
          <a 
            href={`mailto:${email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
        )}
      </div>
    </div>
  );
};

export default AmirProfile;
