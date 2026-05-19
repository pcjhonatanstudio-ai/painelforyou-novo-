import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---
  
  // Auth Mock
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      res.json({ token: "premium-jwt-token", user: { name: "Premium Admin", email } });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Dashboard Metrics
  app.get("/api/dashboard/metrics", (req, res) => {
    res.json({
      totalMessages: 12450,
      aiInteractions: 8900,
      connectedWhatsApp: 5,
      revenue: 15400.50,
      activeCompanies: 12,
      growth: 15.4
    });
  });

  // WhatsApp APIs
  app.get("/api/whatsapp/connect/:empresaId", (req, res) => {
    res.json({ status: "disconnected", qr: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=foryouscale-premium-connection" });
  });

  app.get("/api/whatsapp/qrcode/:empresaId", (req, res) => {
    res.json({ qr: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=foryouscale-premium-connection-retry" });
  });

  // Companies CRUD (In-memory)
  let companies = [
    { id: "1", name: "Luxury Brand Co", phone: "+551199999999", plan: "Diamond", status: "Active" },
    { id: "2", name: "Elite Services Inc", phone: "+551188888888", plan: "Gold", status: "Active" },
  ];

  app.get("/api/companies", (req, res) => res.json(companies));
  app.post("/api/companies", (req, res) => {
    const newCompany = { ...req.body, id: Math.random().toString(36).substr(2, 9) };
    companies.push(newCompany);
    res.status(201).json(newCompany);
  });
  app.delete("/api/companies/:id", (req, res) => {
    companies = companies.filter(c => c.id !== req.params.id);
    res.status(204).send();
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
