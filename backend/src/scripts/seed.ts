import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting seed...');

  try {
    // 1. Create Admin User
    console.log('📝 Creating admin user...');
    const hashedPassword = await bcrypt.hash('Test123!', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        username: 'admin',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN'
      }
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // 2. Create Sample Projects
    console.log('📝 Creating sample projects...');
    
    const projects = [
      {
        title: 'Employee Management System',
        slug: 'employee-management-system',
        description: 'A comprehensive employee management system with attendance tracking, payroll, and performance reviews.',
        category: 'SOFTWARE',
        technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Redis']),
        githubUrl: 'https://github.com/example/ems',
        demoUrl: 'https://demo.ems.com',
        featured: true,
        published: true,
        createdById: admin.id
      },
      {
        title: 'Life Management Dashboard',
        slug: 'life-management-dashboard',
        description: 'A personal dashboard for managing daily tasks, goals, and habits with analytics.',
        category: 'SOFTWARE',
        technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma']),
        githubUrl: 'https://github.com/example/life-dashboard',
        demoUrl: 'https://demo.life-dashboard.com',
        featured: false,
        published: true,
        createdById: admin.id
      },
      {
        title: 'E-Commerce Platform',
        slug: 'e-commerce-platform',
        description: 'A full-featured e-commerce platform with payment processing, inventory management, and order tracking.',
        category: 'SOFTWARE',
        technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Stripe']),
        githubUrl: 'https://github.com/example/ecommerce',
        demoUrl: 'https://demo.ecommerce.com',
        featured: false,
        published: true,
        createdById: admin.id
      },
      {
        title: 'Advanced Port Scanner',
        slug: 'advanced-port-scanner',
        description: 'A powerful network port scanner with advanced features for security professionals.',
        category: 'CYBERSECURITY',
        technologies: JSON.stringify(['Python', 'Scapy', 'Nmap', 'Docker']),
        githubUrl: 'https://github.com/example/port-scanner',
        demoUrl: 'https://demo.portscanner.com',
        featured: true,
        published: true,
        createdById: admin.id
      },
      {
        title: 'Incident Response System',
        slug: 'incident-response-system',
        description: 'A comprehensive incident response system for security teams with real-time alerts.',
        category: 'CYBERSECURITY',
        technologies: JSON.stringify(['Node.js', 'React', 'MongoDB', 'Socket.io']),
        githubUrl: 'https://github.com/example/irs',
        demoUrl: 'https://demo.irs.com',
        featured: false,
        published: true,
        createdById: admin.id
      },
      {
        title: 'Network Traffic Analyzer',
        slug: 'network-traffic-analyzer',
        description: 'A real-time network traffic analysis tool with anomaly detection and visualization.',
        category: 'CYBERSECURITY',
        technologies: JSON.stringify(['Python', 'Wireshark', 'D3.js', 'Docker']),
        githubUrl: 'https://github.com/example/traffic-analyzer',
        demoUrl: 'https://demo.traffic-analyzer.com',
        featured: false,
        published: true,
        createdById: admin.id
      }
    ];

    for (const project of projects) {
      await prisma.project.upsert({
        where: { slug: project.slug },
        update: project,
        create: project
      });
    }
    console.log(`✅ ${projects.length} projects created`);

    // 3. Create About Data
    console.log('📝 Creating about data...');
    
    const aboutData = await prisma.about.upsert({
      where: { userId: admin.id },
      update: {
        fullName: 'Your Name',
        title: 'Software Engineer & Cybersecurity Professional',
        bio: 'Passionate software engineer and cybersecurity professional dedicated to building secure, innovative solutions. Specializing in full-stack development, secure coding practices, and cybersecurity operations.',
        location: 'San Francisco, CA',
        profileImage: 'https://i.ibb.co/your-image-url.jpg', // Replace with your actual image URL
        githubUrl: 'https://github.com/yourusername',
        linkedinUrl: 'https://linkedin.com/in/yourusername',
        twitterUrl: 'https://twitter.com/yourusername',
        leetcodeUrl: 'https://leetcode.com/yourusername',
        journey: JSON.stringify([
          { year: '2019', title: 'Started Coding', desc: 'Began journey with Python and Web Development', icon: 'FaGraduationCap' },
          { year: '2020', title: 'Full-Stack Focus', desc: 'Mastered React, Node.js, and Database technologies', icon: 'FaCode' },
          { year: '2022', title: 'System Architecture', desc: 'Led large-scale enterprise projects', icon: 'FaBriefcase' },
          { year: '2024', title: 'Tech Leadership', desc: 'Mentoring and leading development teams', icon: 'FaCrown' },
        ]),
        skills: JSON.stringify([
          { name: 'React/Next.js', level: 95, icon: '⚛️' },
          { name: 'TypeScript', level: 90, icon: '📘' },
          { name: 'Node.js', level: 85, icon: '🟢' },
          { name: 'Python', level: 80, icon: '🐍' },
          { name: 'GraphQL', level: 75, icon: '🔮' },
          { name: 'Docker', level: 70, icon: '🐳' },
        ]),
        achievements: JSON.stringify([
          { icon: 'FaTrophy', text: 'Best Innovation Award 2024', color: 'text-yellow-500' },
          { icon: 'FaRocket', text: 'Open Source Contributor', color: 'text-purple-500' },
          { icon: 'FaBook', text: 'Tech Speaker & Mentor', color: 'text-blue-500' },
          { icon: 'FaUsers', text: 'Community Builder', color: 'text-green-500' },
        ]),
        stats: JSON.stringify([
          { label: 'Projects', value: '15+', icon: '🚀' },
          { label: 'Years Experience', value: '5+', icon: '📅' },
          { label: 'Technologies', value: '25+', icon: '💻' },
          { label: 'Happy Clients', value: '10+', icon: '😊' },
        ]),
        strengths: JSON.stringify([
          { icon: 'FaCode', title: 'Full-Stack Development', desc: 'Building end-to-end applications with modern frameworks', color: 'from-blue-500 to-purple-500' },
          { icon: 'FaBrain', title: 'Problem Solving', desc: 'Analytical thinking and creative solutions', color: 'from-purple-500 to-pink-500' },
          { icon: 'FaUsers', title: 'Team Collaboration', desc: 'Agile development and effective communication', color: 'from-pink-500 to-red-500' },
          { icon: 'FaRocket', title: 'Innovation', desc: 'Pushing boundaries with cutting-edge technologies', color: 'from-red-500 to-orange-500' },
        ]),
        expertise: JSON.stringify([
          { 
            category: 'Cybersecurity', 
            items: ['Blue Team Operations', 'Incident Response', 'Threat Hunting', 'Security Monitoring', 'Detection Engineering', 'Cloud Security'] 
          },
          { 
            category: 'Software Engineering', 
            items: ['Backend Development', 'API Development', 'Full-Stack Development', 'Database Systems', 'Secure Software Development'] 
          },
        ]),
        isPublic: true,
      },
      create: {
        userId: admin.id,
        fullName: 'Your Name',
        title: 'Software Engineer & Cybersecurity Professional',
        bio: 'Passionate software engineer and cybersecurity professional dedicated to building secure, innovative solutions. Specializing in full-stack development, secure coding practices, and cybersecurity operations.',
        location: 'San Francisco, CA',
        profileImage: 'https://i.ibb.co/your-image-url.jpg', // Replace with your actual image URL
        githubUrl: 'https://github.com/yourusername',
        linkedinUrl: 'https://linkedin.com/in/yourusername',
        twitterUrl: 'https://twitter.com/yourusername',
        leetcodeUrl: 'https://leetcode.com/yourusername',
        journey: JSON.stringify([
          { year: '2019', title: 'Started Coding', desc: 'Began journey with Python and Web Development', icon: 'FaGraduationCap' },
          { year: '2020', title: 'Full-Stack Focus', desc: 'Mastered React, Node.js, and Database technologies', icon: 'FaCode' },
          { year: '2022', title: 'System Architecture', desc: 'Led large-scale enterprise projects', icon: 'FaBriefcase' },
          { year: '2024', title: 'Tech Leadership', desc: 'Mentoring and leading development teams', icon: 'FaCrown' },
        ]),
        skills: JSON.stringify([
          { name: 'React/Next.js', level: 95, icon: '⚛️' },
          { name: 'TypeScript', level: 90, icon: '📘' },
          { name: 'Node.js', level: 85, icon: '🟢' },
          { name: 'Python', level: 80, icon: '🐍' },
          { name: 'GraphQL', level: 75, icon: '🔮' },
          { name: 'Docker', level: 70, icon: '🐳' },
        ]),
        achievements: JSON.stringify([
          { icon: 'FaTrophy', text: 'Best Innovation Award 2024', color: 'text-yellow-500' },
          { icon: 'FaRocket', text: 'Open Source Contributor', color: 'text-purple-500' },
          { icon: 'FaBook', text: 'Tech Speaker & Mentor', color: 'text-blue-500' },
          { icon: 'FaUsers', text: 'Community Builder', color: 'text-green-500' },
        ]),
        stats: JSON.stringify([
          { label: 'Projects', value: '15+', icon: '🚀' },
          { label: 'Years Experience', value: '5+', icon: '📅' },
          { label: 'Technologies', value: '25+', icon: '💻' },
          { label: 'Happy Clients', value: '10+', icon: '😊' },
        ]),
        strengths: JSON.stringify([
          { icon: 'FaCode', title: 'Full-Stack Development', desc: 'Building end-to-end applications with modern frameworks', color: 'from-blue-500 to-purple-500' },
          { icon: 'FaBrain', title: 'Problem Solving', desc: 'Analytical thinking and creative solutions', color: 'from-purple-500 to-pink-500' },
          { icon: 'FaUsers', title: 'Team Collaboration', desc: 'Agile development and effective communication', color: 'from-pink-500 to-red-500' },
          { icon: 'FaRocket', title: 'Innovation', desc: 'Pushing boundaries with cutting-edge technologies', color: 'from-red-500 to-orange-500' },
        ]),
        expertise: JSON.stringify([
          { 
            category: 'Cybersecurity', 
            items: ['Blue Team Operations', 'Incident Response', 'Threat Hunting', 'Security Monitoring', 'Detection Engineering', 'Cloud Security'] 
          },
          { 
            category: 'Software Engineering', 
            items: ['Backend Development', 'API Development', 'Full-Stack Development', 'Database Systems', 'Secure Software Development'] 
          },
        ]),
        isPublic: true,
      }
    });
    console.log(`✅ About data created for: ${aboutData.fullName}`);

    console.log('🌱 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();