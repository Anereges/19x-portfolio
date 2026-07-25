'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/portfolioStore';
import { SocialMedia } from '@/types';
import { apiClient } from '@/lib/api/client';
import { motion } from 'framer-motion';
import { FaYoutube, FaTelegram, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const iconMap = {
  FaYoutube: FaYoutube,
  FaTelegram: FaTelegram,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
};

export const SocialMediaBar = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMedia[]>([]);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await apiClient.get('/social');
        if (response.data.success) {
          setSocialLinks(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };
    fetchSocialLinks();
  }, []);

  if (socialLinks.length === 0) return null;

  return (
    <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 z-40 ${
      isDark ? 'bg-gray-800/90' : 'bg-white/90'
    } backdrop-blur-sm rounded-r-xl shadow-lg p-2 hidden md:block`}>
      <div className="flex flex-col gap-3">
        {socialLinks.filter(s => s.active).map((social) => {
          const Icon = iconMap[social.icon as keyof typeof iconMap] || FaGithub;
          return (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, x: 4 }}
              className={`p-2 rounded-lg transition ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title={social.name}
            >
              <Icon size={24} className="text-blue-500" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};