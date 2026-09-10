import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/exercises');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Reusable SVG wrapper with soft aesthetic background, floor shadow, and gradients
function createPoseSVG({ id, description, figureElements }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#faf5ff"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fba86c"/>
    </linearGradient>
    <linearGradient id="shirt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="pants" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#4c1d95" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Clean Minimalist Background -->
  <rect width="600" height="600" rx="32" fill="url(#bgGrad)"/>

  <!-- Soft Floor Shadow -->
  <ellipse cx="300" cy="520" rx="150" ry="24" fill="#e2e8f0" opacity="0.6"/>
  <ellipse cx="300" cy="520" rx="100" ry="16" fill="#cbd5e1" opacity="0.4"/>

  <!-- Posture Figure Visual -->
  <g filter="url(#softShadow)">
    ${figureElements}
  </g>
</svg>`;
}

// Office Chair Helper for seated poses
const officeChairSVG = `
  <!-- Chair Backrest -->
  <rect x="235" y="240" width="130" height="150" rx="20" fill="#94a3b8" opacity="0.3"/>
  <rect x="245" y="250" width="110" height="130" rx="16" fill="#cbd5e1" opacity="0.5"/>
  <!-- Chair Seat -->
  <rect x="215" y="385" width="170" height="24" rx="12" fill="#64748b" opacity="0.4"/>
  <!-- Chair Stem & Base -->
  <line x1="300" y1="405" x2="300" y2="480" stroke="#64748b" stroke-width="12" stroke-linecap="round"/>
  <line x1="240" y1="490" x2="360" y2="490" stroke="#475569" stroke-width="8" stroke-linecap="round"/>
  <circle cx="240" cy="495" r="6" fill="#334155"/>
  <circle cx="360" cy="495" r="6" fill="#334155"/>
  <circle cx="300" cy="495" r="6" fill="#334155"/>
`;

const poses = {};

// ==========================================
// 1. NECK RESET (neck-reset)
// ==========================================

// Step 1: Lateral Neck Tilt (Right)
// Hand resting softly on temple, head tilted right
poses['neck-reset-1'] = createPoseSVG({
  id: 'neck-reset-1',
  description: 'Lateral Neck Tilt (Right)',
  figureElements: `
    ${officeChairSVG}
    <!-- Legs Seated -->
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Torso -->
    <path d="M 260 395 L 270 250 L 330 250 L 340 395 Z" fill="url(#shirt)"/>
    <!-- Left Arm Resting on Knee -->
    <path d="M 270 260 L 250 340 L 265 390" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="265" cy="390" r="10" fill="url(#skin)"/>
    <!-- Head Tilted Right (rotated ~25 deg) -->
    <g transform="rotate(22, 300, 240)">
      <line x1="300" y1="250" x2="300" y2="210" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
      <ellipse cx="300" cy="180" rx="28" ry="34" fill="url(#skin)"/>
      <path d="M 275 170 C 275 130 325 130 325 170 C 320 150 280 150 275 170 Z" fill="#451a03"/>
      <!-- Ponytail -->
      <path d="M 275 170 Q 245 190 255 220" stroke="#451a03" stroke-width="14" stroke-linecap="round" fill="none"/>
    </g>
    <!-- Right Arm Reaching Over Head to Temple -->
    <path d="M 330 260 Q 370 180 325 160" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <path d="M 325 160 L 315 165" stroke="url(#skin)" stroke-width="14" stroke-linecap="round"/>
    <!-- Lateral Stretch Cue Arrow -->
    <path d="M 255 200 Q 240 220 245 245" stroke="#7c3aed" stroke-width="3" stroke-dasharray="4 4" fill="none"/>
    <polygon points="250,245 242,252 240,240" fill="#7c3aed"/>
  `
});

// Step 2: Chin to Chest Flexion (Exact position: Head lowered forward, chin to sternum)
poses['neck-reset-2'] = createPoseSVG({
  id: 'neck-reset-2',
  description: 'Chin to Chest Flexion',
  figureElements: `
    ${officeChairSVG}
    <!-- Legs Seated -->
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Torso Straight, Tall Spine -->
    <path d="M 260 395 L 268 250 L 332 250 L 340 395 Z" fill="url(#shirt)"/>
    <!-- Both Arms Resting Peacefully on Knees -->
    <path d="M 270 260 L 255 335 L 265 390" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="265" cy="390" r="10" fill="url(#skin)"/>
    <path d="M 330 260 L 345 335 L 335 390" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="335" cy="390" r="10" fill="url(#skin)"/>
    <!-- Head Lowered Forward (Chin touching chest) -->
    <!-- Curved back of neck elongated -->
    <path d="M 300 250 Q 295 235 300 215" stroke="url(#skin)" stroke-width="24" stroke-linecap="round" fill="none"/>
    <!-- Head angled down -->
    <ellipse cx="300" cy="205" rx="28" ry="32" fill="url(#skin)"/>
    <!-- Hair curving forward -->
    <path d="M 275 190 C 275 160 325 160 325 190 C 315 175 285 175 275 190 Z" fill="#451a03"/>
    <path d="M 300 165 Q 275 180 270 210" stroke="#451a03" stroke-width="16" stroke-linecap="round" fill="none"/>
    <!-- Downward Flexion Stretch Indicator Arrow -->
    <path d="M 300 140 L 300 170" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
    <polygon points="292,165 300,178 308,165" fill="#7c3aed"/>
    <!-- Cervical elongation curve -->
    <path d="M 330 190 Q 338 215 335 240" stroke="#a855f7" stroke-width="3" stroke-dasharray="4 4" fill="none"/>
  `
});

// Step 3: Gentle Throat Extension (Exact position: Chin tilted upward toward ceiling)
poses['neck-reset-3'] = createPoseSVG({
  id: 'neck-reset-3',
  description: 'Gentle Throat Extension',
  figureElements: `
    ${officeChairSVG}
    <!-- Legs Seated -->
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Torso with Open Proud Chest -->
    <path d="M 260 395 L 265 245 L 335 245 L 340 395 Z" fill="url(#shirt)"/>
    <!-- Arms resting on chair arms -->
    <path d="M 265 255 L 245 330 L 260 380" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="260" cy="380" r="10" fill="url(#skin)"/>
    <path d="M 335 255 L 355 330 L 340 380" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="340" cy="380" r="10" fill="url(#skin)"/>
    <!-- Head Tilted Upward to Ceiling (Throat Open) -->
    <!-- Neck elongated front -->
    <path d="M 300 245 L 300 200" stroke="url(#skin)" stroke-width="24" stroke-linecap="round"/>
    <!-- Head lifted upward -->
    <ellipse cx="300" cy="170" rx="28" ry="32" fill="url(#skin)"/>
    <!-- Face looking up, chin up -->
    <path d="M 275 160 C 275 130 325 130 325 160 C 315 150 285 150 275 160 Z" fill="#451a03"/>
    <!-- Ponytail resting on upper back -->
    <path d="M 295 180 Q 280 210 285 235" stroke="#451a03" stroke-width="16" stroke-linecap="round" fill="none"/>
    <!-- Upward Throat Expansion Indicator Arrow -->
    <path d="M 300 195 L 300 160" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
    <polygon points="292,165 300,152 308,165" fill="#7c3aed"/>
  `
});

// Step 4: Smooth Half-Circle Rolls (Rolling chin shoulder to shoulder)
poses['neck-reset-4'] = createPoseSVG({
  id: 'neck-reset-4',
  description: 'Smooth Half-Circle Rolls',
  figureElements: `
    ${officeChairSVG}
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 395 L 268 250 L 332 250 L 340 395 Z" fill="url(#shirt)"/>
    <path d="M 270 260 L 255 335 L 265 390" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="265" cy="390" r="10" fill="url(#skin)"/>
    <path d="M 330 260 L 345 335 L 335 390" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="335" cy="390" r="10" fill="url(#skin)"/>
    <!-- Head in Gentle Transitional Half-Circle Arc -->
    <ellipse cx="300" cy="190" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 275 175 C 275 145 325 145 325 175 Z" fill="#451a03"/>
    <!-- Half-Circle Motion Arc from Shoulder to Shoulder -->
    <path d="M 240 230 A 65 35 0 0 0 360 230" fill="none" stroke="#7c3aed" stroke-width="4" stroke-dasharray="6 6"/>
    <polygon points="355,222 365,229 357,237" fill="#7c3aed"/>
    <polygon points="245,237 235,229 243,222" fill="#7c3aed"/>
  `
});

// ==========================================
// 2. SHOULDER RELEASE (shoulder-release)
// ==========================================

// Step 1: Shoulder Shrug to Ears (Exact position: Both shoulders shrugged high up touching ears)
poses['shoulder-release-1'] = createPoseSVG({
  id: 'shoulder-release-1',
  description: 'Shoulder Shrug to Ears',
  figureElements: `
    ${officeChairSVG}
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Torso with Shoulders Shrugged Extremely High -->
    <path d="M 260 395 L 255 210 Q 255 185 285 200 L 315 200 Q 345 185 345 210 L 340 395 Z" fill="url(#shirt)"/>
    <!-- Head tucked low between shrugged shoulders -->
    <ellipse cx="300" cy="190" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 278 175 C 278 145 322 145 322 175 Z" fill="#451a03"/>
    <!-- Arms pulled upward by shrug -->
    <path d="M 255 200 L 240 310 L 250 380" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="250" cy="380" r="10" fill="url(#skin)"/>
    <path d="M 345 200 L 360 310 L 350 380" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="350" cy="380" r="10" fill="url(#skin)"/>
    <!-- Vertical Shrug Upward Arrows on Both Shoulders -->
    <path d="M 230 250 L 230 195" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
    <polygon points="222,200 230,188 238,200" fill="#7c3aed"/>
    <path d="M 370 250 L 370 195" stroke="#7c3aed" stroke-width="4" stroke-linecap="round"/>
    <polygon points="362,200 370,188 378,200" fill="#7c3aed"/>
  `
});

// Step 3: Forward Shoulder Rolls
poses['shoulder-release-3'] = createPoseSVG({
  id: 'shoulder-release-3',
  description: 'Forward Shoulder Rolls',
  figureElements: `
    ${officeChairSVG}
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 395 L 268 250 L 332 250 L 340 395 Z" fill="url(#shirt)"/>
    <path d="M 268 255 L 250 335 L 260 385" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="260" cy="385" r="10" fill="url(#skin)"/>
    <path d="M 332 255 L 350 335 L 340 385" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="340" cy="385" r="10" fill="url(#skin)"/>
    <line x1="300" y1="250" x2="300" y2="215" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="180" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 275 165 C 275 135 325 135 325 165 Z" fill="#451a03"/>
    <!-- Forward Roll Directional Circular Arrows -->
    <path d="M 245 270 A 28 28 0 1 1 245 230" fill="none" stroke="#7c3aed" stroke-width="4"/>
    <polygon points="237,233 245,222 253,233" fill="#7c3aed"/>
    <path d="M 355 270 A 28 28 0 1 0 355 230" fill="none" stroke="#7c3aed" stroke-width="4"/>
    <polygon points="347,233 355,222 363,233" fill="#7c3aed"/>
  `
});

// Step 4: Clasp Hands Behind Back & Chest Opener (Exact position: Arms behind back, chest broad)
poses['shoulder-release-4'] = createPoseSVG({
  id: 'shoulder-release-4',
  description: 'Clasp Hands Behind Back & Chest Opener',
  figureElements: `
    ${officeChairSVG}
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Broad Open Chest Torso -->
    <path d="M 255 395 L 260 245 L 340 245 L 345 395 Z" fill="url(#shirt)"/>
    <line x1="300" y1="245" x2="300" y2="210" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="175" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 275 160 C 275 130 325 130 325 160 Z" fill="#451a03"/>
    <!-- Arms Reaching BEHIND Back with Hands Interlocked -->
    <!-- Left arm going back -->
    <path d="M 265 255 Q 235 300 280 340" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <!-- Right arm going back -->
    <path d="M 335 255 Q 365 300 320 340" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <!-- Clasped hands behind chair back -->
    <ellipse cx="300" cy="340" rx="16" ry="12" fill="url(#skin)"/>
    <!-- Chest Expansion Radiant Heart Indicator -->
    <circle cx="300" cy="275" r="28" fill="none" stroke="#eab308" stroke-width="3" stroke-dasharray="5 5"/>
    <path d="M 285 275 L 315 275" stroke="#eab308" stroke-width="3" stroke-linecap="round"/>
    <path d="M 300 260 L 300 290" stroke="#eab308" stroke-width="3" stroke-linecap="round"/>
  `
});

// ==========================================
// 3. POSTURE RESET (posture-reset)
// ==========================================

// Step 1: Cervical Spine Chin Tuck (Standing upright, chin retracted back)
poses['posture-reset-1'] = createPoseSVG({
  id: 'posture-reset-1',
  description: 'Cervical Spine Chin Tuck',
  figureElements: `
    <!-- Standing Legs -->
    <line x1="270" y1="510" x2="275" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <line x1="330" y1="510" x2="325" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <ellipse cx="270" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="330" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Tall Aligned Torso -->
    <path d="M 265 350 L 270 210 L 330 210 L 335 350 Z" fill="url(#shirt)"/>
    <!-- Arms resting along sides -->
    <path d="M 270 220 L 250 320 L 255 380" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="255" cy="380" r="10" fill="url(#skin)"/>
    <path d="M 330 220 L 350 320 L 345 380" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="345" cy="380" r="10" fill="url(#skin)"/>
    <!-- Upright Neck & Head tucked horizontally back -->
    <line x1="300" y1="210" x2="300" y2="165" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="295" cy="135" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 272 120 C 272 90 318 90 318 120 Z" fill="#451a03"/>
    <!-- Horizontal Chin Tuck Arrow (Retracting backward) -->
    <path d="M 335 140 L 305 140" stroke="#0d9488" stroke-width="4" stroke-linecap="round"/>
    <polygon points="310,133 300,140 310,147" fill="#0d9488"/>
    <!-- Vertical Alignment Axis (Crown to Pelvis) -->
    <line x1="300" y1="70" x2="300" y2="480" stroke="#0d9488" stroke-width="2.5" stroke-dasharray="6 6" opacity="0.6"/>
  `
});

// Step 3: Overhead Y-Reach (Standing tall, arms spread in wide overhead Y)
poses['posture-reset-3'] = createPoseSVG({
  id: 'posture-reset-3',
  description: 'Overhead Y-Reach',
  figureElements: `
    <line x1="270" y1="510" x2="275" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <line x1="330" y1="510" x2="325" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <ellipse cx="270" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="330" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 265 350 L 270 210 L 330 210 L 335 350 Z" fill="url(#shirt)"/>
    <line x1="300" y1="210" x2="300" y2="165" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="135" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 276 120 C 276 90 324 90 324 120 Z" fill="#451a03"/>
    <!-- Both Arms Extended in Wide Overhead Y (45 degrees) -->
    <path d="M 270 215 L 205 110 L 175 60" stroke="url(#shirt)" stroke-width="20" stroke-linecap="round" fill="none"/>
    <circle cx="175" cy="60" r="10" fill="url(#skin)"/>
    <path d="M 330 215 L 395 110 L 425 60" stroke="url(#shirt)" stroke-width="20" stroke-linecap="round" fill="none"/>
    <circle cx="425" cy="60" r="10" fill="url(#skin)"/>
    <!-- Wide Y Stretch Angle Rays -->
    <line x1="300" y1="210" x2="175" y2="60" stroke="#0d9488" stroke-width="2" stroke-dasharray="4 4" opacity="0.5"/>
    <line x1="300" y1="210" x2="425" y2="60" stroke="#0d9488" stroke-width="2" stroke-dasharray="4 4" opacity="0.5"/>
  `
});

// Step 4: Tall Mountain Alignment (Tadasana - standing perfectly aligned, arms down)
poses['posture-reset-4'] = createPoseSVG({
  id: 'posture-reset-4',
  description: 'Tall Mountain Alignment (Tadasana)',
  figureElements: `
    <line x1="280" y1="510" x2="280" y2="350" stroke="url(#pants)" stroke-width="34" stroke-linecap="round"/>
    <line x1="320" y1="510" x2="320" y2="350" stroke="url(#pants)" stroke-width="34" stroke-linecap="round"/>
    <ellipse cx="280" cy="515" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="320" cy="515" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 265 350 L 270 210 L 330 210 L 335 350 Z" fill="url(#shirt)"/>
    <!-- Arms relaxed along side body, palms forward -->
    <path d="M 270 220 L 250 310 L 250 390" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="250" cy="395" rx="8" ry="12" fill="url(#skin)"/>
    <path d="M 330 220 L 350 310 L 350 390" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="350" cy="395" rx="8" ry="12" fill="url(#skin)"/>
    <line x1="300" y1="210" x2="300" y2="165" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="135" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 276 120 C 276 90 324 90 324 120 Z" fill="#451a03"/>
    <!-- Vertical Alignment Golden Line -->
    <line x1="300" y1="60" x2="300" y2="510" stroke="#10b981" stroke-width="3" stroke-dasharray="6 6" opacity="0.6"/>
  `
});

// ==========================================
// 4. FULL BODY RESET (full-body-reset)
// ==========================================

// Step 2: Gentle Soft-Knee Forward Fold (Uttanasana)
poses['full-body-reset-2'] = createPoseSVG({
  id: 'full-body-reset-2',
  description: 'Gentle Soft-Knee Forward Fold (Uttanasana)',
  figureElements: `
    <ellipse cx="270" cy="515" rx="22" ry="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="310" cy="515" rx="22" ry="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 515 L 268 390 Q 275 350 282 310" stroke="url(#pants)" stroke-width="36" stroke-linecap="round" fill="none"/>
    <path d="M 300 515 L 308 390 Q 315 350 322 310" stroke="url(#pants)" stroke-width="36" stroke-linecap="round" fill="none"/>
    <path d="M 270 310 Q 290 270 330 270 Q 370 270 370 320" fill="url(#pants)"/>
    <!-- Torso folding down against thighs -->
    <path d="M 320 270 Q 360 270 375 330 L 360 430 L 310 430 L 300 330 Z" fill="url(#shirt)"/>
    <path d="M 335 430 L 335 460" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="335" cy="485" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 315 470 C 315 440 355 440 355 470 C 355 490 345 510 335 525 Z" fill="#451a03"/>
    <path d="M 335 515 Q 340 545 332 555" stroke="#451a03" stroke-width="12" stroke-linecap="round" fill="none"/>
    <!-- Arms dangling to feet -->
    <path d="M 320 420 L 290 490 L 285 520" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="285" cy="522" r="10" fill="url(#skin)"/>
    <path d="M 350 420 L 320 490 L 315 520" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="315" cy="522" r="10" fill="url(#skin)"/>
    <!-- Downward Spinal Release Indicator -->
    <path d="M 390 290 Q 410 360 380 440" stroke="#7c3aed" stroke-width="3.5" stroke-dasharray="6 6" fill="none"/>
    <polygon points="375,445 385,445 380,455" fill="#7c3aed"/>
  `
});

// Step 3: Standing Hip Circles (Hands on hips circling pelvis)
poses['full-body-reset-3'] = createPoseSVG({
  id: 'full-body-reset-3',
  description: 'Standing Hip Circles',
  figureElements: `
    <line x1="265" y1="510" x2="270" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <line x1="335" y1="510" x2="330" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <ellipse cx="265" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="335" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 350 L 270 210 L 330 210 L 340 350 Z" fill="url(#shirt)"/>
    <!-- Hands Placed Firmly on Hips -->
    <path d="M 270 220 L 230 270 L 265 315" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="265" cy="315" r="10" fill="url(#skin)"/>
    <path d="M 330 220 L 370 270 L 335 315" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="335" cy="315" r="10" fill="url(#skin)"/>
    <line x1="300" y1="210" x2="300" y2="165" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="135" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 276 120 C 276 90 324 90 324 120 Z" fill="#451a03"/>
    <!-- Pelvic Orbit Hip Circle -->
    <ellipse cx="300" cy="335" rx="70" ry="24" fill="none" stroke="#7c3aed" stroke-width="4" stroke-dasharray="6 6"/>
    <polygon points="360,330 372,338 362,345" fill="#7c3aed"/>
  `
});

// Step 4: Victorious Whole Body Reset (Shake out, giant breath)
poses['full-body-reset-4'] = createPoseSVG({
  id: 'full-body-reset-4',
  description: 'Victorious Whole Body Reset',
  figureElements: `
    <line x1="270" y1="510" x2="275" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <line x1="330" y1="510" x2="325" y2="350" stroke="url(#pants)" stroke-width="36" stroke-linecap="round"/>
    <ellipse cx="270" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="330" cy="515" rx="20" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 265 350 L 270 210 L 330 210 L 335 350 Z" fill="url(#shirt)"/>
    <line x1="300" y1="210" x2="300" y2="165" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="135" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 276 120 C 276 90 324 90 324 120 Z" fill="#451a03"/>
    <!-- Both Arms Wide Victorious Reach -->
    <path d="M 270 215 L 210 120 L 190 60" stroke="url(#shirt)" stroke-width="20" stroke-linecap="round" fill="none"/>
    <circle cx="190" cy="60" r="10" fill="url(#skin)"/>
    <path d="M 330 215 L 390 120 L 410 60" stroke="url(#shirt)" stroke-width="20" stroke-linecap="round" fill="none"/>
    <circle cx="410" cy="60" r="10" fill="url(#skin)"/>
    <!-- Radiant Golden Sunlight Waves -->
    <circle cx="300" cy="60" r="28" fill="#fef08a" opacity="0.6"/>
    <circle cx="300" cy="60" r="48" fill="none" stroke="#facc15" stroke-width="3" stroke-dasharray="6 6" opacity="0.7"/>
  `
});

// ==========================================
// 5. STANDING ENERGIZER (standing-energizer)
// ==========================================

// Step 3: Shake Out Hands & Limbs (Kinetic shaking of limbs)
poses['standing-energizer-3'] = createPoseSVG({
  id: 'standing-energizer-3',
  description: 'Shake Out Hands & Limbs',
  figureElements: `
    <line x1="275" y1="510" x2="280" y2="350" stroke="url(#pants)" stroke-width="34" stroke-linecap="round"/>
    <line x1="325" y1="510" x2="320" y2="350" stroke="url(#pants)" stroke-width="34" stroke-linecap="round"/>
    <ellipse cx="275" cy="515" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="325" cy="515" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 265 350 L 270 210 L 330 210 L 335 350 Z" fill="url(#shirt)"/>
    <!-- Shaking Arms with Vibration Waves -->
    <path d="M 270 220 Q 230 270 200 310" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="200" cy="310" r="10" fill="url(#skin)"/>
    <path d="M 330 220 Q 370 270 400 310" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="400" cy="310" r="10" fill="url(#skin)"/>
    <line x1="300" y1="210" x2="300" y2="165" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="135" rx="26" ry="30" fill="url(#skin)"/>
    <path d="M 276 120 C 276 90 324 90 324 120 Z" fill="#451a03"/>
    <!-- Vibration Ripples at Wrists & Feet -->
    <path d="M 180 300 Q 185 310 180 320" stroke="#7c3aed" stroke-width="3" fill="none"/>
    <path d="M 170 295 Q 175 310 170 325" stroke="#7c3aed" stroke-width="3" fill="none"/>
    <path d="M 420 300 Q 415 310 420 320" stroke="#7c3aed" stroke-width="3" fill="none"/>
    <path d="M 430 295 Q 425 310 430 325" stroke="#7c3aed" stroke-width="3" fill="none"/>
  `
});

// ==========================================
// 6. EYE BREAK (eye-break)
// ==========================================

// Step 1: 20-20-20 Rule (Gazing 20 feet away into the distance / window)
poses['eye-break-1'] = createPoseSVG({
  id: 'eye-break-1',
  description: '20-20-20 Rule: Gaze 20 Feet Away',
  figureElements: `
    <!-- Window with Distant Sun and Clouds -->
    <rect x="360" y="80" width="180" height="240" rx="16" fill="#e0f2fe" stroke="#93c5fd" stroke-width="4"/>
    <circle cx="480" cy="140" r="28" fill="#fef08a"/>
    <path d="M 380 220 Q 410 200 440 220 Q 470 200 500 220" stroke="#bae6fd" stroke-width="6" fill="none"/>
    ${officeChairSVG}
    <!-- Desk edge -->
    <rect x="120" y="370" width="220" height="20" rx="6" fill="#e2e8f0"/>
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 395 L 270 240 L 330 240 L 340 395 Z" fill="url(#shirt)"/>
    <!-- Hands resting calmly on desk -->
    <path d="M 270 250 L 230 320 L 260 370" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="260" cy="370" r="10" fill="url(#skin)"/>
    <!-- Head turned right gazing peaceful out window -->
    <line x1="300" y1="240" x2="305" y2="195" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="305" cy="165" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 280 150 C 280 120 330 120 330 150 Z" fill="#451a03"/>
    <!-- Calm Open Eye Looking toward Window -->
    <ellipse cx="320" cy="162" rx="4" ry="3" fill="#1e293b"/>
    <!-- Distant Sight Line Rays -->
    <line x1="330" y1="162" x2="440" y2="145" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 6"/>
  `
});

// Step 2: Mindful Blinking (Slow deliberate blinks to lubricate eyes)
poses['eye-break-2'] = createPoseSVG({
  id: 'eye-break-2',
  description: 'Mindful Blinking Sequence',
  figureElements: `
    ${officeChairSVG}
    <rect x="120" y="370" width="220" height="20" rx="6" fill="#e2e8f0"/>
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 395 L 270 240 L 330 240 L 340 395 Z" fill="url(#shirt)"/>
    <path d="M 270 250 L 230 320 L 260 370" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="260" cy="370" r="10" fill="url(#skin)"/>
    <line x1="300" y1="240" x2="300" y2="195" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="165" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 275 150 C 275 120 325 120 325 150 Z" fill="#451a03"/>
    <!-- Gentle Blinking Eyes (Lashes closed) -->
    <path d="M 288 165 Q 295 170 300 165" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 305 165 Q 312 170 318 165" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Refreshing Moisture Sparkles around Eyes -->
    <circle cx="300" cy="145" r="4" fill="#38bdf8"/>
    <circle cx="280" cy="155" r="3" fill="#38bdf8"/>
    <circle cx="325" cy="155" r="3" fill="#38bdf8"/>
  `
});

// ==========================================
// 7. FOCUS RESET (focus-reset)
// ==========================================

// Step 1: Visual Grounding - Observe 3 Objects
poses['focus-reset-1'] = createPoseSVG({
  id: 'focus-reset-1',
  description: 'Visual Grounding: Observe 3 Objects',
  figureElements: `
    <!-- Desk with 3 Distinct Objects: Plant, Book, Cup -->
    <rect x="120" y="370" width="360" height="20" rx="6" fill="#e2e8f0"/>
    <!-- Object 1: Plant -->
    <rect x="150" y="330" width="24" height="40" rx="6" fill="#fcd34d"/>
    <path d="M 162 330 C 150 300 170 300 162 330 Z" fill="#22c55e"/>
    <!-- Object 2: Book -->
    <rect x="210" y="355" width="45" height="15" rx="3" fill="#60a5fa"/>
    <!-- Object 3: Cup -->
    <rect x="420" y="340" width="25" height="30" rx="6" fill="#f43f5e"/>
    <!-- Person Mindfully Scanning Desk -->
    ${officeChairSVG}
    <path d="M 260 395 L 270 240 L 330 240 L 340 395 Z" fill="url(#shirt)"/>
    <path d="M 270 250 L 240 330 L 280 370" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="280" cy="370" r="10" fill="url(#skin)"/>
    <line x1="300" y1="240" x2="300" y2="195" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="165" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 275 150 C 275 120 325 120 325 150 Z" fill="#451a03"/>
    <!-- Attentive Open Eyes Observing -->
    <circle cx="292" cy="165" r="3.5" fill="#1e293b"/>
    <circle cx="308" cy="165" r="3.5" fill="#1e293b"/>
    <!-- 3 Glowing Visual Markers -->
    <circle cx="162" cy="310" r="8" fill="none" stroke="#22c55e" stroke-width="2"/>
    <circle cx="232" cy="345" r="8" fill="none" stroke="#60a5fa" stroke-width="2"/>
    <circle cx="432" cy="330" r="8" fill="none" stroke="#f43f5e" stroke-width="2"/>
  `
});

// Step 2: Tactile Grounding - Notice 2 Physical Textures (Hands on desk, feet on floor)
poses['focus-reset-2'] = createPoseSVG({
  id: 'focus-reset-2',
  description: 'Tactile Grounding: Feel Physical Textures',
  figureElements: `
    <rect x="140" y="370" width="320" height="20" rx="6" fill="#e2e8f0"/>
    ${officeChairSVG}
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <!-- Feet Firmly Grounded with Contact Glow -->
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#10b981" stroke-width="3"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#10b981" stroke-width="3"/>
    <path d="M 260 395 L 270 240 L 330 240 L 340 395 Z" fill="url(#shirt)"/>
    <!-- Both Hands Resting Flat on Desk Feeling Surface Texture -->
    <path d="M 270 250 L 225 320 L 250 370" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="250" cy="370" rx="14" ry="8" fill="url(#skin)"/>
    <path d="M 330 250 L 375 320 L 350 370" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="350" cy="370" rx="14" ry="8" fill="url(#skin)"/>
    <line x1="300" y1="240" x2="300" y2="195" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="165" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 275 150 C 275 120 325 120 325 150 Z" fill="#451a03"/>
    <!-- Tactile Ripples on Palms and Feet -->
    <ellipse cx="250" cy="370" rx="20" ry="12" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3 3"/>
    <ellipse cx="350" cy="370" rx="20" ry="12" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3 3"/>
  `
});

// Step 3: Auditory Presence - Mindful Listening
poses['focus-reset-3'] = createPoseSVG({
  id: 'focus-reset-3',
  description: 'Auditory Presence: Mindful Listening',
  figureElements: `
    ${officeChairSVG}
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 395 L 270 240 L 330 240 L 340 395 Z" fill="url(#shirt)"/>
    <!-- One Hand Gently Raised Near Ear in Listening Posture -->
    <path d="M 330 250 Q 380 220 350 180" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="350" cy="180" r="10" fill="url(#skin)"/>
    <path d="M 270 250 L 250 330 L 270 380" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <circle cx="270" cy="380" r="10" fill="url(#skin)"/>
    <!-- Head Slightly Tilted, Eyes Closed Listening -->
    <g transform="rotate(10, 300, 210)">
      <line x1="300" y1="240" x2="300" y2="195" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
      <ellipse cx="300" cy="165" rx="28" ry="32" fill="url(#skin)"/>
      <path d="M 275 150 C 275 120 325 120 325 150 Z" fill="#451a03"/>
    </g>
    <!-- Ambient Sound Waves Radiating Toward Ear -->
    <path d="M 375 160 Q 385 175 375 190" stroke="#7c3aed" stroke-width="3" fill="none"/>
    <path d="M 390 150 Q 405 175 390 200" stroke="#7c3aed" stroke-width="3" fill="none"/>
    <path d="M 405 140 Q 425 175 405 210" stroke="#7c3aed" stroke-width="3" fill="none"/>
  `
});

// Step 4: Centering Diaphragmatic Breath (Hand on heart & belly)
poses['focus-reset-4'] = createPoseSVG({
  id: 'focus-reset-4',
  description: 'Centering Diaphragmatic Breath',
  figureElements: `
    ${officeChairSVG}
    <path d="M 260 395 L 260 480 L 290 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <path d="M 330 395 L 330 480 L 360 480" stroke="url(#pants)" stroke-width="32" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <ellipse cx="365" cy="485" rx="18" ry="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M 260 395 L 270 240 L 330 240 L 340 395 Z" fill="url(#shirt)"/>
    <!-- Left Hand Resting on Chest / Heart -->
    <path d="M 270 250 Q 260 280 295 285" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="295" cy="285" rx="12" ry="8" fill="url(#skin)"/>
    <!-- Right Hand Resting on Lower Belly -->
    <path d="M 330 250 Q 340 330 305 345" stroke="url(#shirt)" stroke-width="18" stroke-linecap="round" fill="none"/>
    <ellipse cx="305" cy="345" rx="12" ry="8" fill="url(#skin)"/>
    <line x1="300" y1="240" x2="300" y2="195" stroke="url(#skin)" stroke-width="20" stroke-linecap="round"/>
    <ellipse cx="300" cy="165" rx="28" ry="32" fill="url(#skin)"/>
    <path d="M 275 150 C 275 120 325 120 325 150 Z" fill="#451a03"/>
    <!-- Centering Breath Aura Waves -->
    <circle cx="300" cy="315" r="45" fill="none" stroke="#7c3aed" stroke-width="3" stroke-dasharray="6 6" opacity="0.7"/>
    <circle cx="300" cy="315" r="30" fill="#c4b5fd" opacity="0.3"/>
  `
});

// Write all custom poses
let count = 0;
for (const [key, svg] of Object.entries(poses)) {
  fs.writeFileSync(path.join(outDir, `${key}.svg`), svg);
  count++;
}

console.log(`Successfully generated ${count} exact posture SVG illustrations!`);
