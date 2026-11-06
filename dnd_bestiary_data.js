/**
 * ============================================================================
 * BESTIARIO OFICIAL DE MONSTRUOS Y COMPENDIO DE LIBROS OFICIALES D&D 5e / 5.5e
 * Bloques de estadísticas (Statblocks), Manuales Oficiales, Objetos Mágicos y Dotes
 * ============================================================================
 */

const DND_OFFICIAL_BESTIARY = [
  {
    id: 'kobold', name: 'Kóbold Guerrero', size: 'Pequeño', type: 'Dragón / Humanoide', align: 'Legal Malvado',
    cr: '1/8', crNum: 0.125, xp: 25, ac: '12', hp: 5, hitFormula: '2d6-2', speed: '30 pies',
    stats: [7, 15, 9, 8, 7, 8], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 8',
    immunities: 'Sensibilidad a la luz solar', book: 'Monster Manual (MM)',
    traits: ['Tácticas de Manada: Tiene ventaja en las tiradas de ataque contra una criatura si al menos un aliado del kóbold está a 5 pies de ella.'],
    actions: [
      { name: 'Daga', roll: '1d4+2', hit: '+4 al ataque', desc: 'Alcance 5 pies. Impacto: 4 (1d4 + 2) de daño perforante.' },
      { name: 'Honda', roll: '1d4+2', hit: '+4 al ataque', desc: 'Distancia 30/120 pies. Impacto: 4 (1d4 + 2) de daño contundente.' }
    ]
  },
  {
    id: 'goblin', name: 'Trasgo (Goblin)', size: 'Pequeño', type: 'Feérico / Humanoide', align: 'Neutral Malvado',
    cr: '1/4', crNum: 0.25, xp: 50, ac: '15 (Cuero, Escudo)', hp: 7, hitFormula: '2d6', speed: '30 pies',
    stats: [8, 14, 10, 10, 8, 8], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 9',
    immunities: 'Sigilo +6', book: 'Monster Manual (MM)',
    traits: ['Huida Ágil (Nimble Escape): El trasgo puede realizar la acción de Destrabarse (Disengage) o Esconderse (Hide) como Acción Adicional en cada uno de sus turnos.'],
    actions: [
      { name: 'Cimitarra', roll: '1d6+2', hit: '+4 al ataque', desc: 'Alcance 5 pies. Impacto: 5 (1d6 + 2) de daño cortante.' },
      { name: 'Arco Corto', roll: '1d6+2', hit: '+4 al ataque', desc: 'Distancia 80/320 pies. Impacto: 5 (1d6 + 2) de daño perforante.' }
    ]
  },
  {
    id: 'skeleton', name: 'Esqueleto', size: 'Mediano', type: 'Muerto viviente', align: 'Legal Malvado',
    cr: '1/4', crNum: 0.25, xp: 50, ac: '13 (Restos de armadura)', hp: 13, hitFormula: '2d8+4', speed: '30 pies',
    stats: [10, 14, 15, 6, 8, 5], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 9',
    immunities: 'Vulnerable a Contundente · Inmune a Veneno y Agotamiento', book: 'Monster Manual (MM)',
    traits: ['Naturaleza No-Muerta: No necesita respirar, comer ni dormir.'],
    actions: [
      { name: 'Espada Corta', roll: '1d6+2', hit: '+4 al ataque', desc: 'Alcance 5 pies. Impacto: 5 (1d6 + 2) de daño perforante.' },
      { name: 'Arco Corto', roll: '1d6+2', hit: '+4 al ataque', desc: 'Distancia 80/320 pies. Impacto: 5 (1d6 + 2) de daño perforante.' }
    ]
  },
  {
    id: 'zombie', name: 'Zombi', size: 'Mediano', type: 'Muerto viviente', align: 'Neutral Malvado',
    cr: '1/4', crNum: 0.25, xp: 50, ac: '8', hp: 22, hitFormula: '3d8+9', speed: '20 pies',
    stats: [13, 6, 16, 3, 6, 5], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 8',
    immunities: 'Inmune a Veneno', book: 'Monster Manual (MM)',
    traits: ['Fortaleza de Muerto Viviente: Si el daño reduce al zombi a 0 PG, hace una salvación de CON (CD 5 + daño sufrido). En un éxito queda a 1 PG (salvo daño radiante o crítico).'],
    actions: [
      { name: 'Golpe (Slam)', roll: '1d6+1', hit: '+3 al ataque', desc: 'Alcance 5 pies. Impacto: 4 (1d6 + 1) de daño contundente.' }
    ]
  },
  {
    id: 'orc', name: 'Orco Saqueador', size: 'Mediano', type: 'Humanoide', align: 'Caótico Malvado',
    cr: '1/2', crNum: 0.5, xp: 100, ac: '13 (Armadura de pieles)', hp: 15, hitFormula: '2d8+6', speed: '30 pies',
    stats: [16, 12, 16, 7, 11, 10], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 10',
    immunities: 'Intimidación +2', book: 'Monster Manual (MM)',
    traits: ['Agresivo: Como Acción Adicional, el orco puede moverse hasta su velocidad hacia una criatura hostil que pueda ver.'],
    actions: [
      { name: 'Gran Hacha', roll: '1d12+3', hit: '+5 al ataque', desc: 'Alcance 5 pies. Impacto: 9 (1d12 + 3) de daño cortante.' },
      { name: 'Jabalina', roll: '1d6+3', hit: '+5 al ataque', desc: 'Distancia 30/120 pies. Impacto: 6 (1d6 + 3) de daño perforante.' }
    ]
  },
  {
    id: 'dire_wolf', name: 'Lobo Huargo (Dire Wolf)', size: 'Grande', type: 'Bestia', align: 'Sin alineamiento',
    cr: '1', crNum: 1, xp: 200, ac: '14 (Armadura natural)', hp: 37, hitFormula: '5d10+10', speed: '50 pies',
    stats: [17, 15, 15, 3, 12, 7], senses: 'Percepción pasiva 13 (Oído y olfato agudos)',
    immunities: 'Sigilo +4, Percepción +3', book: 'Monster Manual (MM)',
    traits: ['Tácticas de Manada: Ventaja en ataques si un aliado está a 5 pies del objetivo.'],
    actions: [
      { name: 'Mordisco', roll: '2d6+3', hit: '+5 al ataque', desc: 'Impacto: 10 (2d6 + 3) perforante. Si es una criatura, salvación de FUE CD 13 o cae Derribada (Prone).' }
    ]
  },
  {
    id: 'mimic', name: 'Mímico (Mimic)', size: 'Mediano', type: 'Monstruosidad (Cambiaformas)', align: 'Neutral',
    cr: '2', crNum: 2, xp: 450, ac: '12 (Armadura natural)', hp: 58, hitFormula: '9d8+18', speed: '15 pies',
    stats: [17, 12, 15, 5, 13, 8], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 11',
    immunities: 'Inmune a Ácido y al estado Derribado', book: 'Monster Manual (MM)',
    traits: [
      'Cambiaformas: Se polimorfa en un objeto (como un cofre del tesoro o puerta). Mientras permanece inmóvil es indistinguible de un objeto normal.',
      'Adhesivo (Forma de objeto): Cualquier criatura que toque al mímico queda Agarrada automáticamente (escape CD 13).'
    ],
    actions: [
      { name: 'Pseudópodo', roll: '1d8+3', hit: '+5 al ataque', desc: 'Impacto: 7 (1d8 + 3) contundente y aplica Adhesivo.' },
      { name: 'Mordisco', roll: '1d8+3', hit: '+5 al ataque', desc: 'Impacto: 7 (1d8 + 3) perforante más 4 (1d8) de daño por ácido.' }
    ]
  },
  {
    id: 'gelatinous_cube', name: 'Cubo Gelatinoso', size: 'Grande', type: 'Cieno', align: 'Sin alineamiento',
    cr: '2', crNum: 2, xp: 450, ac: '6', hp: 84, hitFormula: '8d10+40', speed: '15 pies',
    stats: [14, 3, 20, 1, 6, 1], senses: 'Visión ciega 60 pies, Percepción pasiva 8',
    immunities: 'Inmune a Cegado, Hechizado, Ensordecido, Agotamiento y Derribado', book: 'Monster Manual (MM)',
    traits: ['Transparente: Incluso a plena vista requiere una prueba de Sabiduría (Percepción) CD 15 para detectar al cubo si no se ha movido.'],
    actions: [
      { name: 'Pseudópodo Ácido', roll: '3d6', hit: '+4 al ataque', desc: 'Alcance 5 pies. Impacto: 10 (3d6) de daño por ácido.' },
      { name: 'Engullir (Engulf)', roll: '6d6', hit: 'Salv. DES CD 12', desc: 'El cubo se mueve y engulle criaturas; sufren 21 (6d6) de daño ácido al inicio de cada turno del cubo y quedan Apresadas.' }
    ]
  },
  {
    id: 'owlbear', name: 'Oso Lechuza (Owlbear)', size: 'Grande', type: 'Monstruosidad', align: 'Sin alineamiento',
    cr: '3', crNum: 3, xp: 700, ac: '13 (Armadura natural)', hp: 59, hitFormula: '7d10+21', speed: '40 pies',
    stats: [20, 12, 17, 3, 12, 7], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 13',
    immunities: 'Vista y olfato agudos (ventaja en Percepción)', book: 'Monster Manual (MM)',
    traits: ['Ataque Múltiple: El oso lechuza realiza dos ataques: uno con su pico y otro con sus garras.'],
    actions: [
      { name: 'Pico', roll: '1d10+5', hit: '+7 al ataque', desc: 'Alcance 5 pies. Impacto: 10 (1d10 + 5) de daño perforante.' },
      { name: 'Garras', roll: '2d8+5', hit: '+7 al ataque', desc: 'Alcance 5 pies. Impacto: 14 (2d8 + 5) de daño cortante.' }
    ]
  },
  {
    id: 'displacer_beast', name: 'Bestia Desplazadora', size: 'Grande', type: 'Monstruosidad', align: 'Legal Malvado',
    cr: '3', crNum: 3, xp: 700, ac: '13 (Armadura natural)', hp: 85, hitFormula: '10d10+30', speed: '40 pies',
    stats: [18, 15, 16, 6, 12, 8], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 11',
    immunities: 'Evasión (0 daño en salvación exitosa)', book: 'Monster Manual (MM)',
    traits: ['Desplazamiento: Proyecta una ilusión que hace que parezca estar a unos pies de su ubicación real; cualquier tirada de ataque contra ella tiene Desventaja hasta que reciba daño en ese turno.'],
    actions: [
      { name: 'Tentáculo Espinoso (x2)', roll: '1d6+4', hit: '+6 al ataque', desc: 'Alcance 10 pies. Impacto: 7 (1d6 + 4) contundente más 3 (1d6) perforante.' }
    ]
  },
  {
    id: 'troll', name: 'Trol (Troll)', size: 'Grande', type: 'Gigante', align: 'Caótico Malvado',
    cr: '5', crNum: 5, xp: 1800, ac: '15 (Armadura natural)', hp: 84, hitFormula: '8d10+40', speed: '30 pies',
    stats: [18, 13, 20, 7, 9, 7], senses: 'Visión en la oscuridad 60 pies, Percepción pasiva 12',
    immunities: 'Vulnerable a detener regeneración con Ácido o Fuego', book: 'Monster Manual (MM)',
    traits: ['Regeneración: El trol recupera 10 Puntos de Golpe al inicio de su turno. Si sufre daño de ácido o de fuego, este rasgo no funciona en su siguiente turno. Solo muere si inicia su turno con 0 PG y no se regenera.'],
    actions: [
      { name: 'Mordisco', roll: '1d6+4', hit: '+7 al ataque', desc: 'Impacto: 7 (1d6 + 4) de daño perforante.' },
      { name: 'Garras (x2)', roll: '2d6+4', hit: '+7 al ataque', desc: 'Impacto: 11 (2d6 + 4) de daño cortante.' }
    ]
  },
  {
    id: 'mind_flayer', name: 'Azotamentes (Mind Flayer)', size: 'Mediano', type: 'Aberración', align: 'Legal Malvado',
    cr: '7', crNum: 7, xp: 2900, ac: '15 (Coraza)', hp: 71, hitFormula: '13d8+13', speed: '30 pies',
    stats: [11, 12, 12, 19, 17, 17], senses: 'Visión en la oscuridad 120 pies, Telepatía 120 pies',
    immunities: 'Resistencia Mágica (ventaja en salvaciones contra conjuros)', book: 'Monster Manual (MM)',
    traits: ['Lanzamiento Psiónico Innato (INT, CD 15): Levitar, Detectar Pensamientos, Dominar Monstruo, Cambio de Plano.'],
    actions: [
      { name: 'Tentáculos', roll: '2d10+4', hit: '+7 al ataque', desc: 'Impacto: 15 (2d10 + 4) psíquico. El objetivo queda Agarrado y debe superar salvación de INT CD 15 o quedar Aturdido.' },
      { name: 'Extraer Cerebro', roll: '10d10', hit: '+7 al ataque', desc: 'Contra un humanoide incapacitado y agarrado: inflige 55 (10d10) de daño perforante. Si reduce a 0 PG, devora su cerebro.' },
      { name: 'Explosión Mental (Recarga 5-6)', roll: '4d8+4', hit: 'Salv. INT CD 15', desc: 'Cono de 60 pies: 22 (4d8 + 4) de daño psíquico y quedan Aturdidos durante 1 minuto.' }
    ]
  },
  {
    id: 'young_red_dragon', name: 'Dragón Rojo Joven', size: 'Grande', type: 'Dragón', align: 'Caótico Malvado',
    cr: '10', crNum: 10, xp: 5900, ac: '18 (Armadura natural)', hp: 178, hitFormula: '17d10+85', speed: '40 pies, trepar 40p, volar 80p',
    stats: [23, 10, 21, 14, 11, 19], senses: 'Visión ciega 30 pies, Visión oscuridad 120 pies, Percepción pasiva 18',
    immunities: 'Inmune al daño de Fuego', book: 'Monster Manual (MM)',
    traits: ['Ataque Múltiple: El dragón realiza tres ataques: uno con su mordisco y dos con sus garras.'],
    actions: [
      { name: 'Mordisco Ígneo', roll: '2d10+6', hit: '+10 al ataque', desc: 'Alcance 10 pies. Impacto: 17 (2d10 + 6) perforante más 3 (1d6) de daño de fuego.' },
      { name: 'Garra (x2)', roll: '2d6+6', hit: '+10 al ataque', desc: 'Alcance 5 pies. Impacto: 13 (2d6 + 6) de daño cortante.' },
      { name: 'Aliento de Fuego (Recarga 5-6)', roll: '16d6', hit: 'Salv. DES CD 17', desc: 'Cono de 30 pies: 56 (16d6) de daño de fuego en fallo, o la mitad si tiene éxito.' }
    ]
  },
  {
    id: 'beholder', name: 'Contemplador (Beholder)', size: 'Grande', type: 'Aberración', align: 'Legal Malvado',
    cr: '13', crNum: 13, xp: 10000, ac: '18 (Armadura natural)', hp: 180, hitFormula: '19d10+76', speed: '0 pies, volar 20 pies (levitar)',
    stats: [10, 14, 18, 17, 15, 17], senses: 'Visión en la oscuridad 120 pies, Percepción pasiva 22',
    immunities: 'Inmune a Derribado', book: 'Monster Manual (MM)',
    traits: ['Cono Antimagia: Su ojo central proyecta un cono invisible de 150 pies que suprime cualquier conjuro u objeto mágico dentro del área.'],
    actions: [
      { name: 'Rayos Oculares (3 al azar + 3 legendarios)', roll: '10d8', hit: 'Salv. CD 16', desc: 'Dispara 3 de sus 10 rayos: Hechizar, Paralizar, Miedo, Ralentizar, Debilitante (8d8 necrótico), Telequinético, Sueño, Petrificación, Desintegración (10d8 fuerza) o Muerte (10d10 necrótico).' }
    ]
  },
  {
    id: 'vampire', name: 'Vampiro Señor de la Noche', size: 'Mediano', type: 'Muerto viviente (Cambiaformas)', align: 'Legal Malvado',
    cr: '13', crNum: 13, xp: 10000, ac: '16 (Armadura natural)', hp: 144, hitFormula: '17d8+68', speed: '30 pies',
    stats: [18, 18, 18, 17, 15, 18], senses: 'Visión en la oscuridad 120 pies, Percepción pasiva 17',
    immunities: 'Resistencia a Necrótico y físico no mágico · Regenera 20 PG/turno', book: 'Monster Manual (MM)',
    traits: ['Resistencia Legendaria (3/Día): Si falla una salvación, puede elegir tener éxito.', 'Escape Brumoso: Al caer a 0 PG se convierte en niebla y regresa a su ataúd.'],
    actions: [
      { name: 'Mordisco Vampírico', roll: '3d6+4', hit: '+9 al ataque', desc: 'Impacto: 7 (1d6 + 4) perforante más 10 (3d6) necrótico. Reduce el PG máximo del objetivo y el vampiro recupera esa misma cantidad.' },
      { name: 'Hechizar (Charm)', roll: '1d20', hit: 'Salv. SAB CD 17', desc: 'El humanoide considera al vampiro un amigo de confianza durante 24 horas.' }
    ]
  },
  {
    id: 'lich', name: 'Liche (Archimago No-Muerto)', size: 'Mediano', type: 'Muerto viviente', align: 'Cualquier Malvado',
    cr: '21', crNum: 21, xp: 33000, ac: '17 (Armadura natural)', hp: 135, hitFormula: '18d8+54', speed: '30 pies',
    stats: [11, 16, 16, 20, 14, 16], senses: 'Visión verdadera 120 pies, Percepción pasiva 19',
    immunities: 'Inmune a Veneno, Necrótico, Hechizado, Asustado, Paralizado · Resistencia Legendaria (3/Día)', book: 'Monster Manual (MM)',
    traits: [
      'Rejuvenecimiento (Filacteria): Si su filacteria está intacta, el liche destruido obtiene un cuerpo nuevo en 1d10 días.',
      'Lanzador de Conjuros de Nivel 18 (INT, CD 20, +12 al ataque): Posee Desintegrar, Bola de Fuego, Dedo de la Muerte, Dominar Monstruo y Palabra de Poder Mortal.'
    ],
    actions: [
      { name: 'Toque Paralizante', roll: '3d6', hit: '+12 al ataque', desc: 'Impacto: 10 (3d6) de daño de frío y salvación de CON CD 18 o queda Paralizado 1 minuto.' },
      { name: 'Perturbar la Vida (Acción Legendaria)', roll: '6d6', hit: 'Salv. CON CD 18', desc: 'Cada criatura viva a 20 pies sufre 21 (6d6) de daño necrótico.' }
    ]
  },
  {
    id: 'ancient_red_dragon', name: 'Dragón Rojo Antiguo', size: 'Gargantuesco', type: 'Dragón', align: 'Caótico Malvado',
    cr: '24', crNum: 24, xp: 62000, ac: '22 (Armadura natural)', hp: 546, hitFormula: '28d20+252', speed: '40 pies, trepar 40p, volar 80p',
    stats: [30, 10, 29, 18, 15, 23], senses: 'Visión ciega 60 pies, Visión oscuridad 120 pies, Percepción pasiva 26',
    immunities: 'Inmune al Fuego · Resistencia Legendaria (3/Día)', book: 'Monster Manual (MM)',
    traits: ['Presencia Aterradora: Criaturas a 120 pies deben superar salvación de SAB CD 21 o quedar Asustadas 1 minuto.'],
    actions: [
      { name: 'Mordisco Colosal', roll: '2d10+10', hit: '+17 al ataque', desc: 'Alcance 15 pies. Impacto: 21 (2d10 + 10) perforante más 14 (4d6) de fuego.' },
      { name: 'Aliento Cataclísmico de Fuego (Recarga 5-6)', roll: '26d6', hit: 'Salv. DES CD 24', desc: 'Cono de 90 pies: 91 (26d6) de daño de fuego en fallo, o la mitad en éxito.' }
    ]
  },
  {
    id: 'tarrasque', name: 'La Tarasca (Tarrasque)', size: 'Gargantuesco (Titán)', type: 'Monstruosidad', align: 'Sin alineamiento',
    cr: '30', crNum: 30, xp: 155000, ac: '25 (Armadura natural)', hp: 676, hitFormula: '33d20+330', speed: '40 pies',
    stats: [30, 11, 30, 3, 11, 11], senses: 'Visión ciega 120 pies, Percepción pasiva 10',
    immunities: 'Inmune a Fuego, Veneno, Hechizado, Asustado, Paralizado · Resistencia Legendaria (3/Día)', book: 'Monster Manual (MM)',
    traits: [
      'Caparazón Reflectante: Cualquier conjuro de línea o ataque de conjuro a distancia refleja o se anula (con 6 en 1d6 se refleja al lanzador).',
      'Monstruo de Asedio: Inflige el doble de daño a objetos y estructuras.'
    ],
    actions: [
      { name: 'Ataque Múltiple (5 ataques) + Tragar', roll: '4d12+10', hit: '+19 al ataque', desc: 'Mordisco 36 (4d12 + 10), dos Garras (4d8 + 10), Cuernos (4d10 + 10) y Cola (4d6 + 10). Las criaturas tragadas sufren 56 (16d6) de ácido por turno.' }
    ]
  }
];

