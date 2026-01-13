import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  MapPin,
  AlertTriangle,
  Users,
  Eye,
  Siren,
  Phone,
  Radio,
  Camera,
  Bell,
  Route,
  Smartphone,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Real-time Threat Detection",
    description: "Our AI continuously analyzes environmental data including audio patterns, movement signatures, and contextual cues to identify potential threats before they escalate.",
    details: [
      "Multi-sensor data fusion",
      "Behavioral pattern analysis",
      "Contextual threat scoring",
      "Predictive risk assessment",
    ],
  },
  {
    icon: MapPin,
    title: "Smart Location Intelligence",
    description: "Predictive analysis of locations based on historical safety data, time of day, crowd density, and community reports to keep you informed.",
    details: [
      "Safety score for any location",
      "Time-based risk analysis",
      "Crowd density monitoring",
      "Community safety reports",
    ],
  },
  {
    icon: Siren,
    title: "Instant SOS System",
    description: "One-tap emergency activation that instantly alerts your entire safety network, shares live location, and can connect to emergency services.",
    details: [
      "One-tap activation",
      "Live location sharing",
      "Audio/video recording",
      "Direct authority connection",
    ],
  },
  {
    icon: Users,
    title: "Trusted Circle Network",
    description: "Build your personal safety network with family, friends, and verified community members who can monitor your journeys and respond to emergencies.",
    details: [
      "Unlimited trusted contacts",
      "Journey sharing",
      "Check-in reminders",
      "Network alerts",
    ],
  },
  {
    icon: Route,
    title: "Safe Route Navigation",
    description: "AI-powered route recommendations based on safety scores, well-lit areas, nearby help points, and real-time community updates.",
    details: [
      "Multi-route comparison",
      "Real-time safety updates",
      "Help point locations",
      "Alternative route suggestions",
    ],
  },
  {
    icon: Radio,
    title: "Harassment Detection",
    description: "Advanced AI analysis of audio patterns and behavioral cues to detect potential harassment situations and trigger preventive measures.",
    details: [
      "Audio pattern analysis",
      "Stress detection",
      "Automatic recording",
      "Silent alert triggers",
    ],
  },
];

const SafetyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-hero">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="gradient" className="mb-6">
                <Shield className="w-4 h-4 mr-2" />
                AI-Powered Safety
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Your Intelligent
                <span className="gradient-primary-text"> Safety Shield</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                SheGuard AI employs cutting-edge artificial intelligence to provide 
                comprehensive, proactive safety that works around the clock to protect you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl">
                  <Shield className="w-5 h-5" />
                  Activate Protection
                </Button>
                <Button variant="hero-outline" size="xl">
                  <Phone className="w-5 h-5" />
                  Emergency Contacts
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="section">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} variant="feature" className="p-0">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {feature.details.map((detail) => (
                          <div key={detail} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* SOS Demo Section */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="subtle-destructive" className="mb-4">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Emergency Response
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  SOS Activation in
                  <span className="text-destructive"> Under 3 Seconds</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  When you need help, every second counts. Our SOS system is designed 
                  for instant activation with multiple trigger methods.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Smartphone, title: "Shake Trigger", desc: "Shake your phone 3 times for silent SOS" },
                    { icon: Bell, title: "Voice Command", desc: "Say the secret phrase to activate" },
                    { icon: Camera, title: "Auto Recording", desc: "Automatic audio/video evidence capture" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                        <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 rounded-full bg-destructive/10 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute inset-8 rounded-full bg-destructive/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                  <div className="absolute inset-16 rounded-full bg-destructive/30 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="sos" size="xl" className="w-32 h-32 rounded-full text-xl font-bold">
                      SOS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container-wide">
            <Card variant="gradient" className="p-12 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Feel Protected?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Join thousands of women who trust SheGuard AI for their safety.
              </p>
              <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SafetyPage;
