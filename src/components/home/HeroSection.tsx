import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Play,
  CheckCircle
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  "Real-time threat detection",
  "AI health assistant",
  "24/7 emergency support",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Content */}
      <div className="container-wide relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          {/* Badge */}
          <Badge variant="gradient" className="mb-6 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            AI for Women | COGNIVIA 2026 Hackathon
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
            Your AI-Powered
            <span className="block gradient-primary-text">Safety & Health</span>
            Companion
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            SheGuard AI combines advanced artificial intelligence with women-centric design to provide 
            real-time safety monitoring, intelligent health insights, and instant emergency response.
          </p>

          {/* Features List */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="w-full sm:w-auto group">
              <Shield className="w-5 h-5" />
              Start Protection Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "< 3s", label: "Alert Response" },
              { value: "50K+", label: "Women Protected" },
              { value: "24/7", label: "AI Monitoring" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold gradient-primary-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/3 left-[5%] hidden lg:block">
          <div className="glass rounded-2xl p-4 shadow-xl animate-float">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Safe Zone</p>
                <p className="text-xs text-muted-foreground">Location verified</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-[5%] hidden lg:block">
          <div className="glass rounded-2xl p-4 shadow-xl animate-float-delayed">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Health Score</p>
                <p className="text-xs text-success font-medium">92% Excellent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}
