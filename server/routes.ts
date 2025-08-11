import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for getting tool information
  app.get("/api/tool-info", (req, res) => {
    const toolInfo = {
      name: "CookPhish",
      version: "v3.0.0",
      author: "Technical White Hat",
      description: "Advanced Instagram Phishing Simulation Framework",
      features: [
        "Instagram Clone",
        "2FA Bypass",
        "IP Logging", 
        "Tunneling Support",
        "Auto-Update",
        "Dynamic UI"
      ],
      platforms: ["Termux", "Kali Linux", "Debian"],
      github: "https://github.com/technicalwhitehat-yt/CookPhish"
    };
    
    res.json(toolInfo);
  });

  // API route for getting installation commands
  app.get("/api/installation-commands", (req, res) => {
    const commands = {
      termux: [
        "pkg update && pkg upgrade -y",
        "pkg install git",
        "git clone https://github.com/technicalwhitehat-yt/CookPhish.git",
        "cd CookPhish",
        "bash CookPhish"
      ],
      kali: [
        "sudo apt-get update && upgrade -y",
        "apt-get install git",
        "git clone https://github.com/technicalwhitehat-yt/CookPhish.git",
        "cd CookPhish", 
        "sudo bash CookPhish"
      ],
      requirements: "pip install -r requirements.txt"
    };
    
    res.json(commands);
  });

  // API route for getting social media links
  app.get("/api/social-links", (req, res) => {
    const socialLinks = {
      youtube: "https://youtube.com/@technicalwhitehat",
      instagram: "https://instagram.com/technicalwhitehat",
      telegram: "https://t.me/technicalwhitehat",
      github: "https://github.com/technicalwhitehat-yt",
      email: "technicalwhitehat@protonmail.com"
    };
    
    res.json(socialLinks);
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
