import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
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
  Apple,
  Droplets,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const healthModules = [
  {
    icon: Brain,
    title: "AI Health Assistant",
    description: "Your personal AI-powered health companion that understands women's unique health needs.",
    features: [
      "24/7 health chat support",
      "Symptom analysis & guidance",
      "Personalized health tips",
      "Early warning detection",
    ],
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Calendar,
    title: "Cycle & Fertility Tracking",
    description: "Intelligent menstrual and fertility tracking with accurate predictions and insights.",
    features: [
      "Period prediction",
      "Fertility window tracking",
      "PMS symptom logging",
      "Mood pattern analysis",
    ],
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Stethoscope,
    title: "Health Risk Detection",
    description: "ML models trained to detect early signs of women-specific health conditions.",
    features: [
      "PCOS early detection",
      "Thyroid monitoring",
      "Hormonal balance tracking",
      "Risk assessment reports",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Moon,
    title: "Mental Wellness",
    description: "Comprehensive mental health support designed for women's unique challenges.",
    features: [
      "Stress tracking",
      "Guided meditation",
      "Mood journaling",
      "Professional resources",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Pill,
    title: "Medication Management",
    description: "Smart medication scheduling with reminders and interaction checks.",
    features: [
      "Smart reminders",
      "Drug interaction alerts",
      "Refill notifications",
      "Adherence tracking",
    ],
    color: "from-teal-500 to-green-500",
  },
  {
    icon: Apple,
    title: "Nutrition & Fitness",
    description: "Personalized nutrition and fitness guidance based on your health profile.",
    features: [
      "Cycle-based nutrition",
      "Workout recommendations",
      "Water intake tracking",
      "Calorie management",
    ],
    color: "from-orange-500 to-amber-500",
  },
];

const healthMetrics = [
  { label: "Health Score", value: "92%", status: "Excellent", icon: Heart },
  { label: "Sleep Quality", value: "7.5h", status: "Good", icon: Moon },
  { label: "Stress Level", value: "Low", status: "Managed", icon: Brain },
  { label: "Cycle Status", value: "Day 14", status: "Fertile", icon: Droplets },
];

const HealthPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-hero">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                <Heart className="w-4 h-4 mr-2" />
                AI Health Intelligence
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Personalized Health Insights
                <span className="block text-secondary">Powered by AI</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                SheGuard AI understands women's unique health journey, providing proactive care, 
                early detection, and personalized wellness guidance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" size="xl">
                  <Heart className="w-5 h-5" />
                  Start Health Journey
                </Button>
                <Button variant="hero-outline" size="xl">
                  <Sparkles className="w-5 h-5" />
                  Talk to AI Doctor
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Health Dashboard Preview */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="subtle-secondary" className="mb-4">
                <Activity className="w-4 h-4 mr-2" />
                Health Dashboard
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Your Health at a Glance
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Real-time health metrics analyzed by AI to give you actionable insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {healthMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <Card key={metric.label} variant="elevated" className="text-center p-6">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className="text-3xl font-display font-bold mb-1">{metric.value}</p>
                    <Badge variant="subtle-success" className="text-xs">{metric.status}</Badge>
                  </Card>
                );
              })}
            </div>

            {/* Trend Chart Placeholder */}
            <Card variant="elevated" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-lg">Health Trends</h3>
                  <p className="text-sm text-muted-foreground">Last 30 days analysis</p>
                </div>
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
              <div className="h-48 bg-muted/50 rounded-xl flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Interactive health trends chart</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Health Modules */}
        <section className="section">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="gradient" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Health Modules
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Comprehensive Health Management
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every aspect of your health, monitored and optimized by AI.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthModules.map((module) => {
                const Icon = module.icon;
                return (
                  <Card key={module.title} variant="feature" className="overflow-hidden">
                    <div className={`h-1 bg-gradient-to-r ${module.color}`} />
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                      <ul className="space-y-2">
                        {module.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${module.color}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Doctor Chat Preview */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="subtle-primary" className="mb-4">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Health Assistant
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Your Personal AI Doctor,
                  <span className="text-secondary"> Always Available</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Get instant health guidance, symptom analysis, and personalized recommendations 
                  from our AI trained on women's health data. Available 24/7, private and secure.
                </p>
                <div className="space-y-4">
                  {[
                    "Symptom checker with 95% accuracy",
                    "Personalized health recommendations",
                    "Early warning for health conditions",
                    "Connect to real doctors when needed",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" size="lg" className="mt-8">
                  Start Chat with AI Doctor
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <Card variant="elevated" className="overflow-hidden">
                <div className="p-4 border-b border-border bg-secondary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Dr. AI Assistant</p>
                      <p className="text-xs text-muted-foreground">Online • Women's Health Specialist</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-4 h-64 overflow-y-auto">
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                      <p className="text-sm">Hello! I'm here to help with any health questions. What would you like to discuss today?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-secondary text-secondary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[80%]">
                      <p className="text-sm">I've been experiencing irregular periods lately</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                      <p className="text-sm">I understand. Let me ask a few questions to better understand your situation. How long have you noticed this irregularity?</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container-wide">
            <Card className="p-12 text-center bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 border-0 text-white">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Take Control of Your Health Today
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Join the health revolution designed specifically for women.
              </p>
              <Button variant="secondary" size="xl" className="bg-white text-rose-600 hover:bg-white/90">
                Start Free Health Assessment
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

export default HealthPage;
