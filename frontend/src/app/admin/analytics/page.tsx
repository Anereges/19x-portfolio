'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/portfolioStore';
import { apiClient } from '@/lib/api/client';
import { 
  FaUsers, FaEye, FaChartLine, FaMobileAlt, 
  FaDesktop, FaTablet, FaClock 
} from 'react-icons/fa';

interface AnalyticsData {
  summary: {
    totalVisitors: number;
    totalPageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
  };
  sources: Array<{ source: string; count: number }>;
  pages: Array<{ page: string; views: number }>;
  devices: Array<{ device: string; count: number }>;
  dailyVisitors: Array<{ date: string; visitors: number }>;
  recentVisitors: Array<{
    id: number;
    source: string;
    device: string;
    country: string;
    visitCount: number;
    lastVisit: string;
    page: string;
  }>;
}

// Define proper types for StatCard props
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
  isDark: boolean;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30d');
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    let cancelled = false;

    const loadAnalytics = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get(
          `/analytics/admin?period=${period}`
        );

        if (!cancelled && response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching analytics:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [period]);

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
            📊 Visitor Analytics
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Track your portfolio visitors and their behavior
          </p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg transition ${
                period === p
                  ? 'bg-blue-500 text-white'
                  : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FaUsers}
          label="Total Visitors"
          value={data?.summary.totalVisitors || 0}
          color="blue"
          isDark={isDark}
        />
        <StatCard
          icon={FaEye}
          label="Page Views"
          value={data?.summary.totalPageViews || 0}
          color="green"
          isDark={isDark}
        />
        <StatCard
          icon={FaChartLine}
          label="Unique Visitors"
          value={data?.summary.uniqueVisitors || 0}
          color="purple"
          isDark={isDark}
        />
        <StatCard
          icon={FaClock}
          label="Bounce Rate"
          value={`${data?.summary.bounceRate || 0}%`}
          color="orange"
          isDark={isDark}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources */}
        <div className={`p-6 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📱 Top Sources
          </h2>
          <div className="space-y-3">
            {data?.sources.map((source) => (
              <div key={source.source} className="flex items-center gap-3">
                <span className="text-2xl">
                  {source.source === 'instagram' && '📸'}
                  {source.source === 'telegram' && '✈️'}
                  {source.source === 'linkedin' && '💼'}
                  {source.source === 'twitter' && '🐦'}
                  {source.source === 'github' && '🐙'}
                  {source.source === 'youtube' && '▶️'}
                  {source.source === 'facebook' && '👍'}
                  {source.source === 'google' && '🔍'}
                  {source.source === 'direct' && '🔗'}
                </span>
                <span className={`flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {source.source || 'Direct'}
                </span>
                <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {source.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Devices */}
        <div className={`p-6 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📱 Devices
          </h2>
          <div className="space-y-3">
            {data?.devices.map((device) => (
              <div key={device.device} className="flex items-center gap-3">
                <span className="text-2xl">
                  {device.device === 'mobile' && <FaMobileAlt />}
                  {device.device === 'desktop' && <FaDesktop />}
                  {device.device === 'tablet' && <FaTablet />}
                </span>
                <span className={`flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {device.device || 'Unknown'}
                </span>
                <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {device.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className={`mt-6 p-6 rounded-xl shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          🕐 Recent Visitors
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-100'}>
              <tr>
                <th className="px-4 py-2 text-left text-sm">Source</th>
                <th className="px-4 py-2 text-left text-sm">Device</th>
                <th className="px-4 py-2 text-left text-sm">Country</th>
                <th className="px-4 py-2 text-left text-sm">Page</th>
                <th className="px-4 py-2 text-left text-sm">Visits</th>
                <th className="px-4 py-2 text-left text-sm">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentVisitors.map((visitor) => (
                <tr key={visitor.id} className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <td className="px-4 py-2 text-sm">{visitor.source || 'Direct'}</td>
                  <td className="px-4 py-2 text-sm">{visitor.device || 'Unknown'}</td>
                  <td className="px-4 py-2 text-sm">{visitor.country || 'Unknown'}</td>
                  <td className="px-4 py-2 text-sm">{visitor.page || 'Unknown'}</td>
                  <td className="px-4 py-2 text-sm">{visitor.visitCount}</td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(visitor.lastVisit).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component with proper typing
function StatCard({ icon: Icon, label, value, color, isDark }: StatCardProps) {
  return (
    <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-500/10`}>
          <Icon className={`text-${color}-500 text-2xl`} />
        </div>
      </div>
    </div>
  );
}