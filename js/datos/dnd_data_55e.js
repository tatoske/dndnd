/**
 * ============================================================================
 * CATÁLOGO OFICIAL DE REGLAS D&D 5.5e (2024 REVISED RULES)
 * Clases, Especies (Razas), Trasfondos, Dotes de Origen y Magia Multiclase
 * ============================================================================
 */

// 12 CLASES OFICIALES (PHB 2024)
const DND_55E_CLASSES = {
  barbarian: {
    id: 'barbarian',
    name: 'Bárbaro',
    hitDie: 12,
    saves: ['str', 'con'],
    armor: ['Armaduras ligeras', 'Armaduras medias', 'Escudos'],
    weapons: ['Armas simples', 'Armas marciales'],
    casterType: 'none',
    spellAttr: null,
    features: [
      'Furia: Entra en furia como acción adicional (2 usos/descanso largo). Ventaja en tiradas y salvaciones de Fuerza, +2 al daño de Fuerza, resistencia a daño contundente, perforante y cortante.',
      'Defensa sin armadura: Si no llevas armadura, tu CA base es 10 + mod DES + mod CON (puedes usar escudo).',
      'Dominio de armas: Tienes acceso a las propiedades de maestría de 2 tipos de armas con las que seas competente.'
    ]
  },
  bard: {
    id: 'bard',
    name: 'Bardo',
    hitDie: 8,
    saves: ['dex', 'cha'],
    armor: ['Armaduras ligeras'],
    weapons: ['Armas simples'],
    casterType: 'full',
    spellAttr: 'cha',
    features: [
      'Lanzamiento de conjuros: Carisma es tu característica para conjuros de bardo.',
      'Inspiración bárdica: Como acción adicional, otorga un dado d6 de Inspiración a un aliado a 60 pies (usos = mod CAR, mín 1). Se suma a ataques, pruebas de habilidad o salvaciones.'
    ]
  },
  cleric: {
    id: 'cleric',
    name: 'Clérigo',
    hitDie: 8,
    saves: ['wis', 'cha'],
    armor: ['Armaduras ligeras', 'Armaduras medias', 'Escudos'],
    weapons: ['Armas simples'],
    casterType: 'full',
    spellAttr: 'wis',
    features: [
      'Lanzamiento de conjuros: Sabiduría es tu característica para conjuros divinos de clérigo.',
      'Orden divina: Elige Protector (competencia en armas marciales y armaduras pesadas) o Erudito (añade tu mod SAB a pruebas de Arcanos o Religión).'
    ]
  },
  druid: {
    id: 'druid',
    name: 'Druida',
    hitDie: 8,
    saves: ['int', 'wis'],
    armor: ['Armaduras ligeras', 'Escudos'],
    weapons: ['Armas simples'],
    casterType: 'full',
    spellAttr: 'wis',
    features: [
      'Lanzamiento de conjuros: Sabiduría es tu característica mágica primigenia.',
      'Orden primigenia: Elige Magia (aprende 1 truco adicional de druida y bonificación a Naturaleza) o Guardián (competencia en armaduras medias y armas marciales).'
    ]
  },
  fighter: {
    id: 'fighter',
    name: 'Guerrero',
    hitDie: 10,
    saves: ['str', 'con'],
    armor: ['Armaduras ligeras', 'Armaduras medias', 'Armaduras pesadas', 'Escudos'],
    weapons: ['Armas simples', 'Armas marciales'],
    casterType: 'none',
    spellAttr: null,
    features: [
      'Tomar aliento (Second Wind): Como acción adicional, recupera 1d10 + nivel de guerrero en PG (2 usos/descanso largo).',
      'Estilo de combate: Obtienes una dote de Estilo de Combate (Defensa, Duelo, Tiro con arco, Gran arma, etc.).',
      'Dominio de armas: Tienes acceso a las propiedades de maestría de 3 tipos de armas con las que seas competente.'
    ]
  },
  monk: {
    id: 'monk',
    name: 'Monje',
    hitDie: 8,
    saves: ['str', 'dex'],
    armor: ['Ninguna'],
    weapons: ['Armas simples', 'Espadas cortas'],
    casterType: 'none',
    spellAttr: null,
    features: [
      'Defensa sin armadura: Si no llevas armadura ni escudo, tu CA base es 10 + mod DES + mod SAB.',
      'Artes marciales: Dado marcial d6. Puedes usar Destreza para ataques y daño desarmados/armas de monje, y realizar un golpe desarmado como acción adicional.'
    ]
  },
  paladin: {
    id: 'paladin',
    name: 'Paladín',
    hitDie: 10,
    saves: ['wis', 'cha'],
    armor: ['Armaduras ligeras', 'Armaduras medias', 'Armaduras pesadas', 'Escudos'],
    weapons: ['Armas simples', 'Armas marciales'],
    casterType: 'half',
    spellAttr: 'cha',
    features: [
      'Imposición de manos: Reserva curativa de PG igual a 5 × nivel de paladín.',
      'Lanzamiento de conjuros: Carisma es tu característica mágica (en 5.5e inicia a nivel 1).',
      'Dominio de armas: Acceso a la maestría de 2 tipos de armas.'
    ]
  },
  ranger: {
    id: 'ranger',
    name: 'Explorador',
    hitDie: 10,
    saves: ['str', 'dex'],
    armor: ['Armaduras ligeras', 'Armaduras medias', 'Escudos'],
    weapons: ['Armas simples', 'Armas marciales'],
    casterType: 'half',
    spellAttr: 'wis',
    features: [
      'Lanzamiento de conjuros: Sabiduría es tu característica mágica (en 5.5e inicia a nivel 1).',
      'Enemigo predilecto: Puedes lanzar Marca del Cazador sin gastar espacio de conjuro (2 veces/descanso largo).',
      'Dominio de armas: Acceso a la maestría de 2 tipos de armas.'
    ]
  },
  rogue: {
    id: 'rogue',
    name: 'Pícaro',
    hitDie: 8,
    saves: ['dex', 'int'],
    armor: ['Armaduras ligeras'],
    weapons: ['Armas simples', 'Armas marciales sutiles o a distancia'],
    casterType: 'none',
    spellAttr: null,
    features: [
      'Ataque furtivo: Una vez por turno, inflige +1d6 de daño extra a una criatura si tienes ventaja en el ataque o si un aliado está a 5 pies.',
      'Pericia (Expertise): Duplica tu bonificador de competencia en 2 habilidades con las que seas competente.',
      'Jerga de ladrones: Lenguaje de códigos secretos, señas y marcas criminales.',
      'Dominio de armas: Acceso a la maestría de 2 tipos de armas.'
    ]
  },
  sorcerer: {
    id: 'sorcerer',
    name: 'Hechicero',
    hitDie: 6,
    saves: ['con', 'cha'],
    armor: ['Ninguna'],
    weapons: ['Armas simples'],
    casterType: 'full',
    spellAttr: 'cha',
    features: [
      'Lanzamiento de conjuros: Carisma es tu característica para conjuros innatos.',
      'Furia hechicera (Innate Sorcery): Como acción adicional, desata magia durante 1 minuto (2 veces/descanso largo): ventaja en tiradas de ataque de conjuros de hechicero y +1 a la CD de salvación de tus conjuros.'
    ]
  },
  warlock: {
    id: 'warlock',
    name: 'Brujo',
    hitDie: 8,
    saves: ['wis', 'cha'],
    armor: ['Armaduras ligeras'],
    weapons: ['Armas simples'],
    casterType: 'warlock',
    spellAttr: 'cha',
    features: [
      'Magia del pacto: Espacios de conjuro de nivel máximo fijo que se recargan por completo con un descanso corto (Carisma).',
      'Invocaciones sobrenaturales: Obtienes 1 invocación sobrenatural a nivel 1 (Pacto del filo, del tomo o de la cadena).'
    ]
  },
  wizard: {
    id: 'wizard',
    name: 'Mago',
    hitDie: 6,
    saves: ['int', 'wis'],
    armor: ['Ninguna'],
    weapons: ['Armas simples'],
    casterType: 'full',
    spellAttr: 'int',
    features: [
      'Lanzamiento de conjuros: Inteligencia es tu característica mágica de estudio arcano.',
      'Libro de conjuros: Comienzas con un libro que contiene 6 conjuros de nivel 1.',
      'Recuperación arcana: Una vez al día tras un descanso corto, recuperas espacios de conjuro gastados cuya suma de niveles sea hasta la mitad de tu nivel de mago.'
    ]
  }
};

