import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Send,
  Mic,
  Phone,
  Users
} from "lucide-react";
import { notifySafety, notifyAlert, notifySuccess } from "@/lib/notifications";

const agentSteps = [
  {
    icon: AlertTriangle,
    title: "Threat Detected",
    description: "AI agent detects unusual behavior pattern in your vicinity",
    status: "alert",
  },
  {
    icon: Bot,
    title: "Analyzing Situation",
    description: "Agent processes context: time, location, behavior patterns",
    status: "processing",
  },
  {
    icon: Shield,
    title: "Decision Made",
    description: "Agent decides to alert trusted contacts & prepare SOS",
    status: "decision",
  },
  {
    icon: CheckCircle,
    title: "Action Taken",
    description: "Contacts notified, location shared, authorities on standby",
    status: "complete",
  },
];

export function AIAgentDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! I'm your SheGuard AI assistant. I'm constantly monitoring for your safety. How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const runDemo = () => {
    setIsRunning(true);
    setActiveStep(0);

    // Step through the demo
    notifyAlert("Threat Detection", "Unusual behavior detected in your vicinity");
    
    setTimeout(() => {
      setActiveStep(1);
      notifySafety("Analyzing", "Processing situational context...");
    }, 2000);
    
    setTimeout(() => {
      setActiveStep(2);
      notifySafety("Decision", "Alerting trusted contacts and preparing response");
    }, 4000);
    
    setTimeout(() => {
      setActiveStep(3);
      notifySuccess("Protected", "Safety protocols activated successfully");
      setIsRunning(false);
    }, 6000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { role: "user", content: inputValue }]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "ai",
        content: "I understand your concern. Based on your current location and time, I've assessed the area as safe. However, I'll increase monitoring sensitivity and keep your trusted contacts on standby. Would you like me to suggest a safer route home?"
      }]);
    }, 1500);
  };

  return (
    <section className="section bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="section-header">
          <Badge variant="gradient" className="mb-4">
            <Bot className="w-4 h-4 mr-2" />
            Agentic AI Technology
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Autonomous AI That
            <span className="gradient-primary-text"> Thinks & Acts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our agentic AI doesn't just alert — it reasons, decides, and takes action 
            to protect you. Experience the future of AI-powered safety.
          </p>
        </div>

        {/* Demo Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Agent Decision Flow */}
          <Card variant="elevated" className="overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Agent Decision Flow</h3>
                  <p className="text-sm text-muted-foreground">Watch how our AI responds to threats</p>
                </div>
                <Button 
                  variant="hero" 
                  onClick={runDemo}
                  disabled={isRunning}
                >
                  {isRunning ? "Running..." : "Run Demo"}
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                {agentSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activeStep && isRunning;
                  const isComplete = index < activeStep || (!isRunning && activeStep === 3 && index <= 3);
                  
                  return (
                    <div 
                      key={step.title}
                      className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-primary/10 border border-primary/30" 
                          : isComplete 
                            ? "bg-success/5 border border-success/20" 
                            : "bg-muted/50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive 
                          ? "gradient-primary animate-pulse" 
                          : isComplete 
                            ? "bg-success text-success-foreground" 
                            : "bg-muted"
                      }`}>
                        <Icon className={`w-5 h-5 ${isActive || isComplete ? "text-white" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isActive ? "text-primary" : isComplete ? "text-success" : ""}`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Chat Interface */}
          <Card variant="elevated" className="overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">SheGuard AI Assistant</h3>
                  <div className="flex items-center gap-2">
                    <span className="status-online" />
                    <span className="text-xs text-muted-foreground">Always monitoring</span>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4 flex-1 overflow-y-auto max-h-[300px] space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === "user"
                        ? "gradient-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about your safety..."
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-muted border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button variant="hero" size="icon" onClick={handleSendMessage}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm" className="text-xs">
                  <Phone className="w-3 h-3 mr-1" />
                  Call SOS
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  Share Location
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  Alert Contacts
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
