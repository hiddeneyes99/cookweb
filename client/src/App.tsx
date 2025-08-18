import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/Home";
import Pro from "@/pages/Pro";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

function Header() {
  const [location] = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between container mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300" data-testid="header-logo">
            CookPhish
          </Link>
          
          <nav className="flex items-center space-x-3 sm:space-x-6">
            <Link href="/" className={`text-sm sm:text-base text-white/80 hover:text-white transition-colors duration-300 ${location === '/' ? 'text-white font-semibold' : ''}`} data-testid="nav-home">
              Home
            </Link>
            <Link href="/pro" className={`text-sm sm:text-base text-white/80 hover:text-white transition-colors duration-300 ${location === '/pro' ? 'text-white font-semibold' : ''}`} data-testid="nav-pro">
              Pro
            </Link>
            
            {/* Mobile buttons - Show both Get Started and YouTube */}
            <div className="flex sm:hidden space-x-2">
              <a
                href="https://github.com/technicalwhitehat-yt/CookPhish"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-xs hover:bg-white/20 transition-colors flex items-center"
                data-testid="mobile-github-btn"
              >
                <i className="fab fa-github mr-1"></i>
                <span>Get Started</span>
              </a>
              <a
                href="https://youtube.com/@technicalwhitehat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-red-500 border border-red-400 rounded-lg text-white text-xs hover:bg-red-600 transition-colors flex items-center"
                data-testid="mobile-youtube-btn"
              >
                <i className="fab fa-youtube mr-1"></i>
                <span>YouTube</span>
              </a>
            </div>
            
            {/* Desktop buttons - Show GitHub, YouTube, and Pro */}
            <div className="hidden sm:flex space-x-3">
              <a
                href="https://github.com/technicalwhitehat-yt/CookPhish"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm hover:bg-white/20 transition-colors flex items-center space-x-2"
                data-testid="desktop-github-btn"
              >
                <i className="fab fa-github"></i>
                <span>Get Started</span>
              </a>
              <a
                href="https://youtube.com/@technicalwhitehat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-500 border border-red-400 rounded-lg text-white text-sm hover:bg-red-600 transition-colors flex items-center space-x-2"
                data-testid="desktop-youtube-btn"
              >
                <i className="fab fa-youtube"></i>
                <span>YouTube</span>
              </a>
              <Link
                href="/pro"
                className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg text-white text-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-colors flex items-center space-x-2"
                data-testid="desktop-pro-btn"
              >
                <i className="fas fa-crown text-purple-400"></i>
                <span>Pro</span>
              </Link>
            </div>
          </nav>
        </div>
    </header>
  );
}

function SEOHead({ title, description, path }: { title: string; description: string; path: string }) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${window.location.origin}${path}` },
      { property: 'og:site_name', content: 'CookPhish' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ];
    
    ogTags.forEach(tag => {
      const key = tag.property || tag.name;
      const value = tag.content;
      if (key && value) {
        let element = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${key}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(tag.property ? 'property' : 'name', key);
          document.head.appendChild(element);
        }
        element.setAttribute('content', value);
      }
    });
  }, [title, description, path]);
  
  return null;
}



function Router() {
  const [location] = useLocation();
  
  return (
    <Switch>
      <Route path="/">
        <SEOHead 
          title="CookPhish - Advanced Phishing Simulation Framework | Educational Cybersecurity Tool"
          description="CookPhish is a comprehensive phishing simulation framework for cybersecurity education, ethical hacking training, and authorized penetration testing. Created by Ahmar from Technical White Hat."
          path="/"
        />
        <Home />
      </Route>
      <Route path="/pro">
        <SEOHead 
          title="CookPhish Pro - Coming Soon | Unlimited Features & Advanced Security Tools"
          description="Get ready for CookPhish Pro with unlimited features, advanced security tools, AI integration, and zero limitations. Professional-grade phishing simulation framework."
          path="/pro"
        />
        <Pro />
      </Route>
      <Route>
        <SEOHead 
          title="Page Not Found | CookPhish"
          description="The page you're looking for doesn't exist. Return to CookPhish home page for cybersecurity education and phishing simulation tools."
          path="/404"
        />
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen modern-bg">
          <Header />
          <div className="pt-16 sm:pt-20">
            <Toaster />
            <Router />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
