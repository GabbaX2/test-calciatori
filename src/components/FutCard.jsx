import React, { useState, useRef } from 'react';
import { CATEGORIES } from '../data/categories';
import { PersonalityRadar } from './PersonalityRadar';
import { Award, Zap, Shield, Flame, Activity } from 'lucide-react';

export const FutCard = ({
  player,
  userProfile = { name: '', number: '' },
  affinityScore = null,
  userVector = null,
  interactive = true,
  size = 'normal', // 'normal' | 'compact' | 'mini'
}) => {
  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'radar' | 'lore'
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const categoryConfig = CATEGORIES[player.category] || CATEGORIES.provincia;
  const theme = categoryConfig.cardTheme;

  const handleMouseMove = (e) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    if (interactive) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const isMini = size === 'mini';
  const isCompact = size === 'compact';

  return (
    <div
      className={`perspective-1000 transition-transform select-none ${
        isMini ? 'w-full max-w-[220px]' : isCompact ? 'w-full max-w-[320px]' : 'w-full max-w-[420px]'
      }`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          boxShadow: isHovered
            ? `0 20px 40px -15px ${theme.glowColor}, 0 0 25px ${theme.glowColor}`
            : `0 10px 30px -15px rgba(0,0,0,0.8), 0 0 15px ${theme.glowColor}`
        }}
        className={`relative rounded-3xl p-1 bg-gradient-to-b ${theme.borderGradient} transition-all duration-300 card-holo`}
      >
        {/* Card Body */}
        <div
          className={`relative rounded-[22px] bg-gradient-to-b ${theme.bgGradient} p-4 md:p-5 text-white overflow-hidden border border-white/10`}
        >
          {/* Subtle background stadium pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* User attribution banner if available */}
          {userProfile?.name && !isMini && (
            <div className="mb-2 -mx-2 -mt-1 bg-black/60 backdrop-blur-md border-b border-white/10 px-3 py-1.5 flex items-center justify-between text-xs rounded-t-xl">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ALTER EGO DI: <strong className="text-white uppercase tracking-wider">{userProfile.name}</strong>
              </span>
              {userProfile.number && (
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-yellow-400 font-extrabold text-[11px]">
                  #{userProfile.number}
                </span>
              )}
            </div>
          )}

          {/* Affinity badge if score exists */}
          {affinityScore !== null && (
            <div className="absolute top-3 right-3 z-20">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/90 text-black shadow-lg shadow-emerald-500/30 tracking-tight">
                <Flame className="w-3.5 h-3.5 fill-black" />
                {affinityScore}% AFFINITÀ
              </span>
            </div>
          )}

          {/* Top Row: OVR, Position, Flag, Club */}
          <div className="flex items-start justify-between relative z-10">
            {/* OVR & Position Stack */}
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black fut-font tracking-tighter leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-white">
                {player.ovr}
              </span>
              <span className="text-sm md:text-base font-extrabold fut-font uppercase tracking-wider text-slate-300 mt-0.5">
                {player.role}
              </span>
              <div className="w-6 h-[1.5px] bg-white/30 my-1" />
              <span className="text-base" title={player.nation}>{player.nation}</span>
            </div>

            {/* Center: Big Avatar Emoji / Character */}
            <div className="relative flex-1 flex flex-col items-center justify-center -mt-1">
              {/* Glowing Aura behind avatar */}
              <div
                className="absolute w-24 h-24 rounded-full blur-2xl opacity-60 pointer-events-none"
                style={{ backgroundColor: theme.accentColor }}
              />
              <div className="relative z-10 text-6xl md:text-7xl filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] animate-float">
                {player.avatarEmoji}
              </div>
              <span className="text-[10px] md:text-xs text-slate-400 font-semibold tracking-wide mt-1 text-center truncate max-w-[160px]">
                {player.clubHint}
              </span>
            </div>

            {/* Category Emblem Badge */}
            <div className="flex flex-col items-end">
              <div className={`px-2 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${theme.badgeBg}`}>
                {categoryConfig.badge}
              </div>
              <span className="text-lg mt-1">{categoryConfig.emoji}</span>
            </div>
          </div>

          {/* Player Name & Nickname */}
          <div className="mt-3 text-center border-t border-b border-white/10 py-1.5 relative z-10">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white fut-font drop-shadow-md leading-none">
              {player.name}
            </h3>
            <p className="text-xs md:text-sm font-semibold italic text-slate-300 tracking-wide mt-0.5">
              "{player.nickname}"
            </p>
          </div>

          {/* Special Move Pill */}
          <div className="my-2.5 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200">
              <Zap className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
              <span className="font-semibold truncate max-w-[280px]">
                {player.specialMove}
              </span>
            </div>
          </div>

          {/* Interactive Navigation Tabs (only for non-mini) */}
          {!isMini && (
            <div className="flex items-center justify-center gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setActiveTab('stats')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'stats'
                    ? 'bg-white/20 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📊 Statistiche FUT
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('radar')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'radar'
                    ? 'bg-white/20 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🎯 Radar Personalità
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lore')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'lore'
                    ? 'bg-white/20 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📖 Cult & Storia
              </button>
            </div>
          )}

          {/* TAB 1: FUT Stats Grid */}
          {(activeTab === 'stats' || isMini) && (
            <div className="grid grid-cols-6 gap-1 md:gap-1.5 py-1 text-center font-bold">
              {[
                { label: 'VEL', val: player.futStats.vel },
                { label: 'TIR', val: player.futStats.tir },
                { label: 'PAS', val: player.futStats.pas },
                { label: 'DRI', val: player.futStats.dri },
                { label: 'DIF', val: player.futStats.dif },
                { label: 'FIS', val: player.futStats.fis }
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-lg p-1.5 border ${theme.statBg} flex flex-col items-center justify-center`}
                >
                  <span className="text-base md:text-lg font-black fut-font leading-none text-white">
                    {stat.val}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: Radar Personalità */}
          {!isMini && activeTab === 'radar' && (
            <div className="py-1">
              <PersonalityRadar
                playerVector={player.radar}
                userVector={userVector}
                size={230}
                accentColor={theme.accentColor}
                showLabels={true}
              />
            </div>
          )}

          {/* TAB 3: Cult & Descrizione */}
          {!isMini && activeTab === 'lore' && (
            <div className="space-y-2 py-1 text-xs">
              <div className="bg-black/40 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  💬 Frase Storica:
                </span>
                <p className="italic text-slate-200 leading-relaxed font-serif">
                  "{player.quote}"
                </p>
              </div>
              <div className="bg-black/30 border border-white/5 rounded-xl p-2.5 text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  📰 Profilo Ignorante:
                </span>
                {player.desc}
              </div>
            </div>
          )}

          {/* Footer Quote Snippet (always visible in stats tab) */}
          {(activeTab === 'stats' || isMini) && (
            <div className="mt-3 pt-2 border-t border-white/10 text-center">
              <p className="text-[11px] md:text-xs italic text-slate-300/90 line-clamp-2 px-1">
                "{player.quote}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
