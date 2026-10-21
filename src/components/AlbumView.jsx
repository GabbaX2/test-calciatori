import React, { useState, useMemo } from 'react';
import { playersDatabase } from '../data/playersDatabase';
import { CATEGORIES } from '../data/categories';
import { PlayerModal } from './PlayerModal';
import { Search, Filter, Sparkles, Trophy, Zap, Shield, Flame, BookOpen } from 'lucide-react';
import { playClick } from '../utils/soundEffects';

export const AlbumView = ({ defaultUserName = '', defaultUserNum = '10' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id'); // 'id' | 'ovr-desc' | 'name-asc'
  const [activePlayerModal, setActivePlayerModal] = useState(null);

  const categoryList = [
    { id: 'all', name: 'Tutti i Bomber', count: 100, emoji: '⚽' },
    { id: 'provincia', name: 'Eroi di Provincia', count: 20, emoji: '🚜' },
    { id: 'notte', name: 'Re della Notte', count: 20, emoji: '🍾' },
    { id: 'tibia', name: 'Tibia e Cuore', count: 20, emoji: '🦿' },
    { id: 'icona', name: 'Icone Supreme', count: 20, emoji: '👑' },
    { id: 'bug', name: 'Bug del Gioco', count: 20, emoji: '👾' },
  ];

  const filteredPlayers = useMemo(() => {
    let list = playersDatabase;

    // Filter category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.nickname.toLowerCase().includes(q) ||
        p.quote.toLowerCase().includes(q) ||
        p.clubHint.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q)
      );
    }

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === 'ovr-desc') return b.ovr - a.ovr;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return a.id - b.id; // default ID
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Album Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase mb-3">
          <BookOpen className="w-4 h-4" />
          <span>COLLEZIONE COMPLETA 100/100 CALCIATORI</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black fut-font text-white uppercase tracking-tight">
          Album dei <span className="text-yellow-400">100 Bomber</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl mx-auto">
          Tutti i 100 profili leggendari disponibili nel database. Clicca su qualsiasi calciatore per visualizzare la sua Carta FUT in 3D, inserire il tuo nome e condividerla!
        </p>
      </div>

      {/* Controls: Search, Category Filters, Sort */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 md:p-5 mb-8 shadow-xl space-y-4">
        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cerca per nome, soprannome, squadra o citazione..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-bold whitespace-nowrap">Ordina per:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="id">N° ID (1-100)</option>
              <option value="ovr-desc">Overall (OVR Max-Min)</option>
              <option value="name-asc">Nome (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categoryList.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? 'bg-black/20 text-black font-black' : 'bg-slate-800 text-slate-400'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
        <span>Trovati: <strong className="text-white">{filteredPlayers.length}</strong> su 100 calciatori</span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-cyan-400 hover:underline"
          >
            Azzera ricerca
          </button>
        )}
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPlayers.map((player) => {
          const cat = CATEGORIES[player.category] || CATEGORIES.provincia;
          const theme = cat.cardTheme;

          return (
            <div
              key={player.id}
              onClick={() => {
                playClick();
                setActivePlayerModal(player);
              }}
              className={`group cursor-pointer rounded-2xl p-1 bg-gradient-to-b ${theme.borderGradient} hover:scale-[1.02] transition-all duration-300 shadow-lg`}
            >
              <div className={`rounded-[14px] bg-gradient-to-b ${theme.bgGradient} p-4 text-white h-full flex flex-col justify-between border border-white/10`}>
                {/* Header: ID, OVR, Category */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black fut-font text-white leading-none">
                        {player.ovr}
                      </span>
                      <span className="text-xs font-extrabold text-slate-300">
                        {player.role}
                      </span>
                    </div>

                    <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-black/40 text-slate-400 border border-white/10">
                      #{player.id}
                    </span>
                  </div>

                  {/* Avatar & Info */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="text-4xl filter drop-shadow group-hover:scale-110 transition-transform">
                      {player.avatarEmoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-base uppercase truncate text-white leading-tight">
                        {player.name}
                      </h3>
                      <p className="text-xs text-slate-300 italic truncate">
                        "{player.nickname}"
                      </p>
                      <span className="text-[11px] text-slate-400 truncate block">
                        {player.clubHint}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote preview & CTA */}
                <div className="mt-3 pt-2.5 border-t border-white/10">
                  <p className="text-[11px] italic text-slate-300 line-clamp-2 mb-2 font-serif">
                    "{player.quote}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-yellow-400 transition-colors">
                    <span className="truncate">{cat.badge}</span>
                    <span>Vedi Carta 3D →</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Selected Player */}
      {activePlayerModal && (
        <PlayerModal
          player={activePlayerModal}
          onClose={() => setActivePlayerModal(null)}
          defaultUserName={defaultUserName}
          defaultUserNum={defaultUserNum}
        />
      )}
    </div>
  );
};
