import React, { useState } from 'react';
import { KEY_FINGER_MAP } from '../data/lessons';

const KEYBOARD_ROWS = [
  [
    { key: '`', shift: '~' },
    { key: '1', shift: '!' },
    { key: '2', shift: '@' },
    { key: '3', shift: '#' },
    { key: '4', shift: '$' },
    { key: '5', shift: '%' },
    { key: '6', shift: '^' },
    { key: '7', shift: '&' },
    { key: '8', shift: '*' },
    { key: '9', shift: '(' },
    { key: '0', shift: ')' },
    { key: '-', shift: '_' },
    { key: '=', shift: '+' },
    { key: 'Backspace', width: 'w-16 sm:w-20' }
  ],
  [
    { key: 'tab', width: 'w-12 sm:w-16' },
    { key: 'q', shift: 'Q' },
    { key: 'w', shift: 'W' },
    { key: 'e', shift: 'E' },
    { key: 'r', shift: 'R' },
    { key: 't', shift: 'T' },
    { key: 'y', shift: 'Y' },
    { key: 'u', shift: 'U' },
    { key: 'i', shift: 'I' },
    { key: 'o', shift: 'O' },
    { key: 'p', shift: 'P' },
    { key: '[', shift: '{' },
    { key: ']', shift: '}' },
    { key: '\\', shift: '|' }
  ],
  [
    { key: 'caps lock', width: 'w-14 sm:w-20' },
    { key: 'a', shift: 'A' },
    { key: 's', shift: 'S' },
    { key: 'd', shift: 'D' },
    { key: 'f', shift: 'F' },
    { key: 'g', shift: 'G' },
    { key: 'h', shift: 'H' },
    { key: 'j', shift: 'J' },
    { key: 'k', shift: 'K' },
    { key: 'l', shift: 'L' },
    { key: ';', shift: ':' },
    { key: "'", shift: '"' },
    { key: 'enter', width: 'w-14 sm:w-20' }
  ],
  [
    { key: 'shift', width: 'w-16 sm:w-24' },
    { key: 'z', shift: 'Z' },
    { key: 'x', shift: 'X' },
    { key: 'c', shift: 'C' },
    { key: 'v', shift: 'V' },
    { key: 'b', shift: 'B' },
    { key: 'n', shift: 'N' },
    { key: 'm', shift: 'M' },
    { key: ',', shift: '<' },
    { key: '.', shift: '>' },
    { key: '/', shift: '?' },
    { key: 'shift', width: 'w-16 sm:w-24' }
  ],
  [
    { key: 'control', width: 'w-12 sm:w-16' },
    { key: 'option', width: 'w-12 sm:w-16' },
    { key: 'space', width: 'w-56 sm:w-80' },
    { key: 'option', width: 'w-12 sm:w-16' }
  ]
];

