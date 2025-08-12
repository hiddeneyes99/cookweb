import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import twhLogo from '@assets/technical white hat 2.0_1754987246786.jpg';

export default function Pro() {
  return (
    <div className="min-h-screen modern-bg">
      <div className="min-h-screen text-white relative">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-purple-400/20 text-purple-300 border-purple-400/30 mb-8 text-lg px-6 py-2">
                🚀 CookPhish Pro
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  Coming Soon
                </span>
              </h1>
              
              <p className="text-2xl text-white/90 mb-12 leading-relaxed">
                Get ready for the most advanced phishing simulation framework with 
                <strong className="text-purple-400"> unlimited features</strong> and 
                <strong className="text-orange-400"> zero limitations</strong>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold text-center mb-16">
                What's Coming in <span className="text-purple-400">CookPhish Pro</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: 'fas fa-infinity',
                    title: 'No Limitations',
                    description: 'Unlimited phishing campaigns, targets, and advanced features without any restrictions',
                    color: 'purple'
                  },
                  {
                    icon: 'fas fa-shield-alt',
                    title: 'Advanced Security',
                    description: 'Enhanced security features, better evasion techniques, and professional-grade tools',
                    color: 'blue'
                  },
                  {
                    icon: 'fas fa-chart-line',
                    title: 'Analytics Dashboard',
                    description: 'Comprehensive reporting, detailed analytics, and advanced monitoring capabilities',
                    color: 'green'
                  },
                  {
                    icon: 'fas fa-mobile-alt',
                    title: 'Mobile Ready',
                    description: 'Optimized mobile interface with advanced mobile-specific phishing templates',
                    color: 'orange'
                  },
                  {
                    icon: 'fas fa-robot',
                    title: 'AI Integration',
                    description: 'AI-powered template generation and smart targeting for more effective campaigns',
                    color: 'pink'
                  },
                  {
                    icon: 'fas fa-users',
                    title: 'Team Collaboration',
                    description: 'Multi-user support, team management, and collaborative penetration testing',
                    color: 'cyan'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                  >
                    <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl h-full hover:bg-white/15 transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500/30 to-${feature.color}-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                          <i className={`${feature.icon} text-2xl text-${feature.color}-400`}></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                        <p className="text-white/80">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500/10 via-white/5 to-green-500/10 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="indian-pride-bg backdrop-blur-md rounded-3xl shadow-2xl indian-flag-glow">
                <CardContent className="p-12">
                  <div className="w-24 h-24 rounded-full mx-auto mb-6 shadow-2xl overflow-hidden border-4 tricolor-border">
                    <img 
                      src={twhLogo} 
                      alt="Ahmar - Technical White Hat Founder" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-2 text-white">Ahmar</h2>
                  <p className="text-xl text-orange-300 mb-6 font-semibold">Technical White Hat Founder</p>
                  
                  <p className="text-white/90 leading-relaxed text-lg mb-8">
                    CookPhish Pro is in active development. Follow me on social media and GitHub 
                    for updates and early access announcements!
                  </p>

                  {/* Social Media Links */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" size="lg" className="social-button youtube-button px-6 py-3" asChild>
                      <a 
                        href="https://youtube.com/@technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-youtube"
                      >
                        <i className="fab fa-youtube text-red-400 mr-3 text-lg"></i>
                        YouTube
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="lg" className="social-button instagram-button px-6 py-3" asChild>
                      <a 
                        href="https://instagram.com/technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-instagram"
                      >
                        <i className="fab fa-instagram text-pink-500 mr-3 text-lg"></i>
                        Instagram
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="lg" className="social-button whatsapp-button px-6 py-3" asChild>
                      <a 
                        href="https://wa.me/917890144166" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-whatsapp"
                      >
                        <i className="fab fa-whatsapp text-green-400 mr-3 text-lg"></i>
                        WhatsApp
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="lg" className="social-button telegram-button px-6 py-3" asChild>
                      <a 
                        href="https://t.me/technicalwhitehat" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-telegram"
                      >
                        <i className="fab fa-telegram text-blue-400 mr-3 text-lg"></i>
                        Telegram
                      </a>
                    </Button>
                    
                    <Button variant="outline" size="lg" className="social-button github-button px-6 py-3" asChild>
                      <a 
                        href="https://github.com/technicalwhitehat-yt" 
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-github"
                      >
                        <i className="fab fa-github text-white mr-3 text-lg"></i>
                        GitHub
                      </a>
                    </Button>
                  </div>

                  {/* Repository Link */}
                  <div className="mt-8">
                    <Button 
                      size="lg" 
                      className="hero-button-primary px-8 py-4 text-lg font-semibold"
                      asChild
                    >
                      <a 
                        href="https://github.com/technicalwhitehat-yt/CookPhish"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="pro-repository"
                      >
                        <i className="fab fa-github mr-3 text-xl"></i>
                        View Repository
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}