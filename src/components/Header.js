import React from 'react';

import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const changeTheme = () => {
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-title">Where in the world?</div>
        <button className="header-theme-mode-button" onClick={changeTheme}>
          <FontAwesomeIcon className="header-theme-mode-icon" icon={faMoon} />
          <p className="header-theme-mode-text">Dark Mode</p>
        </button>
      </div>
    </div>
  );
}
