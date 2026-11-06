/**
 * ============================================================================
 * FICHA DE PERSONAJE D&D 5TA EDICIÓN / 5.5e (2024) - MOTOR INTERACTIVO
 * Conexión completa de relaciones matemáticas y reglas oficiales:
 * Atributos -> Modificadores -> Salvaciones -> Habilidades -> Pasivas -> Combate y Conjuros.
 * Integración dinámica D&D 5.5e:
 * - 12 Clases oficiales 2024 con soporte Multiclase y Nivel Dinámico (1-20).
 * - 10 Especies oficiales 2024 (Razas).
 * - 16 Trasfondos oficiales 2024.
 * - Código visual de colores por origen:
 *   🟡 Dorado: Raza / Especie
 *   🔵 Azul: Clase
 *   🔴 Rojo: Trasfondo
 * ============================================================================
 */

// 18 HABILIDADES OFICIALES EN ESPAÑOL Y SU VINCULACIÓN A ATRIBUTOS
const DND_OFFICIAL_SKILLS = [
  { id: 'acrobatics', name: 'Acrobacias', attr: 'dex', label: '(Des)' },
  { id: 'arcana', name: 'Arcanos', attr: 'int', label: '(Int)' },
  { id: 'athletics', name: 'Atletismo', attr: 'str', label: '(Fue)' },
  { id: 'deception', name: 'Engaño', attr: 'cha', label: '(Car)' },
  { id: 'history', name: 'Historia', attr: 'int', label: '(Int)' },
  { id: 'performance', name: 'Interpretación', attr: 'cha', label: '(Car)' },
  { id: 'intimidation', name: 'Intimidación', attr: 'cha', label: '(Car)' },
  { id: 'investigation', name: 'Investigación', attr: 'int', label: '(Int)' },
  { id: 'sleight_of_hand', name: 'Juego de Manos', attr: 'dex', label: '(Des)' },
  { id: 'medicine', name: 'Medicina', attr: 'wis', label: '(Sab)' },
  { id: 'nature', name: 'Naturaleza', attr: 'int', label: '(Int)' },
  { id: 'perception', name: 'Percepción', attr: 'wis', label: '(Sab)' },
  { id: 'insight', name: 'Perspicacia', attr: 'wis', label: '(Sab)' },
  { id: 'persuasion', name: 'Persuasión', attr: 'cha', label: '(Car)' },
  { id: 'religion', name: 'Religión', attr: 'int', label: '(Int)' },
  { id: 'stealth', name: 'Sigilo', attr: 'dex', label: '(Des)' },
  { id: 'survival', name: 'Supervivencia', attr: 'wis', label: '(Sab)' },
  { id: 'animal_handling', name: 'Trato con Animales', attr: 'wis', label: '(Sab)' }
];

// ICONO SVG PARA ELIMINAR ÍTEMS
const SVG_TRASH = `
<svg class="btn-icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="3 6 5 6 21 6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  <line x1="10" y1="11" x2="10" y2="17" />
  <line x1="14" y1="11" x2="14" y2="17" />
</svg>`;

// FÓRMULA MATEMÁTICA OFICIAL: floor((score - 10) / 2)
function calcModifier(score) {
  const val = parseInt(score, 10);
  if (isNaN(val)) return 0;
  return Math.floor((val - 10) / 2);
}

// FORMATEA CON SIGNO MATEMÁTICO (+3, -1, +0)
function formatMod(mod) {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

// ESCALA OFICIAL DE BONO DE COMPETENCIA SEGÚN NIVEL TOTAL
function calcProficiencyBonus(totalLevel) {
  const lvl = Math.max(1, Math.min(20, parseInt(totalLevel, 10) || 1));
  if (lvl >= 17) return 6;
  if (lvl >= 13) return 5;
  if (lvl >= 9) return 4;
  if (lvl >= 5) return 3;
  return 2;
}

// INICIALIZACIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', () => {
  renderOfficialSkills();
  setupPageNavigation();
  setupEventListeners();
  setupDnd55eSystem();
  setupConditionsPanel();
  setupPortraitHandling();
  setupRestSystem();
  setupCompendiums();
  setupAsiAssistant();
  loadSavedDataOrClean();
  recalculateAll();
});

// NAVEGACIÓN ENTRE PÁGINAS Y MODO CONTINUO
function setupPageNavigation() {
  const tabButtons = document.querySelectorAll('.page-tab-btn:not(.view-all-btn)');
  const toggleAllBtn = document.getElementById('btn-toggle-all-pages');
  const docContainer = document.getElementById('sheets-document');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      docContainer.classList.remove('view-all');
      toggleAllBtn?.classList.remove('active');

      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.sheet-page').forEach(page => page.classList.remove('active'));

      btn.classList.add('active');
      const targetPageId = btn.dataset.page;
      const targetPage = document.getElementById(targetPageId);
      if (targetPage) targetPage.classList.add('active');
    });
  });

  toggleAllBtn?.addEventListener('click', () => {
    const isAll = docContainer.classList.toggle('view-all');
    toggleAllBtn.classList.toggle('active', isAll);
    if (isAll) {
      tabButtons.forEach(b => b.classList.remove('active'));
    } else {
      tabButtons[0]?.click();
    }
  });

  // Relación: Sincronizar nombre del personaje entre Página 1 y Página 2
  const name1 = document.getElementById('char-name');
  const name2 = document.getElementById('p2-char-name');
  if (name1 && name2) {
    name1.addEventListener('input', () => { name2.value = name1.value; });
    name2.addEventListener('input', () => { name1.value = name2.value; });
  }
}

// RENDERIZADO DE LAS 18 HABILIDADES OFICIALES CON INDICADOR DE ORIGEN
function renderOfficialSkills() {
  const container = document.getElementById('skills-items-list');
  if (!container) return;
  container.innerHTML = '';

  DND_OFFICIAL_SKILLS.forEach(skill => {
    const row = document.createElement('div');
    row.className = 'skill-row';
    row.dataset.skillId = skill.id;
    row.dataset.attr = skill.attr;

    row.innerHTML = `
      <input type="checkbox" id="skill-prof-${skill.id}" class="circle-check skill-prof-cb" title="Competente">
      <span class="stat-calc-num" id="skill-val-${skill.id}">+0</span>
      <label for="skill-prof-${skill.id}" class="skill-label-name">${skill.name} <span class="skill-attr-sub">${skill.label}</span></label>
      <span class="origin-tag" id="origin-skill-${skill.id}"></span>
    `;

    container.appendChild(row);
  });
}

// ASIGNACIÓN DE ORIGEN CON CÓDIGO DE COLOR (🟡 Raza, 🔵 Clase, 🔴 Trasfondo)
function setProficiencyOrigin(type, id, origin, label) {
  const row = type === 'save'
    ? document.querySelector(`.save-row[data-attr="${id}"]`)
    : document.querySelector(`.skill-row[data-skill-id="${id}"]`);
  const tag = document.getElementById(`origin-${type}-${id}`);
  const cb = document.getElementById(type === 'save' ? `save-prof-${id}` : `skill-prof-${id}`);

  if (!row || !tag) return;

  row.classList.remove('origin-species', 'origin-class', 'origin-background');
  tag.classList.remove('origin-species', 'origin-class', 'origin-background', 'visible');
  tag.textContent = '';

  if (origin && label) {
    row.classList.add(`origin-${origin}`);
    tag.classList.add(`origin-${origin}`, 'visible');
    tag.textContent = label;
    if (cb) cb.checked = true;
  }
}

// LIMPIA ORIGEN DE UN TIPO ESPECÍFICO (ej. solo de clase o solo de trasfondo)
function clearProficienciesByOrigin(originType) {
  // Salvaciones
  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
    const row = document.querySelector(`.save-row[data-attr="${attr}"]`);
    if (row && row.classList.contains(`origin-${originType}`)) {
      setProficiencyOrigin('save', attr, null, null);
      const cb = document.getElementById(`save-prof-${attr}`);
      if (cb) cb.checked = false;
    }
  });

  // Habilidades
  DND_OFFICIAL_SKILLS.forEach(skill => {
    const row = document.querySelector(`.skill-row[data-skill-id="${skill.id}"]`);
    if (row && row.classList.contains(`origin-${originType}`)) {
      setProficiencyOrigin('skill', skill.id, null, null);
      const cb = document.getElementById(`skill-prof-${skill.id}`);
      if (cb) cb.checked = false;
    }
  });
}

// GESTIÓN DE BLOQUES DE TEXTO EN "RASGOS Y ATRIBUTOS" (NO BORRA NOTAS DEL USUARIO)
function updateFeaturesBlock(sectionKey, newContent) {
  const textarea = document.getElementById('text-features');
  if (!textarea) return;

  const startMarker = `=== INICIO ${sectionKey.toUpperCase()} ===`;
  const endMarker = `=== FIN ${sectionKey.toUpperCase()} ===`;
  let currentText = textarea.value;

  const startIdx = currentText.indexOf(startMarker);
  const endIdx = currentText.indexOf(endMarker);

  const formattedBlock = `${startMarker}\n${newContent.trim()}\n${endMarker}`;

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    // Reemplaza solo ese bloque específico
    const before = currentText.substring(0, startIdx).trim();
    const after = currentText.substring(endIdx + endMarker.length).trim();
    textarea.value = [before, formattedBlock, after].filter(Boolean).join('\n\n');
  } else {
    // Añade el bloque preservando cualquier nota manual previa
    if (currentText.trim()) {
      textarea.value = `${currentText.trim()}\n\n${formattedBlock}`;
    } else {
      textarea.value = formattedBlock;
    }
  }
}

