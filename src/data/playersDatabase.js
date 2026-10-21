import { provinciaPlayers } from './players/provincia.js';
import { nottePlayers } from './players/notte.js';
import { tibiaPlayers } from './players/tibia.js';
import { iconaPlayers } from './players/icona.js';
import { bugPlayers } from './players/bug.js';

// Aggregate all 100 players into the master database
export const playersDatabase = [
  ...provinciaPlayers,
  ...nottePlayers,
  ...tibiaPlayers,
  ...iconaPlayers,
  ...bugPlayers
];

// Verify database integrity: exactly 100 players
if (playersDatabase.length !== 100) {
  console.warn(`[WARNING] Database size mismatch: expected 100, found ${playersDatabase.length}`);
}

export const getPlayerById = (id) => {
  const numericId = parseInt(id, 10);
  return playersDatabase.find((p) => p.id === numericId) || playersDatabase[0];
};

export const getPlayersByCategory = (category) => {
  if (!category || category === 'all') return playersDatabase;
  return playersDatabase.filter((p) => p.category === category);
};

/**
 * 6-Axis Euclidean Distance Algorithm:
 * Axes:
 * TEC: Tecnica & Fantasia (0-100)
 * IGN: Ignoranza & Tibia (0-100)
 * NOT: Vita Notturna & Terzo Tempo (0-100)
 * EGO: Ego & Carisma (0-100)
 * FOL: Follia & Meme (0-100)
 * PRO: Cuore di Provincia (0-100)
 *
 * Max possible Euclidean distance between two 6D vectors in [0, 100]^6:
 * sqrt(6 * 100^2) = sqrt(60000) ~= 244.94897
 */
export const calculatePlayerAffinity = (userVector, playerVector) => {
  const dTec = (userVector.tec - playerVector.tec) ** 2;
  const dIgn = (userVector.ign - playerVector.ign) ** 2;
  const dNot = (userVector.not - playerVector.not) ** 2;
  const dEgo = (userVector.ego - playerVector.ego) ** 2;
  const dFol = (userVector.fol - playerVector.fol) ** 2;
  const dPro = (userVector.pro - playerVector.pro) ** 2;

  const distance = Math.sqrt(dTec + dIgn + dNot + dEgo + dFol + dPro);
  const maxDistance = Math.sqrt(6 * 10000); // 244.95

  // Affinity percentage: 100% when distance is 0, down to ~50% minimum for realistic presentation
  const rawSimilarity = 1 - (distance / maxDistance);
  // Scale dynamically between 55% and 99% for excitement
  const affinity = Math.min(99, Math.max(55, Math.round(rawSimilarity * 100)));

  return {
    distance,
    affinity
  };
};

/**
 * Match user vector against all 100 players
 * Returns:
 * - topMatch: #1 Alter Ego Calcistico
 * - tridente: #2 and #3 teammates
 * - nemico: #100 most distant opponent
 * - allRanked: all 100 sorted from closest to farthest
 */
export const matchUserToPlayers = (userVector) => {
  const scored = playersDatabase.map((player) => {
    const { distance, affinity } = calculatePlayerAffinity(userVector, player.radar);
    return {
      player,
      distance,
      affinity
    };
  });

  // Sort ascending by distance (closest first)
  scored.sort((a, b) => a.distance - b.distance);

  return {
    topMatch: scored[0],
    tridente: [scored[1], scored[2]],
    nemico: scored[scored.length - 1],
    allRanked: scored
  };
};
