import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, Mail, Lock, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCinematic, setIsCinematic] = useState(true);
  const { login } = useAuth();

  // Cinematic Intro Delay
  React.useEffect(() => {
    const timer = setTimeout(() => setIsCinematic(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/login", { email, password });
      toast.success("Bem-vindo ao ForYouscale!");
      login(response.data.token, response.data.user);
    } catch (error) {
      toast.error("Credenciais inválidas. Tente admin/admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] flex items-center justify-center overflow-hidden font-sans relative">
      <AnimatePresence>
        {isCinematic && (
          <motion.div
            key="cinematic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-white text-5xl font-display font-bold tracking-tighter"
            >
              ForYou<span className="text-gold">scale</span>
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="h-[1px] bg-gold mt-4 shadow-[0_0_10px_#D4AF37]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] -ml-32 -mb-32 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="z-10 w-full max-w-md"
      >
        <div className="glass-gold p-10 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-gradient rounded-2xl mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <Sparkles className="text-black w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Acesso <span className="text-gold">Premium</span>
            </h1>
            <p className="text-white/40 text-sm">
              Gerencie sua jornada milionária ForYouscale.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white/60 ml-1">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-white/20" />
                <Input
                  type="email"
                  placeholder="seu@parceiro.com"
                  className="bg-white/5 border-white/10 h-12 pl-12 rounded-xl focus:border-gold/50 transition-all text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 ml-1">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-white/20" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 h-12 pl-12 rounded-xl focus:border-gold/50 transition-all text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              disabled={isLoading}
              className="w-full h-12 bg-gold-gradient hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-black font-bold rounded-xl transition-all duration-300 transform active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  Entrar na Plataforma
                  <LogIn className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-white/20 text-xs">
                © 2026 ForYouscale. Todos os direitos reservados.
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
