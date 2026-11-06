/**
 * ============================================================================
 * D&D 5ª EDICIÓN - PANEL LATERAL DE GUÍA OFICIAL (SPOTLIGHT + DRAWER DERECHO)
 * Muestra las explicaciones y ejemplos en un panel lateral dedicado sin obstruir
 * jamás la ficha, mientras ilumina en foco dorado cada apartado analizado.
 * ============================================================================
 */

(function () {
  'use strict';

  let currentStepIndex = 0;
  let isActive = false;

  function getSteps() {
    return window.DND_GUIDE_STEPS || [];
  }

  function initGuide() {
    const btnTriggerNav = document.getElementById('btn-open-guide-nav');
    const btnTriggerCurtain = document.getElementById('btn-open-guide-curtain');

    btnTriggerNav?.addEventListener('click', (e) => {
      e.preventDefault();
      startGuide(0);
    });

    btnTriggerCurtain?.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.dndCurtain?.isOpen?.() && !document.body.classList.contains('curtain-pinned')) {
        window.dndCurtain.close();
      }
      startGuide(0);
    });

    // Atajos de teclado: Flechas para avanzar/retroceder y Esc para salir
    document.addEventListener('keydown', (e) => {
      if (!isActive) return;
      if (e.key === 'Escape') {
        stopGuide();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevStep();
      }
    });

    window.addEventListener('resize', () => {
      if (isActive) updateSpotlight();
    });

    window.addEventListener('scroll', () => {
      if (isActive) updateSpotlight();
    }, { passive: true });

    window.dndGuide = {
      start: (index = 0) => startGuide(index),
      stop: () => stopGuide(),
      next: () => nextStep(),
      prev: () => prevStep(),
      goTo: (index) => renderStep(index),
      isActive: () => isActive
    };
  }

  function startGuide(startIndex = 0) {
    const overlay = document.getElementById('dnd-guide-overlay');
    const panel = document.getElementById('dnd-guide-panel');
    if (!overlay || !panel) return;

    isActive = true;
    overlay.style.display = 'block';
    panel.classList.add('open');
    document.body.classList.add('guide-active', 'guide-panel-active');

    renderStep(startIndex);
  }

  function stopGuide() {
    const overlay = document.getElementById('dnd-guide-overlay');
    const panel = document.getElementById('dnd-guide-panel');
    if (overlay) overlay.style.display = 'none';
    if (panel) panel.classList.remove('open');

    document.body.classList.remove('guide-active', 'guide-panel-active');
    isActive = false;

    document.querySelectorAll('.guide-highlight-target').forEach(el => {
      el.classList.remove('guide-highlight-target');
    });
  }

  function nextStep() {
    const steps = getSteps();
    if (currentStepIndex < steps.length - 1) {
      renderStep(currentStepIndex + 1);
    } else {
      stopGuide();
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      renderStep(currentStepIndex - 1);
    }
  }

  function renderStep(index) {
    const steps = getSteps();
    if (index < 0 || index >= steps.length) return;
    currentStepIndex = index;
    const step = steps[currentStepIndex];

    // Cambiar de pestaña si el paso pertenece a otra página
    if (step.page) {
      const pageBtn = document.querySelector(`.page-tab-btn[data-page="${step.page}"]`);
      if (pageBtn && !pageBtn.classList.contains('active')) {
        pageBtn.click();
      }
    }

    setTimeout(() => {
      const targetEl = document.querySelector(step.selector);
      if (!targetEl) return;

      document.querySelectorAll('.guide-highlight-target').forEach(el => {
        el.classList.remove('guide-highlight-target');
      });
      targetEl.classList.add('guide-highlight-target');

      // Centrar el elemento en la porción visible de la pantalla
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      renderPanelContent(step);
      setTimeout(updateSpotlight, 150);
    }, 100);
  }

  function updateSpotlight() {
    const steps = getSteps();
    const step = steps[currentStepIndex];
    if (!step) return;

    const targetEl = document.querySelector(step.selector);
    const spotlight = document.getElementById('dnd-guide-spotlight');
    if (!targetEl || !spotlight) return;

    const rect = targetEl.getBoundingClientRect();
    const pad = 8;

    spotlight.style.top = `${Math.max(0, rect.top - pad)}px`;
    spotlight.style.left = `${Math.max(0, rect.left - pad)}px`;
    spotlight.style.width = `${rect.width + (pad * 2)}px`;
    spotlight.style.height = `${rect.height + (pad * 2)}px`;
  }

  function renderPanelContent(step) {
    const panel = document.getElementById('dnd-guide-panel');
    if (!panel) return;

    const steps = getSteps();
    const totalSteps = steps.length;
    const currentNum = currentStepIndex + 1;
    const isFirst = currentStepIndex === 0;
    const isLast = currentStepIndex === totalSteps - 1;

    const jumpOptions = steps.map((s, idx) => `
      <option value="${idx}" ${idx === currentStepIndex ? 'selected' : ''}>
        ${idx + 1}. ${s.title}
      </option>
    `).join('');

    panel.innerHTML = `
      <div class="guide-panel-header">
        <div class="guide-panel-brand">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22" style="color: var(--brand-primary);">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
          </svg>
          <div class="guide-panel-title-group">
            <span class="guide-panel-main-title">GUÍA DE LA FICHA</span>
            <span class="guide-panel-sub-title">D&D 5ª Edición (5.5e)</span>
          </div>
        </div>
        <div class="guide-panel-header-actions">
          <span class="guide-panel-step-badge">Paso ${currentNum} de ${totalSteps}</span>
          <button type="button" id="btn-guide-panel-close" class="guide-panel-close-btn" title="Cerrar Guía (Esc)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="guide-panel-scroll-body">
        <div class="guide-focus-indicator">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Sección enfocada en la ficha (a tu izquierda)</span>
        </div>

        <div class="guide-section-badge-row">
          <span class="guide-category-tag">${step.category}</span>
        </div>

        <h3 class="guide-step-heading">${step.title}</h3>

        <div class="guide-content-section">
          <h4 class="guide-block-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            ¿Qué hace y para qué se usa?
          </h4>
          <p class="guide-text">${step.what}</p>
        </div>

        <div class="guide-example-callout">
          <h4 class="guide-example-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
              <line x1="12" y1="22" x2="12" y2="15.5"></line>
              <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
            </svg>
            Ejemplo práctico en partida
          </h4>
          <p class="guide-example-text">${step.example}</p>
        </div>

        ${step.tip ? `
          <div class="guide-tip-row">
            <span class="guide-tip-badge">Regla clave:</span>
            <span class="guide-tip-text">${step.tip}</span>
          </div>
        ` : ''}
      </div>

      <div class="guide-panel-footer">
        <div class="guide-panel-jump-row">
          <select id="guide-panel-jump" class="guide-select" title="Saltar directamente a otro apartado">
            ${jumpOptions}
          </select>
        </div>
        <div class="guide-panel-nav-row">
          <span class="guide-keys-hint">
            Atajos: <kbd class="guide-kbd">←</kbd> <kbd class="guide-kbd">→</kbd> <kbd class="guide-kbd">Esc</kbd>
          </span>
          <div class="guide-nav-buttons">
            <button type="button" id="btn-guide-panel-prev" class="btn btn-outline btn-sm" ${isFirst ? 'disabled' : ''}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Anterior
            </button>
            <button type="button" id="btn-guide-panel-next" class="btn btn-primary btn-sm">
              ${isLast ? 'Finalizar Guía' : 'Siguiente'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-guide-panel-close')?.addEventListener('click', stopGuide);
    document.getElementById('btn-guide-panel-prev')?.addEventListener('click', prevStep);
    document.getElementById('btn-guide-panel-next')?.addEventListener('click', nextStep);

    document.getElementById('guide-panel-jump')?.addEventListener('change', (e) => {
      const selectedIndex = parseInt(e.target.value, 10);
      if (!isNaN(selectedIndex)) {
        renderStep(selectedIndex);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGuide);
  } else {
    initGuide();
  }
})();
