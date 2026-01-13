import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  HelpCircle,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import { notifySuccess } from "@/lib/notifications";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: "contact@sheguard.ai",
    action: "mailto:contact@sheguard.ai",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Available 9 AM - 6 PM IST",
    value: "+91 123 456 7890",
    action: "tel:+911234567890",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    value: "Ahmedabad, Gujarat, India",
    action: "#",
  },
];

const faqs = [
  {
    question: "How does the AI threat detection work?",
    answer: "Our AI uses multi-modal analysis including audio patterns, location data, and behavioral cues to identify potential threats in real-time.",
  },
  {
    question: "Is my health data secure?",
    answer: "Absolutely. We use end-to-end encryption and comply with HIPAA standards. Your data is processed on-device when possible and never shared without consent.",
  },
  {
    question: "Can I use SheGuard AI offline?",
    answer: "Yes, core safety features including SOS and emergency contacts work offline. Full AI features require internet connectivity.",
  },
  {
    question: "How accurate is the health prediction?",
    answer: "Our ML models achieve 95%+ accuracy for symptom analysis and early detection, trained on anonymized women's health data.",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    notifySuccess("Message Sent!", "We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 gradient-hero">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="gradient" className="mb-6">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Us
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                We're Here to
                <span className="gradient-primary-text"> Help You</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions about SheGuard AI? Need support? We're just a message away. 
                Our team is dedicated to helping you stay safe and healthy.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a 
                    key={method.title} 
                    href={method.action}
                    className="block"
                  >
                    <Card variant="feature" className="h-full text-center hover:border-primary/30">
                      <CardContent className="p-8">
                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                        <p className="font-medium text-primary">{method.value}</p>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="section">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Badge variant="subtle-primary" className="mb-4">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Name</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Address</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  <Button variant="hero" size="lg" type="submit" className="w-full md:w-auto">
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* FAQ */}
              <div>
                <Badge variant="subtle-secondary" className="mb-4">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Common Questions
                </h2>
                <p className="text-muted-foreground mb-8">
                  Find answers to frequently asked questions about SheGuard AI.
                </p>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} variant="feature">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Features */}
        <section className="section bg-muted/30">
          <div className="container-wide">
            <div className="text-center mb-12">
              <Badge variant="gradient" className="mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Support Promise
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                We're Committed to Your Success
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Clock, title: "24h Response", description: "We respond to all queries within 24 hours" },
                { icon: Shield, title: "Priority Safety", description: "Safety concerns get immediate attention" },
                { icon: CheckCircle, title: "Satisfaction Guaranteed", description: "We don't rest until you're happy" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
