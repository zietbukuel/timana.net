import React from 'react';

export default function SkillCircle({ name, value }) {
  const radius = 64;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius; // ~402.12
  const gapPercentage = 100 - value;
  const strokeDashoffset = circumference - (gapPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="w-[150px] h-[150px] flex items-center justify-center transition-transform duration-300 hover:scale-105 select-none pointer-events-none">
        <svg width="150" height="150" className="transform -rotate-90">
          {/* Background track circle (dark gray #404148) */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="transparent"
            stroke="#404148"
            strokeWidth={strokeWidth}
          />
          {/* White slice gap circle (white #ffffff) */}
          <circle
            cx="75"
            cy="75"
            r={radius}
            fill="transparent"
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
          {/* Outer thin white border (2px) */}
          <circle
            cx="75"
            cy="75"
            r="74"
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="2"
          />
          {/* Inner thin white border (2px) */}
          <circle
            cx="75"
            cy="75"
            r="54"
            fill="transparent"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </svg>
      </div>
      <figcaption className="text-sm font-sans font-bold text-white uppercase tracking-wider px-2 max-w-[220px] leading-relaxed">
        {name}
      </figcaption>
    </div>
  );
}
