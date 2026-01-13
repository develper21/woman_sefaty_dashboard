import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Lightbulb, 
  Cpu, 
  Layers, 
  Zap,
  Database,
  Cloud,
  Smartphone,
  Lock
} from "lucide-react";

const techStack = [
  {
    icon: Cpu,
    title: "Agentic AI Architecture",
    description: "Autonomous decision-making agents that observe, reason, and act to protect you in real-time.",
  },
  {
    icon: Database,
    title: "ML-Powered Predictions",
    description: "Custom machine learning models trained on anonymized safety and health datasets for accurate predictions.",
  },
  {
    icon: Layers,
    title: "Multi-Modal Analysis",
    description: "Processes audio, visual, location, and behavioral data for comprehensive threat assessment.",
  },
  {
    icon: Cloud,
    title: "Edge + Cloud Computing",
    description: "Critical processing on-device for instant response, with cloud backup for complex analysis.",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Native apps for iOS and Android with wearable device integration for seamless protection.",
  },
  {
    icon: Lock,
    title: "Privacy-First Design",
    description: "End-to-end encryption, on-device processing, and zero-knowledge architecture for complete privacy.",
  },
];

export function TechArchitecture() {
  return (
    <section className="section bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <Badge variant="gradient" className="mb-4">
            <Lightbulb className="w-4 h-4 mr-2" />
            Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Built on Cutting-Edge
            <span className="gradient-primary-text"> AI Technology</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform leverages the latest in artificial intelligence, 
            machine learning, and edge computing for unparalleled protection.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <Card key={tech.title} variant="feature" className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{tech.title}</h3>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Architecture Diagram */}
        <Card variant="elevated" className="overflow-hidden">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-center mb-8">System Architecture</h3>
            <div className="relative">
              {/* Simplified Architecture Visualization */}
              <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                {/* Input Layer */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-center text-muted-foreground mb-4">Input Layer</div>
                  {["Sensors", "Location", "Audio", "Camera"].map((item) => (
                    <div key={item} className="p-3 rounded-xl bg-muted text-center text-sm font-medium">
                      {item}
                    </div>
                  ))}
                </div>

                {/* Processing Layer */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-center text-muted-foreground mb-4">AI Processing</div>
                  <div className="p-4 rounded-xl gradient-primary text-primary-foreground text-center">
                    <Zap className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Agentic AI Core</div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-center text-sm font-medium text-primary">
                    Threat Analysis
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-center text-sm font-medium text-primary">
                    Health Prediction
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-center text-sm font-medium text-primary">
                    Decision Engine
                  </div>
                </div>

                {/* Output Layer */}
                <div className="space-y-3">
                  <div className="text-sm font-medium text-center text-muted-foreground mb-4">Actions</div>
                  {["Alerts", "SOS", "Guidance", "Insights"].map((item) => (
                    <div key={item} className="p-3 rounded-xl bg-success/10 text-center text-sm font-medium text-success">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection Lines */}
              <div className="absolute top-1/2 left-1/3 w-1/3 h-px bg-border -translate-y-1/2" />
              <div className="absolute top-1/2 right-1/3 w-1/3 h-px bg-border -translate-y-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
