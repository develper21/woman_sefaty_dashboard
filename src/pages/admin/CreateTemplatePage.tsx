import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft,
  Save,
  Eye,
  Bell,
  AlertTriangle,
  CheckCircle,
  Send,
  Users,
  Mail,
  Smartphone,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
} from 'lucide-react';

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'emergency';
  target_audience: 'all' | 'users' | 'admins';
  delivery_method: 'push' | 'email' | 'in_app' | 'all';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface TemplateVariable {
  name: string;
  description: string;
  example: string;
}

export default function CreateTemplatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'emergency',
    target_audience: 'all' as 'all' | 'users' | 'admins',
    delivery_method: 'all' as 'all' | 'push' | 'email' | 'in_app',
    is_active: true,
  });

  // Available template variables
  const templateVariables: TemplateVariable[] = [
    { name: '{{user_name}}', description: 'User\'s full name', example: 'John Doe' },
    { name: '{{user_email}}', description: 'User\'s email address', example: 'john@example.com' },
    { name: '{{app_name}}', description: 'Application name', example: 'SheGuard AI' },
    { name: '{{date}}', description: 'Current date', example: 'January 13, 2026' },
    { name: '{{time}}', description: 'Current time', example: '6:15 PM' },
    { name: '{{emergency_contact}}', description: 'Emergency contact number', example: '+1-234-567-8900' },
    { name: '{{location}}', description: 'User\'s current location', example: 'New York, NY' },
    { name: '{{support_email}}', description: 'Support email address', example: 'support@sheguard.ai' },
  ];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      // Mock data - replace with actual Supabase query
      const mockTemplates: NotificationTemplate[] = [
        {
          id: '1',
          name: 'Welcome Message',
          title: 'Welcome to {{app_name}}',
          message: 'Hello {{user_name}}, thank you for joining {{app_name}}! Your safety is our priority.',
          type: 'success',
          target_audience: 'users',
          delivery_method: 'all',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Emergency Alert',
          title: 'Emergency Alert: {{emergency_type}}',
          message: 'This is an emergency alert for {{user_name}}. {{emergency_message}}. Please contact {{emergency_contact}} immediately.',
          type: 'emergency',
          target_audience: 'all',
          delivery_method: 'all',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setTemplates(mockTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const saveTemplate = async () => {
    if (!newTemplate.name || !newTemplate.title || !newTemplate.message) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Placeholder for saving to Supabase
      const template: NotificationTemplate = {
        id: Date.now().toString(),
        ...newTemplate,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setTemplates([...templates, template]);
      
      // Reset form
      setNewTemplate({
        name: '',
        title: '',
        message: '',
        type: 'info',
        target_audience: 'all',
        delivery_method: 'all',
        is_active: true,
      });
      
      alert('Template saved successfully!');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      setTemplates(templates.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const useTemplate = (template: NotificationTemplate) => {
    setNewTemplate({
      name: template.name + ' (Copy)',
      title: template.title,
      message: template.message,
      type: template.type,
      target_audience: template.target_audience,
      delivery_method: template.delivery_method,
      is_active: template.is_active,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <AlertTriangle className="w-4 h-4" />;
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string): 'info' | 'warning' | 'success' | 'destructive' | 'default' | 'secondary' | 'outline' | 'gradient' | 'subtle-primary' | 'subtle-secondary' | 'online' | 'offline' | 'alert' | 'subtle-success' | 'subtle-warning' | 'subtle-destructive' => {
    switch (type) {
      case 'emergency':
        return 'destructive';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getDeliveryIcon = (method: string) => {
    switch (method) {
      case 'push':
        return <Smartphone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'in_app':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Send className="w-4 h-4" />;
    }
  };

  const renderPreview = () => {
    const previewData = {
      user_name: 'John Doe',
      user_email: 'john@example.com',
      app_name: 'SheGuard AI',
      date: 'January 13, 2026',
      time: '6:15 PM',
      emergency_contact: '+1-234-567-8900',
      location: 'New York, NY',
      support_email: 'support@sheguard.ai',
      emergency_type: 'Safety Alert',
      emergency_message: 'Unusual activity detected in your area',
    };

    let previewTitle = newTemplate.title;
    let previewMessage = newTemplate.message;

    // Replace variables with preview data
    Object.entries(previewData).forEach(([key, value]) => {
      const variable = `{{${key}}}`;
      previewTitle = previewTitle.replace(new RegExp(variable, 'g'), value);
      previewMessage = previewMessage.replace(new RegExp(variable, 'g'), value);
    });

    return { title: previewTitle, message: previewMessage };
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/notifications')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Notifications
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold">Create Template</h1>
            <p className="text-muted-foreground mt-1">
              Design reusable notification templates with dynamic variables
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button 
            onClick={saveTemplate} 
            disabled={loading || !newTemplate.name || !newTemplate.title || !newTemplate.message}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {!previewMode ? (
            <>
              {/* Template Form */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Template Details</CardTitle>
                  <CardDescription>Configure your notification template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Template Name *</Label>
                    <Input
                      id="name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="e.g., Welcome Message, Emergency Alert"
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Notification Title *</Label>
                    <Input
                      id="title"
                      value={newTemplate.title}
                      onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                      placeholder="e.g., Welcome to {{app_name}}"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message Content *</Label>
                    <Textarea
                      id="message"
                      value={newTemplate.message}
                      onChange={(e) => setNewTemplate({...newTemplate, message: e.target.value})}
                      placeholder="e.g., Hello {{user_name}}, thank you for joining {{app_name}}!"
                      rows={6}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Type</Label>
                      <Select 
                        value={newTemplate.type} 
                        onValueChange={(value: 'info' | 'warning' | 'success' | 'emergency') => setNewTemplate({...newTemplate, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Target Audience</Label>
                      <Select 
                        value={newTemplate.target_audience} 
                        onValueChange={(value: 'all' | 'users' | 'admins') => setNewTemplate({...newTemplate, target_audience: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="users">Regular Users</SelectItem>
                          <SelectItem value="admins">Admins Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Delivery Method</Label>
                    <Select 
                      value={newTemplate.delivery_method} 
                      onValueChange={(value: 'push' | 'email' | 'in_app' | 'all') => setNewTemplate({...newTemplate, delivery_method: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="in_app">In-App</SelectItem>
                        <SelectItem value="all">All Methods</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-active"
                      checked={newTemplate.is_active}
                      onCheckedChange={(checked) => setNewTemplate({...newTemplate, is_active: checked})}
                    />
                    <Label htmlFor="is-active">Template is active</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Template Variables */}
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Available Variables</CardTitle>
                  <CardDescription>Use these variables in your template for dynamic content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templateVariables.map((variable) => (
                      <div key={variable.name} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {variable.name}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setNewTemplate({
                                ...newTemplate,
                                message: newTemplate.message + ' ' + variable.name
                              });
                            }}
                            className="text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{variable.description}</p>
                        <p className="text-xs text-muted-foreground">Example: {variable.example}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Preview Mode */
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Template Preview</CardTitle>
                <CardDescription>See how your template will appear to users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-3">
                      {getTypeIcon(newTemplate.type)}
                      <Badge variant={getTypeColor(newTemplate.type)}>
                        {newTemplate.type}
                      </Badge>
                      <Badge variant="outline">
                        {getDeliveryIcon(newTemplate.delivery_method)}
                        {newTemplate.delivery_method}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{renderPreview().title}</h3>
                    <p className="text-muted-foreground">{renderPreview().message}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Target Audience:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Users className="w-4 h-4" />
                        {newTemplate.target_audience}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>
                      <div className="mt-1">
                        <Badge variant={newTemplate.is_active ? 'subtle-success' : 'subtle-secondary'}>
                          {newTemplate.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Existing Templates */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Existing Templates</CardTitle>
              <CardDescription>Click to use as starting point</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {templates.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No templates created yet</p>
                ) : (
                  templates.map((template) => (
                    <div key={template.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={getTypeColor(template.type)} className="gap-1 text-xs">
                          {getTypeIcon(template.type)}
                          {template.type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => useTemplate(template)}
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTemplate(template.id)}
                            className="h-6 w-6 p-0 text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{template.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{template.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {template.target_audience}
                        </Badge>
                        <Badge variant={template.is_active ? 'subtle-success' : 'subtle-secondary'} className="text-xs">
                          {template.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Use variables to personalize messages</p>
                <p>• Keep titles under 50 characters</p>
                <p>• Messages should be clear and concise</p>
                <p>• Test templates before saving</p>
                <p>• Use emergency type for critical alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
