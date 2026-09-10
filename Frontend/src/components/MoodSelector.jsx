import React from 'react';

export const MOODS = [
  { score: 1, label: 'Very Low', emoji: '😫', color: 'border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700', activeRing: 'ring-red-400 bg-red-50 border-red-500' },
  { score: 2, label: 'Low', emoji: '😕', color: 'border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-700', activeRing: 'ring-amber-400 bg-amber-50 border-amber-500' },
  { score: 3, label: 'Okay', emoji: '😐', color: 'border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-blue-700', activeRing: 'ring-blue-400 bg-blue-50 border-blue-500' },
  { score: 4, label: 'Good', emoji: '🙂', color: 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700', activeRing: 'ring-emerald-400 bg-emerald-50 border-emerald-500' },
  { score: 5, label: 'Great', emoji: '😄', color: 'border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-purple-700', activeRing: 'ring-purple-400 bg-purple-50 border-purple-500' }
];

export const MoodSelector = ({ selectedMood, onSelect, size = 'default' }) => {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full" role="radiogroup" aria-label="Select your mood">
      {MOODS.map((m) => {
        const isSelected = selectedMood === m.score;
        return (
          <button
            key={m.score}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(m.score)}
            className={`flex flex-col items-center justify-center rounded-2xl border-2 transition-all p-3 sm:p-4 text-center cursor-pointer focus:outline-hidden focus:ring-3 focus:ring-lavender-400 ${
              isSelected
                ? `${m.activeRing} ring-2 scale-105 shadow-md font-bold`
                : 'border-charcoal-200/80 bg-white hover:border-charcoal-300 hover:bg-cream-50 text-charcoal-700'
            }`}
          >
            <span className={`${size === 'large' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'} mb-2 select-none transform transition-transform hover:scale-110`}>
              {m.emoji}
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-tight">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
