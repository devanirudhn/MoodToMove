import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import MoodSelector from '../components/MoodSelector';
import { Sparkles, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

const REASON_OPTIONS = [
  { id: 'Studying too long', label: 'Studying too long', emoji: '📚' },
  { id: 'Feeling stressed', label: 'Feeling stressed', emoji: '😣' },
  { id: 'Feeling tired', label: 'Feeling tired', emoji: '😴' },
  { id: "Can't focus", label: "Can't focus", emoji: '🎯' },
  { id: 'Sitting too long', label: 'Sitting too long', emoji: '🪑' },
  { id: 'Feeling bored', label: 'Feeling bored', emoji: '🥱' },
  { id: 'Just need a break', label: 'Just need a break', emoji: '🌿' }
];

export const MoodCheckPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMoodSelect = (score) => {
    setSelectedMood(score);
    setError('');
  };

  const handleContinueToReasons = () => {
    if (!selectedMood) {
      return setError('Please select how you are feeling right now.');
    }
    setStep(2);
  };

  const handleFindReset = async () => {
    const finalReason = selectedReason === 'Other' ? customReason : (selectedReason || customReason || 'Just taking a study pause');

    try {
      setLoading(true);
      setError('');

      // 1. Record Mood Entry in database
      await api.moods.record({
        moodScore: selectedMood,
        reason: finalReason
      });

      // 2. Query Recommendation Engine
      const recRes = await api.recommendations.get({
        mood: selectedMood,
        reason: finalReason,
        preferences: user?.focusAreas || []
      });

      if (recRes.success && recRes.activity) {
        // Navigate to Activity Detail page with recommendation state
        navigate(`/activity/${recRes.activity._id}`, {
          state: {
            activity: recRes.activity,
            recommendationReason: recRes.reason,
            beforeMood: selectedMood,
            beforeReason: finalReason
          }
        });
      } else {
        throw new Error('Could not find recommendation.');
      }
    } catch (err) {
      setError(err.message || 'Unable to retrieve your recommended reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-cream-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-12 border border-charcoal-200/80 shadow-xl shadow-charcoal-900/5">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-2 rounded-full transition-all ${step === 1 ? 'w-10 bg-lavender-600' : 'w-6 bg-lavender-300'}`} />
          <div className={`h-2 rounded-full transition-all ${step === 2 ? 'w-10 bg-lavender-600' : 'w-6 bg-charcoal-200'}`} />
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Mood Selection */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-lavender-600">Step 1 of 2</span>
              <h2 className="text-3xl font-extrabold text-charcoal-900 tracking-tight mt-1">
                How are you feeling right now?
              </h2>
              <p className="text-sm text-charcoal-600 mt-2 max-w-md mx-auto">
                Be honest with yourself. There are no wrong answers—we'll choose the right reset for your state.
              </p>
            </div>

            <div className="mb-10">
              <MoodSelector selectedMood={selectedMood} onSelect={handleMoodSelect} size="large" />
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-charcoal-100">
              <button
                type="button"
                onClick={handleContinueToReasons}
                disabled={!selectedMood}
                className="w-full sm:w-auto px-8 py-3.5 bg-lavender-600 hover:bg-lavender-700 text-white font-bold rounded-xl text-sm shadow-md shadow-lavender-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Reason Selection */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-lavender-600">Step 2 of 2</span>
              <h2 className="text-3xl font-extrabold text-charcoal-900 tracking-tight mt-1">
                What's going on?
              </h2>
              <p className="text-sm text-charcoal-600 mt-1">
                Tell us what you've been doing so we can tailor the physical reset to your strain.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {REASON_OPTIONS.map((item) => {
                const isSelected = selectedReason === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedReason(item.id);
                      setCustomReason('');
                    }}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-lavender-600 bg-lavender-50/70 shadow-xs ring-1 ring-lavender-600'
                        : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                    }`}
                  >
                    <span className="text-2xl select-none">{item.emoji}</span>
                    <span className="text-sm font-bold text-charcoal-900">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Optional Custom Input */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                Or enter other context (optional):
              </label>
              <input
                type="text"
                value={customReason}
                onChange={(e) => {
                  setCustomReason(e.target.value);
                  setSelectedReason('');
                }}
                placeholder="e.g. 4 hours of consecutive exam prep..."
                className="w-full px-4 py-3 rounded-xl border border-charcoal-200 text-sm focus:outline-hidden focus:border-lavender-500 focus:ring-2 focus:ring-lavender-200 bg-cream-50/30 text-charcoal-900"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-charcoal-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-sm font-semibold text-charcoal-600 hover:text-charcoal-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Mood
              </button>

              <button
                type="button"
                onClick={handleFindReset}
                disabled={loading}
                className="px-8 py-3.5 bg-lavender-600 hover:bg-lavender-700 text-white font-bold rounded-xl text-sm shadow-md shadow-lavender-600/25 flex items-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
              >
                {loading ? (
                  <span>Finding your reset...</span>
                ) : (
                  <>
                    <span>Find My Reset</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodCheckPage;
