// src/ThemeProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('savedTheme') || 'standard';
  });

  useEffect(() => {
    localStorage.setItem('savedTheme', theme);
    document.body.className = theme; // sets .standard .light .darker on body
    // update title darker class handling (same as template)
    const titleEl = document.getElementById('title');
    if (titleEl) {
      if (theme === 'darker') titleEl.classList.add('darker-title');
      else titleEl.classList.remove('darker-title');
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
