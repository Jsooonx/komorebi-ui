export const HERO_ROW_Y = 522;
export const CARD_SIZE = 220;

export const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const hoverEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export type Slot = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  z: number;
};

// Section 1 fan layout (relative to viewport center x, HERO_ROW_Y on y)
export const slots: Slot[] = [
  { x: -480, y: 22, rotate: -22, scale: 0.86, z: 1 },
  { x: -310, y: 8, rotate: -14, scale: 0.9, z: 2 },
  { x: -155, y: -2, rotate: -6, scale: 0.95, z: 3 },
  { x: 0, y: -10, rotate: 0, scale: 1.0, z: 4 },
  { x: 160, y: -2, rotate: 7, scale: 0.95, z: 3 },
  { x: 320, y: 8, rotate: 15, scale: 0.9, z: 2 },
  { x: 480, y: 22, rotate: 24, scale: 0.86, z: 1 },
];

// Section 2 cascade ladder (alternating staggered grid for Vesper's architectural rhythm)
export type Cascade = { top: number; left: number; rotate: number; z: number };
export const cascade: Cascade[] = Array.from({ length: 7 }, (_, i) => ({
  top: 112 + i * 72,
  left: 30 + (i % 2 === 0 ? 0 : 120),
  rotate: i % 2 === 0 ? -4 : 5,
  z: 7 - i,
}));

export const cardImages = [
  "/assets/vesper/card-1.png",
  "/assets/vesper/card-2.png",
  "/assets/vesper/card-3.png",
  "/assets/vesper/card-4.png",
  "/assets/vesper/card-5.png",
  "/assets/vesper/card-6.png",
  "/assets/vesper/card-7.png",
];

export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

// Cubic bezier easing: returns y (eased output) for input x in [0,1]
function cubicBezier(x1: number, y1: number, x2: number, y2: number): (x: number) => number {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDerivX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  const solveT = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleX(t) - x;
      const d = sampleDerivX(t);
      if (Math.abs(xEst) < 1e-6) break;
      if (Math.abs(d) < 1e-6) break;
      t -= xEst / d;
    }
    return clamp(t, 0, 1);
  };

  return (x: number) => sampleY(solveT(x));
}

// Given an eased-progress value, return the normalized time at which the
// easing reaches that progress (inverts the bezier's output).
export function getTimeForProgress(
  progress: number,
  ease: [number, number, number, number],
): number {
  const fn = cubicBezier(ease[0], ease[1], ease[2], ease[3]);
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (fn(mid) < progress) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
