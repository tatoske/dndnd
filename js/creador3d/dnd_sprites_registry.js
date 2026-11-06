/**
 * ============================================================================
 * REGISTRO CENTRAL DE SPRITES ANIMADOS CAMINANDO (WALK CYCLES) — CREADOR 3D
 * Cubre las 10 Razas × 12 Clases (120 combinaciones) de D&D 5.5e (2024).
 * Cada strip en assets/compendium/sprites/<raza>_<clase>_strip.png posee
 * frames de 140x175 px con fondo transparente y de 5 a 7 cuadros de animación.
 * ============================================================================
 */
(function () {
  'use strict';

  // 1. Manifiesto exacto de strips cortados (Raza -> Clase -> Número de Frames)
  const SPRITE_STRIPS_MANIFEST = {
    human:      { fighter: 7, wizard: 7, rogue: 7, cleric: 7, paladin: 7, barbarian: 7, ranger: 7, bard: 7, warlock: 7 },
    elf:        { wizard: 7, ranger: 7, rogue: 7, druid: 7, sorcerer: 7, paladin: 7, fighter: 7, bard: 7, monk: 7 },
    dwarf:      { fighter: 7, cleric: 7, barbarian: 7, paladin: 7, rogue: 7, ranger: 7, wizard: 7, monk: 7, bard: 7 },
    dragonborn: { paladin: 7, barbarian: 7, fighter: 7, sorcerer: 7, cleric: 7, warlock: 7, monk: 7 },
    halfling:   { rogue: 7, bard: 7, ranger: 7, fighter: 7, druid: 7, monk: 7, wizard: 7 },
    tiefling:   { warlock: 6, bard: 6, sorcerer: 6, rogue: 6, paladin: 6, wizard: 6, fighter: 6 },
    goliath:    { barbarian: 5, fighter: 5, paladin: 5, monk: 5, cleric: 5, ranger: 5 },
    gnome:      { wizard: 6, druid: 6, rogue: 6, bard: 5, cleric: 5, fighter: 5 },
    aasimar:    { paladin: 6, cleric: 6, monk: 6, sorcerer: 6, fighter: 6, warlock: 6 },
    orc:        { barbarian: 6, fighter: 6, ranger: 6, cleric: 6, paladin: 6, rogue: 6, warlock: 6 }
  };

  // 2. Equivalencias temáticas por clase cuando una lámina de raza agrupa arquetipos similares
  const CLASS_ARCHETYPE_FALLBACKS = {
    barbarian: ['fighter', 'paladin', 'ranger', 'monk'],
    bard:      ['rogue', 'sorcerer', 'wizard', 'warlock', 'ranger'],
    cleric:    ['paladin', 'druid', 'wizard', 'sorcerer'],
    druid:     ['cleric', 'ranger', 'wizard', 'sorcerer', 'monk'],
    fighter:   ['paladin', 'barbarian', 'ranger', 'rogue'],
    monk:      ['fighter', 'rogue', 'ranger', 'barbarian', 'cleric'],
    paladin:   ['fighter', 'cleric', 'barbarian', 'warlock'],
    ranger:    ['rogue', 'fighter', 'druid', 'barbarian', 'bard'],
    rogue:     ['ranger', 'bard', 'monk', 'fighter'],
    sorcerer:  ['wizard', 'warlock', 'bard', 'cleric', 'druid'],
    warlock:   ['sorcerer', 'wizard', 'rogue', 'bard', 'cleric'],
    wizard:    ['sorcerer', 'warlock', 'cleric', 'druid', 'bard']
  };

  const SPECIES_NAMES_ES = {
    human: 'Humano',
    elf: 'Elfo',
    dwarf: 'Enano',
    dragonborn: 'Dracónido',
    halfling: 'Mediano',
    tiefling: 'Tiefling',
    goliath: 'Goliat',
    gnome: 'Gnomo',
    aasimar: 'Aasimar',
    orc: 'Orco'
  };

  const CLASS_NAMES_ES = {
    barbarian: 'Bárbaro',
    bard: 'Bardo',
    cleric: 'Clérigo',
    druid: 'Druida',
    fighter: 'Guerrero',
    monk: 'Monje',
    paladin: 'Paladín',
    ranger: 'Explorador',
    rogue: 'Pícaro',
    sorcerer: 'Hechicero',
    warlock: 'Brujo',
    wizard: 'Mago'
  };

  // Registro central accesible globalmente
  window.DND_SPRITE_MANIFEST = SPRITE_STRIPS_MANIFEST;
  window.DND_SPRITES_REGISTRY = {};

  /**
   * Resuelve qué clase dentro de la misma raza se usa para el strip
   */
  function resolveClassStripForRace(raceId, classId) {
    const raceMap = SPRITE_STRIPS_MANIFEST[raceId];
    if (!raceMap) return null;
    if (classId && raceMap[classId]) {
      return { resolvedClass: classId, frameCount: raceMap[classId], isExactMatch: true };
    }
    const candidates = CLASS_ARCHETYPE_FALLBACKS[classId] || [];
    for (let i = 0; i < candidates.length; i++) {
      const alt = candidates[i];
      if (raceMap[alt]) {
        return { resolvedClass: alt, frameCount: raceMap[alt], isExactMatch: false };
      }
    }
    const firstAvailable = Object.keys(raceMap)[0];
    return firstAvailable
      ? { resolvedClass: firstAvailable, frameCount: raceMap[firstAvailable], isExactMatch: false }
      : null;
  }

  /**
   * Obtiene la configuración del sprite animado para cualquier combinación Raza + Clase
   * @param {string} speciesId
   * @param {string} classId
   * @returns {object|null}
   */
  window.getDndSpriteConfig = function (speciesId, classId) {
    const sp = String(speciesId || 'human').toLowerCase();
    const cl = String(classId || 'fighter').toLowerCase();
    const customKey = `${sp}_${cl}`;

    if (window.DND_SPRITES_REGISTRY[customKey]) {
      return { key: customKey, ...window.DND_SPRITES_REGISTRY[customKey] };
    }

    const match = resolveClassStripForRace(sp, cl);
    if (!match) return null;

    const stripKey = `${sp}_${match.resolvedClass}`;
    const spLabel = SPECIES_NAMES_ES[sp] || sp;
    const clLabel = CLASS_NAMES_ES[cl] || cl;

    // Caso especial para Orco Brujo con su strip dedicado de 6 frames (1080x260 px) del Pacto Sobrenatural
    if (sp === 'orc' && cl === 'warlock') {
      return {
        key: 'orc_warlock',
        stripKey: 'orc_warlock',
        speciesId: sp,
        classId: cl,
        resolvedClass: 'warlock',
        stripUrl: 'assets/compendium/sprites/orc/orc_warlock_strip.png',
        frameCount: 6,
        frameWidth: 180,
        frameHeight: 260,
        name: `${spLabel} ${clLabel}`,
        isExactMatch: true
      };
    }

    return {
      key: customKey,
      stripKey: stripKey,
      speciesId: sp,
      classId: cl,
      resolvedClass: match.resolvedClass,
      stripUrl: `assets/compendium/sprites/${sp}/${stripKey}_strip.png`,
      frameCount: match.frameCount,
      frameWidth: 180,
      frameHeight: 225,
      name: `${spLabel} ${clLabel}`,
      isExactMatch: match.isExactMatch
    };
  };

  /**
   * Registra o sobreescribe dinámicamente un spritesheet personalizado
   */
  window.registerDndSprite = function (key, config) {
    if (!key || !config) return;
    window.DND_SPRITES_REGISTRY[String(key).toLowerCase()] = config;
  };
})();
