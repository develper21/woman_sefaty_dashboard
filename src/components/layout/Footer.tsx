import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram,
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const footerLinks = {
  product: [
    { label: "Safety Features", href: "/safety" },
    { label: "Health Tracking", href: "/health" },
    { label: "AI Assistant", href: "/" },
    { label: "Emergency SOS", href: "/" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about" },
    { label: "Careers", href: "/" },
    { label: "Press Kit", href: "/" },
  ],
  resources: [
    { label: "Documentation", href: "/" },
    { label: "API Reference", href: "/" },
    { label: "Support Center", href: "/contact" },
    { label: "Community", href: "/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "Cookie Policy", href: "/" },
    { label: "GDPR", href: "/" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container-wide section">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">SheGuard AI</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Empowering women through AI-driven safety and health solutions. Your trusted companion for a safer, healthier life.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:contact@sheguard.ai" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                contact@sheguard.ai
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +91 123 456 7890
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 SheGuard AI. All rights reserved. Built for COGNIVIA Hackathon.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
