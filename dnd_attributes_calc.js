/**
 * ============================================================================
 * D&D 5ª EDICIÓN - ASIGNADOR Y CALCULADORA DE ATRIBUTOS (5.5e)
 * Conexión transparente y directa con las 6 características de la ficha:
 * - Compra por 27 Puntos oficial (Point Buy) con medidor en tiempo real.
 * - Conjunto Estándar (15, 14, 13, 12, 10, 8) con presets por clase.
 * - Tiradas 4d6 (descartando el menor) con desglose de dados.
 * - Bonos de Trasfondo 5.5e (+2/+1 o +1/+1/+1) sumados en tiempo real.
 * ============================================================================
 */

(function () {
  'use strict';

  const ATTR_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const ATTR_NAMES = {
    str: 'Fuerza',
    dex: 'Destreza',
    con: 'Constitución',
    int: 'Inteligencia',
    wis: 'Sabiduría',
    cha: 'Carisma'
  };

  const POINT_BUY_COSTS = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
  };

  let state = {
    method: 'pointbuy',
    base: { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 },
    bgBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    bgMode: '2-1', // '2-1' o '1-1-1'
    rolls4d6: []
  };

  function initAttributesCalc() {
    const btnOpenNav = document.getElementById('btn-open-asi-nav');
    const btnOpenAlt = document.getElementById('btn-asi-modal');
    const modal = document.getElementById('asi-modal');
    if (!modal) return;

    btnOpenNav?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    btnOpenAlt?.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    // Pestañas de método
    modal.querySelectorAll('.attr-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.attr-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.method = btn.dataset.method;
        renderMethodControl();
        renderTable();
      });
    });

    // Radio de modo de trasfondo (+2/+1 vs +1/+1/+1)
    modal.querySelectorAll('input[name="attr-bg-split"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.bgMode = e.target.value;
        resetBgBonuses();
        renderTable();
      });
    });

    // Botón guardar
    document.getElementById('btn-save-attributes-to-sheet')?.addEventListener('click', saveToSheet);

    // Botones de cierre
    modal.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    // Tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    window.openAttributesCalc = openModal;
  }

  function openModal() {
    const modal = document.getElementById('asi-modal');
    if (!modal) return;

    // Leer puntuaciones actuales de la ficha
    ATTR_KEYS.forEach(attr => {
      const inp = document.getElementById(`score-${attr}`);
      const val = parseInt(inp?.value, 10) || 10;
      state.base[attr] = Math.max(8, Math.min(15, val));
    });

    // Detectar trasfondo actual
    const bgSelect = document.getElementById('char-background');
    const bgNameSpan = document.getElementById('attr-calc-bg-name');
    if (bgNameSpan) {
      bgNameSpan.textContent = bgSelect?.selectedOptions[0]?.text || 'Trasfondo (Reglas 5.5e)';
    }

    resetBgBonuses();
    renderMethodControl();
    renderTable();

    modal.classList.add('active');
  }

  function closeModal() {
    document.getElementById('asi-modal')?.classList.remove('active');
  }

  function resetBgBonuses() {
    state.bgBonuses = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    if (state.bgMode === '2-1') {
      state.bgBonuses.str = 2;
      state.bgBonuses.con = 1;
    } else {
      state.bgBonuses.str = 1;
      state.bgBonuses.dex = 1;
      state.bgBonuses.con = 1;
    }
  }

  function calculatePointBuyRemaining() {
    let totalCost = 0;
    ATTR_KEYS.forEach(attr => {
      totalCost += (POINT_BUY_COSTS[state.base[attr]] || 0);
    });
    return 27 - totalCost;
  }

  function renderMethodControl() {
    const area = document.getElementById('attr-method-control-area');
    if (!area) return;

    if (state.method === 'pointbuy') {
      const remaining = calculatePointBuyRemaining();
      const isComplete = remaining === 0;
      area.innerHTML = `
        <div class="pointbuy-header-card">
          <div class="pointbuy-score-badge ${isComplete ? 'complete' : ''}">
            Puntos Disponibles: <strong>${remaining} / 27</strong>
          </div>
          <span class="pointbuy-helper-text">
            ${isComplete ? '¡Has distribuido los 27 puntos con exactitud!' : 'Aumenta o disminuye cada puntuación base entre 8 y 15.'}
          </span>
          <button type="button" id="btn-reset-pointbuy" class="btn btn-outline btn-sm">Reiniciar a 8</button>
        </div>
      `;
      document.getElementById('btn-reset-pointbuy')?.addEventListener('click', () => {
        ATTR_KEYS.forEach(a => { state.base[a] = 8; });
        renderMethodControl();
        renderTable();
      });
    } else if (state.method === 'standard') {
      area.innerHTML = `
        <div class="standard-presets-row">
          <span class="standard-label">Presets oficiales:</span>
          <button type="button" class="btn btn-outline btn-sm preset-btn" data-preset="warrior">Guerrero / Paladín</button>
          <button type="button" class="btn btn-outline btn-sm preset-btn" data-preset="rogue">Pícaro / Explorador</button>
          <button type="button" class="btn btn-outline btn-sm preset-btn" data-preset="wizard">Mago</button>
          <button type="button" class="btn btn-outline btn-sm preset-btn" data-preset="cleric">Clérigo / Druida</button>
          <button type="button" class="btn btn-outline btn-sm preset-btn" data-preset="bard">Bardo / Brujo</button>
        </div>
      `;
      area.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          applyPreset(btn.dataset.preset);
          renderTable();
        });
      });
    } else if (state.method === 'roll4d6') {
      area.innerHTML = `
        <div class="roll4d6-action-box">
          <button type="button" id="btn-roll-4d6-calc" class="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="display:inline-block; vertical-align:middle; margin-right:6px;"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline></svg>Lanzar 6 Tiradas 4d6 (Descartando el Menor)
          </button>
          <div id="roll4d6-summary-line" class="roll4d6-summary-line">
            ${state.rolls4d6.length ? 'Resultados generados listos para asignar.' : 'Pulsa el botón para simular las 6 tiradas oficiales.'}
          </div>
        </div>
      `;
      document.getElementById('btn-roll-4d6-calc')?.addEventListener('click', executeRoll4d6);
    } else {
      area.innerHTML = `
        <div class="manual-notice-box">
          <span>Modo manual: escribe libremente las puntuaciones en la tabla inferior o pulsa Guardar.</span>
        </div>
      `;
    }
  }

  function applyPreset(preset) {
    const map = {
      warrior: { str: 15, con: 14, dex: 13, wis: 12, cha: 10, int: 8 },
      rogue:   { dex: 15, con: 14, wis: 13, cha: 12, int: 10, str: 8 },
      wizard:  { int: 15, dex: 14, con: 13, wis: 12, cha: 10, str: 8 },
      cleric:  { wis: 15, con: 14, dex: 13, str: 12, cha: 10, int: 8 },
      bard:    { cha: 15, dex: 14, con: 13, wis: 12, int: 10, str: 8 }
    };
    if (map[preset]) {
      state.base = { ...map[preset] };
    }
  }

  function executeRoll4d6() {
    state.rolls4d6 = [];
    const results = [];
    for (let i = 0; i < 6; i++) {
      const dice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ].sort((a, b) => a - b);
      const sum = dice[1] + dice[2] + dice[3];
      results.push(sum);
    }
    results.sort((a, b) => b - a);
    ATTR_KEYS.forEach((attr, idx) => {
      state.base[attr] = results[idx] || 10;
    });
    renderMethodControl();
    renderTable();
  }

  function renderTable() {
    const container = document.getElementById('attr-calc-rows-container');
    const pillsContainer = document.getElementById('attr-calc-summary-pills');
    if (!container) return;

    const remainingPoints = calculatePointBuyRemaining();
    container.innerHTML = '';
    const summaryPills = [];

    ATTR_KEYS.forEach(attr => {
      const name = ATTR_NAMES[attr];
      const baseVal = state.base[attr];
      const bgVal = state.bgBonuses[attr] || 0;
      const totalVal = Math.min(20, baseVal + bgVal);
      const mod = Math.floor((totalVal - 10) / 2);
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;

      summaryPills.push(`<strong>${attr.toUpperCase()}</strong>: ${totalVal} (<code>${modStr}</code>)`);

      const row = document.createElement('div');
      row.className = 'attr-grid-row';

      let baseControls = '';
      if (state.method === 'pointbuy') {
        const canIncrease = baseVal < 15 && (POINT_BUY_COSTS[baseVal + 1] - POINT_BUY_COSTS[baseVal] <= remainingPoints);
        const canDecrease = baseVal > 8;
        baseControls = `
          <div class="stepper-box">
            <button type="button" class="btn-step btn-minus" data-attr="${attr}" ${!canDecrease ? 'disabled' : ''}>-</button>
            <span class="stepper-val">${baseVal}</span>
            <button type="button" class="btn-step btn-plus" data-attr="${attr}" ${!canIncrease ? 'disabled' : ''}>+</button>
          </div>
        `;
      } else {
        baseControls = `
          <input type="number" class="base-manual-input" data-attr="${attr}" min="3" max="18" value="${baseVal}">
        `;
      }

      row.innerHTML = `
        <div class="attr-col-name">
          <span class="attr-tag">${attr.toUpperCase()}</span>
          <span class="attr-full-name">${name}</span>
        </div>
        <div class="attr-col-base">${baseControls}</div>
        <div class="attr-col-bonus">
          <select class="bg-bonus-select" data-attr="${attr}">
            <option value="0" ${bgVal === 0 ? 'selected' : ''}>+0</option>
            <option value="1" ${bgVal === 1 ? 'selected' : ''}>+1</option>
            <option value="2" ${bgVal === 2 ? 'selected' : ''}>+2</option>
          </select>
        </div>
        <div class="attr-col-total">
          <span class="total-score-badge">${totalVal}</span>
        </div>
        <div class="attr-col-mod">
          <span class="mod-pill-badge">${modStr}</span>
        </div>
      `;

      container.appendChild(row);
    });

    if (pillsContainer) {
      pillsContainer.innerHTML = `Total en Ficha: ` + summaryPills.join(' • ');
    }

    // Eventos de stepper (+ / -)
    container.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const attr = btn.dataset.attr;
        if (state.base[attr] < 15) {
          state.base[attr]++;
          renderMethodControl();
          renderTable();
        }
      });
    });

    container.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const attr = btn.dataset.attr;
        if (state.base[attr] > 8) {
          state.base[attr]--;
          renderMethodControl();
          renderTable();
        }
      });
    });

    // Eventos de manual input
    container.querySelectorAll('.base-manual-input').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const attr = e.target.dataset.attr;
        const val = parseInt(e.target.value, 10) || 10;
        state.base[attr] = Math.max(3, Math.min(18, val));
        renderTable();
      });
    });

    // Eventos de bono de trasfondo
    container.querySelectorAll('.bg-bonus-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const attr = e.target.dataset.attr;
        state.bgBonuses[attr] = parseInt(e.target.value, 10) || 0;
        renderTable();
      });
    });
  }

  function saveToSheet() {
    const appliedSummary = [];

    ATTR_KEYS.forEach(attr => {
      const baseVal = state.base[attr];
      const bgVal = state.bgBonuses[attr] || 0;
      const totalVal = Math.min(20, baseVal + bgVal);

      const scoreInput = document.getElementById(`score-${attr}`);
      if (scoreInput) {
        scoreInput.value = totalVal;
        scoreInput.dispatchEvent(new Event('input', { bubbles: true }));
        scoreInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      appliedSummary.push(`${attr.toUpperCase()}: ${totalVal}`);
    });

    if (typeof window.recalculateAll === 'function') {
      window.recalculateAll();
    }
    if (typeof window.saveToLocalStorage === 'function') {
      window.saveToLocalStorage();
    }
    if (typeof window.showToast === 'function') {
      window.showToast(`Características actualizadas: ${appliedSummary.join(', ')}`);
    }

    closeModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAttributesCalc);
  } else {
    initAttributesCalc();
  }
})();
