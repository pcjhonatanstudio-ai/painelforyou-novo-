import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  MessageSquare, 
  Bot, 
  Smartphone, 
  TrendingUp, 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from "recharts";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Seg", messages: 1200, revenue: 400 },
  { name: "Ter", messages: 1900, revenue: 700 },
  { name: "Qua", messages: 1500, revenue: 600 },
  { name: "Qui", messages: 2100, revenue: 900 },
  { name: "Sex", messages: 2500, revenue: 1100 },
  { name: "Sáb", messages: 1800, revenue: 800 },
  { name: "Dom", messages: 1400, revenue: 500 },
];

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard/metrics").then((res) => setMetrics(res.data));
  }, []);

  const MetricCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <Card className="glass-gold border-white/5 relative overflow-hidden group hover-gold-glow transition-all duration-500">
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-[60px] opacity-20 bg-${color}`} />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white/40 text-xs font-semibold uppercase tracking-wider">
            {title}
          </CardTitle>
          <div className="p-2 rounded-lg bg-white/5 group-hover:bg-gold/20 transition-colors">
            <Icon className="w-4 h-4 text-gold" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3">
          <h2 className="text-3xl font-bold text-white">
            {typeof value === "number" && title === "Faturamento" ? `R$ ${value.toLocaleString()}` : value}
          </h2>
          {trend && (
            <div className={`flex items-center text-xs mb-1 ${trend > 0 ? "text-green-400" : "text-red-400"}`}>
              {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">
            Dashboard <span className="text-gold">Executivo</span>
          </h1>
          <p className="text-white/40 mt-1">Bem-vindo à sua central de escala premium.</p>
        </div>
        <div className="flex gap-3">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10">
            <Activity className="w-4 h-4 text-gold animate-pulse" />
            <span className="text-xs font-medium text-white/60">Sistemas Online</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard 
          title="Mensagens Totais" 
          value={metrics?.totalMessages?.toLocaleString() || "..."} 
          icon={MessageSquare} 
          trend={12} 
        />
        <MetricCard 
          title="Atendimentos IA" 
          value={metrics?.aiInteractions?.toLocaleString() || "..."} 
          icon={Bot} 
          trend={24} 
        />
        <MetricCard 
          title="WhatsApps" 
          value={metrics?.connectedWhatsApp || "..."} 
          icon={Smartphone} 
        />
        <MetricCard 
          title="Faturamento" 
          value={metrics?.revenue || 0} 
          icon={TrendingUp} 
          trend={15.4} 
        />
        <MetricCard 
          title="Empresas Ativas" 
          value={metrics?.activeCompanies || "..."} 
          icon={Building2} 
        />
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass border-white/5 hover:border-gold/20 transition-all duration-500 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              Volume de Escala Semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#4A4A4A" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#4A4A4A" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#141414", 
                    borderColor: "#D4AF37", 
                    borderRadius: "12px",
                    color: "#fff"
                  }}
                  itemStyle={{ color: "#D4AF37" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="messages" 
                  stroke="#D4AF37" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorGold)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-white/5 hover:border-gold/20 transition-all duration-500">
          <CardHeader>
            <CardTitle className="text-white">Performance Financeira</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="name" stroke="#4A4A4A" fontSize={11} hide />
                <YAxis stroke="#4A4A4A" fontSize={11} hide />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: "#141414", 
                    borderColor: "#D4AF37", 
                    borderRadius: "12px",
                  }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="revenue" 
                  stroke="#D4AF37" 
                  strokeWidth={2} 
                  dot={{ fill: "#D4AF37", r: 4 }} 
                  activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-white/60">Ticket Médio</span>
                <span className="text-gold font-bold">R$ 1.245,00</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-white/60">Churn Rate</span>
                <span className="text-green-400 font-bold">1.2%</span>
              </div>
               <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-white/60">Crescimento Mensal</span>
                <span className="text-gold font-bold">+28%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Decorative Grid Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
