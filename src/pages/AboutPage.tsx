import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Lightbulb,
  Users,
  Target,
  Sparkles,
  Award,
  Globe,
  Linkedin,
  Twitter,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every feature we build prioritizes the safety and well-being of women above all else.",
  },
  {
    icon: Heart,
    title: "Empathy-Driven",
    description: "We design with deep understanding of women's unique challenges and needs.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We leverage cutting-edge AI to solve real problems in meaningful ways.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive network of women helping women stay safe and healthy.",
  },
];

const team = [
  {
    name: "Team SheGuard",
    role: "COGNIVIA 2026 Hackathon",
    description: "A passionate team of developers, designers, and AI enthusiasts building technology for women's empowerment.",
    avatar: "SG",
  },
];

const milestones = [
  { year: "2026", title: "COGNIVIA Hackathon", description: "Project conceived and developed" },
  { year: "Q2 2026", title: "Beta Launch", description: "First 1,000 users onboarded" },
  { year: "Q3 2026", title: "Public Launch", description: "Available on iOS & Android" },
  { year: "Q4 2026", title: "50K Users", description: "Expanding across India" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-hero">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="gradient" className="mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                About SheGuard AI
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Empowering Women Through
                <span className="gradient-primary-text"> Intelligent Protection</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                SheGuard AI was born from a simple belief: every woman deserves to feel safe 
                and healthy, supported by technology that truly understands her needs.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="subtle-primary" className="mb-4">
                  <Target className="w-4 h-4 mr-2" />
                  Our Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Creating a Safer, Healthier World for Women
                </h2>
                <p className="text-muted-foreground mb-6">
                  Women face unique challenges in safety and health that have long been 
                  underserved by technology. SheGuard AI bridges this gap by combining 
                  advanced artificial intelligence with deep empathy for women's experiences.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our platform doesn't just react to emergencies — it anticipates them. 
                  It doesn't just track health — it understands it. By leveraging agentic AI 
                  and custom machine learning models trained on women-centric data, we provide 
                  protection and insights that are truly personalized.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-display font-bold gradient-primary-text">50K+</p>
                    <p className="text-sm text-muted-foreground">Women Protected</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-3xl font-display font-bold gradient-primary-text">99.9%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-3xl font-display font-bold gradient-primary-text">{"<3s"}</p>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 gradient-primary rounded-3xl opacity-20 blur-3xl" />
                  <Card variant="elevated" className="relative h-full flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                        <Sparkles className="w-12 h-12 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-display font-bold mb-2">SheGuard AI</h3>
                      <p className="text-muted-foreground">AI for Women's Safety & Health</p>
                      <Badge variant="gradient" className="mt-4">COGNIVIA 2026</Badge>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="subtle-primary" className="mb-4">
                <Heart className="w-4 h-4 mr-2" />
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                What Drives Us
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every decision we make is guided by these core principles.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} variant="feature" className="text-center">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="section">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="gradient" className="mb-4">
                <Globe className="w-4 h-4 mr-2" />
                Our Journey
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Roadmap to Impact
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From hackathon project to nationwide protection platform.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
                
                {/* Timeline Items */}
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.year} className="relative flex items-start gap-6 pl-20">
                      {/* Timeline Dot */}
                      <div className="absolute left-6 w-5 h-5 rounded-full gradient-primary border-4 border-background" />
                      
                      <div className="flex-1 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                        <Badge variant={index === 0 ? "gradient" : "outline"} className="mb-2">
                          {milestone.year}
                        </Badge>
                        <h3 className="font-semibold text-lg">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="subtle-primary" className="mb-4">
                <Users className="w-4 h-4 mr-2" />
                The Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Built with Passion
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A dedicated team working to make women's lives safer and healthier.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {team.map((member) => (
                <Card key={member.name} variant="elevated" className="text-center">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                      {member.avatar}
                    </div>
                    <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                    <Badge variant="outline" className="mb-4">{member.role}</Badge>
                    <p className="text-muted-foreground text-sm mb-6">{member.description}</p>
                    <div className="flex items-center justify-center gap-4">
                      <a href="#" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container-wide">
            <Card variant="gradient" className="p-12 text-center text-primary-foreground">
              <Award className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Join Our Mission
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Be part of the movement to empower women through AI technology.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                  Partner With Us
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
