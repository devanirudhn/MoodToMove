import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Activity from './models/Activity.js';
import User from './models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mood_to_move';

export const activities = [
  {
    name: 'Box Breathing',
    slug: 'box-breathing',
    category: 'Breathing',
    description: 'A calming 4x4 breathing technique used to slow down heart rate, reduce physical stress, and calm an overactive mind.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Very Low', 'Low', 'Feeling stressed', 'Can\'t focus'],
    benefits: ['Lowers stress response', 'Steadies heart rate', 'Restores nervous system calm'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Find a comfortable seated position with a tall spine. Inhale deeply through your nose for 4 counts.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Hold your breath gently for 4 counts without straining or tensing your chest.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Exhale slowly and completely through your mouth for 4 counts, letting tension drain away.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Hold empty for 4 counts. Continue this square rhythm smoothly until the timer concludes.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: 'Shoulder Release',
    slug: 'shoulder-release',
    category: 'Stretch',
    description: 'Release tension and knots accumulated in your trapezius and shoulder girdle from hours of keyboard and desk posture.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Very Low', 'Low', 'Studying too long', 'Feeling tired'],
    benefits: ['Relieves upper back tightness', 'Restores shoulder mobility', 'Promotes blood circulation'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Sit tall with feet flat. Inhale deeply and shrug your shoulders up toward your ears.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Slowly roll your shoulders backward in large, deliberate, fluid circles.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Reverse direction: roll your shoulders forward gently while taking slow, relaxed breaths.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Drop shoulders down away from ears. Clasp hands behind back and gently open your chest.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: 'Neck Reset',
    slug: 'neck-reset',
    category: 'Mobility',
    description: 'Target desk neck stiffness and tension headaches caused by looking down at screens and textbooks.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Low', 'Okay', 'Sitting too long', 'Studying too long'],
    benefits: ['Decreases cervical spine strain', 'Relieves tension headaches', 'Improves neck range of motion'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Sit straight. Gently tilt right ear toward right shoulder. Hold for 15 seconds, then switch to the left.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Slowly lower your chin toward your chest. Breathe deeply into the back of your neck.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Tilt chin up slightly toward the ceiling, gently opening your throat without crunching the neck.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Draw slow half-circles with your chin from shoulder to shoulder, releasing any remaining stiffness.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: 'Posture Reset',
    slug: 'posture-reset',
    category: 'Posture',
    description: 'Realign your spine, open collapsed chest muscles, and engage postural stabilizers after hours of slouching.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Okay', 'Sitting too long', 'Can\'t focus', 'Just need a break'],
    benefits: ['Expands lung breathing room', 'Counters forward-head slouch', 'Restores spinal alignment'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Stand or sit upright. Tuck your chin back slightly as if making a double chin to align cervical vertebrae.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Bend elbows to 90 degrees in a cactus position and squeeze your shoulder blades firmly together.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Slowly reach your arms overhead while maintaining shoulder blades pulled down and back.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Lower arms to sides, roll shoulders back, and take 3 deep belly breaths feeling your tall posture.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: 'Eye Break',
    slug: 'eye-break',
    category: 'Focus',
    description: 'The 20-20-20 visual reset to soothe digital eye strain, prevent dry eyes, and alleviate mental screen fatigue.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Okay', 'Studying too long', 'Feeling tired', 'Can\'t focus'],
    benefits: ['Relaxes eye focusing muscles', 'Combats screen-induced headaches', 'Sharpens vision clarity'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Look away from all screens. Gaze at an object at least 20 feet away to relax accommodation muscles.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Blink slowly and deliberately 10 times to naturally lubricate and refresh your eyes.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Rub your palms together briskly to generate warmth, then cup hands gently over closed eyes.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Breathe in the darkness under warm palms. Slowly open your eyes feeling fresh and alert.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: 'Standing Energizer',
    slug: 'standing-energizer',
    category: 'Energy',
    description: 'A light rhythmic full-body wake-up to shake off midday grogginess and send fresh oxygen to your brain.',
    durationSeconds: 120,
    difficulty: 'Medium',
    suitableFor: ['Low', 'Feeling tired', 'Feeling bored', 'Good'],
    benefits: ['Spikes blood circulation', 'Dispels physical lethargy', 'Boosts dopamine and alertness'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Stand up from your desk. March briskly in place with soft knees and rhythmic arm swings.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Gentle high knees: lift alternating knees toward hip height while breathing deeply.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Shake out your hands, wrists, and feet to release stagnant tension from sitting.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Reach both arms high to the sky, take a deep breath in, and release down with a strong exhale.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: '2-Minute Desk Stretch',
    slug: 'desk-stretch',
    category: 'Stretch',
    description: 'Designed specifically for students seated at desks: stretches wrists, hips, side body, and lumbar spine.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Low', 'Studying too long', 'Sitting too long', 'Very Low'],
    benefits: ['Relieves lower back tightness', 'Releases typing strain from wrists', 'Decompresses tight hip flexors'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Seated Spinal Twist: Place right hand on left knee, gently look over left shoulder for 15s. Switch sides.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Side Body Reach: Extend right arm overhead, leaning gently to the left. Switch and stretch the right side.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Wrist Flexor Stretch: Extend arm forward with palm facing out, gently draw fingers back for 15s each arm.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Seated Cat-Cow: Round back exhaling, then arch chest forward inhaling deeply. Feel your spine decompress.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: '2-Minute Focus Reset',
    slug: 'focus-reset',
    category: 'Focus',
    description: 'A grounding 5-4-3-2-1 micro-sensory pause that stops thought spirals and anchors your mental presence.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Okay', 'Can\'t focus', 'Feeling stressed', 'Feeling bored'],
    benefits: ['Silences internal distractions', 'Grounds emotional reactivity', 'Restores sustained concentration'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Take a deep breath. Look around and acknowledge 3 distinct colors or objects you can see right now.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Notice 2 physical textures you can feel: your chair back support and feet grounded on the floor.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Tune in closely to 1 subtle ambient sound in your room or background.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Take two deep diaphragmatic breaths. Re-anchor your calm intention for your next study block.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: 'Mini Walk',
    slug: 'mini-walk',
    category: 'Movement',
    description: 'Two minutes of continuous walking around your study space or hallway to kickstart cardiovascular return.',
    durationSeconds: 120,
    difficulty: 'Easy',
    suitableFor: ['Low', 'Good', 'Sitting too long', 'Feeling bored'],
    benefits: ['Activates calf venous pump', 'Clears mental fog', 'Breaks prolonged sedentary state'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Stand up and step away from screens. Begin walking around your room or hallway at a relaxed pace.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Pick up the pace slightly. Notice the rhythmic contact of your feet on the floor.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Roll wrists and shoulders gently as you walk, synchronizing your breath with your stride.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Slow down smoothly, take 3 mindful deep breaths, and return to your desk feeling clear and revitalized.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  },
  {
    name: 'Full Body Reset',
    slug: 'full-body-reset',
    category: 'Movement',
    description: 'A complete head-to-toe mobility sequence to release whole-body stiffness and recharge your physical energy.',
    durationSeconds: 120,
    difficulty: 'Medium',
    suitableFor: ['Great', 'Good', 'Just need a break', 'Sitting too long'],
    benefits: ['Mobilizes all major joints', 'Enhances whole-body flexibility', 'Delivers an instant mood boost'],
    instructions: [
      {
        stepNumber: 1,
        text: 'Stand with feet shoulder-width. Interlace fingers and push palms upward toward ceiling, stretching tall.',
        startSecond: 0,
        endSecond: 30
      },
      {
        stepNumber: 2,
        text: 'Hinge at your hips with soft knees into a gentle forward fold. Let head and neck hang completely loose.',
        startSecond: 30,
        endSecond: 60
      },
      {
        stepNumber: 3,
        text: 'Roll up slowly vertebrae by vertebrae. Do 5 gentle hip circles clockwise, then 5 counterclockwise.',
        startSecond: 60,
        endSecond: 90
      },
      {
        stepNumber: 4,
        text: 'Shake out hands and feet, take a victorious deep breath, and finish your reset energized.',
        startSecond: 90,
        endSecond: 120
      }
    ]
  }
];

export async function ensureActivitiesSeeded() {
  try {
    const count = await Activity.countDocuments();
    if (count < activities.length) {
      console.log(`[Seed] Found ${count} activities. Seeding all ${activities.length} activities...`);
      for (const act of activities) {
        await Activity.findOneAndUpdate({ slug: act.slug }, act, { upsert: true, new: true });
      }
      console.log(`[Seed] Successfully verified ${activities.length} activities.`);
    }
  } catch (error) {
    console.error('[Seed Error]:', error.message);
  }
}

async function seedDatabase() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected to MongoDB.');

    // 1. Seed Activities (Upsert based on slug so re-running is safe)
    console.log('[Seed] Seeding 10 activities...');
    for (const act of activities) {
      await Activity.findOneAndUpdate({ slug: act.slug }, act, { upsert: true, new: true });
    }
    console.log(`[Seed] Successfully seeded ${activities.length} activities.`);

    // 2. Seed/Ensure Default Demo User
    const demoEmail = 'demo@example.com';
    const existingDemo = await User.findOne({ email: demoEmail });
    if (!existingDemo) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('Demo123!', salt);
      await User.create({
        name: 'Demo Student',
        email: demoEmail,
        passwordHash,
        focusAreas: ['Better focus', 'Stress relief'],
        breakDuration: 2,
        onboardingCompleted: true
      });
      console.log('[Seed] Created default demo user: demo@example.com / Demo123!');
    } else {
      console.log('[Seed] Demo user already exists.');
    }

    console.log('[Seed] Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}