// 10 ESPECIES OFICIALES (PHB 2024)
const DND_55E_SPECIES = {
  human: {
    id: 'human',
    name: 'Humano',
    speed: 30,
    size: 'Mediano o Pequeño',
    traits: [
      'Ingenio ingenioso (Resourceful): Obtienes Inspiración heroica cada vez que finalizas un descanso largo.',
      'Habilidoso (Skillful): Obtienes competencia en una habilidad adicional a tu elección.',
      'Versátil (Versatile): Obtienes una Dote de Origen adicional a tu elección.'
    ]
  },
  elf: {
    id: 'elf',
    name: 'Elfo',
    speed: 30,
    size: 'Mediano',
    skillGrant: 'perception',
    traits: [
      'Visión en la oscuridad (60 pies).',
      'Sentidos agudos: Competencia en la habilidad Percepción.',
      'Ascendencia feérica: Ventaja en salvaciones para evitar o terminar el estado hechizado.',
      'Trance: No necesitas dormir; un descanso largo requiere únicamente 4 horas de meditación consciente.'
    ]
  },
  dwarf: {
    id: 'dwarf',
    name: 'Enano',
    speed: 30,
    size: 'Mediano',
    hpBonusPerLevel: 1,
    traits: [
      'Visión en la oscuridad (120 pies).',
      'Resiliencia enana: Resistencia al daño de veneno y ventaja en tiradas de salvación contra veneno.',
      'Dureza enana: Tu máximo de Puntos de Golpe aumenta en 1 por cada nivel que poseas.',
      'Afinidad con la piedra: Como acción adicional, obtienes visión temblorosa a 60 pies sobre piedra durante 10 minutos.'
    ]
  },
  halfling: {
    id: 'halfling',
    name: 'Mediano',
    speed: 30,
    size: 'Pequeño',
    traits: [
      'Afortunado (Lucky): Cuando obtengas un 1 en un d20 en un ataque, prueba de habilidad o salvación, puedes volver a tirar el dado y usar el nuevo resultado.',
      'Valiente: Ventaja en tiradas de salvación para evitar o terminar el estado asustado.',
      'Agilidad de mediano: Puedes moverte a través del espacio de cualquier criatura de tamaño mayor al tuyo.'
    ]
  },
  gnome: {
    id: 'gnome',
    name: 'Gnomo',
    speed: 30,
    size: 'Pequeño',
    traits: [
      'Visión en la oscuridad (60 pies).',
      'Astucia gnómica: Ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma.'
    ]
  },
  dragonborn: {
    id: 'dragonborn',
    name: 'Dracónido',
    speed: 30,
    size: 'Mediano',
    traits: [
      'Visión en la oscuridad (60 pies).',
      'Arma de aliento: Exhala energía elemental (cono de 15 pies o línea de 30 pies) infligiendo 1d10 de daño (aumenta a niveles mayores). Reemplaza un ataque.',
      'Resistencia dracónica: Resistencia al tipo de daño correspondiente a tu ancestro dracónico.'
    ]
  },
  tiefling: {
    id: 'tiefling',
    name: 'Tiflin',
    speed: 30,
    size: 'Mediano o Pequeño',
    traits: [
      'Visión en la oscuridad (60 pies).',
      'Legado infernal: Resistencia al daño (Fuego, Veneno o Necrótico según tu linaje abisal, ctónico o infernal) y conjuros innatos (incluye truco Taumaturgia).'
    ]
  },
  orc: {
    id: 'orc',
    name: 'Orco',
    speed: 30,
    size: 'Mediano',
    traits: [
      'Visión en la oscuridad (120 pies).',
      'Adrenalina (Adrenaline Rush): Puedes usar Correr como acción adicional y ganar PG temporales iguales a tu bono de competencia (usos = bono de competencia/descanso largo).',
      'Resistencia implacable: Cuando quedes reducido a 0 PG sin morir instantáneamente, quedas a 1 PG en su lugar (1 vez/descanso largo).'
    ]
  },
  goliath: {
    id: 'goliath',
    name: 'Goliat',
    speed: 35,
    size: 'Mediano',
    traits: [
      'Velocidad mejorada: 35 pies.',
      'Linaje gigante: Otorga una habilidad sobrenatural según tu ancestro (Nube, Fuego, Escarcha, Colina, Piedra o Tormenta).',
      'Forma grande: A nivel 5 puedes cambiar tu tamaño a Grande como acción adicional.'
    ]
  },
  aasimar: {
    id: 'aasimar',
    name: 'Aasimar',
    speed: 30,
    size: 'Mediano o Pequeño',
    traits: [
      'Visión en la oscuridad (60 pies).',
      'Resistencia celestial: Resistencia al daño necrótico y al daño radiante.',
      'Manos sanadoras: Como acción, toca a una criatura para que recupere dados d4 de PG iguales a tu bono de competencia (1 vez/descanso largo).'
    ]
  }
};

