import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Settings,
  User,
  Shield,
  Bell,
  Mail,
  Smartphone,
  Database,
  Key,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  CheckCircle,
  AlertTriangle,
  Info,
  Brain,
  Heart,
  Activity,
  Palette,
  Monitor,
  Moon,
  Sun,
  Laptop,
  LogOut,
} from 'lucide-react';

interface SystemSettings {
  site_name: string;
  site_description: string;
  contact_email: string;
  support_phone: string;
  maintenance_mode: boolean;
  allow_registrations: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  ai_enabled: boolean;
  auto_backup_enabled: boolean;
  session_timeout: number;
  max_login_attempts: number;
  password_min_length: number;
}

interface NotificationSettings {
  email_enabled: boolean;
  push_enabled: boolean;
  sms_enabled: boolean;
  email_provider: 'smtp' | 'sendgrid' | 'ses';
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  sendgrid_api_key: string;
  twilio_account_sid: string;
  twilio_auth_token: string;
  twilio_phone_number: string;
}

interface SecuritySettings {
  two_factor_auth: boolean;
  session_timeout: number;
  max_login_attempts: number;
  password_min_length: number;
  require_strong_password: boolean;
  ip_whitelist_enabled: boolean;
  allowed_ips: string[];
  audit_log_enabled: boolean;
}

