import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import ParticleSystem from '@/components/ParticleSystem';
import TerminalWindow from '@/components/TerminalWindow';
import { useSoundEffects } from '@/hooks/useSoundEffects';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const { playClick, playHover } = useSoundEffects();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'installation', 'usage', 'author', 'education'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setCurrentSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    playClick();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-20 right-4 bg-matrix text-black px-4 py-2 rounded-lg font-mono text-sm z-50';
      notification.textContent = 'Copied to clipboard!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen text-white">
      <ParticleSystem />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-purple/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-orbitron font-bold text-matrix">
                <i className="fas fa-skull-crossbones mr-2"></i>CookPhish
              </div>
              <span className="text-sm bg-cyber-purple/20 px-2 py-1 rounded font-mono" data-testid="version-badge">v3.0.0</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {[
                { id: 'features', label: 'Features' },
                { id: 'installation', label: 'Installation' },
                { id: 'usage', label: 'Usage' },
                { id: 'author', label: 'Author' },
                { id: 'education', label: 'Security Education' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  onMouseEnter={playHover}
                  className={`hover:text-matrix transition-colors duration-300 ${
                    currentSection === id ? 'text-matrix' : ''
                  }`}
                  data-testid={`nav-${id}`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com/technicalwhitehat-yt/CookPhish" 
                className="text-matrix hover:text-white transition-colors duration-300"
                onMouseEnter={playHover}
                data-testid="github-link"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href="https://youtube.com/@technicalwhitehat" 
                className="text-red-500 hover:text-white transition-colors duration-300"
                onMouseEnter={playHover}
                data-testid="youtube-link"
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="scan-line"></div>
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black gradient-text mb-4" data-testid="main-title">
                COOKPHISH
              </h1>
              <div className="text-xl md:text-2xl font-mono text-matrix mb-4" data-testid="subtitle">
                Advanced Instagram Phishing Simulation Framework
              </div>
              <div className="text-lg text-gray-300" data-testid="author-info">
                Created by <span className="text-cyber-purple font-semibold">Technical White Hat</span> from India
              </div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: 'fas fa-shield-alt',
                  title: 'Ethical Testing',
                  description: 'Designed for cybersecurity education and authorized penetration testing',
                  color: 'text-matrix',
                  delay: 0
                },
                {
                  icon: 'fas fa-terminal',
                  title: 'Advanced Framework',
                  description: 'Complete phishing simulation with 2FA bypass and IP logging',
                  color: 'text-cyber-purple',
                  delay: 0.2
                },
                {
                  icon: 'fas fa-mobile-alt',
                  title: 'Multi-Platform',
                  description: 'Supports Termux, Kali Linux, and Debian-based systems',
                  color: 'text-cyber-blue',
                  delay: 0.4
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay, duration: 0.6 }}
                  className="cyber-glow p-6 rounded-lg transform hover:scale-105 transition-all duration-300"
                  onMouseEnter={playHover}
                  data-testid={`feature-card-${index}`}
                >
                  <i className={`${feature.icon} text-3xl ${feature.color} mb-4`}></i>
                  <h3 className="text-xl font-orbitron mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button 
                onClick={() => scrollToSection('installation')}
                onMouseEnter={playHover}
                className="bg-gradient-to-r from-matrix to-cyber-blue hover:from-cyber-blue hover:to-matrix px-8 py-3 rounded-lg font-orbitron font-bold transform hover:scale-105 transition-all duration-300 cyber-glow"
                data-testid="get-started-btn"
              >
                <i className="fas fa-download mr-2"></i>Get Started
              </button>
              <button 
                onClick={() => scrollToSection('education')}
                onMouseEnter={playHover}
                className="border border-cyber-purple hover:bg-cyber-purple/20 px-8 py-3 rounded-lg font-orbitron font-bold transform hover:scale-105 transition-all duration-300"
                data-testid="learn-security-btn"
              >
                <i className="fas fa-graduation-cap mr-2"></i>Learn Security
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-orbitron font-bold gradient-text mb-4" data-testid="features-title">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-400">Professional-grade phishing simulation capabilities</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Instagram Clone',
                description: 'Highly realistic Instagram login page simulation with pixel-perfect accuracy',
                icon: 'fas fa-instagram',
                color: 'text-purple-500',
                status: 'Active'
              },
              {
                title: '2FA Bypass',
                description: 'Simulates two-factor authentication including TOTP, WhatsApp, and SMS methods',
                icon: 'fas fa-lock',
                color: 'text-matrix',
                status: 'TOTP, SMS, WhatsApp'
              },
              {
                title: 'IP Logging',
                description: 'Comprehensive victim data collection including IP addresses, user agents, and timestamps',
                icon: 'fas fa-network-wired',
                color: 'text-cyber-blue',
                status: 'IP, UserAgent, Timestamp'
              },
              {
                title: 'Tunneling Support',
                description: 'Built-in support for Cloudflared and Tunnelmole for secure remote access',
                icon: 'fas fa-cloud',
                color: 'text-cyber-purple',
                status: 'Cloudflared, Tunnelmole'
              },
              {
                title: 'Auto-Update',
                description: 'GitHub-based automatic update system keeps the framework current',
                icon: 'fas fa-sync-alt',
                color: 'text-green-500',
                status: 'Git-based updates'
              },
              {
                title: 'Dynamic UI',
                description: 'Colorful gradient banners and modern terminal interface design',
                icon: 'fas fa-paint-brush',
                color: 'text-yellow-500',
                status: 'Flask-based'
              }
            ].map((feature, index) => (
              <TerminalWindow 
                key={index}
                title={feature.title}
                className="transform hover:scale-105 transition-all duration-300"
                onMouseEnter={playHover}
                data-testid={`feature-terminal-${index}`}
              >
                <i className={`${feature.icon} text-3xl ${feature.color} mb-4`}></i>
                <h3 className="text-xl font-orbitron mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="text-matrix font-mono text-sm">{feature.status}</div>
              </TerminalWindow>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-20 bg-cyber-navy/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-orbitron font-bold gradient-text mb-4" data-testid="installation-title">
              Installation Guide
            </h2>
            <p className="text-xl text-gray-400">Get CookPhish running on your system in minutes</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Termux Installation */}
            <TerminalWindow title="Termux (Android)" icon="fab fa-android" iconColor="text-matrix">
              <div className="font-mono text-sm space-y-4">
                {[
                  'pkg update && pkg upgrade -y',
                  'pkg install git',
                  'git clone https://github.com/technicalwhitehat-yt/CookPhish.git',
                  'cd CookPhish',
                  'bash CookPhish'
                ].map((command, index) => (
                  <div key={index} className="flex items-center group">
                    <span className="text-matrix mr-2">$</span>
                    <span className="text-gray-300 flex-1">{command}</span>
                    <button 
                      className="ml-auto text-gray-500 hover:text-matrix transition-colors opacity-0 group-hover:opacity-100" 
                      onClick={() => copyToClipboard(command)}
                      onMouseEnter={playHover}
                      data-testid={`copy-termux-${index}`}
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                ))}
              </div>
            </TerminalWindow>
            
            {/* Kali Linux Installation */}
            <TerminalWindow title="Kali Linux / Debian" icon="fab fa-linux" iconColor="text-cyber-blue">
              <div className="font-mono text-sm space-y-4">
                {[
                  'sudo apt-get update && upgrade -y',
                  'apt-get install git',
                  'git clone https://github.com/technicalwhitehat-yt/CookPhish.git',
                  'cd CookPhish',
                  'sudo bash CookPhish'
                ].map((command, index) => (
                  <div key={index} className="flex items-center group">
                    <span className="text-cyber-blue mr-2">#</span>
                    <span className="text-gray-300 flex-1">{command}</span>
                    <button 
                      className="ml-auto text-gray-500 hover:text-matrix transition-colors opacity-0 group-hover:opacity-100" 
                      onClick={() => copyToClipboard(command)}
                      onMouseEnter={playHover}
                      data-testid={`copy-kali-${index}`}
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </div>
          
          {/* Requirements */}
          <div className="mt-12 max-w-2xl mx-auto">
            <TerminalWindow title="Dependencies" icon="fas fa-cog" iconColor="text-yellow-500">
              <div className="font-mono text-sm">
                <div className="flex items-center mb-4 group">
                  <span className="text-yellow-500 mr-2">$</span>
                  <span className="text-gray-300 flex-1">pip install -r requirements.txt</span>
                  <button 
                    className="ml-auto text-gray-500 hover:text-matrix transition-colors opacity-0 group-hover:opacity-100" 
                    onClick={() => copyToClipboard('pip install -r requirements.txt')}
                    onMouseEnter={playHover}
                    data-testid="copy-requirements"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </div>
                <div className="text-gray-500 text-xs">
                  ⚠️ Run this command if you encounter any errors during execution
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section id="usage" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-orbitron font-bold gradient-text mb-4" data-testid="usage-title">
              Usage Instructions
            </h2>
            <p className="text-xl text-gray-400">Step-by-step guide to using CookPhish effectively</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <TerminalWindow title="Quick Start" icon="fas fa-play-circle" iconColor="text-matrix">
                <ol className="space-y-4 font-mono text-sm">
                  {[
                    { title: 'Launch CookPhish', desc: 'Execute ./CookPhish in terminal', color: 'bg-matrix' },
                    { title: 'Auto-update Check', desc: 'Framework automatically checks for GitHub updates', color: 'bg-cyber-purple' },
                    { title: 'Server Startup', desc: 'Local phishing server starts on port 8080', color: 'bg-cyber-blue' },
                    { title: 'Tunnel Setup', desc: 'Use cloudflared or tunnelmole for public access', color: 'bg-green-500' }
                  ].map((step, index) => (
                    <li key={index} className="flex items-start" data-testid={`step-${index}`}>
                      <span className={`${step.color} text-black w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold`}>
                        {index + 1}
                      </span>
                      <div>
                        <div className="text-white mb-1">{step.title}</div>
                        <div className="text-gray-400">{step.desc}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </TerminalWindow>
              
              <TerminalWindow title="Log Files" icon="fas fa-file-alt" iconColor="text-cyber-blue">
                <div className="space-y-3 font-mono text-sm">
                  {[
                    { name: 'ip_agent.log', desc: 'IP addresses and user agents', icon: 'fas fa-network-wired', color: 'text-matrix' },
                    { name: 'correct_pass_user.log', desc: 'Valid credentials captured', icon: 'fas fa-check-circle', color: 'text-green-500' },
                    { name: 'wrong_pass.log', desc: 'Invalid login attempts', icon: 'fas fa-times-circle', color: 'text-red-500' }
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded" data-testid={`log-file-${index}`}>
                      <div>
                        <div className={log.color}>{log.name}</div>
                        <div className="text-gray-400 text-xs">{log.desc}</div>
                      </div>
                      <i className={`${log.icon} ${log.color}`}></i>
                    </div>
                  ))}
                </div>
              </TerminalWindow>
            </div>
            
            <TerminalWindow title="Mobile Testing Setup" icon="fas fa-mobile-alt" iconColor="text-cyber-purple">
              <div className="space-y-6">
                <div className="border border-cyber-purple/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-3 text-matrix">Recommended Browser</h4>
                  <p className="text-gray-400 mb-4">For testing with cookie injection support:</p>
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.lemurbrowser.exts" 
                    className="inline-flex items-center bg-gradient-to-r from-matrix to-cyber-blue px-4 py-2 rounded font-semibold hover:scale-105 transition-transform"
                    onMouseEnter={playHover}
                    data-testid="browser-download-link"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Download Browser APK
                  </a>
                </div>
                
                <div className="border border-cyber-blue/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-3 text-cyber-blue">Cookie Editor Setup</h4>
                  <ol className="text-sm space-y-2 text-gray-400">
                    <li>1. Install the recommended browser</li>
                    <li>2. Visit Chrome Web Store</li>
                    <li>3. Install "Cookies Editor" extension</li>
                    <li>4. Launch CookPhish phishing page</li>
                    <li>5. Use extension to modify <code className="bg-gray-800 px-1 rounded">sessionid</code> cookies</li>
                  </ol>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-yellow-500 mr-3 mt-1"></i>
                    <div>
                      <h4 className="text-yellow-500 font-semibold mb-1">Important Notice</h4>
                      <p className="text-gray-400 text-sm">Always obtain proper authorization before conducting any security testing. This tool is for educational purposes only.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section id="author" className="py-20 bg-cyber-navy/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-5xl font-orbitron font-bold gradient-text mb-4" data-testid="author-title">
                Technical White Hat
              </h2>
              <p className="text-xl text-gray-400">Cybersecurity Expert from India</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="cyber-glow p-8 rounded-lg" onMouseEnter={playHover}>
                <div className="w-32 h-32 bg-gradient-to-br from-matrix to-cyber-purple rounded-full mx-auto mb-6 flex items-center justify-center">
                  <i className="fas fa-user-ninja text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-orbitron mb-4">About the Developer</h3>
                <p className="text-gray-400">
                  Technical White Hat (TWH) is a passionate cybersecurity researcher and ethical hacker from India. 
                  Dedicated to educating the community about cybersecurity threats and defensive strategies through 
                  practical tools and comprehensive tutorials.
                </p>
              </div>
              
              <div className="cyber-glow p-8 rounded-lg" onMouseEnter={playHover}>
                <i className="fas fa-shield-alt text-4xl text-matrix mb-6"></i>
                <h3 className="text-2xl font-orbitron mb-4">Mission Statement</h3>
                <p className="text-gray-400">
                  Creating advanced cybersecurity tools for educational purposes, conducting security research, 
                  and promoting ethical hacking practices. Focused on building a safer digital environment 
                  through knowledge sharing and responsible disclosure.
                </p>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mb-12">
              <h3 className="text-2xl font-orbitron mb-8 text-matrix">Connect & Follow</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { href: 'https://youtube.com/@technicalwhitehat', icon: 'fab fa-youtube', label: 'YouTube Channel', color: 'bg-red-600 hover:bg-red-700' },
                  { href: 'https://instagram.com/technicalwhitehat', icon: 'fab fa-instagram', label: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' },
                  { href: 'https://t.me/technicalwhitehat', icon: 'fab fa-telegram', label: 'Telegram', color: 'bg-blue-500 hover:bg-blue-600' },
                  { href: 'https://github.com/technicalwhitehat-yt', icon: 'fab fa-github', label: 'GitHub', color: 'bg-gray-800 hover:bg-gray-700' },
                  { href: 'mailto:technicalwhitehat@protonmail.com', icon: 'fas fa-envelope', label: 'Email', color: 'bg-green-600 hover:bg-green-700' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className={`flex items-center space-x-3 ${social.color} px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
                    onMouseEnter={playHover}
                    data-testid={`social-${index}`}
                  >
                    <i className={`${social.icon} text-xl`}></i>
                    <span className="font-semibold">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Support Section */}
            <TerminalWindow title="Support My Work" icon="fas fa-heart" iconColor="text-cyber-blue">
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                {[
                  { icon: 'fas fa-star', text: 'Star the repository', color: 'text-yellow-500' },
                  { icon: 'fas fa-share', text: 'Share with friends', color: 'text-cyber-blue' },
                  { icon: 'fas fa-graduation-cap', text: 'Use in cyber education', color: 'text-matrix' }
                ].map((support, index) => (
                  <div key={index} className="flex items-center space-x-3" data-testid={`support-${index}`}>
                    <i className={`${support.icon} ${support.color}`}></i>
                    <span>{support.text}</span>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Security Education Section */}
      <section id="education" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-orbitron font-bold gradient-text mb-4" data-testid="education-title">
              Cybersecurity Education
            </h2>
            <p className="text-xl text-gray-400">Understanding phishing attacks and defense strategies</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <TerminalWindow title="What is Phishing?" icon="fas fa-exclamation-triangle" iconColor="text-red-500">
              <div className="space-y-4 text-gray-300">
                <p>
                  Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information 
                  such as usernames, passwords, credit card details, and other personal data.
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-red-500 font-semibold mb-2">Common Phishing Tactics:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Fake login pages that mimic legitimate websites</li>
                    <li>• Deceptive emails claiming urgent account issues</li>
                    <li>• Social engineering to create false trust</li>
                    <li>• URL spoofing and domain impersonation</li>
                  </ul>
                </div>
              </div>
            </TerminalWindow>
            
            <TerminalWindow title="Protection Strategies" icon="fas fa-shield-alt" iconColor="text-matrix">
              <div className="space-y-4 text-gray-300">
                <p>
                  Protecting yourself and your organization from phishing attacks requires awareness, 
                  proper security measures, and continuous education.
                </p>
                <div className="bg-matrix/10 border border-matrix/30 rounded-lg p-4">
                  <h4 className="text-matrix font-semibold mb-2">Best Practices:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Always verify URLs before entering credentials</li>
                    <li>• Enable two-factor authentication (2FA)</li>
                    <li>• Be suspicious of urgent or threatening messages</li>
                    <li>• Regular security awareness training</li>
                  </ul>
                </div>
              </div>
            </TerminalWindow>
          </div>
          
          {/* Educational Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: 'fas fa-eye',
                title: 'Recognition Training',
                description: 'Learn to identify phishing attempts through visual cues, suspicious URLs, and social engineering tactics commonly used by attackers.',
                color: 'text-cyber-blue'
              },
              {
                icon: 'fas fa-tools',
                title: 'Technical Defenses',
                description: 'Implement email filters, web security gateways, and endpoint protection to create multiple layers of defense against phishing attacks.',
                color: 'text-yellow-500'
              },
              {
                icon: 'fas fa-users',
                title: 'Incident Response',
                description: 'Develop proper procedures for responding to suspected phishing attacks, including reporting mechanisms and damage mitigation strategies.',
                color: 'text-cyber-purple'
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="cyber-glow p-6 rounded-lg transform hover:scale-105 transition-all duration-300"
                onMouseEnter={playHover}
                data-testid={`education-card-${index}`}
              >
                <i className={`${card.icon} text-3xl ${card.color} mb-4`}></i>
                <h4 className="text-xl font-orbitron mb-3">{card.title}</h4>
                <p className="text-gray-400 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
          
          {/* Legal Disclaimer */}
          <div className="terminal-window p-8 border-2 border-red-500/50" data-testid="legal-disclaimer">
            <div className="text-center">
              <i className="fas fa-gavel text-4xl text-red-500 mb-4"></i>
              <h3 className="text-2xl font-orbitron mb-6 text-red-500">Legal Disclaimer</h3>
              <div className="text-gray-300 space-y-4 max-w-3xl mx-auto">
                <p className="text-lg">
                  <strong>CookPhish is created strictly for educational and ethical testing purposes.</strong>
                </p>
                <p>
                  Using this tool on unauthorized targets is <strong className="text-red-500">illegal</strong> and may result in 
                  criminal charges. The author is not responsible for any misuse or damage caused by this tool.
                </p>
                <p>
                  Always obtain proper written authorization before conducting any security testing. 
                  Use this tool only in controlled environments for learning cybersecurity concepts.
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-6">
                  <p className="text-red-400 font-semibold">
                    Remember: With great power comes great responsibility. Stay ethical, stay legal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cyber-dark border-t border-cyber-purple/20 py-12" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold text-matrix mb-4">CookPhish</div>
            <p className="text-gray-400 mb-6">Advanced Phishing Simulation Framework</p>
            <p className="text-sm text-gray-500">
              Created with ❤️ by Technical White Hat | Made in India 🇮🇳
            </p>
            <div className="mt-8 text-xs text-gray-600">
              © 2024 CookPhish Framework. For educational purposes only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
