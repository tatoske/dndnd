/**
 * ============================================================================
 * PROGRESIÓN POR CLASE (NIVELES 1 AL 20), RANGOS DE AVENTURERO, MISIONES Y XP
 * D&D 5.5e (2024 REVISED RULES) — Datos Oficiales por Clase y Subclase
 * ============================================================================
 */
(function () {
  'use strict';

  // 1. TABLA OFICIAL DE NIVELES (1 AL 20): UMBRALES DE XP, MISIONES Y RANGO DE AVENTURERO
  const DND_55E_PROGRESSION_TIERS = [
    { level: 1, xp: 0, quests: 0, prof: 2, rankId: 'copper', rankName: 'Rango Cobre · Novato', rankColor: '#b45309', rankBg: '#fffbeb', perk: 'Acceso a encargos locales del tablón de la posada.' },
    { level: 2, xp: 300, quests: 1, prof: 2, rankId: 'copper', rankName: 'Rango Cobre · Iniciado', rankColor: '#b45309', rankBg: '#fffbeb', perk: 'Reconocido en aldeas; raciones básicas en el gremio.' },
    { level: 3, xp: 900, quests: 2, prof: 2, rankId: 'bronze', rankName: 'Rango Bronce · Explorador', rankColor: '#92400e', rankBg: '#fef3c7', perk: 'Desbloquea Subclase Oficial y contratos de escolta regional.' },
    { level: 4, xp: 2700, quests: 4, prof: 2, rankId: 'bronze', rankName: 'Rango Bronce · Vanguardia', rankColor: '#92400e', rankBg: '#fef3c7', perk: '1ª Mejora de Característica (+2 o Dote General).' },
    { level: 5, xp: 6500, quests: 6, prof: 3, rankId: 'silver', rankName: 'Rango Plata · Veterano', rankColor: '#475569', rankBg: '#f1f5f9', perk: 'Salto a Tier 2: Ataque Extra o Conjuros Nvl 3. Competencia +3.' },
    { level: 6, xp: 14000, quests: 9, prof: 3, rankId: 'silver', rankName: 'Rango Plata · Especialista', rankColor: '#475569', rankBg: '#f1f5f9', perk: 'Acceso a contratos de monstruos peligrosos y reliquias.' },
    { level: 7, xp: 23000, quests: 12, prof: 3, rankId: 'silver', rankName: 'Rango Plata · Capitán', rankColor: '#475569', rankBg: '#f1f5f9', perk: 'Conjuros de Nvl 4 y renombre en capitales del reino.' },
    { level: 8, xp: 34000, quests: 15, prof: 3, rankId: 'gold', rankName: 'Rango Oro · Campeón', rankColor: '#b45309', rankBg: '#fef08a', perk: '2ª Mejora de Característica (+2 o Dote) y salvoconducto real.' },
    { level: 9, xp: 48000, quests: 19, prof: 4, rankId: 'gold', rankName: 'Rango Oro · Conquistador', rankColor: '#b45309', rankBg: '#fef08a', perk: 'Competencia +4 y Conjuros de Nivel 5.' },
    { level: 10, xp: 64000, quests: 23, prof: 4, rankId: 'gold', rankName: 'Rango Oro · Maestre', rankColor: '#b45309', rankBg: '#fef08a', perk: 'Rasgo mayor de Subclase y audiencia con nobles.' },
    { level: 11, xp: 85000, quests: 27, prof: 4, rankId: 'platinum', rankName: 'Rango Platino · Maestro', rankColor: '#0369a1', rankBg: '#e0f2fe', perk: 'Salto a Tier 3: Conjuros Nvl 6 y proezas continentales.' },
    { level: 12, xp: 100000, quests: 32, prof: 4, rankId: 'platinum', rankName: 'Rango Platino · Custodio', rankColor: '#0369a1', rankBg: '#e0f2fe', perk: '3ª Mejora de Característica (+2 o Dote General).' },
    { level: 13, xp: 120000, quests: 37, prof: 5, rankId: 'platinum', rankName: 'Rango Platino · Soberano', rankColor: '#0369a1', rankBg: '#e0f2fe', perk: 'Competencia +5 y Conjuros de Nivel 7.' },
    { level: 14, xp: 140000, quests: 42, prof: 5, rankId: 'mithril', rankName: 'Rango Mithril · Héroe del Reino', rankColor: '#1d4ed8', rankBg: '#dbeafe', perk: 'Rasgo maestro de Subclase y misiones planares.' },
    { level: 15, xp: 165000, quests: 48, prof: 5, rankId: 'mithril', rankName: 'Rango Mithril · Arcano Mayor', rankColor: '#1d4ed8', rankBg: '#dbeafe', perk: 'Conjuros de Nivel 8 y autoridad en fortalezas.' },
    { level: 16, xp: 195000, quests: 54, prof: 5, rankId: 'mithril', rankName: 'Rango Mithril · Paladín Supremo', rankColor: '#1d4ed8', rankBg: '#dbeafe', perk: '4ª Mejora de Característica (+2 o Dote General).' },
    { level: 17, xp: 225000, quests: 60, prof: 6, rankId: 'adamantine', rankName: 'Rango Adamantina · Parangón', rankColor: '#6d28d9', rankBg: '#ede9fe', perk: 'Salto a Tier 4: Competencia +6 y Conjuros de Nivel 9.' },
    { level: 18, xp: 265000, quests: 67, prof: 6, rankId: 'adamantine', rankName: 'Rango Adamantina · Inmortal', rankColor: '#6d28d9', rankBg: '#ede9fe', perk: 'Maestría suprema de clase ante amenazas cósmicas.' },
    { level: 19, xp: 305000, quests: 74, prof: 6, rankId: 'adamantine', rankName: 'Rango Adamantina · Avatar', rankColor: '#6d28d9', rankBg: '#ede9fe', perk: 'Don Épico (Epic Boon) + incremento de característica.' },
    { level: 20, xp: 355000, quests: 82, prof: 6, rankId: 'legend', rankName: 'Rango Leyenda · Semidiós', rankColor: '#991b1b', rankBg: '#fee2e2', perk: 'Rasgo Culminante de Nivel 20. Leyenda viva del multiverso.' }
  ];

  // 2. NIVELES DE MEJORA DE CARACTERÍSTICA (ASI / DOTE) POR CLASE
  const DND_55E_CLASS_ASI_LEVELS = {
    default: [4, 8, 12, 16, 19],
    fighter: [4, 6, 8, 12, 14, 16, 19],
    rogue: [4, 8, 10, 12, 16, 19]
  };

  // 3. DOTES GENERALES Y DONES ÉPICOS PARA ELEGIR EN NIVELES DE ASI
  const DND_55E_LEVELUP_FEATS = [
    { id: 'tough', name: 'Duro (Tough)', desc: 'Tus Puntos de Golpe máximos aumentan en 2 por cada nivel de personaje.' },
    { id: 'alert', name: 'Alerta (Alert)', desc: 'Suma tu Bono de Competencia a la Iniciativa y puedes intercambiar iniciativa con un aliado.' },
    { id: 'lucky', name: 'Afortunado (Lucky)', desc: 'Ganas Puntos de Suerte (= Competencia) para obtener Ventaja en tus tiradas o imponer Desventaja.' },
    { id: 'war_caster', name: 'Conjurador de Guerra (+1 INT/SAB/CAR)', desc: 'Ventaja en salvaciones de CON para mantener Concentración y conjuros como reacción.' },
    { id: 'gwm', name: 'Maestro en Armas Pesadas (+1 FUE)', desc: 'Suma tu Bono de Competencia al daño con armas pesadas y ataque extra al lograr crítico o derribar.' },
    { id: 'sharpshooter', name: 'Tirador de Primera (+1 DES)', desc: 'Ignoras cobertura media/tres cuartos y disparas a largo alcance o cuerpo a cuerpo sin desventaja.' },
    { id: 'sentinel', name: 'Centinela (+1 FUE o DES)', desc: 'Tus ataques de oportunidad reducen la velocidad del enemigo a 0 pies.' },
    { id: 'fey_touched', name: 'Tocado por las Hadas (+1 INT/SAB/CAR)', desc: 'Aprendes Paso Brumoso y un conjuro de nivel 1 de adivinación o encantamiento (1 uso libre/día).' },
    { id: 'resilient', name: 'Resiliente (+1 Atributo y Salvación)', desc: 'Aumenta un atributo en +1 y ganas competencia en las tiradas de salvación de ese atributo.' },
    { id: 'epic_boon', name: 'Don Épico del Combate / Destino (Nvl 19)', desc: '+1 a cualquier característica (hasta 30) y conviertes un fallo en impacto o sumas +2d4 a una tirada.' }
  ];

  // 4. PROGRESIÓN COMPLETA NIVEL A NIVEL (1 AL 20) PARA LAS 12 CLASES
  const DND_55E_CLASS_LEVEL_TABLE = {
    barbarian: {
      resourceLabel: (lvl) => `Furias: ${lvl >= 17 ? 6 : lvl >= 12 ? 5 : lvl >= 6 ? 4 : lvl >= 3 ? 3 : 2}/día · Daño Furia: +${lvl >= 16 ? 4 : lvl >= 9 ? 3 : 2}`,
      subclasses: [
        { id: 'berserker', name: 'Senda del Berserker', lvl3: 'Frenesí: Al usar Ataque Temerario en Furia, suma +2d6 de daño extra al primer impacto.', lvl6: 'Furia Descerebrada: Inmune a Hechizado y Asustado mientras estás en Furia.', lvl10: 'Represalia: Cuando un enemigo a 5 pies te daña, puedes atacarle como Reacción.', lvl14: 'Presencia Intimidante: Aterra enemigos en un aura de 30 pies como acción adicional.' },
        { id: 'wild_heart', name: 'Senda del Corazón Salvaje', lvl3: 'Furia de los Animales: Elige Oso (resistencia a casi todo daño), Águila (Correr/Destrabarse gratis) o Lobo (Ventaja a aliados).', lvl6: 'Aspecto de las Bestias: Ganas velocidad de trepar, nadar o visión nocturna.', lvl10: 'Orador de la Naturaleza: Lanzas Comunión con la Naturaleza como ritual.', lvl14: 'Poder de las Bestias: Vuelo de Halcón, derribo de León o embestida de Carnero en Furia.' },
        { id: 'world_tree', name: 'Senda del Árbol del Mundo', lvl3: 'Vitalidad de las Raíces: Al activar Furia ganas PG temporales y das PG temporales a un aliado.', lvl6: 'Ramas del Árbol: Teletransporta enemigos a 30 pies hacia ti y reduce su velocidad a 0.', lvl10: 'Raíces de Batalla: Tu alcance cuerpo a cuerpo con armas pesadas aumenta en +10 pies.', lvl14: 'Viajar por el Árbol: Teletransporta a tu grupo hasta 60 pies durante tu Furia.' },
        { id: 'zealot', name: 'Senda del Fanático', lvl3: 'Furia Divina: Tu primer golpe cada turno inflige +1d6 + mitad de tu nivel en daño radiante o necrótico. Reserva de 4d12 curativos.', lvl6: 'Concentración Fanática: Repite una tirada de salvación fallida por Furia.', lvl10: 'Presencia Zelote: Grito de batalla que da ventaja en ataques y salvaciones a 10 aliados.', lvl14: 'Furia más allá de la Muerte: En forma espectral, caer a 0 PG no te derriba mientras dure tu Furia.' }
      ],
      levels: { 1: ['Furia (2 usos, +2 daño FUE, resistencia física)', 'Defensa sin Armadura (CA = 10 + DES + CON)', 'Maestría de Armas (2 armas)'], 2: ['Ataque Temerario (Ventaja en ataques de FUE)', 'Sentido del Peligro (Ventaja en salvaciones de DES)'], 3: ['Subclase de Bárbaro (Elige tu Senda Primigenia)', 'Conocimiento Primigenio (1 habilidad extra)'], 4: ['Mejora de Característica (+2 Atributo o Dote General)'], 5: ['Ataque Extra (2 ataques por acción de Atacar)', 'Movimiento Rápido (+10 pies de velocidad)'], 6: ['Rasgo de Subclase (Nivel 6)'], 7: ['Instinto Salvaje (Ventaja en Iniciativa)', 'Abalanzarse Instintivo (Mueve mitad de velocidad al entrar en Furia)'], 8: ['Mejora de Característica (+2 Atributo o Dote General)'], 9: ['Golpe Brutal (+1d10 de daño y empujar o ralentizar)'], 10: ['Rasgo de Subclase (Nivel 10)'], 11: ['Furia Implacable (Si caes a 0 PG en Furia, supera CON CD 10 para quedar con 2 × nivel PG)'], 12: ['Mejora de Característica (+2 Atributo o Dote General)'], 13: ['Golpe Brutal Mejorado (Desequilibrar o Hendidura con +1d10 daño)'], 14: ['Rasgo de Subclase (Nivel 14)'], 15: ['Furia Persistente (Furia dura 10 min y recuperas usos con Iniciativa)'], 16: ['Mejora de Característica (+2 Atributo o Dote General)'], 17: ['Golpe Brutal Supremo (+2d10 de daño y 2 efectos a la vez)'], 18: ['Poder Indomable (Resultado mínimo en FUE = tu puntuación de FUE)'], 19: ['Don Épico (Epic Boon + incremento de característica)'], 20: ['Campeón Primigenio (+4 a Fuerza y +4 a Constitución hasta un máximo de 25)'] }
    },
    bard: {
      resourceLabel: (lvl) => `Dado de Inspiración Bárdica: d${lvl >= 15 ? 12 : lvl >= 10 ? 10 : lvl >= 5 ? 8 : 6} (Usos = mod CAR${lvl >= 5 ? ' por Descanso Corto' : ''})`,
      subclasses: [
        { id: 'lore', name: 'Colegio del Conocimiento (Lore)', lvl3: 'Palabras Cortantes: Usa tu Reacción y un dado de Inspiración para restar a un ataque, daño o habilidad enemiga. +3 habilidades.', lvl6: 'Descubrimientos Mágicos: Aprendes 2 conjuros de cualquier lista (Clérigo, Druida o Mago).', lvl10: 'Habilidad sin Par: Si fallas una prueba de habilidad, suma un dado de Inspiración y no lo pierdes si aun así fallas.', lvl14: 'Palabras Cortantes Contagiosas: Cuando usas Palabras Cortantes, un aliado gana Inspiración gratis.' },
        { id: 'valor', name: 'Colegio del Valor', lvl3: 'Entrenamiento Marcial (armaduras medias, escudos, armas marciales) e Inspiración de Combate (suma el dado al daño o a la CA).', lvl6: 'Ataque Extra (2 ataques, y puedes sustituir uno de ellos por un Truco de Bardo).', lvl10: 'Magia de Batalla: Tras lanzar un conjuro como acción, haz un ataque con arma como acción adicional.', lvl14: 'Defensa Valerosa: Reducción de daño adicional al otorgar Inspiración.' },
        { id: 'glamour', name: 'Colegio del Glamour', lvl3: 'Manto de Inspiración: Da 2 × dado en PG temporales a aliados y permíteles moverse como reacción sin ataques de oportunidad.', lvl6: 'Manto de Majestad: Lanzas Orden Imperiosa como acción adicional cada turno durante 1 minuto.', lvl10: 'Majestad Inquebrantable: Quien te ataque debe superar salvación de CAR o fallar automáticamente.', lvl14: 'Esplendor Feérico: Movimiento libre y resistencia mágica para tus aliados.' },
        { id: 'dance', name: 'Colegio de la Danza', lvl3: 'Deslumbramiento Ágil: CA sin armadura = 10 + DES + CAR, y tus golpes desarmados usan DES y tu dado de Inspiración.', lvl6: 'Movimiento Inspirador: Cuando un enemigo termina a 5 pies, te mueves tú y un aliado como reacción.', lvl10: 'Pasos en Tándem: Suma tu dado de Inspiración a la Iniciativa de todo tu grupo.', lvl14: 'Evasión Lírica: Tú y aliados adyacentes tenéis Evasión contra salvaciones de Destreza.' }
      ],
      levels: { 1: ['Lanzamiento de Conjuros (Carisma)', 'Inspiración Bárdica (Dado d6 como acción adicional)'], 2: ['Pericia (2 habilidades)', 'Aprendiz de Todo (+1/2 competencia a habilidades no entrenadas)'], 3: ['Subclase: Colegio de Bardo', 'Conjuros de Nivel 2 Desbloqueados'], 4: ['Mejora de Característica (+2 Atributo o Dote General)'], 5: ['Fuente de Inspiración (Recuperas en Descanso Corto)', 'Dado de Inspiración sube a d8', 'Conjuros de Nivel 3'], 6: ['Rasgo de Subclase (Nivel 6)'], 7: ['Contraencantamiento (Reacción contra Hechizado o Asustado)', 'Conjuros de Nivel 4'], 8: ['Mejora de Característica (+2 Atributo o Dote General)'], 9: ['Pericia Adicional (2 habilidades más)', 'Conjuros de Nivel 5'], 10: ['Secretos Mágicos (Elige conjuros de Bardo, Clérigo, Druida y Mago)', 'Dado sube a d10'], 11: ['Conjuros de Nivel 6 Desbloqueados'], 12: ['Mejora de Característica (+2 Atributo o Dote General)'], 13: ['Conjuros de Nivel 7 Desbloqueados'], 14: ['Rasgo de Subclase (Nivel 14)'], 15: ['Dado de Inspiración Bárdica sube a d12', 'Conjuros de Nivel 8'], 16: ['Mejora de Característica (+2 Atributo o Dote General)'], 17: ['Conjuros de Nivel 9 Desbloqueados'], 18: ['Inspiración Superior (Inicias combate con mínimo 2 usos)'], 19: ['Don Épico (Epic Boon + incremento de característica)'], 20: ['Palabras de la Creación (Palabra de Poder: Curar y Matar siempre preparados para 2 objetivos)'] }
    },
    cleric: {
      resourceLabel: (lvl) => `Canalizar Divinidad: ${lvl >= 18 ? 4 : lvl >= 6 ? 3 : lvl >= 2 ? 2 : 0}/descanso · Chispa Divina: ${lvl >= 18 ? 4 : lvl >= 13 ? 3 : lvl >= 7 ? 2 : 1}d8 + SAB`,
      subclasses: [
        { id: 'life', name: 'Dominio de la Vida', lvl3: 'Discípulo de la Vida (+2 + nivel del conjuro a toda curación) y Preservar la Vida (reparte 5 × nivel PG con Canalizar Divinidad).', lvl6: 'Sanador Bendito: Cuando curas a otro con un conjuro, tú recuperas 2 + nivel del conjuro en PG.', lvl10: 'Curación Suprema: En lugar de tirar dados para curar con un conjuro, usas el valor máximo de cada dado.', lvl14: 'Bendición Vital: Tus conjuros de resurrección y curación masiva otorgan PG temporales.' },
        { id: 'light', name: 'Dominio de la Luz', lvl3: 'Bengala Protectora (Reacción para imponer Desventaja a un atacante) y Resplandor del Alba (2d10 + nivel daño radiante en área).', lvl6: 'Bengala Mejorada: Puedes proteger a aliados a 30 pies y les das 2d6 + SAB PG temporales.', lvl10: 'Corona de Luz: Aura brillante que da desventaja a los enemigos contra tus conjuros de fuego y radiantes.', lvl14: 'Luz Purificadora: Disipa oscuridad mágica y potencia el daño radiante.' },
        { id: 'trickery', name: 'Dominio del Engaño', lvl3: 'Bendición del Embaucador (Ventaja en Sigilo) e Invocar Duplicado (crea una ilusión tuya desde la que lanzas conjuros con ventaja).', lvl6: 'Paso Engañoso: Intercambia tu posición con tu Duplicado ilusorio como acción adicional.', lvl10: 'Duplicado Mejorado: Tus aliados ganan ventaja contra enemigos junto a tu Duplicado.', lvl14: 'Cuatro Duplicados: Creas 4 copias ilusorias simultáneas.' },
        { id: 'war', name: 'Dominio de la Guerra', lvl3: 'Sacerdote de la Guerra (ataque adicional con arma como acción adicional) y Golpe Guiado (+10 a una tirada de ataque tuya o de un aliado).', lvl6: 'Bendición del Dios de la Guerra: Lanza Escudo de Fe o Favor Divino sin Concentración gastando Canalizar Divinidad.', lvl10: 'Avatar de la Batalla: Resistencia permanente a daño contundente, perforante y cortante.', lvl14: 'Campeón de la Guerra: Tus impactos críticos derriban y otorgan ventaja al grupo.' }
      ],
      levels: { 1: ['Lanzamiento de Conjuros Divinos (Sabiduría)', 'Orden Divina (Protector o Taumaturgo)'], 2: ['Canalizar Divinidad (2 usos: Chispa Divina 1d8+SAB o Expulsar Muertos Vivientes)'], 3: ['Subclase: Dominio Divino (Conjuros de dominio siempre preparados)', 'Conjuros de Nivel 2'], 4: ['Mejora de Característica (+2 Atributo o Dote General)'], 5: ['Calcinar Muertos Vivientes (Expulsar inflige SAB × d8 radiante)', 'Conjuros de Nivel 3'], 6: ['Rasgo de Subclase (Nivel 6)', 'Canalizar Divinidad sube a 3 usos'], 7: ['Golpes Benditos (+1d8 radiante/necrótico a armas o +SAB a trucos)', 'Conjuros de Nivel 4'], 8: ['Mejora de Característica (+2 Atributo o Dote General)'], 9: ['Conjuros de Nivel 5 Desbloqueados'], 10: ['Intervención Divina (Lanza cualquier conjuro de Clérigo de nivel 5 o menor gratis 1/día)'], 11: ['Conjuros de Nivel 6 Desbloqueados'], 12: ['Mejora de Característica (+2 Atributo o Dote General)'], 13: ['Conjuros de Nivel 7 Desbloqueados'], 14: ['Golpes Benditos Mejorados (+2d8 daño o 2×SAB PG temp)', 'Rasgo de Subclase (Nvl 14)'], 15: ['Conjuros de Nivel 8 Desbloqueados'], 16: ['Mejora de Característica (+2 Atributo o Dote General)'], 17: ['Conjuros de Nivel 9 Desbloqueados'], 18: ['Canalizar Divinidad sube a 4 usos'], 19: ['Don Épico (Epic Boon + incremento de característica)'], 20: ['Intervención Divina Mayor (Puedes elegir el conjuro Deseo con Intervención Divina)'] }
    },
    druid: {
      resourceLabel: (lvl) => `Forma Salvaje: ${lvl >= 17 ? 4 : lvl >= 6 ? 3 : 2} usos · PG Temp: ${lvl * 3}`,
      subclasses: [
        { id: 'land', name: 'Círculo de la Tierra', lvl3: 'Ayuda de la Tierra (drenaje floral/curativo en área con Forma Salvaje) y Conjuros del Círculo (Ártico, árido, templado o tropical).', lvl6: 'Recuperación Natural: Recupera espacios de conjuro en Descanso Corto y 1 conjuro del círculo gratis/día.', lvl10: 'Custodio de la Naturaleza: Inmune a Envenenado y resistencia elemental según tu tierra.', lvl14: 'Santuario de la Naturaleza: Árboles espectrales dan media cobertura y resistencia a tus aliados.' },
        { id: 'moon', name: 'Círculo de la Luna', lvl3: 'Formas del Círculo: Transforma en bestias de CR = Nivel/3 con CA = 13 + SAB y 3 × nivel PG temporales. Lanza conjuros lunares en forma animal.', lvl6: 'Formas del Círculo Mejoradas: Tus ataques bestiales hacen daño radiante y sumas SAB a salvaciones de CON.', lvl10: 'Paso de Luz Lunar: Teletransporte de 30 pies como acción adicional con ventaja en tu siguiente ataque.', lvl14: 'Resplandor Lunar: +2d10 daño radiante en cada golpe bestial y teletransporte grupal.' },
        { id: 'sea', name: 'Círculo del Mar', lvl3: 'Ira del Océano: Rodea tu cuerpo con una emanación marina que empuja y daña (SAB × d6 frío) como acción adicional.', lvl6: 'Afinidad Acuática: Velocidad de nado y tus emanaciones marinas alcanzan 10 pies.', lvl10: 'Hijo de la Tormenta: Ganas velocidad de vuelo y resistencia a relámpago, trueno y frío.', lvl14: 'Regalo Oceánico: Comparte tu aura marina con otro aliado simultáneamente.' },
        { id: 'stars', name: 'Círculo de las Estrellas', lvl3: 'Forma Estelar: Adopta la constelación de Arquero (ataque radiante 1d8+SAB), Cáliz (+1d8+SAB curación extra) o Dragón (mínimo 10 en Concentración).', lvl6: 'Presagio Cósmico: Tira 1d6 tras descanso largo para sumar (Prosperidad) o restar (Aflicción) a tiradas como reacción.', lvl10: 'Constelaciones Centelleantes: Los dados de Arquero y Cáliz suben a 2d8, Dragón da vuelo de 20 pies y puedes cambiar de constelación cada turno.', lvl14: 'Lleno de Estrellas: En Forma Estelar tienes resistencia a daño contundente, perforante y cortante.' }
      ],
      levels: { 1: ['Lanzamiento de Conjuros Primigenios (Sabiduría)', 'Druídico', 'Orden Primigenia (Mago o Guardián)'], 2: ['Forma Salvaje (2 usos como acción adicional)', 'Compañero Salvaje (Familiar feérico)'], 3: ['Subclase: Círculo Druídico', 'Conjuros de Nivel 2'], 4: ['Mejora de Característica (+2 Atributo o Dote General)', 'Forma Salvaje nadadora'], 5: ['Resurgimiento Salvaje (Convierte espacio en Forma Salvaje o viceversa)', 'Conjuros de Nivel 3'], 6: ['Rasgo de Subclase (Nivel 6)', 'Forma Salvaje sube a 3 usos'], 7: ['Furia Elemental (+SAB a trucos o +1d8 elemental a armas/bestia)', 'Conjuros de Nivel 4'], 8: ['Mejora de Característica (+2 Atributo o Dote General)', 'Forma Salvaje voladora'], 9: ['Conjuros de Nivel 5 Desbloqueados'], 10: ['Rasgo de Subclase (Nivel 10)'], 11: ['Conjuros de Nivel 6 Desbloqueados'], 12: ['Mejora de Característica (+2 Atributo o Dote General)'], 13: ['Conjuros de Nivel 7 Desbloqueados'], 14: ['Rasgo de Subclase (Nivel 14)'], 15: ['Furia Elemental Mejorada (+2d8 elemental)', 'Conjuros de Nivel 8'], 16: ['Mejora de Característica (+2 Atributo o Dote General)'], 17: ['Forma Salvaje sube a 4 usos', 'Conjuros de Nivel 9'], 18: ['Conjuros de la Bestia (Lanza conjuros en Forma Salvaje)'], 19: ['Don Épico (Epic Boon + incremento de característica)'], 20: ['Archidruida (Recupera Forma Salvaje en Iniciativa y convierte usos en espacios)'] }
    },
    fighter: {
      resourceLabel: (lvl) => `Ataques por Acción: ${lvl >= 20 ? 4 : lvl >= 11 ? 3 : lvl >= 5 ? 2 : 1} · Tomar Aliento: ${lvl >= 10 ? 4 : lvl >= 4 ? 3 : 2} usos · Oleada de Acción: ${lvl >= 17 ? 2 : lvl >= 2 ? 1 : 0}`,
      subclasses: [
        { id: 'battlemaster', name: 'Maestro de Batalla', lvl3: 'Superioridad en Combate: 4 dados d8 y 3 Maniobras (Desarmar, Derribar, Ripostar, Ataque de Precisión).', lvl7: 'Conoce a tu Enemigo: Descubre resistencias y vulnerabilidades de una criatura como acción adicional.', lvl10: 'Superioridad Mejorada: Tus dados de superioridad suben a d10.', lvl15: 'Implacable: Una vez por turno puedes usar una maniobra con 1d8 gratis sin gastar dado.' },
        { id: 'champion', name: 'Campeón', lvl3: 'Crítico Mejorado (crítico con 19 o 20) y Atleta Notable (Ventaja en Iniciativa y Atletismo; te mueves gratis al hacer crítico).', lvl7: 'Estilo de Combate Adicional (obtienes un 2º Estilo de Combate).', lvl10: 'Guerrero Heroico: Al inicio de cada uno de tus turnos en combate ganas Inspiración Heroica si no la tienes.', lvl15: 'Crítico Superior (impacto crítico con 18, 19 o 20 en el d20).' },
        { id: 'eldritch_knight', name: 'Caballero Sobrenatural (Eldritch Knight)', lvl3: 'Lanzamiento de Conjuros de Mago (INT) y Vínculo con Arma (invoca hasta 2 armas a tu mano y no pueden desarmarte).', lvl7: 'Magia de Guerra: Al usar la acción de Atacar, puedes sustituir uno de tus ataques por el lanzamiento de un Truco.', lvl10: 'Golpe Sobrenatural: Criatura golpeada por tu arma tiene Desventaja en su siguiente salvación contra un conjuro tuyo.', lvl15: 'Carga Arcana: Cuando usas Oleada de Acción, te teletransportas hasta 30 pies gratis.' },
        { id: 'psi_warrior', name: 'Guerrero Psiónico (Psi Warrior)', lvl3: 'Poder Psiónico: Dados de energía psiónica para Campo Protector (reduce daño), Golpe Psiónico (+dado+INT daño de fuerza) y Movimiento Telequinético.', lvl7: 'Salto Telequinético (vuelo corto) y Empujón Telequinético (derriba o empuja al usar Golpe Psiónico).', lvl10: 'Mente Protegida: Resistencia a daño psíquico y terminas Hechizado/Asustado al inicio del turno.', lvl15: 'Baluarte de Fuerza: Media cobertura durante 1 minuto para ti y aliados elegidos.' }
      ],
      levels: {
        1: ['Estilo de Combate (Dote de Estilo de Combate)', 'Tomar Aliento (Recupera 1d10 + nivel PG como acción adicional; 2 usos)', 'Maestría de Armas (3 armas)'],
        2: ['Oleada de Acción (Action Surge: 1 Acción adicional completa en tu turno; se recupera en descanso corto)', 'Mente Táctica (Si fallas una prueba de habilidad, suma 1d10 de Tomar Aliento)'],
        3: ['Subclase: Arquetipo Marcial'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)', 'Tomar Aliento sube a 3 usos'],
        5: ['Ataque Extra (2 ataques por acción de Atacar)', 'Cambio Táctico (Cuando usas Tomar Aliento, te mueves la mitad de tu velocidad sin provocar ataques de oportunidad)'],
        6: ['Mejora de Característica Adicional de Guerrero (+2 Atributo o Dote General)'],
        7: ['Rasgo de Subclase (Nivel 7)'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Indomable (Repite una tirada de salvación fallida sumando tu nivel de Guerrero al nuevo resultado; 1 uso)', 'Maestro de Tácticas (Puedes cambiar la propiedad de maestría de cualquier ataque por Empujar, Ralentizar o Socavar)'],
        10: ['Rasgo de Subclase (Nivel 10)', 'Tomar Aliento sube a 4 usos'],
        11: ['Dos Ataques Extra (Realizas 3 ataques cada vez que tomas la acción de Atacar)'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)'],
        13: ['Indomable sube a 2 usos', 'Ataques Estudiados (Si fallas un ataque contra un objetivo, tienes Ventaja en tu siguiente ataque contra él)'],
        14: ['Mejora de Característica Adicional de Guerrero (+2 Atributo o Dote General)'],
        15: ['Rasgo de Subclase (Nivel 15)'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Oleada de Acción sube a 2 usos por descanso', 'Indomable sube a 3 usos'],
        18: ['Rasgo de Subclase (Nivel 18)'],
        19: ['Don Épico (Epic Boon + incremento de característica)'],
        20: ['Tres Ataques Extra (Realizas 4 ataques cada vez que tomas la acción de Atacar)']
      }
    },
    monk: {
      resourceLabel: (lvl) => `Dado Marcial: d${lvl >= 17 ? 12 : lvl >= 11 ? 10 : lvl >= 5 ? 8 : 6} · Puntos de Concentración (Ki): ${lvl >= 2 ? lvl : 0}`,
      subclasses: [
        { id: 'open_hand', name: 'Guerrero de la Mano Abierta', lvl3: 'Técnica de la Mano Abierta: Tus golpes de Ráfaga derriban (DES), empujan 15 pies (FUE) o impiden reacciones.', lvl6: 'Integridad Corporal: Como acción adicional, te curas 1d8 + mod SAB PG (usos = mod SAB).', lvl11: 'Paso de la Flota: Cuando tomas cualquier acción adicional que no sea Paso del Viento, ganas Paso del Viento gratis.', lvl17: 'Palma Vibrante: Gasta 4 puntos de Concentración para infligir 10d12 de daño de fuerza.' },
        { id: 'shadow', name: 'Guerrero de la Sombra', lvl3: 'Artes de la Sombra: Lanza Oscuridad (puedes ver dentro de ella), Visión en la Oscuridad y Ilusión Menor.', lvl6: 'Paso de Sombra: Teletransporte de 60 pies entre zonas de penumbra/oscuridad con ventaja en el siguiente golpe.', lvl11: 'Paso de Sombra Mejorado: Gasta 1 punto para teletransportarte sin requerir oscuridad y atacar gratis.', lvl17: 'Manto de Sombras: Eres invisible en oscuridad, atraviesas criaturas y tu Ráfaga de Golpes no cuesta puntos.' },
        { id: 'elements', name: 'Guerrero de los Elementos', lvl3: 'Sintonía Elemental: Tus golpes desarmados tienen 15 pies de alcance, hacen daño ácido/frío/fuego/relámpago/trueno y empujan o atraen 10 pies.', lvl6: 'Estallido Elemental: Lanza una esfera elemental de 20 pies a 120 pies que causa 3 × dado marcial de daño.', lvl11: 'Zancada de los Elementos: En Sintonía Elemental ganas velocidad de vuelo y de nado igual a tu velocidad.', lvl17: 'Epítome Elemental: Resistencia elemental, +1 dado de daño por turno y dañas enemigos al atravesarlos.' },
        { id: 'mercy', name: 'Guerrero de la Misericordia', lvl3: 'Manos de Sanación (cura 1 dado marcial + SAB) y Manos de Daño (+1 dado marcial + SAB de daño necrótico).', lvl6: 'Toque del Médico: Manos de Sanación quita estados y Manos de Daño aplica Envenenado sin salvación.', lvl11: 'Ráfaga de Curación y Daño: Usa Manos de Sanación o Manos de Daño gratis dentro de tu Ráfaga de Golpes.', lvl17: 'Mano de la Misericordia Suprema: Revive a una criatura caída en las últimas 24 horas con 4d10 + SAB PG.' }
      ],
      levels: {
        1: ['Artes Marciales (Dado d6, usa DES en ataques desarmados/armas de monje y 1 golpe desarmado como acción adicional)', 'Defensa sin Armadura (CA = 10 + DES + SAB)'],
        2: ['Concentración del Monje (Puntos = Nivel: Ráfaga de Golpes, Defensa Paciente y Paso del Viento)', 'Movimiento sin Armadura (+10 pies)', 'Metabolismo Extraordinario (Al tirar Iniciativa, recupera todos tus puntos de Concentración y cura 1 dado marcial + nivel PG; 1/día)'],
        3: ['Subclase: Tradición Monástica', 'Desviar Ataques (Reacción para reducir cualquier ataque cuerpo a cuerpo o a distancia en 1d10 + DES + nivel)'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)', 'Caída Lenta (Reduce daño por caída en 5 × nivel)'],
        5: ['Ataque Extra (2 ataques)', 'Golpe Aturdidor (Gasta 1 punto para aturdir hasta el inicio de tu siguiente turno)', 'Dado Marcial sube a d8'],
        6: ['Rasgo de Subclase (Nivel 6)', 'Golpes Potenciados (Tus golpes desarmados pueden infligir daño de Fuerza)'],
        7: ['Evasión (Salvación de DES exitosa = 0 daño; fallida = mitad de daño)'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Movimiento Acrobático (En movimiento sin armadura puedes correr por paredes verticales y sobre líquidos)'],
        10: ['Autorrestauración (Terminas Hechizado, Asustado o Envenenado al final de tu turno)', 'Concentración Elevada (Ráfaga hace 3 golpes, Defensa Paciente da 2 dados de PG temp, Paso del Viento lleva a un aliado)'],
        11: ['Rasgo de Subclase (Nivel 11)', 'Dado Marcial sube a d10'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)'],
        13: ['Desviar Energía (Desviar Ataques funciona contra ataques de cualquier tipo de daño elemental o mágico)'],
        14: ['Superviviente Disciplinado (Competencia en TODAS las 6 tiradas de salvación, y gasta 1 punto para repetir un fallo)'],
        15: ['Concentración Perfecta (Si tiras Iniciativa con menos de 4 puntos de Concentración, subes a 4 puntos)'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Rasgo de Subclase (Nivel 17)', 'Dado Marcial sube a d12'],
        18: ['Defensa Superior (Gasta 3 puntos al inicio del turno para ganar resistencia a todo daño salvo fuerza durante 1 minuto)'],
        19: ['Don Épico (Epic Boon + incremento de característica)'],
        20: ['Cuerpo y Mente (+4 a Destreza y +4 a Sabiduría hasta un máximo de 25)']
      }
    }
  };

  window.DND_55E_PROGRESSION_TIERS = DND_55E_PROGRESSION_TIERS;
  window.DND_55E_CLASS_ASI_LEVELS = DND_55E_CLASS_ASI_LEVELS;
  window.DND_55E_LEVELUP_FEATS = DND_55E_LEVELUP_FEATS;
  window.DND_55E_CLASS_LEVEL_TABLE = DND_55E_CLASS_LEVEL_TABLE;
})();

// 5. CONTINUACIÓN DE PROGRESIÓN DE CLASES (PALADÍN, EXPLORADOR, PÍCARO, HECHICERO, BRUJO, MAGO)
(function () {
  'use strict';
  if (!window.DND_55E_CLASS_LEVEL_TABLE) return;

  Object.assign(window.DND_55E_CLASS_LEVEL_TABLE, {
    paladin: {
      resourceLabel: (lvl) => `Imposición de Manos: ${lvl * 5} PG · Canalizar Divinidad: ${lvl >= 11 ? 3 : lvl >= 3 ? 2 : 0} usos`,
      subclasses: [
        { id: 'devotion', name: 'Juramento de Devoción', lvl3: 'Arma Sagrada (+CAR a tus tiradas de ataque durante 10 min con Canalizar Divinidad) y conjuros de devoción.', lvl7: 'Aura de Devoción: Tú y aliados en tu aura sois inmunes al estado Hechizado.', lvl15: 'Castigo Protector: Cuando usas Castigo Divino, tú y tus aliados en el aura ganáis media cobertura (+2 CA y DES).', lvl20: 'Nimbo Sagrado: Resplandor solar de 30 pies que inflige daño radiante automático y da ventaja contra infernales y muertos vivientes.' },
        { id: 'glory', name: 'Juramento de la Gloria', lvl3: 'Castigo Inspirador (reparte 2d8 + nivel PG temporales tras un Castigo Divino) y Proeza sin Par (Ventaja en Atletismo y Acrobacias).', lvl7: 'Aura de Alacridad: Tu velocidad aumenta en +10 pies y la de los aliados que entren en tu aura.', lvl15: 'Defensa Gloriosa: Suma +CAR a la CA de un aliado atacado y contraataca si el golpe falla.', lvl20: 'Leyenda Viviente: Carisma sobrenatural, convierte fallos de ataque en impactos y repite salvaciones.' },
        { id: 'ancients', name: 'Juramento de los Antiguos', lvl3: 'Ira de la Naturaleza (enreda enemigos a 15 pies con lianas mágicas) y conjuros primigenios.', lvl7: 'Aura de Custodia: Tú y tus aliados en el aura tenéis resistencia a daño necrótico, psíquico y radiante.', lvl15: 'Centinela Inmortal: Si caes a 0 PG, quedas en 1 PG y recuperas 3 × nivel PG (1/día).', lvl20: 'Campeón Ancestral: Tus conjuros de paladín se lanzan como acción adicional y regeneras 10 PG por turno.' },
        { id: 'vengeance', name: 'Juramento de Venganza', lvl3: 'Voto de Enemistad: Como acción adicional al atacar, gana Ventaja en todas tus tiradas de ataque contra esa criatura durante 1 minuto (se transfiere si muere).', lvl7: 'Vengador Implacable: Cuando golpeas con ataque de oportunidad, reduces la velocidad del objetivo a 0 y te mueves la mitad de tu velocidad.', lvl15: 'Alma de Venganza: Cuando la criatura bajo tu Voto de Enemistad ataca, puedes golpearla como Reacción.', lvl20: 'Ángel Vengador: Alas de vuelo de 60 pies y aura de terror que asusta a todos los enemigos cercanos.' }
      ],
      levels: {
        1: ['Imposición de Manos (Reserva curativa = 5 × nivel como acción adicional)', 'Lanzamiento de Conjuros (Carisma; inicia a nivel 1 en 5.5e)', 'Maestría de Armas (2 armas)'],
        2: ['Estilo de Combate (Dote de Estilo de Combate o Bendición de Guerrero)', 'Castigo del Paladín (Castigo Divino siempre preparado y 1 lanzamiento gratis al día sin gastar espacio)'],
        3: ['Subclase: Juramento Sagrado', 'Canalizar Divinidad (2 usos; incluye Sentido Divino para detectar celestiales, infernales y muertos vivientes)'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)'],
        5: ['Ataque Extra (2 ataques)', 'Corcel Fiel (Hallar Corcel siempre preparado y 1 invocación gratis al día)', 'Conjuros de Nivel 2'],
        6: ['Aura de Protección (Tú y tus aliados a 10 pies sumáis tu modificador de Carisma a TODAS las tiradas de salvación)'],
        7: ['Rasgo de Subclase (Aura de Nivel 7)'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Abjurar Enemigos (Canalizar Divinidad para Aterrar y acorralar enemigos a 60 pies)', 'Conjuros de Nivel 3'],
        10: ['Aura de Coraje (Tú y tus aliados en el Aura de Protección sois inmunes al estado Asustado)'],
        11: ['Golpes Radiantes (Todos tus ataques cuerpo a cuerpo o con armas arrojadizas infligen +1d8 de daño radiante gratis)', 'Canalizar Divinidad sube a 3 usos'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)'],
        13: ['Conjuros de Nivel 4 Desbloqueados'],
        14: ['Toque Restaurador (Imposición de Manos también elimina Cegado, Hechizado, Ensordecido, Asustado, Paralizado o Aturdido)'],
        15: ['Rasgo de Subclase (Nivel 15)'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Conjuros de Nivel 5 Desbloqueados'],
        18: ['Expansión de Aura (Tu Aura de Protección, Coraje y Subclase aumenta su radio a 30 pies)'],
        19: ['Don Épico (Epic Boon + incremento de característica)'],
        20: ['Rasgo Culminante de Juramento Sagrado (Transformación divina de Nivel 20)']
      }
    },
    ranger: {
      resourceLabel: (lvl) => `Marca del Cazador gratis: ${lvl >= 17 ? 6 : lvl >= 13 ? 5 : lvl >= 9 ? 4 : lvl >= 5 ? 3 : 2}/día · Daño Marca: 1d${lvl >= 20 ? 10 : 6}`,
      subclasses: [
        { id: 'hunter', name: 'Cazador (Hunter)', lvl3: 'Sabiduría del Cazador (conoces inmunidades/vulnerabilidades de tu presa) y Presa del Cazador (Verdugo de Colosos +1d8 o Rompehordas).', lvl7: 'Tácticas Defensivas (Escapar de la Horda o Defensa contra Ataques Múltiples).', lvl11: 'Furia del Cazador Superior (Salpicadura de daño de tu Marca del Cazador a otro enemigo a 30 pies).', lvl15: 'Defensa del Cazador Superior (Reacción para reducir un daño a la mitad y redirigir la otra mitad a otro enemigo).' },
        { id: 'beast_master', name: 'Señor de las Bestias (Beast Master)', lvl3: 'Compañero Primigenio: Bestia de la Tierra, del Mar o del Cielo que actúa en tu turno usando tu acción adicional o 1 ataque.', lvl7: 'Entrenamiento Excepcional: Tu bestia puede Correr/Destrabarse/Ayudar gratis y hace daño de Fuerza.', lvl11: 'Furia Bestial: Tu bestia ataca 2 veces por orden y aplica el daño extra de tu Marca del Cazador.', lvl15: 'Compartir Conjuros: Cuando te lanzas un conjuro a ti mismo, también afecta a tu bestia.' },
        { id: 'gloom_stalker', name: 'Acechador de la Penumbra (Gloom Stalker)', lvl3: 'Emboscador Terrible (+SAB a Iniciativa y +2d6 psíquico extra) y Manto Sombrío (invisible ante criaturas con visión en la oscuridad).', lvl7: 'Mente de Hierro (Competencia en salvaciones de Sabiduría).', lvl11: 'Ráfaga del Acechador (+2d8 psíquico y puedes asustar en área o hacer un tercer ataque).', lvl15: 'Esquiva Sombría (Reacción para imponer Desventaja a un atacante y teletransportarte 30 pies).' },
        { id: 'fey_wanderer', name: 'Errante Feérico (Fey Wanderer)', lvl3: 'Golpes espantosos (+1d4 psíquico por turno a cada objetivo) y Encanto de Otro Mundo (+SAB a todas tus pruebas de Carisma).', lvl7: 'Giro Seductor: Ventaja contra Hechizado/Asustado y rediriges el efecto a un enemigo como reacción.', lvl11: 'Refuerzos Feéricos: Lanzas Invocar Feérico sin Concentración y 1 vez gratis al día.', lvl15: 'Vagabundo Brumoso: Paso Brumoso gratis (usos = SAB) llevando a un aliado contigo.' }
      ],
      levels: {
        1: ['Lanzamiento de Conjuros (Sabiduría; inicia a nivel 1 en 5.5e)', 'Enemigo Predilecto (Marca del Cazador siempre preparada y 2 usos gratis/día)', 'Maestría de Armas (2 armas)'],
        2: ['Explorador Hábil (Pericia en 1 habilidad y aprendes 2 idiomas adicionales)', 'Estilo de Combate (Dote de Estilo de Combate o Bendición Druídica)'],
        3: ['Subclase: Cónclave de Explorador', 'Enemigo Predilecto sube a 3 usos gratis'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)'],
        5: ['Ataque Extra (2 ataques)', 'Conjuros de Nivel 2'],
        6: ['Errante (Roving: +10 pies de velocidad y ganas velocidad de trepar y de nadar iguales a tu velocidad)'],
        7: ['Rasgo de Subclase (Nivel 7)'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Pericia Adicional (Duplica tu competencia en 2 habilidades más)', 'Enemigo Predilecto sube a 4 usos', 'Conjuros de Nivel 3'],
        10: ['Incansable (Como acción gana 1d8+SAB PG temporales usos=SAB, y cada Descanso Corto reduce 1 nivel de Agotamiento)'],
        11: ['Rasgo de Subclase (Nivel 11)'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)'],
        13: ['Cazador Implacable (Recibir daño ya no puede romper tu Concentración en Marca del Cazador)', 'Conjuros de Nivel 4'],
        14: ['Velo de la Naturaleza (Como acción adicional te vuelves Invisible hasta el final de tu siguiente turno; usos = SAB)'],
        15: ['Rasgo de Subclase (Nivel 15)'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Cazador Preciso (Tienes Ventaja en todas tus tiradas de ataque contra la criatura marcada por tu Marca del Cazador)', 'Conjuros de Nivel 5'],
        18: ['Sentidos Salvajes (Ganas Vista Ciega en un radio de 30 pies)'],
        19: ['Don Épico (Epic Boon + incremento de característica)'],
        20: ['Verdugo de Enemigos (El dado de daño de tu Marca del Cazador sube de 1d6 a 1d10)']
      }
    },
    rogue: {
      resourceLabel: (lvl) => `Ataque Furtivo: +${Math.ceil(lvl / 2)}d6 de daño por turno`,
      subclasses: [
        { id: 'assassin', name: 'Asesino (Assassin)', lvl3: 'Asesinar (Ventaja en Iniciativa; en la 1ª ronda tienes ventaja contra quien no haya actuado y sumas +nivel al daño furtivo).', lvl9: 'Experto en Infiltración: Imitas voces/escritura y puedes Apuntar en movimiento sin perder velocidad.', lvl13: 'Armas Envenenadas: Cuando usas la opción Veneno de Golpe Astuto, infliges +2d6 de veneno ignorando resistencia.', lvl17: 'Golpe Mortal: En la primera ronda de combate tu Ataque Furtivo duplica todo su daño si el objetivo falla salvación de CON.' },
        { id: 'thief', name: 'Ladrón (Thief)', lvl3: 'Manos Rápidas (Usa objetos mágicos, trampas o ganzúas como acción adicional) y Trabajo de Segundo Piso (Trepar y saltar con DES).', lvl9: 'Sigilo Supremo: Ganas la opción Ataque Sombra en Golpe Astuto (ataca sin revelar tu escondite).', lvl13: 'Usar Objeto Mágico: Puedes sintonizar 4 objetos mágicos y tienes probabilidad de no gastar cargas de pergaminos/varitas.', lvl17: 'Reflejos de Ladrón: Tienes DOS turnos completos durante la primera ronda de cada combate.' },
        { id: 'arcane_trickster', name: 'Embaucador Arcano (Arcane Trickster)', lvl3: 'Lanzamiento de Conjuros de Mago (INT) y Mano de Mago Mejorada (mano invisible que roba y distrae como acción adicional).', lvl9: 'Emboscada Mágica: Si estás Escondido al lanzar un conjuro, el objetivo tiene Desventaja en su salvación.', lvl13: 'Embaucador Versátil: Cuando usas Zancadilla con Golpe Astuto, tu Mano de Mago también derriba a un 2º objetivo.', lvl17: 'Ladrón de Conjuros: Como reacción, robas un conjuro lanzado contra ti, anulándolo y pudiendo lanzarlo tú.' },
        { id: 'soulknife', name: 'Hoja Álmica (Soulknife)', lvl3: 'Poder Psiónico (Telepatía grupal y dados psiónicos para sumar a habilidades fallidas) y Hojas Psíquicas (dagas de energía psíquica 1d6 + 1d4 acción adicional).', lvl9: 'Hojas Buscadoras (Suma dado psiónico a ataques fallidos) y Teletransporte Psíquico.', lvl13: 'Velo Psíquico: Invisibilidad psiónica durante 1 hora como acción.', lvl17: 'Mente Desgarrada: Tu Ataque Furtivo con Hojas Psíquicas aturde al objetivo (Salvación SAB).' }
      ],
      levels: {
        1: ['Pericia (Doble competencia en 2 habilidades)', 'Ataque Furtivo (+1d6 daño extra)', 'Jerga de Ladrones', 'Maestría de Armas (2 armas)'],
        2: ['Acción Astuta (Correr, Destrabarse o Esconderse como Acción Adicional en cada turno)'],
        3: ['Subclase: Arquetipo de Pícaro', 'Apuntar Firme (Como acción adicional si no te mueves, gana Ventaja en tu siguiente ataque)', 'Ataque Furtivo sube a +2d6'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)'],
        5: ['Golpe Astuto (Sacrifica 1d6 de tu Ataque Furtivo para aplicar Veneno, Derribo o Retirada)', 'Esquiva Asombrosa (Reacción para reducir a la mitad el daño de un ataque)', 'Ataque Furtivo sube a +3d6'],
        6: ['Pericia Adicional (Doble competencia en 2 habilidades más)'],
        7: ['Evasión (Salvación de DES exitosa = 0 daño; fallida = mitad)', 'Talento Fiable (En cualquier habilidad con competencia, cualquier dado menor de 9 cuenta como un 10)', 'Ataque Furtivo +4d6'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Rasgo de Subclase (Nivel 9)', 'Ataque Furtivo sube a +5d6'],
        10: ['Mejora de Característica Adicional de Pícaro (+2 Atributo o Dote General)'],
        11: ['Golpe Astuto Mejorado (Puedes aplicar 2 efectos de Golpe Astuto en el mismo impacto)', 'Ataque Furtivo sube a +6d6'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)'],
        13: ['Rasgo de Subclase (Nivel 13)', 'Ataque Furtivo sube a +7d6'],
        14: ['Golpe Retorcido (Nuevas opciones de Golpe Astuto: Atontar, Noquear y Oscurecer/Cegar)', 'Ataque Furtivo +7d6'],
        15: ['Mente Escurridiza (Ganas competencia en las tiradas de salvación de Sabiduría y Carisma)', 'Ataque Furtivo sube a +8d6'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Rasgo de Subclase (Nivel 17)', 'Ataque Furtivo sube a +9d6'],
        18: ['Elusivo (Ninguna tirada de ataque tiene Ventaja contra ti mientras no estés Incapacitado)'],
        19: ['Don Épico (Epic Boon + incremento de característica)', 'Ataque Furtivo sube a +10d6'],
        20: ['Golpe de Suerte (Una vez por descanso corto, convierte un ataque fallido en un 20 natural o una prueba fallida en un 20)']
      }
    },
    sorcerer: {
      resourceLabel: (lvl) => `Puntos de Hechicería: ${lvl >= 2 ? lvl : 0} · Hechicería Innata: +1 CD y Ventaja en ataques de conjuro`,
      subclasses: [
        { id: 'draconic', name: 'Hechicería Dracónica', lvl3: 'Resiliencia Dracónica (CA base = 10 + DES + CAR y +1 PG máximo por nivel) y Conjuros Dracónicos.', lvl6: 'Afinidad Elemental: Resistencia al elemento de tu linaje y sumas +CAR al daño de conjuros de ese elemento.', lvl14: 'Alas de Dragón: Como acción adicional despliegas alas con velocidad de vuelo de 60 pies durante 1 hora.', lvl18: 'Compañero Dragón: Lanzas Invocar Dragón sin componente material y 1 vez gratis sin Concentración.' },
        { id: 'wild_magic', name: 'Magia Salvaje', lvl3: 'Oleada de Magia Salvaje (efectos caóticos beneficiosos) y Mareas del Caos (gana Ventaja en cualquier tirada d20 a voluntad recargando la tabla).', lvl6: 'Doblegar la Suerte: Como reacción gasta 1 punto de hechicería para sumar o restar 1d4 a la tirada de otra criatura.', lvl14: 'Caos Controlado: Tiras dos veces en la tabla de Magia Salvaje y eliges cualquiera de los dos efectos.', lvl18: 'Oleada Domesticada: Elige directamente el efecto exacto que quieras de la tabla de Magia Salvaje (1/día).' },
        { id: 'aberrant', name: 'Hechicería Aberrante', lvl3: 'Mente Telepática (telepatía a 30 pies) y Conjuros Psiónicos (Disonancia, Tentáculos de Hadar, etc.).', lvl6: 'Hechicería Psiónica: Lanza tus conjuros de subclase gastando puntos de hechicería sin componentes verbales/somáticos, más resistencia psíquica.', lvl14: 'Revelación en la Carne: Gasta puntos para volar, nadar, ver lo invisible o pasar por huecos de 1 pulgada.', lvl18: 'Implosión Deformadora: Teletransporte de 120 pies que atrae y aplasta con 3d10 de fuerza a los enemigos cercanos.' },
        { id: 'clockwork', name: 'Hechicería Mecánica (Clockwork)', lvl3: 'Restaurar el Equilibrio (Reacción para anular la Ventaja o Desventaja de cualquier tirada d20 a 60 pies; usos = competencia).', lvl6: 'Bastión de la Ley: Crea un escudo de 1 a 5 d8 que absorbe daño para ti o un aliado.', lvl14: 'Trance del Orden: Durante 1 minuto ninguna tirada tiene ventaja contra ti y tu resultado mínimo en d20 es 10.', lvl18: 'Cabalgata Mecánica: Espíritus de Mechanus curan 100 PG, reparan objetos y disipan conjuros de hasta nivel 6.' }
      ],
      levels: {
        1: ['Lanzamiento de Conjuros (Carisma)', 'Hechicería Innata (2 usos como acción adicional: durante 1 minuto la CD de tus conjuros sube en +1 y tienes Ventaja en tus ataques de conjuro)'],
        2: ['Fuente de Magia (Puntos de Hechicería = Nivel; convierte espacios en puntos o puntos en espacios como acción adicional)', 'Metamagia (Elige 2 opciones: Conjuro Acelerado, Sutil, Gemelo, Cuidadoso, Potenciado, etc.)'],
        3: ['Subclase: Origen de Hechicero', 'Conjuros de Nivel 2'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)'],
        5: ['Restauración Hechicera (En Descanso Corto recuperas hasta la mitad de tu nivel en Puntos de Hechicería)', 'Conjuros de Nivel 3'],
        6: ['Rasgo de Subclase (Nivel 6)'],
        7: ['Encarnación de la Hechicería (Mientras Hechicería Innata está activa, puedes aplicar HASTA 2 Metamagias a cada conjuro, y puedes activar Hechicería Innata por 2 puntos)', 'Conjuros de Nivel 4'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Conjuros de Nivel 5 Desbloqueados'],
        10: ['Metamagia Adicional (Aprendes 2 opciones más de Metamagia, para un total de 4)'],
        11: ['Conjuros de Nivel 6 Desbloqueados'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)'],
        13: ['Conjuros de Nivel 7 Desbloqueados'],
        14: ['Rasgo de Subclase (Nivel 14)'],
        15: ['Conjuros de Nivel 8 Desbloqueados'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Metamagia Adicional (Aprendes 2 opciones más, total 6)', 'Conjuros de Nivel 9'],
        18: ['Rasgo de Subclase (Nivel 18)'],
        19: ['Don Épico (Epic Boon + incremento de característica)'],
        20: ['Apoteosis Arcana (Mientras Hechicería Innata está activa, puedes usar 1 opción de Metamagia en cada uno de tus turnos GRATIS sin gastar puntos)']
      }
    },
    warlock: {
      resourceLabel: (lvl) => `Espacios de Pacto: ${lvl >= 17 ? 4 : lvl >= 11 ? 3 : lvl >= 2 ? 2 : 1} (Nivel ${Math.min(5, Math.ceil(lvl / 2))}) · Invocaciones: ${lvl >= 18 ? 10 : lvl >= 15 ? 9 : lvl >= 12 ? 8 : lvl >= 9 ? 7 : lvl >= 7 ? 6 : lvl >= 5 ? 5 : lvl >= 2 ? 3 : 1}`,
      subclasses: [
        { id: 'fiend', name: 'Patrón Infernal (The Fiend)', lvl3: 'Bendición del Oscuro (Cuando un enemigo a 10 pies o derribado por ti cae a 0 PG, ganas CAR + nivel en PG temporales) y Bola de Fuego en lista.', lvl6: 'Suerte del Propio Oscuro: Suma +1d10 a una prueba de habilidad o tirada de salvación (usos = CAR).', lvl10: 'Resiliencia Infernal: Elige resistencia a cualquier tipo de daño (salvo fuerza) tras cada descanso corto.', lvl14: 'Lanzar a través del Infierno: Envía a un enemigo golpeado a los Nueve Infiernos durante 1 turno haciéndole 8d10 de daño psíquico.' },
        { id: 'archfey', name: 'Patrón Archihada (The Archfey)', lvl3: 'Pasos de las Hadas: Lanzas Paso Brumoso gratis (usos = CAR) aplicando efectos adicionales (PG temporales, provocar o invisibilidad).', lvl6: 'Escape Brumoso: Puedes lanzar Paso Brumoso como Reacción inmediatamente después de recibir daño.', lvl10: 'Defensas Seductoras: Inmune a Hechizado, y cuando un enemigo te golpea reduces el daño a la mitad y le devuelves el resto.', lvl14: 'Magia Embrujadora: Cada vez que lanzas un conjuro de encantamiento o ilusión, puedes usar Paso Brumoso gratis.' },
        { id: 'great_old_one', name: 'Patrón Primigenio (Great Old One)', lvl3: 'Mente Despierta (Telepatía con Ventaja/Desventaja psíquica) y Conjuros Psíquicos (puedes lanzarlos sin componentes verbales ni somáticos).', lvl6: 'Combatiente Clarividente: Crea un vínculo psíquico que impone Desventaja a los ataques de un enemigo contra ti y te da Ventaja contra él.', lvl10: 'Maleficio Sobrenatural: Conoces Maldición y el objetivo tiene Desventaja en las salvaciones del atributo elegido.', lvl14: 'Crear Siervo: Invocas una Aberración sin Concentración con PG temporales adicionales.' },
        { id: 'celestial', name: 'Patrón Celestial', lvl3: 'Luz Curativa: Reserva de 1 + nivel dados d6 para curar a aliados a 60 pies como acción adicional.', lvl6: 'Alma Radiante: Resistencia a daño radiante y sumas +CAR al daño de un conjuro de fuego o radiante.', lvl10: 'Resiliencia Celestial: Tras cada descanso corto o largo, tú y hasta 5 aliados ganáis PG temporales (nivel + CAR).', lvl14: 'Venganza Abrasadora: Cuando tú o un aliado a 60 pies caéis a 0 PG, explota luz solar curando la mitad de sus PG y cegando enemigos.' }
      ],
      levels: {
        1: ['Magia del Pacto (Espacios se recuperan en Descanso Corto)', 'Invocaciones Sobrenaturales (1 invocación a nivel 1: Pacto del Filo, de la Cadena, del Tomo o Descarga Agonizante)'],
        2: ['Astucia Mágica (Ritual de 1 minuto para recuperar la mitad de tus espacios de Magia del Pacto; 1/día)', 'Invocaciones Sobrenaturales suben a 3'],
        3: ['Subclase: Patrón de Otro Mundo', 'Espacios de Pacto suben a Nivel 2'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)'],
        5: ['Espacios de Pacto suben a Nivel 3', 'Invocaciones suben a 5 (Desbloquea Sed de Filo / Ataque Extra, Castigo Sobrenatural, etc.)'],
        6: ['Rasgo de Subclase (Nivel 6)'],
        7: ['Espacios de Pacto suben a Nivel 4', 'Invocaciones suben a 6'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Contactar Patrón (Contactar Otro Plano siempre preparado y 1 uso gratis con éxito automático)', 'Espacios de Pacto suben a Nivel 5', 'Invocaciones suben a 7'],
        10: ['Rasgo de Subclase (Nivel 10)'],
        11: ['Arcanum Místico (Nivel 6: 1 conjuro de nivel 6 gratis por descanso largo)', '3º Espacio de Magia del Pacto'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)', 'Invocaciones suben a 8 (Desbloquea Devorador de Vida: 3 ataques con Pacto del Filo)'],
        13: ['Arcanum Místico (Nivel 7: 1 conjuro de nivel 7 gratis por descanso largo)'],
        14: ['Rasgo de Subclase (Nivel 14)'],
        15: ['Arcanum Místico (Nivel 8: 1 conjuro de nivel 8 gratis por descanso largo)', 'Invocaciones suben a 9'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Arcanum Místico (Nivel 9: 1 conjuro de nivel 9 gratis por descanso largo)', '4º Espacio de Magia del Pacto'],
        18: ['Invocaciones Sobrenaturales suben a 10'],
        19: ['Don Épico (Epic Boon + incremento de característica)'],
        20: ['Maestro Sobrenatural (Tu Astucia Mágica ahora recupera TODOS tus espacios de Magia del Pacto gastados)']
      }
    },
    wizard: {
      resourceLabel: (lvl) => `Recuperación Arcana: ${Math.ceil(lvl / 2)} niveles de espacio · Conjuros en Grimorio: ${6 + (lvl - 1) * 2}+`,
      subclasses: [
        { id: 'abjurer', name: 'Abjurador (Escuela de Abjuración)', lvl3: 'Resguardo Arcano: Escudo mágico con PG = 2 × nivel + INT que absorbe daño por ti y se recarga cada vez que lanzas abjuración.', lvl6: 'Resguardo Proyectado: Usa tu Reacción para que tu Resguardo Arcano absorba el daño recibido por un aliado a 30 pies.', lvl10: 'Rompeconjuros: Siempre tienes Contrahechizo y Disipar Magia preparados, sumas competencia a sus pruebas y no gastas el espacio si fallan.', lvl14: 'Resistencia a Conjuros: Ventaja en salvaciones contra conjuros y resistencia a todo daño de conjuros.' },
        { id: 'diviner', name: 'Adivino (Escuela de Adivinación)', lvl3: 'Portento: Tras cada descanso largo tira 2 d20 y reemplaza cualquier tirada tuya, de un aliado o de un enemigo por uno de esos valores.', lvl6: 'Adivinación Experta: Cuando lanzas un conjuro de adivinación de nivel 2+, recuperas un espacio gastado de nivel inferior.', lvl10: 'El Tercer Ojo: Acción adicional para ganar Visión en la Oscuridad, Ver lo Invisible o Comprensión de Idiomas.', lvl14: 'Portento Mayor: Tiras 3 dados d20 de Portento tras cada descanso largo en lugar de 2.' },
        { id: 'evoker', name: 'Evocador (Escuela de Evocación)', lvl3: 'Truco Potente (Tus trucos infligen mitad de daño aunque el objetivo salve o falle el ataque) y Esculpir Conjuros (Tus aliados son inmunes a tus áreas de evocación).', lvl6: 'Evocación Empoderada: Suma tu modificador de Inteligencia al daño de cualquier conjuro de evocación.', lvl10: 'Canalizar en Exceso (Overchannel): Puedes maximizar automáticamente todos los dados de daño de tus conjuros de nivel 1 a 5.', lvl14: 'Resplandor Evocador: Tus conjuros de área dejan zonas de energía residual elemental.' },
        { id: 'illusionist', name: 'Ilusionista (Escuela de Ilusión)', lvl3: 'Ilusiones Mejoradas (Lanza ilusiones sin componente verbal y con +60 pies de alcance; Ilusión Menor como acción adicional).', lvl6: 'Criaturas Fantasmales: Invocar Bestia e Invocar Feérico siempre preparados y puedes lanzarlos como ilusiones con mitad de PG gratis.', lvl10: 'Ser Ilusorio: Como reacción cuando te golpean, creas un doble ilusorio haciendo que el ataque falle automáticamente.', lvl14: 'Realidad Ilusoria: Como acción adicional haces que un objeto inanimado de una de tus ilusiones se vuelva físicamente real.' }
      ],
      levels: {
        1: ['Lanzamiento de Conjuros (Inteligencia y Libro de Conjuros)', 'Adepto en Rituales (Lanza rituales desde tu libro sin tenerlos preparados)', 'Recuperación Arcana (Recupera espacios = mitad de tu nivel en Descanso Corto)'],
        2: ['Erudito (Elige Pericia en 1 habilidad académica: Arcanos, Historia, Investigación, Medicina, Naturaleza o Religión)'],
        3: ['Subclase: Tradición Arcana', 'Conjuros de Nivel 2'],
        4: ['Mejora de Característica (+2 Atributo o Dote General)'],
        5: ['Memorizar Conjuro (Tras un Descanso Corto puedes intercambiar 1 de tus conjuros preparados por otro de tu Libro de Conjuros)', 'Conjuros de Nivel 3'],
        6: ['Rasgo de Subclase (Nivel 6)'],
        7: ['Conjuros de Nivel 4 Desbloqueados'],
        8: ['Mejora de Característica (+2 Atributo o Dote General)'],
        9: ['Conjuros de Nivel 5 Desbloqueados'],
        10: ['Rasgo de Subclase (Nivel 10)'],
        11: ['Conjuros de Nivel 6 Desbloqueados'],
        12: ['Mejora de Característica (+2 Atributo o Dote General)'],
        13: ['Conjuros de Nivel 7 Desbloqueados'],
        14: ['Rasgo de Subclase (Nivel 14)'],
        15: ['Conjuros de Nivel 8 Desbloqueados'],
        16: ['Mejora de Característica (+2 Atributo o Dote General)'],
        17: ['Conjuros de Nivel 9 Desbloqueados'],
        18: ['Maestría en Conjuros (Elige 1 conjuro de nivel 1 y 1 de nivel 2 con tiempo de 1 acción; los lanzas a voluntad sin gastar espacio; cambiables tras descanso largo)'],
        19: ['Don Épico (Epic Boon + incremento de característica)'],
        20: ['Conjuros Característicos (Elige 2 conjuros de nivel 3; siempre están preparados y puedes lanzar cada uno 1 vez por descanso corto sin gastar espacio)']
      }
    }
  });
})();
