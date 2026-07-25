'use client';

import { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/portfolioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter,
  FaTelegram, FaWhatsapp, FaPaperPlane, FaCheckCircle
} from 'react-icons/fa';

// Walking Character Component
const WalkingCharacter = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [isWalking, setIsWalking] = useState(true);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [floatingEmojis] = useState([
    { emoji: '🚀', left: 10, top: 15, delay: 0 },
    { emoji: '✨', left: 30, top: 25, delay: 0.8 },
    { emoji: '💡', left: 50, top: 10, delay: 1.6 },
    { emoji: '🌟', left: 70, top: 30, delay: 2.4 },
    { emoji: '💬', left: 90, top: 20, delay: 3.2 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        const newPos = prev + direction * 2;
        if (newPos > 200 || newPos < 0) {
          setDirection(prevDir => -prevDir);
          return prev;
        }
        return newPos;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="relative w-full h-48 overflow-hidden">
      {/* Walking Path */}
      <div className="absolute bottom-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full" />
      
      {/* Character */}
      <motion.div
        className="absolute bottom-4"
        animate={{ x: position }}
        transition={{ type: "tween", duration: 0.05 }}
      >
        <div className="relative w-20 h-20">
          {/* Body */}
          <motion.div
            animate={{
              y: isWalking ? [0, -4, 0] : 0,
              rotate: direction === 1 ? [0, 5, 0] : [0, -5, 0],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="relative"
          >
            {/* Head */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mx-auto shadow-lg" />
            
            {/* Body */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-1 shadow-lg flex items-center justify-center">
              <span className="text-white text-lg">💻</span>
            </div>

            {/* Legs */}
            <div className="flex gap-3 justify-center mt-1">
              <motion.div
                animate={{ 
                  rotate: isWalking ? [0, 20, 0] : 0,
                  y: isWalking ? [0, -2, 0] : 0,
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1.5 h-4 bg-gray-400 rounded-full"
              />
              <motion.div
                animate={{ 
                  rotate: isWalking ? [0, -20, 0] : 0,
                  y: isWalking ? [0, -2, 0] : 0,
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-1.5 h-4 bg-gray-400 rounded-full"
              />
            </div>

            {/* Walking Animation Indicator */}
            <div className="absolute -top-1 -right-1">
              <motion.div
                animate={{ scale: isWalking ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-3 h-3 bg-green-400 rounded-full shadow-lg"
              />
            </div>
          </motion.div>

          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <div className={`px-4 py-2 rounded-2xl text-sm font-medium shadow-xl ${
              isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
            } border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              👋 Say Hello!
              <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 ${
                isDark ? 'bg-gray-700' : 'bg-white'
              }`} />
            </div>
          </motion.div>

          {/* Walking Dots Trail */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/30"
              style={{
                bottom: 0,
                left: `${-10 - i * 8}px`,
                opacity: 1 - i * 0.15,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Emojis - Fixed with pre-defined positions */}
      {floatingEmojis.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: item.delay,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export const ContactSection = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  // Contact information
  const contactInfo = {
    email: 'amanuelsisay687@gmail.com',
    phone: ['0946100269', '0707112339'],
    location: 'Addis Ababa, Ethiopia',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Anereges', color: 'hover:text-gray-400' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/amanuelsisay', color: 'hover:text-blue-500' },
    { icon: FaTwitter, href: 'https://twitter.com/yourusername', color: 'hover:text-blue-400' },
    { icon: FaTelegram, href: 'https://t.me/@vex1919', color: 'hover:text-blue-400' },
    { icon: FaWhatsapp, href: 'https://wa.me/251707112339', color: 'hover:text-green-500' },
  ];

  return (
    <section className={`min-h-screen py-20 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            📬 Get in Touch
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Have a question or want to work together? Let s connect!
          </p>
        </motion.div>

        {/* Walking Character */}
        <div className={`mb-12 rounded-3xl overflow-hidden shadow-xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <WalkingCharacter />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`p-8 rounded-2xl shadow-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Information
              </h2>
              <div className="space-y-6">
                {/* Email */}
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <FaEnvelope className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Email
                    </p>
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className={`${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition`}
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <FaPhone className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Phone
                    </p>
                    <div className="space-y-1">
                      {contactInfo.phone.map((number, index) => (
                        <a 
                          key={index}
                          href={`tel:${number}`}
                          className={`block ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition`}
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <FaMapMarkerAlt className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Location
                    </p>
                    <p className={isDark ? 'text-white' : 'text-gray-900'}>
                      {contactInfo.location}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links with hover animations */}
              <div className="mt-8">
                <h3 className={`font-semibold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Connect on Social Media
                </h3>
                <div className="flex gap-4 text-2xl">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-lg transition-all ${
                          isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        } ${social.color}`}
                      >
                        <Icon className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className={`p-8 rounded-2xl shadow-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="19x nexus"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="19x@example.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Let's work together!"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-500 text-center font-semibold p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                  >
                    <FaCheckCircle className="text-xl" />
                    ✅ Message sent successfully!
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};