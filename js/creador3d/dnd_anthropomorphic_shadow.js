/**
 * ============================================================================
 * MOTOR DE SOMBRA ANTROPOMÓRFICA DINÁMICA Y GALERÍA DE PERSONAJES (D&D 5.5e)
 * Fusiona visualmente Anatomía de Raza (10) + Equipo/Aura de Clase (12) + Nivel
 * ============================================================================
 */
(function () {
  'use strict';

  const ROSTER_STORAGE_KEY = 'dnd_saved_characters_roster_v1';

  // COLORES Y AURAS POR CLASE
  const CLASS_AURA = {
    barbarian: { primary: '#991b1b', glow: '#ef4444', accent: '#f59e0b', title: 'Furia Primigenia' },
    bard:      { primary: '#6b21a8', glow: '#c084fc', accent: '#fbbf24', title: 'Resonancia Bárdica' },
    cleric:    { primary: '#b45309', glow: '#fde047', accent: '#ffffff', title: 'Canalización Divina' },
    druid:     { primary: '#166534', glow: '#4ade80', accent: '#a3e635', title: 'Espíritu Silvestre' },
    fighter:   { primary: '#7f1d1d', glow: '#d97706', accent: '#94a3b8', title: 'Maestría Marcial' },
    monk:      { primary: '#0369a1', glow: '#38bdf8', accent: '#e0f2fe', title: 'Flujo de Ki' },
    paladin:   { primary: '#b45309', glow: '#facc15', accent: '#fef08a', title: 'Juramento Sagrado' },
    ranger:    { primary: '#14532d', glow: '#84cc16', accent: '#d97706', title: 'Acecho del Cazador' },
    rogue:     { primary: '#1e293b', glow: '#f43f5e', accent: '#64748b', title: 'Manto de Sombras' },
    sorcerer:  { primary: '#be123c', glow: '#fb7185', accent: '#fde047', title: 'Sangre Hechicera' },
    warlock:   { primary: '#4c1d95', glow: '#a855f7', accent: '#c084fc', title: 'Pacto Sobrenatural' },
    wizard:    { primary: '#1d4ed8', glow: '#60a5fa', accent: '#fde047', title: 'Sabiduría Arcana' }
  };

  // ESCALA Y PROPORCIÓN ANATÓMICA POR RAZA
  const SPECIES_BODY = {
    human:      { scaleX: 1.0,  scaleY: 1.0,  yOffset: 0,  label: 'Anatomía Humana Versátil' },
    elf:        { scaleX: 0.93, scaleY: 1.04, yOffset: -4, label: 'Esbeltez Feérica y Orejas Largas' },
    dwarf:      { scaleX: 1.14, scaleY: 0.84, yOffset: 24, label: 'Complexión Robusta de Montaña' },
    halfling:   { scaleX: 0.84, scaleY: 0.76, yOffset: 36, label: 'Estatura Pequeña y Ágil' },
    gnome:      { scaleX: 0.82, scaleY: 0.75, yOffset: 38, label: 'Estatura Pequeña e Ingeniosa' },
    dragonborn: { scaleX: 1.08, scaleY: 1.05, yOffset: -6, label: 'Fisonomía Dracónica Escamada' },
    tiefling:   { scaleX: 0.98, scaleY: 1.02, yOffset: -2, label: 'Linaje Infernal Cornudo' },
    orc:        { scaleX: 1.16, scaleY: 1.06, yOffset: -7, label: 'Musculatura Feroz con Colmillos' },
    goliath:    { scaleX: 1.18, scaleY: 1.12, yOffset: -15, label: 'Estatura Colosal de Linaje Gigante' },
    aasimar:    { scaleX: 1.0,  scaleY: 1.03, yOffset: -3, label: 'Porte Celestial Radiante' }
  };

  // RASGOS ANATÓMICOS DE CABEZA/ESPALDA SEGÚN RAZA
  function getSpeciesAnatomyPaths(speciesId, aura) {
    switch (speciesId) {
      case 'elf':
        return `
          <polygon points="104,78 72,66 102,88" fill="#1e293b"/>
          <polygon points="136,78 168,66 138,88" fill="#1e293b"/>
          <path d="M104,68 Q120,56 136,68" fill="none" stroke="${aura.glow}" stroke-width="2.5"/>`;
      case 'dwarf':
        return `
          <path d="M102,88 L96,138 L120,152 L144,138 L138,88 Z" fill="#0f172a"/>
          <path d="M100,70 C84,60 80,44 90,42 C90,52 96,60 106,64 Z" fill="${aura.primary}"/>
          <path d="M140,70 C156,60 160,44 150,42 C150,52 144,60 134,64 Z" fill="${aura.primary}"/>`;
      case 'dragonborn':
        return `
          <polygon points="102,68 84,44 110,60 98,36 118,56 134,54 148,68 138,82 114,84" fill="#1e293b"/>
          <circle cx="128" cy="66" r="3" fill="${aura.glow}"/>
          <path d="M138,195 C172,210 192,190 198,166" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round"/>`;
      case 'tiefling':
        return `
          <path d="M108,66 C88,46 82,22 102,20 C94,34 100,48 114,58 Z" fill="#1e293b"/>
          <path d="M132,66 C152,46 158,22 138,20 C146,34 140,48 126,58 Z" fill="#1e293b"/>
          <path d="M134,195 C178,205 196,170 184,145" fill="none" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
          <polygon points="184,140 176,150 192,148" fill="${aura.primary}"/>`;
      case 'orc':
        return `
          <polygon points="108,86 103,72 113,84" fill="#fef08a"/>
          <polygon points="132,86 137,72 127,84" fill="#fef08a"/>
          <polygon points="74,108 60,94 84,98" fill="${aura.primary}"/>
          <polygon points="166,108 180,94 156,98" fill="${aura.primary}"/>`;
      case 'goliath':
        return `
          <path d="M120,58 L120,88 M104,112 L116,135 L106,158 M136,112 L124,135 L134,158" fill="none" stroke="${aura.glow}" stroke-width="3" stroke-linecap="round"/>`;
      case 'aasimar':
        return `
          <ellipse cx="120" cy="42" rx="22" ry="5" fill="none" stroke="#f59e0b" stroke-width="3.5"/>
          <path d="M98,108 C52,70 22,88 30,142 C48,136 72,146 94,162 Z" fill="${aura.glow}" opacity="0.45"/>
          <path d="M142,108 C188,70 218,88 210,142 C192,136 168,146 146,162 Z" fill="${aura.glow}" opacity="0.45"/>`;
      case 'gnome':
        return `<polygon points="120,34 102,68 138,68" fill="${aura.primary}"/>`;
      case 'halfling':
        return `<path d="M92,102 C76,132 72,175 84,212 L156,212 C168,175 164,132 148,102 Z" fill="${aura.primary}" opacity="0.28"/>`;
      default:
        return `<path d="M92,104 C74,142 68,195 78,242 L162,242 C172,195 166,142 148,104 Z" fill="${aura.primary}" opacity="0.24"/>`;
    }
  }

  // ARMAS, AURAS Y ATRIBUTOS VISUALES SEGÚN CLASE
  function getClassEquipmentPaths(classId, aura) {
    switch (classId) {
      case 'barbarian':
        return `
          <line x1="56" y1="230" x2="184" y2="54" stroke="#7f1d1d" stroke-width="7" stroke-linecap="round"/>
          <path d="M150,48 C178,36 198,56 184,84 L162,66 Z" fill="${aura.primary}" stroke="${aura.glow}" stroke-width="2"/>
          <path d="M174,92 C198,78 206,52 182,40 C162,56 160,72 174,92 Z" fill="#1e293b"/>`;
      case 'bard':
        return `
          <ellipse cx="164" cy="155" rx="20" ry="15" transform="rotate(-28 164 155)" fill="${aura.primary}" stroke="${aura.glow}" stroke-width="2"/>
          <line x1="168" y1="150" x2="198" y2="102" stroke="#b45309" stroke-width="5" stroke-linecap="round"/>
          <circle cx="64" cy="96" r="6" fill="${aura.glow}"/><path d="M70,96 L70,74 L84,78" fill="none" stroke="${aura.glow}" stroke-width="3"/>`;
      case 'cleric':
        return `
          <line x1="176" y1="72" x2="176" y2="225" stroke="#b45309" stroke-width="6" stroke-linecap="round"/>
          <polygon points="176,46 184,66 204,66 188,78 194,96 176,84 158,96 164,78 148,66 168,66" fill="${aura.glow}" stroke="${aura.primary}" stroke-width="2"/>`;
      case 'druid':
        return `
          <path d="M174,235 L174,78 C174,56 194,54 186,72" fill="none" stroke="#166534" stroke-width="6" stroke-linecap="round"/>
          <path d="M104,62 C88,44 78,24 90,20 M136,62 C152,44 162,24 150,20" fill="none" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>
          <circle cx="180" cy="68" r="8" fill="${aura.glow}"/>`;
      case 'fighter':
        return `
          <polygon points="178,38 184,168 178,184 172,168" fill="#475569" stroke="#0f172a" stroke-width="2"/>
          <rect x="162" y="164" width="32" height="6" rx="2" fill="#b45309"/>
          <path d="M52,118 L76,108 L100,118 L100,152 C100,174 76,190 76,190 C76,190 52,174 52,152 Z" fill="${aura.primary}" stroke="#f59e0b" stroke-width="2.5"/>`;
      case 'monk':
        return `
          <circle cx="120" cy="135" r="68" fill="none" stroke="${aura.glow}" stroke-width="2.5" stroke-dasharray="8 6"/>
          <circle cx="58" cy="128" r="9" fill="${aura.glow}"/><circle cx="182" cy="128" r="9" fill="${aura.glow}"/>`;
      case 'paladin':
        return `
          <polygon points="180,28 186,168 180,188 174,168" fill="${aura.glow}" stroke="#b45309" stroke-width="2"/>
          <rect x="160" y="162" width="40" height="7" rx="3" fill="#b45309"/>
          <path d="M48,116 L74,104 L100,116 L100,154 C100,178 74,194 74,194 C74,194 48,178 48,154 Z" fill="#fef3c7" stroke="#b45309" stroke-width="3"/>`;
      case 'ranger':
        return `
          <path d="M168,56 C204,92 204,174 168,210" fill="none" stroke="#78350f" stroke-width="5" stroke-linecap="round"/>
          <line x1="168" y1="56" x2="168" y2="210" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="142" y1="133" x2="206" y2="133" stroke="${aura.glow}" stroke-width="3.5"/>`;
      case 'rogue':
        return `
          <polygon points="44,176 82,136 88,142 50,182" fill="#dc2626"/>
          <polygon points="196,176 158,136 152,142 190,182" fill="#dc2626"/>
          <path d="M100,72 L120,48 L140,72 Z" fill="#0f172a"/>`;
      case 'sorcerer':
        return `
          <path d="M62,110 C74,126 78,142 66,156 C56,164 48,156 50,140 C52,126 56,118 62,110 Z" fill="${aura.glow}"/>
          <path d="M178,110 C190,126 194,142 182,156 C172,164 164,156 166,140 C168,126 172,118 178,110 Z" fill="${aura.glow}"/>`;
      case 'warlock':
        return `
          <path d="M84,26 C104,8 136,8 156,26 C136,44 104,44 84,26 Z" fill="none" stroke="${aura.glow}" stroke-width="3"/>
          <circle cx="120" cy="26" r="8" fill="${aura.primary}"/><circle cx="120" cy="26" r="3" fill="${aura.glow}"/>
          <circle cx="176" cy="130" r="14" fill="${aura.glow}" opacity="0.75"/>`;
      case 'wizard':
      default:
        return `
          <polygon points="120,28 92,68 148,68" fill="${aura.primary}"/>
          <ellipse cx="120" cy="68" rx="34" ry="6" fill="${aura.primary}"/>
          <line x1="178" y1="52" x2="168" y2="235" stroke="#78350f" stroke-width="5.5" stroke-linecap="round"/>
          <circle cx="178" cy="48" r="12" fill="${aura.glow}" stroke="${aura.primary}" stroke-width="2.5"/>`;
    }
  }

  // GENERADOR DE LA SOMBRA ANTROPOMÓRFICA REACTIVA
  window.buildAnthropomorphicShadowSvg = function (speciesId, classId, level) {
    const sp = SPECIES_BODY[speciesId] || SPECIES_BODY.human;
    const aura = CLASS_AURA[classId] || CLASS_AURA.fighter;
    const lvl = Math.max(1, Math.min(20, parseInt(level, 10) || 1));
    const ringCount = lvl >= 17 ? 3 : lvl >= 9 ? 2 : 1;

    let ringsSvg = `<circle cx="120" cy="145" r="96" fill="${aura.glow}" opacity="0.13"/>`;
    for (let i = 0; i < ringCount; i++) {
      const r = 88 + i * 12;
      ringsSvg += `<circle cx="120" cy="145" r="${r}" fill="none" stroke="${aura.primary}" stroke-width="${2 - i * 0.4}" stroke-dasharray="${10 - i * 2} 6" opacity="${0.55 - i * 0.12}"/>`;
    }

    // DETECCIÓN DINÁMICA DE SPRITES ANIMADOS DESDE EL REGISTRO CENTRAL (10 RAZAS × 12 CLASES)
    const spriteCfg = typeof window.getDndSpriteConfig === 'function' ? window.getDndSpriteConfig(speciesId, classId) : null;
    if (spriteCfg) {
      const framesClass = spriteCfg.key === 'orc_warlock' ? 'is-orc-warlock' : `is-frames-${spriteCfg.frameCount || 6}`;
      const badgeLabel = `SPRITE ANIMADO: ${spriteCfg.name.toUpperCase()} (${spriteCfg.frameCount} FRAMES)`;
      return `
        <div class="anthropomorphic-sprite-stage">
          <svg class="anthropomorphic-hero-svg is-pedestal-bg" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="altarGlowGrad" cx="50%" cy="52%" r="50%">
                <stop offset="0%" stop-color="${aura.glow}" stop-opacity="0.42"/>
                <stop offset="70%" stop-color="${aura.primary}" stop-opacity="0.1"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="120" cy="145" r="112" fill="url(#altarGlowGrad)"/>
            ${ringsSvg}
            <ellipse cx="120" cy="252" rx="78" ry="14" fill="#fef3c7" stroke="${aura.primary}" stroke-width="2.5"/>
            <ellipse cx="120" cy="252" rx="60" ry="8" fill="none" stroke="${aura.glow}" stroke-width="1.5" stroke-dasharray="6 4"/>
          </svg>
          <div class="orc-custom-sprite-box ${framesClass}" style="background-image:url('${spriteCfg.stripUrl}')" role="img" aria-label="${badgeLabel}"></div>
          <span class="orc-sprite-active-tag">${badgeLabel}</span>
        </div>`;
    }

    return `
      <svg class="anthropomorphic-hero-svg" viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sombra Antropomórfica Dinámica">
        <defs>
          <radialGradient id="altarGlowGrad" cx="50%" cy="52%" r="50%">
            <stop offset="0%" stop-color="${aura.glow}" stop-opacity="0.38"/>
            <stop offset="70%" stop-color="${aura.primary}" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- HALO ARCANO Y PEDESTAL RÚNICO -->
        <circle cx="120" cy="145" r="112" fill="url(#altarGlowGrad)"/>
        ${ringsSvg}
        <ellipse cx="120" cy="252" rx="76" ry="14" fill="#fef3c7" stroke="${aura.primary}" stroke-width="2.5"/>
        <ellipse cx="120" cy="252" rx="58" ry="8" fill="none" stroke="${aura.glow}" stroke-width="1.5" stroke-dasharray="6 4"/>

        <!-- CUERPO ANTROPOMÓRFICO ESCALADO SEGÚN LA RAZA + EQUIPO DE LA CLASE -->
        <g transform="translate(${120 * (1 - sp.scaleX)}, ${sp.yOffset + 145 * (1 - sp.scaleY)}) scale(${sp.scaleX}, ${sp.scaleY})">
          ${getSpeciesAnatomyPaths(speciesId, aura)}
          <!-- SILUETA BASE DEL CUERPO HEROICO -->
          <circle cx="120" cy="76" r="18" fill="#0f172a" stroke="${aura.primary}" stroke-width="2"/>
          <path d="M90,104 C96,96 144,96 150,104 L164,158 L148,162 L140,124 L138,176 L150,244 L130,244 L120,192 L110,244 L90,244 L102,176 L100,124 L92,162 L76,158 Z"
                fill="#0f172a" stroke="${aura.primary}" stroke-width="2.2" stroke-linejoin="round"/>
          <!-- OJOS LUMINOSOS -->
          <circle cx="113" cy="75" r="2.6" fill="${aura.glow}"/>
          <circle cx="127" cy="75" r="2.6" fill="${aura.glow}"/>
          <!-- ARMAS Y AURA DE LA CLASE -->
          ${getClassEquipmentPaths(classId, aura)}
        </g>
      </svg>`;
  };

  // GESTIÓN REAL DE FICHAS GUARDADAS (SIN INFORMACIÓN DE PRUEBA)
  window.getCompendiumCharactersRoster = function () {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(ROSTER_STORAGE_KEY) || '[]');
    } catch (e) { saved = []; }
    return saved.filter(item => item && !String(item.id || '').startsWith('preset_'));
  };

  window.deleteSavedSheetFromRoster = function (sheetId) {
    const list = window.getCompendiumCharactersRoster().filter(c => c.id !== sheetId);
    localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(list));
    return list;
  };

  window.saveCurrentSheetCharacterToRoster = function (opts) {
    const fullData = typeof window.collectFormData === 'function' ? window.collectFormData() : null;
    const rawName = (document.getElementById('char-name')?.value || '').trim();
    const species = document.getElementById('char-race')?.value || 'human';
    const classId = document.getElementById('char-class-1')?.value || 'fighter';
    const level = parseInt(document.getElementById('char-level-1')?.value, 10) || 1;
    const spLabel = (window.DND_55E_SPECIES || {})[species]?.name || species;
    const clLabel = (window.DND_55E_CLASSES || {})[classId]?.name || classId;
    const name = rawName || `${clLabel} ${spLabel} (Nvl ${level})`;

    const spells = {};
    for (let l = 0; l <= 9; l++) {
      const rows = Array.from(document.querySelectorAll(`#spells-list-${l} .spell-name-input`)).map(i => i.value.split(' — ')[0].trim()).filter(Boolean);
      if (rows.length) spells[l] = rows;
    }

    const scores = fullData?.scores || {
      str: document.getElementById('score-str')?.value || 10,
      dex: document.getElementById('score-dex')?.value || 10,
      con: document.getElementById('score-con')?.value || 10,
      int: document.getElementById('score-int')?.value || 10,
      wis: document.getElementById('score-wis')?.value || 10,
      cha: document.getElementById('score-cha')?.value || 10
    };
    const combat = {
      ac: document.getElementById('stat-ac')?.value || 10,
      hpMax: document.getElementById('hp-max')?.value || 10,
      hpCurrent: document.getElementById('hp-current')?.value || 10,
      speed: document.getElementById('stat-speed')?.value || 30,
      initiative: document.getElementById('stat-initiative')?.value || 0
    };
    const portraitBase64 = document.getElementById('char-portrait-img')?.getAttribute('src') || '';
    const savedAt = new Date().toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

    const saved = window.getCompendiumCharactersRoster();
    let existingIdx = -1;
    if (opts && opts.updateByName && rawName) {
      existingIdx = saved.findIndex(c => (c.name || '').toLowerCase() === rawName.toLowerCase());
    }
    const id = existingIdx >= 0 ? saved[existingIdx].id : ('sheet_' + Date.now());
    const record = { id, name, species, classId, level, spells, scores, combat, portraitBase64, savedAt, sheetData: fullData };

    if (existingIdx >= 0) {
      saved[existingIdx] = record;
    } else {
      saved.unshift(record);
    }
    localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(saved.slice(0, 30)));
    return id;
  };

  // GENERADOR DE IMAGEN VISUAL DE LA FICHA PLANA PARA CADA PERSONAJE GUARDADO
  window.buildFlatSheetPreviewHtml = function (entry) {
    const spName = (window.DND_55E_SPECIES || {})[entry.species]?.name || entry.species || 'Humano';
    const clName = (window.DND_55E_CLASSES || {})[entry.classId]?.name || entry.classId || 'Guerrero';
    const sc = entry.scores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const cb = entry.combat || { ac: 10, hpMax: 10, speed: 30, initiative: 0 };
    const mod = v => { const m = Math.floor(((parseInt(v, 10) || 10) - 10) / 2); return m >= 0 ? `+${m}` : `${m}`; };
    const spArt = window.getDndSpeciesArtSvg?.(entry.species) || '';
    const clArt = window.getDndClassArtSvg?.(entry.classId) || '';
    const spriteCfg = typeof window.getDndSpriteConfig === 'function' ? window.getDndSpriteConfig(entry.species, entry.classId) : null;
    const portraitHtml = entry.portraitBase64
      ? `<img src="${entry.portraitBase64}" alt="${entry.name}" class="flat-sheet-mini-portrait-img">`
      : (spriteCfg
          ? `<div class="flat-sheet-mini-sprite-thumb is-frames-${spriteCfg.frameCount || 6}" style="background-image:url('${spriteCfg.stripUrl}')" role="img" aria-label="${entry.name}"></div>`
          : `<div class="flat-sheet-mini-dual-art"><div class="mini-art-circle">${spArt}</div><div class="mini-art-circle">${clArt}</div></div>`);
    const spellCount = Object.values(entry.spells || {}).reduce((acc, arr) => acc + (arr?.length || 0), 0);

    return `
      <div class="flat-sheet-visual-snapshot" title="Vista de la Ficha Plana de ${entry.name}">
        <div class="fs-snap-header">
          <div class="fs-snap-brand">
            <span class="fs-snap-dnd-tag">D&amp;D 5e · FICHA PLANA</span>
            <strong class="fs-snap-charname">${entry.name}</strong>
          </div>
          <div class="fs-snap-meta-grid">
            <span><b>Clase:</b> ${clName} Nvl ${entry.level}</span>
            <span><b>Raza:</b> ${spName}</span>
          </div>
        </div>
        <div class="fs-snap-body">
          <div class="fs-snap-abilities-col">
            ${[['FUE', sc.str], ['DES', sc.dex], ['CON', sc.con], ['INT', sc.int], ['SAB', sc.wis], ['CAR', sc.cha]].map(([k, v]) => `
              <div class="fs-snap-abi-pill"><span>${k}</span><strong>${v || 10}</strong><small>${mod(v)}</small></div>
            `).join('')}
          </div>
          <div class="fs-snap-combat-col">
            <div class="fs-snap-vitals-row">
              <div class="fs-snap-vital-box is-ac"><span>CA</span><strong>${cb.ac || 10}</strong></div>
              <div class="fs-snap-vital-box is-hp"><span>PG MÁX</span><strong>${cb.hpMax || 10}</strong></div>
              <div class="fs-snap-vital-box"><span>VEL</span><strong>${cb.speed || 30}p</strong></div>
            </div>
            <div class="fs-snap-sheet-lines">
              <div class="fs-snap-line"><span>Iniciativa:</span> <b>${mod( sc.dex )}</b> · <span>Conjuros:</span> <b>${spellCount}</b></div>
              <div class="fs-snap-line"><span>Hoja Oficial:</span> <b>3 Páginas Guardadas</b></div>
            </div>
          </div>
          <div class="fs-snap-portrait-col">${portraitHtml}</div>
        </div>
      </div>`;
  };

  window.getDndSlotsForClassAndLevel = function (classId, level) {
    const cls = (window.DND_55E_CLASSES || {})[classId];
    const lvl = Math.max(1, Math.min(20, parseInt(level, 10) || 1));
    const slots = { 0: 3, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    if (!cls || cls.casterType === 'none') {
      slots[0] = 2;
      slots[1] = lvl >= 3 ? 2 : 1;
      return slots;
    }
    if (cls.casterType === 'warlock') {
      const w = (window.DND_55E_WARLOCK_SLOTS || {})[lvl] || { slots: 2, level: 1 };
      slots[0] = lvl >= 10 ? 4 : 3;
      slots[w.level] = w.slots;
      return slots;
    }
    const casterLvl = cls.casterType === 'half' ? Math.max(1, Math.ceil(lvl / 2)) : lvl;
    slots[0] = cls.casterType === 'half' ? 2 : (lvl >= 10 ? 5 : lvl >= 4 ? 4 : 3);
    const row = (window.DND_55E_MULTICLASS_SPELL_SLOTS || {})[casterLvl] || [2, 0, 0, 0, 0, 0, 0, 0, 0];
    row.forEach((count, i) => { slots[i + 1] = count; });
    return slots;
  };
})();
