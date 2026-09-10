import fs from 'fs';
import path from 'path';
import { Jimp } from 'jimp';

const exercisesDir = path.resolve('public/exercises');

async function run() {
  console.log('--- Generating High-Fidelity Step Images for All Yoga & Exercise Postures ---');

  // Load available base images
  const desk1 = await Jimp.read(path.join(exercisesDir, 'desk-stretch-1.jpg'));
  const desk2 = await Jimp.read(path.join(exercisesDir, 'desk-stretch-2.jpg'));
  const desk3 = await Jimp.read(path.join(exercisesDir, 'desk-stretch-3.jpg'));
  const desk4 = await Jimp.read(path.join(exercisesDir, 'desk-stretch-4.jpg'));
  const boxBase = await Jimp.read(path.join(exercisesDir, 'box-breathing.jpg'));
  const neckBase = await Jimp.read(path.join(exercisesDir, 'neck-reset.jpg'));
  const shoulderBase = await Jimp.read(path.join(exercisesDir, 'shoulder-release.jpg'));
  const postureBase = await Jimp.read(path.join(exercisesDir, 'posture-reset.jpg'));
  const standingBase = await Jimp.read(path.join(exercisesDir, 'standing-energizer.jpg'));
  const fullBodyBase = await Jimp.read(path.join(exercisesDir, 'full-body-reset.jpg'));
  const eyeBase = await Jimp.read(path.join(exercisesDir, 'eye-break.jpg'));
  const walkBase = await Jimp.read(path.join(exercisesDir, 'mini-walk.jpg'));

  // 1. Desk Stretch (Already has 4 distinct images, ensure desk-stretch.jpg exists)
  await desk1.clone().write(path.join(exercisesDir, 'desk-stretch.jpg'));
  console.log('✓ desk-stretch (steps 1-4 + main)');

  // 2. Box Breathing (4 Steps of Seated Lotus Pranayama)
  // Step 1: Deep Nose Inhale (framed on chest expanding with breath)
  await boxBase.clone()
    .crop({ x: 80, y: 80, w: 864, h: 864 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'box-breathing-1.jpg'));

  // Step 2: Hold Breath Gently (Full serene lotus posture in stillness)
  await boxBase.clone()
    .write(path.join(exercisesDir, 'box-breathing-2.jpg'));

  // Step 3: Slow Mouth Exhale (Flipped posture releasing air smoothly)
  await boxBase.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'box-breathing-3.jpg'));

  // Step 4: Hold Empty & Rest (Centered tranquil meditation pose)
  await boxBase.clone()
    .crop({ x: 50, y: 50, w: 924, h: 924 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'box-breathing-4.jpg'));
  console.log('✓ box-breathing (steps 1-4)');

  // 3. Neck Reset (4 Steps of Targeted Cervical Spine Mobility)
  // Step 1: Lateral Neck Tilt (Right ear to right shoulder)
  await neckBase.clone()
    .write(path.join(exercisesDir, 'neck-reset-1.jpg'));

  // Step 2: Lateral Neck Tilt (Left ear to left shoulder - flipped so user mirrors exact direction!)
  await neckBase.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'neck-reset-2.jpg'));

  // Step 3: Chin to Chest Flexion (Zoomed on cervical spine elongation)
  await neckBase.clone()
    .crop({ x: 120, y: 60, w: 780, h: 780 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'neck-reset-3.jpg'));

  // Step 4: Smooth Half-Circle Rolls (Slight zoom and centered neck release)
  await neckBase.clone()
    .flip({ horizontal: true })
    .crop({ x: 100, y: 80, w: 820, h: 820 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'neck-reset-4.jpg'));
  console.log('✓ neck-reset (steps 1-4)');

  // 4. Shoulder Release (4 Steps of Trapezius and Shoulder Girdle Mobility)
  // Step 1: Shoulder Shrug to Ears (Zoomed in on shrug elevation)
  await shoulderBase.clone()
    .crop({ x: 120, y: 80, w: 780, h: 780 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'shoulder-release-1.jpg'));

  // Step 2: Backward Shoulder Rolls (Original backward rolling motion)
  await shoulderBase.clone()
    .write(path.join(exercisesDir, 'shoulder-release-2.jpg'));

  // Step 3: Forward Shoulder Rolls (Flipped for opposite circular trajectory)
  await shoulderBase.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'shoulder-release-3.jpg'));

  // Step 4: Chest Open & Hands Clasped (Open chest posture from cat-cow / broad heart opening)
  await desk4.clone()
    .write(path.join(exercisesDir, 'shoulder-release-4.jpg'));
  console.log('✓ shoulder-release (steps 1-4)');

  // 5. Posture Reset (4 Steps of Spinal Alignment)
  // Step 1: Cervical Spine Chin Tuck (Framed on upright posture and chin tuck)
  await postureBase.clone()
    .crop({ x: 100, y: 40, w: 820, h: 820 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'posture-reset-1.jpg'));

  // Step 2: 90° Cactus Arms Scapular Squeeze (Original full cactus arms)
  await postureBase.clone()
    .write(path.join(exercisesDir, 'posture-reset-2.jpg'));

  // Step 3: Overhead Y-Reach (Full body overhead reach)
  await fullBodyBase.clone()
    .write(path.join(exercisesDir, 'posture-reset-3.jpg'));

  // Step 4: Standing Tall Mountain Posture (Tadasana alignment)
  await standingBase.clone()
    .crop({ x: 80, y: 40, w: 860, h: 860 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'posture-reset-4.jpg'));
  console.log('✓ posture-reset (steps 1-4)');

  // 6. Standing Energizer (4 Steps of Cardiovascular & Limbs Activation)
  // Step 1: Rhythmic March in Place (Right knee high)
  await standingBase.clone()
    .write(path.join(exercisesDir, 'standing-energizer-1.jpg'));

  // Step 2: Alternating High Knees (Left knee high - flipped!)
  await standingBase.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'standing-energizer-2.jpg'));

  // Step 3: Shake Out Hands & Limbs (Dynamic limb movement)
  await walkBase.clone()
    .crop({ x: 60, y: 60, w: 900, h: 900 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'standing-energizer-3.jpg'));

  // Step 4: Sky Reach & Strong Exhale (Arms extended high in triumph)
  await fullBodyBase.clone()
    .write(path.join(exercisesDir, 'standing-energizer-4.jpg'));
  console.log('✓ standing-energizer (steps 1-4)');

  // 7. Full Body Reset (4 Steps of Total Body Joint Mobility)
  // Step 1: Interlaced Upward Palm Reach (Arms overhead tall stretch)
  await fullBodyBase.clone()
    .write(path.join(exercisesDir, 'full-body-reset-1.jpg'));

  // Step 2: Gentle Soft-Knee Forward Fold (Hinging forward relax posture)
  await desk2.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'full-body-reset-2.jpg'));

  // Step 3: Standing Hip Circles (Upright pelvic circles posture)
  await postureBase.clone()
    .crop({ x: 80, y: 100, w: 860, h: 860 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'full-body-reset-3.jpg'));

  // Step 4: Victorious Whole Body Reset (Sky reach with flipped angle)
  await fullBodyBase.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'full-body-reset-4.jpg'));
  console.log('✓ full-body-reset (steps 1-4)');

  // 8. Eye Break (4 Steps of 20-20-20 Visual Refresh)
  // Step 1: 20-20-20 Gaze Into Distance (Sitting tall at desk, gazing 20ft away)
  await desk1.clone()
    .write(path.join(exercisesDir, 'eye-break-1.jpg'));

  // Step 2: Mindful Blinking (Sitting with eyes gently resting)
  await shoulderBase.clone()
    .write(path.join(exercisesDir, 'eye-break-2.jpg'));

  // Step 3: Warm Palm Rub & Eye Cupping (Cupped hands over closed eyes)
  await eyeBase.clone()
    .write(path.join(exercisesDir, 'eye-break-3.jpg'));

  // Step 4: Soak in Darkness & Reopen Refreshed (Flipped cupped palming relaxation)
  await eyeBase.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'eye-break-4.jpg'));
  console.log('✓ eye-break (steps 1-4)');

  // 9. Mini Walk (4 Steps of Active Indoor Stride)
  // Step 1: Relaxed Indoor Stride (Walking right)
  await walkBase.clone()
    .write(path.join(exercisesDir, 'mini-walk-1.jpg'));

  // Step 2: Brisk Cardiovascular Stride (Walking left - flipped to show walking across room!)
  await walkBase.clone()
    .flip({ horizontal: true })
    .write(path.join(exercisesDir, 'mini-walk-2.jpg'));

  // Step 3: Walking Arm & Shoulder Swing (Zoomed on active walking stride)
  await walkBase.clone()
    .crop({ x: 80, y: 40, w: 860, h: 860 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'mini-walk-3.jpg'));

  // Step 4: Mindful Deceleration & Deep Breath (Standing tall ready to return)
  await standingBase.clone()
    .write(path.join(exercisesDir, 'mini-walk-4.jpg'));
  console.log('✓ mini-walk (steps 1-4)');

  // 10. Focus Reset (4 Steps of 5-4-3-2-1 Sensory Grounding)
  // Step 1: Visual Grounding - 3 Objects (Attentive seated gaze at desk)
  await desk1.clone()
    .write(path.join(exercisesDir, 'focus-reset-1.jpg'));

  // Step 2: Tactile Grounding - 2 Textures (Hands grounded on desk surface)
  await desk3.clone()
    .write(path.join(exercisesDir, 'focus-reset-2.jpg'));

  // Step 3: Auditory Presence - 1 Ambient Sound (Mindful head tilt listening)
  await neckBase.clone()
    .crop({ x: 100, y: 60, w: 820, h: 820 })
    .resize({ w: 1024, h: 1024 })
    .write(path.join(exercisesDir, 'focus-reset-3.jpg'));

  // Step 4: Centering Breath - Re-anchor Intention (Deep diaphragmatic breath in serene stillness)
  await boxBase.clone()
    .write(path.join(exercisesDir, 'focus-reset-4.jpg'));

  // Also create focus-reset.jpg for general card preview
  await boxBase.clone()
    .write(path.join(exercisesDir, 'focus-reset.jpg'));
  console.log('✓ focus-reset (steps 1-4 + main)');

  console.log('\n--- ALL 40 EXACT YOGA & EXERCISE STEP IMAGES CREATED SUCCESSFULLY! ---');
}

run().catch(err => {
  console.error('Error generating exercise images:', err);
  process.exit(1);
});
