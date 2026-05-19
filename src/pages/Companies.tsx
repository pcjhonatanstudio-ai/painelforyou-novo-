import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Filter,
  Download,
  CheckCircle2,
  Clock,
  ChevronRight,
  MoreVertical,
  X,
  Smartphone,
  Tag
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function Companies() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: "", phone: "", plan: "Gold", status: "Active" });

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/companies");
      setCompanies(res.data);
    } catch (err) {
      toast.error("Erro ao carregar empresas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/companies", newCompany);
      toast.success("Empresa criada com sucesso!");
      setIsCreateOpen(false);
      setNewCompany({ name: "", phone: "", plan: "Gold", status: "Active" });
      fetchCompanies();
    } catch (err) {
      toast.error("Erro ao criar empresa.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta empresa premium?")) {
      try {
        await api.delete(`/companies/${id}`);
        toast.success("Empresa removida.");
        fetchCompanies();
      } catch (err) {
        toast.error("Erro ao deletar.");
      }
    }
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Gestão de <span className="text-gold">Empresas</span>
          </h1>
          <p className="text-white/40 mt-1">Controle seu portfólio de parceiros premium.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 text-white/60 hover:bg-white/5 rounded-xl">
            <Download className="w-4 h-4 mr-2" /> Exportar
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gold-gradient text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-all">
                <Plus className="w-4 h-4 mr-2 text-black" /> Nova Empresa
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-gold border-white/10 text-white sm:max-w-[500px] rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Criar <span className="text-gold">Nova Parceria</span></DialogTitle>
                <DialogDescription className="text-white/40">Insira os detalhes da empresa para iniciar a escala.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label className="text-white/60">Nome da Empresa</Label>
                  <Input 
                    required 
                    value={newCompany.name} 
                    onChange={e => setNewCompany({...newCompany, name: e.target.value})}
                    placeholder="Ex: Luxury Brand Inc"
                    className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-gold/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label className="text-white/60">Telefone Principal</Label>
                    <Input 
                      required 
                      value={newCompany.phone} 
                      onChange={e => setNewCompany({...newCompany, phone: e.target.value})}
                      placeholder="+55 11 9..."
                      className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-gold/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/60">Plano</Label>
                    <select 
                      value={newCompany.plan}
                      onChange={e => setNewCompany({...newCompany, plan: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 h-12 rounded-xl px-4 text-white focus:border-gold/50 outline-none appearance-none"
                    >
                      <option className="bg-[#141414]" value="Standard">Standard</option>
                      <option className="bg-[#141414]" value="Gold">Gold</option>
                      <option className="bg-[#141414]" value="Diamond">Diamond</option>
                    </select>
                  </div>
                </div>
                <DialogFooter className="pt-6">
                  <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)} className="text-white/40">Cancelar</Button>
                  <Button type="submit" className="bg-gold-gradient text-black font-bold h-12 px-8 rounded-xl">Finalizar Cadastro</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="glass border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
            <Input 
              placeholder="Pesquisar por nome ou plano..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border-white/10 pl-10 h-10 rounded-xl focus:border-gold/50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white/40 hover:text-gold"><Filter className="w-4 h-4 mr-2" /> Filtros</Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-white/40 text-[10px] font-bold uppercase tracking-widest py-6 pl-8">Empresa</TableHead>
              <TableHead className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Telefone / ID</TableHead>
              <TableHead className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Plano</TableHead>
              <TableHead className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-right pr-8">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              [1, 2, 3].map(i => (
                <TableRow key={i} className="border-white/5">
                  <TableCell className="pl-8 py-6"><div className="h-4 w-32 bg-white/5 rounded animate-pulse" /></TableCell>
                  <TableCell><div className="h-4 w-24 bg-white/5 rounded animate-pulse" /></TableCell>
                  <TableCell><div className="h-4 w-16 bg-white/5 rounded animate-pulse" /></TableCell>
                  <TableCell><div className="h-4 w-12 bg-white/5 rounded mx-auto animate-pulse" /></TableCell>
                  <TableCell className="pr-8 text-right"><div className="h-4 w-4 bg-white/5 rounded ml-auto animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : filteredCompanies.length === 0 ? (
               <TableRow>
                <TableCell colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-4 text-white/20">
                    <Building2 className="w-12 h-12" />
                    <p>Nenhuma empresa encontrada.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company.id} className="border-white/5 hover:bg-white/5 group transition-all">
                  <TableCell className="pl-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Building2 className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-gold transition-colors">{company.name}</p>
                        <p className="text-[10px] text-white/40">Desde Maio 2026</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-white/60 flex items-center gap-1"><Smartphone className="w-3 h-3 text-gold/50" /> {company.phone}</span>
                      <span className="text-[10px] text-white/20 mt-1 uppercase tracking-tighter">ID: {company.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`
                      rounded-full px-3 py-0.5 text-[10px] font-bold border-none
                      ${company.plan === "Diamond" ? "bg-gold text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "bg-white/10 text-white/60"}
                    `}>
                      {company.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                      <span className="text-xs text-green-400 font-medium">Ativo</span>
                    </div>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="text-white/20 hover:text-gold hover:bg-gold/5 rounded-lg"><Edit2 className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" onClick={() => handleDelete(company.id)} className="text-white/20 hover:text-red-400 hover:bg-red-400/5 rounded-lg"><Trash2 className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="text-white/20 hover:text-white hover:bg-white/5 rounded-lg"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        <div className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between">
           <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest pl-4">Exibindo {filteredCompanies.length} empresas premium</p>
           <div className="flex gap-2 pr-4">
             <Button disabled variant="outline" size="sm" className="border-white/5 text-white/20 h-8 rounded-lg text-[10px]">Anterior</Button>
             <Button disabled variant="outline" size="sm" className="border-white/5 text-white/20 h-8 rounded-lg text-[10px]">Próximo</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