export default function VirtualKeyboard({
  targetChar,
  activeKey,
  showGuide = true,
  showHands = true
}) {
  const [showTaxi, setShowTaxi] = useState(true);

  const isSpaceTarget = targetChar === ' ';
  const isShiftTarget = targetChar && targetChar !== ' ' && targetChar === targetChar.toUpperCase() && targetChar.match(/[A-Z!@#$%^&*()_+{}|:"<>?~]/);
  const normalizedTarget = (targetChar || '').toLowerCase();

  const isTargetKey = (k) => {
    if (k.key === 'space' && isSpaceTarget) return true;
    if (k.key === 'shift' && isShiftTarget) return true;
    if (k.key.length === 1 && k.key.toLowerCase() === normalizedTarget) return true;
    if (k.shift && k.shift === targetChar) return true;
    return false;
  };

  const isActiveKey = (k) => {
    if (!activeKey) return false;
    if (k.key === 'space' && (activeKey === ' ' || activeKey === 'Space')) return true;
    if (k.key.toLowerCase() === activeKey.toLowerCase()) return true;
    return false;
  };

  if (!showGuide) return null;

  return (
    <div className="relative w-full overflow-hidden bg-[#faf4d0] rounded-2xl sm:rounded-3xl border border-amber-200/80 p-4 sm:p-8 flex items-center justify-between select-none shadow-md mt-4">
      {/* Background clouds landscape */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-2 left-10 w-24 h-12 bg-white/70 rounded-full blur-xs" />
        <div className="absolute top-6 right-20 w-32 h-14 bg-white/70 rounded-full blur-xs" />
      </div>

      {/* Left Signpost (Typing Club signature) */}
      <div className="hidden md:flex flex-col items-center justify-center relative w-24 sm:w-28 flex-shrink-0 z-10">
        <div className="relative flex flex-col items-center">
          {/* Post top sphere */}
          <div className="w-4 h-4 bg-slate-400 rounded-full shadow-xs mb-1" />

          {/* Road sign blades */}
          <div className="relative -space-y-1 text-[9px] font-black text-white">
            <div className="bg-[#e64980] px-2.5 py-1 rounded-sm shadow-sm transform -rotate-12 translate-x-[-8px]">
              Keyboard Sq.
            </div>
            <div className="bg-[#fcc419] text-[#5f3e00] px-3 py-1 rounded-sm shadow-sm transform rotate-6 translate-x-[6px]">
              Home Row St.
            </div>
            <div className="bg-[#22b8cf] px-2.5 py-1 rounded-sm shadow-sm transform -rotate-6 translate-x-[-6px]">
              TypingCity
            </div>
          </div>

          {/* Post Pole */}
          <div className="w-2 h-28 sm:h-32 bg-slate-400 rounded-full shadow-inner mt-1" />
        </div>
      </div>

      {/* Center Keyboard + Transparent Hand Overlays */}
      <div className="relative flex flex-col items-center mx-auto z-10 max-w-full">
        <div className="flex flex-col gap-1.5 sm:gap-2 items-center">
          {KEYBOARD_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-1 sm:gap-1.5 justify-center">
              {row.map((k, keyIdx) => {
                const isTarget = isTargetKey(k);
                const isActive = isActiveKey(k);
                const width = k.width || 'w-8 sm:w-11';

                return (
                  <div
                    key={keyIdx}
                    className={`h-9 sm:h-12 ${width} rounded-full sm:rounded-2xl flex flex-col items-center justify-center font-bold text-xs sm:text-sm transition-all duration-75 relative shadow-sm ${
                      isActive
                        ? 'bg-[#1971c2] text-white scale-95 shadow-md ring-2 ring-blue-300 z-10'
                        : isTarget
                        ? 'bg-[#339af0] text-white scale-105 shadow-md ring-4 ring-blue-300 font-extrabold animate-pulse z-10'
                        : 'bg-[#fffdf0] text-[#495057] border border-[#f1e7b8] hover:bg-white shadow-xs'
                    }`}
                  >
                    {k.shift && (
                      <span className={`text-[8px] sm:text-[9px] -mb-1 ${isTarget || isActive ? 'text-blue-100' : 'text-[#868e96]'}`}>
                        {k.shift}
                      </span>
                    )}
                    <span className="capitalize">{k.key}</span>

                    {/* Home row tactile bumps on F and J */}
                    {(k.key === 'f' || k.key === 'j') && !isTarget && !isActive && (
                      <span className="w-1.5 h-0.5 bg-amber-400 rounded-full absolute bottom-1" />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Transparent Hand Outlines (Typing Club signature hand posture) */}
        {showHands && (
          <div className="absolute inset-0 pointer-events-none flex justify-between items-center z-20 px-4 sm:px-12 opacity-80">
            {/* Left Hand SVG Overlay */}
            <svg
              className="w-48 sm:w-60 h-36 sm:h-44 text-blue-600/70"
              viewBox="0 0 200 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Pinky (A) */}
              <path d="M 30,140 C 25,90 20,60 35,40 C 40,35 48,40 45,65 L 45,95" />
              {/* Ring (S) */}
              <path d="M 45,65 C 45,45 50,25 60,20 C 68,20 70,35 68,60 L 68,95" />
              {/* Middle (D) */}
              <path d="M 68,60 C 70,35 75,15 88,10 C 98,10 98,30 95,60 L 95,95" />
              {/* Index (F) */}
              <path d="M 95,60 C 98,40 105,25 118,25 C 128,25 125,45 120,70 L 115,100" />
              {/* Thumb (Space) */}
              <path d="M 120,90 C 135,95 155,100 160,115 C 165,125 150,135 135,130 L 100,145" />
              {/* Palm Base */}
              <path d="M 30,140 C 50,155 100,155 130,145" />
            </svg>

            {/* Right Hand SVG Overlay */}
            <svg
              className="w-48 sm:w-60 h-36 sm:h-44 text-blue-600/70 transform -scale-x-100"
              viewBox="0 0 200 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Pinky (;) */}
              <path d="M 30,140 C 25,90 20,60 35,40 C 40,35 48,40 45,65 L 45,95" />
              {/* Ring (L) */}
              <path d="M 45,65 C 45,45 50,25 60,20 C 68,20 70,35 68,60 L 68,95" />
              {/* Middle (K) */}
              <path d="M 68,60 C 70,35 75,15 88,10 C 98,10 98,30 95,60 L 95,95" />
              {/* Index (J) */}
              <path d="M 95,60 C 98,40 105,25 118,25 C 128,25 125,45 120,70 L 115,100" />
              {/* Thumb (Space) */}
              <path d="M 120,90 C 135,95 155,100 160,115 C 165,125 150,135 135,130 L 100,145" />
              {/* Palm Base */}
              <path d="M 30,140 C 50,155 100,155 130,145" />
            </svg>
          </div>
        )}
      </div>

      {/* Right Cartoon Yellow Taxi Car (Typing Club signature) */}
      {showTaxi && (
        <div className="hidden lg:flex flex-col items-center justify-center relative w-32 sm:w-40 flex-shrink-0 z-10">
          <div className="flex justify-end w-full mb-1">
            <button
              onClick={() => setShowTaxi(false)}
              className="text-[10px] text-slate-500 hover:text-slate-800 font-bold bg-white/60 px-1.5 py-0.5 rounded cursor-pointer"
            >
              Hide ×
            </button>
          </div>

          {/* Cartoon Taxi SVG */}
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <svg className="w-28 sm:w-36 h-20 sm:h-24" viewBox="0 0 160 100" fill="none">
              {/* Exhaust Smoke */}
              <circle cx="150" cy="70" r="5" fill="#e9ecef" />
              <circle cx="155" cy="62" r="4" fill="#f1f3f5" />

              {/* Taxi Roof Sign */}
              <rect x="68" y="22" width="24" height="8" rx="2" fill="#ffd43b" stroke="#f08c00" strokeWidth="1.5" />
              <text x="73" y="28" fontSize="6" fontWeight="bold" fill="#5f3e00">TAXI</text>

              {/* Car Body */}
              <path d="M 20,65 L 35,40 C 40,32 50,30 65,30 L 95,30 C 110,30 120,38 128,45 L 140,65 C 145,67 145,78 135,78 L 25,78 C 15,78 15,67 20,65 Z" fill="#ffd43b" stroke="#f08c00" strokeWidth="2" />

              {/* Windows */}
              <path d="M 40,42 L 65,34 L 65,58 L 30,58 Z" fill="#4dabf7" opacity="0.85" />
              <path d="M 70,34 L 95,34 L 118,46 L 70,58 Z" fill="#4dabf7" opacity="0.85" />

              {/* Headlight & Bumper */}
              <rect x="15" y="65" width="6" height="8" rx="2" fill="#ffe066" stroke="#f08c00" />
              <rect x="15" y="73" width="12" height="4" rx="1" fill="#ced4da" />

              {/* Wheels */}
              <circle cx="45" cy="78" r="12" fill="#343a40" />
              <circle cx="45" cy="78" r="5" fill="#f8f9fa" />

              <circle cx="115" cy="78" r="12" fill="#343a40" />
              <circle cx="115" cy="78" r="5" fill="#f8f9fa" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
