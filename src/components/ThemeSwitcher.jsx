import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { currentTheme, themeName, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeKey) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher">
      <button
        className="theme-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="设置"
        title={`当前主题：${themeName}`}
      >
        <img src="/ic_public_settings.svg" alt="设置" className="theme-icon" />
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              className={`theme-option ${currentTheme === key ? 'active' : ''}`}
              onClick={() => handleThemeSelect(key)}
            >
              <span
                className="theme-color-preview"
                style={{ backgroundColor: theme.primary }}
              ></span>
              <span className="theme-option-name">{theme.name}</span>
              {currentTheme === key && <span className="theme-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

