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
                <p className="text-sm text-primary-foreground/70">Haramaya University Muslim Student Jemea</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 max-w-md">
              Building bridges between the Jemea and the community through Qirat, Charity, and Da'wah initiatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-accent">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Home</Link>
              <Link to="/qirat" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Qirat Sector</Link>
              <Link to="/charity" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Charity Sector</Link>
              <Link to="/dawa" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Da'wah Sector</Link>
              <Link to="/dashboard" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">Dashboard</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4 text-accent">Contact</h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold text-primary-foreground mb-1">External Affairs Amir</p>
                <p className="text-sm text-primary-foreground/90 mb-1">Mehadi Jemal</p>
                <a href="tel:+251938979492" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4" />
                  +251 938 979 492
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground mb-1">General Amir</p>
                <p className="text-sm text-primary-foreground/90 mb-1">Musab Abdurahman</p>
                <a href="tel:+251925237453" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4" />
                  +251 925 237 453
                </a>
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
