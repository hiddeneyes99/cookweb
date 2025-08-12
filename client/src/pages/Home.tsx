import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ModernLoadingScreen from '@/components/ModernLoadingScreen';
import exampleImage from '@assets/e73c5cc3ec9ce4c8d6e28652542b6875753a226b_1754922211029.png';
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
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold gradient-text">
                CookPhish
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                v3.0.0
              </Badge>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'features', label: 'Features' },
                { id: 'installation', label: 'Installation' },
                { id: 'usage', label: 'Usage' },
                { id: 'author', label: 'Author' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`hover:text-yellow-300 transition-colors duration-300 ${
                    activeSection === id ? 'text-yellow-300 font-medium' : 'text-white/80'
                  }`}
                  data-testid={`nav-${id}`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-2 border-purple-300/60 text-white bg-purple-500/20 hover:bg-purple-400/30 rounded-lg backdrop-blur-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 animated-button" asChild>
                <a 
                  href="https://github.com/technicalwhitehat-yt/CookPhish" 
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="github-btn"
                >
                  <i className="fab fa-github mr-2"></i>
                  Get Started
                </a>
              </Button>
              <Button size="sm" className="bg-purple-500/30 hover:bg-purple-400/40 text-white border-2 border-purple-300/60 rounded-lg backdrop-blur-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-400/50 animated-button" asChild>
                <a 
                  href="https://youtube.com/@technicalwhitehat" 
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="youtube-btn"
                >
                  <i className="fab fa-youtube mr-2"></i>
                  YouTube
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
                  className="bg-white text-[#652ca8] hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={() => scrollToSection('installation')}
                  data-testid="get-started-btn"
                >
                  <i className="fas fa-download mr-2"></i>
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white/40 text-white hover:bg-white/15 px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300"
                  onClick={() => scrollToSection('features')}
                  data-testid="learn-more-btn"
                >
                  <i className="fas fa-info-circle mr-2"></i>
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
              <div className="relative">
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
            <p className="text-xl text-white/80">
              Get CookPhish running on your system in just a few commands
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Termux Installation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300 hover:border-purple-300/60">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-green-500/30">
                      <i className="fab fa-android text-xl text-green-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Termux (Android)</h3>
                      <p className="text-sm text-white/60">For Android devices</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="code-block p-4 group relative">
                      <div className="flex items-center justify-between">
                        <code className="text-sm text-green-300 font-mono flex-1">pkg update && pkg upgrade -y && pkg install git && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && bash CookPhish</code>
                        <button 
                          className="copy-button ml-4"
                          onClick={(e) => {
                            navigator.clipboard.writeText('pkg update && pkg upgrade -y && pkg install git && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && bash CookPhish');
                            const btn = e.target as HTMLButtonElement;
                            btn.textContent = 'Copied!';
                            setTimeout(() => btn.textContent = 'Copy', 2000);
                          }}
                          data-testid="copy-termux-all"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mt-2">📱 Complete one-line installation for Termux</p>
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
              <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300 hover:border-purple-300/60">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30">
                      <i className="fab fa-linux text-xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Kali Linux / Debian</h3>
                      <p className="text-sm text-white/60">For Linux systems</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="code-block p-4 group relative">
                      <div className="flex items-center justify-between">
                        <code className="text-sm text-blue-300 font-mono flex-1">sudo apt-get update && upgrade -y && apt-get install git && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && sudo bash CookPhish</code>
                        <button 
                          className="copy-button ml-4"
                          onClick={(e) => {
                            navigator.clipboard.writeText('sudo apt-get update && upgrade -y && apt-get install git && git clone https://github.com/technicalwhitehat-yt/CookPhish.git && cd CookPhish && sudo bash CookPhish');
                            const btn = e.target as HTMLButtonElement;
                            btn.textContent = 'Copied!';
                            setTimeout(() => btn.textContent = 'Copy', 2000);
                          }}
                          data-testid="copy-kali-all"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mt-2">💻 Complete one-line installation for Kali Linux</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Requirements */}
          <motion.div 
            className="mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300 hover:border-purple-300/60">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-yellow-500/30">
                    <i className="fas fa-cog text-xl text-yellow-400"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Dependencies</h3>
                    <p className="text-sm text-white/60">Install required packages</p>
                  </div>
                </div>
                
                <div className="code-block p-4 group relative">
                  <div className="flex items-center justify-between">
                    <code className="text-sm text-yellow-300 font-mono flex-1">pip install -r requirements.txt</code>
                    <button 
                      className="copy-button ml-4"
                      onClick={(e) => {
                        navigator.clipboard.writeText('pip install -r requirements.txt');
                        const btn = e.target as HTMLButtonElement;
                        btn.textContent = 'Copied!';
                        setTimeout(() => btn.textContent = 'Copy', 2000);
                      }}
                      data-testid="copy-requirements"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-2">🔧 Note: You must clone the repo via Git to enable auto-update functionality</p>
              </CardContent>
            </Card>
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

      {/* Author Section */}
      <section id="author" className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 mb-8">
              👨‍💻 Author Information
            </Badge>
            
            <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30 transition-all duration-300 hover:border-purple-300/60">
              <CardContent className="p-12">
                <div className="mb-8">
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 shadow-lg shadow-purple-500/30 overflow-hidden border-2 border-purple-300/40">
                    <img 
                      src={twhLogo} 
                      alt="Technical White Hat Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-white">Technical White Hat</h2>
                  <p className="text-xl text-white/80 mb-6">Cybersecurity Researcher & Ethical Hacker from India</p>
                  <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
                    Passionate about cybersecurity education and ethical hacking. CookPhish is designed specifically 
                    for educational purposes, security training, and authorized penetration testing to help security 
                    professionals understand and defend against phishing attacks.
                  </p>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" size="lg" className="border-2 border-purple-300/60 text-white bg-purple-500/20 hover:bg-purple-400/30 px-6 py-3 rounded-xl backdrop-blur-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 animated-button" asChild>
                    <a 
                      href="https://youtube.com/@technicalwhitehat" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-youtube"
                    >
                      <i className="fab fa-youtube text-red-400 mr-2"></i>
                      YouTube Channel
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="border-2 border-purple-300/60 text-white bg-purple-500/20 hover:bg-purple-400/30 px-6 py-3 rounded-xl backdrop-blur-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 animated-button" asChild>
                    <a 
                      href="https://instagram.com/technicalwhitehat" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-instagram"
                    >
                      <i className="fab fa-instagram text-pink-500 mr-2"></i>
                      Instagram
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="border-2 border-purple-300/60 text-white bg-purple-500/20 hover:bg-purple-400/30 px-6 py-3 rounded-xl backdrop-blur-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 animated-button" asChild>
                    <a 
                      href="https://t.me/technicalwhitehat" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-telegram"
                    >
                      <i className="fab fa-telegram text-blue-400 mr-2"></i>
                      Telegram
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="border-2 border-purple-300/60 text-white bg-purple-500/20 hover:bg-purple-400/30 px-6 py-3 rounded-xl backdrop-blur-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 animated-button" asChild>
                    <a 
                      href="https://github.com/technicalwhitehat-yt" 
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="author-github"
                    >
                      <i className="fab fa-github text-white mr-2"></i>
                      GitHub
                    </a>
                  </Button>
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