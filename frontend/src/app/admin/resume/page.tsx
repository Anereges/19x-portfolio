'use client';

import { useEffect, useState, useCallback } from 'react';
import { resumeApi } from '@/lib/api/resume';
import { useThemeStore } from '@/store/portfolioStore';
import { Resume, Experience, Education, Certification, Language, Interest } from '@/types';
import { FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa';

type Proficiency = 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic';

const defaultResume: Partial<Resume> = {
  fullName: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  github: '',
  linkedin: '',
  summary: '',
  avatarUrl: '',
  isPublic: true,
};

export default function AdminResumePage() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  // Form states
  const [formData, setFormData] = useState<Partial<Resume>>(defaultResume);

  // New item states
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: [],
    order: 0,
  });

  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    order: 0,
  });

  const [newCertification, setNewCertification] = useState<Partial<Certification>>({
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialId: '',
    url: '',
    logo: '',
    order: 0,
  });

  const [newLanguage, setNewLanguage] = useState<Partial<Language>>({
    name: '',
    proficiency: 'Fluent' as Proficiency,
    order: 0,
  });

  const [newInterest, setNewInterest] = useState<Partial<Interest>>({
    name: '',
    icon: '',
    order: 0,
  });

  // Define the fetch function
  const fetchResumeData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await resumeApi.getAdminResume();
      if (response.success && response.data) {
        setResume(response.data);
        setFormData(response.data);
      } else {
        setError('No resume found. Create one below.');
      }
    } catch (err: unknown) {
      console.error('Error fetching resume:', err);
      if (err && typeof err === 'object' && 'response' in err) {
        const errorWithResponse = err as { response?: { status?: number } };
        if (errorWithResponse.response?.status === 404) {
          setError('No resume found. Create one below.');
        } else {
          setError('Error fetching resume data');
        }
      } else {
        setError('Error fetching resume data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Use effect to fetch data on mount
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      if (isMounted) {
        await fetchResumeData();
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, [fetchResumeData]);

  const handleSaveResume = async (): Promise<void> => {
    try {
      const response = await resumeApi.upsertResume(formData);
      if (response.success) {
        setResume(response.data as Resume);
        setEditing(false);
        setError(null);
        alert('Resume saved successfully!');
        await fetchResumeData();
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume');
    }
  };

  const handleAddExperience = async (): Promise<void> => {
    try {
      const response = await resumeApi.addExperience(newExperience);
      if (response.success) {
        await fetchResumeData();
        setNewExperience({
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          technologies: [],
          order: 0,
        });
        alert('Experience added successfully!');
      }
    } catch (error) {
      console.error('Error adding experience:', error);
      alert('Failed to add experience');
    }
  };

  const handleDeleteExperience = async (id: number): Promise<void> => {
    if (!confirm('Delete this experience?')) return;
    try {
      await resumeApi.deleteExperience(id);
      await fetchResumeData();
      alert('Experience deleted successfully!');
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Failed to delete experience');
    }
  };

  const handleAddEducation = async (): Promise<void> => {
    try {
      const response = await resumeApi.addEducation(newEducation);
      if (response.success) {
        await fetchResumeData();
        setNewEducation({
          institution: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          order: 0,
        });
        alert('Education added successfully!');
      }
    } catch (error) {
      console.error('Error adding education:', error);
      alert('Failed to add education');
    }
  };

  const handleDeleteEducation = async (id: number): Promise<void> => {
    if (!confirm('Delete this education?')) return;
    try {
      await resumeApi.deleteEducation(id);
      await fetchResumeData();
      alert('Education deleted successfully!');
    } catch (error) {
      console.error('Error deleting education:', error);
      alert('Failed to delete education');
    }
  };

  const handleAddCertification = async (): Promise<void> => {
    try {
      const response = await resumeApi.addCertification(newCertification);
      if (response.success) {
        await fetchResumeData();
        setNewCertification({
          name: '',
          issuer: '',
          date: '',
          expiryDate: '',
          credentialId: '',
          url: '',
          logo: '',
          order: 0,
        });
        alert('Certification added successfully!');
      }
    } catch (error) {
      console.error('Error adding certification:', error);
      alert('Failed to add certification');
    }
  };

  const handleDeleteCertification = async (id: number): Promise<void> => {
    if (!confirm('Delete this certification?')) return;
    try {
      await resumeApi.deleteCertification(id);
      await fetchResumeData();
      alert('Certification deleted successfully!');
    } catch (error) {
      console.error('Error deleting certification:', error);
      alert('Failed to delete certification');
    }
  };

  const handleAddLanguage = async (): Promise<void> => {
    try {
      const response = await resumeApi.addLanguage(newLanguage);
      if (response.success) {
        await fetchResumeData();
        setNewLanguage({ name: '', proficiency: 'Fluent' as Proficiency, order: 0 });
        alert('Language added successfully!');
      }
    } catch (error) {
      console.error('Error adding language:', error);
      alert('Failed to add language');
    }
  };

  const handleDeleteLanguage = async (id: number): Promise<void> => {
    if (!confirm('Delete this language?')) return;
    try {
      await resumeApi.deleteLanguage(id);
      await fetchResumeData();
      alert('Language deleted successfully!');
    } catch (error) {
      console.error('Error deleting language:', error);
      alert('Failed to delete language');
    }
  };

  const handleAddInterest = async (): Promise<void> => {
    try {
      const response = await resumeApi.addInterest(newInterest);
      if (response.success) {
        await fetchResumeData();
        setNewInterest({ name: '', icon: '', order: 0 });
        alert('Interest added successfully!');
      }
    } catch (error) {
      console.error('Error adding interest:', error);
      alert('Failed to add interest');
    }
  };

  const handleDeleteInterest = async (id: number): Promise<void> => {
    if (!confirm('Delete this interest?')) return;
    try {
      await resumeApi.deleteInterest(id);
      await fetchResumeData();
      alert('Interest deleted successfully!');
    } catch (error) {
      console.error('Error deleting interest:', error);
      alert('Failed to delete interest');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📄 Resume Management
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {error && !resume ? 'Create your professional resume' : 'Manage your professional profile and CV'}
          </p>
        </div>
        {resume && (
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
          >
            {editing ? 'Cancel Edit' : <><FaEdit /> Edit Profile</>}
          </button>
        )}
      </div>

      {/* Error / No Resume Message */}
      {error && !resume && (
        <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-center py-8">
            <p className="text-6xl mb-4">📄</p>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Resume Found
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Create your professional resume by filling out the form below.
            </p>
            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Create Resume
            </button>
          </div>
        </div>
      )}

      {/* Basic Info Section */}
      <div className={`p-6 rounded-xl shadow-xl mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Personal Information
        </h2>
        
        {editing || !resume ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName || ''}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
            <input
              type="text"
              placeholder="Professional Title *"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Website"
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="GitHub URL"
              value={formData.github || ''}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={formData.linkedin || ''}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className={`px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <div className="md:col-span-2">
              <textarea
                placeholder="Professional Summary *"
                value={formData.summary || ''}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Make Resume Public</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <button
                onClick={handleSaveResume}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2"
              >
                <FaSave /> {resume ? 'Update Profile' : 'Create Resume'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {resume?.fullName}</div>
            <div><strong>Title:</strong> {resume?.title}</div>
            <div><strong>Email:</strong> {resume?.email}</div>
            <div><strong>Phone:</strong> {resume?.phone || 'N/A'}</div>
            <div><strong>Location:</strong> {resume?.location || 'N/A'}</div>
            <div><strong>Website:</strong> {resume?.website || 'N/A'}</div>
            <div><strong>GitHub:</strong> {resume?.github || 'N/A'}</div>
            <div><strong>LinkedIn:</strong> {resume?.linkedin || 'N/A'}</div>
            <div className="md:col-span-2">
              <strong>Summary:</strong>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{resume?.summary}</p>
            </div>
            <div className="md:col-span-2">
              <strong>Status:</strong> {resume?.isPublic ? '✅ Public' : '🔒 Private'}
            </div>
          </div>
        )}
      </div>

      {/* Only show sections if resume exists */}
      {resume && (
        <>
          {/* Experience Section */}
          <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              💼 Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Location"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="date"
                placeholder="Start Date"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="date"
                placeholder="End Date"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newExperience.current}
                  onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked })}
                />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Current Position</span>
              </div>
              <div className="md:col-span-2">
                <textarea
                  placeholder="Description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                  rows={2}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  value={newExperience.technologies?.join(', ')}
                  onChange={(e) => setNewExperience({ ...newExperience, technologies: e.target.value.split(',').map(t => t.trim()) })}
                  className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <div className="md:col-span-2">
                <button
                  onClick={handleAddExperience}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <FaPlus /> Add Experience
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {resume?.experiences?.map((exp) => (
                <div key={exp.id} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div>
                    <div className="font-semibold">{exp.position} at {exp.company}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {exp.technologies?.join(', ')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🎓 Education
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Field"
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Location"
                value={newEducation.location}
                onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="date"
                placeholder="Start Date"
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="date"
                placeholder="End Date"
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newEducation.current}
                  onChange={(e) => setNewEducation({ ...newEducation, current: e.target.checked })}
                />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Currently Studying</span>
              </div>
              <div className="md:col-span-2">
                <button
                  onClick={handleAddEducation}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <FaPlus /> Add Education
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {resume?.educations?.map((edu) => (
                <div key={edu.id} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div>
                    <div className="font-semibold">{edu.degree} in {edu.field}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {edu.institution} - {new Date(edu.startDate).toLocaleDateString()} {edu.current ? '(Present)' : edu.endDate ? `to ${new Date(edu.endDate).toLocaleDateString()}` : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📜 Certifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Certification Name"
                value={newCertification.name}
                onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Issuer"
                value={newCertification.issuer}
                onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="date"
                placeholder="Date"
                value={newCertification.date}
                onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="date"
                placeholder="Expiry Date"
                value={newCertification.expiryDate}
                onChange={(e) => setNewCertification({ ...newCertification, expiryDate: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Credential ID"
                value={newCertification.credentialId}
                onChange={(e) => setNewCertification({ ...newCertification, credentialId: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="url"
                placeholder="URL"
                value={newCertification.url}
                onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <div className="md:col-span-2">
                <button
                  onClick={handleAddCertification}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <FaPlus /> Add Certification
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {resume?.certifications?.map((cert) => (
                <div key={cert.id} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div>
                    <div className="font-semibold">{cert.name}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {cert.issuer} {cert.date ? `- ${new Date(cert.date).toLocaleDateString()}` : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteCertification(cert.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🌐 Languages
            </h2>
            
            <div className="flex gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Language"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                className={`flex-1 px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <select
                value={newLanguage.proficiency}
                onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value as Proficiency })}
                className={`px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Professional">Professional</option>
                <option value="Conversational">Conversational</option>
                <option value="Basic">Basic</option>
              </select>
              <button
                onClick={handleAddLanguage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <FaPlus /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {resume?.languages?.map((lang) => (
                <div key={lang.id} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span className="font-semibold">{lang.name}</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    ({lang.proficiency})
                  </span>
                  <button
                    onClick={() => handleDeleteLanguage(lang.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🎯 Interests
            </h2>
            
            <div className="flex gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Interest"
                value={newInterest.name}
                onChange={(e) => setNewInterest({ ...newInterest, name: e.target.value })}
                className={`flex-1 px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <input
                type="text"
                placeholder="Icon (emoji)"
                value={newInterest.icon}
                onChange={(e) => setNewInterest({ ...newInterest, icon: e.target.value })}
                className={`w-24 px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
              />
              <button
                onClick={handleAddInterest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <FaPlus /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {resume?.interests?.map((interest) => (
                <div key={interest.id} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span>{interest.icon || '🎯'}</span>
                  <span className="font-semibold">{interest.name}</span>
                  <button
                    onClick={() => handleDeleteInterest(interest.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}