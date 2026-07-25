import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioState {
  mode: 'software' | 'cybersecurity';
  setMode: (mode: 'software' | 'cybersecurity') => void;
  toggleMode: () => void;
}

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      mode: 'software',
      setMode: (mode) => set({ mode }),
      toggleMode: () => {
        const current = get().mode;
        set({ mode: current === 'software' ? 'cybersecurity' : 'software' });
      },
    }),
    {
      name: 'portfolio-mode',
    }
  )
);

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const current = get().theme;
        set({ theme: current === 'light' ? 'dark' : 'light' });
      },
    }),
    {
      name: 'theme-mode',
    }
  )
);