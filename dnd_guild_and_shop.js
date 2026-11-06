/**
 * ============================================================================
 * TABLÓN DE MISIONES DEL GREMIO, MERCADER (PAQUETES 1-CLIC) Y CARNET PNG (5.5e)
 * Ideas #1, #4 y #6 integradas con Rango de Aventurero, Oro (PO), CA e Inventario
 * ============================================================================
 */
(function () {
  'use strict';

  const completedQuestsSet = new Set();
  let activeShopCategory = 'all';

  function getMod(attr) {
    const val = parseInt(document.getElementById(`score-${attr}`)?.value || '10', 10);
    return Math.floor((val - 10) / 2);
  }

  function fmtMod(n) {
    return n >= 0 ? `+${n}` : `${n}`;
  }

  // 1. CÁLCULO DE CLASE DE ARMADURA (CA) SEGÚN LA ARMADURA EQUIPADA
  function computeArmorClassByFormula(formula) {
    const dex = getMod('dex');
    const con = getMod('con');
    const wis = getMod('wis');

    switch (formula) {
      case 'unarmored_barb': return 10 + dex + con;
      case 'unarmored_monk': return 10 + dex + wis;
      case 'leather': return 11 + dex;
      case 'leather_shield': return 11 + dex + 2;
      case 'studded_leather': return 12 + dex;
      case 'chain_shirt_shield': return 13 + Math.min(2, dex) + 2;
      case 'breastplate': return 14 + Math.min(2, dex);
      case 'half_plate': return 15 + Math.min(2, dex);
      case 'chain_mail_shield': return 18;
      case 'plate': return 18;
      default: return 10 + dex;
    }
  }

  // 2. EQUIPAR PAQUETE INICIAL DE LA CLASE ACTIVA CON 1 CLIC (IDEA #4)
  function equipStarterPackForCurrentClass() {
    const c1Sel = document.getElementById('char-class-1');
    if (c1Sel && !c1Sel.value) c1Sel.value = 'fighter';
    const c1Id = c1Sel?.value || 'fighter';
    const pack = (window.DND_55E_STARTER_PACKS || {})[c1Id];
    if (!pack) {
      window.showToast?.('Selecciona primero una Clase en la cabecera para equipar su paquete inicial.');
      return;
    }

    const prof = parseInt(document.getElementById('char-proficiency-bonus')?.value || '2', 10);
    const strMod = getMod('str');
    const dexMod = getMod('dex');

    (pack.weapons || []).forEach(w => {
      const abiMod = w.finesse ? Math.max(strMod, dexMod) : strMod;
      const hitStr = fmtMod(prof + abiMod);
      const dmgStr = `${w.dmg} (${fmtMod(abiMod)}) [${w.master}]`;
      window.addAttackItem?.(w.name, hitStr, dmgStr);
    });

    (pack.items || []).forEach(it => {
      window.addInventoryItem?.(it.qty, it.name, it.weight);
    });

    const gpInp = document.getElementById('coin-gp');
    if (gpInp) gpInp.value = parseInt(gpInp.value || '0', 10) + (pack.gp || 10);

    const acInp = document.getElementById('stat-ac');
    if (acInp && pack.armorFormula) acInp.value = computeArmorClassByFormula(pack.armorFormula);

    window.saveToLocalStorage?.();
    renderMerchantShopModal();
    window.showToast?.(`¡${pack.name} equipado! (+${pack.gp} PO y CA recalculada)`);
  }

  // 3. TIENDA DEL MERCADER Y ARMERÍA (IDEA #4)
  function openMerchantShopModal() {
    const modal = document.getElementById('merchant-shop-modal');
    if (!modal) return;
    renderMerchantShopModal();
    modal.classList.add('active');
  }

  function renderMerchantShopModal() {
    const listBox = document.getElementById('merchant-shop-list');
    const goldBadge = document.getElementById('merchant-player-gold-badge');
    if (!listBox) return;

    const currentGp = parseInt(document.getElementById('coin-gp')?.value || '0', 10);
    if (goldBadge) goldBadge.textContent = `${currentGp.toLocaleString()} PO disponibles`;

    const catalog = (window.DND_55E_MERCHANT_CATALOG || []).filter(item => {
      return activeShopCategory === 'all' || item.cat === activeShopCategory;
    });

    listBox.innerHTML = catalog.map(item => {
      const canAfford = currentGp >= item.costGp;
      return `<div class="shop-item-card">
        <div class="shop-item-main">
          <div class="shop-item-head">
            <span class="shop-cat-pill">${item.cat}</span>
            <span class="shop-price-pill ${canAfford ? 'can-afford' : 'too-expensive'}">${item.costGp} PO</span>
          </div>
          <h4 class="shop-item-title">${item.name}</h4>
          <p class="shop-item-desc">${item.desc}</p>
        </div>
        <div class="shop-item-actions">
          ${item.type === 'consumable' ? `<button type="button" class="btn-shop-action is-use-now" data-drink-potion="${item.id}" ${!canAfford ? 'disabled' : ''}>Comprar y Beber (${item.costGp} PO)</button>` : ''}
          <button type="button" class="btn-shop-action" data-buy-item="${item.id}" ${!canAfford ? 'disabled' : ''}>
            ${canAfford ? `Comprar (${item.costGp} PO)` : `Faltan ${item.costGp - currentGp} PO`}
          </button>
        </div>
      </div>`;
    }).join('');

    listBox.querySelectorAll('[data-buy-item]').forEach(btn => {
      btn.addEventListener('click', () => buyMerchantItem(btn.getAttribute('data-buy-item'), false));
    });
    listBox.querySelectorAll('[data-drink-potion]').forEach(btn => {
      btn.addEventListener('click', () => buyMerchantItem(btn.getAttribute('data-drink-potion'), true));
    });
  }

  function buyMerchantItem(itemId, drinkImmediately) {
    const item = (window.DND_55E_MERCHANT_CATALOG || []).find(i => i.id === itemId);
    const gpInp = document.getElementById('coin-gp');
    if (!item || !gpInp) return;

    const currentGp = parseInt(gpInp.value || '0', 10);
    if (currentGp < item.costGp) {
      window.showToast?.(`No tienes suficientes Monedas de Oro (Necesitas ${item.costGp} PO). Completa misiones en el Gremio.`);
      return;
    }

    gpInp.value = currentGp - item.costGp;

    if (drinkImmediately && item.healRoll && typeof window.rollFormulaString === 'function') {
      const r = window.rollFormulaString(item.healRoll);
      window.healCharacterHp?.(r.total);
      window.showToast?.(`¡Bebiste ${item.name} y recuperaste +${r.total} PG! (${r.detail})`);
    } else if (item.type === 'weapon') {
      const prof = parseInt(document.getElementById('char-proficiency-bonus')?.value || '2', 10);
      const abiMod = item.finesse ? Math.max(getMod('str'), getMod('dex')) : getMod('str');
      const hitBonus = prof + abiMod + (item.bonusHit || 0);
      window.addAttackItem?.(item.name, fmtMod(hitBonus), `${item.dmg} (${fmtMod(abiMod)}) [${item.master}]`);
      window.addInventoryItem?.(1, item.name, item.weight);
      window.showToast?.(`¡Compraste y equipaste ${item.name} en tu tabla de ataques!`);
    } else if (item.type === 'armor') {
      const acInp = document.getElementById('stat-ac');
      if (acInp) acInp.value = computeArmorClassByFormula(item.armorFormula);
      window.addInventoryItem?.(1, item.name, item.weight);
      window.showToast?.(`¡Equipada ${item.name}! Tu Clase de Armadura ahora es ${acInp?.value}.`);
    } else if (item.type === 'shield') {
      const acInp = document.getElementById('stat-ac');
      if (acInp) acInp.value = parseInt(acInp.value || '10', 10) + (item.acBonus || 2);
      window.addInventoryItem?.(1, item.name, item.weight);
      window.showToast?.(`¡Equipado ${item.name}! (+${item.acBonus} a tu CA).`);
    } else {
      window.addInventoryItem?.(1, item.name, item.weight);
      window.showToast?.(`¡${item.name} añadido a tu inventario!`);
    }

    renderMerchantShopModal();
    window.saveToLocalStorage?.();
  }

  // 4. TABLÓN DE MISIONES DEL GREMIO DE AVENTUREROS (IDEA #1)
  function openGuildQuestsModal() {
    const modal = document.getElementById('guild-quests-modal');
    if (!modal) return;
    renderGuildQuestsBoard();
    modal.classList.add('active');
  }

  function renderGuildQuestsBoard() {
    const grid = document.getElementById('guild-quests-grid');
    if (!grid) return;

    const charLvl = parseInt(document.getElementById('char-level-1')?.value || '1', 10);
    const contracts = window.DND_55E_GUILD_CONTRACTS || [];
    const monsters = window.DND_OFFICIAL_BESTIARY || [];

    grid.innerHTML = contracts.map(q => {
      const mObj = monsters.find(m => m.id === q.monsterId) || { name: 'Criatura Hostil', cr: '1' };
      const done = completedQuestsSet.has(q.id);
      const recommended = charLvl >= q.minLvl;

      return `<div class="guild-quest-card ${done ? 'is-completed' : ''} ${recommended ? 'is-recommended' : 'is-high-tier'}">
        <div class="quest-card-top">
          <span class="quest-rank-tag">${q.rankReq} · Nvl ${q.minLvl}+</span>
          <span class="quest-reward-pills">
            <strong>+${q.xpReward.toLocaleString()} XP</strong> · <strong>+${q.gpReward} PO</strong>
          </span>
        </div>
        <h4 class="quest-card-title">${q.title}</h4>
        <p class="quest-card-target">Objetivo: <strong>${mObj.name}</strong> (Desafío CR ${mObj.cr})</p>
        <p class="quest-card-desc">${q.desc}</p>
        <div class="quest-card-actions">
          <button type="button" class="btn-quest-arena" data-fight-quest="${q.id}" data-monster-id="${q.monsterId}">
            Combatir en Arena
          </button>
          <button type="button" class="btn-quest-complete" data-complete-quest="${q.id}">
            ${done ? 'Volver a Reclamar' : 'Completar Misión (+1)'}
          </button>
        </div>
      </div>`;
    }).join('');

    grid.querySelectorAll('[data-complete-quest]').forEach(btn => {
      btn.addEventListener('click', () => claimGuildQuestReward(btn.getAttribute('data-complete-quest')));
    });

    grid.querySelectorAll('[data-fight-quest]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qId = btn.getAttribute('data-fight-quest');
        const mId = btn.getAttribute('data-monster-id');
        document.getElementById('guild-quests-modal')?.classList.remove('active');
        window.openArenaCombatModal?.(mId, qId);
      });
    });
  }

  function claimGuildQuestReward(questId) {
    const q = (window.DND_55E_GUILD_CONTRACTS || []).find(c => c.id === questId);
    if (!q) return;

    completedQuestsSet.add(questId);
    const xpInp = document.getElementById('char-xp');
    const qInp = document.getElementById('char-quests');
    const gpInp = document.getElementById('coin-gp');

    if (xpInp) xpInp.value = parseInt(xpInp.value || '0', 10) + q.xpReward;
    if (qInp) qInp.value = parseInt(qInp.value || '0', 10) + 1;
    if (gpInp) gpInp.value = parseInt(gpInp.value || '0', 10) + q.gpReward;

    window.updateAdventurerProgressUI?.();
    window.saveToLocalStorage?.();
    renderGuildQuestsBoard();
    window.showToast?.(`¡Misión "${q.title}" completada! (+1 Misión, +${q.xpReward} XP y +${q.gpReward} PO)`);
  }

  // 5. GENERADOR Y EXPORTADOR DEL CARNET OFICIAL DEL GREMIO EN PNG (IDEA #6)
  function openGuildCardModal() {
    const modal = document.getElementById('guild-card-modal');
    if (!modal) return;
    drawGuildHeroCardCanvas();
    modal.classList.add('active');
  }

  function drawGuildHeroCardCanvas() {
    const canvas = document.getElementById('guild-card-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 880;
    const H = canvas.height = 500;

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#fffdf7');
    grad.addColorStop(1, '#fef3c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 6;
    ctx.strokeRect(14, 14, W - 28, H - 28);
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, W - 48, H - 48);

    const name = document.getElementById('char-name')?.value?.trim() || 'Héroe sin Nombre';
    const c1Id = document.getElementById('char-class-1')?.value || 'fighter';
    const clsName = (window.DND_55E_CLASSES || {})[c1Id]?.name || 'Aventurero';
    const raceId = document.getElementById('char-race')?.value || 'human';
    const raceName = (window.DND_55E_SPECIES || {})[raceId]?.name || 'Humano';
    const lvl = document.getElementById('char-level-1')?.value || '1';
    const rankTxt = document.getElementById('adventurer-rank-badge')?.textContent || 'Rango Cobre · Novato';
    const ac = document.getElementById('stat-ac')?.value || '10';
    const hp = document.getElementById('hp-max')?.value || '10';
    const spd = document.getElementById('stat-speed')?.value || '30';
    const quests = document.getElementById('char-quests')?.value || '0';
    const xp = document.getElementById('char-xp')?.value || '0';
    const gp = document.getElementById('coin-gp')?.value || '0';

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 15px Georgia, serif';
    ctx.fillText('GREMIO OFICIAL DE AVENTUREROS · D&D 5.5e', 46, 62);

    ctx.fillStyle = '#92400e';
    ctx.fillRect(W - 310, 40, 265, 36);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(rankTxt.toUpperCase(), W - 177, 63);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 34px Georgia, serif';
    ctx.fillText(name, 46, 110);

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 20px Georgia, serif';
    ctx.fillText(`${raceName} · ${clsName} (Nivel ${lvl})`, 46, 140);

    const vitals = [
      { lbl: 'CLASE ARM.', val: ac },
      { lbl: 'PG MÁXIMOS', val: `${hp} PG` },
      { lbl: 'VELOCIDAD', val: `${spd} pies` },
      { lbl: 'MISIONES', val: quests },
      { lbl: 'EXPERIENCIA', val: `${Number(xp).toLocaleString()} XP` },
      { lbl: 'TESORO', val: `${gp} PO` }
    ];
    vitals.forEach((v, idx) => {
      const bx = 46 + idx * 130, by = 165;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1.5;
      ctx.fillRect(bx, by, 118, 64);
      ctx.strokeRect(bx, by, 118, 64);
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(v.lbl, bx + 59, by + 22);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 17px Georgia, serif';
      ctx.fillText(String(v.val), bx + 59, by + 48);
    });

    const attrs = [
      { id: 'str', lbl: 'FUE' }, { id: 'dex', lbl: 'DES' }, { id: 'con', lbl: 'CON' },
      { id: 'int', lbl: 'INT' }, { id: 'wis', lbl: 'SAB' }, { id: 'cha', lbl: 'CAR' }
    ];
    attrs.forEach((a, idx) => {
      const sc = parseInt(document.getElementById(`score-${a.id}`)?.value || '10', 10);
      const md = fmtMod(Math.floor((sc - 10) / 2));
      const ax = 46 + idx * 130, ay = 250;
      ctx.fillStyle = '#fffbeb';
      ctx.strokeStyle = '#b45309';
      ctx.fillRect(ax, ay, 118, 74);
      ctx.strokeRect(ax, ay, 118, 74);
      ctx.fillStyle = '#92400e';
      ctx.font = 'bold 12px Georgia, serif';
      ctx.fillText(a.lbl, ax + 59, ay + 22);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px Georgia, serif';
      ctx.fillText(`${sc} (${md})`, ax + 59, ay + 54);
    });
    ctx.textAlign = 'left';

    const attacks = Array.from(document.querySelectorAll('#attacks-container .attack-row')).slice(0, 3)
      .map(r => `${r.querySelector('.input-atk-name')?.value || 'Arma'} (${r.querySelector('.input-atk-bonus')?.value || '+0'} / ${r.querySelector('.input-atk-damage')?.value || ''})`)
      .join('  ·  ') || 'Sin armas registradas aún';

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px Georgia, serif';
    ctx.fillText('ARMAS EQUIPADAS:', 46, 365);
    ctx.fillStyle = '#334155';
    ctx.font = '14px sans-serif';
    ctx.fillText(attacks.slice(0, 95), 46, 388);

    const progData = (window.DND_55E_CLASS_LEVEL_TABLE || {})[c1Id];
    const resLine = progData?.resourceLabel ? progData.resourceLabel(parseInt(lvl, 10)) : 'Aventurero registrado en el Gremio.';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px Georgia, serif';
    ctx.fillText('RECURSOS Y ESPECIALIDAD DE CLASE:', 46, 422);
    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(resLine.slice(0, 95), 46, 445);
  }

  function downloadGuildCardPng() {
    const canvas = document.getElementById('guild-card-canvas');
    if (!canvas) return;
    const name = (document.getElementById('char-name')?.value || 'aventurero').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `carnet_gremio_${name}.png`;
    a.click();
    window.showToast?.('¡Carnet Oficial del Gremio descargado en PNG!');
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-open-guild-quests')?.addEventListener('click', openGuildQuestsModal);
    document.getElementById('btn-open-merchant-shop')?.addEventListener('click', openMerchantShopModal);
    document.getElementById('btn-equip-starter-pack')?.addEventListener('click', equipStarterPackForCurrentClass);
    document.getElementById('btn-shop-starter-pack')?.addEventListener('click', equipStarterPackForCurrentClass);
    document.getElementById('btn-open-guild-card')?.addEventListener('click', openGuildCardModal);
    document.getElementById('btn-download-guild-card')?.addEventListener('click', downloadGuildCardPng);
    document.querySelectorAll('[data-shop-cat]').forEach(btn => btn.addEventListener('click', () => {
      activeShopCategory = btn.getAttribute('data-shop-cat') || 'all';
      document.querySelectorAll('[data-shop-cat]').forEach(b => b.classList.toggle('active', b === btn));
      renderMerchantShopModal();
    }));
  });
  Object.assign(window, { openGuildQuestsModal, openMerchantShopModal, claimGuildQuestReward });
})();
