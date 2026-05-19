import React from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Database,
  Cloud,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Configurações do <span className="text-gold">Ecossistema</span>
        </h1>
        <p className="text-white/40 mt-1">Personalize sua experiência ForYouscale.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="space-y-2">
          {[
            { label: "Meu Perfil", icon: User, active: true },
            { label: "Segurança", icon: Lock },
            { label: "Notificações", icon: Bell },
            { label: "Faturamento", icon: CreditCard },
            { label: "Integrações", icon: Database },
          ].map((item, i) => (
            <button 
              key={i} 
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${item.active ? "bg-gold/10 text-gold border border-gold/20" : "text-white/40 hover:bg-white/5 hover:text-white"}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.active && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </aside>

        <div className="md:col-span-3 space-y-8">
          <Card className="glass border-white/5 p-8 space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gold-gradient p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-gold font-bold text-2xl uppercase">
                  PA
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Premium Admin</h3>
                <p className="text-sm text-white/40">admin@foryouscale.com</p>
                <Button variant="outline" className="mt-4 border-gold/30 text-gold hover:bg-gold/10 rounded-lg text-xs h-8">
                  Alterar Foto
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
              <div className="space-y-2">
                <Label className="text-white/40">Nome Completo</Label>
                <Input defaultValue="Premium Admin User" className="bg-white/5 border-white/10 rounded-xl focus:border-gold/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/40">E-mail de Contato</Label>
                <Input defaultValue="admin@foryouscale.com" className="bg-white/5 border-white/10 rounded-xl focus:border-gold/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/40">Telefone Profissional</Label>
                <Input defaultValue="+55 11 99999-9999" className="bg-white/5 border-white/10 rounded-xl focus:border-gold/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/40">Cargo / Função</Label>
                <Input defaultValue="CEO & Founder" className="bg-white/5 border-white/10 rounded-xl focus:border-gold/50" />
              </div>
            </div>
          </Card>

          <Card className="glass border-white/5 p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold" />
              Preferências de Segurança
            </h3>
            <div className="space-y-6">
              {[
                { title: "Autenticação de Dois Fatores", desc: "Aumente a segurança da sua conta premium.", active: true },
                { title: "Notificações de Login", desc: "Receba alertas sobre acessos suspeitos.", active: true },
                { title: "Sessões Ativas", desc: "Ver dispositivos conectados agora.", active: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-sm font-bold text-white">{pref.title}</p>
                    <p className="text-xs text-white/40">{pref.desc}</p>
                  </div>
                  <Switch defaultChecked={pref.active} className="data-[state=checked]:bg-gold" />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end gap-4">
             <Button variant="ghost" className="text-white/40 hover:text-white">Descartar</Button>
             <Button className="bg-gold-gradient text-black font-bold px-8 rounded-xl">Salvar Preferências</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