// 16 TRASFONDOS OFICIALES (PHB 2024)
const DND_55E_BACKGROUNDS = {
  acolyte: {
    id: 'acolyte',
    name: 'Acólito',
    skills: ['insight', 'religion'],
    tool: 'Kit de caligrafía',
    originFeat: 'Iniciado en la magia (Clérigo)',
    featDesc: 'Aprende 2 trucos y 1 conjuro de nivel 1 de clérigo que puedes lanzar gratis 1 vez por descanso largo.',
    abilityOptions: ['int', 'wis', 'cha']
  },
  artisan: {
    id: 'artisan',
    name: 'Artesano',
    skills: ['investigation', 'persuasion'],
    tool: 'Herramientas de artesano',
    originFeat: 'Artesano hábil (Crafter)',
    featDesc: 'Fabrica objetos no mágicos un 20% más rápido y con 20% de descuento en el costo de materiales.',
    abilityOptions: ['str', 'dex', 'int']
  },
  charlatan: {
    id: 'charlatan',
    name: 'Charlatán',
    skills: ['deception', 'sleight_of_hand'],
    tool: 'Kit de disfraz',
    originFeat: 'Hábil (Skilled)',
    featDesc: 'Obtienes competencia en 3 habilidades o herramientas adicionales a tu elección.',
    abilityOptions: ['dex', 'con', 'cha']
  },
  criminal: {
    id: 'criminal',
    name: 'Criminal',
    skills: ['sleight_of_hand', 'stealth'],
    tool: 'Herramientas de ladrón',
    originFeat: 'Alerta (Alert)',
    featDesc: 'Suma tu bonificador de competencia a la iniciativa. Tras tirar iniciativa, puedes intercambiarla con un aliado dispuesto.',
    abilityOptions: ['dex', 'con', 'int']
  },
  entertainer: {
    id: 'entertainer',
    name: 'Bufón / Artista',
    skills: ['acrobatics', 'performance'],
    tool: 'Instrumento musical',
    originFeat: 'Músico (Musician)',
    featDesc: 'Tras un descanso corto o largo, toca un instrumento para conceder Inspiración heroica a aliados (hasta tu bono de competencia).',
    abilityOptions: ['str', 'dex', 'cha']
  },
  farmer: {
    id: 'farmer',
    name: 'Granjero',
    skills: ['animal_handling', 'nature'],
    tool: 'Herramientas de carpintero',
    originFeat: 'Duro (Tough)',
    featDesc: 'Tu máximo de Puntos de Golpe aumenta en 2 por cada nivel de personaje que poseas.',
    abilityOptions: ['str', 'con', 'wis']
  },
  guard: {
    id: 'guard',
    name: 'Guardia',
    skills: ['athletics', 'perception'],
    tool: 'Juego de dados',
    originFeat: 'Alerta (Alert)',
    featDesc: 'Suma tu bonificador de competencia a la iniciativa y puedes intercambiarla con un aliado dispuesto.',
    abilityOptions: ['str', 'int', 'wis']
  },
  guide: {
    id: 'guide',
    name: 'Guía',
    skills: ['stealth', 'survival'],
    tool: 'Herramientas de cartógrafo',
    originFeat: 'Iniciado en la magia (Druida)',
    featDesc: 'Aprende 2 trucos y 1 conjuro de nivel 1 de druida.',
    abilityOptions: ['dex', 'con', 'wis']
  },
  hermit: {
    id: 'hermit',
    name: 'Ermitaño',
    skills: ['medicine', 'religion'],
    tool: 'Kit de herboristería',
    originFeat: 'Curandero (Healer)',
    featDesc: 'Vuelve a tirar 1s al usar botiquines. Como acción, gasta un uso de botiquín para que una criatura recupere 1d4 + mod SAB en PG.',
    abilityOptions: ['con', 'wis', 'cha']
  },
  merchant: {
    id: 'merchant',
    name: 'Mercader',
    skills: ['animal_handling', 'persuasion'],
    tool: 'Herramientas de navegador',
    originFeat: 'Afortunado (Lucky)',
    featDesc: 'Puntos de suerte iguales a tu bono de competencia para obtener ventaja en pruebas o imponer desventaja a ataques recibidos.',
    abilityOptions: ['con', 'int', 'cha']
  },
  noble: {
    id: 'noble',
    name: 'Noble',
    skills: ['history', 'persuasion'],
    tool: 'Juego de ajedrez dragón',
    originFeat: 'Hábil (Skilled)',
    featDesc: 'Obtienes competencia en 3 habilidades o herramientas adicionales a tu elección.',
    abilityOptions: ['str', 'int', 'cha']
  },
  sage: {
    id: 'sage',
    name: 'Erudito',
    skills: ['arcana', 'history'],
    tool: 'Kit de caligrafía',
    originFeat: 'Iniciado en la magia (Mago)',
    featDesc: 'Aprende 2 trucos y 1 conjuro de nivel 1 de mago (Inteligencia).',
    abilityOptions: ['con', 'int', 'wis']
  },
  sailor: {
    id: 'sailor',
    name: 'Marinero',
    skills: ['athletics', 'perception'],
    tool: 'Herramientas de navegador',
    originFeat: 'Peleador de taberna (Tavern Brawler)',
    featDesc: 'Tus golpes desarmados hacen 1d4 + mod FUE y puedes empujar 5 pies a un objetivo impactado una vez por turno.',
    abilityOptions: ['str', 'dex', 'con']
  },
  scribe: {
    id: 'scribe',
    name: 'Escriba',
    skills: ['investigation', 'perception'],
    tool: 'Kit de caligrafía',
    originFeat: 'Hábil (Skilled)',
    featDesc: 'Obtienes competencia en 3 habilidades o herramientas a tu elección.',
    abilityOptions: ['dex', 'int', 'wis']
  },
  soldier: {
    id: 'soldier',
    name: 'Soldado',
    skills: ['athletics', 'intimidation'],
    tool: 'Juego de cartas',
    originFeat: 'Atacante salvaje (Savage Attacker)',
    featDesc: 'Una vez por turno al golpear con un arma, tira el daño dos veces y usa el resultado más alto.',
    abilityOptions: ['str', 'dex', 'con']
  },
  wayfarer: {
    id: 'wayfarer',
    name: 'Huérfano / Trotamundos',
    skills: ['insight', 'stealth'],
    tool: 'Herramientas de ladrón',
    originFeat: 'Afortunado (Lucky)',
    featDesc: 'Puntos de suerte iguales a tu bono de competencia.',
    abilityOptions: ['dex', 'wis', 'cha']
  }
};