export default function SettingsPage() {
  const { adminProfile, signOut } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswords, setShowPasswords] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };
  
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    site_name: 'SheGuard AI',
    site_description: 'Women Safety and Health Monitoring Platform',
    contact_email: 'support@sheguard.ai',
    support_phone: '+1-800-SHEGUARD',
    maintenance_mode: false,
    allow_registrations: true,
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    ai_enabled: true,
    auto_backup_enabled: true,
    session_timeout: 30,
    max_login_attempts: 5,
    password_min_length: 8,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email_enabled: true,
    push_enabled: true,
    sms_enabled: false,
    email_provider: 'smtp',
    smtp_host: 'smtp.gmail.com',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    sendgrid_api_key: '',
    twilio_account_sid: '',
    twilio_auth_token: '',
    twilio_phone_number: '',
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    two_factor_auth: false,
    session_timeout: 30,
    max_login_attempts: 5,
    password_min_length: 8,
    require_strong_password: true,
    ip_whitelist_enabled: false,
    allowed_ips: [],
    audit_log_enabled: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual Supabase queries
      console.log('Settings would be fetched from database');
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (category: 'system' | 'notification' | 'security') => {
    setSaving(true);
    try {
      // Placeholder for saving settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${category} settings saved successfully!`);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const resetSettings = async (category: 'system' | 'notification' | 'security') => {
    if (confirm(`Are you sure you want to reset ${category} settings to defaults?`)) {
      try {
        // Placeholder for resetting settings
        alert(`${category} settings reset to defaults!`);
      } catch (error) {
        console.error('Error resetting settings:', error);
        alert('Failed to reset settings');
      }
    }
  };

  const exportSettings = async () => {
    try {
      const settings = {
        system: systemSettings,
        notification: notificationSettings,
        security: securitySettings,
      };
      
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sheguard-settings.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting settings:', error);
      alert('Failed to export settings');
    }
  };

  const importSettings = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const settings = JSON.parse(text);
      
      if (settings.system) setSystemSettings(settings.system);
      if (settings.notification) setNotificationSettings(settings.notification);
      if (settings.security) setSecuritySettings(settings.security);
      
      alert('Settings imported successfully!');
    } catch (error) {
      console.error('Error importing settings:', error);
      alert('Failed to import settings');
    }
  };

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Admin Profile Header */}
      <Card variant="elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={adminProfile?.avatar_url || ''} />
                <AvatarFallback className="gradient-primary text-white text-lg font-semibold">
                  {adminProfile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{adminProfile?.full_name}</h2>
                <Badge variant="subtle-primary" className="mt-1">
                  {adminProfile?.role?.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure system preferences and administrative options
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" asChild>
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
              />
            </label>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Settings */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Basic Settings
                </CardTitle>
                <CardDescription>Configure basic platform information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={systemSettings.site_name}
                    onChange={(e) => setSystemSettings({...systemSettings, site_name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    value={systemSettings.site_description}
                    onChange={(e) => setSystemSettings({...systemSettings, site_description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={systemSettings.contact_email}
                      onChange={(e) => setSystemSettings({...systemSettings, contact_email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="support-phone">Support Phone</Label>
                    <Input
                      id="support-phone"
                      value={systemSettings.support_phone}
                      onChange={(e) => setSystemSettings({...systemSettings, support_phone: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Controls */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  System Controls
                </CardTitle>
                <CardDescription>Manage system behavior and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable user access
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenance_mode}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenance_mode: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Registrations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable new user signups
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.allow_registrations}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, allow_registrations: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable AI-powered safety predictions
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.ai_enabled}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, ai_enabled: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup system data
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.auto_backup_enabled}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, auto_backup_enabled: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => resetSettings('system')}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={() => saveSettings('system')} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notification Channels */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Channels
                </CardTitle>
                <CardDescription>Configure available notification methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.email_enabled}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email_enabled: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send push notifications to mobile apps
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.push_enabled}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, push_enabled: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send SMS notifications
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.sms_enabled}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, sms_enabled: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Email Configuration */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Email Configuration
                </CardTitle>
                <CardDescription>Configure email service provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Email Provider</Label>
                  <Select 
                    value={notificationSettings.email_provider}
                    onValueChange={(value: 'smtp' | 'sendgrid' | 'ses') => setNotificationSettings({...notificationSettings, email_provider: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {notificationSettings.email_provider === 'smtp' && (
                  <>
                    <div>
                      <Label>SMTP Host</Label>
                      <Input
                        value={notificationSettings.smtp_host}
                        onChange={(e) => setNotificationSettings({...notificationSettings, smtp_host: e.target.value})}
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Port</Label>
                        <Input
                          type="number"
                          value={notificationSettings.smtp_port}
                          onChange={(e) => setNotificationSettings({...notificationSettings, smtp_port: parseInt(e.target.value)})}
                          placeholder="587"
                        />
                      </div>
                      <div>
                        <Label>Username</Label>
                        <Input
                          value={notificationSettings.smtp_username}
                          onChange={(e) => setNotificationSettings({...notificationSettings, smtp_username: e.target.value})}
                          placeholder="your-email@gmail.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Password</Label>
                      <div className="relative">
                        <Input
                          type={showPasswords ? 'text' : 'password'}
                          value={notificationSettings.smtp_password}
                          onChange={(e) => setNotificationSettings({...notificationSettings, smtp_password: e.target.value})}
                          placeholder="Your app password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(!showPasswords)}
                        >
                          {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => resetSettings('notification')}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={() => saveSettings('notification')} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Authentication Settings */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Authentication Settings
                </CardTitle>
                <CardDescription>Configure user authentication and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.two_factor_auth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, two_factor_auth: checked})}
                  />
                </div>

                <Separator />

                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input
                    type="number"
                    value={securitySettings.session_timeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, session_timeout: parseInt(e.target.value)})}
                  />
                </div>

                <div>
                  <Label>Max Login Attempts</Label>
                  <Input
                    type="number"
                    value={securitySettings.max_login_attempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, max_login_attempts: parseInt(e.target.value)})}
                  />
                </div>

                <div>
                  <Label>Minimum Password Length</Label>
                  <Input
                    type="number"
                    value={securitySettings.password_min_length}
                    onChange={(e) => setSecuritySettings({...securitySettings, password_min_length: parseInt(e.target.value)})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Strong Password</Label>
                    <p className="text-sm text-muted-foreground">
                      Enforce complex password requirements
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.require_strong_password}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, require_strong_password: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Access Control */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Access Control
                </CardTitle>
                <CardDescription>Manage system access and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Whitelist</Label>
                    <p className="text-sm text-muted-foreground">
                      Restrict access to specific IP addresses
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.ip_whitelist_enabled}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ip_whitelist_enabled: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all administrative actions
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.audit_log_enabled}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, audit_log_enabled: checked})}
                  />
                </div>

                <div>
                  <Label>System Status</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">Database connection secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">API endpoints protected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm">SSL certificate expires in 30 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => resetSettings('security')}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={() => saveSettings('security')} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Theme Selection */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Theme Selection
                </CardTitle>
                <CardDescription>Choose your preferred color theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Color Theme</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      onClick={() => setTheme('light')}
                      className="flex items-center gap-2 justify-start"
                    >
                      <Sun className="w-4 h-4" />
                      Light
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => setTheme('dark')}
                      className="flex items-center gap-2 justify-start"
                    >
                      <Moon className="w-4 h-4" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === 'system' ? 'default' : 'outline'}
                      onClick={() => setTheme('system')}
                      className="flex items-center gap-2 justify-start"
                    >
                      <Laptop className="w-4 h-4" />
                      System
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Current Theme</Label>
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      {theme === 'light' && <Sun className="w-4 h-4" />}
                      {theme === 'dark' && <Moon className="w-4 h-4" />}
                      {theme === 'system' && <Laptop className="w-4 h-4" />}
                      <span className="font-medium capitalize">{theme}</span>
                      <Badge variant="outline" className="ml-auto">
                        {resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  Theme Preview
                </CardTitle>
                <CardDescription>See how your theme looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-card rounded-lg border">
                    <h4 className="font-semibold mb-2">Sample Card</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      This is how content appears with your selected theme.
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">Primary</Button>
                      <Button size="sm" variant="secondary">Secondary</Button>
                      <Button size="sm" variant="outline">Outline</Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">Background:</span>
                      <div className="w-full h-4 bg-background rounded border mt-1"></div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">Primary:</span>
                      <div className="w-full h-4 bg-primary rounded mt-1"></div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">Secondary:</span>
                      <div className="w-full h-4 bg-secondary rounded mt-1"></div>
                    </div>
                    <div className="p-2 bg-muted rounded">
                      <span className="font-medium">Accent:</span>
                      <div className="w-full h-4 bg-accent rounded mt-1"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Display Settings */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Display Settings
                </CardTitle>
                <CardDescription>Customize your viewing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce spacing and padding
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable smooth transitions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations for accessibility
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Theme Tips
                </CardTitle>
                <CardDescription>Get the most out of your theme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <p>System theme automatically follows your device preferences</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <p>Color themes work with both light and dark modes</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <p>Theme preference is saved and applied across all pages</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <p>Use reduced motion if you're sensitive to animations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Information */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  System Information
                </CardTitle>
                <CardDescription>Current system status and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Version:</span>
                    <p className="font-medium">SheGuard AI v2.1.0</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Environment:</span>
                    <p className="font-medium">Production</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Database:</span>
                    <p className="font-medium">PostgreSQL 14</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Storage:</span>
                    <p className="font-medium">85% used</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Active Features</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="subtle-success" className="gap-1">
                      <Brain className="w-3 h-3" />
                      AI Analytics
                    </Badge>
                    <Badge variant="subtle-success" className="gap-1">
                      <Heart className="w-3 h-3" />
                      Health Monitoring
                    </Badge>
                    <Badge variant="subtle-success" className="gap-1">
                      <Activity className="w-3 h-3" />
                      Real-time Alerts
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Maintenance
                </CardTitle>
                <CardDescription>System maintenance operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <RefreshCw className="w-4 h-4" />
                  Clear Cache
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Database className="w-4 h-4" />
                  Optimize Database
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Download className="w-4 h-4" />
                  Backup Database
                </Button>
                
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Trash2 className="w-4 h-4" />
                  Clean Up Logs
                </Button>

                <Separator />

                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-primary" />
                    <span className="font-medium">Last Maintenance</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Performed 2 days ago. Next scheduled in 5 days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
