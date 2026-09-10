import Activity from '../models/Activity.js';
import { ensureActivitiesSeeded } from '../seed.js';

export const getRecommendation = async (req, res, next) => {
  try {
    const rawMood = req.body?.mood !== undefined ? req.body.mood : req.query?.mood;
    const rawReason = req.body?.reason !== undefined ? req.body.reason : req.query?.reason;
    const preferences = req.body?.preferences || [];

    const moodScore = Number(rawMood || 3);
    if (!moodScore || moodScore < 1 || moodScore > 5) {
      return res.status(400).json({
        success: false,
        message: 'A valid mood score between 1 and 5 is required.'
      });
    }

    const lowerReason = (rawReason || '').toLowerCase();
    let allActivities = await Activity.find({ active: true });

    if (!allActivities.length) {
      await ensureActivitiesSeeded();
      allActivities = await Activity.find({ active: true });
    }

    if (!allActivities.length) {
      return res.status(404).json({
        success: false,
        message: 'No activities available.'
      });
    }

    const findBySlug = (slug) => allActivities.find((a) => a.slug === slug);
    const findByCategory = (cat) => allActivities.find((a) => a.category === cat);

    let chosenActivity = null;
    let rationale = '';

    // Deterministic Rule Engine
    if (moodScore === 1) {
      // Mood 1: Very Low
      if (lowerReason.includes('stress') || lowerReason.includes('anxi') || lowerReason.includes('overwhelm')) {
        chosenActivity = findBySlug('box-breathing') || findBySlug('shoulder-release');
        rationale = 'You are feeling quite stressed right now. A guided 2-minute box breathing exercise will slow down your heart rate and reset your nervous system.';
      } else {
        chosenActivity = findBySlug('shoulder-release') || findBySlug('box-breathing');
        rationale = 'When energy and mood are very low, gently releasing shoulder tension helps ease your body without requiring demanding effort.';
      }
    } else if (moodScore === 2) {
      // Mood 2: Low
      if (lowerReason.includes('study') || lowerReason.includes('studying too long')) {
        chosenActivity = findBySlug('desk-stretch') || findBySlug('shoulder-release');
        rationale = "You selected Low mood and noted that you've been studying for a while. This short desk stretch releases built-up physical tension so you can reset comfortably.";
      } else if (lowerReason.includes('tired') || lowerReason.includes('sleepy') || lowerReason.includes('drained')) {
        chosenActivity = findBySlug('standing-energizer') || findBySlug('mini-walk');
        rationale = 'Feeling fatigued calls for gentle circulation. A quick standing energizer brings oxygen to your muscles and gives your brain a boost.';
      } else if (lowerReason.includes('stress')) {
        chosenActivity = findBySlug('box-breathing') || findBySlug('shoulder-release');
        rationale = 'Stress takes a physical toll on your body. A 2-minute breathing cycle will help ease tightness and restore mental calm.';
      } else {
        chosenActivity = findBySlug('desk-stretch') || findBySlug('neck-reset');
        rationale = 'A light 2-minute stretch is the perfect gentle bridge to lift your mood from low to balanced.';
      }
    } else if (moodScore === 3) {
      // Mood 3: Okay
      if (lowerReason.includes('focus') || lowerReason.includes('distract') || lowerReason.includes("can't focus")) {
        chosenActivity = findBySlug('focus-reset') || findBySlug('eye-break');
        rationale = 'Feeling scattered or distracted? This 2-minute sensory focus reset centers your attention so you can dive back in cleanly.';
      } else if (lowerReason.includes('sit') || lowerReason.includes('sitting') || lowerReason.includes('desk')) {
        chosenActivity = findBySlug('posture-reset') || findBySlug('eye-break');
        rationale = 'Sitting for hours strains your spine and posture. Taking 2 minutes to realign your shoulders and spine makes an immediate difference.';
      } else if (lowerReason.includes('eye') || lowerReason.includes('screen')) {
        chosenActivity = findBySlug('eye-break') || findBySlug('focus-reset');
        rationale = 'Digital eye fatigue affects your alertness. The 20-20-20 eye break relaxes your visual accommodation muscles.';
      } else {
        chosenActivity = findBySlug('posture-reset') || findBySlug('focus-reset');
        rationale = 'A posture realignment helps counter midday fatigue and refreshes your breathing capacity.';
      }
    } else if (moodScore === 4) {
      // Mood 4: Good
      if (lowerReason.includes('sit') || lowerReason.includes('break')) {
        chosenActivity = findBySlug('mini-walk') || findBySlug('desk-stretch');
        rationale = "You are in good spirits! Channel that positive momentum with a brisk 2-minute movement break to keep your blood flowing.";
      } else {
        chosenActivity = findBySlug('standing-energizer') || findBySlug('mini-walk') || findBySlug('desk-stretch');
        rationale = "You're feeling good! A dynamic physical stretch helps sustain this high energy state through the rest of your session.";
      }
    } else if (moodScore === 5) {
      // Mood 5: Great
      chosenActivity = findBySlug('full-body-reset') || findBySlug('standing-energizer');
      rationale = "You feel great! A full-body mobility flow amplifies your positive energy and leaves you feeling completely refreshed.";
    }

    // Fallback: Preference-based or category matching
    if (!chosenActivity) {
      if (preferences.includes('Stress relief') || preferences.includes('Relaxation')) {
        chosenActivity = findByCategory('Breathing') || findByCategory('Stretch');
      } else if (preferences.includes('Better focus')) {
        chosenActivity = findByCategory('Focus');
      } else if (preferences.includes('More energy')) {
        chosenActivity = findByCategory('Energy') || findByCategory('Movement');
      } else if (preferences.includes('Better posture')) {
        chosenActivity = findByCategory('Posture');
      }
    }

    // Guarantee non-null
    if (!chosenActivity) {
      chosenActivity = allActivities[0];
      rationale = 'A universal 2-minute reset designed to help you pause, breathe, and feel refreshed.';
    }

    return res.status(200).json({
      success: true,
      activity: chosenActivity,
      reason: rationale,
      duration: chosenActivity.durationSeconds || 120,
      instructions: chosenActivity.instructions || [],
      category: chosenActivity.category
    });
  } catch (error) {
    next(error);
  }
};
