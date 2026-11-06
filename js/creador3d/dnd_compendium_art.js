/**
 * ============================================================================
 * ARTE E ILUSTRACIONES DE SILUETA Y SOMBRA D&D 5e / 5.5e (SVG MULTICAPA)
 * Siluetas heroicas para las 12 Clases, 10 Razas, Hechizos y Bestiario
 * ============================================================================
 */
(function () {
  'use strict';

  function wrapMedallionSvg(innerPaths, themeColor, glowColor, bgTint) {
    return `
      <svg class="comp-art-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${bgTint}" stroke="${themeColor}" stroke-width="2.5"/>
        <circle cx="60" cy="60" r="49" stroke="${glowColor}" stroke-width="1.2" stroke-dasharray="5 3" opacity="0.75"/>
        <polygon points="60,6 64,14 56,14" fill="${themeColor}"/>
        <polygon points="60,114 64,106 56,106" fill="${themeColor}"/>
        <polygon points="6,60 14,64 14,56" fill="${themeColor}"/>
        <polygon points="114,60 106,64 106,56" fill="${themeColor}"/>
        <circle cx="60" cy="60" r="38" fill="${glowColor}" opacity="0.16"/>
        <g class="comp-art-silhouette" fill="${themeColor}" stroke="${themeColor}">
          ${innerPaths}
        </g>
      </svg>`;
  }

  // 1. SILUETAS HEROICAS DE LAS 12 CLASES OFICIALES
  const CLASS_SILHOUETTES = {
    barbarian: {
      c: '#991b1b', g: '#f59e0b', bg: '#fff1f2',
      p: `<path d="M60 22 L66 36 L54 36 Z" />
          <path d="M35 88 L45 54 L60 46 L75 54 L85 88 Z" opacity="0.9"/>
          <circle cx="60" cy="37" r="9"/>
          <path d="M24 34 C14 48 16 68 28 80 L40 58 Z" />
          <path d="M96 34 C106 48 104 68 92 80 L80 58 Z" />
          <line x1="26" y1="88" x2="94" y2="28" stroke="#7f1d1d" stroke-width="4.5" stroke-linecap="round"/>`
    },
    bard: {
      c: '#7e22ce', g: '#f59e0b', bg: '#faf5ff',
      p: `<path d="M60 22 C74 28 82 44 74 58 C66 72 48 76 40 88 L80 88 C78 72 88 54 84 36 Z" opacity="0.25"/>
          <ellipse cx="56" cy="72" rx="18" ry="14" transform="rotate(-25 56 72)"/>
          <rect x="64" y="26" width="6" height="42" rx="2" transform="rotate(25 64 26)"/>
          <circle cx="56" cy="72" r="5" fill="#faf5ff"/>
          <path d="M30 42 Q38 30 46 40 T62 36" fill="none" stroke="#7e22ce" stroke-width="2.5"/>`
    },
    cleric: {
      c: '#b45309', g: '#fbbf24', bg: '#fffbeb',
      p: `<polygon points="60,14 66,38 90,32 72,50 96,60 72,70 90,88 66,82 60,106 54,82 30,88 48,70 24,60 48,50 30,32 54,38" opacity="0.28"/>
          <path d="M44 92 L48 56 L60 46 L72 56 L76 92 Z"/>
          <circle cx="60" cy="36" r="9"/>
          <rect x="57" y="20" width="6" height="34" rx="2" fill="#fffbeb"/>
          <rect x="47" y="30" width="26" height="6" rx="2" fill="#fffbeb"/>`
    },
    druid: {
      c: '#15803d', g: '#84cc16', bg: '#f0fdf4',
      p: `<path d="M60 92 L42 92 L48 58 L60 48 L72 58 L78 92 Z"/>
          <circle cx="60" cy="39" r="8"/>
          <path d="M52 34 C38 28 30 16 36 14 C38 22 44 26 52 28 M40 22 L46 15" fill="none" stroke="#15803d" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M68 34 C82 28 90 16 84 14 C82 22 76 26 68 28 M80 22 L74 15" fill="none" stroke="#15803d" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M60 56 C50 66 50 78 60 86 C70 78 70 66 60 56 Z" fill="#bbf7d0"/>`
    },
    fighter: {
      c: '#7f1d1d', g: '#d97706', bg: '#fef2f2',
      p: `<path d="M36 40 L60 28 L84 40 L84 66 C84 82 60 96 60 96 C60 96 36 82 36 66 Z" opacity="0.88"/>
          <line x1="26" y1="90" x2="94" y2="24" stroke="#7f1d1d" stroke-width="4.5" stroke-linecap="round"/>
          <line x1="94" y1="90" x2="26" y2="24" stroke="#7f1d1d" stroke-width="4.5" stroke-linecap="round"/>
          <polygon points="60,36 68,54 60,84 52,54" fill="#fef2f2"/>`
    },
    monk: {
      c: '#0369a1', g: '#38bdf8', bg: '#f0f9ff',
      p: `<circle cx="60" cy="32" r="8"/>
          <path d="M40 82 L50 56 L34 46 L38 40 L56 48 L64 48 L82 40 L86 46 L70 56 L80 82 L68 82 L60 66 L52 82 Z"/>
          <path d="M60 84 C44 84 34 72 44 64 C50 74 70 74 76 64 C86 72 76 84 60 84 Z" opacity="0.45"/>
          <circle cx="60" cy="32" r="16" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="3 3"/>`
    },
    paladin: {
      c: '#b45309', g: '#f59e0b', bg: '#fffbeb',
      p: `<path d="M24 54 C24 34 42 28 54 44 L44 74 C30 68 24 62 24 54 Z" opacity="0.75"/>
          <path d="M96 54 C96 34 78 28 66 44 L76 74 C90 68 96 62 96 54 Z" opacity="0.75"/>
          <polygon points="60,16 65,76 60,98 55,76" />
          <rect x="42" y="68" width="36" height="6" rx="3"/>
          <circle cx="60" cy="71" r="4" fill="#fffbeb"/>`
    },
    ranger: {
      c: '#166534', g: '#ca8a04', bg: '#f0fdf4',
      p: `<path d="M38 22 C76 38 76 82 38 98" fill="none" stroke="#166534" stroke-width="4.5" stroke-linecap="round"/>
          <line x1="38" y1="22" x2="38" y2="98" stroke="#166534" stroke-width="2"/>
          <line x1="24" y1="60" x2="94" y2="60" stroke="#166534" stroke-width="3.5"/>
          <polygon points="98,60 84,53 87,60 84,67"/>
          <path d="M46 44 L60 28 L74 44 L68 88 L52 88 Z" opacity="0.28"/>`
    },
    rogue: {
      c: '#1e293b', g: '#64748b', bg: '#f8fafc',
      p: `<path d="M60 18 C42 22 34 40 38 58 L30 92 L90 92 L82 58 C86 40 78 22 60 18 Z" opacity="0.9"/>
          <path d="M48 44 L60 52 L72 44 C68 34 52 34 48 44 Z" fill="#f8fafc"/>
          <polygon points="28,84 54,58 58,62 32,88" fill="#dc2626"/>
          <polygon points="92,84 66,58 62,62 88,88" fill="#dc2626"/>`
    },
    sorcerer: {
      c: '#be123c', g: '#fb7185', bg: '#fff1f2',
      p: `<path d="M60 16 C78 34 88 52 76 74 C68 88 52 88 44 74 C32 52 42 34 60 16 Z" opacity="0.85"/>
          <path d="M60 34 C70 46 74 58 66 72 C62 78 58 78 54 72 C46 58 50 46 60 34 Z" fill="#fef08a"/>
          <circle cx="60" cy="62" r="7" fill="#be123c"/>
          <path d="M34 92 L46 68 L60 60 L74 68 L86 92 Z"/>`
    },
    warlock: {
      c: '#581c87', g: '#a855f7', bg: '#faf5ff',
      p: `<path d="M22 60 C38 36 82 36 98 60 C82 84 38 84 22 60 Z" fill="none" stroke="#581c87" stroke-width="4"/>
          <circle cx="60" cy="60" r="14"/>
          <ellipse cx="60" cy="60" rx="4" ry="11" fill="#faf5ff"/>
          <path d="M40 88 C36 74 46 72 50 96 M80 88 C84 74 74 72 70 96 M60 80 L60 104" stroke="#581c87" stroke-width="3.5" stroke-linecap="round"/>`
    },
    wizard: {
      c: '#1d4ed8', g: '#60a5fa', bg: '#eff6ff',
      p: `<polygon points="60,14 36,52 84,52"/>
          <ellipse cx="60" cy="52" rx="32" ry="6"/>
          <path d="M42 94 L48 58 L72 58 L78 94 Z" opacity="0.88"/>
          <line x1="86" y1="24" x2="76" y2="96" stroke="#b45309" stroke-width="4" stroke-linecap="round"/>
          <circle cx="86" cy="24" r="7" fill="#fef08a" stroke="#1d4ed8" stroke-width="2.5"/>`
    }
  };

  // 2. SILUETAS DE LAS 10 RAZAS / ESPECIES OFICIALES
  const SPECIES_SILHOUETTES = {
    human: {
      c: '#b45309', g: '#f59e0b', bg: '#fffbeb',
      p: `<polygon points="40,34 48,22 60,30 72,22 80,34 76,42 44,42"/>
          <circle cx="60" cy="48" r="11"/>
          <path d="M36 94 C36 70 46 62 60 62 C74 62 84 70 84 94 Z"/>`
    },
    elf: {
      c: '#15803d', g: '#4ade80', bg: '#f0fdf4',
      p: `<circle cx="60" cy="46" r="11"/>
          <polygon points="49,44 26,34 46,52"/>
          <polygon points="71,44 94,34 74,52"/>
          <path d="M40 94 C42 70 50 60 60 60 C70 60 78 70 80 94 Z"/>
          <path d="M48 32 Q60 20 72 32" fill="none" stroke="#15803d" stroke-width="2.5"/>`
    },
    dwarf: {
      c: '#92400e', g: '#f59e0b', bg: '#fffbeb',
      p: `<path d="M42 42 C42 26 78 26 78 42 Z"/>
          <path d="M42 38 C28 32 24 20 32 18 C32 26 36 32 44 34 Z"/>
          <path d="M78 38 C92 32 96 20 88 18 C88 26 84 32 76 34 Z"/>
          <path d="M40 50 L80 50 L86 88 L60 98 L34 88 Z"/>
          <rect x="48" y="42" width="24" height="7" fill="#fffbeb"/>`
    },
    halfling: {
      c: '#a16207', g: '#facc15', bg: '#fefce8',
      p: `<circle cx="60" cy="50" r="10"/>
          <path d="M38 92 C40 68 48 62 60 62 C72 62 80 68 82 92 Z"/>
          <circle cx="60" cy="26" r="9" fill="#fef08a" stroke="#a16207" stroke-width="2.5"/>
          <polygon points="60,20 62,26 68,26 63,29 65,35 60,31 55,35 57,29 52,26 58,26"/>`
    },
    gnome: {
      c: '#0f766e', g: '#2dd4bf', bg: '#f0fdfa',
      p: `<polygon points="60,14 42,48 78,48"/>
          <circle cx="60" cy="54" r="10"/>
          <circle cx="48" cy="54" r="6" fill="#f0fdfa" stroke="#0f766e" stroke-width="2.5"/>
          <circle cx="72" cy="54" r="6" fill="#f0fdfa" stroke="#0f766e" stroke-width="2.5"/>
          <path d="M42 94 L50 66 L70 66 L78 94 Z"/>`
    },
    dragonborn: {
      c: '#991b1b', g: '#f97316', bg: '#fef2f2',
      p: `<path d="M34 88 L44 58 L32 44 L48 40 L38 24 L56 34 L66 22 L66 36 L88 44 L86 56 L70 58 L78 88 Z"/>
          <circle cx="66" cy="44" r="3" fill="#fef08a"/>
          <path d="M88 48 C100 42 108 48 104 58 C98 64 90 58 88 52 Z" fill="#f97316"/>`
    },
    tiefling: {
      c: '#881337', g: '#f43f5e', bg: '#fff1f2',
      p: `<path d="M48 40 C30 28 24 14 38 14 C34 22 40 30 52 34 Z"/>
          <path d="M72 40 C90 28 96 14 82 14 C86 22 80 30 68 34 Z"/>
          <circle cx="60" cy="48" r="11"/>
          <path d="M38 94 C40 70 48 62 60 62 C72 62 80 70 82 94 Z"/>
          <path d="M78 88 C96 86 98 68 88 62" fill="none" stroke="#881337" stroke-width="3.5" stroke-linecap="round"/>`
    },
    orc: {
      c: '#3f6212', g: '#84cc16', bg: '#f7fee7',
      p: `<circle cx="60" cy="46" r="14"/>
          <polygon points="48,54 44,40 53,52" fill="#f7fee7"/>
          <polygon points="72,54 76,40 67,52" fill="#f7fee7"/>
          <path d="M30 94 C32 68 44 60 60 60 C76 60 88 68 90 94 Z"/>`
    },
    goliath: {
      c: '#334155', g: '#94a3b8', bg: '#f8fafc',
      p: `<polygon points="20,92 46,34 66,68 80,44 102,92" opacity="0.28"/>
          <circle cx="60" cy="38" r="11"/>
          <path d="M28 94 L36 54 L60 48 L84 54 L92 94 Z"/>
          <path d="M54 30 L60 46 L66 30" fill="none" stroke="#f8fafc" stroke-width="2.5"/>`
    },
    aasimar: {
      c: '#b45309', g: '#fde047', bg: '#fffbeb',
      p: `<ellipse cx="60" cy="22" rx="16" ry="4" fill="none" stroke="#d97706" stroke-width="3"/>
          <path d="M18 42 C26 26 42 34 50 54 L32 78 C20 68 16 54 18 42 Z" opacity="0.7"/>
          <path d="M102 42 C94 26 78 34 70 54 L88 78 C100 68 104 54 102 42 Z" opacity="0.7"/>
          <circle cx="60" cy="42" r="10"/>
          <path d="M40 94 L48 56 L72 56 L80 94 Z"/>`
    }
  };

  // 3. ILUSTRACIONES DE HECHIZOS POR EFECTO Y ESCUELA
  function getSpellVisualSpec(spell) {
    const n = `${spell.name || ''} ${spell.school || ''} ${spell.desc || ''}`.toLowerCase();
    if (n.includes('fuego') || n.includes('ardiente') || n.includes('abrasador') || n.includes('meteorito') || n.includes('llama')) {
      return {
        c: '#c2410c', g: '#f59e0b', bg: '#fff7ed',
        p: `<path d="M60 14 C82 36 92 58 78 82 C68 96 52 96 42 82 C28 58 38 36 60 14 Z"/>
            <path d="M60 36 C72 50 76 64 68 78 C62 86 58 86 52 78 C44 64 48 50 60 36 Z" fill="#fef08a"/>
            <circle cx="60" cy="68" r="9" fill="#dc2626"/>`
      };
    }
    if (n.includes('escarcha') || n.includes('frío') || n.includes('hielo')) {
      return {
        c: '#0284c7', g: '#38bdf8', bg: '#f0f9ff',
        p: `<polygon points="60,14 72,44 102,60 72,76 60,106 48,76 18,60 48,44"/>
            <polygon points="60,28 68,52 92,60 68,68 60,92 52,68 28,60 52,52" fill="#e0f2fe"/>`
      };
    }
    if (n.includes('curar') || n.includes('curación') || n.includes('sanar') || n.includes('revivir') || n.includes('restauración') || n.includes('bendición')) {
      return {
        c: '#d97706', g: '#fde047', bg: '#fffbeb',
        p: `<circle cx="60" cy="60" r="32" opacity="0.25"/>
            <rect x="52" y="24" width="16" height="72" rx="4"/>
            <rect x="24" y="52" width="72" height="16" rx="4"/>
            <circle cx="60" cy="60" r="10" fill="#fffbeb"/>`
      };
    }
    if (n.includes('escudo') || n.includes('armadura') || n.includes('muro') || n.includes('abjuración')) {
      return {
        c: '#1d4ed8', g: '#60a5fa', bg: '#eff6ff',
        p: `<path d="M30 30 L60 18 L90 30 L90 62 C90 82 60 100 60 100 C60 100 30 82 30 62 Z"/>
            <path d="M40 38 L60 28 L80 38 L80 60 C80 74 60 88 60 88 C60 88 40 74 40 60 Z" fill="#dbeafe"/>`
      };
    }
    if (n.includes('relámpago') || n.includes('trueno') || n.includes('atronadora') || n.includes('añicos')) {
      return {
        c: '#4338ca', g: '#818cf8', bg: '#eef2ff',
        p: `<polygon points="68,14 34,62 58,62 46,106 86,52 62,52"/>`
      };
    }
    if (n.includes('nigromancia') || n.includes('mortal') || n.includes('veneno') || n.includes('moribundo')) {
      return {
        c: '#3b0764', g: '#a855f7', bg: '#faf5ff',
        p: `<path d="M36 52 C36 30 84 30 84 52 C84 66 76 72 74 86 L46 86 C44 72 36 66 36 52 Z"/>
            <circle cx="50" cy="52" r="6" fill="#faf5ff"/><circle cx="70" cy="52" r="6" fill="#faf5ff"/>
            <polygon points="60,60 56,68 64,68" fill="#faf5ff"/>`
      };
    }
    if (n.includes('mano') || n.includes('teletransp') || n.includes('paso brumoso') || n.includes('puerta dimensional') || n.includes('espíritus')) {
      return {
        c: '#0f766e', g: '#2dd4bf', bg: '#f0fdfa',
        p: `<ellipse cx="60" cy="60" rx="26" ry="36" fill="none" stroke="#0f766e" stroke-width="4" stroke-dasharray="6 4"/>
            <path d="M46 78 L46 48 C46 44 52 44 52 48 L52 40 C52 36 58 36 58 40 L58 36 C58 32 64 32 64 36 L64 42 C64 38 70 38 70 42 L70 64 L78 54 C82 52 84 58 78 64 L68 82 Z"/>`
      };
    }
    if (n.includes('detectar') || n.includes('marca') || n.includes('guía') || n.includes('adivinación')) {
      return {
        c: '#b45309', g: '#f59e0b', bg: '#fffbeb',
        p: `<path d="M18 60 C36 34 84 34 102 60 C84 86 36 86 18 60 Z" fill="none" stroke="#b45309" stroke-width="4"/>
            <circle cx="60" cy="60" r="14"/><circle cx="60" cy="60" r="5" fill="#fffbeb"/>`
      };
    }
    return {
      c: '#7e22ce', g: '#c084fc', bg: '#faf5ff',
      p: `<polygon points="60,16 72,46 104,46 78,66 88,96 60,78 32,96 42,66 16,46 48,46"/>
          <circle cx="60" cy="58" r="12" fill="#faf5ff"/>`
    };
  }

  // 4. SILUETAS SOMBRÍAS DEL BESTIARIO DE MONSTRUOS
  function getMonsterVisualSpec(m) {
    const id = (m.id || '').toLowerCase();
    const t = (m.type || '').toLowerCase();
    if (id.includes('dragon') || t.includes('dragón')) {
      return {
        c: '#991b1b', g: '#f59e0b', bg: '#fef2f2',
        p: `<path d="M16 44 C28 20 46 30 54 50 L60 30 L66 50 C74 30 92 20 104 44 C92 56 80 62 72 74 L84 96 L60 84 L36 96 L48 74 C40 62 28 56 16 44 Z"/>
            <circle cx="55" cy="42" r="2.5" fill="#fef08a"/><circle cx="65" cy="42" r="2.5" fill="#fef08a"/>`
      };
    }
    if (id === 'beholder') {
      return {
        c: '#581c87', g: '#c084fc', bg: '#faf5ff',
        p: `<circle cx="60" cy="64" r="26"/>
            <circle cx="60" cy="58" r="11" fill="#faf5ff"/><circle cx="60" cy="58" r="5" fill="#581c87"/>
            <path d="M46 76 Q60 86 74 76" fill="none" stroke="#faf5ff" stroke-width="3"/>
            <path d="M42 42 C34 26 24 28 26 20 M52 38 C48 20 42 18 44 14 M68 38 C72 20 78 18 76 14 M78 42 C86 26 96 28 94 20" fill="none" stroke="#581c87" stroke-width="3.5" stroke-linecap="round"/>`
      };
    }
    if (id === 'mimic') {
      return {
        c: '#78350f', g: '#f59e0b', bg: '#fffbeb',
        p: `<path d="M26 52 L94 36 L90 22 L24 36 Z"/>
            <rect x="26" y="56" width="68" height="36" rx="4"/>
            <polygon points="34,52 38,62 42,52 48,62 54,52 60,64 66,52 72,62 78,52 84,60 88,52" fill="#fffbeb"/>
            <path d="M58 62 C66 78 86 82 98 70" fill="none" stroke="#dc2626" stroke-width="6" stroke-linecap="round"/>`
      };
    }
    if (id === 'gelatinous_cube') {
      return {
        c: '#0d9488', g: '#5eead4', bg: '#f0fdfa',
        p: `<polygon points="32,36 76,24 92,40 92,84 48,96 32,80" opacity="0.45"/>
            <rect x="32" y="36" width="44" height="44" fill="none" stroke="#0f766e" stroke-width="3"/>
            <circle cx="54" cy="54" r="8" fill="#f0fdfa"/>
            <line x1="44" y1="76" x2="76" y2="44" stroke="#0f766e" stroke-width="4"/>`
      };
    }
    if (id === 'mind_flayer') {
      return {
        c: '#4c1d95', g: '#a78bfa', bg: '#f5f3ff',
        p: `<path d="M40 44 C40 22 80 22 80 44 C80 56 72 64 70 68 L50 68 C48 64 40 56 40 44 Z"/>
            <circle cx="52" cy="46" r="4" fill="#fef08a"/><circle cx="68" cy="46" r="4" fill="#fef08a"/>
            <path d="M48 66 C40 80 34 92 42 98 M56 68 C52 84 50 96 56 102 M64 68 C68 84 70 96 64 102 M72 66 C80 80 86 92 78 98" fill="none" stroke="#4c1d95" stroke-width="4" stroke-linecap="round"/>`
      };
    }
    if (id === 'tarrasque') {
      return {
        c: '#7f1d1d', g: '#ea580c', bg: '#fff1f2',
        p: `<path d="M22 88 L32 52 L18 32 L46 42 L58 18 L66 40 L96 24 L82 54 L98 64 L86 88 Z"/>
            <circle cx="70" cy="48" r="4" fill="#fef08a"/>
            <polygon points="62,64 68,74 74,64 80,74 86,64" fill="#fff1f2"/>`
      };
    }
    if (t.includes('muerto') || id === 'lich' || id === 'vampire') {
      return {
        c: '#1e293b', g: '#ef4444', bg: '#f8fafc',
        p: `<polygon points="40,28 48,16 60,26 72,16 80,28"/>
            <path d="M38 52 C38 30 82 30 82 52 C82 66 74 72 72 88 L48 88 C46 72 38 66 38 52 Z"/>
            <circle cx="50" cy="52" r="5" fill="#ef4444"/><circle cx="70" cy="52" r="5" fill="#ef4444"/>`
      };
    }
    return {
      c: '#7f1d1d', g: '#d97706', bg: '#fef2f2',
      p: `<path d="M30 88 L38 52 L28 32 L48 40 L60 22 L72 40 L92 32 L82 52 L90 88 Z"/>
          <circle cx="48" cy="50" r="4" fill="#fef08a"/><circle cx="72" cy="50" r="4" fill="#fef08a"/>
          <polygon points="46,68 54,78 60,68 66,78 74,68" fill="#fef2f2"/>`
    };
  }

  function wrapArtMedia(imgFilename, innerSvg, altText) {
    if (!imgFilename) {
      return `<div class="comp-art-frame"><div class="comp-art-svg-fallback" style="display:block;">${innerSvg}</div></div>`;
    }
    const imgSrc = `assets/compendium/${imgFilename}`;
    return `
      <div class="comp-art-frame">
        <div class="comp-art-svg-fallback">${innerSvg}</div>
        <img src="${imgSrc}" class="comp-art-img" alt="${altText || 'Ilustración D&D'}" loading="lazy" onerror="this.style.display='none';" />
      </div>
    `;
  }

  function getSpellImageFilename(spell) {
    const n = `${spell.name || ''} ${spell.school || ''} ${spell.desc || ''}`.toLowerCase();
    if (n.includes('fuego') || n.includes('ardiente') || n.includes('abrasador') || n.includes('meteorito') || n.includes('llama')) return 'hechizos/spell_fire.png';
    if (n.includes('escudo') || n.includes('armadura') || n.includes('muro') || n.includes('abjuración') || n.includes('contraconjuro')) return 'hechizos/spell_shield.png';
    if (n.includes('curar') || n.includes('curación') || n.includes('sanar') || n.includes('revivir') || n.includes('restauración') || n.includes('bendición') || n.includes('piedad')) return 'hechizos/spell_heal.png';
    if (n.includes('nigromancia') || n.includes('mortal') || n.includes('veneno') || n.includes('moribundo')) return 'hechizos/spell_necro.png';
    return null;
  }

  function getMonsterImageFilename() {
    return null;
  }

  window.getDndClassArtSvg = function (classId) {
    const spec = CLASS_SILHOUETTES[classId] || CLASS_SILHOUETTES.fighter;
    const svg = wrapMedallionSvg(spec.p, spec.c, spec.g, spec.bg);
    return wrapArtMedia(`clases/${classId}.png`, svg, `Clase ${classId}`);
  };

  window.getDndSpeciesArtSvg = function (speciesId) {
    const spec = SPECIES_SILHOUETTES[speciesId] || SPECIES_SILHOUETTES.human;
    const svg = wrapMedallionSvg(spec.p, spec.c, spec.g, spec.bg);
    return wrapArtMedia(`razas/${speciesId}.png`, svg, `Especie ${speciesId}`);
  };

  window.getDndSpellArtSvg = function (spell) {
    const spec = getSpellVisualSpec(spell || {});
    const svg = wrapMedallionSvg(spec.p, spec.c, spec.g, spec.bg);
    const imgFile = getSpellImageFilename(spell || {});
    return wrapArtMedia(imgFile, svg, spell.name || 'Hechizo');
  };

  window.getDndMonsterArtSvg = function (monster) {
    const spec = getMonsterVisualSpec(monster || {});
    const svg = wrapMedallionSvg(spec.p, spec.c, spec.g, spec.bg);
    const imgFile = getMonsterImageFilename(monster || {});
    return wrapArtMedia(imgFile, svg, monster.name || 'Monstruo');
  };
})();
