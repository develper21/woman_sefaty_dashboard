import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Working Professional",
    location: "Mumbai",
    content: "SheGuard AI gave me confidence during late-night travels. The real-time monitoring and instant alert system make me feel protected 24/7.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Ananya Reddy",
    role: "College Student",
    location: "Hyderabad",
    content: "The AI health assistant helped me detect early signs of PCOS. The personalized advice and cycle tracking features are incredibly accurate.",
    rating: 5,
    avatar: "AR",
  },
  {
    name: "Kavita Patel",
    role: "Entrepreneur",
    location: "Ahmedabad",
    content: "As a woman entrepreneur who travels frequently, SheGuard's safe route suggestions and trusted circle features give my family peace of mind.",
    rating: 5,
    avatar: "KP",
  },
  {
    name: "Meera Singh",
    role: "Healthcare Worker",
    location: "Delhi",
    content: "The mental wellness features helped me manage work stress effectively. The AI understands women's unique health challenges beautifully.",
    rating: 5,
    avatar: "MS",
  },
  {
    name: "Deepika Nair",
    role: "Software Engineer",
    location: "Bangalore",
    content: "What impressed me most is how the AI learns and adapts to my patterns. It's like having a personal safety companion that truly understands me.",
    rating: 5,
    avatar: "DN",
  },
  {
    name: "Fatima Khan",
    role: "Medical Resident",
    location: "Chennai",
    content: "The harassment detection feature works remarkably well. It alerted my contacts during a concerning situation before I could even react.",
    rating: 5,
    avatar: "FK",
  },
];

export function Testimonials() {
  return (
    <section className="section">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <Badge variant="subtle-primary" className="mb-4">
            <Star className="w-4 h-4 mr-2" />
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Trusted by Women
            <span className="gradient-primary-text"> Across India</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real women who've experienced the power of 
            AI-driven protection and health insights.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name} 
              variant="feature"
              className="relative"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
