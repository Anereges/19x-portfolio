import prisma from '../prisma/client';

async function seedSocialMedia() {
  const socialAccounts = [
    { platform: 'YOUTUBE', name: 'TechChannel', url: 'https://youtube.com/@techchannel', icon: 'FaYoutube', followers: 5000, order: 0 },
    { platform: 'TELEGRAM', name: 'TechCommunity', url: 'https://t.me/techcommunity', icon: 'FaTelegram', followers: 2000, order: 1 },
    { platform: 'INSTAGRAM', name: 'TechLife', url: 'https://instagram.com/techlife', icon: 'FaInstagram', followers: 3000, order: 2 },
    { platform: 'TWITTER', name: 'TechTweets', url: 'https://twitter.com/techtweets', icon: 'FaTwitter', followers: 1500, order: 3 },
    { platform: 'GITHUB', name: 'TechCode', url: 'https://github.com/techcode', icon: 'FaGithub', followers: 800, order: 4 },
    { platform: 'LINKEDIN', name: 'TechCareer', url: 'https://linkedin.com/in/techcareer', icon: 'FaLinkedin', followers: 1200, order: 5 },
  ];

  for (const account of socialAccounts) {
    await prisma.socialMedia.upsert({
      where: { platform: account.platform },
      update: account,
      create: account,
    });
  }

  console.log('✅ Social media accounts seeded!');
}

seedSocialMedia()
  .catch(console.error)
  .finally(() => prisma.$disconnect());