// CONFIGURACIÓN DE LISTENERS GENERALES
function setupEventListeners() {
  const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  
  abilities.forEach(attr => {
    const input = document.getElementById(`score-${attr}`);
    if (input) {
      input.addEventListener('input', () => recalculateAll());
    }

    const saveCheck = document.getElementById(`save-prof-${attr}`);
    if (saveCheck) {
      saveCheck.addEventListener('change', () => recalculateAll());
    }

    // Tirada rápida con el dado d20 al hacer clic en la burbuja del modificador
    const modBubble = input?.parentElement?.querySelector('.attr-modifier-bubble');
    if (modBubble) {
      modBubble.addEventListener('click', () => {
        const mod = calcModifier(input.value);
        openDiceModalWithMod(mod, `Tirada de ${attr.toUpperCase()}`);
      });
    }
  });

  // Bono de competencia
  document.getElementById('char-proficiency-bonus')?.addEventListener('input', () => recalculateAll());

  // Atributo clave de conjuros (INT, SAB o CAR)
  document.getElementById('spell-ability')?.addEventListener('change', () => recalculateAll());

  // Monedas (relación en vivo)
  ['cp', 'sp', 'ep', 'gp', 'pp'].forEach(coin => {
    document.getElementById(`coin-${coin}`)?.addEventListener('input', calculateCoinsTotal);
  });

  // Botones para añadir elementos dinámicos
  document.getElementById('btn-add-proficiency')?.addEventListener('click', () => {
    addProficiencyItem('Idioma', '');
  });

  document.getElementById('btn-add-attack')?.addEventListener('click', () => {
    addAttackItem('', '+0', '');
  });

  document.getElementById('btn-add-inventory-item')?.addEventListener('click', () => {
    addInventoryItem(1, '', 0.0);
  });

  document.getElementById('btn-add-spell')?.addEventListener('click', promptAndAddSpell);

  // Botones de acción principales
  document.getElementById('btn-reset')?.addEventListener('click', confirmResetToClean);
  document.getElementById('btn-save')?.addEventListener('click', saveToLocalStorage);
  document.getElementById('btn-export-json')?.addEventListener('click', exportToJson);
  document.getElementById('input-import-json')?.addEventListener('change', importFromJson);
  document.getElementById('btn-print')?.addEventListener('click', () => window.print());

  // Mesa de dados
  setupDiceModal();
}

// ============================================================================
// SISTEMA REACTIVO D&D 5.5e (CLASES, MULTICLASE, ESPECIES, TRASFONDOS)
// ============================================================================
function setupDnd55eSystem() {
  const class1 = document.getElementById('char-class-1');
  const level1 = document.getElementById('char-level-1');
  const class2 = document.getElementById('char-class-2');
  const level2 = document.getElementById('char-level-2');
  const btnToggleMulti = document.getElementById('btn-toggle-multiclass');
  const btnRemoveMulti = document.getElementById('btn-remove-multiclass');
  const subrowMulti = document.getElementById('multiclass-subrow');

  const raceSelect = document.getElementById('char-race');
  const bgSelect = document.getElementById('char-background');

  // Alternar interfaz de multiclase
  btnToggleMulti?.addEventListener('click', () => {
    subrowMulti.style.display = 'flex';
    btnToggleMulti.style.display = 'none';
    updateCharacterProgression();
  });

  btnRemoveMulti?.addEventListener('click', () => {
    subrowMulti.style.display = 'none';
    if (btnToggleMulti) btnToggleMulti.style.display = 'inline-block';
    if (class2) class2.value = '';
    if (level2) level2.value = '1';
    updateCharacterProgression();
  });

  class1?.addEventListener('change', () => updateCharacterProgression());
  level1?.addEventListener('change', () => updateCharacterProgression());
  class2?.addEventListener('change', () => updateCharacterProgression());
  level2?.addEventListener('change', () => updateCharacterProgression());

  raceSelect?.addEventListener('change', (e) => applySpecies(e.target.value));
  bgSelect?.addEventListener('change', (e) => applyBackground(e.target.value));
}

// ACTUALIZACIÓN DE NIVEL TOTAL, DADOS DE GOLPE, SALVACIONES Y MULTICLASE
function updateCharacterProgression() {
  const class1Select = document.getElementById('char-class-1');
  const level1Select = document.getElementById('char-level-1');
  const class2Select = document.getElementById('char-class-2');
  const level2Select = document.getElementById('char-level-2');
  const subrowMulti = document.getElementById('multiclass-subrow');
  const totalBadge = document.getElementById('char-total-level-badge');

  const c1Id = class1Select?.value;
  const lvl1 = parseInt(level1Select?.value || '1', 10);

  const hasMulti = subrowMulti && subrowMulti.style.display !== 'none' && class2Select?.value;
  const c2Id = hasMulti ? class2Select.value : null;
  const lvl2 = hasMulti ? parseInt(level2Select?.value || '1', 10) : 0;

  const totalLevel = Math.max(1, Math.min(20, lvl1 + lvl2));

  // 1. Actualizar insignia de nivel total
  if (totalBadge) {
    if (hasMulti && c1Id && c2Id) {
      const c1Name = DND_55E_CLASSES[c1Id]?.name || c1Id;
      const c2Name = DND_55E_CLASSES[c2Id]?.name || c2Id;
      totalBadge.textContent = `NIVEL ${totalLevel} (${c1Name} ${lvl1} / ${c2Name} ${lvl2})`;
    } else {
      totalBadge.textContent = `NIVEL ${totalLevel}`;
    }
  }

  // 2. Escala de Bonificador de Competencia (+2 a +6)
  const profBonus = calcProficiencyBonus(totalLevel);
  const profInput = document.getElementById('char-proficiency-bonus');
  if (profInput) {
    profInput.value = profBonus;
  }

  // 3. Aplicar Salvaciones de Clase (Únicamente de la Clase 1 según regla oficial)
  clearProficienciesByOrigin('class');
  const c1Data = DND_55E_CLASSES[c1Id];
  if (c1Data && c1Data.saves) {
    c1Data.saves.forEach(attr => {
      setProficiencyOrigin('save', attr, 'class', 'Clase');
    });
  }

  // 4. Dados de Golpe Combinados
  const hdTotalInput = document.getElementById('hd-total');
  const hdCurrentInput = document.getElementById('hd-current');
  const c2Data = c2Id ? DND_55E_CLASSES[c2Id] : null;

  if (hdTotalInput && c1Data) {
    if (hasMulti && c2Data) {
      hdTotalInput.value = `${lvl1}d${c1Data.hitDie} + ${lvl2}d${c2Data.hitDie}`;
    } else {
      hdTotalInput.value = `${lvl1}d${c1Data.hitDie}`;
    }
  }
  if (hdCurrentInput) {
    hdCurrentInput.value = totalLevel;
  }

  // 5. Rasgos de Clase en "Rasgos y Atributos" (Acumulativos Nivel 1 -> Nivel Actual)
  if (c1Data) {
    const sub1Id = document.getElementById('char-subclass-1')?.value || '';
    let classTraitsText = typeof window.buildCumulativeClassFeaturesText === 'function'
      ? window.buildCumulativeClassFeaturesText(c1Id, lvl1, sub1Id, false)
      : (`[🔵 CLASE 1: ${c1Data.name.toUpperCase()} (Nivel ${lvl1})]\n` +
        `Dado de golpe: d${c1Data.hitDie} | Salvaciones: ${c1Data.saves.map(s => s.toUpperCase()).join(', ')}\n` +
        `Armaduras: ${c1Data.armor.join(', ')} | Armas: ${c1Data.weapons.join(', ')}\n` +
        c1Data.features.join('\n'));

    if (hasMulti && c2Data) {
      const c2Text = typeof window.buildCumulativeClassFeaturesText === 'function'
        ? window.buildCumulativeClassFeaturesText(c2Id, lvl2, '', true)
        : (`[🔵 CLASE 2 (MULTICLASE): ${c2Data.name.toUpperCase()} (Nivel ${lvl2})]\n` +
          `Dado de golpe: d${c2Data.hitDie}\n` +
          c2Data.features.join('\n'));
      classTraitsText += `\n\n${c2Text}`;
    }

    updateFeaturesBlock('clase', classTraitsText);
  }

  // 6. Espacios de Conjuros Multiclase y Sincronización Pág. 3
  updateSpellSlotsMulticlass(c1Data, lvl1, c2Data, lvl2, totalLevel);

  // 7. Puntos de Golpe sugeridos (si están en 0 o default)
  suggestHitPoints(c1Data, lvl1, c2Data, lvl2, totalLevel);

  if (typeof window.updateAdventurerProgressUI === 'function') {
    window.updateAdventurerProgressUI();
  }

  recalculateAll();
}

// CÁLCULO DE ESPACIOS DE CONJUROS Y SINCRONIZACIÓN DE PÁGINA 3
function updateSpellSlotsMulticlass(c1Data, lvl1, c2Data, lvl2, totalLevel) {
  const spellClassInput = document.getElementById('spell-class');
  const spellAbilitySelect = document.getElementById('spell-ability');

  const c1Type = c1Data?.casterType || 'none';
  const c2Type = c2Data?.casterType || 'none';

  // Sincronizar nombre de clase lanzadora en Pág. 3
  if (spellClassInput) {
    if (c1Type !== 'none' && c2Type !== 'none' && c2Data) {
      spellClassInput.value = `${c1Data.name} / ${c2Data.name}`;
    } else if (c1Type !== 'none' && c1Data) {
      spellClassInput.value = c1Data.name;
    } else if (c2Type !== 'none' && c2Data) {
      spellClassInput.value = c2Data.name;
    }
  }

  // Sincronizar característica mágica principal
  if (spellAbilitySelect) {
    if (c1Data?.spellAttr) {
      spellAbilitySelect.value = c1Data.spellAttr;
    } else if (c2Data?.spellAttr) {
      spellAbilitySelect.value = c2Data.spellAttr;
    }
  }

  // Caso: Brujo puro (Magia del Pacto)
  if (c1Type === 'warlock' && c2Type === 'none') {
    const pactData = DND_55E_WARLOCK_SLOTS[lvl1] || { slots: 1, level: 1 };
    for (let i = 1; i <= 9; i++) {
      const totInput = document.getElementById(`slot-${i}-total`);
      if (totInput) totInput.value = (i === pactData.level) ? pactData.slots : 0;
    }
    return;
  }

  // Cálculo de Caster Level combinado oficial 2024
  let casterLevel = 0;
  if (c1Type === 'full') casterLevel += lvl1;
  if (c1Type === 'half') casterLevel += Math.ceil(lvl1 / 2);

  if (c2Type === 'full') casterLevel += lvl2;
  if (c2Type === 'half') casterLevel += Math.ceil(lvl2 / 2);

  if (casterLevel > 0) {
    const effLevel = Math.min(20, Math.max(1, casterLevel));
    const slots = DND_55E_MULTICLASS_SPELL_SLOTS[effLevel] || [0,0,0,0,0,0,0,0,0];
    for (let i = 1; i <= 9; i++) {
      const totInput = document.getElementById(`slot-${i}-total`);
      if (totInput) totInput.value = slots[i - 1] || 0;
    }
  }
}

