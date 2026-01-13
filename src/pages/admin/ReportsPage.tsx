import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Download,
  Users,
  AlertTriangle,
  Heart,
  Brain,
  TrendingUp,
  FileText,
  Shield,
  Activity,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format } from 'date-fns';

interface ReportData {
  date: string;
  total_users: number;
  active_users: number;
  sos_alerts: number;
  health_checkups: number;
  ai_conversations: number;
}

const COLORS = ['hsl(267, 84%, 40%)', 'hsl(350, 80%, 65%)', 'hsl(155, 70%, 40%)', 'hsl(40, 95%, 50%)'];

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');

  useEffect(() => {
    fetchReportData();
  }, [dateRange]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual Supabase queries
      const mockData: ReportData[] = Array.from({ length: parseInt(dateRange) }, (_, i) => ({
        date: format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
        total_users: Math.floor(Math.random() * 1000) + 500,
        active_users: Math.floor(Math.random() * 500) + 200,
        sos_alerts: Math.floor(Math.random() * 50) + 5,
        health_checkups: Math.floor(Math.random() * 100) + 20,
        ai_conversations: Math.floor(Math.random() * 300) + 100,
      })).reverse();
      
      setReportData(mockData);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCSV = () => {
    if (reportData.length === 0) return 'No data available';
    
    const headers = [
      'Date', 'Total Users', 'Active Users', 'SOS Alerts', 
      'Health Checkups', 'AI Conversations'
    ];
    
    const csvRows = reportData.map(row => [
      `"${row.date}"`,
      row.total_users,
      row.active_users,
      row.sos_alerts,
      row.health_checkups,
      row.ai_conversations
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');
    
    return csvContent;
  };

  const generatePDF = () => {
    if (reportData.length === 0) return 'No data available';
    
    const totalUsers = reportData.reduce((sum, d) => sum + d.total_users, 0);
    const totalActiveUsers = reportData.reduce((sum, d) => sum + d.active_users, 0);
    const totalSOSAlerts = reportData.reduce((sum, d) => sum + d.sos_alerts, 0);
    const totalHealthCheckups = reportData.reduce((sum, d) => sum + d.health_checkups, 0);
    const totalAIConversations = reportData.reduce((sum, d) => sum + d.ai_conversations, 0);
    const avgActiveUsers = (totalActiveUsers / reportData.length).toFixed(0);
    
    const report = `
===============================================
           SHEGUARD REPORTS & ANALYTICS
===============================================

Generated: ${new Date().toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
Report Period: Last ${dateRange} days
Report Type: ${reportType === 'overview' ? 'Overview' : 
                reportType === 'safety' ? 'Safety Reports' :
                reportType === 'health' ? 'Health Analytics' : 'AI Performance'}

===============================================
              SUMMARY STATISTICS
===============================================

Total Period Days: ${reportData.length}
Total Users Registered: ${totalUsers.toLocaleString()}
Average Active Users: ${avgActiveUsers}
Total SOS Alerts: ${totalSOSAlerts}
Total Health Checkups: ${totalHealthCheckups.toLocaleString()}
Total AI Conversations: ${totalAIConversations.toLocaleString()}

===============================================
              KEY INSIGHTS
===============================================

Daily Average Metrics:
- Average Daily Users: ${avgActiveUsers}
- Daily SOS Alerts: ${(totalSOSAlerts / reportData.length).toFixed(1)}
- Daily Health Checkups: ${(totalHealthCheckups / reportData.length).toFixed(1)}
- Daily AI Conversations: ${(totalAIConversations / reportData.length).toFixed(1)}

Activity Distribution:
- Total Active Users: ${totalActiveUsers.toLocaleString()} (${((totalActiveUsers/totalUsers)*100).toFixed(1)}%)
- SOS Alert Rate: ${((totalSOSAlerts/totalActiveUsers)*100).toFixed(2)}% per active user
- Health Engagement: ${((totalHealthCheckups/totalActiveUsers)*100).toFixed(1)}%
- AI Adoption Rate: ${((totalAIConversations/totalActiveUsers)*100).toFixed(1)}%

===============================================
              RECENT TRENDS
===============================================

Last 7 Days Activity:
${reportData.slice(-7).map((day, index) => `
Day ${index + 1} - ${new Date(day.date).toLocaleDateString()}:
  Total Users: ${day.total_users}
  Active Users: ${day.active_users}
  SOS Alerts: ${day.sos_alerts}
  Health Checkups: ${day.health_checkups}
  AI Conversations: ${day.ai_conversations}
`).join('')}

===============================================
              RECOMMENDATIONS
===============================================

Based on the data analysis:

1. SAFETY: ${totalSOSAlerts > 100 ? '⚠️ High SOS alert volume detected. Consider reviewing safety protocols.' : '✅ SOS alert levels are within normal range.'}

2. HEALTH: ${totalHealthCheckups < totalActiveUsers ? '💡 Consider promoting health checkup features to increase engagement.' : '✅ Good health checkup participation.'}

3. AI USAGE: ${totalAIConversations > totalActiveUsers * 2 ? '🚀 Excellent AI adoption and engagement!' : '📈 Opportunity to increase AI feature awareness.'}

4. USER ACTIVITY: ${Number(avgActiveUsers) > Number(totalUsers) * 0.7 ? '👥 Strong user engagement maintained.' : '📱 Focus on user retention strategies.'}

===============================================
              END OF REPORT
===============================================

This report was generated automatically from SheGuard Reports Dashboard.
For detailed analysis and real-time monitoring, please visit the dashboard.

Report Configuration:
- Data Range: Last ${dateRange} days
- Generated On: ${new Date().toISOString()}
- Report ID: RPT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}
    `;
    
    return report.trim();
  };

  const handleExportCSV = () => {
    const content = generateCSV();
    const filename = `reports-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    const mimeType = 'text/csv;charset=utf-8;';
    
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleGeneratePDF = () => {
    const content = generatePDF();
    const filename = `reports-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    const mimeType = 'text/plain;charset=utf-8;';
    
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const pieData = reportData.length > 0 ? [
    { name: 'SOS Alerts', value: reportData.reduce((sum, d) => sum + d.sos_alerts, 0) },
    { name: 'Health Checkups', value: reportData.reduce((sum, d) => sum + d.health_checkups, 0) },
    { name: 'AI Conversations', value: reportData.reduce((sum, d) => sum + d.ai_conversations, 0) },
  ] : [];

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
          <h1 className="text-3xl font-display font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="hero" onClick={handleGeneratePDF}>
            <FileText className="w-4 h-4 mr-2" />
            Generate PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-display font-bold mt-1">
                  {reportData.reduce((sum, d) => sum + d.total_users, 0).toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+12.5%</span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SOS Alerts</p>
                <p className="text-3xl font-display font-bold mt-1">
                  {reportData.reduce((sum, d) => sum + d.sos_alerts, 0)}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-warning" />
                  <span className="text-sm text-warning">+8.2%</span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Checkups</p>
                <p className="text-3xl font-display font-bold mt-1">
                  {reportData.reduce((sum, d) => sum + d.health_checkups, 0).toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+15.3%</span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center">
                <Heart className="w-7 h-7 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Conversations</p>
                <p className="text-3xl font-display font-bold mt-1">
                  {reportData.reduce((sum, d) => sum + d.ai_conversations, 0).toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">+24.7%</span>
                  <span className="text-xs text-muted-foreground">vs last period</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Brain className="w-7 h-7 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="ai">AI Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Activity Chart */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  User Activity Trends
                </CardTitle>
                <CardDescription>Daily active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reportData}>
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
                        dataKey="active_users"
                        stroke="hsl(267, 84%, 40%)"
                        strokeWidth={2}
                        name="Active Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Activity Distribution */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Activity Distribution
                </CardTitle>
                <CardDescription>Breakdown of platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
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
        </TabsContent>

        <TabsContent value="safety" className="space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Safety Reports
              </CardTitle>
              <CardDescription>SOS alerts and safety incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData}>
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
                      dataKey="sos_alerts"
                      fill="hsl(350, 80%, 65%)"
                      name="SOS Alerts"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Health Analytics
              </CardTitle>
              <CardDescription>Health checkups and wellness metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData}>
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
                      dataKey="health_checkups"
                      stroke="hsl(155, 70%, 40%)"
                      strokeWidth={2}
                      name="Health Checkups"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Performance Metrics
              </CardTitle>
              <CardDescription>AI conversation trends and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData}>
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
                      dataKey="ai_conversations"
                      fill="hsl(267, 84%, 40%)"
                      name="AI Conversations"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
