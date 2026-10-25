import React from 'react';

export default function AnimatedBackgroundPulse({ theme }) {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-opacity duration-500">

      {/* Soft Ambient Neon Radial Glows - Emerald Green (#10B981) & Vibrant Magenta/Pink (#EC4899) */}
      <div 
        className={`absolute top-[-8%] left-[10%] w-[680px] h-[680px] blur-[170px] rounded-full animate-drift-1 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-tr from-emerald-500/20 via-emerald-700/10 to-transparent' 
            : 'bg-gradient-to-tr from-emerald-400/15 via-teal-300/10 to-transparent'
        }`} 
      />
      <div 
        className={`absolute top-[30%] right-[-8%] w-[720px] h-[720px] blur-[180px] rounded-full animate-drift-2 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-bl from-pink-500/20 via-rose-600/15 to-transparent' 
            : 'bg-gradient-to-bl from-pink-400/15 via-rose-300/10 to-transparent'
        }`} 
      />
      <div 
        className={`absolute top-[65%] left-[-5%] w-[650px] h-[650px] blur-[160px] rounded-full animate-drift-1 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-tr from-emerald-600/15 via-pink-600/10 to-transparent' 
            : 'bg-gradient-to-tr from-emerald-400/10 via-pink-300/10 to-transparent'
        }`} 
      />

      {/* Moving Pulse Wave SVG Line #1 (Top Hero Heartbeat Wave in Green/Pink) */}
      <svg
        className={`absolute top-28 left-0 w-full h-[400px] ${isDark ? 'opacity-35' : 'opacity-25'}`}
        viewBox="0 0 1440 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,150 L350,150 L380,105 L410,215 L440,55 L470,245 L500,150 L850,150 L880,115 L900,195 L920,85 L950,215 L980,150 L1440,150"
          stroke="url(#cyberPulseGradient1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse-wave"
          style={{ filter: isDark ? 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.7))' : 'none' }}
        />
        <defs>
          <linearGradient id="cyberPulseGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity={isDark ? "0.2" : "0.3"} />
            <stop offset="25%" stopColor="#10B981" stopOpacity={isDark ? "0.95" : "0.9"} />
            <stop offset="50%" stopColor="#EF4444" stopOpacity={isDark ? "1" : "0.95"} />
            <stop offset="75%" stopColor="#10B981" stopOpacity={isDark ? "0.95" : "0.9"} />
            <stop offset="100%" stopColor="#EF4444" stopOpacity={isDark ? "0.2" : "0.3"} />
          </linearGradient>
        </defs>
      </svg>

      {/* Moving Pulse Wave SVG Line #2 (Lower Section Wave) */}
      <svg
        className={`absolute top-[52%] left-0 w-full h-[350px] ${isDark ? 'opacity-30' : 'opacity-20'}`}
        viewBox="0 0 1440 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,120 L200,120 L230,75 L260,185 L290,35 L320,205 L350,120 L700,120 L730,85 L750,165 L770,65 L800,185 L830,120 L1440,120"
          stroke="url(#cyberPulseGradient2)"
          strokeWidth="3"
          strokeDasharray="600"
          className="animate-pulse-wave"
          style={{ animationDuration: '8s', filter: isDark ? 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.6))' : 'none' }}
        />
        <defs>
          <linearGradient id="cyberPulseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={isDark ? "0.15" : "0.2"} />
            <stop offset="50%" stopColor="#10B981" stopOpacity={isDark ? "0.9" : "0.8"} />
            <stop offset="100%" stopColor="#EF4444" stopOpacity={isDark ? "0.2" : "0.2"} />
          </linearGradient>
        </defs>
      </svg>

      {/* Dotted Grid Texture */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-[0.04]' : 'opacity-[0.05]'}`}
        style={{
          backgroundImage: `radial-gradient(${isDark ? '#10B981' : '#0A0A0F'} 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px'
        }}
      />

    </div>
  );
}
