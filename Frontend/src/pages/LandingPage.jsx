import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Clock, TrendingUp, Target, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const { isAuthenticated, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [quickMood, setQuickMood] = useState(2);

  const previewMoods = [
    { score: 1, emoji: '😫', label: 'Very Low' },
    { score: 2, emoji: '😕', label: 'Low' },
    { score: 3, emoji: '😐', label: 'Okay' },
    { score: 4, emoji: '🙂', label: 'Good' },
    { score: 5, emoji: '😄', label: 'Great' }
  ];

  const handleStartReset = () => {
    if (isAuthenticated) {
      navigate('/mood-check');
    } else {
      navigate('/register');
    }
  };

  const handleDemoInstant = async () => {
    try {
      await demoLogin();
      navigate('/dashboard');
    } catch (e) {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 bg-gradient-to-b from-lavender-50/70 via-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lavender-100 text-lavender-800 text-xs sm:text-sm font-semibold mb-8 border border-lavender-200 shadow-xs animate-float">
            <Sparkles className="w-4 h-4 text-lavender-600" />
            Designed for long study sessions & desk fatigue
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Check your mood.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender-600 to-indigo-600">
              Move for 2 minutes.
            </span>{' '}
            Feel the difference.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-charcoal-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Tell us how you're feeling right now. We'll suggest a targeted 2-minute physical reset to help you release tension, recharge, and refocus without leaving your desk.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={handleStartReset}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white font-bold text-base shadow-lg shadow-lavender-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Your Reset</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {!isAuthenticated && (
              <button
                onClick={handleDemoInstant}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-cream-100 text-charcoal-800 font-semibold text-base border border-charcoal-200 transition-all hover:border-charcoal-300 shadow-xs cursor-pointer"
              >
                Instant Demo Account
              </button>
            )}
          </div>

          {/* Visual Concept Flow: Mood -> Movement -> Better Mood */}
          <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-charcoal-200/80 shadow-xl shadow-charcoal-900/5">
              <p className="text-xs font-bold uppercase tracking-widest text-lavender-600 mb-6">
                The 2-Minute Transformation
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Step 1: Mood */}
                <div className="flex flex-col items-center p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70">
                  <span className="text-5xl mb-2">😕</span>
                  <span className="text-sm font-bold text-amber-900">Low & Stiff</span>
                  <span className="text-xs text-amber-700 mt-1">Stuck studying for 3 hrs</span>
                </div>

                {/* Arrow / Transition */}
                <div className="flex flex-col items-center justify-center gap-1 text-lavender-600">
                  <div className="h-0.5 w-12 bg-lavender-300 hidden md:block" />
                  <span className="text-xs font-semibold px-2.5 py-1 bg-lavender-100 text-lavender-700 rounded-full">
                    2 Min Desk Stretch
                  </span>
                  <div className="h-0.5 w-12 bg-lavender-300 hidden md:block" />
                </div>

                {/* Step 3: Better Mood */}
                <div className="flex flex-col items-center p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
                  <span className="text-5xl mb-2">🙂</span>
                  <span className="text-sm font-bold text-emerald-900">Refreshed & Good</span>
                  <span className="text-xs text-emerald-700 mt-1">+2 Mood Improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-charcoal-900 tracking-tight">
              Small enough for busy schedules. Powerful enough to work.
            </h2>
            <p className="mt-3 text-base text-charcoal-600">
              No gym clothes, no equipment, and no complicated routines required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="wellness-card p-6">
              <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center mb-5">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">🧠 Mood-Based</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Interventions tailored directly to how you feel right now—whether you're stressed, drained, or unfocused.
              </p>
            </div>

            <div className="wellness-card p-6">
              <div className="w-12 h-12 rounded-2xl bg-mint-100 text-mint-700 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">⏱️ Just 2 Minutes</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Short guided resets that fit seamlessly between lecture modules, coding blocks, or study sessions.
              </p>
            </div>

            <div className="wellness-card p-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">🌱 Track Progress</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Verify the difference before and after every reset. Build daily streaks and monitor your mood trends.
              </p>
            </div>

            <div className="wellness-card p-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">🎯 Personalized</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Deterministic matching engine that chooses breathing, mobility, posture, or energizing flows based on your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-cream-50/70 border-t border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-lavender-600">Simple Process</span>
            <h2 className="text-3xl font-extrabold text-charcoal-900 tracking-tight mt-1">
              How Mood-to-Move Works in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-charcoal-200/80 shadow-sm relative">
              <span className="absolute -top-4 left-8 px-3 py-1 bg-lavender-600 text-white text-xs font-bold rounded-full">
                Step 1
              </span>
              <h3 className="text-xl font-bold text-charcoal-900 mt-2 mb-3">1. Check In</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Select your current mood (from Very Low to Great) and tell us what you've been doing—like studying too long or sitting at your screen.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-charcoal-200/80 shadow-sm relative">
              <span className="absolute -top-4 left-8 px-3 py-1 bg-lavender-600 text-white text-xs font-bold rounded-full">
                Step 2
              </span>
              <h3 className="text-xl font-bold text-charcoal-900 mt-2 mb-3">2. Move</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Follow dynamic, timed step-by-step instructions through a clean 2-minute circular timer designed to decompress physical and mental tension.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-charcoal-200/80 shadow-sm relative">
              <span className="absolute -top-4 left-8 px-3 py-1 bg-lavender-600 text-white text-xs font-bold rounded-full">
                Step 3
              </span>
              <h3 className="text-xl font-bold text-charcoal-900 mt-2 mb-3">3. Check Out</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                Log your post-activity mood, celebrate your quantified mood improvement, and watch your daily streak and history update automatically.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-16 bg-gradient-to-r from-lavender-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold">Ready to take two minutes for your mind and body?</h3>
            <p className="mt-3 text-lavender-100 max-w-xl mx-auto text-sm sm:text-base">
              Join students who use Mood-to-Move to break up marathon study sessions with restorative micro-breaks.
            </p>
            <div className="mt-8">
              <button
                onClick={handleStartReset}
                className="px-8 py-3.5 bg-white text-lavender-900 hover:bg-cream-100 font-bold rounded-xl shadow-md transition-all cursor-pointer"
              >
                Start Your Reset Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Disclaimer */}
      <footer className="py-8 bg-white border-t border-charcoal-200/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 text-xs text-charcoal-500 max-w-2xl mx-auto">
            <ShieldAlert className="w-4 h-4 text-charcoal-400 shrink-0" />
            <span>
              <strong>Wellness Disclaimer:</strong> Mood-to-Move provides general wellness and physical mobility activities and is not a medical or mental-health diagnostic tool.
            </span>
          </div>
          <p className="text-xs text-charcoal-400 mt-3">
            © {new Date().getFullYear()} Mood-to-Move. Built for student wellness and desk resets.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
