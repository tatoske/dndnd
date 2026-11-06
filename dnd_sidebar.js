/**
 * ============================================================================
 * D&D 5ª EDICIÓN - CORTINA LATERAL DESLIZABLE (SIDEBAR DRAWER)
 * Permite esconder y desplegar el menú de herramientas en un panel lateral
 * fluido con física Apple spring, modo fijado (pinned) y atajos de teclado.
 * ============================================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY_PINNED = 'dnd5e_curtain_pinned';

  function initSidebarCurtain() {
    const curtain = document.getElementById('sidebar-curtain');
    const backdrop = document.getElementById('sidebar-curtain-backdrop');
    const btnOpen = document.getElementById('btn-open-curtain');
    const btnClose = document.getElementById('btn-close-curtain');
    const btnPin = document.getElementById('btn-pin-curtain');

    if (!curtain || !backdrop) return;

    // Cargar estado fijado guardado
    const isPinned = localStorage.getItem(STORAGE_KEY_PINNED) === 'true';
    if (isPinned && window.innerWidth >= 1440) {
      setPinned(true);
      openCurtain(false);
    }

    // Disparador principal para abrir/cerrar
    btnOpen?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleCurtain();
    });

    // Botón cerrar dentro de la cortina
    btnClose?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCurtain();
    });

    // Botón fijar / desfijar
    btnPin?.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentPinned = document.body.classList.contains('curtain-pinned');
      setPinned(!currentPinned);
    });

    // Clic en backdrop para cerrar (solo si no está fijado)
    backdrop.addEventListener('click', () => {
      if (!document.body.classList.contains('curtain-pinned')) {
        closeCurtain();
      }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const guideOverlay = document.getElementById('dnd-guide-overlay');
        const isGuideActive = guideOverlay && guideOverlay.style.display !== 'none';
        if (!isGuideActive && curtain.classList.contains('open') && !document.body.classList.contains('curtain-pinned')) {
          closeCurtain();
        }
      }
    });

    // Sincronizar estado visual entre botones de página en la barra y en la cortina
    document.addEventListener('click', (e) => {
      const pageBtn = e.target.closest('.page-tab-btn:not(.view-all-btn)');
      if (pageBtn && pageBtn.dataset.page) {
        const pageId = pageBtn.dataset.page;
        document.querySelectorAll(`.page-tab-btn[data-page="${pageId}"]`).forEach(b => b.classList.add('active'));

        // En pantallas móviles / medianas, cerrar cortina al elegir página
        if (window.innerWidth < 1024 && !document.body.classList.contains('curtain-pinned')) {
          closeCurtain();
        }
      }
    });

    // Auto-ajustar al cambiar tamaño de pantalla
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1440 && document.body.classList.contains('curtain-pinned')) {
        setPinned(false);
      }
    });

    // Exportar control global si se requiere invocar programáticamente
    window.dndCurtain = {
      open: () => openCurtain(true),
      close: () => closeCurtain(),
      toggle: () => toggleCurtain(),
      isOpen: () => curtain.classList.contains('open')
    };
  }

  function openCurtain(animate = true) {
    const curtain = document.getElementById('sidebar-curtain');
    const backdrop = document.getElementById('sidebar-curtain-backdrop');
    const btnOpen = document.getElementById('btn-open-curtain');
    if (!curtain) return;

    curtain.classList.add('open');
    if (!document.body.classList.contains('curtain-pinned')) {
      backdrop?.classList.add('active');
    }
    btnOpen?.setAttribute('aria-expanded', 'true');
  }

  function closeCurtain() {
    const curtain = document.getElementById('sidebar-curtain');
    const backdrop = document.getElementById('sidebar-curtain-backdrop');
    const btnOpen = document.getElementById('btn-open-curtain');
    if (!curtain) return;

    curtain.classList.remove('open');
    backdrop?.classList.remove('active');
    btnOpen?.setAttribute('aria-expanded', 'false');
  }

  function toggleCurtain() {
    const curtain = document.getElementById('sidebar-curtain');
    if (!curtain) return;
    if (curtain.classList.contains('open')) {
      closeCurtain();
    } else {
      openCurtain();
    }
  }

  function setPinned(pinned) {
    const btnPin = document.getElementById('btn-pin-curtain');
    const backdrop = document.getElementById('sidebar-curtain-backdrop');

    if (pinned) {
      document.body.classList.add('curtain-pinned');
      btnPin?.classList.add('active');
      btnPin?.setAttribute('title', 'Desfijar panel lateral (Modo flotante)');
      backdrop?.classList.remove('active');
      localStorage.setItem(STORAGE_KEY_PINNED, 'true');
    } else {
      document.body.classList.remove('curtain-pinned');
      btnPin?.classList.remove('active');
      btnPin?.setAttribute('title', 'Fijar panel lateral');
      const curtain = document.getElementById('sidebar-curtain');
      if (curtain && curtain.classList.contains('open')) {
        backdrop?.classList.add('active');
      }
      localStorage.setItem(STORAGE_KEY_PINNED, 'false');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarCurtain);
  } else {
    initSidebarCurtain();
  }
})();
