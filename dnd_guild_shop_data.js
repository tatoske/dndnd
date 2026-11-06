/**
 * ============================================================================
 * CATÁLOGO DE MISIONES DEL GREMIO, PAQUETES INICIALES DE CLASE Y TIENDA (5.5e)
 * Contratos por Rango, Paquetes de Equipo Oficiales y Armería del Mercader
 * ============================================================================
 */
(function () {
  'use strict';

  // 1. PAQUETES DE EQUIPO INICIAL OFICIAL POR CLASE (PHB 2024)
  const DND_55E_STARTER_PACKS = {
    barbarian: {
      name: 'Paquete Inicial de Bárbaro',
      gp: 15,
      armorFormula: 'unarmored_barb',
      weapons: [
        { name: 'Gran Hacha', dmg: '1d12 cortante', master: 'Cleave (Hender)', finesse: false },
        { name: 'Hacha de Mano (x4)', dmg: '1d6 cortante', master: 'Vex (Hostigar)', finesse: false }
      ],
      items: [
        { qty: 1, name: 'Paquete de Explorador (Mochila, saco, raciones, cuerda 50p)', weight: 55 },
        { qty: 4, name: 'Hachas de mano arrojadizas', weight: 8 }
      ]
    },
    bard: {
      name: 'Paquete Inicial de Bardo',
      gp: 19,
      armorFormula: 'leather',
      weapons: [
        { name: 'Estoque (Rapier)', dmg: '1d8 perforante', master: 'Vex (Hostigar)', finesse: true },
        { name: 'Daga (x2)', dmg: '1d4 perforante', master: 'Nick (Muesca)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Armadura de Cuero (CA 11 + DES)', weight: 10 },
        { qty: 1, name: 'Laúd (Foco Musical) y Paquete de Artista', weight: 40 }
      ]
    },
    cleric: {
      name: 'Paquete Inicial de Clérigo',
      gp: 7,
      armorFormula: 'chain_shirt_shield',
      weapons: [
        { name: 'Maza', dmg: '1d6 contundente', master: 'Sap (Socavar)', finesse: false },
        { name: 'Ballesta Ligera', dmg: '1d8 perforante', master: 'Slow (Ralentizar)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Camisote de Mallas (CA 13 + DES máx 2)', weight: 20 },
        { qty: 1, name: 'Escudo Sagrado (+2 CA) y Símbolo Sagrado', weight: 7 },
        { qty: 1, name: 'Paquete de Sacerdote', weight: 25 }
      ]
    },
    druid: {
      name: 'Paquete Inicial de Druida',
      gp: 9,
      armorFormula: 'leather_shield',
      weapons: [
        { name: 'Bastón Druídico', dmg: '1d8 contundente', master: 'Topple (Derribar)', finesse: false },
        { name: 'Hoz', dmg: '1d4 cortante', master: 'Nick (Muesca)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Armadura de Cuero (CA 11 + DES)', weight: 10 },
        { qty: 1, name: 'Escudo de Madera (+2 CA) y Foco Druídico', weight: 6 },
        { qty: 1, name: 'Paquete de Explorador y Kit de Herboristería', weight: 58 }
      ]
    },
    fighter: {
      name: 'Paquete Inicial de Guerrero',
      gp: 11,
      armorFormula: 'chain_mail_shield',
      weapons: [
        { name: 'Espada Larga', dmg: '1d8 cortante', master: 'Sap (Socavar)', finesse: false },
        { name: 'Mandoble', dmg: '2d6 cortante', master: 'Graze (Rozar)', finesse: false },
        { name: 'Arco Largo', dmg: '1d8 perforante', master: 'Slow (Ralentizar)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Cota de Malla Pesada (CA 16)', weight: 55 },
        { qty: 1, name: 'Escudo de Acero (+2 CA)', weight: 6 },
        { qty: 1, name: 'Paquete de Explorador de Mazmorras', weight: 50 }
      ]
    },
    monk: {
      name: 'Paquete Inicial de Monje',
      gp: 11,
      armorFormula: 'unarmored_monk',
      weapons: [
        { name: 'Lanza Marcial', dmg: '1d8 perforante', master: 'Sap (Socavar)', finesse: true },
        { name: 'Golpe Desarmado (Artes Marciales)', dmg: '1d6 contundente', master: 'Artes Marciales', finesse: true }
      ],
      items: [
        { qty: 5, name: 'Dagas arrojadizas', weight: 5 },
        { qty: 1, name: 'Paquete de Explorador', weight: 55 }
      ]
    },
    paladin: {
      name: 'Paquete Inicial de Paladín',
      gp: 9,
      armorFormula: 'chain_mail_shield',
      weapons: [
        { name: 'Espada Larga Consagrada', dmg: '1d8 cortante', master: 'Sap (Socavar)', finesse: false },
        { name: 'Jabalina (x6)', dmg: '1d6 perforante', master: 'Slow (Ralentizar)', finesse: false }
      ],
      items: [
        { qty: 1, name: 'Cota de Malla Pesada (CA 16)', weight: 55 },
        { qty: 1, name: 'Escudo con Emblema Sagrado (+2 CA)', weight: 6 },
        { qty: 1, name: 'Paquete de Sacerdote', weight: 25 }
      ]
    },
    ranger: {
      name: 'Paquete Inicial de Explorador',
      gp: 7,
      armorFormula: 'studded_leather',
      weapons: [
        { name: 'Arco Largo', dmg: '1d8 perforante', master: 'Slow (Ralentizar)', finesse: true },
        { name: 'Cimitarra', dmg: '1d6 cortante', master: 'Nick (Muesca)', finesse: true },
        { name: 'Espada Corta', dmg: '1d6 perforante', master: 'Vex (Hostigar)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Cuero Tachonado (CA 12 + DES)', weight: 13 },
        { qty: 1, name: 'Carcaj con 20 Flechas y Paquete de Explorador', weight: 56 }
      ]
    },
    rogue: {
      name: 'Paquete Inicial de Pícaro',
      gp: 8,
      armorFormula: 'leather',
      weapons: [
        { name: 'Espada Corta', dmg: '1d6 perforante', master: 'Vex (Hostigar)', finesse: true },
        { name: 'Daga (x2)', dmg: '1d4 perforante', master: 'Nick (Muesca)', finesse: true },
        { name: 'Arco Corto', dmg: '1d6 perforante', master: 'Vex (Hostigar)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Armadura de Cuero (CA 11 + DES)', weight: 10 },
        { qty: 1, name: 'Herramientas de Ladrón y Paquete de Ladrón', weight: 42 }
      ]
    },
    sorcerer: {
      name: 'Paquete Inicial de Hechicero',
      gp: 28,
      armorFormula: 'unarmored',
      weapons: [
        { name: 'Lanza', dmg: '1d6 perforante', master: 'Sap (Socavar)', finesse: false },
        { name: 'Daga (x2)', dmg: '1d4 perforante', master: 'Nick (Muesca)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Cristal Arcano (Foco Mágico)', weight: 1 },
        { qty: 1, name: 'Paquete de Explorador de Mazmorras', weight: 50 }
      ]
    },
    warlock: {
      name: 'Paquete Inicial de Brujo',
      gp: 15,
      armorFormula: 'leather',
      weapons: [
        { name: 'Hoz del Pacto', dmg: '1d4 cortante', master: 'Nick (Muesca)', finesse: true },
        { name: 'Daga (x2)', dmg: '1d4 perforante', master: 'Nick (Muesca)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Armadura de Cuero (CA 11 + DES)', weight: 10 },
        { qty: 1, name: 'Orbe Arcano y Paquete de Erudito', weight: 15 }
      ]
    },
    wizard: {
      name: 'Paquete Inicial de Mago',
      gp: 5,
      armorFormula: 'unarmored',
      weapons: [
        { name: 'Bastón Arcano', dmg: '1d6 contundente', master: 'Topple (Derribar)', finesse: false },
        { name: 'Daga (x2)', dmg: '1d4 perforante', master: 'Nick (Muesca)', finesse: true }
      ],
      items: [
        { qty: 1, name: 'Libro de Conjuros Encuadernado en Cuero', weight: 3 },
        { qty: 1, name: 'Túnica de Mago y Paquete de Erudito', weight: 14 }
      ]
    }
  };

  // 2. CATÁLOGO DEL MERCADER Y ARMERÍA (COMPRA CON MONEDAS DE ORO - PO)
  const DND_55E_MERCHANT_CATALOG = [
    { id: 'potion_heal', cat: 'Pociones y Consumibles', name: 'Poción de Curación (2d4+2 PG)', costGp: 50, weight: 0.5, type: 'consumable', healRoll: '2d4+2', desc: 'Restaura 2d4 + 2 Puntos de Golpe como Acción Adicional.' },
    { id: 'potion_greater', cat: 'Pociones y Consumibles', name: 'Poción de Curación Mayor (4d4+4 PG)', costGp: 150, weight: 0.5, type: 'consumable', healRoll: '4d4+4', desc: 'Restaura 4d4 + 4 Puntos de Golpe inmediatamente.' },
    { id: 'potion_superior', cat: 'Pociones y Consumibles', name: 'Poción de Curación Superior (8d4+8 PG)', costGp: 450, weight: 0.5, type: 'consumable', healRoll: '8d4+8', desc: 'Elixir carmesí concentrado que restaura 8d4 + 8 PG.' },
    { id: 'antitoxin', cat: 'Pociones y Consumibles', name: 'Antitoxina y Kit de Curandero (10 usos)', costGp: 25, weight: 3, type: 'gear', desc: 'Estabiliza aliados a 0 PG y otorga ventaja contra venenos.' },
    { id: 'armor_studded', cat: 'Armaduras y Escudos', name: 'Armadura de Cuero Tachonado (CA 12 + DES)', costGp: 45, weight: 13, type: 'armor', armorFormula: 'studded_leather', desc: 'La mejor armadura ligera mundana sin límite de Destreza.' },
    { id: 'armor_breastplate', cat: 'Armaduras y Escudos', name: 'Coraza de Acero (CA 14 + DES máx 2)', costGp: 400, weight: 20, type: 'armor', armorFormula: 'breastplate', desc: 'Armadura media que no impone desventaja en Sigilo.' },
    { id: 'armor_halfplate', cat: 'Armaduras y Escudos', name: 'Media Armadura (CA 15 + DES máx 2)', costGp: 750, weight: 40, type: 'armor', armorFormula: 'half_plate', desc: 'Máxima protección en armaduras medias.' },
    { id: 'armor_plate', cat: 'Armaduras y Escudos', name: 'Armadura Completa de Placas (CA 18)', costGp: 1500, weight: 65, type: 'armor', armorFormula: 'plate', desc: 'Armadura pesada magistral que fija tu CA base en 18.' },
    { id: 'shield_steel', cat: 'Armaduras y Escudos', name: 'Escudo Reforzado (+2 a tu CA)', costGp: 10, weight: 6, type: 'shield', acBonus: 2, desc: 'Suma +2 a tu Clase de Armadura actual.' },
    { id: 'wep_longsword_1', cat: 'Armas y Reliquias', name: 'Espada Larga +1 (Mágica)', costGp: 300, weight: 3, type: 'weapon', dmg: '1d8+1 cortante', master: 'Sap (Socavar)', bonusHit: 1, finesse: false, desc: 'Suma +1 mágico a las tiradas de ataque y daño.' },
    { id: 'wep_rapier_1', cat: 'Armas y Reliquias', name: 'Estoque Élfico +1 (Sutil)', costGp: 300, weight: 2, type: 'weapon', dmg: '1d8+1 perforante', master: 'Vex (Hostigar)', bonusHit: 1, finesse: true, desc: 'Arma sutil encantada con +1 a ataque y daño.' },
    { id: 'wep_bow_1', cat: 'Armas y Reliquias', name: 'Arco Largo del Cazador +1', costGp: 320, weight: 2, type: 'weapon', dmg: '1d8+1 perforante', master: 'Slow (Ralentizar)', bonusHit: 1, finesse: true, desc: 'Arco mágico +1 de alcance 150/600 pies.' },
    { id: 'wep_flametongue', cat: 'Armas y Reliquias', name: 'Espada Lengua Flamígera (+2d6 Fuego)', costGp: 950, weight: 3, type: 'weapon', dmg: '1d8+2d6 fuego', master: 'Cleave (Hender)', bonusHit: 1, finesse: false, desc: 'Hoja ígnea que añade +2d6 de daño de fuego en cada golpe.' },
    { id: 'item_bag_holding', cat: 'Armas y Reliquias', name: 'Bolsa de Contención (Bag of Holding)', costGp: 250, weight: 15, type: 'gear', desc: 'Guarda hasta 500 lb de equipo en un espacio extradimensional.' },
    { id: 'item_cloak_prot', cat: 'Armas y Reliquias', name: 'Capa de Protección (+1 CA y Salvaciones)', costGp: 350, weight: 1, type: 'shield', acBonus: 1, desc: 'Otorga +1 a tu Clase de Armadura y salvaciones.' }
  ];

  // 3. TABLÓN DE MISIONES DEL GREMIO DE AVENTUREROS (VINCULADAS AL BESTIARIO Y RANGOS)
  const DND_55E_GUILD_CONTRACTS = [
    { id: 'q_kobolds', rankReq: 'Rango Cobre', minLvl: 1, title: 'Saqueadores en la Mina de Cobre', monsterId: 'kobold', xpReward: 150, gpReward: 25, desc: 'Una banda de Kóbolds ha bloqueado la galería norte de la mina local. Despeja el túnel principal.' },
    { id: 'q_goblins', rankReq: 'Rango Cobre', minLvl: 1, title: 'Emboscada en el Camino Real', monsterId: 'goblin', xpReward: 200, gpReward: 35, desc: 'Caravanas de mercaderes están siendo asaltadas por Trasgos arqueros al cruzar el puente viejo.' },
    { id: 'q_crypt', rankReq: 'Rango Cobre', minLvl: 2, title: 'Cripta del Cementerio Consagrado', monsterId: 'skeleton', xpReward: 300, gpReward: 50, desc: 'Esqueletos armados se han alzado en el mausoleo antiguo. Destrúyelos antes de la luna nueva.' },
    { id: 'q_orcs', rankReq: 'Rango Bronce', minLvl: 3, title: 'El Caudillo Orco del Paso Rocoso', monsterId: 'orc', xpReward: 500, gpReward: 85, desc: 'Un grupo de Orcos Saqueadores exige tributo a las granjas fronterizas. Derrota a su campeón.' },
    { id: 'q_wolves', rankReq: 'Rango Bronce', minLvl: 3, title: 'La Manada del Lobo Huargo', monsterId: 'dire_wolf', xpReward: 650, gpReward: 110, desc: 'Un enorme Lobo Huargo alfa acecha a los leñadores del Bosque Susurrante.' },
    { id: 'q_mimic', rankReq: 'Rango Bronce', minLvl: 4, title: 'El Cofre Maldito de la Bóveda', monsterId: 'mimic', xpReward: 900, gpReward: 160, desc: 'Dos guardias desaparecieron en la cámara del tesoro; uno de los cofres es un Mímico voraz.' },
    { id: 'q_cube', rankReq: 'Rango Plata', minLvl: 5, title: 'Limpieza en las Cloacas Arcanas', monsterId: 'gelatinous_cube', xpReward: 1200, gpReward: 220, desc: 'Un Cubo Gelatinoso bloquea los conductos subterráneos bajo el distrito de los alquimistas.' },
    { id: 'q_owlbear', rankReq: 'Rango Plata', minLvl: 5, title: 'La Bestia del Claro de Plata', monsterId: 'owlbear', xpReward: 1600, gpReward: 300, desc: 'Un Oso Lechuza enfurecido ha destruido el campamento de los exploradores reales.' },
    { id: 'q_displacer', rankReq: 'Rango Plata', minLvl: 6, title: 'Cacería de la Sombra Feérica', monsterId: 'displacer_beast', xpReward: 2100, gpReward: 380, desc: 'Una Bestia Desplazadora escapada del Feywild acecha los jardines del duque.' },
    { id: 'q_troll', rankReq: 'Rango Oro', minLvl: 8, title: 'El Trol Regenerador del Pantano', monsterId: 'troll', xpReward: 3200, gpReward: 550, desc: 'Un Trol gigante derribó la torre de vigilancia. Lleva fuego o ácido para impedir su regeneración.' },
    { id: 'q_illithid', rankReq: 'Rango Oro', minLvl: 9, title: 'Susurros de la Infraoscuridad', monsterId: 'mind_flayer', xpReward: 4800, gpReward: 800, desc: 'Un Azotamentes controla mentalmente a los magistrados de la ciudad desde una caverna oculta.' },
    { id: 'q_young_dragon', rankReq: 'Rango Platino', minLvl: 11, title: 'Fuego sobre el Pico Ceniza', monsterId: 'young_red_dragon', xpReward: 8500, gpReward: 1500, desc: 'Un Dragón Rojo Joven ha reclamado la fortaleza enana abandonada y exige oro a la capital.' },
    { id: 'q_beholder', rankReq: 'Rango Mithril', minLvl: 14, title: 'El Ojo Tirano del Laberinto', monsterId: 'beholder', xpReward: 14000, gpReward: 2800, desc: 'Un Contemplador paranoico domina las ruinas arcanas con su cono antimagia y rayos oculares.' },
    { id: 'q_vampire', rankReq: 'Rango Mithril', minLvl: 15, title: 'El Señor Vampiro del Castillo Sombrío', monsterId: 'vampire', xpReward: 16500, gpReward: 3500, desc: 'Pon fin al reinado nocturno del Conde Vampiro antes de que el eclipse cubra el reino.' },
    { id: 'q_lich', rankReq: 'Rango Adamantina', minLvl: 17, title: 'La Filacteria del Archimago Liche', monsterId: 'lich', xpReward: 35000, gpReward: 7000, desc: 'Adéntrate en la Ciudadela Necrótica y destruye al Liche antes de que complete su ritual.' },
    { id: 'q_ancient_dragon', rankReq: 'Rango Leyenda', minLvl: 19, title: 'El Despertar del Dragón Rojo Antiguo', monsterId: 'ancient_red_dragon', xpReward: 65000, gpReward: 15000, desc: 'Contrato de Rango Leyenda: enfrenta al coloso ígneo ancestral que amenaza con calcinar el continente.' }
  ];

  window.DND_55E_STARTER_PACKS = DND_55E_STARTER_PACKS;
  window.DND_55E_MERCHANT_CATALOG = DND_55E_MERCHANT_CATALOG;
  window.DND_55E_GUILD_CONTRACTS = DND_55E_GUILD_CONTRACTS;
})();