// TABLA DE ESPACIOS DE CONJUROS MULTICLASE (D&D 5.5e 2024)
// Array de espacios para niveles 1 al 9 según el Caster Level (1 a 20)
const DND_55E_MULTICLASS_SPELL_SLOTS = {
  1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// TABLA DE ESPACIOS DE MAGIA DEL PACTO (WARLOCK 5.5e)
const DND_55E_WARLOCK_SLOTS = {
  1:  { slots: 1, level: 1 },
  2:  { slots: 2, level: 1 },
  3:  { slots: 2, level: 2 },
  4:  { slots: 2, level: 2 },
  5:  { slots: 2, level: 3 },
  6:  { slots: 2, level: 3 },
  7:  { slots: 2, level: 4 },
  8:  { slots: 2, level: 4 },
  9:  { slots: 2, level: 5 },
  10: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  12: { slots: 3, level: 5 },
  13: { slots: 3, level: 5 },
  14: { slots: 3, level: 5 },
  15: { slots: 3, level: 5 },
  16: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 },
  18: { slots: 4, level: 5 },
  19: { slots: 4, level: 5 },
  20: { slots: 4, level: 5 }
};

// 14 CONDICIONES Y ESTADOS OFICIALES (D&D 5.5e)
const DND_55E_CONDITIONS = [
  { id: 'blinded', name: 'Cegado', desc: 'Fallas automáticamente pruebas que requieran visión. Las tiradas de ataque contra ti tienen ventaja, y tus tiradas de ataque tienen desventaja.' },
  { id: 'charmed', name: 'Hechizado', desc: 'No puedes atacar al que te hechizó ni tenerlo como objetivo de habilidades o efectos dañinos. El encantador tiene ventaja en pruebas sociales contigo.' },
  { id: 'deafened', name: 'Ensordecido', desc: 'Fallas automáticamente cualquier prueba de característica que requiera oír.' },
  { id: 'frightened', name: 'Asustado', desc: 'Desventaja en pruebas de característica y tiradas de ataque mientras la fuente de tu miedo esté en tu línea de visión. No puedes acercarte voluntariamente a ella.' },
  { id: 'grappled', name: 'Agarrado', desc: 'Tu velocidad pasa a ser 0 y no puedes beneficiarte de ningún bonificador a tu velocidad.' },
  { id: 'incapacitated', name: 'Incapacitado', desc: 'No puedes realizar acciones ni reacciones. Pierdes la concentración en conjuros.' },
  { id: 'invisible', name: 'Invisible', desc: 'Imposible de ver sin ayuda mágica. Tienes ventaja en tiradas de ataque y los ataques contra ti tienen desventaja.' },
  { id: 'paralyzed', name: 'Paralizado', desc: 'Estás incapacitado y no puedes moverte ni hablar. Fallas salvaciones de FUE y DES. Ataques contra ti tienen ventaja y cualquier impacto a 5 pies es crítico automático.' },
  { id: 'petrified', name: 'Petrificado', desc: 'Transformado en sustancia sólida inanimada. Peso x10. Resistencia a todo daño, inmune a veneno.' },
  { id: 'poisoned', name: 'Envenenado', desc: 'Tienes desventaja en tiradas de ataque y en pruebas de característica.' },
  { id: 'prone', name: 'Derribado', desc: 'Tu única opción de movimiento es arrastrarte (o levantarte gastando la mitad de tu velocidad). Desventaja en tus ataques. Ataques contra ti tienen ventaja si el atacante está a 5 pies (desventaja si está a más distancia).' },
  { id: 'restrained', name: 'Apresado', desc: 'Velocidad 0. Tus tiradas de ataque tienen desventaja y los ataques contra ti tienen ventaja. Desventaja en salvaciones de Destreza.' },
  { id: 'stunned', name: 'Aturdido', desc: 'Estás incapacitado, no puedes moverte y hablas con dificultad. Fallas salvaciones de FUE y DES. Ataques contra ti tienen ventaja.' },
  { id: 'unconscious', name: 'Inconsciente', desc: 'Incapacitado, sueltas lo que sostengas y caes derribado. Fallas salvaciones de FUE y DES. Ataques contra ti tienen ventaja y golpes a 5 pies son críticos automáticos.' }
];

