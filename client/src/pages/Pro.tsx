import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import twhLogo from '@assets/technical white hat 2.0_1754987246786.jpg';

export default function Pro() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showDesktopAlert, setShowDesktopAlert] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = /ipad|android/i.test(userAgent) && window.innerWidth >= 768;
      const desktop = !isMobile && window.innerWidth >= 1024;
      
      setIsDesktop(desktop);
      setShowDesktopAlert(!desktop && !isMobile && !isTablet);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="min-h-screen modern-bg">
      <div className="min-h-screen text-white relative">
        {/* Desktop Detection Alert */}
        {showDesktopAlert && (
          <motion.div 
            className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="bg-orange-500/20 border-orange-400/50 backdrop-blur-md">
              <i className="fas fa-desktop text-orange-400"></i>
              <AlertDescription className="text-white">
                <strong>Switch to Desktop:</strong> For the best experience, please use a desktop or laptop computer.
                <Button 
                  variant="link" 
                  className="text-orange-400 p-0 h-auto ml-2"
                  onClick={() => setShowDesktopAlert(false)}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        {/* Hero Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="container mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 mb-6 sm:mb-8 text-base sm:text-lg px-4 sm:px-6 py-2">
                🚀 CookPhish Pro
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 px-2">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Coming Soon
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 leading-relaxed px-4">
                The ultimate phishing simulation framework with 
                <strong className="text-purple-400"> mask URL generation</strong>, 
                <strong className="text-blue-400"> unlimited hosting</strong>, and 
                <strong className="text-orange-400"> advanced victim tracking</strong>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-16 sm:py-20 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 px-4">
                What's Coming in <span className="text-purple-400">CookPhish Pro</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border border-purple-300/40 rounded-2xl h-full hover:bg-white/15 hover:border-purple-300/60 transition-all duration-300 shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-400/30">
                      <CardContent className="p-6 sm:p-8 text-center">
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-${feature.color}-500/30 to-${feature.color}-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}>
                          <i className={`${feature.icon} text-lg sm:text-2xl text-${feature.color}-400`}></i>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">{feature.title}</h3>
                        <p className="text-sm sm:text-base text-white/80 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-orange-500/10 via-white/5 to-green-500/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="indian-pride-bg backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl indian-flag-glow border-2 border-orange-400/30">
                <CardContent className="p-6 sm:p-8 md:p-12">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 sm:mb-6 shadow-2xl overflow-hidden border-4 tricolor-border relative">
                    <img 
                      src={twhLogo} 
                      alt="Ahmar - Technical White Hat Founder" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">
                      🇮🇳
                    </div>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Ahmar</h2>
                  <p className="text-lg sm:text-xl text-orange-300 mb-2 font-semibold">Technical White Hat Founder</p>
                  <p className="text-sm sm:text-base text-white/90 mb-6">20 Years Old • Full Stack Developer • Ethical Hacker • From India 🇮🇳</p>
                  
                  <div className="bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm border border-white/20 mb-6 sm:mb-8">
                    <p className="text-white/90 leading-relaxed text-base sm:text-lg">
                      CookPhish Pro is in active development. Follow me on social media and GitHub 
                      for updates and early access announcements!
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                    <Button variant="outline" size="sm" className="social-button youtube-button px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm" asChild>
                      <a 
                        href="https://youtube.com/@technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-youtube"
                      >
                        <i className="fab fa-youtube text-red-400 mr-2 text-sm sm:text-lg"></i>
                        <span className="hidden sm:inline">YouTube</span>
                        <span className="sm:hidden">YT</span>
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="social-button instagram-button px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm" asChild>
                      <a 
                        href="https://instagram.com/technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-instagram"
                      >
                        <i className="fab fa-instagram text-pink-500 mr-2 text-sm sm:text-lg"></i>
                        <span className="hidden sm:inline">Instagram</span>
                        <span className="sm:hidden">IG</span>
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="social-button whatsapp-button px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm" asChild>
                      <a 
                        href="https://wa.me/917890144166" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-whatsapp"
                      >
                        <i className="fab fa-whatsapp text-green-400 mr-2 text-sm sm:text-lg"></i>
                        <span className="hidden sm:inline">WhatsApp</span>
                        <span className="sm:hidden">WA</span>
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="social-button telegram-button px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm" asChild>
                      <a 
                        href="https://t.me/technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-telegram"
                      >
                        <i className="fab fa-telegram text-blue-400 mr-2 text-sm sm:text-lg"></i>
                        <span className="hidden sm:inline">Telegram</span>
                        <span className="sm:hidden">TG</span>
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="sm" className="social-button github-button px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm" asChild>
                      <a 
                        href="https://github.com/technicalwhitehat-yt" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-github"
                      >
                        <i className="fab fa-github text-white mr-2 text-sm sm:text-lg"></i>
                        <span className="hidden sm:inline">GitHub</span>
                        <span className="sm:hidden">GH</span>
                      </a>
                    </Button>
                  </div>

                  {/* Repository Link */}
                  <div className="mt-6 sm:mt-8">
                    <Button 
                      size="lg" 
                      className="hero-button-primary px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
                      asChild
                    >
                      <a 
                        href="https://github.com/technicalwhitehat-yt/CookPhish"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-repository"
                      >
                        <i className="fab fa-github mr-2 sm:mr-3 text-lg sm:text-xl"></i>
                        View Repository
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 bg-black/30 backdrop-blur-sm border-t border-white/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <div className="mb-4 sm:mb-0">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">CookPhish Pro</div>
                <p className="text-white/60 text-sm sm:text-base">Advanced Phishing Simulation Framework</p>
              </div>
              <div className="text-white/60">
                <p className="text-sm">&copy; 2024 Technical White Hat. For educational use only.</p>
                <p className="text-xs sm:text-sm mt-1">Made with ❤️ in India 🇮🇳</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}