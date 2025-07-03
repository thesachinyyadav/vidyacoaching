import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
  ];

  const quickLinks = [
    { label: 'Fee Structure', href: '#', new: false },
    { label: 'Admission Process', href: '#', new: true },
    { label: 'Academic Calendar', href: '#', new: false },
    { label: 'Faculty Team', href: '#', new: false },
    { label: 'Student Portal', href: '#', new: true },
    { label: 'Contact Us', href: '#', new: false },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm sm:text-lg">V</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold gradient-text bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Vidya Coaching
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">Excellence in Education</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
              Providing quality education across multiple boards - State, CBSE, and ICSE. 
              We are committed to student success with transparent fee structures and 
              innovative teaching methodologies.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-300 text-sm">
              <span>Made with</span>
              <div className="flex items-center space-x-2">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 animate-pulse" />
                <span>for education by passionate educators</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`bg-gray-800 hover:bg-gray-700 p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${social.color} group`}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 relative">
              Contact Information
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4 group">
                <div className="bg-primary-600/20 p-2 rounded-lg group-hover:bg-primary-600/30 transition-colors flex-shrink-0">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-primary-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors">+91 80734 65108</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Available 9 AM - 6 PM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4 group">
                <div className="bg-secondary-600/20 p-2 rounded-lg group-hover:bg-secondary-600/30 transition-colors flex-shrink-0">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-secondary-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors break-all">info@vidyacoaching.com</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Quick response guaranteed</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4 group">
                <div className="bg-green-600/20 p-2 rounded-lg group-hover:bg-green-600/30 transition-colors flex-shrink-0">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors">No.31, 1st cross, Ananthnagar</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Electronic City Phase 2, Bangalore - 560100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between text-sm sm:text-base text-gray-300 hover:text-white transition-all duration-200 group hover:translate-x-1"
                >
                  <span className="flex items-center space-x-2">
                    <span>{link.label}</span>
                    {link.new && (
                      <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs px-1.5 py-0.5 sm:px-2 rounded-full font-semibold">
                        New
                      </span>
                    )}
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-2xl p-6 border border-gray-700">
            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">Subscribe to get the latest updates on admissions and fee structures</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 Vidya Coaching. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with React, TypeScript & Modern Web Technologies
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
