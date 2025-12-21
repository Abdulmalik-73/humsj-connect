import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-serif font-bold text-lg">ح</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">HUMSJ External Affairs</h3>
                <p className="text-sm text-primary-foreground/70">Haramaya University Muslim Student Jema</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 max-w-md">
              Building bridges between the Jema and the community through Qirat, Charity, and Dawa initiatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-accent">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Home</Link>
              <Link to="/qirat" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Qirat Sector</Link>
              <Link to="/charity" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Charity Sector</Link>
              <Link to="/dawa" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Dawa Sector</Link>
              <Link to="/dashboard" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Dashboard</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-accent">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:humsj@haramaya.edu.et" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                humsj@haramaya.edu.et
              </a>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4" />
                +251 912 345 678
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                Haramaya University, Ethiopia
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} HUMSJ External Affairs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
