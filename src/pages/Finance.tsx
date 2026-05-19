import React from "react";
import { motion } from "motion/react";
import { 
  CircleDollarSign, 
  TrendingUp, 
  CreditCard, 
  Users, 
  ArrowUpRight, 
  Calendar, 
  Download,
  Wallet,
  Receipt,
  PieChart as PieChartIcon
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Fev", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Abr", revenue: 61000 },
  { month: "Mai", revenue: 75000 },
  { month: "Jun", revenue: 89000 },
];

const distributionData = [
  { name: "Diamond", value: 45, color: "#D4AF37" },
  { name: "Gold", value: 35, color: "#F2D265" },
  { name: "Standard", value: 20, color: "#2A2A2A" },
];

export default function Finance() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Saúde <span className="text-gold">Financeira</span>
          </h1>
          <p className="text-white/40 mt-1">Visão analítica dos seus ativos e faturamento.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 text-white/40 hover:bg-white/5 rounded-xl">
            <Calendar className="w-4 h-4 mr-2" /> Maio 2026
          </Button>
          <Button className="bg-gold-gradient text-black font-bold rounded-xl shadow-lg">
            <Download className="w-4 h-4 mr-2" /> Baixar Relatório
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "MRR (Receita Mensal)", value: "R$ 89.450", icon: Wallet, trend: "+12.5%", color: "gold" },
          { title: "ARR (Receita Anual)", value: "R$ 1.073.400", icon: CircleDollarSign, trend: "+8.2%", color: "gold" },
          { title: "LTV Médio", value: "R$ 12.400", icon: TrendingUp, trend: "+15.0%", color: "gold" },
          { title: "CAC", value: "R$ 450,00", icon: Users, trend: "-2.4%", color: "green" }
        ].map((kpi, i) => (
          <Card key={i} className="glass-gold border-white/5 p-6 hover-gold-glow transition-all duration-300 overflow-hidden relative group">
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
             <div className="flex items-center justify-between mb-4">
               <div className="p-2 bg-gold/10 rounded-lg">
                 <kpi.icon className="w-5 h-5 text-gold" />
               </div>
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${kpi.trend.startsWith('+') ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                 {kpi.trend}
               </span>
             </div>
             <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{kpi.title}</p>
             <h3 className="text-2xl font-bold text-white mt-1">{kpi.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass border-white/5 p-8 flex flex-col">
          <CardHeader className="p-0 mb-8">
             <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white">Faturamento Mensal</CardTitle>
                  <p className="text-sm text-white/40">Crescimento constante do ecossistema premium.</p>
                </div>
                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-1.5">
                     <div className="w-2 h-2 rounded-full bg-gold" />
                     <span className="text-[10px] text-white/40 uppercase font-bold">Realizado</span>
                   </div>
                </div>
             </div>
          </CardHeader>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis dataKey="month" stroke="#4A4A4A" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#4A4A4A" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `R$ ${v/1000}k`} />
                <Tooltip 
                   cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }}
                   contentStyle={{ backgroundColor: "#141414", borderColor: "#D4AF37", borderRadius: "12px" }}
                />
                <Bar dataKey="revenue" fill="#D4AF37" radius={[6, 6, 0, 0]} barSize={40}>
                   {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? "#D4AF37" : "#1A1A1A"} stroke={index === revenueData.length - 1 ? "none" : "#D4AF37"} strokeWidth={1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass border-white/5 p-8">
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-white">Distribuição de Planos</CardTitle>
            <p className="text-xs text-white/40">Market share interno por categoria.</p>
          </CardHeader>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#141414", borderColor: "#D4AF37", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3">
             {distributionData.map((d) => (
               <div key={d.name} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-gold/20 transition-all cursor-default">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-sm font-medium text-white/60">{d.name}</span>
                 </div>
                 <span className="text-sm font-bold text-white">{d.value}%</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      {/* Recents Actions / Subscriptions */}
      <Card className="glass border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Receipt className="w-5 h-5 text-gold" />
            Assinaturas recentes
          </h3>
          <Button variant="link" className="text-gold text-xs h-auto p-0">Ver todas</Button>
        </div>
        <div className="divide-y divide-white/5">
           {[
             { name: "John Doe", email: "john@premium.com", amount: "R$ 1.490", date: "Hoje, 14:20", status: "Pago", plan: "Diamond" },
             { name: "Sarah Connor", email: "sarah@future.io", amount: "R$ 890", date: "Hoje, 11:05", status: "Pago", plan: "Gold" },
             { name: "Bruce Wayne", email: "bruce@industries.com", amount: "R$ 1.490", date: "Ontem", status: "Pendente", plan: "Diamond" }
           ].map((sub, i) => (
             <div key={i} className="p-5 flex items-center justify-between hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-gold/30 transition-all">
                    <User className="w-5 h-5 text-white/40 group-hover:text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{sub.name}</p>
                    <p className="text-[10px] text-white/40">{sub.email}</p>
                  </div>
                </div>
                <div className="text-center hidden md:block">
                  <p className="text-xs font-bold text-white">{sub.plan}</p>
                  <p className="text-[10px] text-white/20 uppercase">Plano Selecionado</p>
                </div>
                 <div className="text-center hidden md:block">
                  <p className="text-xs font-medium text-white/60">{sub.date}</p>
                  <p className="text-[10px] text-white/20 uppercase">Data Transação</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{sub.amount}</p>
                  <span className={`text-[10px] font-bold ${sub.status === "Pago" ? "text-green-400" : "text-amber-400 animate-pulse"}`}>
                    {sub.status}
                  </span>
                </div>
             </div>
           ))}
        </div>
      </Card>
    </div>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
