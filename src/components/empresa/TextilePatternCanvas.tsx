"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface TextilePatternCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function TextilePatternCanvas({
  scrollYProgress,
}: TextilePatternCanvasProps) {
  // Parallax translation transforms for different layers
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yMoldBody = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yFrenchCurves = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yAnnotations = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const ySeams = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden md:h-[600px] lg:h-full">
      {/* Background Tech Label */}
      <div className="absolute top-8 right-8 font-mono text-[10px] font-bold tracking-[0.25em] text-[#143067] uppercase opacity-60">
        LIS-2005 // SCHEMA_V5
      </div>

      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full max-h-[550px] w-full max-w-[550px] text-[#143067] opacity-85 select-none"
      >
        <defs>
          {/* Engineering drafting grid pattern */}
          <pattern
            id="grid-dots"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1"
              fill="currentColor"
              className="opacity-15"
            />
          </pattern>
        </defs>

        {/* LAYER 1: Background Grid */}
        <motion.rect
          width="600"
          height="600"
          fill="url(#grid-dots)"
          style={{ y: yGrid }}
        />

        {/* LAYER 2: Main Mold Contours (Sleeve & Bodice drafts) */}
        <motion.g style={{ y: yMoldBody }} className="opacity-30">
          {/* Sleeve Pattern Outline */}
          <path
            d="M 100,500 C 120,400 160,350 250,350 C 340,350 380,400 400,500 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6,4"
          />
          {/* Main Bodice Side Seam Curve */}
          <path
            d="M 120,200 C 150,220 180,280 180,350 L 120,450"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Technical Alignment Crosses */}
          <path
            d="M 240,350 M 240,340 L 240,360 M 230,350 L 250,350"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M 180,280 M 180,270 L 180,290 M 170,280 L 190,280"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </motion.g>

        {/* LAYER 3: French Curves (Sartorial curves in brand accent color) */}
        <motion.g style={{ y: yFrenchCurves }} className="opacity-70">
          {/* French Curve Template 1 (Primary Blue) */}
          <path
            d="M 80,480 C 160,380 320,320 480,280 C 500,275 420,360 380,400 C 260,520 100,500 80,480 Z"
            fill="currentColor"
            fillOpacity="0.03"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* French Curve Template 2 (Brand Red Accent) */}
          <path
            d="M 450,150 C 350,160 220,220 120,380 C 140,320 280,200 450,150 Z"
            fill="#143067"
            fillOpacity="0.02"
            stroke="#143067"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Measurement Ticks along Curve 1 */}
          <path
            d="M 200,348 L 198,354 M 220,343 L 218,349 M 240,339 L 238,345 M 260,335 L 258,341 M 280,331 L 278,337"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          {/* Measurement Ticks along Curve 2 (Red Accent) */}
          <path
            d="M 320,182 L 322,176 M 300,192 L 302,186 M 280,203 L 282,197 M 260,215 L 262,209 M 240,228 L 242,222"
            stroke="#143067"
            strokeWidth="0.8"
          />
        </motion.g>

        {/* LAYER 4: Seam & Cut Guidelines */}
        <motion.g style={{ y: ySeams }} className="opacity-50">
          {/* Straight seam guideline with cut marker */}
          <line
            x1="50"
            y1="250"
            x2="550"
            y2="250"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3,6"
          />
          {/* Scissors indicator point */}
          <circle cx="500" cy="250" r="3" fill="#143067" />
          <path
            d="M 495,245 L 505,255 M 495,255 L 505,245"
            stroke="#143067"
            strokeWidth="1"
          />

          {/* Parallel seam allowance boundary */}
          <line
            x1="50"
            y1="265"
            x2="550"
            y2="265"
            stroke="currentColor"
            strokeWidth="0.75"
          />

          {/* Radial angles for collar radius */}
          <path
            d="M 450,150 A 150,150 0 0,0 300,300"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2,2"
          />
          <line
            x1="450"
            y1="150"
            x2="300"
            y2="300"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </motion.g>

        {/* LAYER 5: Technical Annotations & Labels */}
        <motion.g
          style={{ y: yAnnotations }}
          className="font-mono text-[9px] tracking-widest opacity-60"
        >
          {/* Typography markers */}
          <text x="90" y="495" fill="currentColor">
            R_MIN: 120mm
          </text>
          <text x="390" y="278" fill="currentColor">
            SEAM_ALLOWANCE: 15mm
          </text>
          <text x="130" y="240" fill="currentColor">
            DRAFT_PLANE: A-A
          </text>
          <text x="350" y="140" fill="#143067">
            SHOULDER_CURVE: R-45
          </text>
          <text x="410" y="520" fill="currentColor">
            GRAIN_LINE ──►
          </text>
          <text x="210" y="375" fill="currentColor">
            SLEEVE_CAP_HEM
          </text>

          {/* Geometric reference boxes */}
          <rect
            x="50"
            y="50"
            width="80"
            height="25"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeDasharray="2,2"
          />
          <text x="60" y="65" fill="currentColor" className="text-[7px]">
            SCALE: 1:1
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
