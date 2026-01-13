import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  ArrowRight, 
  Shield, 
  Heart, 
  Sparkles, 
  CheckCircle,
  Download,
  Smartphone,
  Apple,
  Play,
} from "lucide-react";

const benefits = [
  "Free forever for basic protection",
  "No credit card required",
  "Works offline for emergencies",
  "Privacy-first design",
];

export function CTASection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-95" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Your Protected Journey
          </Badge>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Join Thousands of Women
            <span className="block opacity-90">Protected by AI</span>
          </h2>

          {/* Description */}
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Take control of your safety and health with SheGuard AI. 
            Your personal AI companion is ready to protect you.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm opacity-90">
                <CheckCircle className="w-4 h-4" />
                {benefit}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="secondary" 
                  size="xl" 
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-xl group"
                >
                  <Download className="w-5 h-5" />
                  Download Free App
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="center">
                <div className="px-2 py-1.5 mb-2">
                  <p className="text-sm font-medium">Choose Your Platform</p>
                  <p className="text-xs text-muted-foreground">Download SheGuard AI</p>
                </div>
                <DropdownMenuSeparator />
                
                {/* Direct Downloads */}
                <DropdownMenuItem className="flex items-center gap-3 py-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Android</p>
                    <p className="text-xs text-muted-foreground">Download APK</p>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center gap-3 py-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center">
                    <Apple className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <p className="font-medium">iOS</p>
                    <p className="text-xs text-muted-foreground">Download IPA</p>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-2" />
                
                {/* Store Links */}
                <DropdownMenuItem className="flex items-center gap-3 py-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Google Play Store</p>
                    <p className="text-xs text-muted-foreground">Get it on Play Store</p>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center gap-3 py-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Apple className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Apple App Store</p>
                    <p className="text-xs text-muted-foreground">Download on App Store</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
