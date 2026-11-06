/**
 * ============================================================================
 * CONTROLADOR DEL ALTAR DINÁMICO DE PERSONAJE, SOMBRA ANTROPOMÓRFICA Y BESTIARIO
 * Pestaña 1: Raza (Izq) · Sombra Antropomórfica (Centro) · Clase (Der) · Conjuros
 * Pestaña 2: Bestiario de Monstruos (Statblocks) y Libros Oficiales
 * ============================================================================
 */
(function () {
  'use strict';

  const ATTR_LABELS = { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };
  const STAT_NAMES = ['FUE', 'DES', 'CON', 'INT', 'SAB', 'CAR'];

    const altarState = {
    rosterId: 'live_sheet', charName: 'Héroe de la Ficha', speciesId: 'elf', classId: 'wizard',
    level: 5, activeSpellLevel: 1, activeTurnTab: 'main', expandedSpells: {},
    equippedSpells: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }
  };
  const fmtMod = score => { const m = Math.floor((score - 10) / 2); return m >= 0 ? `+${m}` : `${m}`; };
  const getMergedSpells = () => [...(window.DND_55E_SPELLS_COMPENDIUM || []), ...(window.DND_COMPENDIUM_EXTRA_SPELLS || [])].sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
  const getSlots = (cId, lvl) => window.getDndSlotsForClassAndLevel?.(cId, lvl) || { 0: 3, 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  function loadFromLiveSheet() {
    const sheetName = (document.getElementById('char-name')?.value || '').trim();
    const sheetRace = document.getElementById('char-race')?.value;
    const sheetClass = document.getElementById('char-class-1')?.value;
    const sheetLvl = parseInt(document.getElementById('char-level-1')?.value, 10);
    altarState.charName = sheetName || 'Héroe de mi Ficha';
    if (sheetRace && window.DND_55E_SPECIES?.[sheetRace]) altarState.speciesId = sheetRace;
    if (sheetClass && window.DND_55E_CLASSES?.[sheetClass]) altarState.classId = sheetClass;
    if (sheetLvl >= 1 && sheetLvl <= 20) altarState.level = sheetLvl;
    for (let l = 0; l <= 9; l++) {
      const inputs = Array.from(document.querySelectorAll(`#spells-list-${l} .spell-name-input`));
      altarState.equippedSpells[l] = inputs.map(inp => inp.value.split(' — ')[0].trim()).filter(Boolean);
    }
  }

  function syncAltarToLiveSheet() {
    const raceSel = document.getElementById('char-race');
    const classSel = document.getElementById('char-class-1');
    const lvlSel = document.getElementById('char-level-1');
    if (raceSel && raceSel.value !== altarState.speciesId) { raceSel.value = altarState.speciesId; raceSel.dispatchEvent(new Event('change', { bubbles: true })); }
    if (classSel && classSel.value !== altarState.classId) classSel.value = altarState.classId;
    if (lvlSel) lvlSel.value = String(altarState.level);
    classSel?.dispatchEvent(new Event('change', { bubbles: true }));
    const allSpells = getMergedSpells();
    if (typeof addSpellRow === 'function') {
      for (let l = 0; l <= 9; l++) {
        const cont = document.getElementById(`spells-list-${l}`);
        if (!cont) continue;
        cont.innerHTML = '';
        (altarState.equippedSpells[l] || []).forEach(spName => {
          const found = allSpells.find(s => s.name === spName);
          addSpellRow(l, found ? `${found.name} — ${found.desc}` : spName, true, 'class');
        });
      }
    }
  }

  function populateRosterDropdown() {
    const sel = document.getElementById('comp-char-roster-select');
    if (!sel || typeof window.getCompendiumCharactersRoster !== 'function') return;
    const roster = window.getCompendiumCharactersRoster();
    const classes = window.DND_55E_CLASSES || {}, species = window.DND_55E_SPECIES || {};
    sel.innerHTML = `<option value="live_sheet">Ficha Actual: ${altarState.charName} (En Vivo)</option>` +
      roster.map(c => `<option value="${c.id}" ${altarState.rosterId === c.id ? 'selected' : ''}>${c.name} — ${species[c.species]?.name || c.species} ${classes[c.classId]?.name || c.classId} (Nvl ${c.level})</option>`).join('');
    const badge = document.getElementById('badge-saved-sheets-count');
    if (badge) badge.textContent = String(roster.length);
    renderSavedSheetsGallery(roster);
  }

  function renderSavedSheetsGallery(rosterList) {
    const grid = document.getElementById('comp-saved-sheets-grid');
    if (!grid) return;
    const roster = rosterList || (window.getCompendiumCharactersRoster?.() || []);
    if (!roster.length) {
      grid.innerHTML = `<div class="saved-sheets-empty-state"><p>Aún no tienes fichas guardadas en tu archivo visual.</p><small>Haz clic en <strong>+ Guardar Ficha Actual</strong> para guardar tu personaje con la imagen de su ficha plana.</small></div>`;
      return;
    }
    grid.innerHTML = roster.map(entry => {
      const flatImgHtml = window.buildFlatSheetPreviewHtml?.(entry) || '';
      const isSelected = altarState.rosterId === entry.id ? 'is-active-sheet-card' : '';
      return `<article class="saved-sheet-gallery-card ${isSelected}">
        <div class="saved-sheet-preview-wrap" data-load-sheet-3d="${entry.id}">${flatImgHtml}</div>
        <div class="saved-sheet-card-footer">
          <span class="saved-sheet-timestamp">Guardada: ${entry.savedAt || 'Reciente'}</span>
          <div class="saved-sheet-btn-group">
            <button type="button" class="btn-sheet-card-act is-3d" data-load-sheet-3d="${entry.id}">Ver en Creador 3D</button>
            <button type="button" class="btn-sheet-card-act is-flat" data-open-flat-sheet="${entry.id}">Abrir Ficha Plana</button>
            <button type="button" class="btn-sheet-card-act is-del" data-delete-saved-sheet="${entry.id}" title="Eliminar ficha">Eliminar</button>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  function renderRaceColumn() {
    const grid = document.getElementById('comp-race-picker-grid'), detail = document.getElementById('comp-selected-race-detail');
    const speciesMap = window.DND_55E_SPECIES || {}, extras = window.DND_COMPENDIUM_SPECIES_EXTRAS || {};
    if (!grid || !detail) return;
    grid.innerHTML = Object.values(speciesMap).map(sp => `<button type="button" class="comp-picker-tile ${sp.id === altarState.speciesId ? 'active' : ''}" data-pick-species="${sp.id}"><div class="picker-tile-art">${window.getDndSpeciesArtSvg?.(sp.id) || ''}</div><span class="picker-tile-name">${sp.name}</span><small class="picker-tile-sub">${sp.speed} pies</small></button>`).join('');
    const sp = speciesMap[altarState.speciesId] || Object.values(speciesMap)[0], ex = extras[sp.id] || {}, art = window.getDndSpeciesArtSvg?.(sp.id) || '';
    detail.innerHTML = `<div class="comp-card has-art-card comp-active-detail-card"><div class="comp-shadow-watermark">${art}</div><div class="comp-card-head"><div class="comp-art-head-left"><div class="comp-art-medallion">${art}</div><div><span class="comp-book-tag">Raza Seleccionada · ${ex.book || 'PHB 2024'}</span><h3 class="comp-card-title">${sp.name}</h3><p class="comp-card-role">${ex.lineage || ''}</p></div></div></div><p class="comp-card-summary">${ex.desc || ''}</p><div class="comp-meta-pills"><span class="comp-pill"><strong>Tamaño:</strong> ${sp.size}</span><span class="comp-pill"><strong>Velocidad:</strong> ${sp.speed} pies (${Math.round(sp.speed / 5)} casillas)</span></div><div class="comp-subblock"><div class="comp-subblock-title">Rasgos Innatos de ${sp.name}</div><ul class="comp-bullet-list">${(sp.traits || []).map(t => `<li>${t}</li>`).join('')}</ul></div></div>`;
  }

  function renderAnthropomorphicCenter() {
    const stage = document.getElementById('comp-anthropomorphic-stage');
    if (!stage) return;
    const sp = (window.DND_55E_SPECIES || {})[altarState.speciesId] || { name: 'Humano', speed: 30 };
    const cls = (window.DND_55E_CLASSES || {})[altarState.classId] || { name: 'Guerrero', hitDie: 10 };
    const exCls = (window.DND_COMPENDIUM_CLASS_EXTRAS || {})[altarState.classId] || {};
    const shadowSvg = window.buildAnthropomorphicShadowSvg?.(altarState.speciesId, altarState.classId, altarState.level) || '';
    const spArt = window.getDndSpeciesArtSvg?.(altarState.speciesId) || '', clArt = window.getDndClassArtSvg?.(altarState.classId) || '';
    const slots = getSlots(altarState.classId, altarState.level);
    const totalSlots = Object.entries(slots).filter(([k, v]) => k !== '0' && v > 0).map(([k, v]) => `Nvl ${k}: ${v}`).join(' · ') || 'Marcial';
    const estHp = cls.hitDie + 2 + (altarState.level - 1) * (Math.floor(cls.hitDie / 2) + 3);
    stage.innerHTML = `<div class="anthropomorphic-altar-card"><div class="altar-fusion-header"><span class="altar-fusion-badge">FUSIÓN ANTROPOMÓRFICA EN VIVO</span><h3 class="altar-hero-name">${altarState.charName}</h3><p class="altar-hero-archetype">${sp.name} · ${cls.name} (Nivel ${altarState.level})</p></div><div class="altar-figure-viewport"><div class="altar-corner-token is-left"><div class="comp-art-medallion">${spArt}</div><span>${sp.name}</span></div><div class="altar-shadow-canvas">${shadowSvg}</div><div class="altar-corner-token is-right"><div class="comp-art-medallion">${clArt}</div><span>${cls.name}</span></div></div><div class="altar-stats-strip"><div class="altar-stat-box"><span>PG ESTIMADOS</span><strong>${estHp} PG</strong></div><div class="altar-stat-box"><span>DADO GOLPE</span><strong>${altarState.level}d${cls.hitDie}</strong></div><div class="altar-stat-box"><span>VELOCIDAD</span><strong>${sp.speed} pies</strong></div><div class="altar-stat-box"><span>ATRIBUTO</span><strong>${cls.spellAttr ? ATTR_LABELS[cls.spellAttr] : (exCls.primaryAttr || 'FUE/DES')}</strong></div></div><div class="altar-slots-preview-banner"><strong>Espacios de Conjuro (Nvl ${altarState.level}):</strong> Trucos (${slots[0]}) · ${totalSlots}</div></div>`;
  }

  function renderClassColumn() {
    const grid = document.getElementById('comp-class-picker-grid'), detail = document.getElementById('comp-selected-class-detail');
    const classMap = window.DND_55E_CLASSES || {}, extras = window.DND_COMPENDIUM_CLASS_EXTRAS || {}, lvlTable = (window.DND_55E_CLASS_LEVEL_TABLE || {})[altarState.classId];
    if (!grid || !detail) return;
    grid.innerHTML = Object.values(classMap).map(cls => `<button type="button" class="comp-picker-tile ${cls.id === altarState.classId ? 'active' : ''}" data-pick-class="${cls.id}"><div class="picker-tile-art">${window.getDndClassArtSvg?.(cls.id) || ''}</div><span class="picker-tile-name">${cls.name}</span><small class="picker-tile-sub">Dado d${cls.hitDie}</small></button>`).join('');
    const cls = classMap[altarState.classId] || Object.values(classMap)[0], ex = extras[cls.id] || {}, art = window.getDndClassArtSvg?.(cls.id) || '';
    const savesTxt = (cls.saves || []).map(s => ATTR_LABELS[s] || s.toUpperCase()).join(' · ');
    const progList = [];
    if (lvlTable && lvlTable.levels) {
      for (let l = 1; l <= altarState.level; l++) {
        if (lvlTable.levels[l]) progList.push(`<li><strong>[Nvl ${l}]</strong> ${lvlTable.levels[l].join(' · ')}</li>`);
      }
    } else {
      progList.push(...(cls.features || []).map(f => `<li>${f}</li>`), ...(ex.progression || []).map(p => `<li>${p}</li>`));
    }
    const resBanner = lvlTable?.resourceLabel ? `<div class="comp-pill" style="margin-bottom:0.45rem; display:inline-block;"><strong>Recursos (Nvl ${altarState.level}):</strong> ${lvlTable.resourceLabel(altarState.level)}</div>` : '';
    detail.innerHTML = `<div class="comp-card has-art-card comp-active-detail-card"><div class="comp-shadow-watermark">${art}</div><div class="comp-card-head"><div class="comp-art-head-left"><div class="comp-art-medallion">${art}</div><div><span class="comp-book-tag">Clase Seleccionada · d${cls.hitDie}</span><h3 class="comp-card-title">${cls.name}</h3><p class="comp-card-role">${ex.role || ''}</p></div></div></div><p class="comp-card-summary">${ex.summary || ''}</p><div class="comp-meta-pills"><span class="comp-pill"><strong>Atributo:</strong> ${ex.primaryAttr || savesTxt}</span><span class="comp-pill"><strong>Salvaciones:</strong> ${savesTxt}</span><span class="comp-pill"><strong>Armaduras:</strong> ${(cls.armor || []).join(', ')}</span></div>${resBanner}<div class="comp-subblock"><div class="comp-subblock-title">Rasgos Desbloqueados (Nivel 1 al ${altarState.level})</div><ul class="comp-bullet-list">${progList.join('')}</ul></div><div class="comp-subclasses-row"><span class="comp-sub-label">Subclases:</span>${(ex.subclasses || []).map(sc => `<span class="comp-subclass-chip">${sc}</span>`).join('')}</div></div>`;
  }

  // 4. GESTOR DE ESPACIOS DE CONJURO INTERCAMBIABLES SEGÚN EL NIVEL
  function renderSpellSlotsWorkbench(query) {
    const pillsBar = document.getElementById('comp-spell-level-pills');
    const equippedBox = document.getElementById('comp-equipped-slots-box');
    const availableBox = document.getElementById('comp-available-spells-box');
    if (!pillsBar || !equippedBox || !availableBox) return;

    const slots = getSlots(altarState.classId, altarState.level);
    const unlockedLevels = Object.keys(slots).map(Number).filter(l => l === 0 || slots[l] > 0);
    if (!unlockedLevels.includes(altarState.activeSpellLevel)) {
      altarState.activeSpellLevel = unlockedLevels[unlockedLevels.length - 1] || 0;
    }

    pillsBar.innerHTML = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
      const cap = slots[lvl] || 0;
      const eqCount = (altarState.equippedSpells[lvl] || []).length;
      const isUnlocked = lvl === 0 || cap > 0;
      const lbl = lvl === 0 ? `Trucos Nvl 0 (${eqCount}/${cap})` : `Nivel ${lvl} (${eqCount}/${cap} esp.)`;
      return `<button type="button" class="spell-slot-lvl-pill ${lvl === altarState.activeSpellLevel ? 'active' : ''} ${isUnlocked ? 'is-unlocked' : 'is-locked'}" data-select-spell-lvl="${lvl}">${lbl}</button>`;
    }).join('');

    const curLvl = altarState.activeSpellLevel;
    const maxSlots = Math.max(slots[curLvl] || 1, (altarState.equippedSpells[curLvl] || []).length);
    const equippedList = altarState.equippedSpells[curLvl] || [];
    const allSpells = getMergedSpells();
    const levelLabel = curLvl === 0 ? 'Trucos (Nvl 0)' : `Conjuros de Nivel ${curLvl}`;

    let socketsHtml = '';
    for (let i = 0; i < maxSlots; i++) {
      const spName = equippedList[i];
      const spObj = spName ? allSpells.find(s => s.name === spName) || { name: spName, school: 'Conjuro', level: curLvl, time: '1 acción', range: 'Personal', desc: '' } : null;
      if (spObj) {
        const sKey = spObj.name.replace(/"/g, '&quot;');
        const isOpen = !!altarState.expandedSpells[`slot_${curLvl}_${i}`];
        const art = window.getDndSpellArtSvg?.(spObj) || '';
        socketsHtml += `<div class="spell-socket-card is-filled"><div class="socket-card-top"><div class="comp-art-medallion is-spell-medallion">${art}</div><div class="socket-title-wrap"><div class="socket-meta-row"><span class="socket-slot-tag">ESPACIO #${i + 1}</span><span class="socket-school-badge">${spObj.school || 'Arcano'}</span></div><strong class="socket-spell-title">${spObj.name}</strong></div><div class="socket-actions-wrap"><button type="button" class="btn-cast-spell-now" data-cast-spell="${sKey}" data-cast-lvl="${curLvl}" data-cast-desc="${(spObj.desc || '').replace(/"/g, '&quot;')}">Lanzar</button><button type="button" class="btn-spell-more-info ${isOpen ? 'is-open' : ''}" data-more-spell="slot_${curLvl}_${i}">${isOpen ? 'Ocultar' : 'Ver más'}</button><button type="button" class="btn-socket-remove" data-unequip-spell="${sKey}" data-unequip-lvl="${curLvl}">Quitar</button></div></div>${isOpen ? `<div class="spell-more-drawer"><div class="comp-spell-meta-strip"><span><strong>Tiempo:</strong> ${spObj.time || '1 acción'}</span><span><strong>Alcance:</strong> ${spObj.range || 'Personal'}</span></div><p class="socket-spell-desc">${spObj.desc || 'Hechizo equipado en tu grimorio activo.'}</p></div>` : ''}</div>`;
      } else {
        socketsHtml += `<div class="spell-socket-card is-empty"><div class="socket-card-top"><div class="socket-empty-circle">${i + 1}</div><div class="socket-title-wrap"><span class="socket-slot-tag">ESPACIO LIBRE #${i + 1}</span><strong class="socket-spell-title">Haz clic en un hechizo disponible abajo para asignarlo</strong></div></div></div>`;
      }
    }

    equippedBox.innerHTML = `<div class="workbench-panel-header"><div><span class="workbench-panel-kicker">ESPACIOS DE CONJURO</span><h3 class="workbench-col-title">Tus Espacios de ${levelLabel}</h3></div><span class="workbench-counter-badge">${equippedList.length} / ${maxSlots} Ocupados</span></div><div class="sockets-stack">${socketsHtml}</div>`;

    const q = (query || '').trim().toLowerCase();
    const candidates = allSpells.filter(s => s.level === curLvl && (!q || `${s.name} ${s.school} ${s.desc}`.toLowerCase().includes(q)));
    availableBox.innerHTML = `<div class="workbench-panel-header"><div><span class="workbench-panel-kicker">HAZ CLIC PARA ASIGNAR AL ESPACIO</span><h3 class="workbench-col-title">Hechizos Disponibles (${levelLabel})</h3></div><span class="workbench-counter-badge is-catalog">${candidates.length} Hechizos</span></div><div class="available-spells-scroll">` +
      (candidates.map(sp => {
        const slotIdx = equippedList.indexOf(sp.name);
        const isEq = slotIdx >= 0;
        const sKey = sp.name.replace(/"/g, '&quot;');
        const infoKey = `cat_${curLvl}_${sp.name}`;
        const isOpen = !!altarState.expandedSpells[infoKey];
        const art = window.getDndSpellArtSvg?.(sp) || '';
        return `<div class="comp-card comp-spell-card has-art-card is-compact-spell is-selectable-spell ${isEq ? 'is-equipped-spell' : ''}" data-toggle-spell="${sKey}" data-toggle-lvl="${curLvl}" role="button" tabindex="0" title="Haz clic para asignar o quitar de tus espacios de conjuro"><div class="comp-spell-art-row"><div class="comp-art-medallion is-spell-medallion">${art}</div><div class="comp-spell-head-info"><div class="comp-spell-badges-line"><span class="comp-spell-lvl-badge">${sp.school}</span><span class="spell-select-pill ${isEq ? 'is-active' : ''}">${isEq ? 'En Espacio #' + (slotIdx + 1) : '+ Asignar'}</span></div><h4 class="comp-spell-name">${sp.name}</h4></div><button type="button" class="btn-spell-more-info ${isOpen ? 'is-open' : ''}" data-more-spell="${infoKey.replace(/"/g, '&quot;')}">${isOpen ? 'Ocultar' : 'Ver más'}</button></div>${isOpen ? `<div class="spell-more-drawer"><div class="comp-spell-meta-strip"><span><strong>Tiempo:</strong> ${sp.time}</span><span><strong>Alcance:</strong> ${sp.range}</span><span><strong>Nivel:</strong> ${sp.level === 0 ? 'Truco' : sp.level}</span></div><p class="comp-spell-desc">${sp.desc}</p></div>` : ''}</div>`;
      }).join('') || '<p class="comp-empty-msg">No hay hechizos en este nivel con ese filtro.</p>') + `</div>`;
  }

  // 5. GUÍA INTERACTIVA DE TURNO DEL JUGADOR
  function renderTurnGuide() {
    const container = document.getElementById('comp-turn-guide-container');
    const guide = window.DND_PLAYER_TURN_GUIDE;
    if (!container || !guide) return;
    const sp = (window.DND_55E_SPECIES || {})[altarState.speciesId] || { name: 'Humano', speed: 30 };
    const overviewHtml = guide.overview.map(item => `<div class="turn-phase-pillar"><span class="turn-pillar-tag">${item.tag}</span><h4 class="turn-pillar-title">${item.title}</h4><span class="turn-pillar-limit">${item.id === 'move' ? `Tu raza (${sp.name}): ${sp.speed} pies/turno` : item.limit}</span><p class="turn-pillar-desc">${item.desc}</p></div>`).join('');
    const subView = altarState.activeTurnTab === 'masteries'
      ? guide.weaponMasteries.map(m => `<div class="turn-mastery-chip-card"><div class="turn-action-head"><strong class="turn-action-name">${m.name}</strong><span class="turn-action-type">${m.weapons}</span></div><p class="turn-action-desc">${m.desc}</p></div>`).join('')
      : guide.mainActions.map(act => `<div class="turn-action-card"><div class="turn-action-head"><strong class="turn-action-name">${act.name}</strong><span class="turn-action-type">${act.type}</span></div><p class="turn-action-desc">${act.desc}</p></div>`).join('');
    container.innerHTML = `<div class="turn-pillars-grid">${overviewHtml}</div><div class="turn-interactive-switcher"><button type="button" class="btn-turn-switch ${altarState.activeTurnTab !== 'masteries' ? 'active' : ''}" data-turn-sub="main">Las 12 Acciones Principales en Combate</button><button type="button" class="btn-turn-switch ${altarState.activeTurnTab === 'masteries' ? 'active' : ''}" data-turn-sub="masteries">Propiedades de Maestría de Armas (2024)</button></div><div class="comp-cards-grid-3col">${subView}</div>`;
  }

  // 6. BESTIARIO Y LIBROS OFICIALES (PESTAÑA 2)
  function renderBestiaryAndBooks(query, crFilter) {
    const monstersGrid = document.getElementById('comp-monsters-grid');
    if (!monstersGrid) return;
    const q = (query || '').trim().toLowerCase();
    const crMode = crFilter || 'all';
    const monsters = (window.DND_OFFICIAL_BESTIARY || []).filter(m => {
      if (crMode === 'low' && m.crNum > 1) return false;
      if (crMode === 'mid' && (m.crNum < 2 || m.crNum > 5)) return false;
      if (crMode === 'high' && (m.crNum < 7 || m.crNum > 13)) return false;
      if (crMode === 'epic' && m.crNum < 19) return false;
      return !q || `${m.name} ${m.type} ${m.cr} ${(m.traits || []).join(' ')}`.toLowerCase().includes(q);
    });
    monstersGrid.innerHTML = monsters.map(m => {
      const mArt = window.getDndMonsterArtSvg?.(m) || '';
      return `<div class="monster-statblock-card has-art-card"><div class="comp-shadow-watermark">${mArt}</div><div class="statblock-top-bar"><div class="comp-art-head-left"><div class="comp-art-medallion is-monster-medallion">${mArt}</div><div><h3 class="statblock-name">${m.name}</h3><p class="statblock-meta">${m.size} · ${m.type} · ${m.align}</p></div></div><div class="statblock-cr-badge"><span>DESAFÍO (CR)</span><strong>${m.cr}</strong><small>${m.xp.toLocaleString()} XP</small></div></div><div class="statblock-vitals"><span><strong>CA:</strong> ${m.ac}</span><span><strong>PG:</strong> ${m.hp} (${m.hitFormula})</span><span><strong>Velocidad:</strong> ${m.speed}</span><button type="button" class="btn-arena-fight-monster" data-fight-monster="${m.id}">Enfrentar en Arena</button></div><div class="statblock-abilities-row">${m.stats.map((val, idx) => `<div class="statblock-ability-cell"><span class="sb-abi-lbl">${STAT_NAMES[idx]}</span><strong class="sb-abi-val">${val} (${fmtMod(val)})</strong></div>`).join('')}</div><div class="statblock-details"><div><strong>Sentidos:</strong> ${m.senses}</div><div><strong>Defensas:</strong> ${m.immunities}</div></div><div class="statblock-traits">${(m.traits || []).map(t => `<p class="sb-trait-line">${t}</p>`).join('')}</div><div class="statblock-actions-box"><div class="sb-actions-header">ACCIONES DEL MONSTRUO</div>${(m.actions || []).map(act => `<div class="sb-action-item"><div class="sb-action-main"><strong>${act.name}</strong> <span class="sb-hit-tag">${act.hit}</span>: ${act.desc}</div><button type="button" class="btn-monster-roll" data-monster-roll="${act.roll}" data-monster-label="${m.name}: ${act.name}">Tirar ${act.roll}</button></div>`).join('')}</div></div>`;
    }).join('') || '<p class="comp-empty-msg">No se encontraron monstruos.</p>';

    const lib = window.DND_OFFICIAL_BOOKS_COMPENDIUM;
    if (!lib) return;
    const booksGrid = document.getElementById('comp-books-grid');
    const itemsGrid = document.getElementById('comp-magic-items-grid');
    const featsContainer = document.getElementById('comp-feats-rules-container');
    if (booksGrid) booksGrid.innerHTML = lib.books.map(b => `<div class="comp-card comp-book-card"><span class="comp-book-tag">${b.code}</span><h3 class="comp-card-title">${b.title}</h3><p class="comp-card-role">${b.role}</p><p class="comp-card-summary">${b.summary}</p><ul class="comp-bullet-list">${b.highlights.map(h => `<li>${h}</li>`).join('')}</ul></div>`).join('');
    if (itemsGrid) itemsGrid.innerHTML = lib.magicItems.map(item => `<div class="comp-card comp-spell-card"><div class="comp-spell-top"><span class="comp-spell-lvl-badge">${item.rarity}</span><span class="comp-spell-school">${item.book}</span></div><h4 class="comp-spell-name">${item.name}</h4><div class="comp-spell-meta"><span><strong>Sintonización:</strong> ${item.attune}</span></div><p class="comp-spell-desc">${item.desc}</p></div>`).join('');
    if (featsContainer) featsContainer.innerHTML = `<div class="comp-cards-grid-4col">${lib.coreFeats.map(f => `<div class="turn-action-card"><div class="turn-action-head"><strong class="turn-action-name">${f.name}</strong><span class="turn-action-type">${f.type}</span></div><p class="turn-action-desc">${f.desc}</p></div>`).join('')}</div>`;
  }

  function renderAllAltar() {
    populateRosterDropdown();
    const lvlSel = document.getElementById('comp-altar-level-select');
    if (lvlSel) lvlSel.value = String(altarState.level);
    renderRaceColumn();
    renderAnthropomorphicCenter();
    renderClassColumn();
    renderSpellSlotsWorkbench(document.getElementById('comp-player-search')?.value || '');
    renderTurnGuide();
  }

  function openCompendiumView(tabName) {
    if (altarState.rosterId === 'live_sheet') loadFromLiveSheet();
    renderAllAltar();
    document.getElementById('sheets-document').style.display = 'none';
    document.getElementById('dnd-compendium-view').style.display = 'block';
    const btnRet = document.getElementById('btn-return-sheet-top');
    if (btnRet) btnRet.style.display = 'inline-flex';
    switchCompendiumTab(tabName || 'player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeCompendiumView() {
    document.getElementById('dnd-compendium-view').style.display = 'none';
    document.getElementById('sheets-document').style.display = '';
    const btnRet = document.getElementById('btn-return-sheet-top');
    if (btnRet) btnRet.style.display = 'none';
  }

  function switchCompendiumTab(tabId) {
    document.querySelectorAll('.comp-main-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.compTab === tabId));
    document.getElementById('comp-tab-panel-player')?.classList.toggle('active', tabId === 'player');
    document.getElementById('comp-tab-panel-bestiary')?.classList.toggle('active', tabId === 'bestiary');
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadFromLiveSheet();
    renderAllAltar();
    renderBestiaryAndBooks('', 'all');

    document.getElementById('btn-open-compendium-nav')?.addEventListener('click', () => openCompendiumView('player'));
    document.getElementById('btn-open-bestiary-nav')?.addEventListener('click', () => openCompendiumView('bestiary'));
    document.getElementById('btn-close-compendium-view')?.addEventListener('click', closeCompendiumView);
    document.getElementById('btn-return-sheet-top')?.addEventListener('click', closeCompendiumView);
    document.getElementById('btn-sync-altar-to-sheet')?.addEventListener('click', () => { syncAltarToLiveSheet(); closeCompendiumView(); });
    const saveCurrentAndRefresh = () => {
      syncAltarToLiveSheet();
      if (typeof window.saveCurrentSheetCharacterToRoster === 'function') {
        altarState.rosterId = window.saveCurrentSheetCharacterToRoster();
        populateRosterDropdown();
        const drawer = document.getElementById('comp-all-sheets-gallery-drawer');
        if (drawer) drawer.style.display = 'block';
        window.showToast?.('Ficha guardada con su imagen de Ficha Plana');
      }
    };
    document.getElementById('btn-save-char-to-roster')?.addEventListener('click', saveCurrentAndRefresh);
    document.getElementById('btn-save-sheet-from-drawer')?.addEventListener('click', saveCurrentAndRefresh);
    document.getElementById('btn-toggle-all-sheets-gallery')?.addEventListener('click', () => {
      const d = document.getElementById('comp-all-sheets-gallery-drawer');
      if (!d) return;
      const h = d.style.display === 'none' || !d.style.display;
      if (h) populateRosterDropdown();
      d.style.display = h ? 'block' : 'none';
    });
    document.getElementById('btn-close-all-sheets-gallery')?.addEventListener('click', () => {
      const d = document.getElementById('comp-all-sheets-gallery-drawer');
      if (d) d.style.display = 'none';
    });
    const loadEntryToAltar = f => f && Object.assign(altarState, { rosterId: f.id, charName: f.name, speciesId: f.species, classId: f.classId, level: f.level, equippedSpells: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], ...(f.spells || {}) } });
    document.getElementById('comp-char-roster-select')?.addEventListener('change', e => {
      altarState.rosterId = e.target.value;
      if (altarState.rosterId === 'live_sheet') loadFromLiveSheet();
      else loadEntryToAltar((window.getCompendiumCharactersRoster?.() || []).find(c => c.id === altarState.rosterId));
      renderAllAltar();
    });
    document.getElementById('comp-altar-level-select')?.addEventListener('change', e => {
      altarState.level = parseInt(e.target.value, 10) || 1;
      if (altarState.rosterId === 'live_sheet') syncAltarToLiveSheet();
      renderAllAltar();
    });

    document.querySelectorAll('.comp-main-tab').forEach(btn => btn.addEventListener('click', () => switchCompendiumTab(btn.dataset.compTab)));
    document.querySelectorAll('.comp-deck-tab').forEach(btn => btn.addEventListener('click', () => {
      const t = btn.dataset.deckTab;
      document.querySelectorAll('.comp-deck-tab').forEach(b => b.classList.toggle('active', b.dataset.deckTab === t));
      document.getElementById('comp-deck-panel-spells')?.classList.toggle('active', t === 'spells');
      document.getElementById('comp-deck-panel-turn')?.classList.toggle('active', t === 'turn');
    }));

    document.getElementById('comp-player-search')?.addEventListener('input', e => renderSpellSlotsWorkbench(e.target.value));
    document.getElementById('comp-bestiary-search')?.addEventListener('input', e => renderBestiaryAndBooks(e.target.value, document.getElementById('comp-monster-cr-filter')?.value));
    document.getElementById('comp-monster-cr-filter')?.addEventListener('change', e => renderBestiaryAndBooks(document.getElementById('comp-bestiary-search')?.value, e.target.value));

    document.getElementById('dnd-compendium-view')?.addEventListener('click', e => {
      const load3dBtn = e.target.closest('[data-load-sheet-3d]');
      if (load3dBtn) {
        const found = (window.getCompendiumCharactersRoster?.() || []).find(c => c.id === load3dBtn.dataset.loadSheet3d);
        if (found) { loadEntryToAltar(found); renderAllAltar(); window.showToast?.(`Cargado en Creador 3D: ${found.name}`); }
        return;
      }
      const openFlatBtn = e.target.closest('[data-open-flat-sheet]');
      if (openFlatBtn) {
        const found = (window.getCompendiumCharactersRoster?.() || []).find(c => c.id === openFlatBtn.dataset.openFlatSheet);
        if (found) {
          if (found.sheetData && typeof window.restoreFormData === 'function') window.restoreFormData(found.sheetData);
          else { loadEntryToAltar(found); syncAltarToLiveSheet(); }
          closeCompendiumView();
          window.showToast?.(`Ficha Plana abierta: ${found.name}`);
        }
        return;
      }
      const delSheetBtn = e.target.closest('[data-delete-saved-sheet]');
      if (delSheetBtn) {
        const id = delSheetBtn.dataset.deleteSavedSheet;
        window.deleteSavedSheetFromRoster?.(id);
        if (altarState.rosterId === id) { altarState.rosterId = 'live_sheet'; loadFromLiveSheet(); }
        renderAllAltar();
        return;
      }
      const spBtn = e.target.closest('[data-pick-species]');
      if (spBtn) { altarState.speciesId = spBtn.dataset.pickSpecies; if (altarState.rosterId === 'live_sheet') syncAltarToLiveSheet(); renderAllAltar(); return; }
      const clBtn = e.target.closest('[data-pick-class]');
      if (clBtn) { altarState.classId = clBtn.dataset.pickClass; if (altarState.rosterId === 'live_sheet') syncAltarToLiveSheet(); renderAllAltar(); return; }
      const lvlPill = e.target.closest('[data-select-spell-lvl]');
      if (lvlPill) { altarState.activeSpellLevel = parseInt(lvlPill.dataset.selectSpellLvl, 10) || 0; renderSpellSlotsWorkbench(document.getElementById('comp-player-search')?.value || ''); return; }
      const castBtn = e.target.closest('[data-cast-spell]');
      if (castBtn) { window.castSpellInteractive?.(castBtn.dataset.castSpell, castBtn.dataset.castLvl, castBtn.dataset.castDesc); return; }
      const fightMonBtn = e.target.closest('[data-fight-monster]');
      if (fightMonBtn) { window.openArenaCombatModal?.(fightMonBtn.dataset.fightMonster, null); return; }
      const moreSpellBtn = e.target.closest('[data-more-spell]');
      if (moreSpellBtn) { altarState.expandedSpells[moreSpellBtn.dataset.moreSpell] = !altarState.expandedSpells[moreSpellBtn.dataset.moreSpell]; renderSpellSlotsWorkbench(document.getElementById('comp-player-search')?.value || ''); return; }
      const unequipBtn = e.target.closest('[data-unequip-spell]');
      if (unequipBtn) {
        const sName = unequipBtn.dataset.unequipSpell, sLvl = parseInt(unequipBtn.dataset.unequipLvl, 10) || 0;
        altarState.equippedSpells[sLvl] = (altarState.equippedSpells[sLvl] || []).filter(n => n !== sName);
        if (altarState.rosterId === 'live_sheet') syncAltarToLiveSheet();
        renderSpellSlotsWorkbench(document.getElementById('comp-player-search')?.value || '');
        return;
      }
      const toggleSpell = e.target.closest('[data-toggle-spell]');
      if (toggleSpell) {
        const sName = toggleSpell.dataset.toggleSpell, sLvl = parseInt(toggleSpell.dataset.toggleLvl, 10) || 0;
        const list = altarState.equippedSpells[sLvl] || [], idx = list.indexOf(sName);
        if (idx >= 0) { list.splice(idx, 1); window.showToast?.(`Hechizo quitado: ${sName}`); }
        else { list.push(sName); window.showToast?.(`${sName} asignado al Espacio #${list.length}`); }
        altarState.equippedSpells[sLvl] = list;
        if (altarState.rosterId === 'live_sheet') syncAltarToLiveSheet();
        renderSpellSlotsWorkbench(document.getElementById('comp-player-search')?.value || '');
        return;
      }
      const turnSub = e.target.closest('[data-turn-sub]');
      if (turnSub) { altarState.activeTurnTab = turnSub.dataset.turnSub; renderTurnGuide(); return; }
      const rollBtn = e.target.closest('[data-monster-roll]');
      if (rollBtn) {
        const expr = rollBtn.dataset.monsterRoll || '1d20', m = expr.match(/(\d+)d(\d+)([+-]\d+)?/i);
        document.getElementById('dice-modal')?.classList.add('active');
        window.executeAnimatedDiceRoll?.({ count: m ? +m[1] : 1, sides: m ? +m[2] : 20, mod: m && m[3] ? +m[3] : 0, mode: 'normal', label: rollBtn.dataset.monsterLabel });
      }
    });
  });
})();
