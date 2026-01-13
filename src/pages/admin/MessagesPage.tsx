import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  MessageSquare,
  Send,
  Bell,
  Mail,
  Users,
  User,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MessagesPage() {
  const { adminProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientType: 'all',
    messageType: 'notification',
    priority: 'normal',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!adminProfile?.id) {
      toast.error('Admin profile not found');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('admin_messages')
        .insert({
          admin_id: adminProfile.id,
          recipient_type: formData.recipientType,
          message_type: formData.messageType,
          priority: formData.priority,
          subject: formData.subject,
          message: formData.message,
          status: 'sent',
          sent_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Message sent successfully!', {
        description: `Sent to ${formData.recipientType === 'all' ? 'all users' : 'selected recipients'}`,
      });

      setFormData({
        recipientType: 'all',
        messageType: 'notification',
        priority: 'normal',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const messageTemplates = [
    {
      title: 'Safety Alert',
      subject: '⚠️ Safety Alert in Your Area',
      message: 'Dear user, we have detected increased safety concerns in your area. Please stay vigilant and use SheGuard AI features if needed.',
    },
    {
      title: 'Health Reminder',
      subject: '💚 Monthly Health Check Reminder',
      message: 'It\'s time for your monthly health check-in! Open SheGuard AI to log your wellness data and get personalized insights.',
    },
    {
      title: 'Feature Update',
      subject: '🚀 New Feature Available!',
      message: 'Exciting news! We\'ve added new features to SheGuard AI to better protect and serve you. Check out the latest updates in the app!',
    },
    {
      title: 'Emergency Protocol',
      subject: '🔴 Emergency Protocol Update',
      message: 'Important: We\'ve updated our emergency response protocols. Please review the new features in your SheGuard AI app settings.',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary" />
          Message Center
        </h1>
        <p className="text-muted-foreground mt-1">
          Send notifications and emails to SheGuard AI users
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compose Message */}
        <div className="lg:col-span-2">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
              <CardDescription>Create and send messages to your users</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipient Type */}
                <div className="space-y-3">
                  <Label>Send To</Label>
                  <RadioGroup
                    value={formData.recipientType}
                    onValueChange={(value) => setFormData({ ...formData, recipientType: value })}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="flex items-center gap-2 cursor-pointer">
                        <Users className="w-4 h-4" />
                        All Users
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="flex items-center gap-2 cursor-pointer">
                        <User className="w-4 h-4" />
                        Individual
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="group" id="group" />
                      <Label htmlFor="group" className="flex items-center gap-2 cursor-pointer">
                        <Users className="w-4 h-4" />
                        User Group
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Message Type & Priority */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Message Type</Label>
                    <Select 
                      value={formData.messageType}
                      onValueChange={(value) => setFormData({ ...formData, messageType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="notification">
                          <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            Push Notification
                          </div>
                        </SelectItem>
                        <SelectItem value="email">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </div>
                        </SelectItem>
                        <SelectItem value="both">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Both
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select 
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Enter message subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message here..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                {/* Preview */}
                {formData.subject && formData.message && (
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Preview</p>
                    <div className="bg-card rounded-lg p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        {formData.messageType === 'notification' || formData.messageType === 'both' ? (
                          <Bell className="w-4 h-4 text-primary" />
                        ) : (
                          <Mail className="w-4 h-4 text-primary" />
                        )}
                        <span className="font-medium text-sm">{formData.subject}</span>
                        {formData.priority === 'urgent' && (
                          <Badge variant="subtle-destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{formData.message}</p>
                    </div>
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Templates */}
        <div className="space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
              <CardDescription>Use pre-made templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {messageTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => setFormData({ 
                    ...formData, 
                    subject: template.subject, 
                    message: template.message 
                  })}
                >
                  <div>
                    <p className="font-medium text-sm">{template.title}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {template.subject}
                    </p>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Message Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Sent Today</span>
                </div>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm">Pending</span>
                </div>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm">Failed</span>
                </div>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">Reach</span>
                </div>
                <span className="font-medium">10,000+</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
