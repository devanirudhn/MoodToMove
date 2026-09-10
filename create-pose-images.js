import fs from 'fs';
import path from 'path';

const outDir = 'Frontend/public/exercises';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to generate clean, high-aesthetic posture SVGs
function generatePoseSVG({ title, cue, figureSVG, bgColor = '#faf5ff', accentColor = '#7c3aed' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgColor}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fed7aa" />
      <stop offset="100%" stop-color="#fdba74" />
    </linearGradient>
    <linearGradient id="shirt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c4b5fd" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
    <linearGradient id="pants" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0" />
      <stop offset="100%" stop-color="#34d399" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.06" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="400" height="400" rx="28" fill="url(#bgGrad)" />
  <circle cx="200" cy="190" r="130" fill="${accentColor}" opacity="0.08" />

  <!-- Posture Figure Visual -->
  <g filter="url(#shadow)">
    ${figureSVG}
  </g>

  <!-- Title Badge -->
  <rect x="30" y="20" width="340" height="32" rx="16" fill="#ffffff" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1.5" />
  <text x="200" y="41" text-anchor="middle" fill="${accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="0.5">
    ${title.toUpperCase()}
  </text>

  <!-- Cues Instruction Strip -->
  <rect x="24" y="344" width="352" height="38" rx="14" fill="#0f172a" opacity="0.9" />
  <text x="200" y="368" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600">
    ${cue}
  </text>
</svg>`;
}

// 1. Box Breathing (4 Steps)
fs.writeFileSync(path.join(outDir, 'box-breathing-1.svg'), generatePoseSVG({
  title: 'Step 1: Deep Nose Inhale (4s)',
  cue: 'Sit in lotus posture • Inhale deeply through nose, filling belly',
  bgColor: '#f5f3ff',
  accentColor: '#7c3aed',
  figureSVG: `
    <!-- Chair / Cushion -->
    <ellipse cx="200" cy="285" rx="75" ry="22" fill="#e2e8f0" />
    <!-- Crossed Legs -->
    <ellipse cx="200" cy="270" rx="65" ry="20" fill="url(#pants)" />
    <!-- Torso -->
    <path d="M 180 265 L 220 265 L 225 180 L 175 180 Z" fill="url(#shirt)" />
    <!-- Arms on knees -->
    <path d="M 180 190 Q 145 230 150 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <path d="M 220 190 Q 255 230 250 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <circle cx="150" cy="260" r="8" fill="url(#skin)" />
    <circle cx="250" cy="260" r="8" fill="url(#skin)" />
    <!-- Neck & Head -->
    <line x1="200" y1="180" x2="200" y2="160" stroke="url(#skin)" stroke-width="14" stroke-linecap="round" />
    <ellipse cx="200" cy="135" rx="22" ry="26" fill="url(#skin)" />
    <path d="M 185 125 C 188 100 215 100 218 125 Z" fill="#475569" />
    <!-- Inhale Airflow Expansion Glow -->
    <circle cx="200" cy="220" r="32" fill="#a78bfa" opacity="0.45" />
    <path d="M 200 240 L 200 195" stroke="#7c3aed" stroke-width="4" stroke-linecap="round" />
    <polygon points="194,200 200,188 206,200" fill="#7c3aed" />
  `
}));

fs.writeFileSync(path.join(outDir, 'box-breathing-2.svg'), generatePoseSVG({
  title: 'Step 2: Hold Breath Gently (4s)',
  cue: 'Pause with lungs comfortably full • Keep chest relaxed',
  bgColor: '#f5f3ff',
  accentColor: '#7c3aed',
  figureSVG: `
    <ellipse cx="200" cy="285" rx="75" ry="22" fill="#e2e8f0" />
    <ellipse cx="200" cy="270" rx="65" ry="20" fill="url(#pants)" />
    <path d="M 180 265 L 220 265 L 225 180 L 175 180 Z" fill="url(#shirt)" />
    <path d="M 180 190 Q 145 230 150 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <path d="M 220 190 Q 255 230 250 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <circle cx="150" cy="260" r="8" fill="url(#skin)" />
    <circle cx="250" cy="260" r="8" fill="url(#skin)" />
    <line x1="200" y1="180" x2="200" y2="160" stroke="url(#skin)" stroke-width="14" stroke-linecap="round" />
    <ellipse cx="200" cy="135" rx="22" ry="26" fill="url(#skin)" />
    <path d="M 185 125 C 188 100 215 100 218 125 Z" fill="#475569" />
    <!-- Stillness Aura -->
    <circle cx="200" cy="220" r="36" fill="none" stroke="#7c3aed" stroke-width="3" stroke-dasharray="5,5" />
    <circle cx="200" cy="220" r="24" fill="#a78bfa" opacity="0.5" />
  `
}));

fs.writeFileSync(path.join(outDir, 'box-breathing-3.svg'), generatePoseSVG({
  title: 'Step 3: Slow Mouth Exhale (4s)',
  cue: 'Release all air smoothly through mouth • Let shoulders drop',
  bgColor: '#f5f3ff',
  accentColor: '#7c3aed',
  figureSVG: `
    <ellipse cx="200" cy="285" rx="75" ry="22" fill="#e2e8f0" />
    <ellipse cx="200" cy="270" rx="65" ry="20" fill="url(#pants)" />
    <path d="M 180 265 L 220 265 L 225 180 L 175 180 Z" fill="url(#shirt)" />
    <path d="M 180 190 Q 145 230 150 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <path d="M 220 190 Q 255 230 250 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <circle cx="150" cy="260" r="8" fill="url(#skin)" />
    <circle cx="250" cy="260" r="8" fill="url(#skin)" />
    <line x1="200" y1="180" x2="200" y2="160" stroke="url(#skin)" stroke-width="14" stroke-linecap="round" />
    <ellipse cx="200" cy="135" rx="22" ry="26" fill="url(#skin)" />
    <path d="M 185 125 C 188 100 215 100 218 125 Z" fill="#475569" />
    <!-- Downward Exhale Stream -->
    <path d="M 200 200 L 200 245" stroke="#7c3aed" stroke-width="4" stroke-linecap="round" />
    <polygon points="194,240 200,252 206,240" fill="#7c3aed" />
    <circle cx="200" cy="220" r="16" fill="#a78bfa" opacity="0.3" />
  `
}));

fs.writeFileSync(path.join(outDir, 'box-breathing-4.svg'), generatePoseSVG({
  title: 'Step 4: Hold Empty & Rest (4s)',
  cue: 'Pause in serene stillness before the next breath cycle',
  bgColor: '#f5f3ff',
  accentColor: '#7c3aed',
  figureSVG: `
    <ellipse cx="200" cy="285" rx="75" ry="22" fill="#e2e8f0" />
    <ellipse cx="200" cy="270" rx="65" ry="20" fill="url(#pants)" />
    <path d="M 180 265 L 220 265 L 225 180 L 175 180 Z" fill="url(#shirt)" />
    <path d="M 180 190 Q 145 230 150 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <path d="M 220 190 Q 255 230 250 260" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <circle cx="150" cy="260" r="8" fill="url(#skin)" />
    <circle cx="250" cy="260" r="8" fill="url(#skin)" />
    <line x1="200" y1="180" x2="200" y2="160" stroke="url(#skin)" stroke-width="14" stroke-linecap="round" />
    <ellipse cx="200" cy="135" rx="22" ry="26" fill="url(#skin)" />
    <path d="M 185 125 C 188 100 215 100 218 125 Z" fill="#475569" />
    <!-- Empty Rest Rings -->
    <circle cx="200" cy="220" r="28" fill="none" stroke="#cbd5e1" stroke-width="2" />
  `
}));

// 2. Shoulder Release (4 Steps)
fs.writeFileSync(path.join(outDir, 'shoulder-release-1.svg'), generatePoseSVG({
  title: 'Step 1: Shoulder Shrug to Ears',
  cue: 'Inhale deeply and shrug both shoulders up toward your ears',
  bgColor: '#fefce8',
  accentColor: '#ca8a04',
  figureSVG: `
    <!-- Chair -->
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <!-- Torso with Shrugged Shoulders High -->
    <path d="M 175 210 L 180 145 Q 160 120 165 110 L 235 110 Q 240 120 220 145 Z" fill="url(#shirt)" />
    <!-- Arms hanging -->
    <line x1="165" y1="120" x2="155" y2="200" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <line x1="235" y1="120" x2="245" y2="200" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <!-- Head tucked low -->
    <ellipse cx="200" cy="115" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 105 C 190 85 214 85 218 105 Z" fill="#475569" />
    <!-- Upward Shrug Arrows -->
    <path d="M 145 150 L 145 115" stroke="#ca8a04" stroke-width="4" stroke-linecap="round" />
    <polygon points="140,120 145,108 150,120" fill="#ca8a04" />
    <path d="M 255 150 L 255 115" stroke="#ca8a04" stroke-width="4" stroke-linecap="round" />
    <polygon points="250,120 255,108 260,120" fill="#ca8a04" />
  `
}));

fs.writeFileSync(path.join(outDir, 'shoulder-release-2.svg'), generatePoseSVG({
  title: 'Step 2: Backward Shoulder Rolls',
  cue: 'Slowly roll your shoulders backward in large, deliberate circles',
  bgColor: '#fefce8',
  accentColor: '#ca8a04',
  figureSVG: `
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <path d="M 175 210 L 180 135 L 220 135 L 225 210 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="105" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 95 C 190 75 214 75 218 95 Z" fill="#475569" />
    <!-- Backward Roll Curved Arrows -->
    <path d="M 155 130 A 25 25 0 1 1 155 160" fill="none" stroke="#ca8a04" stroke-width="4" />
    <polygon points="150,158 156,168 162,158" fill="#ca8a04" />
    <path d="M 245 130 A 25 25 0 1 0 245 160" fill="none" stroke="#ca8a04" stroke-width="4" />
    <polygon points="239,158 245,168 251,158" fill="#ca8a04" />
  `
}));

fs.writeFileSync(path.join(outDir, 'shoulder-release-3.svg'), generatePoseSVG({
  title: 'Step 3: Forward Shoulder Rolls',
  cue: 'Reverse direction • Roll shoulders smoothly forward with relaxed breath',
  bgColor: '#fefce8',
  accentColor: '#ca8a04',
  figureSVG: `
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <path d="M 175 210 L 180 135 L 220 135 L 225 210 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="105" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 95 C 190 75 214 75 218 95 Z" fill="#475569" />
    <!-- Forward Roll Curved Arrows -->
    <path d="M 155 160 A 25 25 0 1 1 155 130" fill="none" stroke="#ca8a04" stroke-width="4" />
    <polygon points="150,132 156,122 162,132" fill="#ca8a04" />
    <path d="M 245 160 A 25 25 0 1 0 245 130" fill="none" stroke="#ca8a04" stroke-width="4" />
    <polygon points="239,132 245,122 251,132" fill="#ca8a04" />
  `
}));

fs.writeFileSync(path.join(outDir, 'shoulder-release-4.svg'), generatePoseSVG({
  title: 'Step 4: Chest Open & Hands Clasped',
  cue: 'Clasp hands behind your back, open your chest, and drop shoulders low',
  bgColor: '#fefce8',
  accentColor: '#ca8a04',
  figureSVG: `
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <!-- Broad open chest -->
    <path d="M 170 210 L 175 135 L 225 135 L 230 210 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="105" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 95 C 190 75 214 75 218 95 Z" fill="#475569" />
    <!-- Arms reaching behind -->
    <path d="M 175 140 Q 150 170 190 195" stroke="url(#shirt)" stroke-width="14" fill="none" stroke-linecap="round" />
    <path d="M 225 140 Q 250 170 210 195" stroke="url(#shirt)" stroke-width="14" fill="none" stroke-linecap="round" />
    <circle cx="200" cy="195" r="10" fill="url(#skin)" />
    <!-- Heart Expansion Waves -->
    <circle cx="200" cy="155" r="22" fill="none" stroke="#eab308" stroke-width="2.5" stroke-dasharray="4,4" />
  `
}));

// 3. Neck Reset (4 Steps)
fs.writeFileSync(path.join(outDir, 'neck-reset-1.svg'), generatePoseSVG({
  title: 'Step 1: Lateral Neck Tilt',
  cue: 'Tilt right ear to right shoulder for 15s • Repeat on left side',
  bgColor: '#f0fdf4',
  accentColor: '#16a34a',
  figureSVG: `
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <path d="M 175 210 L 180 145 L 220 145 L 225 210 Z" fill="url(#shirt)" />
    <!-- Head Tilted 40 degrees -->
    <g transform="rotate(25, 200, 140)">
      <line x1="200" y1="145" x2="200" y2="125" stroke="url(#skin)" stroke-width="14" stroke-linecap="round" />
      <ellipse cx="200" cy="100" rx="20" ry="24" fill="url(#skin)" />
      <path d="M 186 90 C 190 70 214 70 218 90 Z" fill="#475569" />
    </g>
    <!-- Hand gently guiding head -->
    <path d="M 225 150 Q 250 110 215 90" stroke="url(#shirt)" stroke-width="12" fill="none" stroke-linecap="round" />
    <circle cx="215" cy="90" r="7" fill="url(#skin)" />
    <!-- Lateral stretch arrow -->
    <path d="M 170 110 Q 155 125 155 145" stroke="#16a34a" stroke-width="3.5" fill="none" stroke-dasharray="3,3" />
  `
}));

fs.writeFileSync(path.join(outDir, 'neck-reset-2.svg'), generatePoseSVG({
  title: 'Step 2: Chin to Chest Neck Flexion',
  cue: 'Lower your chin smoothly toward chest • Feel back of neck elongate',
  bgColor: '#f0fdf4',
  accentColor: '#16a34a',
  figureSVG: `
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <path d="M 175 210 L 180 145 L 220 145 L 225 210 Z" fill="url(#shirt)" />
    <!-- Head lowered downward -->
    <ellipse cx="200" cy="120" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 100 C 190 80 214 80 218 100 Z" fill="#475569" />
    <!-- Downward Flexion Arrow -->
    <path d="M 200 85 L 200 110" stroke="#16a34a" stroke-width="4" stroke-linecap="round" />
    <polygon points="194,105 200,116 206,105" fill="#16a34a" />
  `
}));

fs.writeFileSync(path.join(outDir, 'neck-reset-3.svg'), generatePoseSVG({
  title: 'Step 3: Gentle Throat Extension',
  cue: 'Gently tilt chin upward toward ceiling without pinching back of neck',
  bgColor: '#f0fdf4',
  accentColor: '#16a34a',
  figureSVG: `
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <path d="M 175 210 L 180 145 L 220 145 L 225 210 Z" fill="url(#shirt)" />
    <!-- Head tilted up -->
    <ellipse cx="200" cy="95" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 90 C 190 70 214 70 218 90 Z" fill="#475569" />
    <!-- Upward Arrow -->
    <path d="M 200 115 L 200 90" stroke="#16a34a" stroke-width="4" stroke-linecap="round" />
    <polygon points="194,95 200,83 206,95" fill="#16a34a" />
  `
}));

fs.writeFileSync(path.join(outDir, 'neck-reset-4.svg'), generatePoseSVG({
  title: 'Step 4: Smooth Half-Circle Rolls',
  cue: 'Draw slow half-circles with chin from shoulder to shoulder',
  bgColor: '#f0fdf4',
  accentColor: '#16a34a',
  figureSVG: `
    <rect x="135" y="210" width="130" height="14" rx="7" fill="#cbd5e1" />
    <path d="M 160 210 L 220 210 L 230 290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <path d="M 175 210 L 180 145 L 220 145 L 225 210 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="110" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 98 C 190 78 214 78 218 98 Z" fill="#475569" />
    <!-- Half-Circle Arc -->
    <path d="M 160 135 A 40 40 0 0 0 240 135" fill="none" stroke="#16a34a" stroke-width="4" stroke-dasharray="4,4" />
    <polygon points="236,130 244,136 236,142" fill="#16a34a" />
  `
}));

// 4. Posture Reset (4 Steps)
fs.writeFileSync(path.join(outDir, 'posture-reset-1.svg'), generatePoseSVG({
  title: 'Step 1: Cervical Spine Chin Tuck',
  cue: 'Tuck chin straight back horizontally to align forward-head posture',
  bgColor: '#f0fdfa',
  accentColor: '#0d9488',
  figureSVG: `
    <path d="M 180 290 L 180 170 L 220 170 L 220 290" stroke="url(#pants)" stroke-width="24" fill="none" stroke-linecap="round" />
    <path d="M 175 170 L 180 110 L 220 110 L 225 170 Z" fill="url(#shirt)" />
    <ellipse cx="195" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 180 72 C 184 52 208 52 212 72 Z" fill="#475569" />
    <!-- Horizontal Tuck Arrow -->
    <path d="M 230 80 L 205 80" stroke="#0d9488" stroke-width="4" stroke-linecap="round" />
    <polygon points="210,75 200,80 210,85" fill="#0d9488" />
  `
}));

fs.writeFileSync(path.join(outDir, 'posture-reset-2.svg'), generatePoseSVG({
  title: 'Step 2: 90° Cactus Arms Scapular Squeeze',
  cue: 'Bend elbows 90 degrees • Squeeze shoulder blades firmly together',
  bgColor: '#f0fdfa',
  accentColor: '#0d9488',
  figureSVG: `
    <line x1="180" y1="290" x2="180" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="220" y1="290" x2="220" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 175 110 L 225 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 70 C 190 50 214 50 218 70 Z" fill="#475569" />
    <!-- Cactus Arms 90 deg -->
    <path d="M 175 120 L 130 120 L 130 70" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <circle cx="130" cy="70" r="8" fill="url(#skin)" />
    <path d="M 225 120 L 270 120 L 270 70" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <circle cx="270" cy="70" r="8" fill="url(#skin)" />
    <!-- Retraction Squeeze Arrows -->
    <path d="M 115 120 L 135 120" stroke="#0d9488" stroke-width="3.5" />
    <path d="M 285 120 L 265 120" stroke="#0d9488" stroke-width="3.5" />
  `
}));

fs.writeFileSync(path.join(outDir, 'posture-reset-3.svg'), generatePoseSVG({
  title: 'Step 3: Overhead Y-Reach',
  cue: 'Reach arms into wide overhead Y while keeping shoulder blades down',
  bgColor: '#f0fdfa',
  accentColor: '#0d9488',
  figureSVG: `
    <line x1="185" y1="290" x2="185" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="215" y1="290" x2="215" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 70 C 190 50 214 50 218 70 Z" fill="#475569" />
    <!-- Overhead Y arms -->
    <line x1="180" y1="120" x2="140" y2="50" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
    <circle cx="140" cy="50" r="8" fill="url(#skin)" />
    <line x1="220" y1="120" x2="260" y2="50" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
    <circle cx="260" cy="50" r="8" fill="url(#skin)" />
  `
}));

fs.writeFileSync(path.join(outDir, 'posture-reset-4.svg'), generatePoseSVG({
  title: 'Step 4: Standing Tall Mountain Posture',
  cue: 'Drop arms to sides • Feel tall, aligned spine from tailbone to crown',
  bgColor: '#f0fdfa',
  accentColor: '#0d9488',
  figureSVG: `
    <line x1="185" y1="290" x2="185" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="215" y1="290" x2="215" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 70 C 190 50 214 50 218 70 Z" fill="#475569" />
    <line x1="175" y1="120" x2="160" y2="200" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <line x1="225" y1="120" x2="240" y2="200" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <!-- Tall Vertical Alignment Axis -->
    <line x1="200" y1="40" x2="200" y2="300" stroke="#0d9488" stroke-width="2" stroke-dasharray="6,6" opacity="0.6" />
  `
}));

// 5. Standing Energizer (4 Steps)
fs.writeFileSync(path.join(outDir, 'standing-energizer-1.svg'), generatePoseSVG({
  title: 'Step 1: Rhythmic March in Place',
  cue: 'March in place with soft knees and relaxed arm swings to stimulate blood flow',
  bgColor: '#faf5ff',
  accentColor: '#9333ea',
  figureSVG: `
    <!-- Leg 1 Grounded, Leg 2 Marching -->
    <line x1="175" y1="180" x2="175" y2="290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 220 180 L 230 230 L 255 260" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 70 C 190 50 214 50 218 70 Z" fill="#475569" />
    <line x1="175" y1="120" x2="150" y2="170" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <line x1="225" y1="120" x2="250" y2="170" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
  `
}));

fs.writeFileSync(path.join(outDir, 'standing-energizer-2.svg'), generatePoseSVG({
  title: 'Step 2: Alternating High Knees',
  cue: 'Lift alternating knees toward hip level while breathing deeply',
  bgColor: '#faf5ff',
  accentColor: '#9333ea',
  figureSVG: `
    <line x1="175" y1="180" x2="175" y2="290" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <!-- High Knee lifted to 90 deg -->
    <path d="M 215 180 L 260 180 L 260 240" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 70 C 190 50 214 50 218 70 Z" fill="#475569" />
    <line x1="175" y1="120" x2="140" y2="150" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <line x1="225" y1="120" x2="245" y2="90" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
  `
}));

fs.writeFileSync(path.join(outDir, 'standing-energizer-3.svg'), generatePoseSVG({
  title: 'Step 3: Shake Out Hands & Limbs',
  cue: 'Shake out hands, wrists, and feet to shed stagnant sedentary stiffness',
  bgColor: '#faf5ff',
  accentColor: '#9333ea',
  figureSVG: `
    <line x1="185" y1="290" x2="185" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="215" y1="290" x2="215" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 70 C 190 50 214 50 218 70 Z" fill="#475569" />
    <!-- Arms shaking outwards with kinetic ripples -->
    <line x1="175" y1="120" x2="130" y2="150" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <circle cx="120" cy="155" r="12" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-dasharray="3,3" />
    <line x1="225" y1="120" x2="270" y2="150" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
    <circle cx="280" cy="155" r="12" fill="none" stroke="#a855f7" stroke-width="2.5" stroke-dasharray="3,3" />
  `
}));

fs.writeFileSync(path.join(outDir, 'standing-energizer-4.svg'), generatePoseSVG({
  title: 'Step 4: Sky Reach & Exhale',
  cue: 'Reach arms high, take a giant breath, and release with a strong exhale',
  bgColor: '#faf5ff',
  accentColor: '#9333ea',
  figureSVG: `
    <line x1="185" y1="290" x2="185" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="215" y1="290" x2="215" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <path d="M 186 70 C 190 50 214 50 218 70 Z" fill="#475569" />
    <line x1="180" y1="110" x2="150" y2="40" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
    <line x1="220" y1="110" x2="250" y2="40" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
    <!-- Victorious Sunlight Rays -->
    <circle cx="200" cy="40" r="18" fill="#fef08a" opacity="0.6" />
  `
}));

// 6. Full Body Reset (4 Steps)
fs.writeFileSync(path.join(outDir, 'full-body-reset-1.svg'), generatePoseSVG({
  title: 'Step 1: Interlaced Upward Palm Stretch',
  cue: 'Interlace fingers, flip palms upward, and elongate entire spine tall',
  bgColor: '#fdf4ff',
  accentColor: '#c026d3',
  figureSVG: `
    <line x1="185" y1="290" x2="185" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="215" y1="290" x2="215" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <line x1="180" y1="110" x2="190" y2="40" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
    <line x1="220" y1="110" x2="210" y2="40" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
    <rect x="185" y="30" width="30" height="16" rx="8" fill="url(#skin)" />
  `
}));

fs.writeFileSync(path.join(outDir, 'full-body-reset-2.svg'), generatePoseSVG({
  title: 'Step 2: Gentle Soft-Knee Forward Fold',
  cue: 'Hinge at hips with soft knees • Let head, neck, and arms hang completely loose',
  bgColor: '#fdf4ff',
  accentColor: '#c026d3',
  figureSVG: `
    <!-- Legs standing with soft knee hinge -->
    <path d="M 230 290 L 230 220 L 200 180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" fill="none" />
    <!-- Torso folded downwards -->
    <path d="M 200 180 Q 180 180 160 220" stroke="url(#shirt)" stroke-width="32" stroke-linecap="round" fill="none" />
    <ellipse cx="150" cy="245" rx="18" ry="20" fill="url(#skin)" />
    <!-- Arms dangling to floor -->
    <line x1="170" y1="210" x2="170" y2="280" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" />
  `
}));

fs.writeFileSync(path.join(outDir, 'full-body-reset-3.svg'), generatePoseSVG({
  title: 'Step 3: Standing Hip Circles',
  cue: 'Stand tall with hands on hips • Circle hips 5 times clockwise, then 5 counterclockwise',
  bgColor: '#fdf4ff',
  accentColor: '#c026d3',
  figureSVG: `
    <line x1="180" y1="290" x2="180" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="220" y1="290" x2="220" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <!-- Hands on hips -->
    <path d="M 175 120 L 155 160 L 175 175" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <path d="M 225 120 L 245 160 L 225 175" stroke="url(#shirt)" stroke-width="14" stroke-linecap="round" fill="none" />
    <!-- Circular Hip Rotation Orbit -->
    <ellipse cx="200" cy="185" rx="45" ry="14" fill="none" stroke="#c026d3" stroke-width="3" stroke-dasharray="4,4" />
  `
}));

fs.writeFileSync(path.join(outDir, 'full-body-reset-4.svg'), generatePoseSVG({
  title: 'Step 4: Victorious Whole Body Reset',
  cue: 'Shake out hands and feet, take a deep breath, and smile as you finish',
  bgColor: '#fdf4ff',
  accentColor: '#c026d3',
  figureSVG: `
    <line x1="185" y1="290" x2="185" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <line x1="215" y1="290" x2="215" y2="180" stroke="url(#pants)" stroke-width="24" stroke-linecap="round" />
    <path d="M 175 180 L 180 110 L 220 110 L 225 180 Z" fill="url(#shirt)" />
    <ellipse cx="200" cy="80" rx="20" ry="24" fill="url(#skin)" />
    <line x1="180" y1="110" x2="140" y2="60" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
    <line x1="220" y1="110" x2="260" y2="60" stroke="url(#shirt)" stroke-width="16" stroke-linecap="round" />
  `
}));

console.log('Successfully generated all exact SVG exercise posture images!');
