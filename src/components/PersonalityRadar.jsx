import React from 'react';

export const AXES = [
  { key: 'tec', label: 'TEC', fullName: 'Tecnica & Fantasia', emoji: '🪄' },
  { key: 'ign', label: 'IGN', fullName: 'Ignoranza & Tibia', emoji: '🦿' },
  { key: 'not', label: 'NOT', fullName: 'Vita Notturna & Terzo Tempo', emoji: '🍾' },
  { key: 'ego', label: 'EGO', fullName: 'Ego & Carisma', emoji: '👑' },
  { key: 'fol', label: 'FOL', fullName: 'Follia & Meme', emoji: '🤪' },
  { key: 'pro', label: 'PRO', fullName: 'Cuore di Provincia', emoji: '🚜' }
];

export const PersonalityRadar = ({
  playerVector,
  userVector,
  size = 280,
  accentColor = '#e2b34a',
  showLabels = true
}) => {
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = AXES.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Grid levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (value, index) => {
    // Start from top (- PI / 2)
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const makePolygonPath = (vector) => {
    if (!vector) return '';
    return AXES.map((axis, i) => {
      const val = Math.max(10, Math.min(100, vector[axis.key] ?? 50));
      const { x, y } = getCoordinates(val, i);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ') + ' Z';
  };

  const playerPath = makePolygonPath(playerVector);
  const userPath = userVector ? makePolygonPath(userVector) : null;

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Circular background glow */}
        <circle cx={center} cy={center} r={radius} fill="url(#radarGlow)" />

        {/* Concentric grid webs */}
        {levels.map((lvl) => {
          const webPath = AXES.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = radius * lvl;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
          }).join(' ') + ' Z';

          return (
            <path
              key={lvl}
              d={webPath}
              fill="none"
              stroke="#2a354c"
              strokeWidth={lvl === 1 ? '1.5' : '1'}
              strokeDasharray={lvl === 1 ? 'none' : '3 3'}
              opacity={0.7}
            />
          );
        })}

        {/* Axis radial spokes */}
        {AXES.map((axis, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const endX = center + radius * Math.cos(angle);
          const endY = center + radius * Math.sin(angle);
          const labelDist = radius + 22;
          const labelX = center + labelDist * Math.cos(angle);
          const labelY = center + labelDist * Math.sin(angle) + 4;

          return (
            <g key={axis.key}>
              <line
                x1={center}
                y1={center}
                x2={endX}
                y2={endY}
                stroke="#1e293b"
                strokeWidth="1.2"
              />
              {showLabels && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="bold"
                  className="tracking-wider"
                >
                  {axis.label}
                </text>
              )}
            </g>
          );
        })}

        {/* User Polygon (if provided, in vibrant cyan) */}
        {userPath && (
          <path
            d={userPath}
            fill="#00f0ff"
            fillOpacity="0.25"
            stroke="#00f0ff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}

        {/* Player Polygon (main, accent themed) */}
        {playerPath && (
          <path
            d={playerPath}
            fill={accentColor}
            fillOpacity="0.45"
            stroke={accentColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
          />
        )}

        {/* Radar Vertices Dots */}
        {AXES.map((axis, i) => {
          const val = playerVector?.[axis.key] ?? 50;
          const { x, y } = getCoordinates(val, i);
          return (
            <circle
              key={axis.key}
              cx={x}
              cy={y}
              r="4"
              fill={accentColor}
              stroke="#0f172a"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Legend / Axes Description Pills */}
      <div className="grid grid-cols-3 gap-2 mt-2 w-full max-w-sm px-2 text-xs">
        {AXES.map((axis) => {
          const pVal = playerVector?.[axis.key] ?? 50;
          const uVal = userVector?.[axis.key];
          return (
            <div
              key={axis.key}
              className="bg-slate-900/80 border border-slate-800 rounded p-1.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                <span>{axis.emoji} {axis.label}</span>
                <span style={{ color: accentColor }}>{pVal}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pVal}%`,
                    backgroundColor: accentColor
                  }}
                />
              </div>
              {uVal !== undefined && (
                <div className="text-[9px] text-cyan-400 mt-0.5 flex justify-between">
                  <span>Tu:</span>
                  <span>{uVal}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