// CÁLCULO DE PUNTOS DE GOLPE SUGERIDOS (DADO MÁXIMO + MOD CON + ENANO/DURO)
function suggestHitPoints(c1Data, lvl1, c2Data, lvl2, totalLevel) {
  const hpMaxInput = document.getElementById('hp-max');
  const hpCurrentInput = document.getElementById('hp-current');
  if (!hpMaxInput || !c1Data) return;

  const currentVal = parseInt(hpMaxInput.value, 10);
  // Si el usuario ya personalizó un valor mayor que cero y no fue limpiado, no sobreescribir
  if (currentVal > 0 && hpMaxInput.dataset.custom) return;

  const conMod = calcModifier(document.getElementById('score-con')?.value || 10);
  
  // Nivel 1: Dado máximo de Clase 1 + Mod CON
  let hpTotal = c1Data.hitDie + conMod;

  // Niveles adicionales de Clase 1 (media + 1 + Mod CON)
  if (lvl1 > 1) {
    const avg1 = Math.floor(c1Data.hitDie / 2) + 1;
    hpTotal += (lvl1 - 1) * Math.max(1, avg1 + conMod);
  }

  // Niveles de Clase 2 si hay multiclase
  if (c2Data && lvl2 > 0) {
    const avg2 = Math.floor(c2Data.hitDie / 2) + 1;
    hpTotal += lvl2 * Math.max(1, avg2 + conMod);
  }

  // Bonificación por Especie (Enano: +1 PG por nivel)
  const raceVal = document.getElementById('char-race')?.value;
  if (raceVal === 'dwarf') {
    hpTotal += totalLevel;
  }

  // Bonificación por Trasfondo (Granjero / Dote Duro: +2 PG por nivel)
  const bgVal = document.getElementById('char-background')?.value;
  if (bgVal === 'farmer') {
    hpTotal += (2 * totalLevel);
  }

  hpMaxInput.value = Math.max(1, hpTotal);
  if (hpCurrentInput && parseInt(hpCurrentInput.value || 0, 10) <= 0) {
    hpCurrentInput.value = hpMaxInput.value;
  }
}

// APLICACIÓN DE ESPECIE / RAZA (🟡 Dorado)
function applySpecies(speciesId) {
  const data = DND_55E_SPECIES[speciesId];
  if (!data) return;

  // 1. Velocidad (🟡 Dorado si es especial)
  const speedInput = document.getElementById('stat-speed');
  if (speedInput) {
    speedInput.value = data.speed;
  }

  // 2. Limpiar previas de raza
  clearProficienciesByOrigin('species');

  // Si otorga habilidad fija (ej. Elfo -> Percepción)
  if (data.skillGrant) {
    setProficiencyOrigin('skill', data.skillGrant, 'species', 'Raza');
  }

  // Otorga truco o conjuro innato por Raza (🟡 Dorado)
  if (speciesId === 'tiefling') {
    addSpellRow(0, 'Taumaturgia (Thaumaturgy)', true, 'species');
  } else if (speciesId === 'elf') {
    // Los altos elfos aprenden un truco de mago
    addSpellRow(0, 'Luz (Light)', true, 'species');
  } else if (speciesId === 'gnome') {
    addSpellRow(0, 'Ilusión Menor (Minor Illusion)', true, 'species');
  }

  // 3. Rasgos de Especie en "Rasgos y Atributos" (Identificados en Dorado)
  const speciesText = `[🟡 ESPECIE / RAZA: ${data.name.toUpperCase()} (5.5e)]\n` +
    `Velocidad: ${data.speed} pies | Tamaño: ${data.size}\n` +
    data.traits.join('\n');
  updateFeaturesBlock('especie', speciesText);

  // 4. Actualizar PG en caso de Enano
  const c1Id = document.getElementById('char-class-1')?.value;
  if (c1Id && DND_55E_CLASSES[c1Id]) {
    updateCharacterProgression();
  } else {
    recalculateAll();
  }
}

// APLICACIÓN DE TRASFONDOS (🔴 Rojo)
function applyBackground(bgId) {
  const data = DND_55E_BACKGROUNDS[bgId];
  if (!data) return;

  // 1. Limpiar habilidades previas de trasfondo
  clearProficienciesByOrigin('background');

  // 2. Activar las 2 habilidades obligatorias del trasfondo (🔴 Rojo)
  if (data.skills && Array.isArray(data.skills)) {
    data.skills.forEach(skillId => {
      setProficiencyOrigin('skill', skillId, 'background', 'Trasfondo');
    });
  }

  // 3. Inyectar herramienta en "Otras Competencias" si no existe
  if (data.tool) {
    injectBackgroundTool(data.tool);
  }

  // Otorga dote Iniciado en la Magia (🔴 Rojo) en trasfondos como Acólito o Erudito
  if (bgId === 'acolyte') {
    addSpellRow(0, 'Llama Sagrada (Sacred Flame)', true, 'background');
    addSpellRow(0, 'Piedad con los Moribundos (Spare the Dying)', true, 'background');
    addSpellRow(1, 'Curar Heridas (Cure Wounds)', true, 'background');
  } else if (bgId === 'sage') {
    addSpellRow(0, 'Descarga de Fuego (Fire Bolt)', true, 'background');
    addSpellRow(0, 'Mano de Mago (Mage Hand)', true, 'background');
    addSpellRow(1, 'Escudo (Shield)', true, 'background');
  } else if (bgId === 'guide') {
    addSpellRow(0, 'Guía (Guidance)', true, 'background');
  }

  // 4. Inyectar Dote de Origen en "Rasgos y Atributos" (Identificado en Rojo)
  const bgText = `[🔴 TRASFONDO: ${data.name.toUpperCase()} (5.5e)]\n` +
    `Dote de Origen: ${data.originFeat}\n` +
    `${data.featDesc}\n` +
    `Herramienta: ${data.tool}\n` +
    `Opciones de Atributo (+2/+1 o +1/+1/+1): ${data.abilityOptions.map(a => a.toUpperCase()).join(', ')}`;
  updateFeaturesBlock('trasfondo', bgText);

  // 5. Actualizar PG en caso de Granjero (Dote Duro)
  const c1Id = document.getElementById('char-class-1')?.value;
  if (c1Id && DND_55E_CLASSES[c1Id]) {
    updateCharacterProgression();
  } else {
    recalculateAll();
  }
}

// INYECCIÓN DE HERRAMIENTA DEL TRASFOND0 EN OTRAS COMPETENCIAS
function injectBackgroundTool(toolName) {
  const container = document.getElementById('proficiencies-container');
  if (!container) return;

  const existing = Array.from(container.querySelectorAll('.input-prof-name'))
    .some(inp => inp.value.trim().toLowerCase() === toolName.trim().toLowerCase());

  if (!existing) {
    addProficiencyItem('Herramienta', toolName);
  }
}

// ============================================================================
// RED DE RELACIONES Y CÁLCULOS MATEMÁTICOS EN VIVO
// ============================================================================
function recalculateAll() {
  const profBonus = parseInt(document.getElementById('char-proficiency-bonus')?.value || '2', 10);
  const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const mods = {};

  // 1. Relación: Puntuación de Atributo -> Modificador
  abilities.forEach(attr => {
    const scoreVal = document.getElementById(`score-${attr}`)?.value;
    const mod = (scoreVal === '' || isNaN(parseInt(scoreVal, 10))) ? 0 : calcModifier(scoreVal);
    mods[attr] = mod;

    const modBubble = document.querySelector(`.attr-box[data-attr="${attr}"] .attr-modifier-bubble span`);
    if (modBubble) modBubble.textContent = formatMod(mod);

    // 2. Relación: Modificador + Casilla -> Tirada de Salvación
    const isProf = document.getElementById(`save-prof-${attr}`)?.checked || false;
    const saveTotal = mod + (isProf ? profBonus : 0);
    const saveElem = document.getElementById(`save-val-${attr}`);
    if (saveElem) {
      saveElem.textContent = formatMod(saveTotal);
      saveElem.onclick = () => {
        openDiceModalWithMod(saveTotal, `Salvación de ${attr.toUpperCase()}`);
      };
    }
  });

  // 3. Relación: Modificador de Atributo Vinculado + Bono de Competencia -> 18 Habilidades
  let perceptionBonus = 0;
  DND_OFFICIAL_SKILLS.forEach(skill => {
    const attrMod = mods[skill.attr] || 0;
    const isProf = document.getElementById(`skill-prof-${skill.id}`)?.checked || false;
    const skillTotal = attrMod + (isProf ? profBonus : 0);

    const valElem = document.getElementById(`skill-val-${skill.id}`);
    if (valElem) {
      valElem.textContent = formatMod(skillTotal);
      valElem.onclick = () => {
        openDiceModalWithMod(skillTotal, `Habilidad: ${skill.name}`);
      };
    }

    if (skill.id === 'perception') {
      perceptionBonus = skillTotal;
    }
  });

  // Asignar listeners en caliente para checkboxes de habilidades
  document.querySelectorAll('.skill-prof-cb').forEach(cb => {
    cb.onchange = () => recalculateAll();
  });

  // 4. Relación: Sabiduría Pasiva (Percepción) = 10 + Bono total de Percepción
  const passiveElem = document.getElementById('passive-perception-val');
  if (passiveElem) {
    passiveElem.textContent = 10 + perceptionBonus;
  }

  // 5. Relación: Iniciativa = Modificador de Destreza (a menos que el usuario defina custom)
  const initInput = document.getElementById('stat-initiative');
  if (initInput && !initInput.dataset.custom) {
    initInput.value = mods.dex;
  }

  // 6. Relación: CA base sin armadura = 10 + Modificador de Destreza
  const acInput = document.getElementById('stat-ac');
  if (acInput && !acInput.dataset.custom) {
    acInput.value = 10 + mods.dex;
  }

  // 7. Relación: Lanzamiento de Conjuros
  // CD Salvación = 8 + Bono Competencia + Modificador Atributo Clave
  // Bono Ataque = Bono Competencia + Modificador Atributo Clave
  const spellAttr = document.getElementById('spell-ability')?.value || 'int';
  const spellMod = mods[spellAttr] || 0;
  const spellDC = 8 + profBonus + spellMod;
  const spellAtk = profBonus + spellMod;

  const dcElem = document.getElementById('spell-save-dc');
  const atkElem = document.getElementById('spell-attack-bonus');
  if (dcElem) dcElem.textContent = spellDC;
  if (atkElem) atkElem.textContent = formatMod(spellAtk);

  // 8. Relaciones secundarias: Peso de inventario y Monedas
  calculateInventoryWeight();
}

