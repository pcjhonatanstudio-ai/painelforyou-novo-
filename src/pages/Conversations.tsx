import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Smile, 
  Phone, 
  Video, 
  Info,
  User,
  CheckCheck,
  Circle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const contacts = [
  { id: 1, name: "Maria Silva", lastMsg: "Preciso de informações sobre o plano Diamond", time: "10:30", typing: true, online: true, unread: 2 },
  { id: 2, name: "Roberto Menezes", lastMsg: "Obrigado pelo atendimento, a IA é incrível!", time: "Ontem", typing: false, online: false, unread: 0 },
  { id: 3, name: "Amanda Costa", lastMsg: "Como faço para integrar meu CRM?", time: "Ontem", typing: false, online: true, unread: 0 },
  { id: 4, name: "Lux Group CEO", lastMsg: "Quero escalar para 50 atendentes simultâneos", time: "09:12", typing: false, online: true, unread: 1 },
];

const messagesMock = [
  { id: 1, text: "Olá! Como posso ajudar você hoje?", me: true, time: "10:25" },
  { id: 2, text: "Gostaria de saber sobre os benefícios da escala com IA.", me: false, time: "10:28" },
  { id: 3, text: "Com certeza! Nossa IA Premium reduz custos operacionais em até 70% e aumenta a conversão em 40%.", me: true, time: "10:29" },
  { id: 4, text: "Isso parece exatamente o que eu preciso. Como começamos?", me: false, time: "10:30" },
];

export default function Conversations() {
  const [selectedChat, setSelectedChat] = useState<any>(contacts[0]);
  const [messages, setMessages] = useState(messagesMock);
  const [newMsg, setNewMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    
    const msg = {
      id: Date.now(),
      text: newMsg,
      me: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, msg]);
    setNewMsg("");
  };

  return (
    <div className="h-[calc(100vh-160px)] flex border border-white/5 rounded-[2rem] overflow-hidden glass shadow-2xl">
      {/* Sidebar Contacts */}
      <div className="w-96 border-r border-white/5 flex flex-col bg-black/20">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Conversas</h2>
            <div className="bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              <span className="text-[10px] font-bold text-gold uppercase tracking-tighter">Premium Hub</span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <Input 
              placeholder="Buscar chats..." 
              className="bg-white/5 border-white/10 pl-10 rounded-xl focus:border-gold/50 transition-all h-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {contacts.map((contact) => (
              <motion.div
                key={contact.id}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                onClick={() => setSelectedChat(contact)}
                className={`
                  p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all relative
                  ${selectedChat.id === contact.id ? "bg-white/5 border border-white/10" : ""}
                `}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border border-white/10">
                    <AvatarFallback className="bg-gold/10 text-gold">{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white truncate">{contact.name}</span>
                    <span className="text-[10px] text-white/40">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs truncate ${contact.typing ? "text-gold italic font-medium" : "text-white/40"}`}>
                      {contact.typing ? "Digitando..." : contact.lastMsg}
                    </p>
                    {contact.unread > 0 && (
                      <div className="bg-gold text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0A0A0A]/40">
        {/* Header */}
        <div className="h-20 px-8 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border border-gold/30">
               <AvatarFallback className="bg-gold/10 text-gold">{selectedChat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">{selectedChat.name}</h3>
              <p className="text-[10px] text-white/40 mt-1 flex items-center gap-1">
                {selectedChat.online ? <><Circle className="w-1.5 h-1.5 fill-green-500 text-green-500" /> Online</> : "Visto por último hoje"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-gold"><Phone className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-gold"><Video className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-gold"><Info className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="text-white/40 hover:text-gold"><MoreVertical className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <span className="bg-white/5 text-white/40 text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">Hoje</span>
            </div>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: msg.me ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.me ? "justify-end" : "justify-start"}`}
              >
                <div className={`
                  max-w-[70%] p-4 rounded-2xl relative
                  ${msg.me 
                    ? "bg-gold-gradient text-black font-medium shadow-lg" 
                    : "bg-white/10 text-white border border-white/5"
                  }
                `}>
                  <p className="text-sm">{msg.text}</p>
                  <div className={`mt-2 flex items-center gap-1 text-[10px] ${msg.me ? "text-black/60" : "text-white/40"}`}>
                    {msg.time}
                    {msg.me && <CheckCheck className="w-3 h-3" />}
                  </div>
                  {/* Bubble tail - purely decorative */}
                  <div className={`
                    absolute top-4 w-2 h-2 rotate-45
                    ${msg.me ? "-right-1 bg-gold-dark" : "-left-1 bg-white/10"}
                  `} />
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-6 bg-black/40 border-t border-white/5">
          <form onSubmit={handleSend} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-2 pl-4 pr-1 focus-within:border-gold/30 transition-all">
            <Button variant="ghost" size="icon" type="button" className="text-white/40 hover:text-gold"><Smile className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" type="button" className="text-white/40 hover:text-gold"><Paperclip className="w-5 h-5" /></Button>
            <input 
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Digite sua resposta premium..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-white text-sm"
            />
            <Button 
              type="submit" 
              className="bg-gold text-black h-10 w-10 p-0 rounded-xl hover:bg-gold-light transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
