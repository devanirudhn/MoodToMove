import React, { useState } from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

// Maps EVERY activity and EVERY step (1-4) to its exact real high-res JPEG image on disk
const getExactPoseImage = (slug, stepNumber = 1) => {
  const step = Math.min(Math.max(Number(stepNumber) || 1, 1), 4);

  // 1. Desk Stretch (4 exact JPG images)
  if (slug === 'desk-stretch') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/desk-stretch-1.jpg',
          title: 'Step 1: Seated Spinal Twist',
          cue: 'Sit tall, rotate torso, look over shoulder with hand to opposite knee.'
        };
      case 2:
        return {
          src: '/exercises/desk-stretch-2.jpg',
          title: 'Step 2: Side Body Overhead Reach',
          cue: 'Reach arm high overhead and bend laterally to expand your ribs.'
        };
      case 3:
        return {
          src: '/exercises/desk-stretch-3.jpg',
          title: 'Step 3: Wrist & Forearm Flexor Stretch',
          cue: 'Extend arm straight forward at 90° and gently draw fingers back.'
        };
      case 4:
      default:
        return {
          src: '/exercises/desk-stretch-4.jpg',
          title: 'Step 4: Seated Cat-Cow Chest Opener',
          cue: 'Rest hands on knees, arch chest forward, and lift chin in a deep breath.'
        };
    }
  }

  // 2. Box Breathing (4 exact step JPG images)
  if (slug === 'box-breathing') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/box-breathing-1.jpg',
          title: 'Step 1: Deep Nose Inhale (4s)',
          cue: 'Inhale deeply through your nose, expanding lower belly with oxygen.'
        };
      case 2:
        return {
          src: '/exercises/box-breathing-2.jpg',
          title: 'Step 2: Hold Breath Gently (4s)',
          cue: 'Pause with lungs comfortably full • Keep chest relaxed and still.'
        };
      case 3:
        return {
          src: '/exercises/box-breathing-3.jpg',
          title: 'Step 3: Slow Mouth Exhale (4s)',
          cue: 'Release all air smoothly through mouth • Let shoulders drop down.'
        };
      case 4:
      default:
        return {
          src: '/exercises/box-breathing-4.jpg',
          title: 'Step 4: Hold Empty & Rest (4s)',
          cue: 'Pause in serene stillness before the next deep breath cycle.'
        };
    }
  }

  // 3. Shoulder Release (4 exact step JPG images)
  if (slug === 'shoulder-release') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/shoulder-release-1.jpg',
          title: 'Step 1: Shoulder Shrug to Ears',
          cue: 'Inhale deeply and shrug both shoulders straight up to ears.'
        };
      case 2:
        return {
          src: '/exercises/shoulder-release-2.jpg',
          title: 'Step 2: Backward Shoulder Rolls',
          cue: 'Slowly roll your shoulders backward in large, deliberate circles.'
        };
      case 3:
        return {
          src: '/exercises/shoulder-release-3.jpg',
          title: 'Step 3: Forward Shoulder Rolls',
          cue: 'Roll shoulders smoothly forward with relaxed rhythmic breaths.'
        };
      case 4:
      default:
        return {
          src: '/exercises/shoulder-release-4.jpg',
          title: 'Step 4: Chest Open & Hands Clasped',
          cue: 'Clasp hands behind chair, open chest broad, and release neck.'
        };
    }
  }

  // 4. Neck Reset (4 exact step JPG images)
  if (slug === 'neck-reset') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/neck-reset-1.jpg',
          title: 'Step 1: Lateral Neck Tilt (Right)',
          cue: 'Tilt right ear toward shoulder with hand resting softly on temple.'
        };
      case 2:
        return {
          src: '/exercises/neck-reset-2.jpg',
          title: 'Step 2: Lateral Neck Tilt (Left)',
          cue: 'Switch sides: tilt left ear smoothly toward left shoulder.'
        };
      case 3:
        return {
          src: '/exercises/neck-reset-3.jpg',
          title: 'Step 3: Chin to Chest Flexion',
          cue: 'Lower chin smoothly toward chest • Feel back of neck elongate.'
        };
      case 4:
      default:
        return {
          src: '/exercises/neck-reset-4.jpg',
          title: 'Step 4: Smooth Half-Circle Rolls',
          cue: 'Draw slow half-circles with chin from shoulder to shoulder.'
        };
    }
  }

  // 5. Posture Reset (4 exact step JPG images)
  if (slug === 'posture-reset') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/posture-reset-1.jpg',
          title: 'Step 1: Cervical Spine Chin Tuck',
          cue: 'Tuck chin straight back horizontally to correct forward slouch.'
        };
      case 2:
        return {
          src: '/exercises/posture-reset-2.jpg',
          title: 'Step 2: 90° Cactus Arms Squeeze',
          cue: 'Bend elbows 90 degrees and squeeze shoulder blades firmly together.'
        };
      case 3:
        return {
          src: '/exercises/posture-reset-3.jpg',
          title: 'Step 3: Overhead Y-Reach',
          cue: 'Reach arms into wide overhead Y while keeping shoulder blades down.'
        };
      case 4:
      default:
        return {
          src: '/exercises/posture-reset-4.jpg',
          title: 'Step 4: Tall Mountain Alignment',
          cue: 'Drop arms to sides • Feel tall, aligned spine from tailbone to crown.'
        };
    }
  }

  // 6. Standing Energizer (4 exact step JPG images)
  if (slug === 'standing-energizer') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/standing-energizer-1.jpg',
          title: 'Step 1: Rhythmic March in Place',
          cue: 'March in place with soft knees and arm swings to stimulate blood flow.'
        };
      case 2:
        return {
          src: '/exercises/standing-energizer-2.jpg',
          title: 'Step 2: Alternating High Knees',
          cue: 'Lift alternating knees toward hip level while breathing deeply.'
        };
      case 3:
        return {
          src: '/exercises/standing-energizer-3.jpg',
          title: 'Step 3: Shake Out Hands & Limbs',
          cue: 'Shake out hands, wrists, and feet to shed sedentary stiffness.'
        };
      case 4:
      default:
        return {
          src: '/exercises/standing-energizer-4.jpg',
          title: 'Step 4: Sky Reach & Strong Exhale',
          cue: 'Reach arms high to the sky, take giant breath, and release down.'
        };
    }
  }

  // 7. Full Body Reset (4 exact step JPG images)
  if (slug === 'full-body-reset') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/full-body-reset-1.jpg',
          title: 'Step 1: Interlaced Upward Palm Reach',
          cue: 'Interlace fingers, push palms to ceiling, and stretch entire spine.'
        };
      case 2:
        return {
          src: '/exercises/full-body-reset-2.jpg',
          title: 'Step 2: Gentle Soft-Knee Forward Fold',
          cue: 'Hinge at hips with soft knees • Let head, neck, and arms hang loose.'
        };
      case 3:
        return {
          src: '/exercises/full-body-reset-3.jpg',
          title: 'Step 3: Standing Hip Circles',
          cue: 'Circle hips 5 times clockwise, then 5 counterclockwise.'
        };
      case 4:
      default:
        return {
          src: '/exercises/full-body-reset-4.jpg',
          title: 'Step 4: Victorious Whole Body Reset',
          cue: 'Shake out hands and feet, breathe deeply, and finish refreshed.'
        };
    }
  }

  // 8. Eye Break (4 exact step JPG images)
  if (slug === 'eye-break') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/eye-break-1.jpg',
          title: 'Step 1: 20-20-20 Distant Gaze',
          cue: 'Look 20 feet away from your screen to relax accommodation muscles.'
        };
      case 2:
        return {
          src: '/exercises/eye-break-2.jpg',
          title: 'Step 2: Mindful Blinking Sequence',
          cue: 'Blink slowly and deliberately 10 times to naturally lubricate eyes.'
        };
      case 3:
        return {
          src: '/exercises/eye-break-3.jpg',
          title: 'Step 3: Warm Palm Rub & Eye Cupping',
          cue: 'Rub palms warm and cup them gently over closed eyes.'
        };
      case 4:
      default:
        return {
          src: '/exercises/eye-break-4.jpg',
          title: 'Step 4: Serene Darkness & Awakening',
          cue: 'Soak in the dark warmth and reopen your eyes feeling clear and alert.'
        };
    }
  }

  // 9. Mini Walk (4 exact step JPG images)
  if (slug === 'mini-walk') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/mini-walk-1.jpg',
          title: 'Step 1: Relaxed Indoor Stride',
          cue: 'Pace around room or corridor at a relaxed, rhythmic tempo.'
        };
      case 2:
        return {
          src: '/exercises/mini-walk-2.jpg',
          title: 'Step 2: Brisk Cardiovascular Stride',
          cue: 'Pace back across the room, feeling rhythmic foot contact on the floor.'
        };
      case 3:
        return {
          src: '/exercises/mini-walk-3.jpg',
          title: 'Step 3: Walking Arm & Shoulder Rolls',
          cue: 'Roll shoulders gently and breathe in steady sync with your steps.'
        };
      case 4:
      default:
        return {
          src: '/exercises/mini-walk-4.jpg',
          title: 'Step 4: Mindful Deceleration & Return',
          cue: 'Slow down smoothly, take 3 deep breaths, and return revitalized.'
        };
    }
  }

  // 10. Focus Reset (4 exact step JPG images)
  if (slug === 'focus-reset') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/focus-reset-1.jpg',
          title: 'Step 1: Visual Grounding (3 Objects)',
          cue: 'Look around and acknowledge 3 distinct colors or objects you can see.'
        };
      case 2:
        return {
          src: '/exercises/focus-reset-2.jpg',
          title: 'Step 2: Tactile Grounding (2 Textures)',
          cue: 'Notice 2 physical textures: chair back support and feet grounded.'
        };
      case 3:
        return {
          src: '/exercises/focus-reset-3.jpg',
          title: 'Step 3: Auditory Presence (1 Sound)',
          cue: 'Tune in closely to 1 subtle ambient sound in the room.'
        };
      case 4:
      default:
        return {
          src: '/exercises/focus-reset-4.jpg',
          title: 'Step 4: Centering Diaphragmatic Breath',
          cue: 'Take two grounding diaphragmatic breaths to anchor your focus.'
        };
    }
  }

  // Default fallback
  return {
    src: `/exercises/${slug}-${step}.jpg`,
    title: `Step ${step}: Guided Movement`,
    cue: 'Follow the posture carefully, breathing slowly and steadily.'
  };
};

