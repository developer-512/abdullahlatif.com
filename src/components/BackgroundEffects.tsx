export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-orb-float-1" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-orb-float-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/[0.03] rounded-full blur-[140px] animate-orb-float-3" />

      {/* Subtle drifting grid */}
      <div className="absolute inset-0 opacity-[0.03] animate-grid-drift bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating particles */}
      <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-emerald-400/30 rounded-full animate-particle-1" />
      <div className="absolute top-[60%] left-[80%] w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-particle-2" />
      <div className="absolute top-[35%] right-[20%] w-1 h-1 bg-purple-400/25 rounded-full animate-particle-3" />
      <div className="absolute bottom-[25%] left-[40%] w-0.5 h-0.5 bg-emerald-300/20 rounded-full animate-particle-4" />
    </div>
  );
}
