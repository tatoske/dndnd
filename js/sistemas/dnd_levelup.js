/**
 * ============================================================================
 * CONTROLADOR INTERACTIVO DE SUBIDA DE NIVEL, BARRA XP/MISIONES Y RANGOS (5.5e)
 * Asistente Guiado Paso a Paso + Sincronización Acumulativa por Clase (1-20)
 * ============================================================================
 */
(function () {
  'use strict';

  const ATTR_NAMES = { str: 'Fuerza (FUE)', dex: 'Destreza (DES)', con: 'Constitución (CON)', int: 'Inteligencia (INT)', wis: 'Sabiduría (SAB)', cha: 'Carisma (CAR)' };

  const wizState = {
    targetClassSlot: 1,
    classId: 'fighter',
    fromLevel: 1,
    toLevel: 2,
    hpMode: 'avg',
    hpRolledVal: null,
    selectedSubclass: '',
    asiChoiceType: 'stat2',
    asiAttrA: 'str',
    asiAttrB: 'con',
    selectedFeatId: 'tough',
    chosenFeats: []
  };

  function getMod(attr) {
    const val = parseInt(document.getElementById(`score-${attr}`)?.value || '10', 10);
    return Math.floor((val - 10) / 2);
  }

  function getTierInfo(level) {
    const tiers = window.DND_55E_PROGRESSION_TIERS || [];
    const safeLvl = Math.max(1, Math.min(20, parseInt(level || 1, 10)));
    return tiers.find(t => t.level === safeLvl) || tiers[0] || { level: 1, xp: 0, quests: 0, prof: 2, rankName: 'Rango Cobre · Novato', rankColor: '#b45309', rankBg: '#fffbeb', perk: '' };
  }

  function getNextTierInfo(level) {
    const safeLvl = Math.max(1, Math.min(20, parseInt(level || 1, 10)));
    return getTierInfo(Math.min(20, safeLvl + 1));
  }

  function isAsiLevel(classId, level) {
    const table = window.DND_55E_CLASS_ASI_LEVELS || { default: [4, 8, 12, 16, 19] };
    return (table[classId] || table.default).includes(parseInt(level, 10));
  }

  // 1. POBLAR SELECTOR DE SUBCLASE SEGÚN LA CLASE ACTIVA
  function populateSubclassSelector() {
    const c1Id = document.getElementById('char-class-1')?.value || 'fighter';
    const subSelect = document.getElementById('char-subclass-1');
    const cTable = (window.DND_55E_CLASS_LEVEL_TABLE || {})[c1Id];
    if (!subSelect) return;

    const currentVal = subSelect.value || subSelect.dataset.savedSubclass || '';
    const subclasses = cTable?.subclasses || [];
    subSelect.innerHTML = `<option value="">Subclase (Nvl 3+)...</option>` +
      subclasses.map(sc => `<option value="${sc.id}">${sc.name}</option>`).join('');
    subSelect.value = (currentVal && subclasses.some(s => s.id === currentVal)) ? currentVal : '';
  }

  // 2. CONSTRUIR TEXTO ACUMULATIVO DE RASGOS DE CLASE Y SUBCLASE (NIVEL 1 HASTA NIVEL ACTUAL)
  function buildCumulativeClassFeaturesText(classId, level, subclassId, isSecondary) {
    const clsData = (window.DND_55E_CLASSES || {})[classId];
    const progData = (window.DND_55E_CLASS_LEVEL_TABLE || {})[classId];
    if (!clsData) return '';

    const lvl = Math.max(1, Math.min(20, parseInt(level || 1, 10)));
    const tagPrefix = isSecondary ? 'CLASE 2 (MULTICLASE)' : 'CLASE PRINCIPAL';
    const subObj = (progData?.subclasses || []).find(s => s.id === subclassId);
    const subTitle = (lvl >= 3 && subObj) ? ` · ${subObj.name.toUpperCase()}` : '';

    const lines = [
      `[🔵 ${tagPrefix}: ${clsData.name.toUpperCase()}${subTitle} (Nivel ${lvl})]`,
      `Dado de golpe: d${clsData.hitDie} | Salvaciones: ${(clsData.saves || []).map(s => s.toUpperCase()).join(', ')}`
    ];
    if (progData && typeof progData.resourceLabel === 'function') {
      lines.push(`Recursos Activos (Nvl ${lvl}): ${progData.resourceLabel(lvl)}`);
    }

    if (progData && progData.levels) {
      for (let l = 1; l <= lvl; l++) {
        const featsAtLvl = progData.levels[l] || [];
        if (featsAtLvl.length > 0) lines.push(`• [Nvl ${l}] ${featsAtLvl.join(' | ')}`);
        if (subObj && subObj[`lvl${l}`]) {
          lines.push(`  ↳ [Subclase Nvl ${l} · ${subObj.name}] ${subObj[`lvl${l}`]}`);
        }
      }
    } else {
      lines.push(...(clsData.features || []));
    }

    if (!isSecondary && wizState.chosenFeats.length > 0) {
      lines.push(`• [Mejoras y Dotes Elegidas]: ${wizState.chosenFeats.join(' | ')}`);
    }
    return lines.join('\n');
  }

  // 3. ACTUALIZAR BARRA DE PROGRESO (XP O MISIONES) Y RANGO DE AVENTURERO
  function updateAdventurerProgressUI() {
    const l1 = parseInt(document.getElementById('char-level-1')?.value || '1', 10);
    const hasMulti = document.getElementById('multiclass-subrow')?.style.display !== 'none' && document.getElementById('char-class-2')?.value;
    const l2 = hasMulti ? parseInt(document.getElementById('char-level-2')?.value || '1', 10) : 0;
    const totalLevel = Math.max(1, Math.min(20, l1 + l2));

    const mode = document.getElementById('char-progression-mode')?.value || 'xp';
    const xpInput = document.getElementById('char-xp');
    const questsInput = document.getElementById('char-quests');
    const xpWrap = document.getElementById('prog-xp-controls');
    const questsWrap = document.getElementById('prog-quests-controls');

    if (xpWrap) xpWrap.style.display = mode === 'xp' ? 'flex' : 'none';
    if (questsWrap) questsWrap.style.display = mode === 'quests' ? 'flex' : 'none';
    document.querySelectorAll('[data-prog-mode-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-prog-mode-btn') === mode);
    });

    const curTier = getTierInfo(totalLevel);
    const nextTier = getNextTierInfo(totalLevel);
    const isMax = totalLevel >= 20;
    const xpTargetPill = document.getElementById('xp-inline-target-pill');
    if (xpTargetPill) xpTargetPill.textContent = isMax ? 'MÁX' : `/ ${nextTier.xp.toLocaleString()} XP`;
    const curXp = Math.max(0, parseInt(xpInput?.value || '0', 10));
    const curQuests = Math.max(0, parseInt(questsInput?.value || '0', 10));

    let activeRankTier = curTier;
    if (mode === 'quests') {
      const tiers = window.DND_55E_PROGRESSION_TIERS || [];
      for (let i = tiers.length - 1; i >= 0; i--) {
        if (curQuests >= tiers[i].quests) { activeRankTier = tiers[i]; break; }
      }
      if (activeRankTier.level < curTier.level) activeRankTier = curTier;
    }

    ['adventurer-rank-badge', 'comp-adventurer-rank-badge'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = activeRankTier.rankName;
      el.style.color = activeRankTier.rankColor;
      el.style.backgroundColor = activeRankTier.rankBg;
      el.style.borderColor = activeRankTier.rankColor;
      el.title = activeRankTier.perk || '';
    });

    let pct = 100;
    let statusText = 'Nivel Máximo Alcanzado (Nivel 20 · Leyenda)';
    let readyToLevelUp = false;

    if (!isMax) {
      if (mode === 'xp') {
        const span = Math.max(1, nextTier.xp - curTier.xp);
        pct = Math.max(0, Math.min(100, Math.round(((curXp - curTier.xp) / span) * 100)));
        readyToLevelUp = curXp >= nextTier.xp;
        statusText = readyToLevelUp
          ? `¡Meta de XP alcanzada! (${curXp.toLocaleString()} / ${nextTier.xp.toLocaleString()} XP) — Listo para subir a Nivel ${totalLevel + 1}`
          : `Meta Nivel ${totalLevel + 1}: ${curXp.toLocaleString()} / ${nextTier.xp.toLocaleString()} XP (Faltan ${(nextTier.xp - curXp).toLocaleString()} XP)`;
      } else {
        const span = Math.max(1, nextTier.quests - curTier.quests);
        pct = Math.max(0, Math.min(100, Math.round(((curQuests - curTier.quests) / span) * 100)));
        readyToLevelUp = curQuests >= nextTier.quests;
        statusText = readyToLevelUp
          ? `¡Misiones cumplidas! (${curQuests} / ${nextTier.quests} misiones) — Listo para subir a Nivel ${totalLevel + 1}`
          : `Misiones para Nivel ${totalLevel + 1}: ${curQuests} / ${nextTier.quests} completadas · ${activeRankTier.perk}`;
      }
    }

    const barFill = document.getElementById('adventurer-prog-bar-fill');
    const barLabel = document.getElementById('adventurer-prog-status-text');
    if (barFill) {
      barFill.style.width = `${pct}%`;
      barFill.classList.toggle('is-ready', readyToLevelUp);
    }
    if (barLabel) barLabel.textContent = statusText;

    ['btn-open-levelup-wizard', 'btn-comp-levelup-wizard'].forEach(btnId => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.disabled = isMax;
      btn.classList.toggle('is-pulse-ready', readyToLevelUp);
      const span = btn.querySelector('.lvlup-btn-label');
      if (span) span.textContent = isMax ? 'Nivel 20 Máx' : (readyToLevelUp ? `¡Subir a Nvl ${totalLevel + 1}!` : 'Subir Nivel (+1)');
    });
  }

  // 4. CÁLCULO DE PG GANADOS EN EL PASO 1 DEL ASISTENTE
  function calcWizardHpGain() {
    const clsData = (window.DND_55E_CLASSES || {})[wizState.classId] || { hitDie: 8 };
    const die = clsData.hitDie || 8;
    const avgBase = Math.floor(die / 2) + 1;
    const baseRoll = (wizState.hpMode === 'roll' && wizState.hpRolledVal) ? wizState.hpRolledVal : avgBase;
    const conMod = getMod('con');
    const raceId = document.getElementById('char-race')?.value;
    const bgId = document.getElementById('char-background')?.value;
    const subId = wizState.selectedSubclass || document.getElementById('char-subclass-1')?.value;

    let extraPerLvl = (raceId === 'dwarf' ? 1 : 0);
    if (bgId === 'farmer' || wizState.chosenFeats.some(f => f.includes('Duro')) || (isAsiLevel(wizState.classId, wizState.toLevel) && wizState.asiChoiceType === 'feat' && wizState.selectedFeatId === 'tough')) {
      extraPerLvl += 2;
    }
    if (wizState.classId === 'sorcerer' && subId === 'draconic' && wizState.toLevel >= 3) extraPerLvl += 1;
    return { die, avgBase, baseRoll, conMod, extraPerLvl, totalGain: Math.max(1, baseRoll + conMod + extraPerLvl) };
  }

  // 5. ABRIR Y RENDERIZAR EL MODAL DEL ASISTENTE DE SUBIDA DE NIVEL
  function openLevelUpWizard(targetSlot) {
    const modal = document.getElementById('levelup-wizard-modal');
    if (!modal) return;

    wizState.targetClassSlot = targetSlot || 1;
    const c1Sel = document.getElementById('char-class-1');
    if (c1Sel && !c1Sel.value) c1Sel.value = 'fighter';

    const cId = wizState.targetClassSlot === 2
      ? (document.getElementById('char-class-2')?.value || 'fighter')
      : (c1Sel?.value || 'fighter');
    const curLvl = parseInt(document.getElementById(wizState.targetClassSlot === 2 ? 'char-level-2' : 'char-level-1')?.value || '1', 10);

    if (curLvl >= 20) {
      window.showToast?.('Tu personaje ya ha alcanzado el Nivel 20 (Rango Leyenda).');
      return;
    }

    wizState.classId = cId;
    wizState.fromLevel = curLvl;
    wizState.toLevel = Math.min(20, curLvl + 1);
    wizState.hpMode = 'avg';
    wizState.hpRolledVal = null;

    const progData = (window.DND_55E_CLASS_LEVEL_TABLE || {})[cId];
    const currentSub = document.getElementById('char-subclass-1')?.value || '';
    wizState.selectedSubclass = currentSub || (progData?.subclasses?.[0]?.id || '');

    renderLevelUpWizardContent();
    modal.classList.add('active');
  }

  function renderLevelUpWizardContent() {
    const body = document.getElementById('levelup-wizard-body');
    if (!body) return;

    const clsData = (window.DND_55E_CLASSES || {})[wizState.classId] || { name: 'Aventurero', hitDie: 8 };
    const progData = (window.DND_55E_CLASS_LEVEL_TABLE || {})[wizState.classId] || {};
    const nextTier = getTierInfo(wizState.toLevel);
    const hpInfo = calcWizardHpGain();
    const curHpMax = parseInt(document.getElementById('hp-max')?.value || '10', 10);
    const newFeatures = (progData.levels && progData.levels[wizState.toLevel]) || ['Progresión de clase estándar.'];
    const showSubclassStep = wizState.toLevel >= 3 && (progData.subclasses || []).length > 0;
    const showAsiStep = isAsiLevel(wizState.classId, wizState.toLevel);

    let subclassHtml = '';
    if (showSubclassStep) {
      const subCards = (progData.subclasses || []).map(sc => {
        const active = sc.id === wizState.selectedSubclass;
        const featureForLvl = sc[`lvl${wizState.toLevel}`] || sc.lvl3;
        return `<div class="lvlup-choice-card ${active ? 'is-selected' : ''}" data-pick-subclass="${sc.id}"><div class="lvlup-choice-top"><strong>${sc.name}</strong><span class="lvlup-choice-pill">${active ? 'Seleccionada' : 'Elegir'}</span></div><p class="lvlup-choice-desc">${featureForLvl}</p></div>`;
      }).join('');
      subclassHtml = `<div class="lvlup-step-box"><div class="lvlup-step-header"><span class="lvlup-step-num">PASO 3</span><h4>${wizState.toLevel === 3 ? 'Elige tu Subclase Oficial (Nivel 3)' : `Especialización de Subclase (Nivel ${wizState.toLevel})`}</h4></div><div class="lvlup-subclasses-grid">${subCards}</div></div>`;
    }

    let asiHtml = '';
    if (showAsiStep) {
      const attrOptions = Object.keys(ATTR_NAMES).map(k => `<option value="${k}">${ATTR_NAMES[k]} (Actual: ${document.getElementById('score-' + k)?.value || 10})</option>`).join('');
      const featOptions = (window.DND_55E_LEVELUP_FEATS || []).map(f => `<option value="${f.id}" ${f.id === wizState.selectedFeatId ? 'selected' : ''}>${f.name} — ${f.desc}</option>`).join('');
      asiHtml = `<div class="lvlup-step-box is-asi-highlight"><div class="lvlup-step-header"><span class="lvlup-step-num">HITO NIVEL ${wizState.toLevel}</span><h4>${wizState.toLevel === 19 ? 'Don Épico (Epic Boon) o Mejora de Atributo' : 'Mejora de Característica (ASI) o Dote General'}</h4></div><div class="lvlup-asi-tabs"><button type="button" class="lvlup-mode-btn ${wizState.asiChoiceType === 'stat2' ? 'active' : ''}" data-asi-mode="stat2">+2 a un Atributo</button><button type="button" class="lvlup-mode-btn ${wizState.asiChoiceType === 'stat11' ? 'active' : ''}" data-asi-mode="stat11">+1 a dos Atributos</button><button type="button" class="lvlup-mode-btn ${wizState.asiChoiceType === 'feat' ? 'active' : ''}" data-asi-mode="feat">Elegir Dote Oficial</button></div><div class="lvlup-asi-selectors">${wizState.asiChoiceType === 'stat2' ? `<div class="lvlup-inline-field"><label>Atributo (+2 puntos, máx. 20):</label><select id="lvlup-asi-attr-a" class="select-header">${attrOptions}</select></div>` : ''}${wizState.asiChoiceType === 'stat11' ? `<div class="lvlup-inline-field"><label>Primer Atributo (+1):</label><select id="lvlup-asi-attr-a" class="select-header">${attrOptions}</select></div><div class="lvlup-inline-field"><label>Segundo Atributo (+1):</label><select id="lvlup-asi-attr-b" class="select-header">${attrOptions}</select></div>` : ''}${wizState.asiChoiceType === 'feat' ? `<div class="lvlup-inline-field"><label>Selecciona tu Dote:</label><select id="lvlup-feat-select" class="select-header">${featOptions}</select></div>` : ''}</div></div>`;
    }

    body.innerHTML = `<div class="lvlup-banner-summary"><div><span class="lvlup-class-pill">${clsData.name.toUpperCase()} · DADO d${clsData.hitDie}</span><h3 class="lvlup-main-heading">Ascenso de Nivel ${wizState.fromLevel} a Nivel ${wizState.toLevel}</h3><p class="lvlup-sub-heading">${progData.resourceLabel ? progData.resourceLabel(wizState.toLevel) : ''}</p></div><div class="lvlup-rank-preview" style="background:${nextTier.rankBg}; border-color:${nextTier.rankColor}; color:${nextTier.rankColor};"><small>NUEVO RANGO Y COMPETENCIA</small><strong>${nextTier.rankName}</strong><span>Bono de Competencia: +${nextTier.prof}</span></div></div><div class="lvlup-step-box"><div class="lvlup-step-header"><span class="lvlup-step-num">PASO 1</span><h4>Puntos de Golpe Ganados (Dado d${hpInfo.die} + Mod. CON ${hpInfo.conMod >= 0 ? '+' + hpInfo.conMod : hpInfo.conMod})</h4></div><div class="lvlup-hp-row"><div class="lvlup-hp-buttons"><button type="button" class="lvlup-mode-btn ${wizState.hpMode === 'avg' ? 'active' : ''}" id="btn-lvlup-hp-avg">Media Oficial Fija (${hpInfo.avgBase} + CON)</button><button type="button" class="lvlup-mode-btn ${wizState.hpMode === 'roll' ? 'active' : ''}" id="btn-lvlup-hp-roll">Tirar 1d${hpInfo.die} en Vivo ${wizState.hpRolledVal ? `(Salió: ${wizState.hpRolledVal})` : ''}</button></div><div class="lvlup-hp-result-pill"><span>PG Máximos: <strong>${curHpMax}</strong> &rarr; <strong>${curHpMax + hpInfo.totalGain}</strong></span><span class="lvlup-hp-gain-badge">+${hpInfo.totalGain} PG</span></div></div></div><div class="lvlup-step-box"><div class="lvlup-step-header"><span class="lvlup-step-num">PASO 2</span><h4>Nuevos Rasgos de ${clsData.name} en Nivel ${wizState.toLevel}</h4></div><ul class="lvlup-features-list">${newFeatures.map(f => `<li>${f}</li>`).join('')}</ul></div>${subclassHtml}${asiHtml}`;

    const selA = document.getElementById('lvlup-asi-attr-a');
    const selB = document.getElementById('lvlup-asi-attr-b');
    if (selA) selA.value = wizState.asiAttrA;
    if (selB) selB.value = wizState.asiAttrB;
    bindWizardInnerEvents();
  }

  function bindWizardInnerEvents() {
    document.getElementById('btn-lvlup-hp-avg')?.addEventListener('click', () => { wizState.hpMode = 'avg'; renderLevelUpWizardContent(); });
    document.getElementById('btn-lvlup-hp-roll')?.addEventListener('click', () => {
      const clsData = (window.DND_55E_CLASSES || {})[wizState.classId] || { hitDie: 8 };
      wizState.hpMode = 'roll';
      wizState.hpRolledVal = Math.floor(Math.random() * (clsData.hitDie || 8)) + 1;
      renderLevelUpWizardContent();
    });
    document.querySelectorAll('[data-pick-subclass]').forEach(card => {
      card.addEventListener('click', () => { wizState.selectedSubclass = card.getAttribute('data-pick-subclass'); renderLevelUpWizardContent(); });
    });
    document.querySelectorAll('[data-asi-mode]').forEach(btn => {
      btn.addEventListener('click', () => { wizState.asiChoiceType = btn.getAttribute('data-asi-mode'); renderLevelUpWizardContent(); });
    });
    document.getElementById('lvlup-asi-attr-a')?.addEventListener('change', (e) => { wizState.asiAttrA = e.target.value; });
    document.getElementById('lvlup-asi-attr-b')?.addEventListener('change', (e) => { wizState.asiAttrB = e.target.value; });
    document.getElementById('lvlup-feat-select')?.addEventListener('change', (e) => { wizState.selectedFeatId = e.target.value; renderLevelUpWizardContent(); });
  }

  // 6. CONFIRMAR Y APLICAR LA SUBIDA DE NIVEL A LA FICHA Y AL CREADOR 3D
  function applyLevelUpConfirm() {
    const hpInfo = calcWizardHpGain();
    const lvlSelect = document.getElementById(wizState.targetClassSlot === 2 ? 'char-level-2' : 'char-level-1');
    if (lvlSelect) lvlSelect.value = String(wizState.toLevel);

    const altarLvl = document.getElementById('comp-altar-level-select');
    if (altarLvl && wizState.targetClassSlot === 1) altarLvl.value = String(wizState.toLevel);

    const subSelect = document.getElementById('char-subclass-1');
    if (subSelect && wizState.selectedSubclass && wizState.toLevel >= 3) {
      populateSubclassSelector();
      subSelect.value = wizState.selectedSubclass;
      subSelect.dataset.savedSubclass = wizState.selectedSubclass;
    }

    if (isAsiLevel(wizState.classId, wizState.toLevel)) {
      const cap = wizState.toLevel === 19 ? 30 : 20;
      if (wizState.asiChoiceType === 'stat2') {
        const inp = document.getElementById(`score-${wizState.asiAttrA}`);
        if (inp) inp.value = Math.min(cap, parseInt(inp.value || '10', 10) + 2);
        wizState.chosenFeats.push(`Nvl ${wizState.toLevel}: +2 ${wizState.asiAttrA.toUpperCase()}`);
      } else if (wizState.asiChoiceType === 'stat11') {
        const inpA = document.getElementById(`score-${wizState.asiAttrA}`);
        const inpB = document.getElementById(`score-${wizState.asiAttrB}`);
        if (inpA) inpA.value = Math.min(cap, parseInt(inpA.value || '10', 10) + 1);
        if (inpB) inpB.value = Math.min(cap, parseInt(inpB.value || '10', 10) + 1);
        wizState.chosenFeats.push(`Nvl ${wizState.toLevel}: +1 ${wizState.asiAttrA.toUpperCase()} / +1 ${wizState.asiAttrB.toUpperCase()}`);
      } else if (wizState.asiChoiceType === 'feat') {
        const featObj = (window.DND_55E_LEVELUP_FEATS || []).find(f => f.id === wizState.selectedFeatId);
        if (featObj) wizState.chosenFeats.push(`Nvl ${wizState.toLevel}: Dote ${featObj.name}`);
      }
    }

    const hpMaxInput = document.getElementById('hp-max');
    const hpCurInput = document.getElementById('hp-current');
    if (hpMaxInput) {
      hpMaxInput.value = parseInt(hpMaxInput.value || '10', 10) + hpInfo.totalGain;
      hpMaxInput.dataset.custom = 'true';
    }
    if (hpCurInput) hpCurInput.value = parseInt(hpCurInput.value || '10', 10) + hpInfo.totalGain;

    const tier = getTierInfo(wizState.toLevel);
    const xpInput = document.getElementById('char-xp');
    const qInput = document.getElementById('char-quests');
    if (xpInput && parseInt(xpInput.value || '0', 10) < tier.xp) xpInput.value = tier.xp;
    if (qInput && parseInt(qInput.value || '0', 10) < tier.quests) qInput.value = tier.quests;

    document.getElementById('levelup-wizard-modal')?.classList.remove('active');
    if (typeof window.updateCharacterProgression === 'function') window.updateCharacterProgression();
    if (typeof window.saveToLocalStorage === 'function') window.saveToLocalStorage();
    window.showToast?.(`¡Subiste a Nivel ${wizState.toLevel}! (+${hpInfo.totalGain} PG · ${tier.rankName})`);
  }

  document.addEventListener('DOMContentLoaded', () => {
    populateSubclassSelector();
    updateAdventurerProgressUI();

    document.getElementById('char-class-1')?.addEventListener('change', () => {
      populateSubclassSelector();
      if (typeof window.updateCharacterProgression === 'function') window.updateCharacterProgression();
    });
    document.getElementById('char-subclass-1')?.addEventListener('change', (e) => {
      e.target.dataset.savedSubclass = e.target.value;
      if (typeof window.updateCharacterProgression === 'function') window.updateCharacterProgression();
      if (typeof window.saveToLocalStorage === 'function') window.saveToLocalStorage();
    });
    document.getElementById('char-progression-mode')?.addEventListener('change', () => {
      updateAdventurerProgressUI();
      if (typeof window.saveToLocalStorage === 'function') window.saveToLocalStorage();
    });
    document.querySelectorAll('[data-prog-mode-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modeSel = document.getElementById('char-progression-mode');
        if (modeSel) modeSel.value = btn.getAttribute('data-prog-mode-btn') || 'xp';
        updateAdventurerProgressUI();
        if (typeof window.saveToLocalStorage === 'function') window.saveToLocalStorage();
      });
    });
    document.getElementById('char-xp')?.addEventListener('input', updateAdventurerProgressUI);
    document.getElementById('char-quests')?.addEventListener('input', updateAdventurerProgressUI);
    document.getElementById('btn-add-quest')?.addEventListener('click', () => {
      const qInp = document.getElementById('char-quests');
      if (!qInp) return;
      qInp.value = Math.max(0, parseInt(qInp.value || '0', 10)) + 1;
      updateAdventurerProgressUI();
      window.saveToLocalStorage?.();
      window.showToast?.('¡Misión completada añadida al registro del gremio!');
    });
    document.querySelectorAll('[data-add-xp]').forEach(btn => btn.addEventListener('click', () => {
      const xpInp = document.getElementById('char-xp');
      if (!xpInp) return;
      xpInp.value = Math.max(0, parseInt(xpInp.value || '0', 10)) + parseInt(btn.getAttribute('data-add-xp') || '100', 10);
      updateAdventurerProgressUI();
      window.saveToLocalStorage?.();
    }));
    document.getElementById('btn-open-levelup-wizard')?.addEventListener('click', () => openLevelUpWizard(1));
    document.getElementById('btn-comp-levelup-wizard')?.addEventListener('click', () => openLevelUpWizard(1));
    document.getElementById('btn-confirm-levelup-wizard')?.addEventListener('click', applyLevelUpConfirm);
  });

  Object.assign(window, { buildCumulativeClassFeaturesText, updateAdventurerProgressUI, populateSubclassSelector, openLevelUpWizard });
})();
