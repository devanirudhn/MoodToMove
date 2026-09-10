import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import MoodSelector, { MOODS } from '../components/MoodSelector';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Compass, History } from 'lucide-react';

export const CompletionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activity = location.state?.activity || { name: '2-Minute Reset', _id: null, category: 'Wellness' };
  const beforeMood = location.state?.beforeMood || 2;
  const beforeReason = location.state?.beforeReason || 'Studying too long';
  const durationSeconds = location.state?.durationSeconds || 120;

  const [afterMood, setAfterMood] = useState(null);
  const [savedSession, setSavedSession] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Fire confetti upon mounting
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  const beforeMoodObj = MOODS.find((m) => m.score === beforeMood) || MOODS[1];
  const afterMoodObj = MOODS.find((m) => m.score === afterMood);

  const moodDiff = afterMood !== null ? afterMood - beforeMood : 0;

  const handleAfterMoodSelect = async (score) => {
    setAfterMood(score);
    if (!activity._id) return;

    try {
      setSaving(true);
      setSaveError('');

      // Save ActivitySession in MongoDB
      const res = await api.sessions.create({
        activityId: activity._id,
        beforeMood,
        afterMood: score,
        reason: beforeReason,
        durationSeconds
      });

      if (res.success && res.session) {
        setSavedSession(res.session);
        // Extra mini celebration on positive mood change
        if (score > beforeMood) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
      }
    } catch (err) {
      setSaveError(err.message || 'Unable to record session.');
    } finally {
      setSaving(false);
    }
  };

  const getFeedbackMessage = () => {
    if (moodDiff > 0) {
      return {
        title: 'Looks like that helped! 🌱',
        body: `Your mood shifted from ${beforeMoodObj.label} to ${afterMoodObj?.label}. You took a mindful pause, released tension, and energized your focus.`
      };
    } else if (moodDiff === 0) {
      return {
        title: "That's okay.",
        body: 'Not every reset changes how we feel immediately. You still gave your body a meaningful break from your desk.'
      };
    } else {
      return {
        title: 'Thanks for checking in.',
        body: "Sometimes a short reset isn't enough when you've been working intensely. Consider taking a longer stroll or staying hydrated."
      };
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-cream-50">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-12 border border-charcoal-200/80 shadow-xl shadow-charcoal-900/5 text-center">
        {/* Celebration Header */}
        <div className="w-16 h-16 rounded-3xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900 tracking-tight">
          🎉 Reset Complete!
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 mt-2">
          Nice work. You just took two minutes for your mind and body.
        </p>

        {/* Before Mood Badge */}
        <div className="my-6 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cream-100/90 border border-charcoal-200/80 text-xs font-semibold text-charcoal-700">
          <span>Before Activity:</span>
          <span className="text-base">{beforeMoodObj.emoji}</span>
          <span className="font-bold text-charcoal-900">{beforeMoodObj.label}</span>
        </div>

        {/* Question: How do you feel now? */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-charcoal-900 tracking-tight mb-2">
            How do you feel now?
          </h2>
          <p className="text-xs text-charcoal-500 mb-6">
            Tap your mood level to see your quantified difference.
          </p>

          <MoodSelector selectedMood={afterMood} onSelect={handleAfterMoodSelect} />
        </div>

        {saving && (
          <p className="text-xs text-lavender-600 font-semibold animate-pulse my-4">
            Saving your reset to MongoDB...
          </p>
        )}

        {saveError && (
          <p className="text-xs text-red-600 font-semibold my-4">
            {saveError}
          </p>
        )}

        {/* Mood Improvement Result Box */}
        {afterMood !== null && (
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-lavender-50 via-white to-mint-50/50 border border-lavender-200 shadow-sm animate-in fade-in zoom-in-95">
            {/* Calculation: Before -> After */}
            <div className="flex items-center justify-center gap-3 text-sm font-bold text-charcoal-700 mb-3">
              <span>{beforeMoodObj.emoji} {beforeMoodObj.label}</span>
              <ArrowRight className="w-4 h-4 text-lavender-600" />
              <span>{afterMoodObj?.emoji} {afterMoodObj?.label}</span>
            </div>

            {/* Score Change Banner */}
            <div className="text-2xl sm:text-3xl font-black text-charcoal-900 tracking-tight my-2">
              {moodDiff > 0 ? (
                <span className="text-emerald-600">+{moodDiff} Mood Improvement</span>
              ) : moodDiff === 0 ? (
                <span className="text-charcoal-700">Mood Maintained</span>
              ) : (
                <span className="text-amber-700">{moodDiff} Mood Change</span>
              )}
            </div>

            {/* Dynamic Supportive Feedback */}
            <div className="mt-4 pt-4 border-t border-charcoal-100">
              <h4 className="text-sm font-bold text-charcoal-900 mb-1">
                {getFeedbackMessage().title}
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed max-w-md mx-auto">
                {getFeedbackMessage().body}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-3 bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </Link>
              <Link
                to="/history"
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-cream-100 text-charcoal-800 font-bold text-xs rounded-xl border border-charcoal-200 transition-all flex items-center justify-center gap-1.5"
              >
                <History className="w-4 h-4" />
                <span>View My Journey</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletionPage;
