import React from 'react';

import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext';

export default function Header() {
  const { mode, toggleMode } = useTheme();
  
  return (
    <div className={`header ${mode}`}>
      <div className="header-content">
        <div className={`header-title ${mode}`}>Where in the world?</div>
        <button className={`header-theme-mode-button ${mode}`} onClick={toggleMode}>
          <FontAwesomeIcon className="header-theme-mode-icon" icon={faMoon} />
          <p className="header-theme-mode-text">Dark Mode</p>
        </button>
      </div>
    </div>
  );
}