// CÁLCULO EN VIVO DEL PESO TOTAL DE EQUIPO
function calculateInventoryWeight() {
  let totalWeight = 0;
  document.querySelectorAll('.inventory-item-row').forEach(row => {
    const qty = parseFloat(row.querySelector('.inv-qty-input')?.value || 0);
    const weight = parseFloat(row.querySelector('.inv-weight-input')?.value || 0);
    totalWeight += (qty * weight);
  });

  const weightElem = document.getElementById('inventory-total-weight');
  if (weightElem) {
    weightElem.textContent = `${totalWeight.toFixed(1)} lb`;
  }
}

// CÁLCULO DE MONEDAS A PIEZAS DE ORO (PO)
function calculateCoinsTotal() {
  const cp = parseFloat(document.getElementById('coin-cp')?.value || 0);
  const sp = parseFloat(document.getElementById('coin-sp')?.value || 0);
  const ep = parseFloat(document.getElementById('coin-ep')?.value || 0);
  const gp = parseFloat(document.getElementById('coin-gp')?.value || 0);
  const pp = parseFloat(document.getElementById('coin-pp')?.value || 0);
  return (cp * 0.01) + (sp * 0.1) + (ep * 0.5) + gp + (pp * 10);
}

// ============================================================================
// FUNCIONES PARA AÑADIR ÍTEMS DINÁMICOS
// ============================================================================

// 1. Competencias e Idiomas
function addProficiencyItem(category = 'Idioma', name = '') {
  const container = document.getElementById('proficiencies-container');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'item-row';
  row.innerHTML = `
    <select class="input-prof-cat">
      <option value="Idioma" ${category === 'Idioma' ? 'selected' : ''}>Idioma</option>
      <option value="Arma" ${category === 'Arma' ? 'selected' : ''}>Arma</option>
      <option value="Armadura" ${category === 'Armadura' ? 'selected' : ''}>Armadura</option>
      <option value="Herramienta" ${category === 'Herramienta' ? 'selected' : ''}>Herramienta</option>
      <option value="Otro" ${category === 'Otro' ? 'selected' : ''}>Otro</option>
    </select>
    <input type="text" class="input-prof-name" placeholder="Detalle o nombre..." value="${name}">
    <button type="button" class="btn-danger-outline btn-remove-item" title="Eliminar">${SVG_TRASH}</button>
  `;

  row.querySelector('.btn-remove-item').addEventListener('click', () => row.remove());
  container.appendChild(row);
}

// 2. Ataques y Armas (con tiradas rápidas de ataque y daño)
function addAttackItem(name = '', bonus = '+0', damage = '') {
  const container = document.getElementById('attacks-container');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'attack-row';
  row.innerHTML = `
    <input type="text" class="input-atk-name" placeholder="Arma / Hechizo" value="${name}">
    <input type="text" class="input-atk-bonus" placeholder="+0" value="${bonus}">
    <input type="text" class="input-atk-damage" placeholder="Daño y tipo" value="${damage}">
    <div class="attack-row-actions">
      <button type="button" class="btn-atk-roll" title="Tirar Ataque (1d20 + Bono)">Atk</button>
      <button type="button" class="btn-dmg-roll" title="Tirar Daño">Dmg</button>
    </div>
    <button type="button" class="btn-danger-outline btn-remove-item" title="Eliminar">${SVG_TRASH}</button>
  `;

  // Tirada de Ataque (1d20 + bono numérico del input)
  row.querySelector('.btn-atk-roll').addEventListener('click', () => {
    const atkName = row.querySelector('.input-atk-name')?.value || 'Ataque';
    const bonusVal = parseInt(row.querySelector('.input-atk-bonus')?.value || '0', 10) || 0;
    openDiceModalWithMod(bonusVal, `Ataque: ${atkName}`);
  });

  // Tirada de Daño (interpreta fórmulas como 1d8+3, 2d6, etc.)
  row.querySelector('.btn-dmg-roll').addEventListener('click', () => {
    const atkName = row.querySelector('.input-atk-name')?.value || 'Arma';
    const dmgStr = row.querySelector('.input-atk-damage')?.value || '1d6';
    rollWeaponDamage(dmgStr, `Daño: ${atkName}`);
  });

  row.querySelector('.btn-remove-item').addEventListener('click', () => row.remove());
  container.appendChild(row);
}

// 3. Inventario y Equipo
function addInventoryItem(qty = 1, name = '', weight = 0.0) {
  const container = document.getElementById('inventory-container');
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'inventory-item-row';
  row.innerHTML = `
    <input type="number" class="inv-qty-input" min="0" value="${qty}">
    <input type="text" class="inv-name-input" placeholder="Nombre del objeto" value="${name}">
    <input type="number" class="inv-weight-input" min="0" step="0.1" value="${weight}">
    <button type="button" class="btn-danger-outline btn-remove-item" title="Eliminar">${SVG_TRASH}</button>
  `;

  row.querySelector('.inv-qty-input').addEventListener('input', calculateInventoryWeight);
  row.querySelector('.inv-weight-input').addEventListener('input', calculateInventoryWeight);

  row.querySelector('.btn-remove-item').addEventListener('click', () => {
    row.remove();
    calculateInventoryWeight();
  });

  container.appendChild(row);
  calculateInventoryWeight();
}

// 4. Conjuros por nivel con soporte para distintivo de origen (🟡 Raza, 🔵 Clase, 🔴 Trasfondo)
function addSpellRow(level = 0, name = '', prepared = false, origin = null) {
  const container = document.getElementById(`spells-list-${level}`);
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'spell-row-item';
  if (origin) {
    row.dataset.origin = origin;
  }

  let originBadgeHtml = '';
  if (origin === 'species') {
    originBadgeHtml = '<span class="origin-tag origin-species visible" style="margin-right:4px;">Raza</span>';
  } else if (origin === 'class') {
    originBadgeHtml = '<span class="origin-tag origin-class visible" style="margin-right:4px;">Clase</span>';
  } else if (origin === 'background') {
    originBadgeHtml = '<span class="origin-tag origin-background visible" style="margin-right:4px;">Trasfondo</span>';
  }

  row.innerHTML = `
    <input type="checkbox" class="spell-prep-cb" ${prepared ? 'checked' : ''} title="Preparado">
    ${originBadgeHtml}
    <input type="text" class="spell-name-input" placeholder="Nombre del conjuro..." value="${name}">
    <button type="button" class="btn-cast-spell-p3 no-print" title="Lanzar este conjuro (descuenta espacio y tira dados)">Lanzar</button>
    <button type="button" class="btn-danger-outline btn-remove-item" title="Eliminar">${SVG_TRASH}</button>
  `;

  row.querySelector('.btn-cast-spell-p3')?.addEventListener('click', () => {
    const spName = row.querySelector('.spell-name-input')?.value || 'Conjuro';
    const found = (typeof DND_55E_SPELLS_COMPENDIUM !== 'undefined' ? DND_55E_SPELLS_COMPENDIUM : []).find(s => s.name.toLowerCase() === spName.toLowerCase());
    if (typeof window.castSpellInteractive === 'function') {
      window.castSpellInteractive(spName, level, found?.desc || '');
    }
  });
  row.querySelector('.btn-remove-item').addEventListener('click', () => row.remove());
  container.appendChild(row);
}

function promptAndAddSpell() {
  const lvlStr = prompt('¿En qué nivel deseas añadir el conjuro? (0 para Trucos, o del 1 al 9):', '1');
  if (lvlStr === null) return;
  const lvl = parseInt(lvlStr, 10);
  if (isNaN(lvl) || lvl < 0 || lvl > 9) {
    alert('Nivel no válido. Debe ser entre 0 y 9.');
    return;
  }
  const name = prompt('Nombre del conjuro:', '');
  if (name !== null) {
    addSpellRow(lvl, name, false);
  }
}

// ============================================================================
// LIMPIEZA DE FICHA A CEROS / RESET
// ============================================================================
function confirmResetToClean() {
  if (confirm('¿Deseas vaciar todos los campos de la ficha y dejarla limpia en ceros?')) {
    localStorage.removeItem('dnd_5e_official_sheet_data');
    resetSheetToClean();
    showToast('Ficha limpiada a ceros exitosamente');
  }
}

