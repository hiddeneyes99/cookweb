import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import Home from "@/pages/Home";
import Pro from "@/pages/Pro";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";

function Header() {
  const [location] = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300" data-testid="header-logo">
            CookPhish
          </Link>
          
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/" className={`text-sm sm:text-base text-white/80 hover:text-white transition-colors duration-300 ${location === '/' ? 'text-white font-semibold' : ''}`} data-testid="nav-home">
              Home
            </Link>
            <Link href="/pro" className={`text-sm sm:text-base text-white/80 hover:text-white transition-colors duration-300 ${location === '/pro' ? 'text-white font-semibold' : ''}`} data-testid="nav-pro">
              Pro
            </Link>
          </nav>
        </div>
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

// Global Desktop Detection Hook
function useDesktopDetection() {
  const [showDesktopAlert, setShowDesktopAlert] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = /ipad|android/i.test(userAgent) && window.innerWidth >= 768;
      const desktop = !isMobile && window.innerWidth >= 1024;
      
      setIsDesktop(desktop);
      
      // Show alert only if user is not on mobile/tablet and not on desktop
      if (!desktop && !isMobile && !isTablet) {
        setShowDesktopAlert(true);
      } else {
        setShowDesktopAlert(false);
      }
    };

    // Check on load
    checkDevice();
    
    // Check on resize
    window.addEventListener('resize', checkDevice);
    
    // Check on orientation change (mobile devices)
    window.addEventListener('orientationchange', () => {
      setTimeout(checkDevice, 100);
    });

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return { showDesktopAlert, setShowDesktopAlert, isDesktop };
}

// Global Desktop Alert Component
function GlobalDesktopAlert() {
  const { showDesktopAlert, setShowDesktopAlert } = useDesktopDetection();

  if (!showDesktopAlert) return null;

  return (
    <motion.div 
      className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Alert className="bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-orange-400/50 backdrop-blur-md shadow-2xl">
        <i className="fas fa-desktop text-orange-400 text-lg"></i>
        <AlertDescription className="text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-orange-300">Better Experience:</strong>
              <br className="sm:hidden" />
              <span className="text-sm">Switch to desktop or laptop for optimal performance</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/20 px-3 py-1 text-xs self-end sm:self-auto"
              onClick={() => setShowDesktopAlert(false)}
            >
              Dismiss
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </motion.div>
  );
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
          <GlobalDesktopAlert />
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
