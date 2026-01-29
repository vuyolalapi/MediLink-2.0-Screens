import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";
import {
  BarChart3,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  AlertTriangle,
  Calendar,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const usageData = [
  { month: "Jan", logins: 4500, sessions: 12000 },
  { month: "Feb", logins: 5200, sessions: 14500 },
  { month: "Mar", logins: 4800, sessions: 13200 },
  { month: "Apr", logins: 5800, sessions: 16000 },
  { month: "May", logins: 6200, sessions: 17500 },
  { month: "Jun", logins: 5900, sessions: 16800 },
];

const departmentStats = [
  { name: "Emergency", patients: 1250, avgWait: "12 min" },
  { name: "Cardiology", patients: 890, avgWait: "25 min" },
  { name: "Pediatrics", patients: 720, avgWait: "18 min" },
  { name: "Surgery", patients: 340, avgWait: "45 min" },
  { name: "Radiology", patients: 1100, avgWait: "15 min" },
];

const emergencyData = [
  { type: "Cardiac", count: 145, color: "#ef4444" },
  { type: "Trauma", count: 98, color: "#f97316" },
  { type: "Respiratory", count: 76, color: "#eab308" },
  { type: "Neurological", count: 54, color: "#22c55e" },
  { type: "Other", count: 89, color: "#3b82f6" },
];

const responseTimeData = [
  { day: "Mon", time: 8.2 },
  { day: "Tue", time: 7.8 },
  { day: "Wed", time: 9.1 },
  { day: "Thu", time: 7.5 },
  { day: "Fri", time: 8.9 },
  { day: "Sat", time: 10.2 },
  { day: "Sun", time: 9.8 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-accent" />
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">Comprehensive insights into hospital operations</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList>
          <TabsTrigger value="usage">Usage Reports</TabsTrigger>
          <TabsTrigger value="medical">Medical Stats</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Metrics</TabsTrigger>
        </TabsList>

        {/* Usage Reports Tab */}
        <TabsContent value="usage" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Logins</p>
                    <p className="text-2xl font-bold">32,450</p>
                  </div>
                  <div className="flex items-center text-success text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold">89,200</p>
                  </div>
                  <div className="flex items-center text-success text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Session Time</p>
                    <p className="text-2xl font-bold">24 min</p>
                  </div>
                  <div className="flex items-center text-urgent text-sm">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    -3%
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Peak Hour</p>
                    <p className="text-2xl font-bold">10 AM</p>
                  </div>
                  <Activity className="w-5 h-5 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>System Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stackId="1"
                      stroke="hsl(var(--accent))"
                      fill="hsl(var(--accent) / 0.3)"
                    />
                    <Area
                      type="monotone"
                      dataKey="logins"
                      stackId="2"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary) / 0.3)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical Stats Tab */}
        <TabsContent value="medical" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Department Patient Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-muted-foreground">{dept.patients} patients</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${(dept.patients / 1250) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  Average Wait Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentStats.map((dept) => (
                    <div key={dept.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium">{dept.name}</span>
                      <Badge variant={
                        parseInt(dept.avgWait) <= 15 ? "success" :
                        parseInt(dept.avgWait) <= 30 ? "warning" : "urgent"
                      }>
                        {dept.avgWait}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Recent Generated Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Monthly Patient Summary", date: "Jan 25, 2026", type: "PDF" },
                  { name: "Quarterly Revenue Report", date: "Jan 20, 2026", type: "Excel" },
                  { name: "Staff Performance Review", date: "Jan 15, 2026", type: "PDF" },
                  { name: "Equipment Maintenance Log", date: "Jan 10, 2026", type: "PDF" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.date}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {report.type}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Metrics Tab */}
        <TabsContent value="emergency" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-urgent/30">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-urgent" />
                  <div>
                    <p className="text-2xl font-bold">462</p>
                    <p className="text-sm text-muted-foreground">Total Emergencies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-success/30">
              <CardContent className="pt-4">
                <div>
                  <p className="text-2xl font-bold">8.4 min</p>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-accent/30">
              <CardContent className="pt-4">
                <div>
                  <p className="text-2xl font-bold">94.2%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-warning/30">
              <CardContent className="pt-4">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Active EMT Units</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emergencyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {emergencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {emergencyData.map((entry) => (
                    <div key={entry.type} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-sm">{entry.type} ({entry.count})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times by Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="time" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
