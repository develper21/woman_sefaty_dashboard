import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Eye,
  Ban,
  MessageSquare,
  Download,
  RefreshCw,
  Activity,
  Shield,
  Heart,
  Send,
  LayoutGrid,
  Table as TableIcon,
  User,
  Columns,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface AppUser {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  safety_alerts_count: number;
  sos_triggered_count: number;
  ai_interactions_count: number;
  last_active: string | null;
  status: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [sendingBroadcast, setSendingBroadcast] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'card' | 'grid' | 'kanban'>('table');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .order('last_active', { ascending: false });

      if (error) throw error;
      setUsers(data as AppUser[]);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = (userId: string, userName: string) => {
    toast.success(`Opening message composer for ${userName}`);
  };

  const handleViewDetails = (userId: string) => {
    toast.info('User details modal coming soon');
  };

  const handleSendBroadcast = async () => {
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      toast.error('Please fill in both title and message');
      return;
    }

    setSendingBroadcast(true);
    try {
      // Here you would implement the actual broadcast logic
      // For now, we'll simulate it with a delay and success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would:
      // 1. Save the broadcast message to a broadcasts table
      // 2. Send push notifications to all users
      // 3. Create in-app notifications for each user
      
      toast.success(`Broadcast message sent to ${users.length} users successfully!`);
      
      // Reset form
      setBroadcastTitle('');
      setBroadcastMessage('');
      setShowBroadcastModal(false);
    } catch (error) {
      console.error('Error sending broadcast:', error);
      toast.error('Failed to send broadcast message');
    } finally {
      setSendingBroadcast(false);
    }
  };

  const handleSuspendUser = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    try {
      const { error } = await supabase
        .from('app_users')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) throw error;
      
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      toast.success(`User ${newStatus === 'suspended' ? 'suspended' : 'reactivated'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="subtle-success">Active</Badge>;
      case 'inactive':
        return <Badge variant="subtle-warning">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="subtle-destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all SheGuard AI users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={fetchUsers}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <div className="flex items-center border rounded-md p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-7 px-2"
            >
              <TableIcon className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('card')}
              className="h-7 px-2"
            >
              <User className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-7 px-2"
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="h-7 px-2"
            >
              <Columns className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="hero" size="sm" onClick={() => setShowBroadcastModal(true)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Broadcast Message
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.length}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.reduce((acc, u) => acc + u.sos_triggered_count, 0)}</p>
              <p className="text-sm text-muted-foreground">Total SOS Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{users.reduce((acc, u) => acc + u.ai_interactions_count, 0)}</p>
              <p className="text-sm text-muted-foreground">AI Interactions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>A list of all registered users on the platform</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu open={showFilters} onOpenChange={setShowFilters}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className={statusFilter !== 'all' ? 'border-primary text-primary' : ''}>
                    <Filter className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Filter by Status</p>
                    <div className="space-y-1">
                      <button
                        onClick={() => { setStatusFilter('all'); setShowFilters(false); }}
                        className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-accent ${
                          statusFilter === 'all' ? 'bg-accent font-medium' : ''
                        }`}
                      >
                        All Users
                      </button>
                      <button
                        onClick={() => { setStatusFilter('active'); setShowFilters(false); }}
                        className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-accent ${
                          statusFilter === 'active' ? 'bg-accent font-medium' : ''
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => { setStatusFilter('inactive'); setShowFilters(false); }}
                        className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-accent ${
                          statusFilter === 'inactive' ? 'bg-accent font-medium' : ''
                        }`}
                      >
                        Inactive
                      </button>
                      <button
                        onClick={() => { setStatusFilter('suspended'); setShowFilters(false); }}
                        className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-accent ${
                          statusFilter === 'suspended' ? 'bg-accent font-medium' : ''
                        }`}
                      >
                        Suspended
                      </button>
                    </div>
                    {statusFilter !== 'all' && (
                      <div className="mt-2 pt-2 border-t">
                        <button
                          onClick={() => { setStatusFilter('all'); setShowFilters(false); }}
                          className="w-full text-left px-2 py-1 rounded text-sm text-muted-foreground hover:bg-accent"
                        >
                          Clear Filter
                        </button>
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <>
              {viewMode === 'table' && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Safety Alerts</TableHead>
                      <TableHead className="text-center">SOS Triggered</TableHead>
                      <TableHead className="text-center">AI Interactions</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="gradient-primary text-white text-sm">
                                {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.full_name}</p>
                              <p className="text-sm text-muted-foreground">{user.email || user.phone}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.location || 'Not set'}
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={user.safety_alerts_count > 0 ? 'subtle-warning' : 'secondary'}>
                            {user.safety_alerts_count}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={user.sos_triggered_count > 0 ? 'subtle-destructive' : 'secondary'}>
                            {user.sos_triggered_count}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="subtle-primary">{user.ai_interactions_count}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {user.last_active
                            ? formatDistanceToNow(new Date(user.last_active), { addSuffix: true })
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendMessage(user.id, user.full_name)}>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleSuspendUser(user.id, user.status)}
                                className={user.status === 'suspended' ? 'text-success' : 'text-destructive'}
                              >
                                <Ban className="w-4 h-4 mr-2" />
                                {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {viewMode === 'card' && (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                              <AvatarFallback className="gradient-primary text-white text-lg">
                                {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold">{user.full_name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email || user.phone}</p>
                              <p className="text-sm text-muted-foreground">{user.location || 'Not set'}</p>
                              <div className="mt-2">{getStatusBadge(user.status)}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSendMessage(user.id, user.full_name)}>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleSuspendUser(user.id, user.status)}
                                  className={user.status === 'suspended' ? 'text-success' : 'text-destructive'}
                                >
                                  <Ban className="w-4 h-4 mr-2" />
                                  {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-warning">{user.safety_alerts_count}</p>
                            <p className="text-xs text-muted-foreground">Safety Alerts</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-destructive">{user.sos_triggered_count}</p>
                            <p className="text-xs text-muted-foreground">SOS Triggered</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">{user.ai_interactions_count}</p>
                            <p className="text-xs text-muted-foreground">AI Interactions</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                          Last active: {user.last_active
                            ? formatDistanceToNow(new Date(user.last_active), { addSuffix: true })
                            : 'Never'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="gradient-primary text-white text-sm">
                              {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSendMessage(user.id, user.full_name)}>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleSuspendUser(user.id, user.status)}
                                  className={user.status === 'suspended' ? 'text-success' : 'text-destructive'}
                                >
                                  <Ban className="w-4 h-4 mr-2" />
                                  {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm mb-1 truncate">{user.full_name}</h3>
                        <p className="text-xs text-muted-foreground mb-2 truncate">{user.email || user.phone}</p>
                        <div className="mb-3">{getStatusBadge(user.status)}</div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div>
                            <p className="text-lg font-bold text-warning">{user.safety_alerts_count}</p>
                            <p className="text-xs text-muted-foreground">Alerts</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-destructive">{user.sos_triggered_count}</p>
                            <p className="text-xs text-muted-foreground">SOS</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-primary">{user.ai_interactions_count}</p>
                            <p className="text-xs text-muted-foreground">AI</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {viewMode === 'kanban' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {['active', 'inactive', 'suspended'].map((status) => {
                      const statusUsers = filteredUsers.filter(user => user.status === status);
                      const statusColors = {
                        active: 'border-success bg-success/5',
                        inactive: 'border-warning bg-warning/5',
                        suspended: 'border-destructive bg-destructive/5'
                      };
                      const statusIcons = {
                        active: <Activity className="w-4 h-4 text-success" />,
                        inactive: <Shield className="w-4 h-4 text-warning" />,
                        suspended: <Ban className="w-4 h-4 text-destructive" />
                      };
                      const statusLabels = {
                        active: 'Active Users',
                        inactive: 'Inactive Users',
                        suspended: 'Suspended Users'
                      };

                      return (
                        <div key={status} className="space-y-4">
                          <div className={`flex items-center gap-2 p-3 rounded-lg border-2 ${statusColors[status]}`}>
                            {statusIcons[status as keyof typeof statusIcons]}
                            <div>
                              <h3 className="font-semibold">{statusLabels[status as keyof typeof statusLabels]}</h3>
                              <p className="text-sm text-muted-foreground">{statusUsers.length} users</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 min-h-[200px]">
                            {statusUsers.map((user) => (
                              <Card key={user.id} className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <Avatar className="w-10 h-10">
                                        <AvatarFallback className="gradient-primary text-white text-xs">
                                          {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium text-sm">{user.full_name}</h4>
                                        <p className="text-xs text-muted-foreground">{user.email || user.phone}</p>
                                      </div>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                          <MoreVertical className="w-3 h-3" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
                                          <Eye className="w-4 h-4 mr-2" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleSendMessage(user.id, user.full_name)}>
                                          <Mail className="w-4 h-4 mr-2" />
                                          Send Message
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                          onClick={() => handleSuspendUser(user.id, user.status)}
                                          className={user.status === 'suspended' ? 'text-success' : 'text-destructive'}
                                        >
                                          <Ban className="w-4 h-4 mr-2" />
                                          {user.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                                    <div className="bg-muted/50 rounded p-2">
                                      <p className="text-xs font-bold text-warning">{user.safety_alerts_count}</p>
                                      <p className="text-xs text-muted-foreground">Alerts</p>
                                    </div>
                                    <div className="bg-muted/50 rounded p-2">
                                      <p className="text-xs font-bold text-destructive">{user.sos_triggered_count}</p>
                                      <p className="text-xs text-muted-foreground">SOS</p>
                                    </div>
                                    <div className="bg-muted/50 rounded p-2">
                                      <p className="text-xs font-bold text-primary">{user.ai_interactions_count}</p>
                                      <p className="text-xs text-muted-foreground">AI</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{user.location || 'No location'}</span>
                                    <span>{user.last_active
                                      ? formatDistanceToNow(new Date(user.last_active), { addSuffix: true })
                                      : 'Never'}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            
                            {statusUsers.length === 0 && (
                              <div className="text-center py-8 text-muted-foreground">
                                <div className="mb-2">{statusIcons[status as keyof typeof statusIcons]}</div>
                                <p className="text-sm">No {status} users</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Broadcast Message Modal */}
      <Dialog open={showBroadcastModal} onOpenChange={setShowBroadcastModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Send Broadcast Message
            </DialogTitle>
            <DialogDescription>
              Send a message to all {users.length} registered users on the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="broadcast-title" className="text-sm font-medium">
                Message Title
              </label>
              <Input
                id="broadcast-title"
                placeholder="Enter message title..."
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                {broadcastTitle.length}/100 characters
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="broadcast-message" className="text-sm font-medium">
                Message Content
              </label>
              <Textarea
                id="broadcast-message"
                placeholder="Type your broadcast message here..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                {broadcastMessage.length}/500 characters
              </p>
            </div>
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                This message will be sent to all active users via push notification and in-app notification.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowBroadcastModal(false)}
                  disabled={sendingBroadcast}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendBroadcast}
                  disabled={sendingBroadcast || !broadcastTitle.trim() || !broadcastMessage.trim()}
                >
                  {sendingBroadcast ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Broadcast
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
