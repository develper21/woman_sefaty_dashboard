import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  Send,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Plus,
  Search,
  Mail,
  BarChart3,
  LayoutGrid,
  List,
  GripVertical,
} from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'emergency';
  target_audience: 'all' | 'users' | 'admins';
  delivery_method: 'push' | 'email' | 'in_app' | 'all';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduled_at?: string;
  sent_at?: string;
  created_at: string;
  read_count: number;
  total_recipients: number;
}

interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'emergency';
  target_audience: 'all' | 'users' | 'admins';
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  // Form state for new notification
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'emergency',
    target_audience: 'all' as 'all' | 'users' | 'admins',
    delivery_method: 'all' as 'all' | 'push' | 'email' | 'in_app',
    send_immediately: true,
    scheduled_at: '',
  });

  useEffect(() => {
    fetchNotifications();
    fetchTemplates();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual Supabase queries
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'System Maintenance Tonight',
          message: 'We will be performing scheduled maintenance from 2 AM to 4 AM EST.',
          type: 'info',
          target_audience: 'all',
          delivery_method: 'push',
          status: 'sent',
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          read_count: 1250,
          total_recipients: 2000,
        },
        {
          id: '2',
          title: 'New Safety Features Available',
          message: 'Check out our new AI-powered safety prediction features in the app.',
          type: 'success',
          target_audience: 'users',
          delivery_method: 'all',
          status: 'sent',
          sent_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read_count: 890,
          total_recipients: 1500,
        },
        {
          id: '3',
          title: 'Emergency Alert Test',
          message: 'This is a test of the emergency alert system. Please disregard.',
          type: 'emergency',
          target_audience: 'all',
          delivery_method: 'all',
          status: 'scheduled',
          scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          read_count: 0,
          total_recipients: 2000,
        },
        {
          id: '4',
          title: 'Weekly Safety Tips',
          message: 'Remember to keep your emergency contacts updated and share your location with trusted contacts.',
          type: 'info',
          target_audience: 'users',
          delivery_method: 'push',
          status: 'draft',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read_count: 0,
          total_recipients: 0,
        },
        {
          id: '5',
          title: 'App Update Required',
          message: 'Please update your app to the latest version for enhanced security features.',
          type: 'warning',
          target_audience: 'all',
          delivery_method: 'all',
          status: 'scheduled',
          scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          read_count: 0,
          total_recipients: 2000,
        },
        {
          id: '6',
          title: 'Welcome New Users',
          message: 'Welcome to SheGuard AI! Complete your profile to get personalized safety recommendations.',
          type: 'success',
          target_audience: 'users',
          delivery_method: 'in_app',
          status: 'draft',
          created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          read_count: 0,
          total_recipients: 0,
        },
        {
          id: '7',
          title: 'Server Maintenance Failed',
          message: 'Scheduled maintenance failed. Technical team is investigating the issue.',
          type: 'emergency',
          target_audience: 'admins',
          delivery_method: 'email',
          status: 'failed',
          created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          read_count: 0,
          total_recipients: 5,
        },
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      // Mock templates
      const mockTemplates: NotificationTemplate[] = [
        {
          id: '1',
          name: 'Welcome Message',
          title: 'Welcome to SheGuard AI',
          message: 'Thank you for joining SheGuard AI! Your safety is our priority.',
          type: 'success',
          target_audience: 'users',
        },
        {
          id: '2',
          name: 'Maintenance Alert',
          title: 'Scheduled Maintenance',
          message: 'We will be performing system maintenance. Services may be temporarily unavailable.',
          type: 'warning',
          target_audience: 'all',
        },
        {
          id: '3',
          name: 'Emergency Broadcast',
          title: 'Emergency Alert',
          message: 'This is an emergency broadcast. Please take immediate action.',
          type: 'emergency',
          target_audience: 'all',
        },
      ];
      
      setTemplates(mockTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const sendNotification = async () => {
    try {
      // Placeholder for sending notification
      const notification: Notification = {
        id: Date.now().toString(),
        ...newNotification,
        status: newNotification.send_immediately ? 'sent' : 'scheduled',
        sent_at: newNotification.send_immediately ? new Date().toISOString() : undefined,
        scheduled_at: !newNotification.send_immediately ? newNotification.scheduled_at : undefined,
        created_at: new Date().toISOString(),
        read_count: 0,
        total_recipients: 2000, // Mock number
      };

      setNotifications([notification, ...notifications]);
      
      // Reset form
      setNewNotification({
        title: '',
        message: '',
        type: 'info',
        target_audience: 'all',
        delivery_method: 'all',
        send_immediately: true,
        scheduled_at: '',
      });
      
      alert('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const useTemplate = (template: NotificationTemplate) => {
    setNewNotification({
      title: template.title,
      message: template.message,
      type: template.type,
      target_audience: template.target_audience,
      delivery_method: 'all',
      send_immediately: true,
      scheduled_at: '',
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

  const getStatusColor = (status: string): 'info' | 'warning' | 'success' | 'destructive' | 'default' | 'secondary' | 'outline' | 'gradient' | 'subtle-primary' | 'subtle-secondary' | 'online' | 'offline' | 'alert' | 'subtle-success' | 'subtle-warning' | 'subtle-destructive' => {
    switch (status) {
      case 'sent':
        return 'subtle-success';
      case 'scheduled':
        return 'subtle-warning';
      case 'failed':
        return 'subtle-destructive';
      default:
        return 'subtle-secondary';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesType;
  });

  // Group notifications by status for Kanban view
  const kanbanColumns = [
    { id: 'draft', title: 'Draft', color: '#6b7280' },
    { id: 'scheduled', title: 'Scheduled', color: '#f59e0b' },
    { id: 'sent', title: 'Sent', color: '#10b981' },
    { id: 'failed', title: 'Failed', color: '#ef4444' },
  ];

  const getNotificationsByStatus = (status: string) => {
    return filteredNotifications.filter(n => n.status === status);
  };

  const NotificationCard = ({ notification, compact = false }: { notification: Notification; compact?: boolean }) => (
    <Card variant="elevated" className={`${compact ? 'mb-3' : 'mb-4'} hover:shadow-lg transition-shadow cursor-move group`}>
      <CardContent className={`${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              <Badge variant={getTypeColor(notification.type)} className="gap-1 text-xs">
                {getTypeIcon(notification.type)}
                {notification.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {notification.target_audience}
              </Badge>
            </div>
            <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold mb-1 truncate`}>{notification.title}</h3>
            <p className={`${compact ? 'text-xs' : 'text-sm'} text-muted-foreground mb-2 line-clamp-2`}>{notification.message}</p>
            <div className={`flex items-center gap-3 ${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {notification.delivery_method}
              </div>
              {notification.sent_at && (
                <div className="flex items-center gap-1">
                  <Send className="w-3 h-3" />
                  {format(new Date(notification.sent_at), compact ? 'MMM d' : 'MMM d, yyyy')}
                </div>
              )}
              {notification.scheduled_at && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(new Date(notification.scheduled_at), compact ? 'MMM d' : 'MMM d, yyyy')}
                </div>
              )}
            </div>
            {notification.status === 'sent' && notification.read_count > 0 && (
              <div className="mt-2 text-xs">
                <span className="text-muted-foreground">Read: </span>
                <span className="font-medium">
                  {notification.read_count}/{notification.total_recipients} ({Math.round((notification.read_count / notification.total_recipients) * 100)}%)
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => deleteNotification(notification.id)}
              className="text-destructive hover:text-destructive h-8 w-8"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Manage notifications and communicate with users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="subtle-primary" className="gap-2">
            <Bell className="w-3 h-3" />
            {notifications.length} Total
          </Badge>
          <Badge variant="subtle-success" className="gap-2">
            <CheckCircle className="w-3 h-3" />
            {notifications.filter(n => n.status === 'sent').length} Sent
          </Badge>
          <Badge variant="subtle-warning" className="gap-2">
            <Clock className="w-3 h-3" />
            {notifications.filter(n => n.status === 'scheduled').length} Scheduled
          </Badge>
          <div className="flex items-center border rounded-md ml-auto">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-r-none"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="rounded-l-none"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Kanban View */}
          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kanbanColumns.map((column) => {
                const columnNotifications = getNotificationsByStatus(column.id);
                return (
                  <div key={column.id} className="space-y-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: column.color }}
                            />
                            {column.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {columnNotifications.length}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 min-h-[200px] max-h-[600px] overflow-y-auto">
                          {columnNotifications.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground text-sm">
                              No notifications in {column.title.toLowerCase()}
                            </div>
                          ) : (
                            columnNotifications.map((notification) => (
                              <NotificationCard 
                                key={notification.id} 
                                notification={notification} 
                                compact={true}
                              />
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compose Form */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Compose Notification
                </CardTitle>
                <CardDescription>Create and send a new notification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    placeholder="Enter notification title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    placeholder="Enter notification message"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select 
                      value={newNotification.type} 
                      onValueChange={(value: 'info' | 'warning' | 'success' | 'emergency') => setNewNotification({...newNotification, type: value})}
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
                      value={newNotification.target_audience} 
                      onValueChange={(value: 'all' | 'users' | 'admins') => setNewNotification({...newNotification, target_audience: value})}
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
                    value={newNotification.delivery_method} 
                    onValueChange={(value: 'push' | 'email' | 'in_app' | 'all') => setNewNotification({...newNotification, delivery_method: value})}
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
                    id="send-immediately"
                    checked={newNotification.send_immediately}
                    onCheckedChange={(checked) => setNewNotification({...newNotification, send_immediately: checked})}
                  />
                  <Label htmlFor="send-immediately">Send immediately</Label>
                </div>

                {!newNotification.send_immediately && (
                  <div>
                    <Label htmlFor="scheduled-at">Schedule for</Label>
                    <Input
                      id="scheduled-at"
                      type="datetime-local"
                      value={newNotification.scheduled_at}
                      onChange={(e) => setNewNotification({...newNotification, scheduled_at: e.target.value})}
                    />
                  </div>
                )}

                <Button 
                  onClick={sendNotification} 
                  className="w-full"
                  disabled={!newNotification.title || !newNotification.message}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {newNotification.send_immediately ? 'Send Now' : 'Schedule Notification'}
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Stats */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-default" />
                  Delivery Statistics
                </CardTitle>
                <CardDescription>Recent notification performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-default">
                        {notifications.filter(n => n.status === 'sent').reduce((sum, n) => sum + n.read_count, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Reads</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        {Math.round(
                          notifications.filter(n => n.status === 'sent').reduce((sum, n) => 
                            sum + (n.read_count / n.total_recipients), 0
                          ) / notifications.filter(n => n.status === 'sent').length * 100
                        )}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Read Rate</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Activity</h4>
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between text-sm p-2 rounded">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(notification.type)}
                          <span className="truncate max-w-[200px]">{notification.title}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {notification.read_count}/{notification.total_recipients}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notification Templates</h3>
            <Button onClick={() => navigate('/admin/create-template')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} variant="elevated" className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={getTypeColor(template.type)} className="gap-2">
                      {getTypeIcon(template.type)}
                      {template.type}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => useTemplate(template)}
                    >
                      Use
                    </Button>
                  </div>
                  <h4 className="font-semibold mb-1">{template.name}</h4>
                  <h5 className="text-sm font-medium mb-2">{template.title}</h5>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.message}</p>
                  <div className="mt-3">
                    <Badge variant="outline" className="text-xs">
                      {template.target_audience}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