function resetSheetToClean() {
  // Pág 1: Cabecera
  document.getElementById('char-name').value = '';
  document.getElementById('p2-char-name').value = '';

  const class1 = document.getElementById('char-class-1');
  const level1 = document.getElementById('char-level-1');
  const class2 = document.getElementById('char-class-2');
  const level2 = document.getElementById('char-level-2');
  const subrowMulti = document.getElementById('multiclass-subrow');
  const btnToggleMulti = document.getElementById('btn-toggle-multiclass');

  if (class1) class1.selectedIndex = 0;
  if (level1) level1.value = '1';
  if (class2) class2.selectedIndex = 0;
  if (level2) level2.value = '1';
  if (subrowMulti) subrowMulti.style.display = 'none';
  if (btnToggleMulti) btnToggleMulti.style.display = 'inline-block';

  document.getElementById('char-background').selectedIndex = 0;
  document.getElementById('char-race').selectedIndex = 0;
  document.getElementById('char-player').value = '';
  document.getElementById('char-alignment').selectedIndex = 0;
  document.getElementById('char-xp').value = 0;

  // Atributos neutrales base (10 = mod 0)
  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
    document.getElementById(`score-${attr}`).value = 10;
  });

  // Inspiración y bono
  document.getElementById('char-inspiration').checked = false;
  document.getElementById('char-proficiency-bonus').value = 2;

  // Limpiar orígenes y marcas de salvaciones y habilidades
  ['species', 'class', 'background'].forEach(origin => {
    clearProficienciesByOrigin(origin);
  });

  ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
    document.getElementById(`save-prof-${attr}`).checked = false;
  });

  DND_OFFICIAL_SKILLS.forEach(s => {
    const cb = document.getElementById(`skill-prof-${s.id}`);
    if (cb) cb.checked = false;
  });

  // Combate
  document.getElementById('stat-ac').value = 10;
  delete document.getElementById('stat-ac').dataset.custom;
  document.getElementById('stat-initiative').value = 0;
  delete document.getElementById('stat-initiative').dataset.custom;
  document.getElementById('stat-speed').value = 30;
  document.getElementById('hp-max').value = 0;
  delete document.getElementById('hp-max').dataset.custom;
  document.getElementById('hp-current').value = 0;
  document.getElementById('hp-temp').value = 0;
  document.getElementById('hd-total').value = '';
  document.getElementById('hd-current').value = 0;
  document.getElementById('combat-notes').value = '';

  // Salvaciones de muerte desmarcadas
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`death-success-${i}`).checked = false;
    document.getElementById(`death-fail-${i}`).checked = false;
  }

  // Monedas en ceros
  ['cp', 'sp', 'ep', 'gp', 'pp'].forEach(c => {
    document.getElementById(`coin-${c}`).value = 0;
  });

  // Párrafos Pág 1
  document.getElementById('text-traits').value = '';
  document.getElementById('text-ideals').value = '';
  document.getElementById('text-bonds').value = '';
  document.getElementById('text-flaws').value = '';
  document.getElementById('text-features').value = '';
  document.getElementById('text-proficiencies-notes').value = '';
  document.getElementById('text-equipment-free').value = '';

  // Pág 2
  document.getElementById('app-age').value = 0;
  document.getElementById('app-height').value = '';
  document.getElementById('app-weight').value = '';
  document.getElementById('app-eyes').value = '';
  document.getElementById('app-skin').value = '';
  document.getElementById('app-hair').value = '';
  document.getElementById('text-appearance').value = '';
  document.getElementById('text-backstory').value = '';
  document.getElementById('text-allies').value = '';
  document.getElementById('faction-name').value = '';
  document.getElementById('text-extra-traits').value = '';
  document.getElementById('text-treasure').value = '';
  clearPortraitImage();
  restoreActiveConditions([]);

  // Pág 3 (Conjuros)
  document.getElementById('spell-class').value = '';
  document.getElementById('spell-ability').value = 'int';
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`slot-${i}-total`).value = 0;
    document.getElementById(`slot-${i}-used`).value = 0;
  }

  // Vaciar contenedores dinámicos
  document.getElementById('proficiencies-container').innerHTML = '';
  document.getElementById('attacks-container').innerHTML = '';
  document.getElementById('inventory-container').innerHTML = '';
  for (let lvl = 0; lvl <= 9; lvl++) {
    const list = document.getElementById(`spells-list-${lvl}`);
    if (list) list.innerHTML = '';
  }

  const badge = document.getElementById('char-total-level-badge');
  if (badge) badge.textContent = 'NIVEL 1';

  recalculateAll();
}

// CARGA DE DATOS GUARDADOS (O LIMPIO SI NO EXISTEN)
function loadSavedDataOrClean() {
  const saved = localStorage.getItem('dnd_5e_official_sheet_data');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      restoreFormData(data);
      return;
    } catch (e) {
      console.warn('Error al cargar datos previos:', e);
    }
  }
  resetSheetToClean();
}

// ============================================================================
// RECOLECCIÓN Y RESTAURACIÓN DE DATOS (CON SOPORTE MULTICLASE Y 5.5e)
// ============================================================================
function collectFormData() {
  const subrowMulti = document.getElementById('multiclass-subrow');
  const hasMulti = subrowMulti && subrowMulti.style.display !== 'none';

  const data = {
    name: document.getElementById('char-name')?.value,
    class1: document.getElementById('char-class-1')?.value || '',
    subclass1: document.getElementById('char-subclass-1')?.value || '',
    level1: document.getElementById('char-level-1')?.value || '1',
    hasMulticlass: hasMulti,
    class2: hasMulti ? (document.getElementById('char-class-2')?.value || '') : '',
    level2: hasMulti ? (document.getElementById('char-level-2')?.value || '1') : '1',

    background: document.getElementById('char-background')?.value || '',
    race: document.getElementById('char-race')?.value || '',
    player: document.getElementById('char-player')?.value || '',
    alignment: document.getElementById('char-alignment')?.value || '',
    progressionMode: document.getElementById('char-progression-mode')?.value || 'xp',
    xp: document.getElementById('char-xp')?.value || 0,
    quests: document.getElementById('char-quests')?.value || 0,

    scores: {
      str: document.getElementById('score-str')?.value,
      dex: document.getElementById('score-dex')?.value,
      con: document.getElementById('score-con')?.value,
      int: document.getElementById('score-int')?.value,
      wis: document.getElementById('score-wis')?.value,
      cha: document.getElementById('score-cha')?.value
    },

    inspiration: document.getElementById('char-inspiration')?.checked,
    proficiencyBonus: document.getElementById('char-proficiency-bonus')?.value,

    saves: {
      str: document.getElementById('save-prof-str')?.checked,
      dex: document.getElementById('save-prof-dex')?.checked,
      con: document.getElementById('save-prof-con')?.checked,
      int: document.getElementById('save-prof-int')?.checked,
      wis: document.getElementById('save-prof-wis')?.checked,
      cha: document.getElementById('save-prof-cha')?.checked
    },

    skills: {},

    combat: {
      ac: document.getElementById('stat-ac')?.value,
      initiative: document.getElementById('stat-initiative')?.value,
      speed: document.getElementById('stat-speed')?.value,
      hpMax: document.getElementById('hp-max')?.value,
      hpCurrent: document.getElementById('hp-current')?.value,
      hpTemp: document.getElementById('hp-temp')?.value,
      hdTotal: document.getElementById('hd-total')?.value,
      hdCurrent: document.getElementById('hd-current')?.value,
      deathSaves: {
        successes: [
          document.getElementById('death-success-1')?.checked,
          document.getElementById('death-success-2')?.checked,
          document.getElementById('death-success-3')?.checked
        ],
        failures: [
          document.getElementById('death-fail-1')?.checked,
          document.getElementById('death-fail-2')?.checked,
          document.getElementById('death-fail-3')?.checked
        ]
      },
      combatNotes: document.getElementById('combat-notes')?.value
    },

    coins: {
      cp: document.getElementById('coin-cp')?.value,
      sp: document.getElementById('coin-sp')?.value,
      ep: document.getElementById('coin-ep')?.value,
      gp: document.getElementById('coin-gp')?.value,
      pp: document.getElementById('coin-pp')?.value
    },

    roleP1: {
      traits: document.getElementById('text-traits')?.value,
      ideals: document.getElementById('text-ideals')?.value,
      bonds: document.getElementById('text-bonds')?.value,
      flaws: document.getElementById('text-flaws')?.value,
      features: document.getElementById('text-features')?.value,
      profNotes: document.getElementById('text-proficiencies-notes')?.value,
      equipNotes: document.getElementById('text-equipment-free')?.value
    },

    page2: {
      age: document.getElementById('app-age')?.value,
      height: document.getElementById('app-height')?.value,
      weight: document.getElementById('app-weight')?.value,
      eyes: document.getElementById('app-eyes')?.value,
      skin: document.getElementById('app-skin')?.value,
      hair: document.getElementById('app-hair')?.value,
      portraitBase64: document.getElementById('char-portrait-img')?.getAttribute('src') || '',
      appearance: document.getElementById('text-appearance')?.value,
      backstory: document.getElementById('text-backstory')?.value,
      allies: document.getElementById('text-allies')?.value,
      factionName: document.getElementById('faction-name')?.value,
      extraTraits: document.getElementById('text-extra-traits')?.value,
      treasure: document.getElementById('text-treasure')?.value
    },

    activeConditions: getActiveConditionIds(),

    spellcasting: {
      class: document.getElementById('spell-class')?.value,
      ability: document.getElementById('spell-ability')?.value,
      slots: {},
      spellsByLevel: {}
    },

    proficiencies: [],
    attacks: [],
    inventory: []
  };

  DND_OFFICIAL_SKILLS.forEach(s => {
    data.skills[s.id] = document.getElementById(`skill-prof-${s.id}`)?.checked || false;
  });

  for (let i = 1; i <= 9; i++) {
    data.spellcasting.slots[i] = {
      total: document.getElementById(`slot-${i}-total`)?.value || 0,
      used: document.getElementById(`slot-${i}-used`)?.value || 0
    };
  }

  for (let lvl = 0; lvl <= 9; lvl++) {
    data.spellcasting.spellsByLevel[lvl] = [];
    document.querySelectorAll(`#spells-list-${lvl} .spell-row-item`).forEach(row => {
      data.spellcasting.spellsByLevel[lvl].push({
        prepared: row.querySelector('.spell-prep-cb')?.checked || false,
        name: row.querySelector('.spell-name-input')?.value || '',
        origin: row.dataset.origin || null
      });
    });
  }

  document.querySelectorAll('#proficiencies-container .item-row').forEach(row => {
    data.proficiencies.push({
      category: row.querySelector('.input-prof-cat')?.value || 'Idioma',
      name: row.querySelector('.input-prof-name')?.value || ''
    });
  });

  document.querySelectorAll('#attacks-container .attack-row').forEach(row => {
    data.attacks.push({
      name: row.querySelector('.input-atk-name')?.value || '',
      bonus: row.querySelector('.input-atk-bonus')?.value || '+0',
      damage: row.querySelector('.input-atk-damage')?.value || ''
    });
  });

  document.querySelectorAll('#inventory-container .inventory-item-row').forEach(row => {
    data.inventory.push({
      qty: row.querySelector('.inv-qty-input')?.value || 1,
      name: row.querySelector('.inv-name-input')?.value || '',
      weight: row.querySelector('.inv-weight-input')?.value || 0
    });
  });

  return data;
}