// COMPENDIO OFICIAL DE ARMAS D&D 5.5e (2024)
const DND_55E_WEAPONS_COMPENDIUM = [
  { id: 'dagger', name: 'Daga', dmg: '1d4 perforante', master: 'Nick', props: 'Sutil, Ligera, Arrojadiza (20/60)' },
  { id: 'shortsword', name: 'Espada corta', dmg: '1d6 perforante', master: 'Vex', props: 'Sutil, Ligera' },
  { id: 'scimitar', name: 'Cimitarra', dmg: '1d6 cortante', master: 'Nick', props: 'Sutil, Ligera' },
  { id: 'longsword', name: 'Espada larga', dmg: '1d8 cortante (1d10 versátil)', master: 'Sap', props: 'Versátil' },
  { id: 'greatsword', name: 'Mandoble', dmg: '2d6 cortante', master: 'Graze', props: 'Pesada, Dos manos' },
  { id: 'rapier', name: 'Estoque', dmg: '1d8 perforante', master: 'Vex', props: 'Sutil' },
  { id: 'mace', name: 'Maza', dmg: '1d6 contundente', master: 'Sap', props: 'Simple' },
  { id: 'warhammer', name: 'Martillo de guerra', dmg: '1d8 contundente (1d10 versátil)', master: 'Push', props: 'Versátil' },
  { id: 'halberd', name: 'Alabarda', dmg: '1d10 cortante', master: 'Cleave', props: 'Pesada, Alcance, Dos manos' },
  { id: 'greataxe', name: 'Gran hacha', dmg: '1d12 cortante', master: 'Cleave', props: 'Pesada, Dos manos' },
  { id: 'shortbow', name: 'Arco corto', dmg: '1d6 perforante', master: 'Vex', props: 'Dos manos, Munición (80/320)' },
  { id: 'longbow', name: 'Arco largo', dmg: '1d8 perforante', master: 'Slow', props: 'Pesada, Dos manos, Munición (150/600)' },
  { id: 'light_crossbow', name: 'Ballesta ligera', dmg: '1d8 perforante', master: 'Slow', props: 'Dos manos, Carga, Munición (80/320)' },
  { id: 'hand_crossbow', name: 'Ballesta de mano', dmg: '1d6 perforante', master: 'Vex', props: 'Ligera, Carga, Munición (30/120)' },
  { id: 'quarterstaff', name: 'Bastón', dmg: '1d6 contundente (1d8 versátil)', master: 'Topple', props: 'Versátil' },
  { id: 'unarmed', name: 'Golpe desarmado', dmg: '1 + FUE contundente', master: 'Topple/Push', props: 'Contundente' }
];