export const ExerciseVisual = ({ activity, activeStepNumber = 1, className = '' }) => {
  const slug = activity?.slug || 'desk-stretch';
  const poseData = getExactPoseImage(slug, activeStepNumber);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Exact Posture Image Container */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-lavender-200 shadow-md bg-white flex items-center justify-center">
        <img
          key={`${slug}-step-${activeStepNumber}`}
          src={poseData.src}
          alt={poseData.title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            // High reliability fallback cascade: step image -> activity main image -> desk stretch
            if (!e.target.src.endsWith(`${slug}.jpg`)) {
              e.target.src = `/exercises/${slug}.jpg`;
            } else {
              e.target.src = '/exercises/desk-stretch.jpg';
            }
          }}
          className={`w-full h-full object-contain p-2 transition-all duration-500 ${
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-80 scale-95'
          }`}
        />

        {/* Top Step Badge */}
        <div className="absolute top-2.5 left-2.5 px-3 py-1 bg-white/95 backdrop-blur-md rounded-xl text-xs font-bold text-lavender-700 shadow-xs border border-lavender-200 flex items-center gap-1.5 z-10">
          <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
          <span>{poseData.title}</span>
        </div>

        {/* Step Indicator Dots */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-charcoal-200/80 shadow-xs z-10">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === Number(activeStepNumber) ? 'w-4 bg-lavender-600' : 'w-2 bg-charcoal-200'
              }`}
            />
          ))}
        </div>

        {/* Bottom Posture Instruction Cue */}
        <div className="absolute bottom-2 left-2 right-2 bg-charcoal-900/90 backdrop-blur-xs text-white text-xs font-medium py-2 px-3.5 rounded-xl text-center shadow-md z-10">
          {poseData.cue}
        </div>
      </div>
    </div>
  );
};

export default ExerciseVisual;
