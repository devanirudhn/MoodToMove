import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Sparkles, Clock, BarChart2, CheckCircle2, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ExerciseVisual from '../components/ExerciseVisual';

export const ActivityDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(location.state?.activity || null);
  const [rationale, setRationale] = useState(
    location.state?.recommendationReason ||
      "A quick 2-minute reset tailored to release physical tension and recharge your mind."
  );
  const [beforeMood] = useState(location.state?.beforeMood || 2);
  const [beforeReason] = useState(location.state?.beforeReason || 'Studying too long');
  const [loading, setLoading] = useState(!activity);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!activity) {
      const fetchActivity = async () => {
        try {
          setLoading(true);
          const res = await api.activities.getById(id);
          if (res.success && res.activity) {
            setActivity(res.activity);
          } else {
            setError('Activity not found.');
          }
        } catch (err) {
          setError(err.message || 'Unable to load activity details.');
        } finally {
          setLoading(false);
        }
      };
      fetchActivity();
    }
  }, [id, activity]);

  const handleStartTimer = () => {
    navigate(`/timer/${activity._id}`, {
      state: {
        activity,
        beforeMood,
        beforeReason
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-cream-50">
        <LoadingSpinner message="Preparing your recommended reset..." />
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="text-red-600 font-semibold mb-4">{error || 'Activity not found.'}</p>
        <Link to="/dashboard" className="text-sm font-bold text-lavender-600 underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <Link
          to="/mood-check"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-charcoal-500 hover:text-charcoal-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mood Check
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-charcoal-200/80 shadow-xl shadow-charcoal-900/5">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-700 text-xs font-bold uppercase tracking-wider">
            {activity.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-cream-100 text-charcoal-600 text-xs font-semibold flex items-center gap-1 border border-charcoal-200/60">
            <Clock className="w-3.5 h-3.5 text-charcoal-500" />
            2 Minutes
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1 border border-emerald-200/60">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-600" />
            {activity.difficulty}
          </span>
        </div>

        {/* Activity Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900 tracking-tight mb-3">
          {activity.name}
        </h1>

        <p className="text-base text-charcoal-600 leading-relaxed mb-8">
          {activity.description}
        </p>

        {/* "Why This?" Rationale Card */}
        <div className="p-6 rounded-2xl bg-lavender-50/70 border border-lavender-200/80 mb-8">
          <div className="flex items-center gap-2 text-lavender-800 font-bold text-sm mb-2">
            <Sparkles className="w-4 h-4 text-lavender-600" />
            <span>Why this reset?</span>
          </div>
          <p className="text-sm text-charcoal-700 leading-relaxed italic">
            "{rationale}"
          </p>
        </div>

        {/* Visual Exercise Position Preview */}
        <div className="mb-8 p-4 rounded-3xl bg-cream-50/70 border border-charcoal-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
              Exercise Position Preview
            </span>
            <span className="text-xs font-semibold text-lavender-700 bg-lavender-50 px-2.5 py-0.5 rounded-full border border-lavender-100">
              Guidance
            </span>
          </div>
          <ExerciseVisual activity={activity} activeStepNumber={1} />
        </div>

        {/* Step-by-Step Preview */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal-500 mb-4 flex items-center justify-between">
            <span>What you'll do (4 timed posture stages)</span>
            <span className="text-xs font-semibold text-lavender-700 bg-lavender-50 px-2.5 py-0.5 rounded-full border border-lavender-200">
              Visual Guide
            </span>
          </h3>

          <div className="space-y-3">
            {activity.instructions?.map((step, idx) => {
              const stepNum = step.stepNumber || idx + 1;
              return (
                <div
                  key={stepNum}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-cream-50/80 border border-charcoal-200/80 hover:border-lavender-300 transition-all shadow-xs"
                >
                  {/* Posture Step Image Thumbnail */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-lavender-200 bg-white shrink-0 shadow-2xs flex items-center justify-center">
                    <img
                      src={`/exercises/${activity.slug}-${stepNum}.svg`}
                      alt={`Step ${stepNum} posture`}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        if (e.target.src.endsWith('.svg')) {
                          e.target.src = `/exercises/${activity.slug}-${stepNum}.jpg`;
                        } else {
                          e.target.src = `/exercises/${activity.slug}.jpg`;
                        }
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-lavender-800 bg-lavender-100/80 px-2 py-0.5 rounded-md">
                        Stage {stepNum}
                      </span>
                      <span className="text-[11px] font-bold text-charcoal-500 font-mono">
                        {step.startSecond}s – {step.endSecond}s
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed font-medium">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Chips */}
        {activity.benefits?.length > 0 && (
          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
              Expected benefits
            </h4>
            <div className="flex flex-wrap gap-2">
              {activity.benefits.map((benefit, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-mint-50 text-mint-800 text-xs font-medium border border-mint-200/80"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-600 shrink-0" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Primary CTA */}
        <button
          onClick={handleStartTimer}
          className="w-full py-4 px-6 bg-lavender-600 hover:bg-lavender-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-lavender-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Start 2-Minute Reset</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
