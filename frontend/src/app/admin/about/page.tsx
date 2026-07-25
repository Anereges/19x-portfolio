'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/store/portfolioStore';
import { aboutApi } from '@/lib/api/about';
import { About, JourneyItem, SkillItem, AchievementItem, StatItem, StrengthItem, ExpertiseItem } from '@/types';
import { FaSave, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminAboutPage() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [about, setAbout] = useState<About | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Partial<About>>({
    fullName: '',
    title: '',
    bio: '',
    location: '',
    profileImage: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    leetcodeUrl: '',
    journey: [],
    skills: [],
    achievements: [],
    stats: [],
    strengths: [],
    expertise: [],
    isPublic: true,
  });

  // New item states
  const [newJourney, setNewJourney] = useState<JourneyItem>({ year: '', title: '', desc: '', icon: 'FaCode' });
  const [newSkill, setNewSkill] = useState<SkillItem>({ name: '', level: 50, icon: '⚛️' });
  const [newAchievement, setNewAchievement] = useState<AchievementItem>({ icon: 'FaTrophy', text: '', color: 'text-yellow-500' });
  const [newStat, setNewStat] = useState<StatItem>({ label: '', value: '', icon: '🚀' });
  const [newStrength, setNewStrength] = useState<StrengthItem>({ icon: 'FaCode', title: '', desc: '', color: 'from-blue-500 to-purple-500' });
  const [newExpertise, setNewExpertise] = useState<ExpertiseItem>({ category: '', items: [] });
  const [expertiseInput, setExpertiseInput] = useState('');

  async function fetchAbout() {
    try {
      const response = await aboutApi.getAdminAbout();
      if (response.success && response.data) {
        setAbout(response.data);
        setFormData(response.data);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    }
  }

  // Load data on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (isMounted) {
        setLoading(true);
        await fetchAbout();
        setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const response = await aboutApi.upsertAbout(formData);
      if (response.success) {
        alert('About saved successfully!');
        await fetchAbout();
      }
    } catch (error) {
      console.error('Error saving about:', error);
      alert('Failed to save about');
    } finally {
      setSaving(false);
    }
  }

  // Journey management
  function addJourney() {
    if (newJourney.year && newJourney.title) {
      setFormData({
        ...formData,
        journey: [...(formData.journey || []), newJourney],
      });
      setNewJourney({ year: '', title: '', desc: '', icon: 'FaCode' });
    }
  }

  function removeJourney(index: number) {
    setFormData({
      ...formData,
      journey: (formData.journey || []).filter((_, i) => i !== index),
    });
  }

  // Skills management
  function addSkill() {
    if (newSkill.name) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), newSkill],
      });
      setNewSkill({ name: '', level: 50, icon: '⚛️' });
    }
  }

  function removeSkill(index: number) {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter((_, i) => i !== index),
    });
  }

  // Achievements management
  function addAchievement() {
    if (newAchievement.text) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), newAchievement],
      });
      setNewAchievement({ icon: 'FaTrophy', text: '', color: 'text-yellow-500' });
    }
  }

  function removeAchievement(index: number) {
    setFormData({
      ...formData,
      achievements: (formData.achievements || []).filter((_, i) => i !== index),
    });
  }

  // Stats management
  function addStat() {
    if (newStat.label && newStat.value) {
      setFormData({
        ...formData,
        stats: [...(formData.stats || []), newStat],
      });
      setNewStat({ label: '', value: '', icon: '🚀' });
    }
  }

  function removeStat(index: number) {
    setFormData({
      ...formData,
      stats: (formData.stats || []).filter((_, i) => i !== index),
    });
  }

  // Strengths management
  function addStrength() {
    if (newStrength.title) {
      setFormData({
        ...formData,
        strengths: [...(formData.strengths || []), newStrength],
      });
      setNewStrength({ icon: 'FaCode', title: '', desc: '', color: 'from-blue-500 to-purple-500' });
    }
  }

  function removeStrength(index: number) {
    setFormData({
      ...formData,
      strengths: (formData.strengths || []).filter((_, i) => i !== index),
    });
  }

  // Expertise management
  function addExpertise() {
    if (newExpertise.category && expertiseInput) {
      const items = expertiseInput.split(',').map(s => s.trim()).filter(Boolean);
      setFormData({
        ...formData,
        expertise: [...(formData.expertise || []), { ...newExpertise, items }],
      });
      setNewExpertise({ category: '', items: [] });
      setExpertiseInput('');
    }
  }

  function removeExpertise(index: number) {
    setFormData({
      ...formData,
      expertise: (formData.expertise || []).filter((_, i) => i !== index),
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className={`p-2 rounded-lg transition ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About Management
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Manage your About page content
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`ml-auto px-6 py-2 rounded-lg font-semibold text-white transition flex items-center gap-2 ${
            saving
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          <FaSave /> {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {/* Personal Info */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName || ''}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Title (e.g., Software Engineer)"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <div className="md:col-span-2">
            <textarea
              placeholder="Bio / Professional Summary"
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
          </div>
          <input
            type="text"
            placeholder="Location"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Profile Image URL"
            value={formData.profileImage || ''}
            onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={formData.githubUrl || ''}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={formData.linkedinUrl || ''}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Twitter URL"
            value={formData.twitterUrl || ''}
            onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="LeetCode URL"
            value={formData.leetcodeUrl || ''}
            onChange={(e) => setFormData({ ...formData, leetcodeUrl: e.target.value })}
            className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <div className="md:col-span-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              />
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Make About Page Public</span>
            </label>
          </div>
        </div>
      </div>

      {/* Journey / Timeline */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Journey / Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <input
            type="text"
            placeholder="Year (e.g., 2019)"
            value={newJourney.year}
            onChange={(e) => setNewJourney({ ...newJourney, year: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Title"
            value={newJourney.title}
            onChange={(e) => setNewJourney({ ...newJourney, title: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Description"
            value={newJourney.desc}
            onChange={(e) => setNewJourney({ ...newJourney, desc: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Icon (e.g., FaCode)"
            value={newJourney.icon}
            onChange={(e) => setNewJourney({ ...newJourney, icon: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <button
          onClick={addJourney}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add Journey
        </button>
        <div className="space-y-2">
          {(formData.journey || []).map((item, index) => (
            <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>
                <span className="font-bold">{item.year}</span> - <span className="font-semibold">{item.title}</span>
                <span className={`text-sm ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</span>
                <span className={`text-xs ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>({item.icon})</span>
              </div>
              <button onClick={() => removeJourney(index)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Core Skills */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Core Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <input
            type="text"
            placeholder="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="number"
            placeholder="Level (0-100)"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 0 })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Icon (emoji)"
            value={newSkill.icon}
            onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <button
          onClick={addSkill}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add Skill
        </button>
        <div className="space-y-2">
          {(formData.skills || []).map((skill, index) => (
            <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>
                <span className="font-semibold">{skill.icon} {skill.name}</span>
                <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Level: {skill.level}%</span>
                <div className="w-32 h-2 bg-gray-300 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
              <button onClick={() => removeSkill(index)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            placeholder="Icon (e.g., FaTrophy)"
            value={newAchievement.icon}
            onChange={(e) => setNewAchievement({ ...newAchievement, icon: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Achievement Text"
            value={newAchievement.text}
            onChange={(e) => setNewAchievement({ ...newAchievement, text: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Color (e.g., text-yellow-500)"
            value={newAchievement.color}
            onChange={(e) => setNewAchievement({ ...newAchievement, color: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <button
          onClick={addAchievement}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add Achievement
        </button>
        <div className="space-y-2">
          {(formData.achievements || []).map((item, index) => (
            <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>
                <span className={`${item.color}`}>{item.icon}</span>
                <span className="ml-2 font-semibold">{item.text}</span>
              </div>
              <button onClick={() => removeAchievement(index)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Numbers / Stats */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Impact Numbers / Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            placeholder="Label (e.g., Projects)"
            value={newStat.label}
            onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Value (e.g., 15+)"
            value={newStat.value}
            onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Icon (emoji)"
            value={newStat.icon}
            onChange={(e) => setNewStat({ ...newStat, icon: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <button
          onClick={addStat}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add Stat
        </button>
        <div className="space-y-2">
          {(formData.stats || []).map((stat, index) => (
            <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>
                <span className="text-2xl mr-2">{stat.icon}</span>
                <span className="font-semibold">{stat.label}</span>
                <span className={`ml-2 text-lg font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{stat.value}</span>
              </div>
              <button onClick={() => removeStat(index)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Key Strengths */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Key Strengths
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <input
            type="text"
            placeholder="Icon (e.g., FaCode)"
            value={newStrength.icon}
            onChange={(e) => setNewStrength({ ...newStrength, icon: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Title"
            value={newStrength.title}
            onChange={(e) => setNewStrength({ ...newStrength, title: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Description"
            value={newStrength.desc}
            onChange={(e) => setNewStrength({ ...newStrength, desc: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Color (e.g., from-blue-500 to-purple-500)"
            value={newStrength.color}
            onChange={(e) => setNewStrength({ ...newStrength, color: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <button
          onClick={addStrength}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add Strength
        </button>
        <div className="space-y-2">
          {(formData.strengths || []).map((strength, index) => (
            <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>
                <span className="font-semibold">{strength.title}</span>
                <span className={`text-sm ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{strength.desc}</span>
                <span className={`text-xs ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>({strength.icon})</span>
              </div>
              <button onClick={() => removeStrength(index)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Expertise Areas */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Expertise Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <input
            type="text"
            placeholder="Category (e.g., Cybersecurity)"
            value={newExpertise.category}
            onChange={(e) => setNewExpertise({ ...newExpertise, category: e.target.value })}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          <input
            type="text"
            placeholder="Items (comma separated)"
            value={expertiseInput}
            onChange={(e) => setExpertiseInput(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <button
          onClick={addExpertise}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          <FaPlus /> Add Expertise
        </button>
        <div className="space-y-2">
          {(formData.expertise || []).map((exp, index) => (
            <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>
                <span className="font-semibold">{exp.category}</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {exp.items.map((item, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-600' : 'bg-blue-100 text-blue-700'}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={() => removeExpertise(index)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}