// COMPENDIO OFICIAL DE CONJUROS Y TRUCOS D&D 5.5e
const DND_55E_SPELLS_COMPENDIUM = [
  // TRUCOS (NIVEL 0)
  { level: 0, name: 'Descarga de Fuego (Fire Bolt)', school: 'Evocación', time: '1 Acción', range: '120 pies', desc: 'Ataque de conjuro a distancia; 1d10 daño de fuego (sube a 2d10 a nivel 5).' },
  { level: 0, name: 'Rayo de Escarcha (Ray of Frost)', school: 'Evocación', time: '1 Acción', range: '60 pies', desc: 'Ataque de conjuro a distancia; 1d8 daño de frío y reduce la velocidad del objetivo en 10 pies.' },
  { level: 0, name: 'Mano de Mago (Mage Hand)', school: 'Conjuración', time: '1 Acción', range: '30 pies', desc: 'Mano espectral flotante capaz de manipular objetos y abrir puertas.' },
  { level: 0, name: 'Luz (Light)', school: 'Evocación', time: '1 Acción', range: 'Toque', desc: 'Hace brillar un objeto con luz brillante en 20 pies y tenue en 20 adicionales por 1 hora.' },
  { level: 0, name: 'Taumaturgia (Thaumaturgy)', school: 'Transmutación', time: '1 Acción', range: '30 pies', desc: 'Manifestación sobrenatural: amplificar voz x3, abrir puertas, temblores o llamas que cambian.' },
  { level: 0, name: 'Guía (Guidance)', school: 'Adivinación', time: '1 Acción', range: 'Toque', desc: 'Concentración (1 min). La criatura suma 1d4 a una prueba de característica a su elección.' },
  { level: 0, name: 'Piedad con los Moribundos (Spare the Dying)', school: 'Nigromancia', time: '1 Acción', range: 'Toque', desc: 'Estabiliza a una criatura viviente a 0 Puntos de Golpe sin tirar medicina.' },
  { level: 0, name: 'Llama Sagrada (Sacred Flame)', school: 'Evocación', time: '1 Acción', range: '60 pies', desc: 'Salvación de Destreza; 1d8 daño radiante ignorando cobertura.' },
  { level: 0, name: 'Rociada Venenosa (Poison Spray)', school: 'Nigromancia', time: '1 Acción', range: '30 pies', desc: 'Ataque de conjuro; 1d12 de daño de veneno.' },
  { level: 0, name: 'Ilusión Menor (Minor Illusion)', school: 'Ilusión', time: '1 Acción', range: '30 pies', desc: 'Crea un sonido o una imagen visual de un objeto de hasta 5 pies.' },
  { level: 0, name: 'Prestidigitación (Prestidigitation)', school: 'Transmutación', time: '1 Acción', range: '10 pies', desc: 'Pequeños trucos sensoriales, encender velas, limpiar o calentar comida.' },
  { level: 0, name: 'Burla Cruel (Vicious Mockery)', school: 'Encantamiento', time: '1 Acción', range: '60 pies', desc: 'Salvación de Sabiduría; 1d4 daño psíquico y desventaja en su siguiente ataque.' },
  { level: 0, name: 'Descarga Sobrenatural (Eldritch Blast)', school: 'Evocación', time: '1 Acción', range: '120 pies', desc: 'Ataque de conjuro a distancia; 1d10 daño de fuerza (haces múltiples a niveles 5, 11 y 17).' },

  // NIVEL 1
  { level: 1, name: 'Proyectil Mágico (Magic Missile)', school: 'Evocación', time: '1 Acción', range: '120 pies', desc: '3 dardos que impactan automáticamente infligiendo 1d4 + 1 de daño de fuerza cada uno.' },
  { level: 1, name: 'Escudo (Shield)', school: '1 Reacción', range: 'Personal', desc: '+5 a la CA hasta el inicio de tu siguiente turno e inmunidad a Proyectil Mágico.' },
  { level: 1, name: 'Armadura de Mago (Mage Armor)', school: 'Abjuración', time: '1 Acción', range: 'Toque', desc: 'La CA base de la criatura se convierte en 13 + mod DES durante 8 horas.' },
  { level: 1, name: 'Curar Heridas (Cure Wounds)', school: 'Abjuración', time: '1 Acción', range: 'Toque', desc: 'En 5.5e cura 2d8 + mod característica a una criatura que toques.' },
  { level: 1, name: 'Palabra de Curación (Healing Word)', school: '1 Acción Adicional', range: '60 pies', desc: 'En 5.5e cura 2d4 + mod característica a distancia.' },
  { level: 1, name: 'Bendición (Bless)', school: 'Encantamiento', time: '1 Acción', range: '30 pies', desc: 'Concentración. Hasta 3 criaturas suman 1d4 a tiradas de ataque y salvaciones.' },
  { level: 1, name: 'Onda Atronadora (Thunderwave)', school: 'Evocación', time: '1 Acción', range: 'Cubo de 15 pies', desc: '2d8 daño de trueno y empuja 10 pies (salvación de Constitución mitad).' },
  { level: 1, name: 'Marca del Cazador (Hunter\'s Mark)', school: 'Adivinación', time: '1 Acción Adicional', range: '90 pies', desc: 'Concentración. Infliges +1d6 daño de fuerza cada vez que golpees al objetivo con un arma.' },
  { level: 1, name: 'Reprensión Infernal (Hellish Rebuke)', school: '1 Reacción', range: '60 pies', desc: 'Reacciona al recibir daño infligiendo 2d10 de daño de fuego al atacante (salv. DES mitad).' },
  { level: 1, name: 'Manos Ardientes (Burning Hands)', school: 'Evocación', time: '1 Acción', range: 'Cono de 15 pies', desc: '3d6 de daño de fuego a criaturas en el cono (salv. DES mitad).' },

  // NIVEL 2
  { level: 2, name: 'Rayo Abrasador (Scorching Ray)', school: 'Evocación', time: '1 Acción', range: '120 pies', desc: 'Dispara 3 rayos de fuego; cada impacto inflige 2d6 de daño de fuego.' },
  { level: 2, name: 'Paso Brumoso (Misty Step)', school: 'Conjuración', time: '1 Acción Adicional', range: 'Personal', desc: 'Teletranspórtate instantáneamente hasta 30 pies a un espacio desocupado que puedas ver.' },
  { level: 2, name: 'Hacer Añicos (Shatter)', school: 'Evocación', time: '1 Acción', range: '60 pies', desc: 'Esfera de 10 pies; 3d8 de daño de trueno (salvación de CON mitad).' },
  { level: 2, name: 'Restauración Menor (Lesser Restoration)', school: 'Abjuración', time: '1 Acción Adicional', range: 'Toque', desc: 'Termina una enfermedad o una condición: cegado, ensordecido, paralizado o envenenado.' },
  { level: 2, name: 'Invisibilidad (Invisibility)', school: 'Ilusión', time: '1 Acción', range: 'Toque', desc: 'Concentración (hasta 1 hora). Una criatura se vuelve invisible hasta que ataque o lance un conjuro.' },

  // NIVEL 3
  { level: 3, name: 'Bola de Fuego (Fireball)', school: 'Evocación', time: '1 Acción', range: '150 pies', desc: 'Esfera de 20 pies; 8d6 de daño de fuego (salvación de DES mitad).' },
  { level: 3, name: 'Contraconjuro (Counterspell)', school: 'Abjuración', time: '1 Reacción', range: '60 pies', desc: 'En 5.5e obliga a una salvación de Constitución al lanzador objetivo; si falla, el conjuro se disipa.' },
  { level: 3, name: 'Relámpago (Lightning Bolt)', school: 'Evocación', time: '1 Acción', range: 'Línea de 100 pies', desc: 'Línea de 100x5 pies; 8d6 de daño de electricidad (salv. DES mitad).' },
  { level: 3, name: 'Revivir (Revivify)', school: 'Nigromancia', time: '1 Acción', range: 'Toque', desc: 'Devuelve a la vida a una criatura muerta hace menos de 1 minuto con 1 PG (consume diamante de 300 PO).' },
  { level: 3, name: 'Volar (Fly)', school: 'Transmutación', time: '1 Acción', range: 'Toque', desc: 'Concentración. Otorga velocidad de vuelo de 60 pies a la criatura.' }
];

