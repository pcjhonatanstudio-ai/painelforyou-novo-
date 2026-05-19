import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Smartphone, 
  QrCode, 
  RefreshCw, 
  Power, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import api from "@/lib/api";
import { toast } from "sonner";

export default function WhatsApp() {
  const [status, setStatus] = useState("disconnected");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const fetchConnection = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/whatsapp/connect/1"); // Mocked company ID
      setQrCode(response.data.qr);
      setStatus(response.data.status);
    } catch (error) {
      toast.error("Erro ao carregar conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection flow
    setTimeout(() => {
      setIsConnecting(false);
      setStatus("connected");
      toast.success("WhatsApp conectado com sucesso!");
    }, 3000);
  };

  const handleDisconnect = () => {
    setStatus("disconnected");
    toast.info("WhatsApp desconectado.");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Conexão <span className="text-gold">WhatsApp</span>
          </h1>
          <p className="text-white/40 mt-1">Sincronize sua comunicação em escala real.</p>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/5 flex items-center gap-2
          ${status === "connected" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}
        `}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${status === "connected" ? "bg-green-400" : "bg-red-400"}`} />
          {status === "connected" ? "Online" : "Desconectado"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <Card className="glass-gold border-white/5 relative overflow-hidden flex flex-col items-center justify-center p-8 min-h-[500px]">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-gold animate-spin" />
              <p className="text-white/40 animate-pulse">Gerando QR Code premium...</p>
            </div>
          ) : status === "connected" ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Dispositivo Conectado</h3>
                <p className="text-white/40 mt-2">Sua instância está rodando perfeitamente.</p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleDisconnect}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl"
              >
                <Power className="w-4 h-4 mr-2" /> Desconectar Instância
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={fetchConnection} className="text-white/40 hover:text-gold">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-2 bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="bg-white p-6 rounded-2xl relative">
                  {qrCode ? (
                    <img src={qrCode} alt="QR Code" className="w-64 h-64 border-0" />
                  ) : (
                    <div className="w-64 h-64 bg-slate-100 flex items-center justify-center rounded-xl">
                       <QrCode className="w-16 h-16 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 text-center space-y-2">
                <p className="text-white font-medium">Escaneie o QR Code no seu WhatsApp</p>
                <p className="text-white/40 text-sm max-w-[280px] mx-auto">
                  Vá em Configurações &gt; Dispositivos Conectados &gt; Conectar um Dispositivo.
                </p>
              </div>
              
              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="mt-6 w-full max-w-[200px] bg-gold-gradient text-black font-bold rounded-xl"
              >
                {isConnecting ? <Loader2 className="animate-spin w-5 h-5" /> : "Conectar Agora"}
              </Button>
            </>
          )}
        </Card>

        {/* Instructions / Info */}
        <div className="space-y-6">
          <Card className="glass border-white/5 p-6 hover-gold-glow transition-all duration-300">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-gold" />
              Por que conectar?
            </h3>
            <ul className="space-y-4">
              {[
                { title: "Escala com IA", desc: "Ato-atendimento 24/7 de altíssima performance." },
                { title: "Segurança Blindada", desc: "Criptografia de ponta a ponta em todos os leads." },
                { title: "Métricas Reais", desc: "Acompanhe funis e conversões direto no seu dashboard." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-white/40 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="glass border-white/5 p-6 bg-gradient-to-br from-gold/5 to-transparent">
             <div className="flex items-start gap-4">
               <div className="p-3 bg-gold/10 rounded-xl">
                 <AlertCircle className="w-6 h-6 text-gold" />
               </div>
               <div>
                 <h4 className="text-white font-bold">Informação Importante</h4>
                 <p className="text-white/40 text-sm mt-1">
                   Mantenha o seu celular conectado à internet para garantir que o ForYouscale consiga processar todas as mensagens através da nossa IA de alta performance.
                 </p>
                 <Button variant="link" className="text-gold p-0 h-auto mt-4 text-xs">
                   Ver termos de serviço premium <ExternalLink className="w-3 h-3 ml-1" />
                 </Button>
               </div>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
