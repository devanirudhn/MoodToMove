import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Sparkles, Flame, Heart, TrendingUp, Clock, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    todayCount: 0,
    currentStreak: 0,
    avgImprovement: 0,
    totalCount: 0,
    latestMood: 3,
    weeklyMoodData: []
  });
  const [quickActivities, setQuickActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsRes, actRes] = await Promise.all([
        api.stats.getDashboard(),
        api.activities.getAll()
      ]);

      if (statsRes.success) {
        setStats(statsRes.stats);
      }
      if (actRes.success && actRes.activities) {
        setQuickActivities(actRes.activities.slice(0, 3));
      }
    } catch (err) {
      setError('Unable to refresh dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getMoodEmoji = (score) => {
    switch (score) {
      case 1: return '😫';
      case 2: return '😕';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '😄';
      default: return '😐';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 tracking-tight flex items-center gap-2">
            <span>{getGreeting()}, {user?.name?.split(' ')[0] || 'Friend'} 👋</span>
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 mt-1">
            Ready for a quick reset? Take 2 minutes to recharge your mind and body.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 bg-white border border-charcoal-200 rounded-xl shadow-xs transition-all hover:bg-cream-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-lavender-600' : ''}`} />
          <span>Refresh Stats</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Streak */}
        <div className="wellness-card p-6 flex items-center gap-4 bg-gradient-to-br from-white to-amber-50/30">
          <div className="w-14 h-14 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center text-2xl shrink-0 shadow-xs">
            <Flame className="w-7 h-7 text-amber-500 fill-amber-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Day Streak</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-3xl font-black text-charcoal-900">{stats.currentStreak}</span>
              <span className="text-xs font-semibold text-charcoal-600">{stats.currentStreak === 1 ? 'Day' : 'Days'}</span>
            </div>
            <p className="text-[11px] text-charcoal-500 mt-0.5">
              {stats.currentStreak > 0 ? 'Consistent resets keep you sharp!' : 'Start your streak today!'}
            </p>
          </div>
        </div>

        {/* Resets Today */}
        <div className="wellness-card p-6 flex items-center gap-4 bg-gradient-to-br from-white to-lavender-50/30">
          <div className="w-14 h-14 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center shrink-0 shadow-xs">
            <Clock className="w-7 h-7 text-lavender-600" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Resets Today</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-3xl font-black text-charcoal-900">{stats.todayCount}</span>
              <span className="text-xs font-semibold text-charcoal-600">{stats.todayCount === 1 ? 'Reset' : 'Resets'}</span>
            </div>
            <p className="text-[11px] text-charcoal-500 mt-0.5">
              {stats.todayCount > 0 ? `${stats.todayCount * 2} minutes dedicated to wellness` : 'No resets yet today'}
            </p>
          </div>
        </div>

        {/* Avg Improvement */}
        <div className="wellness-card p-6 flex items-center gap-4 bg-gradient-to-br from-white to-emerald-50/30">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
            <TrendingUp className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Avg Mood Boost</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-3xl font-black text-charcoal-900">
                {stats.avgImprovement >= 0 ? `+${stats.avgImprovement}` : stats.avgImprovement}
              </span>
              <span className="text-xs font-semibold text-emerald-600">Points</span>
            </div>
            <p className="text-[11px] text-charcoal-500 mt-0.5">
              Over {stats.totalCount} completed {stats.totalCount === 1 ? 'session' : 'sessions'}
            </p>
          </div>
        </div>
      </div>

      {/* Primary CTA Card: Check My Mood */}
      <div className="bg-gradient-to-br from-lavender-700 via-lavender-800 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-lavender-900/15 mb-12 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-lavender-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-lavender-100 text-xs font-semibold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-lavender-200" />
            <span>2-Minute Micro Reset</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            How are you feeling right now?
          </h2>

          <p className="mt-3 text-lavender-100 text-sm sm:text-base leading-relaxed">
            Tell us your mood and what you've been working on. Our recommendation engine selects the ideal 2-minute stretch, breathing, mobility, or focus exercise for your state.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/mood-check"
              className="px-8 py-4 bg-white hover:bg-cream-100 text-lavender-900 font-extrabold text-base rounded-2xl shadow-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check My Mood</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/history"
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-2xl backdrop-blur-md border border-white/20 transition-all text-center"
            >
              View My Journey
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Resets Exploration Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-charcoal-900 tracking-tight">
              Featured 2-Minute Resets
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
              Or dive directly into a quick wellness exercise below.
            </p>
          </div>

          <Link
            to="/mood-check"
            className="text-xs sm:text-sm font-bold text-lavender-600 hover:text-lavender-800 flex items-center gap-1"
          >
            Personalize for me <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {quickActivities.map((act) => (
            <div key={act._id} className="wellness-card p-5 flex flex-col justify-between hover:shadow-md transition-all group">
              <div>
                {/* Real Posture Demonstration Image */}
                <div className="w-full h-36 rounded-2xl overflow-hidden mb-3.5 border border-lavender-200/80 bg-white flex items-center justify-center shadow-2xs group-hover:border-lavender-300 transition-all">
                  <img
                    src={`/exercises/${act.slug}.jpg`}
                    alt={act.name}
                    className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/exercises/desk-stretch.jpg';
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-700">
                    {act.category}
                  </span>
                  <span className="text-xs font-semibold text-charcoal-500">2 min • {act.difficulty}</span>
                </div>

                <h4 className="text-base font-bold text-charcoal-900 mb-1.5">{act.name}</h4>
                <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
                  {act.description}
                </p>
              </div>

              <Link
                to={`/activity/${act._id}`}
                className="w-full py-2.5 px-4 rounded-xl bg-charcoal-50 hover:bg-lavender-50 text-charcoal-800 hover:text-lavender-700 text-xs font-bold border border-charcoal-200 hover:border-lavender-200 transition-all flex items-center justify-center gap-1.5"
              >
                <span>View & Start Reset</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