function restoreFormData(data) {
  if (!data) return;

  if (data.name !== undefined) {
    document.getElementById('char-name').value = data.name;
    const p2name = document.getElementById('p2-char-name');
    if (p2name) p2name.value = data.name;
  }

  // Restaurar clases y niveles
  const c1Sel = document.getElementById('char-class-1');
  const l1Sel = document.getElementById('char-level-1');
  const c2Sel = document.getElementById('char-class-2');
  const l2Sel = document.getElementById('char-level-2');
  const subrowMulti = document.getElementById('multiclass-subrow');
  const btnToggleMulti = document.getElementById('btn-toggle-multiclass');

  if (data.class1 && c1Sel) c1Sel.value = data.class1;
  if (typeof window.populateSubclassSelector === 'function') window.populateSubclassSelector();
  if (data.subclass1 !== undefined) {
    const subSel = document.getElementById('char-subclass-1');
    if (subSel) {
      subSel.value = data.subclass1;
      subSel.dataset.savedSubclass = data.subclass1;
    }
  }
  if (data.level1 && l1Sel) l1Sel.value = data.level1;

  if (data.hasMulticlass && subrowMulti) {
    subrowMulti.style.display = 'flex';
    if (btnToggleMulti) btnToggleMulti.style.display = 'none';
    if (data.class2 && c2Sel) c2Sel.value = data.class2;
    if (data.level2 && l2Sel) l2Sel.value = data.level2;
  }

  if (data.background) document.getElementById('char-background').value = data.background;
  if (data.race) document.getElementById('char-race').value = data.race;
  if (data.player !== undefined) document.getElementById('char-player').value = data.player;
  if (data.alignment !== undefined) document.getElementById('char-alignment').value = data.alignment;
  if (data.progressionMode !== undefined) {
    const pmSel = document.getElementById('char-progression-mode');
    if (pmSel) pmSel.value = data.progressionMode;
  }
  if (data.xp !== undefined) document.getElementById('char-xp').value = data.xp;
  if (data.quests !== undefined) {
    const qEl = document.getElementById('char-quests');
    if (qEl) qEl.value = data.quests;
  }
  if (typeof window.updateAdventurerProgressUI === 'function') window.updateAdventurerProgressUI();

  if (data.scores) {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
      if (data.scores[attr] !== undefined) {
        document.getElementById(`score-${attr}`).value = data.scores[attr];
      }
    });
  }

  if (data.inspiration !== undefined) document.getElementById('char-inspiration').checked = data.inspiration;
  if (data.proficiencyBonus !== undefined) document.getElementById('char-proficiency-bonus').value = data.proficiencyBonus;

  if (data.saves) {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
      if (data.saves[attr] !== undefined) {
        document.getElementById(`save-prof-${attr}`).checked = data.saves[attr];
      }
    });
  }

  if (data.skills) {
    DND_OFFICIAL_SKILLS.forEach(s => {
      const cb = document.getElementById(`skill-prof-${s.id}`);
      if (cb && data.skills[s.id] !== undefined) cb.checked = !!data.skills[s.id];
    });
  }

  if (data.combat) {
    if (data.combat.ac !== undefined) document.getElementById('stat-ac').value = data.combat.ac;
    if (data.combat.initiative !== undefined) {
      document.getElementById('stat-initiative').value = data.combat.initiative;
      document.getElementById('stat-initiative').dataset.custom = 'true';
    }
    if (data.combat.speed !== undefined) document.getElementById('stat-speed').value = data.combat.speed;
    if (data.combat.hpMax !== undefined) {
      document.getElementById('hp-max').value = data.combat.hpMax;
      document.getElementById('hp-max').dataset.custom = 'true';
    }
    if (data.combat.hpCurrent !== undefined) document.getElementById('hp-current').value = data.combat.hpCurrent;
    if (data.combat.hpTemp !== undefined) document.getElementById('hp-temp').value = data.combat.hpTemp;
    if (data.combat.hdTotal !== undefined) document.getElementById('hd-total').value = data.combat.hdTotal;
    if (data.combat.hdCurrent !== undefined) document.getElementById('hd-current').value = data.combat.hdCurrent;
    if (data.combat.combatNotes !== undefined) document.getElementById('combat-notes').value = data.combat.combatNotes;

    if (data.combat.deathSaves) {
      (data.combat.deathSaves.successes || []).forEach((val, i) => {
        const el = document.getElementById(`death-success-${i + 1}`);
        if (el) el.checked = !!val;
      });
      (data.combat.deathSaves.failures || []).forEach((val, i) => {
        const el = document.getElementById(`death-fail-${i + 1}`);
        if (el) el.checked = !!val;
      });
    }
  }

  if (data.coins) {
    ['cp', 'sp', 'ep', 'gp', 'pp'].forEach(c => {
      if (data.coins[c] !== undefined) document.getElementById(`coin-${c}`).value = data.coins[c];
    });
  }

  if (data.roleP1) {
    if (data.roleP1.traits !== undefined) document.getElementById('text-traits').value = data.roleP1.traits;
    if (data.roleP1.ideals !== undefined) document.getElementById('text-ideals').value = data.roleP1.ideals;
    if (data.roleP1.bonds !== undefined) document.getElementById('text-bonds').value = data.roleP1.bonds;
    if (data.roleP1.flaws !== undefined) document.getElementById('text-flaws').value = data.roleP1.flaws;
    if (data.roleP1.features !== undefined) document.getElementById('text-features').value = data.roleP1.features;
    if (data.roleP1.profNotes !== undefined) document.getElementById('text-proficiencies-notes').value = data.roleP1.profNotes;
    if (data.roleP1.equipNotes !== undefined) document.getElementById('text-equipment-free').value = data.roleP1.equipNotes;
  }

  if (data.page2) {
    if (data.page2.age !== undefined) document.getElementById('app-age').value = data.page2.age;
    if (data.page2.height !== undefined) document.getElementById('app-height').value = data.page2.height;
    if (data.page2.weight !== undefined) document.getElementById('app-weight').value = data.page2.weight;
    if (data.page2.eyes !== undefined) document.getElementById('app-eyes').value = data.page2.eyes;
    if (data.page2.skin !== undefined) document.getElementById('app-skin').value = data.page2.skin;
    if (data.page2.hair !== undefined) document.getElementById('app-hair').value = data.page2.hair;
    if (data.page2.appearance !== undefined) document.getElementById('text-appearance').value = data.page2.appearance;
    if (data.page2.backstory !== undefined) document.getElementById('text-backstory').value = data.page2.backstory;
    if (data.page2.allies !== undefined) document.getElementById('text-allies').value = data.page2.allies;
    if (data.page2.factionName !== undefined) document.getElementById('faction-name').value = data.page2.factionName;
    if (data.page2.extraTraits !== undefined) document.getElementById('text-extra-traits').value = data.page2.extraTraits;
    if (data.page2.treasure !== undefined) document.getElementById('text-treasure').value = data.page2.treasure;
    if (data.page2.portraitBase64) {
      setPortraitImage(data.page2.portraitBase64);
    } else {
      clearPortraitImage();
    }
  }

  if (data.activeConditions && Array.isArray(data.activeConditions)) {
    restoreActiveConditions(data.activeConditions);
  } else {
    restoreActiveConditions([]);
  }

  if (data.spellcasting) {
    if (data.spellcasting.class !== undefined) document.getElementById('spell-class').value = data.spellcasting.class;
    if (data.spellcasting.ability !== undefined) document.getElementById('spell-ability').value = data.spellcasting.ability;

    if (data.spellcasting.slots) {
      for (let i = 1; i <= 9; i++) {
        if (data.spellcasting.slots[i]) {
          const totEl = document.getElementById(`slot-${i}-total`);
          const usedEl = document.getElementById(`slot-${i}-used`);
          if (totEl) totEl.value = data.spellcasting.slots[i].total;
          if (usedEl) usedEl.value = data.spellcasting.slots[i].used;
        }
      }
    }

    if (data.spellcasting.spellsByLevel) {
      for (let lvl = 0; lvl <= 9; lvl++) {
        const cont = document.getElementById(`spells-list-${lvl}`);
        if (cont) cont.innerHTML = '';
        (data.spellcasting.spellsByLevel[lvl] || []).forEach(sp => {
          addSpellRow(lvl, sp.name, sp.prepared, sp.origin || null);
        });
      }
    }
  }

  const profContainer = document.getElementById('proficiencies-container');
  if (profContainer) profContainer.innerHTML = '';
  (data.proficiencies || []).forEach(p => addProficiencyItem(p.category, p.name));

  const atkContainer = document.getElementById('attacks-container');
  if (atkContainer) atkContainer.innerHTML = '';
  (data.attacks || []).forEach(a => addAttackItem(a.name, a.bonus, a.damage));

  const invContainer = document.getElementById('inventory-container');
  if (invContainer) invContainer.innerHTML = '';
  (data.inventory || []).forEach(item => addInventoryItem(item.qty, item.name, item.weight));

  // Aplicar colores de origen si corresponden a selecciones 5.5e
  if (data.class1 && DND_55E_CLASSES[data.class1]) {
    DND_55E_CLASSES[data.class1].saves.forEach(attr => {
      setProficiencyOrigin('save', attr, 'class', 'Clase');
    });
  }
  if (data.background && DND_55E_BACKGROUNDS[data.background]) {
    (DND_55E_BACKGROUNDS[data.background].skills || []).forEach(sk => {
      setProficiencyOrigin('skill', sk, 'background', 'Trasfondo');
    });
  }
  if (data.race && DND_55E_SPECIES[data.race] && DND_55E_SPECIES[data.race].skillGrant) {
    setProficiencyOrigin('skill', DND_55E_SPECIES[data.race].skillGrant, 'species', 'Raza');
  }

  const badge = document.getElementById('char-total-level-badge');
  if (badge) {
    const l1 = parseInt(data.level1 || 1, 10);
    const l2 = data.hasMulticlass ? parseInt(data.level2 || 1, 10) : 0;
    badge.textContent = `NIVEL ${l1 + l2}`;
  }

  recalculateAll();
}

