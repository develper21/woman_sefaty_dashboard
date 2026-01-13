import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  Activity, 
  Calendar, 
  Pill, 
  Stethoscope,
  Moon,
  Apple
} from "lucide-react";

const healthFeatures = [
  {
    icon: Brain,
    title: "AI Health Assistant",
    description: "Get personalized health advice, symptom analysis, and early warning signs detection through our conversational AI assistant.",
    badge: "Agentic AI",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Calendar,
    title: "Smart Cycle Tracking",
    description: "Intelligent menstrual and fertility tracking with predictions, mood patterns, and personalized wellness recommendations.",
    badge: "Prediction",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Activity,
    title: "Wellness Monitoring",
    description: "Track vital signs, sleep patterns, stress levels, and physical activity with AI-powered insights and recommendations.",
    badge: "Monitoring",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Stethoscope,
    title: "Early Risk Detection",
    description: "ML models trained on women's health data to detect early signs of PCOS, thyroid issues, and other conditions.",
    badge: "ML Model",
    color: "from-teal-500 to-green-500",
  },
  {
    icon: Pill,
    title: "Medication Reminders",
    description: "Smart medication scheduling with drug interaction checks and adherence tracking for better health outcomes.",
    badge: "Reminders",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Moon,
    title: "Mental Wellness",
    description: "AI-guided meditation, mood tracking, and mental health resources specifically designed for women's unique needs.",
    badge: "Wellness",
    color: "from-indigo-500 to-purple-500",
  },
];

export function HealthFeatures() {
  return (
    <section className="section">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <Badge variant="subtle-secondary" className="mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Health Features
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Intelligent Health Insights
            <span className="block text-secondary"> Personalized for You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI understands women's unique health needs, providing proactive care, 
            early detection, and personalized wellness guidance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title} 
                variant="feature"
                className="group relative overflow-hidden"
              >
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
                
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 opacity-90`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
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

        {/* Health Stats */}
        <div className="mt-16 p-8 rounded-3xl gradient-primary text-primary-foreground">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Heart, value: "98%", label: "Health Accuracy" },
              { icon: Brain, value: "2M+", label: "Health Insights" },
              { icon: Apple, value: "15+", label: "Health Metrics" },
              { icon: Activity, value: "500K", label: "Active Users" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label}>
                  <Icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl font-display font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
