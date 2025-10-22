import { createContext, useContext, useState, useEffect } from 'react';

// 定义三种主题方案
const themes = {
  theme1: {
    name: '经典粉',
    primary: '#E85D9F',      // 当前默认的粉红色
    secondary: '#D946A6',    // 当前默认的深粉红
    light: '#FFF5F9',        // 浅粉背景
    border: '#F0D9E8',       // 浅粉边框
  },
  theme2: {
    name: '经典红',
    primary: 'rgb(179, 57, 47)',
    secondary: 'rgb(159, 47, 37)',
    light: 'rgb(234, 232, 225)',
    border: 'rgb(194, 192, 185)',
  },
  theme3: {
    name: '清新绿',
    primary: 'rgb(139, 175, 86)',
    secondary: 'rgb(119, 155, 66)',
    light: 'rgb(255, 253, 249)',
    border: 'rgb(230, 228, 224)',
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 从 localStorage 读取保存的主题，默认为 theme1
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('selectedTheme');
    return saved || 'theme1';
  });

  // 应用主题到 CSS 变量
  useEffect(() => {
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    // 设置 CSS 变量
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-light', theme.light);
    root.style.setProperty('--color-border', theme.border);
    
    // 保存到 localStorage
    localStorage.setItem('selectedTheme', currentTheme);
  }, [currentTheme]);

  // 切换到下一个主题
  const switchTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
  };

  // 切换到指定主题
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    themeName: themes[currentTheme].name,
    switchTheme,
    setTheme,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

