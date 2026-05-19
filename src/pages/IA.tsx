import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Bot, 
  Brain, 
  Sparkles, 
  Zap, 
  Clock, 
  Settings2, 
  MessageCircle,
  Save,
  HelpCircle,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function IA() {
  const [prompt, setPrompt] = useState("Você é um atendente de luxo para a ForYouscale. Seja extremamente educado, persuasivo e use um vocabulário refinado. Seu objetivo é levar o cliente para o plano Diamond.");
  const [temp, setTemp] = useState([0.7]);
  const [iaActive, setIaActive] = useState(true);
  const [autoReply, setAutoReply] = useState(true);

  const handleSave = () => {
    toast.success("Configurações de IA salvas com sucesso!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Configuração <span className="text-gold">Inteligente</span>
          </h1>
          <p className="text-white/40 mt-1">Refine o cérebro da sua operação milionária.</p>
        </div>
        <Button onClick={handleSave} className="bg-gold-gradient text-black font-bold h-11 px-8 rounded-xl shadow-lg ring-offset-black transition-all hover:scale-105 active:scale-95">
          <Save className="w-4 h-4 mr-2" /> Salvar Alterações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="glass-gold border-white/10 p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
              <div className="p-3 bg-gold/10 rounded-2xl">
                <Brain className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Persona da IA</h3>
                <p className="text-white/40 text-xs mt-1">Defina como a inteligência deve se comportar.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-white/60">Prompt Mestre (Instruções de Sistema)</Label>
                <div className="flex items-center gap-1 text-[10px] text-gold uppercase font-bold bg-gold/5 px-2 py-0.5 rounded border border-gold/10">
                  <Sparkles className="w-3 h-3" /> Poder de Venda Ativado
                </div>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full min-h-[250px] bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:border-gold/50 focus:ring-1 focus:ring-gold/20 outline-none transition-all leading-relaxed custom-scrollbar"
                placeholder="Exuberância e persuasão..."
              />
              <p className="text-[10px] text-white/20 italic italic">Dica: Use variáveis como {"{nome_cliente}"} para personalização extrema.</p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass border-white/5 p-6 hover-gold-glow transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-gold" />
                  <span className="text-sm font-bold text-white leading-none">Criatividade (Temperatura)</span>
                </div>
                <span className="bg-gold/10 text-gold text-xs px-2 py-0.5 rounded border border-gold/20">{temp[0]}</span>
              </div>
              <Slider 
                value={temp} 
                onValueChange={setTemp} 
                max={1} 
                step={0.1} 
                className="[&_.relative_div_span]:bg-gold"
              />
              <div className="flex justify-between mt-4 text-[10px] text-white/20 font-medium tracking-wider uppercase">
                <span>Preciso</span>
                <span>Equilibrado</span>
                <span>Criativo</span>
              </div>
            </Card>

            <Card className="glass border-white/5 p-6 hover-gold-glow transition-all">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-gold" />
                <span className="text-sm font-bold text-white">Horário de Atendimento IA</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-xs text-white/40">Segunda a Sexta</span>
                  <span className="text-xs text-white font-medium">08:00 - 22:00</span>
                </div>
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 opacity-50">
                   <span className="text-xs text-white/40">Sábado e Domingo</span>
                   <span className="text-xs text-white font-medium">Desativado</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <Card className="glass border-white/5 p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-gold" />
              Estado da Operação
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Motor IA Ativo</p>
                  <p className="text-[10px] text-white/40">Respostas automáticas inteligentes</p>
                </div>
                <Switch checked={iaActive} onCheckedChange={setIaActive} className="data-[state=checked]:bg-gold" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Mensagem de Boas-vindas</p>
                  <p className="text-[10px] text-white/40">Primeiro contato automático</p>
                </div>
                <Switch checked={autoReply} onCheckedChange={setAutoReply} className="data-[state=checked]:bg-gold" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Filtro de Linguagem</p>
                  <p className="text-[10px] text-white/40">Garantir tom premium</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-gold" />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold/10 hover:text-gold rounded-xl h-11">
                <Play className="w-4 h-4 mr-2" /> Testar Fluxo Agora
              </Button>
            </div>
          </Card>

          <Card className="glass border-white/5 p-6 bg-gradient-to-br from-gold/10 via-transparent to-transparent">
            <div className="flex gap-4">
              <div className="p-3 bg-gold/5 rounded-xl border border-gold/10">
                <HelpCircle className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Assistente de Prompt</h4>
                <p className="text-[10px] text-white/40 mt-1 leading-relaxed">
                  Utilize nossa biblioteca de prompts validados para negócios de alto padrão.
                </p>
                <Button variant="link" className="text-gold p-0 h-auto text-[10px] mt-2 group">
                  Acessar Biblioteca Premium <Sparkles className="w-3 h-3 ml-1 group-hover:animate-pulse" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
