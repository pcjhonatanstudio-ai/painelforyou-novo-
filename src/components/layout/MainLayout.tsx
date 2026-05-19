import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Smartphone, 
  Bot, 
  Building2, 
  CircleDollarSign, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Smartphone, label: "WhatsApp", href: "/whatsapp" },
  { icon: MessageSquare, label: "Conversas", href: "/conversations" },
  { icon: Bot, label: "IA", href: "/ia" },
  { icon: Building2, label: "Empresas", href: "/companies" },
  { icon: CircleDollarSign, label: "Financeiro", href: "/finance" },
  { icon: Settings, label: "Configurações", href: "/settings" },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="relative z-40 flex flex-col glass border-r border-white/10"
      >
        <div className="h-20 flex items-center justify-center border-b border-white/5">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <span className="text-black font-bold text-xl">F</span>
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold tracking-tight text-white"
              >
                ForYou<span className="text-gold">scale</span>
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? "bg-gold/10 text-gold border border-gold/20 shadow-[0_0_10px_rgba(212,175,55,0.1)]" 
                      : "text-white/60 hover:text-gold hover:bg-white/5"
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-gold" : ""}`} />
                  {sidebarOpen && (
                    <span className="font-medium">{item.label}</span>
                  )}
                  {isActive && sidebarOpen && (
                    <motion.div
                      layoutId="active-pill"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-gold"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 space-y-2">
          <button
            onClick={logout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Navbar */}
        <header className="h-20 glass-gold border-b border-white/5 px-8 flex items-center justify-between z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white/60 hover:text-gold"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:border-gold/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-white/60 hover:text-gold transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">{user?.name || "Premium User"}</p>
                <p className="text-xs text-white/40">Plano Diamond</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-gold/20 hover:border-gold transition-all cursor-pointer">
                <AvatarFallback className="bg-gold/10 text-gold uppercase">
                  {user?.name?.[0] || <User size={20}/>}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-[#0A0A0A]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </section>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/3 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />
      </main>
    </div>
  );
}
