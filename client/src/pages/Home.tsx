import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'wouter';
import ModernLoadingScreen from '@/components/ModernLoadingScreen';
import exampleImage from '@assets/Untitled _1754988628893.png';
import twhLogo from '@assets/technical white hat 2.0_1754987246786.jpg';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'installation', 'usage', 'author'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Simple toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50';
      toast.textContent = 'Copied to clipboard!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return <ModernLoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen text-white relative">
      {/* Purple Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#652ca8] via-[#4c1d95] to-[#1e1b4b] -z-10"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="group cursor-pointer">
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl tracking-wide transform transition-all duration-300 group-hover:scale-105">
                  CookPhish
                </div>
              </div>
              <Badge variant="secondary" className="text-white border-white/30 bg-transparent">
                v3.0.0
              </Badge>
            </div>
            
            <div className="hidden md:flex space-x-2">
              {[
                { id: 'features', label: 'Features', icon: 'fas fa-star' },
                { id: 'installation', label: 'Installation', icon: 'fas fa-download' },
                { id: 'videos', label: 'Videos', icon: 'fas fa-play' },
                { id: 'usage', label: 'Usage', icon: 'fas fa-rocket' },
                { id: 'author', label: 'Author', icon: 'fas fa-user' }
              ].map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`nav-link-button group relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === id 
                      ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/20' 
                      : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 hover:shadow-md'
                  }`}
                  data-testid={`nav-${id}`}
                >
                  <div className="flex items-center space-x-2">
                    <i className={`${icon} text-sm`}></i>
                    <span>{label}</span>
                  </div>
                  {activeSection === id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
                  )}
                </button>
              ))}
              
              {/* Pro Link Button */}
              <Link href="/pro">
                <button className="nav-link-button group relative px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 border border-transparent hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/20" data-testid="nav-pro">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-crown text-sm text-purple-400"></i>
                    <span>Pro</span>
                  </div>
                </button>
              </Link>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="group relative overflow-hidden bg-transparent border-2 border-white/30 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105" 
                asChild
              >
                <a 
                  href="https://github.com/technicalwhitehat-yt/CookPhish" 
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="github-btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <i className="fab fa-github text-lg"></i>
                    <span>Get Started</span>
                  </div>
                </a>
              </Button>
              <Button 
                size="sm" 
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 border border-red-400 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 hover:from-red-400 hover:to-red-500 hover:shadow-xl hover:shadow-red-500/50 hover:scale-105 shadow-lg shadow-red-500/30" 
                asChild
              >
                <a 
                  href="https://youtube.com/@technicalwhitehat" 
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="youtube-btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-300/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/40 to-red-600/40 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <i className="fab fa-youtube text-lg drop-shadow-sm"></i>
                    <span>YouTube</span>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 mb-4">
                  🔒 Cybersecurity Tool
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white drop-shadow-2xl">CookPhish</span>
                  <br />
                  <span className="text-white/90">Advanced Framework</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Professional phishing simulation tool for cybersecurity education and ethical hacking training. Created by Technical White Hat from India.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-sm border-white/30 text-white">Instagram Clone</Badge>
                <Badge variant="outline" className="text-sm border-white/30 text-white">2FA Bypass</Badge>
                <Badge variant="outline" className="text-sm border-white/30 text-white">IP Logging</Badge>
                <Badge variant="outline" className="text-sm border-white/30 text-white">Multi-Platform</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="modern-button hero-button-primary px-8 py-4 text-lg font-bold"
                  onClick={() => scrollToSection('installation')}
                  data-testid="get-started-btn"
                >
                  <i className="fas fa-download mr-3"></i>
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="modern-button hero-button-secondary px-8 py-4 text-lg font-semibold"
                  onClick={() => scrollToSection('features')}
                  data-testid="learn-more-btn"
                >
                  <i className="fas fa-info-circle mr-3"></i>
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-sm text-white/80">
                  <i className="fas fa-shield-alt text-green-400"></i>
                  <span>Ethical Use Only</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white/80">
                  <i className="fas fa-code-branch text-blue-400"></i>
                  <span>Open Source</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative image-purple-glow">
                <img 
                  src={exampleImage} 
                  alt="CookPhish Interface" 
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute inset-0 purple-gradient opacity-10 rounded-2xl"></div>
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">Framework Active</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">2FA+</div>
                  <div className="text-xs text-white/80">Bypass Modes</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              ✨ Key Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Professional <span className="text-white drop-shadow-2xl">Security Testing</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Comprehensive phishing simulation framework with advanced features for cybersecurity professionals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fab fa-instagram',
                title: 'Instagram Clone',
                description: 'Pixel-perfect Instagram login page simulation with realistic design and functionality',
                color: 'text-pink-500',
                bgColor: 'bg-pink-50'
              },
              {
                icon: 'fas fa-mobile-alt',
                title: '2FA Bypass',
                description: 'Advanced two-factor authentication bypass including TOTP, SMS, and WhatsApp methods',
                color: 'text-green-500',
                bgColor: 'bg-green-50'
              },
              {
                icon: 'fas fa-network-wired',
                title: 'IP Logging',
                description: 'Comprehensive victim data collection with IP addresses, user agents, and timestamps',
                color: 'text-blue-500',
                bgColor: 'bg-blue-50'
              },
              {
                icon: 'fas fa-cloud',
                title: 'Tunneling Support',
                description: 'Built-in Cloudflared and Tunnelmole integration for secure remote access',
                color: 'text-purple-500',
                bgColor: 'bg-purple-50'
              },
              {
                icon: 'fas fa-sync-alt',
                title: 'Auto-Update',
                description: 'GitHub-based automatic update system to keep framework current and secure',
                color: 'text-indigo-500',
                bgColor: 'bg-indigo-50'
              },
              {
                icon: 'fas fa-terminal',
                title: 'Multi-Platform',
                description: 'Compatible with Termux, Kali Linux, and all Debian-based systems',
                color: 'text-orange-500',
                bgColor: 'bg-orange-50'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl h-full shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300 hover:bg-white/15 hover:border-purple-300/60 glow-card" data-testid={`feature-card-${index}`}>
                  <CardContent className="p-8">
                    <div className={`w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <i className={`${feature.icon} text-xl ${feature.color}`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-green-400/20 text-green-300 border-green-400/30 mb-4">
              📦 Installation
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Quick <span className="text-white drop-shadow-2xl">Setup Guide</span>
            </h2>
            <p className="text-xl text-white/80 mb-6">
              Get CookPhish running on your system in just a few commands
            </p>
            
            {/* Download Button */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <Button 
                size="lg" 
                className="hero-button-primary px-8 py-4 text-lg font-semibold"
                asChild
              >
                <a 
                  href="https://github.com/technicalwhitehat-yt/CookPhish/releases/tag/v3.0.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="direct-download"
                >
                  <i className="fas fa-download mr-3 text-xl"></i>
                  Direct Download v3.0.0
                </a>
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="social-button github-button px-6 py-3"
                  asChild
                >
                  <a 
                    href="https://github.com/technicalwhitehat-yt/CookPhish"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="github-star"
                  >
                    <i className="fas fa-star mr-2"></i>
                    Star
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="social-button github-button px-6 py-3"
                  asChild
                >
                  <a 
                    href="https://github.com/technicalwhitehat-yt"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="github-follow"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Follow
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Termux Installation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-green-300/40 rounded-2xl shadow-xl shadow-green-500/20 hover:shadow-2xl hover:shadow-green-400/30 transition-all duration-300 hover:border-green-300/60">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
                      <i className="fab fa-android text-2xl text-green-400"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Termux (Android)</h3>
                      <p className="text-sm text-white/60">Complete setup for Android devices</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Step-by-step commands */}
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-4 border border-green-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-300 font-semibold text-sm">Step 1: Update packages</span>
                          <button 
                            className="copy-button"
                            onClick={(e) => {
                              navigator.clipboard.writeText('pkg update && pkg upgrade -y');
                              const btn = e.target as HTMLButtonElement;
                              const original = btn.innerHTML;
                              btn.innerHTML = '✓ Copied!';
                              setTimeout(() => btn.innerHTML = original, 2000);
                            }}
                            data-testid="copy-termux-update"
                          >
                            <i className="fas fa-copy mr-1"></i>Copy
                          </button>
                        </div>
                        <code className="text-green-300 font-mono text-sm block">pkg update && pkg upgrade -y</code>
                      </div>

                      <div className="bg-black/30 rounded-lg p-4 border border-green-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-300 font-semibold text-sm">Step 2: Install Git</span>
                          <button 
                            className="copy-button"
                            onClick={(e) => {
                              navigator.clipboard.writeText('pkg install git -y');
                              const btn = e.target as HTMLButtonElement;
                              const original = btn.innerHTML;
                              btn.innerHTML = '✓ Copied!';
                              setTimeout(() => btn.innerHTML = original, 2000);
                            }}
                            data-testid="copy-termux-git"
                          >
                            <i className="fas fa-copy mr-1"></i>Copy
                          </button>
                        </div>
                        <code className="text-green-300 font-mono text-sm block">pkg install git -y</code>
                      </div>

                      <div className="bg-black/30 rounded-lg p-4 border border-green-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-300 font-semibold text-sm">Step 3: Clone & Run</span>
                          <button 
                            className="copy-button"
                            onClick={(e) => {
                              navigator.clipboard.writeText('git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && bash CookPhish');
                              const btn = e.target as HTMLButtonElement;
                              const original = btn.innerHTML;
                              btn.innerHTML = '✓ Copied!';
                              setTimeout(() => btn.innerHTML = original, 2000);
                            }}
                            data-testid="copy-termux-clone"
                          >
                            <i className="fas fa-copy mr-1"></i>Copy
                          </button>
                        </div>
                        <code className="text-green-300 font-mono text-sm block break-all">git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && bash CookPhish</code>
                      </div>
                    </div>

                    {/* One-line command */}
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-400/30 mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-green-300">📱 One-Line Installation</h4>
                        <button 
                          className="copy-button"
                          onClick={(e) => {
                            navigator.clipboard.writeText('pkg update && pkg upgrade -y && pkg install git -y && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && bash CookPhish');
                            const btn = e.target as HTMLButtonElement;
                            const original = btn.innerHTML;
                            btn.innerHTML = '✓ Copied!';
                            setTimeout(() => btn.innerHTML = original, 2000);
                          }}
                          data-testid="copy-termux-all"
                        >
                          <i className="fas fa-copy mr-1"></i>Copy All
                        </button>
                      </div>
                      <code className="text-green-300 font-mono text-xs block break-all">pkg update && pkg upgrade -y && pkg install git -y && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && bash CookPhish</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Kali Linux Installation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-blue-300/40 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:border-blue-300/60">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30">
                      <i className="fab fa-linux text-2xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Kali Linux / Debian</h3>
                      <p className="text-sm text-white/60">Professional setup for Linux systems</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Step-by-step commands */}
                    <div className="space-y-3">
                      <div className="bg-black/30 rounded-lg p-4 border border-blue-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-300 font-semibold text-sm">Step 1: Update system</span>
                          <button 
                            className="copy-button"
                            onClick={(e) => {
                              navigator.clipboard.writeText('sudo apt update && sudo apt upgrade -y');
                              const btn = e.target as HTMLButtonElement;
                              const original = btn.innerHTML;
                              btn.innerHTML = '✓ Copied!';
                              setTimeout(() => btn.innerHTML = original, 2000);
                            }}
                            data-testid="copy-kali-update"
                          >
                            <i className="fas fa-copy mr-1"></i>Copy
                          </button>
                        </div>
                        <code className="text-blue-300 font-mono text-sm block">sudo apt update && sudo apt upgrade -y</code>
                      </div>

                      <div className="bg-black/30 rounded-lg p-4 border border-blue-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-300 font-semibold text-sm">Step 2: Install Git</span>
                          <button 
                            className="copy-button"
                            onClick={(e) => {
                              navigator.clipboard.writeText('sudo apt install git -y');
                              const btn = e.target as HTMLButtonElement;
                              const original = btn.innerHTML;
                              btn.innerHTML = '✓ Copied!';
                              setTimeout(() => btn.innerHTML = original, 2000);
                            }}
                            data-testid="copy-kali-git"
                          >
                            <i className="fas fa-copy mr-1"></i>Copy
                          </button>
                        </div>
                        <code className="text-blue-300 font-mono text-sm block">sudo apt install git -y</code>
                      </div>

                      <div className="bg-black/30 rounded-lg p-4 border border-blue-400/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-300 font-semibold text-sm">Step 3: Clone & Run</span>
                          <button 
                            className="copy-button"
                            onClick={(e) => {
                              navigator.clipboard.writeText('git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && sudo bash CookPhish');
                              const btn = e.target as HTMLButtonElement;
                              const original = btn.innerHTML;
                              btn.innerHTML = '✓ Copied!';
                              setTimeout(() => btn.innerHTML = original, 2000);
                            }}
                            data-testid="copy-kali-clone"
                          >
                            <i className="fas fa-copy mr-1"></i>Copy
                          </button>
                        </div>
                        <code className="text-blue-300 font-mono text-sm block break-all">git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && sudo bash CookPhish</code>
                      </div>
                    </div>

                    {/* One-line command */}
                    <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/30 mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-blue-300">💻 One-Line Installation</h4>
                        <button 
                          className="copy-button"
                          onClick={(e) => {
                            navigator.clipboard.writeText('sudo apt update && sudo apt upgrade -y && sudo apt install git -y && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && sudo bash CookPhish');
                            const btn = e.target as HTMLButtonElement;
                            const original = btn.innerHTML;
                            btn.innerHTML = '✓ Copied!';
                            setTimeout(() => btn.innerHTML = original, 2000);
                          }}
                          data-testid="copy-kali-all"
                        >
                          <i className="fas fa-copy mr-1"></i>Copy All
                        </button>
                      </div>
                      <code className="text-blue-300 font-mono text-xs block break-all">sudo apt update && sudo apt upgrade -y && sudo apt install git -y && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && sudo bash CookPhish</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Requirements & Tips */}
          <motion.div 
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border border-yellow-300/40 rounded-2xl shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-yellow-500/30">
                      <i className="fas fa-cog text-lg text-yellow-400"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Dependencies</h3>
                      <p className="text-xs text-white/60">Required packages</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 border border-yellow-400/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-yellow-300 font-semibold text-xs">Install Python packages</span>
                      <button 
                        className="copy-button text-xs"
                        onClick={(e) => {
                          navigator.clipboard.writeText('pip install -r requirements.txt');
                          const btn = e.target as HTMLButtonElement;
                          const original = btn.innerHTML;
                          btn.innerHTML = '✓';
                          setTimeout(() => btn.innerHTML = original, 2000);
                        }}
                        data-testid="copy-requirements"
                      >
                        <i className="fas fa-copy"></i>
                      </button>
                    </div>
                    <code className="text-yellow-300 font-mono text-xs block">pip install -r requirements.txt</code>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-purple-500/30">
                      <i className="fas fa-lightbulb text-lg text-purple-400"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Pro Tips</h3>
                      <p className="text-xs text-white/60">Important notes</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs text-white/80">
                    <div className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>Use Git clone for auto-update functionality</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>Run with sudo on Linux for full permissions</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-purple-400">•</span>
                      <span>Ensure stable internet connection during setup</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Watch Video Section */}
      <section id="videos" className="py-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 mb-4">
              🎥 Watch Tutorials
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Step-by-Step <span className="text-white drop-shadow-2xl">Video Guides</span>
            </h2>
            <p className="text-xl text-white/80">
              Follow along with detailed tutorials for both Android and Linux platforms
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Android Tutorial */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-green-300/40 rounded-2xl shadow-xl shadow-green-500/20 hover:shadow-2xl hover:shadow-green-400/30 transition-all duration-300 hover:border-green-300/60">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
                      <i className="fab fa-android text-2xl text-green-400"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Android Tutorial</h3>
                      <p className="text-sm text-white/60">Complete guide for Termux installation</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="aspect-video bg-black/30 rounded-xl border-2 border-green-400/30 relative overflow-hidden group cursor-pointer">
                      <a 
                        href="https://youtube.com/@technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="android-video"
                        className="block w-full h-full"
                      >
                        <img 
                          src="https://raw.githubusercontent.com/hiddeneyes99/hiddeneyes99/refs/heads/main/HACK1.png"
                          alt="Android Tutorial Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button 
                            className="modern-button youtube-button bg-red-600/90 hover:bg-red-500 text-white px-6 py-3 text-lg font-semibold"
                          >
                            <i className="fab fa-youtube mr-2 text-xl"></i>
                            Watch
                          </Button>
                        </div>
                      </a>
                    </div>
                    
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-400/30">
                      <h4 className="font-bold text-green-300 mb-2">📱 What You'll Learn:</h4>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>• Setting up Termux on Android</li>
                        <li>• Installing CookPhish framework</li>
                        <li>• Running phishing simulations</li>
                        <li>• Mobile-specific configurations</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Linux Tutorial */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-blue-300/40 rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-400/30 transition-all duration-300 hover:border-blue-300/60">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30">
                      <i className="fab fa-linux text-2xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Kali Linux Tutorial</h3>
                      <p className="text-sm text-white/60">Professional setup for security testing</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="aspect-video bg-black/30 rounded-xl border-2 border-blue-400/30 relative overflow-hidden group cursor-pointer">
                      <a 
                        href="https://youtube.com/@technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="linux-video"
                        className="block w-full h-full"
                      >
                        <img 
                          src="https://raw.githubusercontent.com/hiddeneyes99/hiddeneyes99/refs/heads/main/HACK3.png"
                          alt="Linux Tutorial Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button 
                            className="modern-button youtube-button bg-red-600/90 hover:bg-red-500 text-white px-6 py-3 text-lg font-semibold"
                          >
                            <i className="fab fa-youtube mr-2 text-xl"></i>
                            Watch
                          </Button>
                        </div>
                      </a>
                    </div>
                    
                    <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/30">
                      <h4 className="font-bold text-blue-300 mb-2">💻 What You'll Learn:</h4>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>• Kali Linux environment setup</li>
                        <li>• Advanced CookPhish features</li>
                        <li>• Professional penetration testing</li>
                        <li>• Security assessment techniques</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Video Features */}
          <motion.div 
            className="mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-play-circle text-xl text-purple-400"></i>
                  </div>
                  <h3 className="font-bold text-white mb-2">HD Quality</h3>
                  <p className="text-sm text-white/80">Crystal clear 1080p tutorials with detailed explanations</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-clock text-xl text-purple-400"></i>
                  </div>
                  <h3 className="font-bold text-white mb-2">Step-by-Step</h3>
                  <p className="text-sm text-white/80">Easy to follow instructions for beginners</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-comments text-xl text-purple-400"></i>
                  </div>
                  <h3 className="font-bold text-white mb-2">Community Support</h3>
                  <p className="text-sm text-white/80">Get help from our active community</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Usage Section */}
      <section id="usage" className="py-20 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-400/20 text-blue-300 border-blue-400/30 mb-4">
              🚀 Usage Guide
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              How to <span className="text-white drop-shadow-2xl">Use CookPhish</span>
            </h2>
            <p className="text-xl text-white/80">
              Step-by-step guide to running successful phishing simulations
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: '1',
                  title: 'Launch Framework',
                  description: 'Execute ./CookPhish to start the colorful UI and GitHub update check',
                  icon: 'fas fa-play'
                },
                {
                  step: '2', 
                  title: 'Server Setup',
                  description: 'Local phishing server automatically starts on port 8080',
                  icon: 'fas fa-server'
                },
                {
                  step: '3',
                  title: 'Tunneling',
                  description: 'Use cloudflared or tunnelmole to expose your server online',
                  icon: 'fas fa-globe'
                },
                {
                  step: '4',
                  title: 'Monitor Logs',
                  description: 'Track victim data in output/ directory with detailed logging',
                  icon: 'fas fa-chart-line'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl h-full shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300 hover:bg-white/15 hover:border-purple-300/60">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                          <p className="text-white/80">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pro Section */}
      <section id="pro" className="py-20 bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-orange-500/20 backdrop-blur-sm border-t border-purple-400/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 mb-4 text-lg px-6 py-2">
              🚀 Coming Soon
            </Badge>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                CookPhish Pro
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The ultimate phishing simulation framework with 
              <strong className="text-purple-400"> mask URL generation</strong>, 
              <strong className="text-blue-400"> unlimited hosting time</strong>, 
              <strong className="text-green-400"> cross-platform support</strong>, and 
              <strong className="text-red-400"> advanced victim tracking</strong>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: 'fas fa-mask',
                title: 'Mask URL Generator',
                description: 'Create deceptive URLs like https://www.instagram.com@verify.net to bypass user suspicion with custom domain masking',
                color: 'purple'
              },
              {
                icon: 'fas fa-infinity',
                title: 'Unlimited Hosting',
                description: 'No time restrictions on hosting, unlimited campaigns with custom domain setup capabilities',
                color: 'blue'
              },
              {
                icon: 'fas fa-mobile-alt',
                title: 'Cross-Platform Support',
                description: 'Full compatibility with both Termux (Android) and Kali Linux with optimized performance',
                color: 'green'
              },
              {
                icon: 'fas fa-map-marker-alt',
                title: 'Advanced Victim Info',
                description: 'Detailed location tracking, device fingerprinting, mobile specs, browser info, and comprehensive data collection',
                color: 'red'
              },
              {
                icon: 'fas fa-eye',
                title: 'Awesome Look',
                description: 'Beautiful modern interface with stunning visuals and professional cybersecurity design themes',
                color: 'pink'
              },
              {
                icon: 'fas fa-rocket',
                title: 'Simple to Use',
                description: 'User-friendly interface with one-click setup, easy configuration, and many more advanced features',
                color: 'orange'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl h-full shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300 hover:bg-white/15 hover:border-purple-300/60">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-500/30 to-${feature.color}-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <i className={`${feature.icon} text-lg text-${feature.color}-400`}></i>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/pro">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 border border-purple-400 text-white font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:from-purple-400 hover:to-pink-400 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-pink-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <i className="fas fa-crown text-xl drop-shadow-sm"></i>
                  <span>Learn More About Pro</span>
                  <i className="fas fa-arrow-right text-lg group-hover:translate-x-1 transition-transform duration-300"></i>
                </div>
              </Button>
            </Link>
            
            <p className="text-white/70 mt-4 text-sm">
              Follow our social media for updates and early access announcements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Author Section - Proudly Indian */}
      <section id="author" className="py-20 bg-gradient-to-br from-orange-500/10 via-white/5 to-green-500/10 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-white/2 to-green-500/5"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/40 mb-8 text-lg px-6 py-2">
              🇮🇳 Proudly Indian Developer
            </Badge>
            
            <Card className="indian-pride-bg backdrop-blur-md rounded-3xl shadow-2xl indian-flag-glow hover:shadow-3xl transition-all duration-500 border-2 border-orange-400/30">
              <CardContent className="p-12">
                {/* Profile Section */}
                <div className="mb-10">
                  <div className="w-32 h-32 rounded-full mx-auto mb-8 shadow-2xl overflow-hidden border-4 tricolor-border relative">
                    <img 
                      src={twhLogo} 
                      alt="Ahmar - Technical White Hat Founder" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">
                      🇮🇳
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-bold mb-2 text-white">Ahmar</h2>
                  <p className="text-2xl text-orange-300 mb-2 font-semibold">Technical White Hat Founder</p>
                  <p className="text-lg text-white/90 mb-6">20 Years Old • Full Stack Developer • Ethical Hacker • From India 🇮🇳</p>
                  
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20 max-w-3xl mx-auto">
                    <p className="text-white/90 leading-relaxed text-lg">
                      Namaste! I'm <strong className="text-orange-300">Ahmar</strong>, also known as <strong className="text-green-300">Ahmar Bhai</strong> by my community. 
                      At just 20, I founded <strong className="text-white">Technical White Hat (TWH)</strong> with a passion for cybersecurity. 
                      I don't just create hacking tools - I'm a complete developer who builds websites, mobile apps, AI solutions, and teaches ethical hacking. 
                      Whatever I do, I do it with my heart because I love working on my own terms. CookPhish is just one of many projects I've created!
                    </p>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">💻 What I Do</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-orange-400/30">
                      <i className="fas fa-shield-alt text-2xl text-red-400 mb-2"></i>
                      <p className="text-sm text-white font-semibold">Ethical Hacking</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-orange-400/30">
                      <i className="fas fa-code text-2xl text-blue-400 mb-2"></i>
                      <p className="text-sm text-white font-semibold">Web Development</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-orange-400/30">
                      <i className="fas fa-mobile-alt text-2xl text-green-400 mb-2"></i>
                      <p className="text-sm text-white font-semibold">App Development</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-orange-400/30">
                      <i className="fas fa-robot text-2xl text-purple-400 mb-2"></i>
                      <p className="text-sm text-white font-semibold">AI Solutions</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-8 bg-gradient-to-r from-orange-400 via-white to-green-400" />

                {/* Social Media Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" size="lg" className="modern-button social-button youtube-button px-6 py-3" asChild>
                    <a 
                      href="https://youtube.com/@technicalwhitehat" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-youtube"
                    >
                      <i className="fab fa-youtube text-red-400 mr-3 text-lg"></i>
                      YouTube
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="modern-button social-button instagram-button px-6 py-3" asChild>
                    <a 
                      href="https://instagram.com/technicalwhitehat" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-instagram"
                    >
                      <i className="fab fa-instagram text-pink-500 mr-3 text-lg"></i>
                      Instagram
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="modern-button social-button whatsapp-button px-6 py-3" asChild>
                    <a 
                      href="https://wa.me/917890144166" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-whatsapp"
                    >
                      <i className="fab fa-whatsapp text-green-400 mr-3 text-lg"></i>
                      WhatsApp
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="modern-button social-button telegram-button px-6 py-3" asChild>
                    <a 
                      href="https://t.me/technicalwhitehat" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-telegram"
                    >
                      <i className="fab fa-telegram text-blue-400 mr-3 text-lg"></i>
                      Telegram
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="modern-button social-button github-button px-6 py-3" asChild>
                    <a 
                      href="https://github.com/technicalwhitehat-yt" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-github"
                    >
                      <i className="fab fa-github text-white mr-3 text-lg"></i>
                      GitHub
                    </a>
                  </Button>
                </div>

                {/* Quote Section */}
                <div className="mt-8 bg-gradient-to-r from-orange-500/20 via-white/10 to-green-500/20 rounded-2xl p-6 border border-orange-400/30">
                  <blockquote className="text-white/90 italic text-lg">
                    "Bharat aage tha, aage hai, aur aage rahega — aur jab-jab koi hamare desh ko neecha dikhane ki koshish karega, tab-tab hum aisa karege jo duniya ne kabhi socha bhi nahi hoga."
  <br />
                    Jai Hind, Jai Bharat
                  </blockquote>
                  <p className="text-orange-300 mt-2 font-semibold">- Ahmar, Founder of Technical White Hat</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Security Education Section */}
      <section className="py-20 bg-red-500/20 backdrop-blur-sm border-t-2 border-red-400/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <i className="fas fa-exclamation-triangle text-4xl text-red-300 mb-4"></i>
              <h2 className="text-3xl font-bold text-white mb-4">⚠️ Ethical Use Only</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                CookPhish is strictly designed for <strong>cybersecurity education</strong>, <strong>authorized penetration testing</strong>, 
                and <strong>security awareness training</strong>. Any illegal or unauthorized use is prohibited and against the tool's purpose.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border border-red-400/30 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-graduation-cap text-2xl text-red-300 mb-3"></i>
                  <h3 className="font-bold text-white">Educational Purpose</h3>
                  <p className="text-sm text-white/80">Learn about phishing techniques and defense mechanisms</p>
                </CardContent>
              </Card>
              <Card className="border border-red-400/30 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-shield-alt text-2xl text-red-300 mb-3"></i>
                  <h3 className="font-bold text-white">Authorized Testing</h3>
                  <p className="text-sm text-white/80">Only use with proper authorization and consent</p>
                </CardContent>
              </Card>
              <Card className="border border-red-400/30 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-users text-2xl text-red-300 mb-3"></i>
                  <h3 className="font-bold text-white">Security Awareness</h3>
                  <p className="text-sm text-white/80">Train users to identify and prevent phishing attacks</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/30 backdrop-blur-sm border-t border-white/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold text-white mb-2">CookPhish</div>
              <p className="text-white/60">Advanced Phishing Simulation Framework</p>
            </div>
            <div className="text-center text-white/60">
              <p>&copy; 2024 Technical White Hat. For educational use only.</p>
              <p className="text-sm mt-1">Made with ❤️ in India</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}