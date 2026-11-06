/**
 * ============================================================================
 * D&D 5ª EDICIÓN - COFRE TRAGADADOS, DRAGÓN FORJADOR Y ESTALLIDO SECUENCIAL
 * 1. Selección interactiva en ventana emergente del Cofre con botones -/+ de cantidad.
 * 2. El Cofre se traga los dados seleccionados (phase-eating) y los mastica.
 * 3. El Cofre escupe de 1 a 4 dados 3D hacia el Dragón Heráldico (phase-rolling).
 * 4. El Dragón los incinera con aliento de fuego (phase-burning) y estallan UNO A UNO.
 * ============================================================================
 */

(function () {
  'use strict';

  let rollTimers = [];
  let numberCycleInterval = null;
  let currentRollData = null;
  let isSequenceRunning = false;
  let selectedDieSides = 20;
  const rollHistory = [];

  const DICE_SVG_SHAPES = {
    4: `<polygon class="die-facet-outer" points="60,10 110,98 10,98"/><line class="die-facet-inner" x1="60" y1="10" x2="60" y2="70"/><line class="die-facet-inner" x1="60" y1="70" x2="10" y2="98"/><line class="die-facet-inner" x1="60" y1="70" x2="110" y2="98"/>`,
    6: `<rect class="die-facet-outer" x="18" y="18" width="84" height="84" rx="12"/><rect class="die-facet-inner" x="28" y="28" width="64" height="64" rx="6"/><line class="die-facet-inner" x1="18" y1="18" x2="28" y2="28"/><line class="die-facet-inner" x1="102" y1="18" x2="92" y2="28"/><line class="die-facet-inner" x1="18" y1="102" x2="28" y2="92"/><line class="die-facet-inner" x1="102" y1="102" x2="92" y2="92"/>`,
    8: `<polygon class="die-facet-outer" points="60,8 112,60 60,112 8,60"/><polygon class="die-facet-inner" points="60,8 112,60 8,60"/><line class="die-facet-inner" x1="60" y1="8" x2="60" y2="112"/>`,
    10: `<polygon class="die-facet-outer" points="60,6 112,52 60,114 8,52"/><polyline class="die-facet-inner" points="8,52 60,72 112,52"/><line class="die-facet-inner" x1="60" y1="6" x2="60" y2="114"/>`,
    12: `<polygon class="die-facet-outer" points="60,8 109,43 91,102 29,102 11,43"/><polygon class="die-facet-inner" points="60,28 90,50 79,85 41,85 30,50"/><line class="die-facet-inner" x1="60" y1="8" x2="60" y2="28"/><line class="die-facet-inner" x1="109" y1="43" x2="90" y2="50"/><line class="die-facet-inner" x1="91" y1="102" x2="79" y2="85"/><line class="die-facet-inner" x1="29" y1="102" x2="41" y2="85"/><line class="die-facet-inner" x1="11" y1="43" x2="30" y2="50"/>`,
    20: `<polygon class="die-facet-outer" points="60,6 108,33 108,87 60,114 12,87 12,33"/><polygon class="die-facet-inner" points="60,24 93,80 27,80"/><line class="die-facet-inner" x1="60" y1="6" x2="60" y2="24"/><line class="die-facet-inner" x1="108" y1="33" x2="60" y2="24"/><line class="die-facet-inner" x1="12" y1="33" x2="60" y2="24"/><line class="die-facet-inner" x1="108" y1="33" x2="93" y2="80"/><line class="die-facet-inner" x1="12" y1="33" x2="27" y2="80"/><line class="die-facet-inner" x1="108" y1="87" x2="93" y2="80"/><line class="die-facet-inner" x1="12" y1="87" x2="27" y2="80"/><line class="die-facet-inner" x1="60" y1="114" x2="93" y2="80"/><line class="die-facet-inner" x1="60" y1="114" x2="27" y2="80"/>`,
    100: `<circle class="die-facet-outer" cx="60" cy="60" r="50"/><polygon class="die-facet-inner" points="60,16 98,38 98,82 60,104 22,82 22,38"/><circle class="die-facet-inner" cx="60" cy="60" r="30"/>`
  };

  function clearActiveRollTimers() {
    rollTimers.forEach(t => clearTimeout(t));
    rollTimers = [];
    if (numberCycleInterval) { clearInterval(numberCycleInterval); numberCycleInterval = null; }
    isSequenceRunning = false;
  }

  function updateChestPopoverPreview() {
    const count = Math.max(1, Math.min(20, parseInt(document.getElementById('dice-count-input')?.value || '1', 10)));
    const mod = parseInt(document.getElementById('dice-mod-input')?.value || '0', 10);
    const rollMode = document.querySelector('input[name="dice-roll-mode"]:checked')?.value || 'normal';
    const modStr = mod !== 0 ? (mod > 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`) : '';
    const modeStr = (selectedDieSides === 20 && count === 1 && rollMode !== 'normal') ? ` (${rollMode === 'advantage' ? 'Ventaja' : 'Desventaja'})` : '';
    const summary = `${count}d${selectedDieSides}${modStr}${modeStr}`;

    const badge = document.getElementById('chest-popover-preview-badge');
    const btnText = document.getElementById('feed-chest-btn-text');
    const stageLabel = document.getElementById('chest-stage-label');
    if (badge) badge.textContent = summary;
    if (btnText) btnText.textContent = `¡Dar al Cofre y Lanzar ${summary}!`;
    if (stageLabel) stageLabel.textContent = `Cofre (${count}d${selectedDieSides})`;
  }

  function openChestPopover() {
    const popover = document.getElementById('chest-dice-popover');
    const stage = document.getElementById('dice-dragon-arena');
    if (popover) { popover.classList.remove('is-swallowed'); popover.classList.add('is-open'); }
    stage?.classList.add('chest-lid-open');
    updateChestPopoverPreview();
  }

  function toggleChestPopover() {
    const popover = document.getElementById('chest-dice-popover');
    const stage = document.getElementById('dice-dragon-arena');
    if (!popover) return;
    const willOpen = !popover.classList.contains('is-open');
    popover.classList.remove('is-swallowed');
    popover.classList.toggle('is-open', willOpen);
    stage?.classList.toggle('chest-lid-open', willOpen);
    if (willOpen) updateChestPopoverPreview();
  }

  function computeRollOutcome(sides, customLabel = '') {
    const count = Math.max(1, Math.min(20, parseInt(document.getElementById('dice-count-input')?.value || '1', 10)));
    const mod = parseInt(document.getElementById('dice-mod-input')?.value || '0', 10);
    const rollMode = document.querySelector('input[name="dice-roll-mode"]:checked')?.value || 'normal';

    let rolls = [], discardedIndices = [], sum = 0, natDieForBanner = null;
    const isAdvDis = (sides === 20 && count === 1 && (rollMode === 'advantage' || rollMode === 'disadvantage'));

    if (isAdvDis) {
      const r1 = Math.floor(Math.random() * 20) + 1, r2 = Math.floor(Math.random() * 20) + 1;
      rolls = [r1, r2];
      natDieForBanner = rollMode === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2);
      discardedIndices = (rollMode === 'advantage' ? (r1 >= r2 ? [1] : [0]) : (r1 <= r2 ? [1] : [0]));
      sum = natDieForBanner;
    } else {
      for (let i = 0; i < count; i++) {
        const val = Math.floor(Math.random() * sides) + 1;
        rolls.push(val);
        sum += val;
      }
      if (sides === 20 && count === 1) natDieForBanner = rolls[0];
    }

    const total = sum + mod;
    const modStr = mod !== 0 ? (mod > 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`) : '';
    const modeTag = isAdvDis ? ` (${rollMode === 'advantage' ? 'Ventaja' : 'Desventaja'})` : '';
    const formulaText = `${customLabel ? `${customLabel} • ` : ''}${count}d${sides}${modeTag}${modStr}`;

    let detailText = '';
    if (isAdvDis) {
      const kept = natDieForBanner, dropped = discardedIndices[0] === 0 ? rolls[0] : rolls[1];
      detailText = `2d20: [${kept} elegido, ${dropped} descartado]${mod !== 0 ? ` | Mod: ${mod > 0 ? '+' : ''}${mod}` : ''}`;
    } else if (rolls.length > 1 || mod !== 0) {
      detailText = `Suma dados: ${sum}${mod !== 0 ? ` | Modificador: ${mod > 0 ? '+' : ''}${mod}` : ''} (${rolls.length}d${sides})`;
    } else {
      detailText = `Resultado natural en 1d${sides}: ${rolls[0]}`;
    }

    return { sides, count, mod, rolls, discardedIndices, sum, total, natDieForBanner, formulaText, detailText };
  }

  function renderJumpingDiceActors(outcome) {
    const wrap = document.getElementById('multi-dice-actors-wrap');
    if (!wrap) return [];
    const totalDice = outcome.rolls.length, visualCount = Math.min(totalDice, 4);
    wrap.setAttribute('data-visual-count', String(visualCount));
    wrap.innerHTML = '';

    const trajectories = [
      { sx: '125px', sy: '18px', py: '-44px', rz: '-28deg' },
      { sx: '105px', sy: '24px', py: '-54px', rz: '34deg' },
      { sx: '135px', sy: '10px', py: '-36px', rz: '-42deg' },
      { sx: '115px', sy: '20px', py: '-48px', rz: '24deg' }
    ];
    const shapeSvg = DICE_SVG_SHAPES[outcome.sides] || DICE_SVG_SHAPES[20];
    const numberNodes = [];

    for (let i = 0; i < visualCount; i++) {
      const traj = trajectories[i % trajectories.length];
      const actor = document.createElement('div');
      actor.className = 'die-3d-actor';
      actor.style.setProperty('--jump-delay', `${i * 58}ms`);
      actor.style.setProperty('--burn-delay', `${i * 35}ms`);
      actor.style.setProperty('--start-x', traj.sx);
      actor.style.setProperty('--start-y', traj.sy);
      actor.style.setProperty('--peak-y', traj.py);
      actor.style.setProperty('--rot-z', traj.rz);

      const showExtraBadge = (i === visualCount - 1 && totalDice > 4);
      const badgeText = showExtraBadge ? `+${totalDice - 4} más` : `D${outcome.sides}`;
      actor.innerHTML = `<span class="die-type-floating-tag ${showExtraBadge ? 'is-extra-pool' : ''}">${badgeText}</span><svg class="die-polyhedron-svg" viewBox="0 0 120 120"><g class="die-svg-facets">${shapeSvg}</g><text class="die-face-live-number" x="60" y="64" text-anchor="middle" dominant-baseline="central">${outcome.sides}</text></svg>`;
      wrap.appendChild(actor);
      numberNodes.push(actor.querySelector('.die-face-live-number'));
    }
    return numberNodes;
  }

  function spawnEmberParticles(container, count = 24) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const ember = document.createElement('span');
      ember.className = 'dragon-ember-particle';
      const angle = (Math.random() * 150 - 75) * (Math.PI / 180), distance = 50 + Math.random() * 85;
      const tx = Math.cos(angle) * distance + (Math.random() * 50 - 25);
      const ty = -Math.abs(Math.sin(angle) * distance) - (20 + Math.random() * 60);
      const size = 4 + Math.random() * 7;
      ember.style.width = `${size}px`;
      ember.style.height = `${size}px`;
      ember.style.setProperty('--tx', `${tx.toFixed(1)}px`);
      ember.style.setProperty('--ty', `${ty.toFixed(1)}px`);
      ember.style.animationDelay = `${(Math.random() * 190).toFixed(0)}ms`;
      container.appendChild(ember);
    }
  }

  function startSequentialBurstReveal(outcome, instant = false) {
    const stage = document.getElementById('dice-dragon-arena');
    const formulaElem = document.getElementById('dice-result-formula');
    const burstContainer = document.getElementById('dice-burst-sequence');
    const numberElem = document.getElementById('dice-result-number');
    const sealElem = document.getElementById('forged-number-seal');
    const detailElem = document.getElementById('dice-result-detail');
    const banner = document.getElementById('dice-result-banner');
    const statusCaption = document.getElementById('dragon-stage-caption');

    if (stage) {
      stage.classList.remove('phase-idle', 'phase-eating', 'phase-rolling', 'phase-burning');
      stage.classList.add('phase-revealed');
      stage.classList.toggle('is-crit-20', outcome.natDieForBanner === 20);
      stage.classList.toggle('is-fumble-1', outcome.natDieForBanner === 1);
    }
    if (formulaElem) formulaElem.textContent = outcome.formulaText;
    if (detailElem) detailElem.textContent = outcome.detailText;
    if (sealElem) sealElem.classList.remove('seal-final-burst');
    if (banner) { banner.style.display = 'none'; banner.className = 'dice-result-banner'; }

    const shapeSvg = DICE_SVG_SHAPES[outcome.sides] || DICE_SVG_SHAPES[20];
    if (burstContainer) {
      burstContainer.innerHTML = '';
      outcome.rolls.forEach((val, idx) => {
        const isDiscarded = outcome.discardedIndices.includes(idx);
        const isMax = val === outcome.sides && !isDiscarded, isMin = val === 1 && !isDiscarded;
        const chip = document.createElement('div');
        chip.className = `die-burst-chip ${isDiscarded ? 'is-discarded' : ''} ${isMax ? 'is-max-roll' : ''} ${isMin ? 'is-min-roll' : ''}`;
        chip.innerHTML = `<span class="burst-shockwave-ring"></span><span class="burst-sparks-halo"></span><svg class="burst-mini-die-svg" viewBox="0 0 120 120">${shapeSvg}</svg><span class="burst-die-val">${val}</span>`;
        burstContainer.appendChild(chip);
      });
      if (outcome.mod !== 0) {
        const modChip = document.createElement('div');
        modChip.className = 'die-burst-chip is-mod-chip';
        modChip.innerHTML = `<span class="burst-shockwave-ring"></span><span class="burst-die-val">${outcome.mod > 0 ? `+${outcome.mod}` : outcome.mod}</span>`;
        burstContainer.appendChild(modChip);
      }
    }

    const chips = burstContainer ? Array.from(burstContainer.querySelectorAll('.die-burst-chip')) : [];
    const totalRolls = outcome.rolls.length;

    if (instant || chips.length === 0) {
      chips.forEach(c => c.classList.add('burst-popped'));
      if (numberElem) numberElem.textContent = outcome.total;
      if (sealElem) sealElem.classList.add('seal-final-burst');
      showBannerAndRecordHistory(outcome, banner, statusCaption);
      isSequenceRunning = false;
      return;
    }

    const stepMs = totalRolls > 10 ? 60 : (totalRolls > 5 ? 95 : 145);
    let runningSum = 0;
    if (numberElem) numberElem.textContent = '0';

    outcome.rolls.forEach((val, idx) => {
      rollTimers.push(setTimeout(() => {
        if (chips[idx]) chips[idx].classList.add('burst-popped');
        if (!outcome.discardedIndices.includes(idx)) runningSum += val;
        if (numberElem) numberElem.textContent = runningSum;
      }, idx * stepMs));
    });

    rollTimers.push(setTimeout(() => {
      if (outcome.mod !== 0 && chips[totalRolls]) chips[totalRolls].classList.add('burst-popped');
      if (numberElem) numberElem.textContent = outcome.total;
      if (sealElem) { sealElem.classList.remove('seal-final-burst'); void sealElem.offsetWidth; sealElem.classList.add('seal-final-burst'); }
      showBannerAndRecordHistory(outcome, banner, statusCaption);
      isSequenceRunning = false;
    }, totalRolls * stepMs + 60));
  }

  function showBannerAndRecordHistory(outcome, banner, statusCaption) {
    if (statusCaption) statusCaption.textContent = 'Haz clic en el Cofre para escoger otros dados o aquí para repetir';
    if (banner) {
      if (outcome.natDieForBanner === 20) {
        banner.style.display = 'block'; banner.classList.add('crit');
        banner.textContent = '¡CRÍTICO NATURAL 20! FORJADO EN FUEGO DE DRAGÓN';
      } else if (outcome.natDieForBanner === 1) {
        banner.style.display = 'block'; banner.classList.add('fumble');
        banner.textContent = '¡PIFIA NATURAL 1! CONSUMIDO POR LAS CENIZAS';
      }
    }
    if (!outcome.recordedInHistory) {
      outcome.recordedInHistory = true;
      rollHistory.unshift({ label: `${outcome.count}d${outcome.sides}`, total: outcome.total, crit: outcome.natDieForBanner === 20, fumble: outcome.natDieForBanner === 1 });
      if (rollHistory.length > 5) rollHistory.pop();
      const strip = document.getElementById('dice-history-strip');
      if (strip) {
        strip.innerHTML = `<span class="history-label">Historial:</span>` + rollHistory.map(item => {
          const extraClass = item.crit ? 'is-crit' : (item.fumble ? 'is-fumble' : '');
          return `<span class="history-pill ${extraClass}"><strong>${item.total}</strong> <small>(${item.label})</small></span>`;
        }).join('');
      }
    }
  }

  function executeAnimatedDiceRoll(sides, customLabel = '') {
    clearActiveRollTimers();
    isSequenceRunning = true;
    selectedDieSides = sides;

    const outcome = computeRollOutcome(sides, customLabel);
    currentRollData = outcome;

    const stage = document.getElementById('dice-dragon-arena');
    const popover = document.getElementById('chest-dice-popover');
    const embersLayer = document.getElementById('dice-embers-layer');
    const statusCaption = document.getElementById('dragon-stage-caption');

    document.querySelectorAll('.btn-dice').forEach(btn => {
      btn.classList.toggle('active-rolling', parseInt(btn.dataset.die, 10) === sides);
    });
    updateChestPopoverPreview();

    if (!stage) { startSequentialBurstReveal(outcome, true); return; }

    if (popover && popover.classList.contains('is-open')) {
      popover.classList.remove('is-open');
      popover.classList.add('is-swallowed');
    }

    const liveNumberNodes = renderJumpingDiceActors(outcome);
    stage.classList.remove('phase-idle', 'phase-eating', 'phase-rolling', 'phase-burning', 'phase-revealed', 'chest-lid-open', 'is-crit-20', 'is-fumble-1');
    void stage.offsetWidth;

    stage.classList.add('phase-eating');
    if (statusCaption) statusCaption.textContent = `¡El Cofre engulle ${outcome.rolls.length}d${sides} y los agita en su interior!`;

    rollTimers.push(setTimeout(() => {
      stage.classList.remove('phase-eating');
      stage.classList.add('phase-rolling');
      if (statusCaption) {
        statusCaption.textContent = outcome.rolls.length > 4
          ? `¡El Cofre escupe ${outcome.rolls.length}d${sides} al Dragón (4 dados en escena)!`
          : `¡El Cofre escupe ${outcome.rolls.length}d${sides} hacia el Dragón!`;
      }
      numberCycleInterval = setInterval(() => {
        liveNumberNodes.forEach(node => { if (node) node.textContent = Math.floor(Math.random() * sides) + 1; });
      }, 50);
    }, 420));

    rollTimers.push(setTimeout(() => {
      if (numberCycleInterval) { clearInterval(numberCycleInterval); numberCycleInterval = null; }
      liveNumberNodes.forEach((node, idx) => { if (node) node.textContent = outcome.rolls[idx] ?? outcome.rolls[0]; });
    }, 950));

    rollTimers.push(setTimeout(() => {
      stage.classList.remove('phase-rolling');
      stage.classList.add('phase-burning');
      if (statusCaption) statusCaption.textContent = '¡El Dragón quema los dados y desata el estallido!';
      spawnEmberParticles(embersLayer, 18 + liveNumberNodes.length * 5);
    }, 1020));

    rollTimers.push(setTimeout(() => {
      if (statusCaption) statusCaption.textContent = 'Estallando resultados uno a uno...';
      startSequentialBurstReveal(outcome, false);
    }, 1540));
  }

  function initDragonDiceArena() {
    const stage = document.getElementById('dice-dragon-arena');
    const chestTrigger = document.getElementById('btn-chest-stage-trigger');
    const btnFeedLaunch = document.getElementById('btn-feed-chest-launch');
    const countInput = document.getElementById('dice-count-input');
    const modInput = document.getElementById('dice-mod-input');
    if (!stage) return;

    renderJumpingDiceActors({ sides: 20, rolls: [20] });
    updateChestPopoverPreview();

    document.querySelectorAll('.btn-dice').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedDieSides = parseInt(btn.dataset.die, 10) || 20;
        document.querySelectorAll('.btn-dice').forEach(b => b.classList.toggle('active-rolling', b === btn));
        updateChestPopoverPreview();
      });
    });

    document.getElementById('btn-dice-count-dec')?.addEventListener('click', () => {
      if (countInput) countInput.value = Math.max(1, (parseInt(countInput.value, 10) || 1) - 1);
      updateChestPopoverPreview();
    });
    document.getElementById('btn-dice-count-inc')?.addEventListener('click', () => {
      if (countInput) countInput.value = Math.min(20, (parseInt(countInput.value, 10) || 1) + 1);
      updateChestPopoverPreview();
    });
    document.getElementById('btn-dice-mod-dec')?.addEventListener('click', () => {
      if (modInput) modInput.value = (parseInt(modInput.value, 10) || 0) - 1;
      updateChestPopoverPreview();
    });
    document.getElementById('btn-dice-mod-inc')?.addEventListener('click', () => {
      if (modInput) modInput.value = (parseInt(modInput.value, 10) || 0) + 1;
      updateChestPopoverPreview();
    });
    countInput?.addEventListener('input', updateChestPopoverPreview);
    modInput?.addEventListener('input', updateChestPopoverPreview);
    document.querySelectorAll('input[name="dice-roll-mode"]').forEach(r => r.addEventListener('change', updateChestPopoverPreview));

    btnFeedLaunch?.addEventListener('click', (e) => { e.stopPropagation(); executeAnimatedDiceRoll(selectedDieSides, ''); });
    chestTrigger?.addEventListener('click', (e) => { e.stopPropagation(); toggleChestPopover(); });

    stage.addEventListener('click', () => {
      if (isSequenceRunning && currentRollData) {
        clearActiveRollTimers();
        startSequentialBurstReveal(currentRollData, true);
      } else if (currentRollData) {
        executeAnimatedDiceRoll(currentRollData.sides, '');
      } else {
        openChestPopover();
      }
    });
  }

  window.executeAnimatedDiceRoll = executeAnimatedDiceRoll;
  window.openChestPopover = openChestPopover;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDragonDiceArena);
  } else {
    initDragonDiceArena();
  }
})();
