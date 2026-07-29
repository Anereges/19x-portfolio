'use client';

// Generate or get session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

// Get source from URL or referrer
const getSource = () => {
  if (typeof window === 'undefined') return 'direct';
  
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  if (utmSource) return utmSource;
  
  const referrer = document.referrer;
  if (referrer.includes('instagram.com')) return 'instagram';
  if (referrer.includes('telegram.org')) return 'telegram';
  if (referrer.includes('linkedin.com')) return 'linkedin';
  if (referrer.includes('twitter.com')) return 'twitter';
  if (referrer.includes('github.com')) return 'github';
  if (referrer.includes('youtube.com')) return 'youtube';
  if (referrer.includes('facebook.com')) return 'facebook';
  if (referrer.includes('google.com')) return 'google';
  
  return 'direct';
};

export const trackVisitor = async (page: string, path: string) => {
  try {
    const sessionId = getSessionId();
    const source = getSource();
    const referrer = document.referrer || '';
    
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Id': sessionId
      },
      body: JSON.stringify({
        sessionId,
        source,
        referrer,
        page,
        path
      })
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};