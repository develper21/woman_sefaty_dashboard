import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  ArrowLeft, 
  ArrowRight, 
  Mail,
  CheckCircle,
  KeyRound
} from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      emailSchema.parse({ email });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0]?.message || 'Invalid email');
        return;
      }
    }

    setLoading(true);
    
    const { error } = await resetPassword(email);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-background">
        <div className="absolute inset-0 gradient-glow opacity-50" />
        
        <Card className="w-full max-w-md border-0 shadow-2xl shadow-primary/10 relative z-10">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl font-display">Check Your Email</CardTitle>
            <CardDescription className="mt-2">
              We've sent password reset instructions to <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSent(false)}
              >
                Try Different Email
              </Button>
              <Link to="/admin/signin">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="absolute inset-0 gradient-glow opacity-50" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold">SheGuard AI</span>
          </div>
        </div>

        <Card className="border-0 shadow-2xl shadow-primary/10">
          <CardHeader className="space-y-1 pb-6">
            <Badge variant="subtle-warning" className="w-fit mb-2">
              <KeyRound className="w-3 h-3 mr-1" />
              Password Recovery
            </Badge>
            <CardTitle className="text-2xl font-display">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your email and we'll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full mt-6"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Instructions'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/admin/signin" 
                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
