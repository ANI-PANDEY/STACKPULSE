import React from 'react';

export default function AnimatedBackgroundPulse({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-500">

      {/* Drifting Ambient Neon Orbs */}
      <div className={`absolute top-[-10%] left-[20%] w-[600px] h-[600px] blur-[160px] rounded-full animate-drift-1 ${isDark ? 'bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-transparent' : 'bg-gradient-to-tr from-emerald-200/50 via-teal-200/30 to-transparent'
        }`} />
      <div className={`absolute top-[35%] right-[-10%] w-[700px] h-[700px] blur-[180px] rounded-full animate-drift-2 ${isDark ? 'bg-gradient-to-bl from-indigo-600/20 via-purple-500/10 to-transparent' : 'bg-gradient-to-bl from-indigo-200/50 via-purple-200/30 to-transparent'
        }`} />
      <div className={`absolute top-[70%] left-[-5%] w-[550px] h-[550px] blur-[150px] rounded-full animate-drift-1 ${isDark ? 'bg-gradient-to-tr from-cyan-500/15 via-emerald-500/10 to-transparent' : 'bg-gradient-to-tr from-cyan-200/40 via-emerald-200/30 to-transparent'
        }`} />

      {/* Moving Pulse Wave SVG Line #1 (Top Hero Wave) */}
      <svg
        className={`absolute top-28 left-0 w-full h-[400px] ${isDark ? 'opacity-30' : 'opacity-40'}`}
        viewBox="0 0 1440 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,150 L350,150 L380,110 L410,210 L440,60 L470,240 L500,150 L850,150 L880,120 L900,190 L920,90 L950,210 L980,150 L1440,150"
          stroke="url(#pulseGradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse-wave"
        />
        <defs>
          <linearGradient id="pulseGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity={isDark ? "0.2" : "0.3"} />
            <stop offset="30%" stopColor="#059669" stopOpacity={isDark ? "0.9" : "0.8"} />
            <stop offset="60%" stopColor="#0284C7" stopOpacity={isDark ? "0.9" : "0.8"} />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity={isDark ? "0.2" : "0.3"} />
          </linearGradient>
        </defs>
      </svg>

      {/* Moving Pulse Wave SVG Line #2 (Lower Section Wave) */}
      <svg
        className={`absolute top-[50%] left-0 w-full h-[350px] ${isDark ? 'opacity-20' : 'opacity-30'}`}
        viewBox="0 0 1440 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,120 L200,120 L230,80 L260,180 L290,40 L320,200 L350,120 L700,120 L730,90 L750,160 L770,70 L800,180 L830,120 L1440,120"
          stroke="url(#pulseGradient2)"
          strokeWidth="2.5"
          strokeDasharray="600"
          className="animate-pulse-wave"
          style={{ animationDuration: '9s' }}
        />
        <defs>
          <linearGradient id="pulseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={isDark ? "0.1" : "0.2"} />
            <stop offset="50%" stopColor="#0284C7" stopOpacity={isDark ? "0.8" : "0.7"} />
            <stop offset="100%" stopColor="#10B981" stopOpacity={isDark ? "0.2" : "0.3"} />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle Moving Grid Texture */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.05]'}`}
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#34D399' : '#059669'} 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px'
        }}
      />

    </div>
  );
}
