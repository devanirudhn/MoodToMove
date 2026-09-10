import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const FOCUS_OPTIONS = [
  { id: 'Better focus', label: 'Better focus', icon: '🎯', desc: 'Sharpen attention during study blocks' },
  { id: 'Stress relief', label: 'Stress relief', icon: '🌿', desc: 'Calm nervous system during exams' },
  { id: 'More energy', label: 'More energy', icon: '⚡', desc: 'Fight off midday grogginess & slump' },
  { id: 'Relaxation', label: 'Relaxation', icon: '🧘', desc: 'Decompress tight muscles & tension' },
  { id: 'Better posture', label: 'Better posture', icon: '🪑', desc: 'Counter hunching & desk slouching' },
  { id: 'Quick breaks', label: 'Quick breaks', icon: '⏱️', desc: 'Rapid 2-minute breathers that fit between tasks' }
];

const DURATION_OPTIONS = [
  { value: 2, label: '2 Minutes', desc: 'Recommended MVP — quick, non-disruptive desk reset', badge: 'Primary' },
  { value: 5, label: '5 Minutes', desc: 'Slightly deeper stretch sequence' },
  { value: 10, label: '10 Minutes', desc: 'Full-body movement & mindful walk' }
];

export const OnboardingPage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedFocus, setSelectedFocus] = useState(['Better focus', 'Stress relief']);
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const toggleFocus = (id) => {
    setSelectedFocus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    try {
      setSaving(true);
      setError('');
      const res = await api.users.savePreferences({
        focusAreas: selectedFocus,
        breakDuration: selectedDuration
      });

      if (res.success && res.user) {
        updateUser(res.user);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-cream-50">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 border border-charcoal-200/80 shadow-xl shadow-charcoal-900/5">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step
                  ? 'w-10 bg-lavender-600'
                  : s < step
                  ? 'w-6 bg-lavender-300'
                  : 'w-6 bg-charcoal-200'
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Screen 1: Welcome */}
        {step === 1 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Sparkles className="w-8 h-8" />
            </div>

            <h2 className="text-3xl font-extrabold text-charcoal-900 tracking-tight">
              Welcome to Mood-to-Move, {user?.name?.split(' ')[0] || 'Student'} 👋
            </h2>

            <p className="mt-4 text-base text-charcoal-600 max-w-md mx-auto leading-relaxed">
              We know studying long hours takes a heavy toll on your body and focus. Let's personalize your 2-minute wellness interventions in 30 seconds.
            </p>

            <button
              onClick={() => setStep(2)}
              className="mt-8 px-8 py-3.5 bg-lavender-600 hover:bg-lavender-700 text-white font-bold rounded-2xl text-sm shadow-md shadow-lavender-600/25 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Personalize My Resets</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Screen 2: Focus Areas */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
                What would you like help with?
              </h2>
              <p className="text-sm text-charcoal-600 mt-1">
                Select one or more areas you frequently face during study sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {FOCUS_OPTIONS.map((opt) => {
                const isSelected = selectedFocus.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleFocus(opt.id)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-lavender-600 bg-lavender-50/60 shadow-xs ring-1 ring-lavender-600'
                        : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                    }`}
                  >
                    <span className="text-2xl select-none">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-charcoal-900">{opt.label}</h4>
                        {isSelected && <Check className="w-4 h-4 text-lavender-600" />}
                      </div>
                      <p className="text-xs text-charcoal-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-charcoal-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-sm font-semibold text-charcoal-600 hover:text-charcoal-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-lavender-600 hover:bg-lavender-700 text-white font-bold rounded-xl text-sm shadow-md shadow-lavender-600/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Screen 3: Break Duration */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-charcoal-900 tracking-tight">
                How long do you prefer your breaks?
              </h2>
              <p className="text-sm text-charcoal-600 mt-1">
                For the MVP, 2 minutes is our scientifically-crafted primary intervention.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {DURATION_OPTIONS.map((opt) => {
                const isSelected = selectedDuration === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedDuration(opt.value)}
                    className={`flex items-center justify-between w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-lavender-600 bg-lavender-50/60 shadow-xs ring-1 ring-lavender-600'
                        : 'border-charcoal-200 bg-white hover:border-charcoal-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-charcoal-900">{opt.label}</h4>
                        {opt.badge && (
                          <span className="text-[10px] uppercase font-extrabold bg-mint-100 text-mint-800 px-2 py-0.5 rounded-full">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-charcoal-500 mt-0.5">{opt.desc}</p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-lavender-600 bg-lavender-600 text-white' : 'border-charcoal-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-charcoal-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-sm font-semibold text-charcoal-600 hover:text-charcoal-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="button"
                onClick={handleFinish}
                disabled={saving}
                className="px-8 py-3.5 bg-lavender-600 hover:bg-lavender-700 text-white font-bold rounded-xl text-sm shadow-md shadow-lavender-600/25 flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {saving ? (
                  <span>Setting up your dashboard...</span>
                ) : (
                  <>
                    <span>Go to Dashboard</span>
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

export default OnboardingPage;
