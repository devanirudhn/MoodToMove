import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { MOODS } from '../components/MoodSelector';
import { Sparkles, Calendar, Clock, ArrowRight, Filter, TrendingUp, Heart } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = ['All', 'Breathing', 'Stretch', 'Mobility', 'Posture', 'Focus', 'Energy', 'Movement'];

export const HistoryPage = () => {
  const [sessions, setSessions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSessions = async (category) => {
    try {
      setLoading(true);
      setError('');
      const res = await api.sessions.getAll(category);
      if (res.success && res.sessions) {
        setSessions(res.sessions);
      }
    } catch (err) {
      setError(err.message || 'Unable to load your history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions(activeCategory);
  }, [activeCategory]);

  const getMoodObj = (score) => MOODS.find((m) => m.score === score) || { score, emoji: '😐', label: 'Neutral' };

  // Prepare simple chart points from recent sessions (max 7)
  const chartSessions = [...sessions].reverse().slice(-7);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-charcoal-900 tracking-tight flex items-center gap-2.5">
            <span>My Journey</span>
            <span className="text-xs uppercase font-extrabold bg-lavender-100 text-lavender-700 px-3 py-1 rounded-full">
              {sessions.length} {sessions.length === 1 ? 'Reset' : 'Resets'}
            </span>
          </h1>
          <p className="text-sm text-charcoal-600 mt-1">
            Review your completed 2-minute resets and track how your mood improves over time.
          </p>
        </div>

        <Link
          to="/mood-check"
          className="self-start sm:self-auto px-5 py-2.5 bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>New 2-Min Reset</span>
        </Link>
      </div>

      {/* Mood Trend Visualization Card (SVG Chart) */}
      {sessions.length > 0 && (
        <div className="wellness-card p-6 sm:p-8 mb-8 bg-gradient-to-br from-white via-white to-lavender-50/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-lavender-600" />
              <h3 className="text-base font-extrabold text-charcoal-900">Before vs. After Mood Trend</h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-charcoal-500">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Before
              </span>
              <span className="flex items-center gap-1.5 text-lavender-700">
                <span className="w-2.5 h-2.5 rounded-full bg-lavender-600" /> After
              </span>
            </div>
          </div>

          {/* Simple responsive SVG Chart */}
          <div className="w-full h-48 sm:h-56 relative pt-4">
            <svg viewBox="0 0 700 180" className="w-full h-full overflow-visible">
              {/* Horizontal Grid lines (1 to 5) */}
              {[1, 2, 3, 4, 5].map((level) => {
                const y = 160 - (level - 1) * 35;
                return (
                  <g key={level}>
                    <line x1="40" y1={y} x2="680" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    <text x="15" y={y + 4} fill="#94a3b8" fontSize="10" fontWeight="600">
                      {level} {level === 1 ? '😫' : level === 5 ? '😄' : ''}
                    </text>
                  </g>
                );
              })}

              {/* Data points and connecting lines */}
              {chartSessions.map((s, idx) => {
                const count = chartSessions.length;
                const stepX = count > 1 ? 600 / (count - 1) : 300;
                const x = 60 + idx * stepX;
                const yBefore = 160 - (s.beforeMood - 1) * 35;
                const yAfter = 160 - (s.afterMood - 1) * 35;

                return (
                  <g key={s._id || idx}>
                    {/* Vertical connector line */}
                    <line
                      x1={x}
                      y1={yBefore}
                      x2={x}
                      y2={yAfter}
                      stroke={s.moodChange >= 0 ? '#10B981' : '#F59E0B'}
                      strokeWidth="2.5"
                      strokeDasharray="2,2"
                    />

                    {/* Before Dot */}
                    <circle cx={x} cy={yBefore} r="5" fill="#F59E0B" />

                    {/* After Dot */}
                    <circle cx={x} cy={yAfter} r="6" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />

                    {/* Label at bottom */}
                    <text x={x} y="178" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">
                      {new Date(s.completedAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        <Filter className="w-4 h-4 text-charcoal-400 shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-lavender-600 text-white shadow-xs'
                : 'bg-white text-charcoal-600 hover:bg-cream-100 border border-charcoal-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Retrieving your completed resets..." />
      ) : sessions.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-charcoal-200/80 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-charcoal-900 mb-2">Your journey starts here 🌱</h3>
          <p className="text-sm text-charcoal-600 leading-relaxed mb-6 max-w-sm mx-auto">
            Complete your first 2-minute reset to start tracking your daily physical breaks and mood improvements.
          </p>
          <Link
            to="/mood-check"
            className="px-6 py-3 bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            <span>Check My Mood</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Sessions List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {sessions.map((s) => {
            const bMood = getMoodObj(s.beforeMood);
            const aMood = getMoodObj(s.afterMood);
            const dateStr = new Date(s.completedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const timeStr = new Date(s.completedAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={s._id}
                className="wellness-card p-6 flex flex-col justify-between border-charcoal-200/80 bg-white"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-700">
                      {s.activityId?.category || 'Wellness'}
                    </span>
                    <span className="text-xs text-charcoal-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      2 min
                    </span>
                  </div>

                  {/* Activity Name */}
                  <h3 className="text-base font-bold text-charcoal-900 mb-1">
                    {s.activityId?.name || '2-Minute Reset'}
                  </h3>

                  {s.reason && (
                    <p className="text-xs text-charcoal-500 italic mb-4">
                      Context: "{s.reason}"
                    </p>
                  )}
                </div>

                {/* Mood Comparison Strip */}
                <div className="pt-4 border-t border-charcoal-100">
                  <div className="flex items-center justify-between">
                    {/* Emojis Transition */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-charcoal-700">
                      <span title={bMood.label} className="text-xl">{bMood.emoji}</span>
                      <span className="text-xs text-charcoal-400 font-bold">{bMood.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-lavender-600" />
                      <span title={aMood.label} className="text-xl">{aMood.emoji}</span>
                      <span className="text-xs text-charcoal-800 font-bold">{aMood.label}</span>
                    </div>

                    {/* Improvement Badge */}
                    <div
                      className={`px-2.5 py-1 rounded-full text-xs font-black ${
                        s.moodChange > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : s.moodChange === 0
                          ? 'bg-charcoal-100 text-charcoal-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {s.moodChange > 0 ? `+${s.moodChange} Boost` : `${s.moodChange} Change`}
                    </div>
                  </div>

                  <div className="text-[11px] text-charcoal-400 mt-3 flex items-center justify-between">
                    <span>{dateStr}</span>
                    <span>{timeStr}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
