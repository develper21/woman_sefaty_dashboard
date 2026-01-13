import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Database,
  Cpu,
  BarChart3,
  RefreshCw,
  Download,
  Calendar,
  Layers,
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from 'recharts';
import { format, subDays } from 'date-fns';

interface AIAnalytics {
  id: string;
  date: string;
  total_training_sessions: number;
  daily_training_progress: number;
  cumulative_training_hours: number;
  users_helped_count: number;
  threats_detected: number;
  health_predictions: number;
  safety_predictions: number;
  prediction_accuracy: number;
  model_version: string;
  response_time_avg_ms: number;
  tokens_processed: number;
  active_learning_samples: number;
  false_positive_rate: number;
  false_negative_rate: number;
  sos_response_time_avg_seconds: number;
}

export default function AIAnalyticsPage() {
  const [data, setData] = useState<AIAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('14');

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: analytics, error } = await supabase
        .from('ai_analytics')
        .select('*')
        .gte('date', format(subDays(new Date(), parseInt(timeRange)), 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      if (error) throw error;
      setData(analytics as AIAnalytics[]);
    } catch (error) {
      console.error('Error fetching AI analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const getChangePercent = (current: number, previous: number) => {
    if (!previous) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const radarData = latestData ? [
    { subject: 'Accuracy', A: latestData.prediction_accuracy, fullMark: 100 },
    { subject: 'Speed', A: 100 - (latestData.response_time_avg_ms / 2), fullMark: 100 },
    { subject: 'Training', A: latestData.daily_training_progress, fullMark: 100 },
    { subject: 'Reliability', A: 100 - latestData.false_positive_rate - latestData.false_negative_rate, fullMark: 100 },
    { subject: 'Coverage', A: Math.min(100, (latestData.users_helped_count / 500) * 100), fullMark: 100 },
    { subject: 'SOS Response', A: Math.min(100, (3 / latestData.sos_response_time_avg_seconds) * 100), fullMark: 100 },
  ] : [];

  const metricsCards = [
    {
      title: 'Model Accuracy',
      value: `${latestData?.prediction_accuracy || 0}%`,
      change: getChangePercent(latestData?.prediction_accuracy || 0, previousData?.prediction_accuracy || 0),
      icon: Target,
      color: 'success',
      description: 'Prediction accuracy rate',
    },
    {
      title: 'Response Time',
      value: `${latestData?.response_time_avg_ms || 0}ms`,
      change: getChangePercent(previousData?.response_time_avg_ms || 0, latestData?.response_time_avg_ms || 0),
      icon: Zap,
      color: 'warning',
      description: 'Average response latency',
    },
    {
      title: 'Tokens Processed',
      value: ((latestData?.tokens_processed || 0) / 1000000).toFixed(2) + 'M',
      change: getChangePercent(latestData?.tokens_processed || 0, previousData?.tokens_processed || 0),
      icon: Cpu,
      color: 'primary',
      description: 'Million tokens today',
    },
    {
      title: 'Training Hours',
      value: `${latestData?.cumulative_training_hours?.toFixed(1) || 0}h`,
      change: '+' + ((latestData?.cumulative_training_hours || 0) - (previousData?.cumulative_training_hours || 0)).toFixed(1),
      icon: Brain,
      color: 'secondary',
      description: 'Cumulative training time',
    },
  ];

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-4 gap-6">
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
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            AI Model Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time performance metrics and training insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <Button 
              variant={timeRange === '7' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('7')}
            >
              7D
            </Button>
            <Button 
              variant={timeRange === '14' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('14')}
            >
              14D
            </Button>
            <Button 
              variant={timeRange === '30' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('30')}
            >
              30D
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="hero" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Model Status */}
      <Card variant="gradient" className="text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">
                  {latestData?.model_version || 'SheGuard-AI v2.1'}
                </h2>
                <p className="opacity-90">Current production model</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{latestData?.users_helped_count?.toLocaleString() || 0}</p>
                <p className="text-sm opacity-80">Users Helped Today</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{latestData?.total_training_sessions || 0}</p>
                <p className="text-sm opacity-80">Training Sessions</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{latestData?.active_learning_samples?.toLocaleString() || 0}</p>
                <p className="text-sm opacity-80">Active Learning Samples</p>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Model Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsCards.map((metric) => (
          <Card key={metric.title} variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${metric.color}/10 flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}`} />
                </div>
                <Badge variant={parseFloat(String(metric.change)) >= 0 ? 'subtle-success' : 'subtle-destructive'}>
                  {parseFloat(String(metric.change)) >= 0 ? '+' : ''}{metric.change}%
                </Badge>
              </div>
              <p className="text-3xl font-display font-bold">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="performance" className="gap-2">
            <Activity className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="training" className="gap-2">
            <Brain className="w-4 h-4" />
            Training
          </TabsTrigger>
          <TabsTrigger value="predictions" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="reliability" className="gap-2">
            <Target className="w-4 h-4" />
            Reliability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card variant="elevated" className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Model Performance Over Time</CardTitle>
                <CardDescription>Accuracy and response time trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => format(new Date(value), 'MMM d')}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar 
                        yAxisId="left" 
                        dataKey="users_helped_count" 
                        fill="hsl(267, 84%, 40%)" 
                        opacity={0.3}
                        name="Users Helped"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="prediction_accuracy" 
                        stroke="hsl(155, 70%, 40%)" 
                        strokeWidth={2}
                        name="Accuracy %"
                      />
                      <Line 
                        yAxisId="right" 
                        type="monotone" 
                        dataKey="response_time_avg_ms" 
                        stroke="hsl(40, 95%, 50%)" 
                        strokeWidth={2}
                        name="Response Time (ms)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Model Health Radar</CardTitle>
                <CardDescription>Overall system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                      <Radar
                        name="Current"
                        dataKey="A"
                        stroke="hsl(267, 84%, 40%)"
                        fill="hsl(267, 84%, 40%)"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>Daily training sessions and cumulative hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorTraining" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(267, 84%, 40%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(267, 84%, 40%)" stopOpacity={0} />
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
                        dataKey="cumulative_training_hours"
                        stroke="hsl(267, 84%, 40%)"
                        fillOpacity={1}
                        fill="url(#colorTraining)"
                        name="Training Hours"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Active Learning Samples</CardTitle>
                <CardDescription>New data points for model improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
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
                      <Bar 
                        dataKey="active_learning_samples" 
                        fill="hsl(350, 80%, 65%)"
                        name="Active Learning Samples"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Training Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Training Sessions</p>
                    <p className="text-2xl font-bold">{data.reduce((acc, d) => acc + d.total_training_sessions, 0)}</p>
                  </div>
                </div>
                <Progress value={75} className="h-2" />
              </CardContent>
            </Card>

            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tokens Processed</p>
                    <p className="text-2xl font-bold">{(data.reduce((acc, d) => acc + Number(d.tokens_processed), 0) / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
                <Progress value={85} className="h-2" />
              </CardContent>
            </Card>

            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Daily Progress</p>
                    <p className="text-2xl font-bold">{(data.reduce((acc, d) => acc + Number(d.daily_training_progress), 0) / data.length).toFixed(1)}%</p>
                  </div>
                </div>
                <Progress value={90} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Prediction Categories</CardTitle>
              <CardDescription>Breakdown of AI predictions by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barCategoryGap="20%">
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
                    <Bar dataKey="safety_predictions" stackId="a" fill="hsl(0, 85%, 55%)" name="Safety" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="health_predictions" stackId="a" fill="hsl(155, 70%, 40%)" name="Health" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="threats_detected" stackId="a" fill="hsl(40, 95%, 50%)" name="Threats" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reliability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Error Rates</CardTitle>
                <CardDescription>False positive and negative rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                        dataKey="false_positive_rate" 
                        stroke="hsl(0, 85%, 55%)" 
                        strokeWidth={2}
                        name="False Positive %"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="false_negative_rate" 
                        stroke="hsl(40, 95%, 50%)" 
                        strokeWidth={2}
                        name="False Negative %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>SOS Response Time</CardTitle>
                <CardDescription>Emergency response latency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorSOS" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(0, 85%, 55%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(0, 85%, 55%)" stopOpacity={0} />
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
                        dataKey="sos_response_time_avg_seconds"
                        stroke="hsl(0, 85%, 55%)"
                        fillOpacity={1}
                        fill="url(#colorSOS)"
                        name="Response Time (s)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Target: &lt;3 seconds</span>
                  </div>
                  <Badge variant="subtle-success">
                    Avg: {(data.reduce((acc, d) => acc + Number(d.sos_response_time_avg_seconds), 0) / data.length).toFixed(2)}s
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
