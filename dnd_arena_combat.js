/**
 * ============================================================================
 * ARENA DE COMBATE INTERACTIVA (PERSONAJE VS. BESTIARIO OFICIAL D&D 5.5e)
 * Combate por turnos con tiradas contra CA, barras de PG, Conjuros y Botín (Idea #3)
 * ============================================================================
 */
(function () {
  'use strict';

  const arenaState = {
    monster: null,
    monsterHp: 10,
    monsterMaxHp: 10,
    monsterAc: 12,
    questId: null,
    round: 1,
    log: [],
    victory: false,
    rewardClaimed: false
  };

  function getMod(attr) {
    const val = parseInt(document.getElementById(`score-${attr}`)?.value || '10', 10);
    return Math.floor((val - 10) / 2);
  }

  function parseAcNum(acStr) {
    const m = String(acStr || '12').match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 12;
  }

  function parseHitBonus(hitStr) {
    const m = String(hitStr || '+4').match(/([+-]?\d+)/);
    return m ? parseInt(m[1], 10) : 4;
  }

  function addLog(msg, type) {
    arenaState.log.unshift({ msg, type: type || 'info' });
    if (arenaState.log.length > 18) arenaState.log.pop();
  }

  // 1. ABRIR LA ARENA CONTRA UN MONSTRUO DEL BESTIARIO O DE UNA MISIÓN
  function openArenaCombatModal(monsterId, linkedQuestId) {
    const modal = document.getElementById('arena-combat-modal');
    if (!modal) return;

    const monsters = window.DND_OFFICIAL_BESTIARY || [];
    const m = monsters.find(x => x.id === monsterId) || monsters.find(x => x.name === monsterId) || monsters[0];
    if (!m) return;

    arenaState.monster = m;
    arenaState.monsterHp = m.hp;
    arenaState.monsterMaxHp = m.hp;
    arenaState.monsterAc = parseAcNum(m.ac);
    arenaState.questId = linkedQuestId || null;
    arenaState.round = 1;
    arenaState.victory = false;
    arenaState.rewardClaimed = false;
    arenaState.log = [];

    // Asegurar que el jugador tenga al menos 1 PG al entrar
    const hpCurEl = document.getElementById('hp-current');
    const hpMaxEl = document.getElementById('hp-max');
    if (hpCurEl && parseInt(hpCurEl.value || '0', 10) <= 0) {
      hpCurEl.value = Math.max(10, parseInt(hpMaxEl?.value || '12', 10));
    }

    const heroInit = Math.floor(Math.random() * 20) + 1 + getMod('dex');
    const monDexMod = Math.floor(((m.stats?.[1] || 12) - 10) / 2);
    const monInit = Math.floor(Math.random() * 20) + 1 + monDexMod;

    addLog(`¡Comienza el encuentro contra ${m.name} (CR ${m.cr})! Iniciativa Héroe: ${heroInit} vs. ${m.name}: ${monInit}.`, 'system');
    if (monInit > heroInit) {
      executeMonsterCounterAttack(true);
    }

    renderArenaCombatUI();
    modal.classList.add('active');
  }

  // 2. ATAQUE DEL JUGADOR (ARMA O CONJURO)
  function executeHeroAction(actionName, hitBonus, dmgFormula, isHeal) {
    if (arenaState.victory) return;

    if (isHeal) {
      const r = window.rollFormulaString ? window.rollFormulaString(dmgFormula) : { total: 8, detail: dmgFormula };
      window.healCharacterHp?.(r.total);
      addLog(`Ronda ${arenaState.round}: Usas ${actionName} y recuperas +${r.total} PG (${r.detail}).`, 'heal');
      executeMonsterCounterAttack(false);
      arenaState.round++;
      renderArenaCombatUI();
      return;
    }

    const d20 = Math.floor(Math.random() * 20) + 1;
    const isCrit = d20 === 20;
    const isFumble = d20 === 1;
    const totalAtk = d20 + hitBonus;

    if (!isFumble && (isCrit || totalAtk >= arenaState.monsterAc)) {
      const r = window.rollFormulaString ? window.rollFormulaString(dmgFormula) : { total: 6, detail: dmgFormula };
      const finalDmg = isCrit ? (r.total * 2) : r.total;
      arenaState.monsterHp = Math.max(0, arenaState.monsterHp - finalDmg);

      addLog(`Ronda ${arenaState.round} [HÉROE]: ¡${isCrit ? 'CRÍTICO 20 NAT! ' : ''}${actionName} impacta (${d20}+${hitBonus}=${totalAtk} vs CA ${arenaState.monsterAc}) e inflige ${finalDmg} de daño!`, 'hero-hit');

      if (arenaState.monsterHp <= 0) {
        arenaState.victory = true;
        addLog(`¡VICTORIA! Has derrotado a ${arenaState.monster.name}. Reclama tu experiencia y botín abajo.`, 'victory');
        renderArenaCombatUI();
        return;
      }
    } else {
      addLog(`Ronda ${arenaState.round} [HÉROE]: ${actionName} falla (${d20}+${hitBonus}=${totalAtk} vs CA ${arenaState.monsterAc}).`, 'miss');
    }

    executeMonsterCounterAttack(false);
    arenaState.round++;
    renderArenaCombatUI();
  }

  // 3. CONTRAATAQUE DEL MONSTRUO
  function executeMonsterCounterAttack(isSurprise) {
    const m = arenaState.monster;
    if (!m || arenaState.monsterHp <= 0) return;

    const actions = m.actions || [{ name: 'Ataque', roll: '1d6+2', hit: '+4' }];
    const act = actions[Math.floor(Math.random() * actions.length)];
    const hitBonus = parseHitBonus(act.hit);
    const heroAc = parseInt(document.getElementById('stat-ac')?.value || '14', 10);

    const d20 = Math.floor(Math.random() * 20) + 1;
    const totalAtk = d20 + hitBonus;

    if (d20 === 20 || (d20 !== 1 && totalAtk >= heroAc)) {
      const r = window.rollFormulaString ? window.rollFormulaString(act.roll || '1d6+2') : { total: 5, detail: '1d6+2' };
      const dmg = d20 === 20 ? r.total * 2 : r.total;
      const hpCurEl = document.getElementById('hp-current');
      if (hpCurEl) {
        hpCurEl.value = Math.max(0, parseInt(hpCurEl.value || '10', 10) - dmg);
      }
      addLog(`${isSurprise ? '[Sorpresa] ' : ''}[${m.name.toUpperCase()}]: Usa ${act.name} (${d20}+${hitBonus}=${totalAtk} vs tu CA ${heroAc}) y te causa ${dmg} PG de daño.`, 'monster-hit');
    } else {
      addLog(`${isSurprise ? '[Sorpresa] ' : ''}[${m.name.toUpperCase()}]: Intenta ${act.name} (${d20}+${hitBonus}=${totalAtk} vs tu CA ${heroAc}) pero esquivas o bloqueas el golpe.`, 'miss');
    }
  }

  // 4. RENDERIZAR LA INTERFAZ DE LA ARENA
  function renderArenaCombatUI() {
    const body = document.getElementById('arena-combat-body');
    if (!body || !arenaState.monster) return;

    const m = arenaState.monster;
    const heroName = document.getElementById('char-name')?.value?.trim() || 'Tu Personaje';
    const raceId = document.getElementById('char-race')?.value || 'human';
    const classId = document.getElementById('char-class-1')?.value || 'fighter';
    const lvl = parseInt(document.getElementById('char-level-1')?.value || '1', 10);
    const prof = parseInt(document.getElementById('char-proficiency-bonus')?.value || '2', 10);
    const heroHp = parseInt(document.getElementById('hp-current')?.value || '10', 10);
    const heroMax = Math.max(1, parseInt(document.getElementById('hp-max')?.value || '12', 10));
    const heroAc = document.getElementById('stat-ac')?.value || '14';

    const heroPct = Math.max(0, Math.min(100, Math.round((heroHp / heroMax) * 100)));
    const monPct = Math.max(0, Math.min(100, Math.round((arenaState.monsterHp / Math.max(1, arenaState.monsterMaxHp)) * 100)));

    const heroArt = window.buildAnthropomorphicFigureSvg ? window.buildAnthropomorphicFigureSvg(raceId, classId, lvl) : '';
    const monArt = window.getDndMonsterArtSvg ? window.getDndMonsterArtSvg(m) : '';

    // Recopilar armas de la ficha (o dar ataque base si está vacía)
    const weaponButtons = [];
    document.querySelectorAll('#attacks-container .attack-row').forEach(row => {
      const wName = row.querySelector('.input-atk-name')?.value?.trim();
      const wBon = parseInt(row.querySelector('.input-atk-bonus')?.value || '4', 10) || (prof + Math.max(getMod('str'), getMod('dex')));
      const wDmgRaw = row.querySelector('.input-atk-damage')?.value || '1d8+2';
      const dmgMatch = wDmgRaw.match(/(\d+d\d+(?:\s*[+-]\s*\d+)?)/i);
      if (wName) {
        weaponButtons.push({ name: wName, bonus: wBon, dmg: dmgMatch ? dmgMatch[1] : `1d8+${Math.max(getMod('str'), getMod('dex'))}` });
      }
    });
    if (weaponButtons.length === 0) {
      const bestMod = Math.max(getMod('str'), getMod('dex'));
      weaponButtons.push({ name: 'Ataque con Arma Principal', bonus: prof + bestMod, dmg: `1d8+${bestMod}` });
    }

    const gpReward = Math.max(15, Math.round((m.xp || 100) / 4));

    body.innerHTML = `
      <div class="arena-versus-grid">
        <!-- COMBATIENTE IZQUIERDA: HÉROE -->
        <div class="arena-fighter-card is-hero">
          <div class="arena-fighter-top">
            <div>
              <span class="arena-role-tag">TU AVENTURERO · NIVEL ${lvl}</span>
              <h4 class="arena-fighter-name">${heroName}</h4>
            </div>
            <span class="arena-ac-shield">CA ${heroAc}</span>
          </div>
          <div class="arena-avatar-stage">${heroArt}</div>
          <div class="arena-hp-bar-wrap">
            <div class="arena-hp-bar-fill is-hero-hp" style="width:${heroPct}%"></div>
            <span class="arena-hp-text">${heroHp} / ${heroMax} PG</span>
          </div>
        </div>

        <!-- CENTRO: ACCIONES DEL TURNO -->
        <div class="arena-controls-center">
          <span class="arena-round-badge">RONDA ${arenaState.round}</span>
          <h4>Elige tu Acción de Combate</h4>
          <div class="arena-actions-stack">
            ${weaponButtons.map((w, idx) => `<button type="button" class="btn-arena-act" data-arena-wep="${idx}" ${arenaState.victory ? 'disabled' : ''}>
              <strong>Atacar: ${w.name}</strong>
              <small>${w.bonus >= 0 ? '+' + w.bonus : w.bonus} al impacto · Daño ${w.dmg}</small>
            </button>`).join('')}
            <button type="button" class="btn-arena-act is-spell-act" id="btn-arena-cantrip" ${arenaState.victory ? 'disabled' : ''}>
              <strong>Ataque Especial / Conjuro de Clase</strong>
              <small>+${prof + 3} al impacto · Daño ${Math.ceil(lvl / 2)}d8+${prof}</small>
            </button>
            <button type="button" class="btn-arena-act is-heal-act" id="btn-arena-potion" ${arenaState.victory ? 'disabled' : ''}>
              <strong>Beber Poción / Segundo Aliento</strong>
              <small>Recupera 2d4+2 PG inmediatamente</small>
            </button>
          </div>
          ${arenaState.victory && !arenaState.rewardClaimed ? `<button type="button" class="btn-arena-claim-victory" id="btn-arena-claim-loot">
            Reclamar Victoria (+${m.xp.toLocaleString()} XP · +${gpReward} PO${arenaState.questId ? ' · +1 Misión' : ''})
          </button>` : ''}
        </div>

        <!-- COMBATIENTE DERECHA: MONSTRUO -->
        <div class="arena-fighter-card is-monster">
          <div class="arena-fighter-top">
            <div>
              <span class="arena-role-tag is-danger">DESAFÍO CR ${m.cr} · ${m.xp.toLocaleString()} XP</span>
              <h4 class="arena-fighter-name">${m.name}</h4>
            </div>
            <span class="arena-ac-shield is-monster-ac">CA ${arenaState.monsterAc}</span>
          </div>
          <div class="arena-avatar-stage is-monster-stage">${monArt}</div>
          <div class="arena-hp-bar-wrap">
            <div class="arena-hp-bar-fill is-monster-hp" style="width:${monPct}%"></div>
            <span class="arena-hp-text">${arenaState.monsterHp} / ${arenaState.monsterMaxHp} PG</span>
          </div>
        </div>
      </div>

      <!-- BITÁCORA DE COMBATE -->
      <div class="arena-combat-log">
        ${arenaState.log.map(entry => `<div class="arena-log-line is-${entry.type}">${entry.msg}</div>`).join('')}
      </div>
    `;

    body.querySelectorAll('[data-arena-wep]').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = weaponButtons[parseInt(btn.getAttribute('data-arena-wep'), 10)];
        if (w) executeHeroAction(w.name, w.bonus, w.dmg, false);
      });
    });

    document.getElementById('btn-arena-cantrip')?.addEventListener('click', () => {
      executeHeroAction('Estallido de Clase / Conjuro', prof + 3, `${Math.ceil(lvl / 2)}d8+${prof}`, false);
    });

    document.getElementById('btn-arena-potion')?.addEventListener('click', () => {
      executeHeroAction('Poción de Curación', 0, '2d4+2', true);
    });

    document.getElementById('btn-arena-claim-loot')?.addEventListener('click', () => {
      if (arenaState.rewardClaimed) return;
      arenaState.rewardClaimed = true;

      if (arenaState.questId && typeof window.claimGuildQuestReward === 'function') {
        window.claimGuildQuestReward(arenaState.questId);
      } else {
        const xpInp = document.getElementById('char-xp');
        const gpInp = document.getElementById('coin-gp');
        if (xpInp) xpInp.value = parseInt(xpInp.value || '0', 10) + (m.xp || 100);
        if (gpInp) gpInp.value = parseInt(gpInp.value || '0', 10) + gpReward;
        window.updateAdventurerProgressUI?.();
        window.saveToLocalStorage?.();
        window.showToast?.(`¡Victoria contra ${m.name}! Ganaste +${m.xp} XP y +${gpReward} PO.`);
      }
      document.getElementById('arena-combat-modal')?.classList.remove('active');
    });
  }

  window.openArenaCombatModal = openArenaCombatModal;
})();

