import React from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Premium Day/Night toggle button with animated sun/moon icons.
 * Renders a pill-shaped switch that slides between dark (moon) and light (sun) modes.
 */
export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`theme-toggle-btn ${isDark ? 'is-dark' : 'is-light'}`}
      title={isDark ? 'Switch to Day Mode (#F7F2CF Cream)' : 'Switch to Night Mode (Dark Version)'}
      aria-label={isDark ? 'Switch to Day Mode (#F7F2CF Cream)' : 'Switch to Night Mode (Dark Version)'}
    >
      <div className="theme-toggle-knob">
        {isDark ? (
          <Moon className="w-3 h-3 text-indigo-600" />
        ) : (
          <Sun className="w-3 h-3 text-amber-600" />
        )}
      </div>
    </button>
  );
}