// CATÁLOGO Y CONTENIDO DE LOS LIBROS OFICIALES DE D&D 5e / 5.5e
const DND_OFFICIAL_BOOKS_COMPENDIUM = {
  books: [
    {
      code: 'PHB 2024', title: "Manual del Jugador (Player's Handbook)", role: 'Libro Esencial del Jugador',
      summary: 'Contiene todas las reglas de creación de personajes: 12 Clases, 48 Subclases, 10 Especies, 16 Trasfondos con Dotes de Origen, 75+ Dotes, Maestrías de Armas y casi 400 Conjuros.',
      highlights: ['Reglas de Combate y Economía de Turno', 'Sistema de Maestría de Armas (Cleave, Vex, Topple, Nick...)', 'Creación por Trasfondo (+2/+1 o +1/+1/+1 y Dote de Origen)', 'Grimorio completo de Niveles 0 a 9']
    },
    {
      code: 'MM 2024/25', title: 'Manual de Monstruos (Monster Manual)', role: 'Bestiario Oficial del Multiverso',
      summary: 'Más de 500 criaturas clasificadas por Valor de Desafío (CR 0 a CR 30), desde trasgos y mímicos hasta dragones antiguos, contempladores, liches y señores demoníacos.',
      highlights: ['Bloques de Estadísticas (Statblocks) Oficiales', 'Acciones Legendarias y Acciones de Guarida (Lair Actions)', 'Plantillas de PNJs, Animales y Familiares', 'Lore, hábitats y tácticas de combate de cada criatura']
    },
    {
      code: 'DMG 2024', title: 'Guía del Dungeon Master (DMG)', role: 'Tesoros, Objetos Mágicos y Mundos',
      summary: 'El compendio de dirección de partidas, construcción de campañas, Bastiones de jugadores, trampas, venenos, maldiciones y más de 400 Objetos Mágicos y Artefactos.',
      highlights: ['Sistema de Bastiones (Fortalezas para jugadores desde nivel 5)', 'Catálogo de Objetos Mágicos (Común a Artefacto) y Sintonización', 'Calculadora de Encuentros por Presupuesto de XP', ' Cosmología de los Planos (Feywild, Shadowfell, Nueve Infiernos...)']
    },
    {
      code: 'XGE / TCE', title: 'Guía de Xanathar y Caldero de Tasha', role: 'Expansiones Oficiales de Opciones',
      summary: 'Amplían las opciones de jugador con subclases emblemáticas (Forja, Maleficio/Hexblade, Espadas, Crepúsculo), acertijos, reglas de herramientas y conjuros adicionales.',
      highlights: ['Reglas avanzadas para Herramientas de Artesano y Actividades entre Aventuras', 'Puzzles listos para mazmorras y Patronos de Grupo', 'Subclases adicionales compatibles con 5e/5.5e']
    },
    {
      code: 'MPMM', title: 'Monstruos del Multiverso (Mordenkainen)', role: 'Razas Exóticas y Bestiario Planar',
      summary: 'Recopila más de 30 especies jugables adicionales del multiverso (Aarakocra, Cambiante, Eladrin, Genasi, Githyanki, Hado, Kenku, Tabaxi, Tortoga) y más de 250 monstruos.',
      highlights: ['33 Especies jugables planares y feéricas', 'Archidiablos, Príncipes Demoníacos y Señores Elementales']
    }
  ],
  magicItems: [
    { name: 'Poción de Curación (Común a Suprema)', rarity: 'Común / Poco Común / Rara / Muy Rara', attune: 'No', book: 'PHB / DMG', desc: 'Se bebe como Acción Adicional: Normal (2d4+2 PG), Mayor (4d4+4 PG), Superior (8d4+8 PG), Suprema (10d4+20 PG).' },
    { name: 'Bolsa de Contención (Bag of Holding)', rarity: 'Poco Común', attune: 'No', book: 'DMG', desc: 'Espacio extradimensional interno que almacena hasta 500 libras (64 pies cúbicos) pesando siempre solo 15 libras.' },
    { name: 'Capa de Protección (Cloak of Protection)', rarity: 'Poco Común', attune: 'Sí', book: 'DMG', desc: 'Otorga un bonificador de +1 a la Clase de Armadura (CA) y +1 a todas las tiradas de salvación mientras la lleves puesta.' },
    { name: 'Arma +1 / +2 / +3', rarity: 'Poco Común / Rara / Muy Rara', attune: 'No', book: 'DMG', desc: 'Bonificador mágico de +1, +2 o +3 a las tiradas de ataque y de daño realizadas con esta arma.' },
    { name: 'Lengua Flamígera (Flame Tongue)', rarity: 'Rara', attune: 'Sí', book: 'DMG', desc: 'Espada que al pronunciar su palabra de mando se envuelve en fuego, iluminando 40 pies e infligiendo +2d6 de daño de fuego extra en cada impacto.' },
    { name: 'Botas Élficas y Capa Élfica', rarity: 'Poco Común', attune: 'Capa requiere sintonización', book: 'DMG', desc: 'Tus pasos no hacen ruido; tienes Ventaja en las pruebas de Destreza (Sigilo) y los enemigos tienen Desventaja en Percepción para verte.' },
    { name: 'Anillo de Almacenar Conjuros', rarity: 'Rara', attune: 'Sí', book: 'DMG', desc: 'Almacena hasta 5 niveles de conjuros lanzados dentro del anillo; el portador puede lanzarlos después sin gastar sus propios espacios.' },
    { name: 'Vengadora Sagrada (Holy Avenger)', rarity: 'Legendaria', attune: 'Sí (por un Paladín)', book: 'DMG', desc: 'Espada +3 que inflige +2d10 radiante a infernales y muertos vivientes, y emana un aura que da ventaja contra magia a los aliados.' },
    { name: 'Túnica del Archimago', rarity: 'Legendaria', attune: 'Sí (Mago, Hechicero o Brujo)', book: 'DMG', desc: 'CA base 15 + DES, ventaja en salvaciones contra conjuros, y +2 a la CD de salvación y ataques de conjuro del portador.' }
  ],
  coreFeats: [
    { name: 'Duro (Tough)', type: 'Dote de Origen', desc: 'Tus Puntos de Golpe máximos aumentan en una cantidad igual al doble de tu nivel de personaje (+2 PG por nivel).' },
    { name: 'Alerta (Alert)', type: 'Dote de Origen', desc: 'Sumas tu bonificador de competencia a la Iniciativa y puedes intercambiar tu resultado de Iniciativa con el de un aliado dispuesto.' },
    { name: 'Afortunado (Lucky)', type: 'Dote de Origen', desc: 'Obtienes Puntos de Suerte iguales a tu bono de competencia (recargan en descanso largo) para darte Ventaja en un d20 o imponer Desventaja a un ataque enemigo.' },
    { name: 'Iniciado en la Magia (Magic Initiate)', type: 'Dote de Origen', desc: 'Aprendes 2 trucos y 1 conjuro de nivel 1 de Clérigo, Druida o Mago; puedes lanzarlo gratis 1 vez por descanso largo y también con tus espacios.' },
    { name: 'Maestro en Armas Pesadas (Great Weapon Master)', type: 'Dote General (Nvl 4+, +1 FUE)', desc: 'Al golpear con un arma Pesada en tu Acción de Ataque sumas tu bono de competencia al daño, y si haces un crítico o reduces a 0 PG haces un ataque adicional.' },
    { name: 'Tirador de Primera (Sharpshooter)', type: 'Dote General (Nvl 4+, +1 DES)', desc: 'Tus ataques a distancia ignoran cobertura media y tres cuartos, no sufren desventaja por largo alcance ni por estar a 5 pies de un enemigo.' },
    { name: 'Lanzador en Combate (War Caster)', type: 'Dote General (Nvl 4+, +1 INT/SAB/CAR)', desc: 'Ventaja en salvaciones de CON para mantener Concentración, puedes lanzar con escudo en mano y usar un conjuro como Ataque de Oportunidad.' },
    { name: 'Centinela (Sentinel)', type: 'Dote General (Nvl 4+, +1 FUE/DES)', desc: 'Tus ataques de oportunidad reducen la velocidad del enemigo a 0 e impactan incluso si el enemigo usó Destrabarse.' }
  ],
  quickRulesTables: [
    { title: 'Clases de Dificultad (CD Oficiales)', rows: ['Muy Fácil: CD 5', 'Fácil: CD 10', 'Moderada: CD 15', 'Difícil: CD 20', 'Muy Difícil: CD 25', 'Casi Imposible: CD 30'] },
    { title: 'Cobertura en Combate', rows: ['Cobertura Media (muro bajo, aliado): +2 a CA y salvaciones de DES', 'Cobertura Tres Cuartos (tronera, tronco grueso): +5 a CA y salv. DES', 'Cobertura Total: No puede ser objetivo directo de ataques ni conjuros'] },
    { title: 'Sintonización y Descansos', rows: ['Máximo 3 Objetos Mágicos sintonizados a la vez por personaje', 'Descanso Corto (1 hora): Gastar Dados de Golpe y recargar habilidades breves', 'Descanso Largo (8 horas): Recupera 100% de PG, todos los Dados de Golpe y Espacios de Conjuro'] }
  ]
};

if (typeof window !== 'undefined') {
  window.DND_OFFICIAL_BESTIARY = DND_OFFICIAL_BESTIARY;
  window.DND_OFFICIAL_BOOKS_COMPENDIUM = DND_OFFICIAL_BOOKS_COMPENDIUM;
}

