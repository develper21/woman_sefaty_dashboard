import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NotificationDropdown } from '@/components/admin/NotificationDropdown';
import {
  Users,
  Brain,
  Shield,
  Heart,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Bell,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format } from 'date-fns';

interface PlatformStats {
  total_users: number;
  active_users: number;
  new_users: number;
  sos_alerts_triggered: number;
  health_checkups: number;
  ai_conversations: number;
}

interface AIAnalytics {
  date: string;
  users_helped_count: number;
  prediction_accuracy: number;
  threats_detected: number;
  health_predictions: number;
  response_time_avg_ms: number;
  daily_training_progress: number;
  cumulative_training_hours: number;
  model_version: string;
}

const COLORS = ['hsl(267, 84%, 40%)', 'hsl(350, 80%, 65%)', 'hsl(155, 70%, 40%)', 'hsl(40, 95%, 50%)'];

export default function AdminDashboard() {
  const { adminProfile } = useAuth();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [aiData, setAiData] = useState<AIAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch platform stats
      const { data: platformData } = await supabase
        .from('platform_stats')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (platformData) {
        setStats(platformData as PlatformStats);
      }

      // Fetch AI analytics for last 14 days
      const { data: aiAnalytics } = await supabase
        .from('ai_analytics')
        .select('*')
        .order('date', { ascending: true })
        .limit(14);

      if (aiAnalytics) {
        setAiData(aiAnalytics as AIAnalytics[]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total_users?.toLocaleString() || '0',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'primary',
    },
    {
      title: 'Active Today',
      value: stats?.active_users?.toLocaleString() || '0',
      change: '+8.2%',
      trend: 'up',
      icon: Activity,
      color: 'success',
    },
    {
      title: 'SOS Alerts',
      value: stats?.sos_alerts_triggered?.toString() || '0',
      change: '-15%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'destructive',
    },
    {
      title: 'AI Conversations',
      value: stats?.ai_conversations?.toLocaleString() || '0',
      change: '+24.3%',
      trend: 'up',
      icon: Brain,
      color: 'secondary',
    },
  ];

  const latestAI = aiData[aiData.length - 1];

  const aiMetrics = [
    {
      title: 'Model Accuracy',
      value: `${latestAI?.prediction_accuracy || 0}%`,
      target: 98,
      current: latestAI?.prediction_accuracy || 0,
      icon: Target,
    },
    {
      title: 'Avg Response Time',
      value: `${latestAI?.response_time_avg_ms || 0}ms`,
      target: 50,
      current: Math.min(100, (50 / (latestAI?.response_time_avg_ms || 100)) * 100),
      icon: Zap,
    },
    {
      title: 'Training Progress',
      value: `${latestAI?.daily_training_progress || 0}%`,
      target: 100,
      current: latestAI?.daily_training_progress || 0,
      icon: Brain,
    },
    {
      title: 'Users Helped Today',
      value: latestAI?.users_helped_count?.toLocaleString() || '0',
      target: 500,
      current: Math.min(100, ((latestAI?.users_helped_count || 0) / 500) * 100),
      icon: Heart,
    },
  ];

  const pieData = [
    { name: 'Safety Predictions', value: latestAI?.threats_detected || 0 },
    { name: 'Health Predictions', value: latestAI?.health_predictions || 0 },
    { name: 'General Assistance', value: (latestAI?.users_helped_count || 0) - (latestAI?.threats_detected || 0) - (latestAI?.health_predictions || 0) },
  ];

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
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
          <h1 className="text-3xl font-display font-bold">
            Welcome back, {adminProfile?.full_name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with SheGuard AI today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="online" className="gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            System Online
          </Badge>
          <NotificationDropdown />
          <Button variant="hero" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} variant="elevated" className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last week</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`w-7 h-7 text-${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Activity Chart */}
        <Card variant="elevated" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              User Activity & AI Interactions
            </CardTitle>
            <CardDescription>Last 14 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aiData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(267, 84%, 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(267, 84%, 40%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(350, 80%, 65%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(350, 80%, 65%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM d')}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users_helped_count"
                    stroke="hsl(267, 84%, 40%)"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    name="Users Helped"
                  />
                  <Area
                    type="monotone"
                    dataKey="threats_detected"
                    stroke="hsl(350, 80%, 65%)"
                    fillOpacity={1}
                    fill="url(#colorThreats)"
                    name="Threats Detected"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Distribution Pie */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Usage Distribution
            </CardTitle>
            <CardDescription>Today's predictions breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Model Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric) => (
          <Card key={metric.title} variant="feature">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-xl font-bold">{metric.value}</p>
                </div>
              </div>
              <Progress value={metric.current} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Target: {metric.target}{metric.title.includes('Time') ? 'ms' : metric.title.includes('%') ? '%' : ''}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Training & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Progress */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning" />
              AI Model Training Progress
            </CardTitle>
            <CardDescription>
              Current version: {latestAI?.model_version || 'SheGuard-AI v2.1'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aiData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM d')}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative_training_hours"
                    stroke="hsl(40, 95%, 50%)"
                    strokeWidth={2}
                    dot={false}
                    name="Training Hours"
                  />
                  <Line
                    type="monotone"
                    dataKey="prediction_accuracy"
                    stroke="hsl(155, 70%, 40%)"
                    strokeWidth={2}
                    dot={false}
                    name="Accuracy %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">
                  Last trained: {latestAI?.date ? format(new Date(latestAI.date), 'MMM d, yyyy') : 'N/A'}
                </span>
              </div>
              <Badge variant="subtle-success">
                <Clock className="w-3 h-3 mr-1" />
                {latestAI?.cumulative_training_hours?.toFixed(1) || 0}h total
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <MessageSquare className="w-4 h-4 text-primary" />
              Send Broadcast Message
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Users className="w-4 h-4 text-primary" />
              View All Users
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Brain className="w-4 h-4 text-primary" />
              View AI Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Shield className="w-4 h-4 text-primary" />
              Safety Report
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Heart className="w-4 h-4 text-primary" />
              Health Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Emergency Protocols
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
