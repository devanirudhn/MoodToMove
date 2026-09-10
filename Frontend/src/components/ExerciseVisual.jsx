import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

// Maps EVERY activity and EVERY step (1-4) to its EXACT matching pose demonstration
const getExactPoseImage = (slug, stepNumber = 1) => {
  const step = Math.min(Math.max(Number(stepNumber) || 1, 1), 4);

  // 1. Desk Stretch
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

  // 2. Neck Reset (Exact anatomical cervical poses)
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
          src: '/exercises/neck-reset-2.svg',
          title: 'Step 2: Chin to Chest Flexion',
          cue: 'Lower chin smoothly toward chest • Feel back of neck elongate.'
        };
      case 3:
        return {
          src: '/exercises/neck-reset-3.svg',
          title: 'Step 3: Gentle Throat Extension',
          cue: 'Tilt chin upward toward ceiling • Open throat without crunching neck.'
        };
      case 4:
      default:
        return {
          src: '/exercises/neck-reset-4.svg',
          title: 'Step 4: Smooth Half-Circle Rolls',
          cue: 'Draw slow half-circles with chin from shoulder to shoulder.'
        };
    }
  }

  // 3. Shoulder Release (Exact shoulder mobility poses)
  if (slug === 'shoulder-release') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/shoulder-release-1.svg',
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
          src: '/exercises/shoulder-release-3.svg',
          title: 'Step 3: Forward Shoulder Rolls',
          cue: 'Reverse direction: roll shoulders forward with relaxed breaths.'
        };
      case 4:
      default:
        return {
          src: '/exercises/shoulder-release-4.svg',
          title: 'Step 4: Clasp Hands Behind Back',
          cue: 'Clasp hands behind back, squeeze shoulder blades, and open chest.'
        };
    }
  }

  // 4. Posture Reset (Exact spinal alignment poses)
  if (slug === 'posture-reset') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/posture-reset-1.svg',
          title: 'Step 1: Cervical Spine Chin Tuck',
          cue: 'Tuck chin straight back horizontally to correct forward-head slouch.'
        };
      case 2:
        return {
          src: '/exercises/posture-reset-2.jpg',
          title: 'Step 2: 90° Cactus Arms Squeeze',
          cue: 'Bend elbows 90 degrees and squeeze shoulder blades firmly together.'
        };
      case 3:
        return {
          src: '/exercises/posture-reset-3.svg',
          title: 'Step 3: Overhead Y-Reach',
          cue: 'Reach arms into wide overhead Y while keeping shoulder blades down.'
        };
      case 4:
      default:
        return {
          src: '/exercises/posture-reset-4.svg',
          title: 'Step 4: Mountain Posture Alignment',
          cue: 'Lower arms to sides, roll shoulders back, feel tall aligned spine.'
        };
    }
  }

  // 5. Full Body Reset (Exact full-body poses including Forward Fold)
  if (slug === 'full-body-reset') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/full-body-reset-1.jpg',
          title: 'Step 1: Interlaced Upward Palm Stretch',
          cue: 'Interlace fingers, push palms to ceiling, and stretch entire spine.'
        };
      case 2:
        return {
          src: '/exercises/full-body-reset-2.svg',
          title: 'Step 2: Soft-Knee Forward Fold (Uttanasana)',
          cue: 'Hinge at hips with soft knees • Let head, neck, and arms hang loose.'
        };
      case 3:
        return {
          src: '/exercises/full-body-reset-3.svg',
          title: 'Step 3: Standing Hip Circles',
          cue: 'Place hands on hips and circle smoothly 5 times each direction.'
        };
      case 4:
      default:
        return {
          src: '/exercises/full-body-reset-4.svg',
          title: 'Step 4: Victorious Whole Body Reset',
          cue: 'Shake out hands and feet, breathe deeply, and finish refreshed.'
        };
    }
  }

  // 6. Standing Energizer
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
          src: '/exercises/standing-energizer-3.svg',
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

  // 7. Eye Break (Exact 20-20-20 and cupping poses)
  if (slug === 'eye-break') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/eye-break-1.svg',
          title: 'Step 1: 20-20-20 Distant Gaze',
          cue: 'Look away from screens and gaze at an object 20 feet away.'
        };
      case 2:
        return {
          src: '/exercises/eye-break-2.svg',
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
          title: 'Step 4: Serene Darkness Awakening',
          cue: 'Breathe in dark warmth, then open eyes feeling clear and alert.'
        };
    }
  }

  // 8. Mini Walk (Exact indoor walking stride poses)
  if (slug === 'mini-walk') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/mini-walk-1.jpg',
          title: 'Step 1: Relaxed Indoor Stride',
          cue: 'Begin walking around room or hallway at a relaxed, rhythmic tempo.'
        };
      case 2:
        return {
          src: '/exercises/mini-walk-2.jpg',
          title: 'Step 2: Brisk Cardiovascular Stride',
          cue: 'Pick up the pace slightly • Notice rhythmic foot contact on floor.'
        };
      case 3:
        return {
          src: '/exercises/mini-walk-3.svg',
          title: 'Step 3: Walking Arm & Shoulder Rolls',
          cue: 'Roll shoulders gently and breathe in steady sync with your steps.'
        };
      case 4:
      default:
        return {
          src: '/exercises/mini-walk-4.svg',
          title: 'Step 4: Mindful Deceleration & Deep Breath',
          cue: 'Slow down smoothly, take 3 deep breaths, and return revitalized.'
        };
    }
  }

  // 9. Focus Reset (Exact 5-4-3-2-1 Sensory Grounding poses)
  if (slug === 'focus-reset') {
    switch (step) {
      case 1:
        return {
          src: '/exercises/focus-reset-1.svg',
          title: 'Step 1: Visual Grounding (3 Objects)',
          cue: 'Look around and acknowledge 3 distinct colors or objects you can see.'
        };
      case 2:
        return {
          src: '/exercises/focus-reset-2.svg',
          title: 'Step 2: Tactile Grounding (2 Textures)',
          cue: 'Notice 2 physical textures: chair back support and feet grounded.'
        };
      case 3:
        return {
          src: '/exercises/focus-reset-3.svg',
          title: 'Step 3: Auditory Presence (1 Sound)',
          cue: 'Tune in closely to 1 subtle ambient sound in the room.'
        };
      case 4:
      default:
        return {
          src: '/exercises/focus-reset-4.svg',
          title: 'Step 4: Centering Diaphragmatic Breath',
          cue: 'Place hand over heart and take two deep diaphragmatic breaths.'
        };
    }
  }

  // 10. Box Breathing (Exact Lotus Pranayama breath stages)
  switch (step) {
    case 1:
      return {
        src: '/exercises/box-breathing-1.jpg',
        title: 'Step 1: Deep Nose Inhale (4s)',
        cue: 'Sit in lotus posture • Inhale deeply through nose, expanding belly.'
      };
    case 2:
      return {
        src: '/exercises/box-breathing-2.jpg',
        title: 'Step 2: Hold Breath Gently (4s)',
        cue: 'Pause with lungs comfortably full • Keep chest relaxed in stillness.'
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
            if (!e.target.src.endsWith(`${slug}.jpg`)) {
              e.target.src = `/exercises/${slug}.jpg`;
            } else {
              e.target.src = '/exercises/desk-stretch.jpg';
            }
          }}
          className={`w-full h-full object-contain p-2 transition-all duration-300 ${
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
