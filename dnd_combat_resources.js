/**
 * ============================================================================
 * RASTREADOR INTERACTIVO DE RECURSOS DE CLASE + LANZAMIENTO DE CONJUROS (5.5e)
 * Gestiona contadores en vivo (Furia, Ki, Inspiración, Imposición, etc.) y Conjuros
 * ============================================================================
 */
(function () {
  'use strict';

  const resState = {
    spent: {} // { [resKey]: number }
  };

  function getMod(attr) {
    const val = parseInt(document.getElementById(`score-${attr}`)?.value || '10', 10);
    return Math.floor((val - 10) / 2);
  }

  function rollFormulaString(formula) {
    const clean = String(formula || '1d6').trim();
    const regex = /(\d+)d(\d+)(\s*[+-]\s*\d+)?/gi;
    let total = 0;
    let details = [];
    let match;
    while ((match = regex.exec(clean)) !== null) {
      const count = parseInt(match[1], 10);
      const sides = parseInt(match[2], 10);
      const bonus = match[3] ? parseInt(match[3].replace(/\s+/g, ''), 10) : 0;
      const rolls = [];
      let sub = 0;
      for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * sides) + 1;
        rolls.push(r);
        sub += r;
      }
      total += sub + bonus;
      details.push(`${count}d${sides}[${rolls.join(',')}]${bonus ? (bonus > 0 ? '+' + bonus : bonus) : ''}`);
    }
    if (details.length === 0) {
      const r = Math.floor(Math.random() * 20) + 1;
      return { total: r, detail: `1d20[${r}]` };
    }
    return { total: Math.max(1, total), detail: details.join(' + ') };
  }

  // 1. DEFINICIÓN DE RECURSOS POR CLASE Y NIVEL
  function getClassResourcesConfig(classId, level) {
    const lvl = Math.max(1, Math.min(20, parseInt(level || 1, 10)));
    const chaMod = Math.max(1, getMod('cha'));
    const wisMod = Math.max(1, getMod('wis'));
    const list = [];

    switch (classId) {
      case 'barbarian':
        list.push({
          key: 'rage',
          name: `Usos de Furia (Daño +${lvl >= 16 ? 4 : lvl >= 9 ? 3 : 2})`,
          max: lvl >= 17 ? 6 : lvl >= 12 ? 5 : lvl >= 6 ? 4 : lvl >= 3 ? 3 : 2,
          rest: 'long',
          actionBtn: 'Entrar en Furia'
        });
        break;
      case 'bard':
        list.push({
          key: 'bardic_insp',
          name: `Inspiración Bárdica (d${lvl >= 15 ? 12 : lvl >= 10 ? 10 : lvl >= 5 ? 8 : 6})`,
          max: chaMod,
          rest: lvl >= 5 ? 'short' : 'long',
          rollFormula: `1d${lvl >= 15 ? 12 : lvl >= 10 ? 10 : lvl >= 5 ? 8 : 6}`,
          actionBtn: 'Inspirar Aliado'
        });
        break;
      case 'cleric':
        if (lvl >= 2) {
          list.push({
            key: 'channel_div_cleric',
            name: `Canalizar Divinidad (${lvl >= 18 ? 4 : lvl >= 13 ? 3 : lvl >= 7 ? 2 : 1}d8+${wisMod})`,
            max: lvl >= 18 ? 4 : lvl >= 6 ? 3 : 2,
            rest: 'short',
            rollFormula: `${lvl >= 18 ? 4 : lvl >= 13 ? 3 : lvl >= 7 ? 2 : 1}d8+${wisMod}`,
            actionBtn: 'Chispa Divina'
          });
        }
        break;
      case 'druid':
        if (lvl >= 2) {
          list.push({
            key: 'wild_shape',
            name: `Forma Salvaje (+${lvl * 3} PG Temp)`,
            max: lvl >= 17 ? 4 : lvl >= 6 ? 3 : 2,
            rest: 'short',
            tempHpGrant: lvl * 3,
            actionBtn: 'Transformar'
          });
        }
        break;
      case 'fighter':
        list.push({
          key: 'second_wind',
          name: `Tomar Aliento (1d10+${lvl} PG)`,
          max: lvl >= 10 ? 4 : lvl >= 4 ? 3 : 2,
          rest: 'short',
          healFormula: `1d10+${lvl}`,
          actionBtn: 'Curar PG'
        });
        if (lvl >= 2) {
          list.push({
            key: 'action_surge',
            name: 'Oleada de Acción (Action Surge)',
            max: lvl >= 17 ? 2 : 1,
            rest: 'short',
            actionBtn: 'Usar Acción Extra'
          });
        }
        break;
      case 'monk':
        if (lvl >= 2) {
          list.push({
            key: 'monk_focus',
            name: `Puntos de Concentración (Dado Marcial d${lvl >= 17 ? 12 : lvl >= 11 ? 10 : lvl >= 5 ? 8 : 6})`,
            max: lvl,
            rest: 'short',
            actionBtn: 'Gastar 1 Punto'
          });
        }
        break;
      case 'paladin':
        list.push({
          key: 'lay_on_hands',
          name: 'Reserva Imposición de Manos (PG)',
          max: lvl * 5,
          isPool: true,
          step: 5,
          rest: 'long',
          actionBtn: 'Curar 5 PG'
        });
        if (lvl >= 3) {
          list.push({
            key: 'channel_div_paladin',
            name: 'Canalizar Divinidad',
            max: lvl >= 11 ? 3 : 2,
            rest: 'short',
            actionBtn: 'Canalizar'
          });
        }
        break;
      case 'ranger':
        list.push({
          key: 'favored_enemy',
          name: `Marca del Cazador Gratis (1d${lvl >= 20 ? 10 : 6})`,
          max: lvl >= 17 ? 6 : lvl >= 13 ? 5 : lvl >= 9 ? 4 : lvl >= 5 ? 3 : 2,
          rest: 'long',
          rollFormula: `1d${lvl >= 20 ? 10 : 6}`,
          actionBtn: 'Marcar Presa'
        });
        break;
      case 'rogue':
        list.push({
          key: 'sneak_attack',
          name: `Ataque Furtivo (+${Math.ceil(lvl / 2)}d6 por turno)`,
          max: 1,
          unlimited: true,
          rollFormula: `${Math.ceil(lvl / 2)}d6`,
          actionBtn: `Tirar ${Math.ceil(lvl / 2)}d6 Furtivo`
        });
        break;
      case 'sorcerer':
        list.push({
          key: 'innate_sorcery',
          name: 'Hechicería Innata (+1 CD y Ventaja)',
          max: 2,
          rest: 'long',
          actionBtn: 'Activar'
        });
        if (lvl >= 2) {
          list.push({
            key: 'sorcery_points',
            name: 'Puntos de Hechicería (Metamagia)',
            max: lvl,
            rest: 'long',
            actionBtn: 'Gastar 1 Punto'
          });
        }
        break;
      case 'warlock':
        list.push({
          key: 'pact_slots',
          name: `Espacios de Magia del Pacto (Nivel ${Math.min(5, Math.ceil(lvl / 2))})`,
          max: lvl >= 17 ? 4 : lvl >= 11 ? 3 : lvl >= 2 ? 2 : 1,
          rest: 'short',
          actionBtn: 'Gastar Espacio'
        });
        break;
      case 'wizard':
        list.push({
          key: 'arcane_recovery',
          name: `Recuperación Arcana (${Math.ceil(lvl / 2)} niveles)`,
          max: 1,
          rest: 'long',
          actionBtn: 'Recuperar Espacios'
        });
        break;
    }
    return list;
  }

  // 2. RENDERIZAR PANEL DE RECURSOS EN LA COLUMNA 2 DE LA PÁGINA 1
  function renderClassResourcesTracker() {
    const container = document.getElementById('class-resources-tracker');
    if (!container) return;

    const c1Id = document.getElementById('char-class-1')?.value || 'fighter';
    const lvl1 = parseInt(document.getElementById('char-level-1')?.value || '1', 10);
    const clsName = (window.DND_55E_CLASSES || {})[c1Id]?.name || 'Clase';
    const resources = getClassResourcesConfig(c1Id, lvl1);

    if (resources.length === 0) {
      container.innerHTML = `<div class="class-res-empty">Selecciona tu clase para activar sus contadores tácticos en combate.</div>`;
      return;
    }

    container.innerHTML = resources.map(res => {
      const spent = Math.max(0, Math.min(res.max, resState.spent[res.key] || 0));
      const avail = res.unlimited ? '∞' : (res.max - spent);

      let pipsHtml = '';
      if (!res.unlimited && !res.isPool && res.max <= 10) {
        for (let i = 0; i < res.max; i++) {
          const isUsed = i < spent;
          pipsHtml += `<button type="button" class="res-pip-dot ${isUsed ? 'is-spent' : 'is-avail'}" data-toggle-pip="${res.key}" data-pip-idx="${i}" title="${isUsed ? 'Usado (clic para restaurar)' : 'Disponible (clic para gastar)'}"></button>`;
        }
      } else if (!res.unlimited) {
        const pct = Math.round(((res.max - spent) / Math.max(1, res.max)) * 100);
        pipsHtml = `<div class="res-pool-mini-bar"><div class="res-pool-mini-fill" style="width:${pct}%"></div></div>`;
      }

      return `<div class="class-res-row">
        <div class="class-res-info">
          <div class="class-res-title-line">
            <strong class="class-res-name">${res.name}</strong>
            <span class="class-res-counter-pill">${res.unlimited ? '1/Turno' : `${avail} / ${res.max}`}</span>
          </div>
          <div class="class-res-pips-wrap">${pipsHtml}</div>
        </div>
        <div class="class-res-actions">
          <button type="button" class="btn-res-use" data-use-res="${res.key}">${res.actionBtn || 'Usar'}</button>
          ${!res.unlimited && spent > 0 ? `<button type="button" class="btn-res-restore" data-restore-res="${res.key}" title="Restaurar este recurso">&#8635;</button>` : ''}
        </div>
      </div>`;
    }).join('');

    container.querySelectorAll('[data-toggle-pip]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-toggle-pip');
        const idx = parseInt(btn.getAttribute('data-pip-idx'), 10);
        const curSpent = resState.spent[key] || 0;
        resState.spent[key] = (idx < curSpent) ? idx : (idx + 1);
        renderClassResourcesTracker();
      });
    });

    container.querySelectorAll('[data-restore-res]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-restore-res');
        resState.spent[key] = 0;
        renderClassResourcesTracker();
      });
    });

    container.querySelectorAll('[data-use-res]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-use-res');
        const res = resources.find(r => r.key === key);
        if (!res) return;

        const curSpent = resState.spent[key] || 0;
        if (!res.unlimited && curSpent >= res.max) {
          window.showToast?.(`No te quedan usos de ${res.name}. Haz un descanso para recargar.`);
          return;
        }

        if (!res.unlimited) {
          const step = res.step || 1;
          resState.spent[key] = Math.min(res.max, curSpent + step);
        }

        if (res.healFormula) {
          const r = rollFormulaString(res.healFormula);
          healCharacterHp(r.total);
          window.showToast?.(`${clsName}: ${res.name} curó +${r.total} PG (${r.detail})`);
        } else if (res.isPool && res.step) {
          healCharacterHp(res.step);
          window.showToast?.(`${clsName}: Imposición de Manos restauró +${res.step} PG`);
        } else if (res.tempHpGrant) {
          const tempInp = document.getElementById('hp-temp');
          if (tempInp) tempInp.value = Math.max(parseInt(tempInp.value || '0', 10), res.tempHpGrant);
          window.showToast?.(`${clsName}: ${res.name} activada (+${res.tempHpGrant} PG Temporales)`);
        } else if (res.rollFormula) {
          const r = rollFormulaString(res.rollFormula);
          window.showToast?.(`${res.name}: Resultado ${r.total} (${r.detail})`);
        } else {
          window.showToast?.(`${clsName}: ¡${res.name} activado!`);
        }

        renderClassResourcesTracker();
        if (typeof window.saveToLocalStorage === 'function') window.saveToLocalStorage();
      });
    });
  }

  function healCharacterHp(amount) {
    const curInp = document.getElementById('hp-current');
    const maxInp = document.getElementById('hp-max');
    if (!curInp) return;
    const cur = parseInt(curInp.value || '0', 10);
    const max = parseInt(maxInp?.value || '999', 10) || 999;
    curInp.value = Math.min(max, cur + amount);
  }

  // Recargar recursos al hacer Descanso Corto o Largo
  function restoreClassResourcesOnRest(restType) {
    const c1Id = document.getElementById('char-class-1')?.value || 'fighter';
    const lvl1 = parseInt(document.getElementById('char-level-1')?.value || '1', 10);
    const resources = getClassResourcesConfig(c1Id, lvl1);
    resources.forEach(res => {
      if (restType === 'long' || res.rest === 'short') {
        resState.spent[res.key] = 0;
      }
    });
    renderClassResourcesTracker();
  }

  // 3. LANZAR CONJURO DESDE EL CREADOR 3D O LA PÁGINA 3 (IDEA #5)
  function castSpellInteractive(spellName, spellLevel, spellDesc) {
    const lvl = parseInt(spellLevel || 0, 10);
    if (lvl > 0) {
      const totalEl = document.getElementById(`slot-${lvl}-total`);
      const usedEl = document.getElementById(`slot-${lvl}-used`);
      const totalSlots = parseInt(totalEl?.value || '0', 10);
      const usedSlots = parseInt(usedEl?.value || '0', 10);

      if (totalSlots > 0 && usedSlots >= totalSlots) {
        window.showToast?.(`¡Espacios agotados! Ya usaste los ${totalSlots} espacios de Nivel ${lvl}. Haz un Descanso Largo.`);
        return;
      }
      if (usedEl) {
        usedEl.value = usedSlots + 1;
      }
    }

    // Buscar si la descripción contiene dados (ej. 8d6, 3d8, 1d10, 2d4+2)
    const diceMatch = String(spellDesc || '').match(/(\d+d\d+(?:\s*\+\s*\d+)?)/i);
    const isHeal = /cura|recupera|restaura/i.test(String(spellDesc || '')) || /curar|palabra curativa/i.test(String(spellName || ''));

    if (diceMatch) {
      const r = rollFormulaString(diceMatch[1]);
      if (isHeal) {
        const spellMod = getMod(document.getElementById('spell-ability')?.value || 'wis');
        const totalHeal = Math.max(1, r.total + Math.max(0, spellMod));
        healCharacterHp(totalHeal);
        window.showToast?.(`Conjuro ${spellName} (Nvl ${lvl}): ¡Curaste +${totalHeal} PG! (${r.detail})`);
      } else {
        window.showToast?.(`Conjuro ${spellName} (Nvl ${lvl}): Impacto de ${r.total} de daño (${r.detail})`);
      }
    } else {
      window.showToast?.(`¡Lanzaste ${spellName}! ${lvl > 0 ? `(Se descontó 1 espacio de Nivel ${lvl})` : '(Truco a voluntad)'}`);
    }

    if (typeof window.saveToLocalStorage === 'function') window.saveToLocalStorage();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderClassResourcesTracker();
    document.getElementById('char-class-1')?.addEventListener('change', () => {
      resState.spent = {};
      renderClassResourcesTracker();
    });
    document.getElementById('char-level-1')?.addEventListener('change', renderClassResourcesTracker);
    document.getElementById('btn-execute-short-rest')?.addEventListener('click', () => restoreClassResourcesOnRest('short'));
    document.getElementById('btn-long-rest')?.addEventListener('click', () => setTimeout(() => restoreClassResourcesOnRest('long'), 150));
  });

  window.renderClassResourcesTracker = renderClassResourcesTracker;
  window.restoreClassResourcesOnRest = restoreClassResourcesOnRest;
  window.castSpellInteractive = castSpellInteractive;
  window.rollFormulaString = rollFormulaString;
  window.healCharacterHp = healCharacterHp;
})();