// COMPATIBILIDAD UMD (NAVEGADOR + NODE.JS)
if (typeof window !== 'undefined') {
  window.DND_55E_CLASSES = DND_55E_CLASSES;
  window.DND_55E_SPECIES = DND_55E_SPECIES;
  window.DND_55E_BACKGROUNDS = DND_55E_BACKGROUNDS;
  window.DND_55E_MULTICLASS_SPELL_SLOTS = DND_55E_MULTICLASS_SPELL_SLOTS;
  window.DND_55E_WARLOCK_SLOTS = DND_55E_WARLOCK_SLOTS;
  window.DND_55E_CONDITIONS = DND_55E_CONDITIONS;
  window.DND_55E_WEAPONS_COMPENDIUM = DND_55E_WEAPONS_COMPENDIUM;
  window.DND_55E_SPELLS_COMPENDIUM = DND_55E_SPELLS_COMPENDIUM;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DND_55E_CLASSES,
    DND_55E_SPECIES,
    DND_55E_BACKGROUNDS,
    DND_55E_MULTICLASS_SPELL_SLOTS,
    DND_55E_WARLOCK_SLOTS,
    DND_55E_CONDITIONS,
    DND_55E_WEAPONS_COMPENDIUM,
    DND_55E_SPELLS_COMPENDIUM
  };
}
