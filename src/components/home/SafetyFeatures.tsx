import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Eye, 
  Siren,
  Smartphone,
  Route
} from "lucide-react";

const safetyFeatures = [
  {
    icon: Eye,
    title: "Real-time Threat Detection",
    description: "Our AI continuously monitors your surroundings using camera and sensor data to identify potential threats before they escalate.",
    badge: "Agentic AI",
  },
  {
    icon: MapPin,
    title: "Smart Location Tracking",
    description: "Predictive analysis of unsafe locations based on historical data, time of day, and crowd patterns to suggest safer routes.",
    badge: "ML Model",
  },
  {
    icon: Siren,
    title: "Instant SOS Alert",
    description: "One-tap emergency activation that instantly alerts your trusted contacts, local authorities, and shares your live location.",
    badge: "Emergency",
  },
  {
    icon: Users,
    title: "Trusted Circle Network",
    description: "Build your safety network with family and friends who can track your journeys and receive instant alerts in emergencies.",
    badge: "Community",
  },
  {
    icon: AlertTriangle,
    title: "Harassment Detection",
    description: "AI-driven analysis of audio and behavioral patterns to detect potential harassment situations and trigger preventive actions.",
    badge: "Detection",
  },
  {
    icon: Route,
    title: "Safe Route Navigation",
    description: "Get route recommendations based on safety scores, well-lit areas, police stations, and community safety reports.",
    badge: "Navigation",
  },
];

export function SafetyFeatures() {
  return (
    <section className="section bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <Badge variant="subtle-primary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Safety Features
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            AI-Powered Protection
            <span className="gradient-primary-text"> That Never Sleeps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our intelligent safety system uses cutting-edge AI to keep you protected 24/7, 
            analyzing threats and responding faster than any human could.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                variant="feature"
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-shadow duration-300">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      </div>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {feature.badge}
                      </Badge>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Smartphone className="w-4 h-4" />
            Available on iOS & Android
          </div>
        </div>
      </div>
    </section>
  );
}
