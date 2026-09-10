import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { playCompletionChime } from '../utils/audio';
import ExerciseVisual from '../components/ExerciseVisual';
import { Play, Pause, RotateCcw, X, Zap, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export const TimerPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { demoMode, toggleDemoMode } = useAuth();

  const [activity, setActivity] = useState(location.state?.activity || null);
  const [beforeMood] = useState(location.state?.beforeMood || 2);
  const [beforeReason] = useState(location.state?.beforeReason || 'Studying too long');
  const [loading, setLoading] = useState(!activity);

  // Duration: 10s if demoMode, else 120s
  const totalDuration = demoMode ? 10 : 120;
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const [isRunning, setIsRunning] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);

  // Update total duration if demo mode toggled while at start
  useEffect(() => {
    setTimeLeft(demoMode ? 10 : 120);
    setIsRunning(true);
  }, [demoMode]);

  // Load activity if not passed via route state
  useEffect(() => {
    if (!activity) {
      const fetchActivity = async () => {
        try {
          const res = await api.activities.getById(id);
          if (res.success && res.activity) {
            setActivity(res.activity);
          }
        } catch (e) {
          navigate('/dashboard');
        } finally {
          setLoading(false);
        }
      };
      fetchActivity();
    }
  }, [id, activity, navigate]);

  // Timer interval countdown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, totalDuration, activity, beforeMood, beforeReason]);

  const handleComplete = () => {
    playCompletionChime();
    navigate('/completion', {
      state: {
        activity,
        beforeMood,
        beforeReason,
        durationSeconds: totalDuration
      }
    });
  };

  const handleRestart = () => {
    setTimeLeft(totalDuration);
    setIsRunning(true);
  };

  const handleFinishEarlyClick = () => {
    setIsRunning(false);
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    navigate('/dashboard');
  };

  const handleResumeFromModal = () => {
    setShowExitModal(false);
    setIsRunning(true);
  };

  // Format mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Current progress ratio (0 to 1)
  const elapsed = totalDuration - timeLeft;
  const progress = totalDuration > 0 ? elapsed / totalDuration : 0;

  // Determine current active instruction step
  const getActiveInstruction = () => {
    if (!activity?.instructions || activity.instructions.length === 0) {
      return { stepNumber: 1, text: 'Take slow, mindful breaths and relax your posture.' };
    }

    // In demo mode (10s), scale the elapsed time to 120s scale
    const scaledElapsed = demoMode ? (elapsed / totalDuration) * 120 : elapsed;

    const step = activity.instructions.find(
      (s) => scaledElapsed >= s.startSecond && scaledElapsed < s.endSecond
    );

    return step || activity.instructions[activity.instructions.length - 1];
  };

  const activeStep = getActiveInstruction();
  const activeStepNum = activeStep?.stepNumber || 1;

  if (loading || !activity) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-cream-50">
        <LoadingSpinner message="Initializing 2-minute reset..." />
      </div>
    );
  }

  // SVG Circular progress math
  const size = 240;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-cream-50 via-white to-lavender-50/40 flex flex-col justify-between py-6 px-4 sm:px-6">
      {/* Top Bar: Activity Info + Demo Mode Switch */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between pb-4 border-b border-charcoal-200/60">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-lavender-100 text-lavender-700 font-bold text-xs">
            {activity.category}
          </span>
          <h2 className="text-base sm:text-lg font-black text-charcoal-900 truncate">
            {activity.name}
          </h2>
        </div>

        {/* Demo Mode Toggle for Judges */}
        <button
          onClick={toggleDemoMode}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            demoMode
              ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
              : 'bg-white text-charcoal-600 border-charcoal-200 hover:bg-cream-50'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${demoMode ? 'text-amber-600 fill-amber-500 animate-pulse' : 'text-charcoal-400'}`} />
          <span>{demoMode ? 'Demo Mode: 10s' : 'Standard: 120s'}</span>
        </button>
      </div>

      {/* Main Interactive Stage: Exercise Visual Image + Circular Countdown Timer */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
        {/* Left Column: Visual Exercise / Yoga Position Illustration */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border border-charcoal-200/80 shadow-md">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
                Exercise Position Guide
              </span>
              <span className="text-xs font-bold text-lavender-700 bg-lavender-50 px-2.5 py-0.5 rounded-full border border-lavender-100">
                Step {activeStepNum} of 4
              </span>
            </div>

            {/* Dynamic Exercise Visual Component */}
            <ExerciseVisual activity={activity} activeStepNumber={activeStepNum} />

            <div className="mt-3 text-center">
              <p className="text-xs font-medium text-charcoal-500">
                Align your body with the posture shown above.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Timer Ring + Live Step Instruction + Controls */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center mb-4">
            <svg width={size} height={size} className="transform -rotate-90">
              {/* Background track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#EDE9FE"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Progress Stroke */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#7C3AED"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>

            {/* Center Text */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black text-charcoal-900 tracking-tight font-mono">
                {formatTime(timeLeft)}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-lavender-600 mt-1">
                {isRunning ? 'Mindful Movement' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Current Dynamic Step Box */}
          <div className="w-full max-w-sm p-4 rounded-2xl bg-white border border-charcoal-200 shadow-xs text-center mb-4">
            <p className="text-sm font-extrabold text-charcoal-900 leading-snug">
              {activeStep?.text}
            </p>
          </div>

          {/* Timer Controls: Restart, Play/Pause, Finish Early */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              title="Restart timer"
              className="p-3 rounded-2xl bg-white hover:bg-cream-100 border border-charcoal-200 text-charcoal-700 shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-8 py-3.5 rounded-2xl bg-lavender-600 hover:bg-lavender-700 text-white font-extrabold text-sm shadow-md shadow-lavender-600/30 transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Resume</span>
                </>
              )}
            </button>

            <button
              onClick={handleFinishEarlyClick}
              title="Finish or exit early"
              className="p-3 rounded-2xl bg-white hover:bg-red-50 border border-charcoal-200 text-charcoal-500 hover:text-red-600 shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Exit Early Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-charcoal-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-charcoal-900 mb-2">Are you sure you want to leave?</h3>
            <p className="text-xs text-charcoal-600 leading-relaxed mb-6">
              Your reset session will not be recorded if you exit before the timer completes.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleResumeFromModal}
                className="w-full py-3 bg-lavender-600 hover:bg-lavender-700 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
              >
                Continue Activity
              </button>
              <button
                onClick={handleConfirmExit}
                className="w-full py-2.5 bg-transparent hover:bg-charcoal-50 text-charcoal-600 font-semibold rounded-xl text-xs transition-all cursor-pointer"
              >
                Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerPage;