function saveToLocalStorage() {
  const data = collectFormData();
  localStorage.setItem('dnd_5e_official_sheet_data', JSON.stringify(data));
  if (typeof window.saveCurrentSheetCharacterToRoster === 'function') {
    window.saveCurrentSheetCharacterToRoster({ updateByName: true });
  }
  showToast('Ficha oficial guardada localmente y en Galería de Fichas');
}

function exportToJson() {
  const data = collectFormData();
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  const safeName = (data.name || 'personaje').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  a.href = url;
  a.download = `dnd_5e_${safeName || 'nuevo_personaje'}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Archivo JSON descargado');
}

function importFromJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      restoreFormData(data);
      saveToLocalStorage();
      showToast('Personaje importado exitosamente');
    } catch (err) {
      alert('Error: El archivo no es un JSON válido.');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================================================
// MODAL DE MESA DE DADOS INTERACTIVA (CON VENTAJA, DESVENTAJA, CRÍTICOS Y PIFIAS)
// ============================================================================
function setupDiceModal() {
  const modal = document.getElementById('dice-modal');
  const btnOpen = document.getElementById('btn-roll-modal');
  const btnFloating = document.getElementById('btn-floating-dice');
  const btnClose = document.getElementById('btn-close-dice-modal');

  const openDice = () => {
    modal?.classList.add('active');
    if (typeof window.openChestPopover === 'function') {
      window.openChestPopover();
    }
  };
  const closeDice = () => modal?.classList.remove('active');

  btnOpen?.addEventListener('click', openDice);
  btnFloating?.addEventListener('click', openDice);
  btnClose?.addEventListener('click', closeDice);

  // Atajo rápido de teclado 'D' para abrir/cerrar la mesa de dados
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'd' || e.key === 'D') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      if (modal?.classList.contains('active')) {
        closeDice();
      } else {
        openDice();
      }
    }
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeDice();
  });
}

function openDiceModalWithMod(mod, label = '') {
  const modal = document.getElementById('dice-modal');
  const modInput = document.getElementById('dice-mod-input');
  const countInput = document.getElementById('dice-count-input');
  
  if (modInput) modInput.value = mod;
  if (countInput) countInput.value = 1;
  
  if (modal) modal.classList.add('active');
  rollDice(20, label);
}

function rollDice(sides, customLabel = '') {
  if (typeof window.executeAnimatedDiceRoll === 'function') {
    window.executeAnimatedDiceRoll(sides, customLabel);
    return;
  }
}

// Tirada automática de daño desde fórmula de arma (ej. "1d8 cortante", "2d6 + 3")
function rollWeaponDamage(dmgStr, label = 'Daño') {
  const modal = document.getElementById('dice-modal');
  const match = dmgStr.match(/(\d+)\s*d\s*(\d+)(?:\s*([+-])\s*(\d+))?/i);
  if (!match) {
    // Si es un valor fijo como "1 + FUE" o no parseable
    openDiceModalWithMod(0, label);
    return;
  }

  const count = parseInt(match[1], 10) || 1;
  const sides = parseInt(match[2], 10) || 6;
  const sign = match[3] === '-' ? -1 : 1;
  const rawMod = match[4] ? parseInt(match[4], 10) : 0;
  const mod = sign * rawMod;

  const countInput = document.getElementById('dice-count-input');
  const modInput = document.getElementById('dice-mod-input');
  if (countInput) countInput.value = count;
  if (modInput) modInput.value = mod;

  const normalModeRadio = document.querySelector('input[name="dice-roll-mode"][value="normal"]');
  if (normalModeRadio) normalModeRadio.checked = true;

  if (modal) modal.classList.add('active');
  rollDice(sides, label);
}

// ============================================================================
// CARACTERÍSTICA 2: PANEL DE CONDICIONES Y ESTADOS (D&D 5.5e)
// ============================================================================
function setupConditionsPanel() {
  const panel = document.getElementById('conditions-panel');
  const btnToggle = document.getElementById('btn-conditions-toggle');
  const grid = document.getElementById('conditions-chips-grid');
  const descBox = document.getElementById('condition-active-desc');

  if (!panel || !grid || !descBox) return;

  btnToggle?.addEventListener('click', () => {
    const isHidden = panel.style.display === 'none';
    panel.style.display = isHidden ? 'block' : 'none';
    btnToggle.classList.toggle('active', isHidden);
  });

  grid.innerHTML = '';
  if (typeof DND_55E_CONDITIONS !== 'undefined') {
    DND_55E_CONDITIONS.forEach(cond => {
      const chip = document.createElement('div');
      chip.className = 'condition-chip';
      chip.dataset.condId = cond.id;
      chip.textContent = cond.name;

      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        descBox.innerHTML = `<strong>${cond.name}:</strong> ${cond.desc}`;
        saveToLocalStorage();
      });

      grid.appendChild(chip);
    });
  }
}

function getActiveConditionIds() {
  const activeChips = document.querySelectorAll('#conditions-chips-grid .condition-chip.active');
  return Array.from(activeChips).map(chip => chip.dataset.condId);
}

function restoreActiveConditions(condIds = []) {
  const chips = document.querySelectorAll('#conditions-chips-grid .condition-chip');
  chips.forEach(chip => {
    chip.classList.toggle('active', condIds.includes(chip.dataset.condId));
  });
}

// ============================================================================
// CARACTERÍSTICA 6: RETRATO Y TOKEN DE PERSONAJE
// ============================================================================
function setupPortraitHandling() {
  const fileInput = document.getElementById('input-portrait-file');
  const imgWrapper = document.getElementById('portrait-image-wrapper');
  const img = document.getElementById('char-portrait-img');
  const placeholder = document.getElementById('portrait-placeholder');
  const btnRemove = document.getElementById('btn-remove-portrait');

  if (!fileInput || !imgWrapper || !img) return;

  imgWrapper.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target.result;
      setPortraitImage(base64);
      saveToLocalStorage();
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  btnRemove?.addEventListener('click', (e) => {
    e.stopPropagation();
    clearPortraitImage();
    saveToLocalStorage();
  });
}

function setPortraitImage(base64Src) {
  const img = document.getElementById('char-portrait-img');
  const placeholder = document.getElementById('portrait-placeholder');
  const btnRemove = document.getElementById('btn-remove-portrait');

  if (img && base64Src) {
    img.src = base64Src;
    img.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
    if (btnRemove) btnRemove.style.display = 'inline-block';
  }
}

function clearPortraitImage() {
  const img = document.getElementById('char-portrait-img');
  const placeholder = document.getElementById('portrait-placeholder');
  const btnRemove = document.getElementById('btn-remove-portrait');

  if (img) {
    img.removeAttribute('src');
    img.style.display = 'none';
  }
  if (placeholder) placeholder.style.display = 'flex';
  if (btnRemove) btnRemove.style.display = 'none';
}

// ============================================================================
// CARACTERÍSTICA 5: SISTEMA DE DESCANSO CORTO Y LARGO (SHORT & LONG REST)
// ============================================================================
function setupRestSystem() {
  const btnShort = document.getElementById('btn-short-rest');
  const btnLong = document.getElementById('btn-long-rest');
  const modalShort = document.getElementById('short-rest-modal');
  const btnCloseShort = modalShort?.querySelector('.modal-close-btn');

  // Cerrar modales genéricos al hacer clic en fondo o cruz
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
    overlay.querySelector('.modal-close-btn')?.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  });

  // Abrir descanso corto
  btnShort?.addEventListener('click', () => {
    openShortRestModal();
  });

  // Ejecutar descanso corto
  document.getElementById('btn-execute-short-rest')?.addEventListener('click', () => {
    executeShortRest();
  });

  // Descanso largo
  btnLong?.addEventListener('click', () => {
    confirmAndExecuteLongRest();
  });
}

function openShortRestModal() {
  const modal = document.getElementById('short-rest-modal');
  if (!modal) return;

  const hdCurrent = parseInt(document.getElementById('hd-current')?.value || '0', 10);
  const hdTotal = document.getElementById('hd-total')?.value || '1d8';
  const conMod = calcModifier(document.getElementById('score-con')?.value || 10);

  const availElem = document.getElementById('sr-hd-available');
  const typeElem = document.getElementById('sr-hd-type');
  const modElem = document.getElementById('sr-con-mod');
  const resultBox = document.getElementById('sr-result-box');
  const diceCountInput = document.getElementById('sr-dice-count');

  if (availElem) availElem.textContent = hdCurrent;
  if (typeElem) typeElem.textContent = hdTotal;
  if (modElem) modElem.textContent = formatMod(conMod);
  if (diceCountInput) {
    diceCountInput.max = Math.max(1, hdCurrent);
    diceCountInput.value = Math.min(1, Math.max(1, hdCurrent));
  }
  if (resultBox) resultBox.style.display = 'none';

  modal.classList.add('active');
}

function executeShortRest() {
  const hdCurrentInput = document.getElementById('hd-current');
  const hpCurrentInput = document.getElementById('hp-current');
  const hpMaxInput = document.getElementById('hp-max');
  const resultBox = document.getElementById('sr-result-box');

  const hdCurrent = parseInt(hdCurrentInput?.value || '0', 10);
  const hpCurrent = parseInt(hpCurrentInput?.value || '0', 10);
  const hpMax = parseInt(hpMaxInput?.value || '0', 10);
  const countToSpend = parseInt(document.getElementById('sr-dice-count')?.value || '1', 10);

  if (hdCurrent <= 0) {
    alert('No te quedan Dados de Golpe disponibles.');
    return;
  }

  const spend = Math.min(hdCurrent, Math.max(1, countToSpend));
  const hdTotalStr = document.getElementById('hd-total')?.value || '1d8';
  const match = hdTotalStr.match(/d(\d+)/i);
  const sides = match ? parseInt(match[1], 10) : 8;
  const conMod = calcModifier(document.getElementById('score-con')?.value || 10);

  let rolls = [];
  let totalHeal = 0;
  for (let i = 0; i < spend; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    const piece = Math.max(0, roll + conMod);
    totalHeal += piece;
  }

  const newHp = Math.min(hpMax, hpCurrent + totalHeal);
  const newHd = Math.max(0, hdCurrent - spend);

  if (hpCurrentInput) hpCurrentInput.value = newHp;
  if (hdCurrentInput) hdCurrentInput.value = newHd;

  document.getElementById('sr-hd-available').textContent = newHd;
  if (resultBox) {
    resultBox.style.display = 'block';
    resultBox.innerHTML = `¡Gastaste ${spend}d${sides}! Tiradas: [${rolls.join(', ')}] con mod ${formatMod(conMod)}.<br><strong>Recuperas ${totalHeal} PG</strong> (Salud actual: ${newHp} / ${hpMax}).`;
  }

  saveToLocalStorage();
  showToast(`Descanso Corto: +${totalHeal} PG recuperados`);
}

function confirmAndExecuteLongRest() {
  if (!confirm('¿Deseas realizar un Descanso Largo (Long Rest)? Se recuperarán todos los PG al máximo, la mitad de tus Dados de Golpe y todos los Espacios de Conjuros gastados.')) {
    return;
  }

  const hpMax = parseInt(document.getElementById('hp-max')?.value || '0', 10);
  const hpCurrentInput = document.getElementById('hp-current');
  const hdCurrentInput = document.getElementById('hd-current');
  const hdTotalStr = document.getElementById('hd-total')?.value || '1d8';

  // 1. Restaurar PG al máximo
  if (hpCurrentInput) hpCurrentInput.value = hpMax;

  // 2. Extraer cantidad de dados de golpe totales y recuperar la mitad (mínimo 1)
  const totalMatch = hdTotalStr.match(/^(\d+)/);
  const totalHdNumber = totalMatch ? parseInt(totalMatch[1], 10) : 1;
  const currentHd = parseInt(hdCurrentInput?.value || '0', 10);
  const recoverHd = Math.max(1, Math.floor(totalHdNumber / 2));
  const newHd = Math.min(totalHdNumber, currentHd + recoverHd);
  if (hdCurrentInput) hdCurrentInput.value = newHd;

  // 3. Restaurar todos los espacios de conjuros gastados a 0
  for (let i = 1; i <= 9; i++) {
    const usedInput = document.getElementById(`slot-${i}-used`);
    if (usedInput) usedInput.value = 0;
  }

  // 4. Limpiar salvaciones de muerte
  for (let i = 1; i <= 3; i++) {
    const s = document.getElementById(`death-success-${i}`);
    const f = document.getElementById(`death-fail-${i}`);
    if (s) s.checked = false;
    if (f) f.checked = false;
  }

  saveToLocalStorage();
  showToast('Descanso Largo completado: PG y Espacios al 100%');
}

// ============================================================================
// CARACTERÍSTICA 4: COMPENDIOS OFICIALES DE ARMAS Y CONJUROS 5.5e
// ============================================================================
function setupCompendiums() {
  const btnCompWeapons = document.getElementById('btn-compendium-weapon');
  const btnCompSpells = document.getElementById('btn-compendium-spells');
  const modalWeapons = document.getElementById('compendium-weapon-modal');
  const modalSpells = document.getElementById('compendium-spells-modal');

  // Abrir Compendio de Armas
  btnCompWeapons?.addEventListener('click', () => {
    renderWeaponsCompendium();
    modalWeapons?.classList.add('active');
  });

  // Abrir Compendio de Conjuros
  btnCompSpells?.addEventListener('click', () => {
    renderSpellsCompendium();
    modalSpells?.classList.add('active');
  });

  // Filtro de nivel en compendio de conjuros
  document.getElementById('comp-spell-lvl-filter')?.addEventListener('change', () => {
    renderSpellsCompendium();
  });
}

function renderWeaponsCompendium() {
  const container = document.getElementById('weapons-compendium-list');
  if (!container || typeof DND_55E_WEAPONS_COMPENDIUM === 'undefined') return;

  container.innerHTML = '';
  DND_55E_WEAPONS_COMPENDIUM.forEach(w => {
    const card = document.createElement('div');
    card.className = 'compendium-card';
    card.innerHTML = `
      <div class="comp-card-main">
        <div class="comp-card-title">
          <span>${w.name}</span>
          <span class="comp-card-badge origin-class">Mastery: ${w.master}</span>
        </div>
        <div class="comp-card-desc">
          <strong>Daño:</strong> ${w.dmg} | <strong>Propiedades:</strong> ${w.props}
        </div>
      </div>
      <button type="button" class="btn btn-xs btn-primary btn-equip-w">Equipar</button>
    `;

    card.querySelector('.btn-equip-w').addEventListener('click', () => {
      // Calcular bono de ataque estimado (Competencia + mod FUE o DES según propiedad sutil)
      const prof = parseInt(document.getElementById('char-proficiency-bonus')?.value || '2', 10);
      const strMod = calcModifier(document.getElementById('score-str')?.value || 10);
      const dexMod = calcModifier(document.getElementById('score-dex')?.value || 10);
      const isFinesse = w.props.toLowerCase().includes('sutil') || w.props.toLowerCase().includes('munición');
      const atkMod = prof + (isFinesse ? Math.max(strMod, dexMod) : strMod);
      const dmgBonus = isFinesse ? Math.max(strMod, dexMod) : strMod;
      const dmgWithBonus = dmgBonus !== 0 ? `${w.dmg} (${formatMod(dmgBonus)}) [${w.master}]` : `${w.dmg} [${w.master}]`;

      addAttackItem(w.name, formatMod(atkMod), dmgWithBonus);
      saveToLocalStorage();
      showToast(`${w.name} equipada en la tabla de ataques`);
      document.getElementById('compendium-weapon-modal')?.classList.remove('active');
    });

    container.appendChild(card);
  });
}

function renderSpellsCompendium() {
  const container = document.getElementById('spells-compendium-list');
  const lvlFilter = document.getElementById('comp-spell-lvl-filter')?.value || 'all';
  const originTagSelect = document.getElementById('comp-spell-origin-tag');

  if (!container || typeof DND_55E_SPELLS_COMPENDIUM === 'undefined') return;

  container.innerHTML = '';
  const filtered = DND_55E_SPELLS_COMPENDIUM.filter(s => {
    if (lvlFilter === 'all') return true;
    return s.level === parseInt(lvlFilter, 10);
  });

  filtered.forEach(spell => {
    const card = document.createElement('div');
    card.className = 'compendium-card is-selectable-spell';
    const lvlText = spell.level === 0 ? 'Truco (Nivel 0)' : `Nivel ${spell.level}`;

    card.innerHTML = `
      <div class="comp-card-main">
        <div class="comp-card-title" style="justify-content: space-between;">
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:0.45rem;">
            <span>${spell.name}</span>
            <span class="comp-card-badge origin-class">${lvlText}</span>
            <span class="comp-card-badge origin-species">${spell.school}</span>
          </div>
          <button type="button" class="btn-spell-more-info">Ver más</button>
        </div>
        <div class="spell-more-drawer" style="display: none;">
          <div class="comp-spell-meta-strip">
            <span><strong>Tiempo:</strong> ${spell.time}</span>
            <span><strong>Alcance:</strong> ${spell.range}</span>
          </div>
          <div class="comp-card-desc">${spell.desc}</div>
        </div>
      </div>
      <button type="button" class="btn btn-xs btn-primary btn-add-spell-btn">+ Asignar al Espacio (Nivel ${spell.level})</button>
    `;

    const moreBtn = card.querySelector('.btn-spell-more-info');
    const drawer = card.querySelector('.spell-more-drawer');
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = drawer.style.display !== 'none';
      drawer.style.display = open ? 'none' : 'flex';
      moreBtn.classList.toggle('is-open', !open);
      moreBtn.textContent = open ? 'Ver más' : 'Ocultar';
    });

    const assignSpell = () => {
      const origin = originTagSelect?.value || 'class';
      addSpellRow(spell.level, spell.name, false, origin === 'manual' ? null : origin);
      saveToLocalStorage();
      showToast(`${spell.name} asignado a Espacios de Nivel ${spell.level}`);
      document.getElementById('compendium-spells-modal')?.classList.remove('active');
    };

    card.addEventListener('click', assignSpell);
    card.querySelector('.btn-add-spell-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      assignSpell();
    });

    container.appendChild(card);
  });
}

// ============================================================================
// CARACTERÍSTICA 3: ASISTENTE ASI Y ATRIBUTOS (DELEGADO A dnd_attributes_calc.js)
// ============================================================================
function setupAsiAssistant() {
  const btnOpen = document.getElementById('btn-asi-modal');
  btnOpen?.addEventListener('click', () => {
    if (typeof window.openAttributesCalc === 'function') {
      window.openAttributesCalc();
    }
  });
}

// Exportar helpers globales para módulos desacoplados (dnd_attributes_calc.js, dnd_guide.js, dnd_compendium.js, dnd_levelup.js)
window.recalculateAll = recalculateAll;
window.updateCharacterProgression = updateCharacterProgression;
window.addAttackItem = addAttackItem;
window.addInventoryItem = addInventoryItem;
window.saveToLocalStorage = saveToLocalStorage;
window.collectFormData = collectFormData;
window.restoreFormData = restoreFormData;
window.showToast = showToast;
