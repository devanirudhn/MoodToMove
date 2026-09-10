import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { User, Mail, Calendar, Flame, Clock, TrendingUp, Check, AlertCircle, Edit3, ShieldCheck } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [stats, setStats] = useState({
    todayCount: 0,
    currentStreak: 0,
    avgImprovement: 0,
    totalCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user?.name || '');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(user?.name || '');
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.stats.getDashboard();
        if (res.success && res.stats) {
          setStats(res.stats);
        }
      } catch (err) {
        // quiet error
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return setError('Name cannot be blank.');
    }

    try {
      setSaving(true);
      setError('');
      setMessage('');
      const res = await api.users.updateProfile({ name: name.trim() });
      if (res.success && res.user) {
        updateUser(res.user);
        setMessage('Your profile name was successfully updated!');
        setEditing(false);
      }
    } catch (err) {
      setError(err.message || 'Failed to update name.');
    } finally {
      setSaving(false);
    }
  };

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    : 'September 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-charcoal-900 tracking-tight">Your Profile</h1>
        <p className="text-sm text-charcoal-600 mt-1">
          Manage your student account, personal preferences, and track your all-time consistency.
        </p>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* User Info Card */}
      <div className="wellness-card p-6 sm:p-8 mb-8 bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-lavender-100 text-lavender-700 font-extrabold text-2xl flex items-center justify-center border border-lavender-200 shrink-0">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-charcoal-900">{user?.name}</h2>
              <p className="text-xs text-charcoal-500 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {user?.email}
              </p>
            </div>
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-charcoal-50 hover:bg-lavender-50 text-charcoal-800 hover:text-lavender-700 rounded-xl text-xs font-bold border border-charcoal-200 hover:border-lavender-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Name</span>
            </button>
          )}
        </div>

        {/* Edit Form */}
        {editing ? (
          <form onSubmit={handleUpdateName} className="mt-6 space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-200 text-sm focus:outline-hidden focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setName(user?.name || '');
                }}
                className="px-4 py-2.5 bg-white text-charcoal-600 font-semibold text-xs rounded-xl border border-charcoal-200 hover:bg-charcoal-50"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-xs text-charcoal-600">
            <div className="flex items-center gap-2 p-3 bg-cream-50/60 rounded-xl border border-charcoal-100">
              <Calendar className="w-4 h-4 text-charcoal-400" />
              <span>Member since: <strong className="text-charcoal-900">{joinedDate}</strong></span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-cream-50/60 rounded-xl border border-charcoal-100">
              <Clock className="w-4 h-4 text-charcoal-400" />
              <span>Preferred break duration: <strong className="text-charcoal-900">{user?.breakDuration || 2} minutes</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Statistics Grid */}
      <h3 className="text-base font-extrabold text-charcoal-900 mb-4">All-Time Wellness Stats</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="wellness-card p-6 bg-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-1">
            <Clock className="w-4 h-4 text-lavender-600" />
            <span>Total Resets</span>
          </div>
          <div className="text-3xl font-black text-charcoal-900 mt-1">{stats.totalCount}</div>
          <p className="text-[11px] text-charcoal-500 mt-1">
            {stats.totalCount * 2} minutes of mindful desk breaks
          </p>
        </div>

        <div className="wellness-card p-6 bg-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-1">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Current Streak</span>
          </div>
          <div className="text-3xl font-black text-charcoal-900 mt-1">
            {stats.currentStreak} <span className="text-sm font-semibold text-charcoal-500">Days</span>
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">
            Active daily consecutive practice
          </p>
        </div>

        <div className="wellness-card p-6 bg-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Avg Improvement</span>
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-1">
            {stats.avgImprovement >= 0 ? `+${stats.avgImprovement}` : stats.avgImprovement}
          </div>
          <p className="text-[11px] text-charcoal-500 mt-1">
            Average post-reset mood shift
          </p>
        </div>
      </div>

      {/* Focus Preferences */}
      <div className="wellness-card p-6 sm:p-8 bg-white">
        <h3 className="text-base font-extrabold text-charcoal-900 mb-2">Focus & Wellness Goals</h3>
        <p className="text-xs text-charcoal-600 mb-4">
          These priorities help calibrate which 2-minute activities are recommended when you check in.
        </p>

        <div className="flex flex-wrap gap-2">
          {user?.focusAreas?.length > 0 ? (
            user.focusAreas.map((area, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-lavender-50 text-lavender-700 text-xs font-semibold border border-lavender-200"
              >
                🎯 {area}
              </span>
            ))
          ) : (
            <span className="text-xs text-charcoal-400 italic">No specific focus areas selected.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
