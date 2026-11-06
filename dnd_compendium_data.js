/**
 * ============================================================================
 * COMPENDIO DEL JUGADOR D&D 5e / 5.5e (2024) - DATOS EXTENDIDOS
 * Enriquecimiento de Clases, Razas/Especies, Hechizos Niveles 0-9 y Guía de Turno
 * ============================================================================
 */

// DETALLES ADICIONALES DE LAS 12 CLASES OFICIALES (SUBCLASES, ROL Y PROGRESIÓN)
const DND_COMPENDIUM_CLASS_EXTRAS = {
  barbarian: {
    role: 'Combatiente de Primera Línea y Tanque de Daño Físico',
    primaryAttr: 'Fuerza y Constitución',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Guerreros feroces que canalizan su furia interior para resistir golpes letales y destrozar líneas enemigas cuerpo a cuerpo.',
    subclasses: ['Senda del Berserker', 'Senda del Corazón Salvaje', 'Senda del Árbol del Mundo', 'Senda del Fanático'],
    progression: [
      'Nvl 1: Furia (2/día, +2 daño), Defensa sin Armadura y Maestría de Armas.',
      'Nvl 2: Ataque Temerario (ventaja al atacar) y Sentido del Peligro (ventaja en salv. DES).',
      'Nvl 3: Subclase de Bárbaro y Conocimiento Primigenio.',
      'Nvl 5: Ataque Extra (2 ataques por acción) y Movimiento Rápido (+10 pies).'
    ]
  },
  bard: {
    role: 'Apoyo Versátil, Control Arcano y Rostro Social del Grupo',
    primaryAttr: 'Carisma y Destreza',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Artistas y eruditos que tejen la magia a través de palabras y música para inspirar aliados, manipular mentes y dominar cualquier habilidad.',
    subclasses: ['Colegio de la Danza', 'Colegio del Glamour', 'Colegio del Conocimiento (Lore)', 'Colegio del Valor'],
    progression: [
      'Nvl 1: Inspiración Bárdica (d6 como acción adicional) y Lanzamiento de Conjuros (CAR).',
      'Nvl 2: Pericia en 2 habilidades y Aprendiz de Todo (+1/2 competencia a pruebas no competentes).',
      'Nvl 3: Subclase de Bardo.',
      'Nvl 5: Fuente de Inspiración (recupera dados en descanso corto y sube a d8).'
    ]
  },
  cleric: {
    role: 'Sanador Divino, Soporte Defensivo y Canalizador Sagrado',
    primaryAttr: 'Sabiduría y Constitución / Fuerza',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Campeones investidos por los dioses que protegen a sus aliados con plegarias curativas y castigan a los enemigos con fuego radiante.',
    subclasses: ['Dominio de la Vida', 'Dominio de la Luz', 'Dominio del Engaño', 'Dominio de la Guerra'],
    progression: [
      'Nvl 1: Lanzamiento de Conjuros Divinos (SAB) y Orden Divina (Protector pesado o Erudito).',
      'Nvl 2: Canalizar Divinidad (Chispa Divina curativa/dañina y Expulsar Muertos Vivientes).',
      'Nvl 3: Subclase de Dominio Divino (conjuros de dominio siempre preparados).',
      'Nvl 5: Destruir Muertos Vivientes y conjuros de nivel 3 (Revivir, Espíritus Guardianes).'
    ]
  },
  druid: {
    role: 'Cambiaformas, Controlador de la Naturaleza y Sanador',
    primaryAttr: 'Sabiduría y Constitución',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Guardianes del equilibrio natural capaces de invocar tormentas elementales y adoptar la forma de bestias salvajes.',
    subclasses: ['Círculo de la Tierra', 'Círculo de la Luna', 'Círculo del Mar', 'Círculo de las Estrellas'],
    progression: [
      'Nvl 1: Druídico, Orden Primigenia (Magia o Guardián) y Conjuros Primigenios.',
      'Nvl 2: Forma Salvaje (acción adicional para transformarse en bestia) y Compañero Salvaje.',
      'Nvl 3: Subclase de Círculo Druídico.',
      'Nvl 5: Resurgimiento Salvaje y conjuros de nivel 3.'
    ]
  },
  fighter: {
    role: 'Maestro de Armas, Especialista Táctico y Daño Sostenido',
    primaryAttr: 'Fuerza o Destreza, y Constitución',
    book: "Player's Handbook (PHB 2024)",
    summary: 'La cúspide de la destreza marcial; dominan todas las armas y armaduras con una resistencia y cadencia de ataques inigualables.',
    subclasses: ['Maestro de Batalla', 'Campeón', 'Caballero Arcano (Eldritch Knight)', 'Guerrero Psiónico'],
    progression: [
      'Nvl 1: Estilo de Combate, Tomar Aliento (Second Wind) y 3 Maestrías de Armas.',
      'Nvl 2: Oleada de Acción (Action Surge: 1 acción extra en tu turno) y Mente Táctica.',
      'Nvl 3: Subclase Marcial.',
      'Nvl 5: Ataque Extra (2 ataques, sube a 3 a nvl 11) y Cambio Táctico.'
    ]
  },
  monk: {
    role: 'Guerrero Ágil de Artes Marciales y Control de Velocidad',
    primaryAttr: 'Destreza y Sabiduría',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Combatientes disciplinados que canalizan su energía interna para moverse a velocidad sobrehumana, desviar proyectiles y aturdir enemigos.',
    subclasses: ['Guerrero de la Mano Abierta', 'Guerrero de las Sombras', 'Guerrero de los Cuatro Elementos', 'Guerrero de la Misericordia'],
    progression: [
      'Nvl 1: Artes Marciales (golpe desarmado adicional) y Defensa sin Armadura (10+DES+SAB).',
      'Nvl 2: Concentración del Monje (Ráfaga de Golpes, Defensa Paciente y Paso del Viento) y +10 pies.',
      'Nvl 3: Desviar Ataques (reacción para reducir daño físico) y Subclase.',
      'Nvl 5: Ataque Extra y Golpe Aturdidor (Stunning Strike).'
    ]
  },
  paladin: {
    role: 'Campeón Sagrado, Tanque Acorazado y Castigo Explosivo',
    primaryAttr: 'Fuerza y Carisma',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Caballeros unidos a un juramento sagrado que combinan armadura pesada, auras protectoras y castigos divinos devastadores.',
    subclasses: ['Juramento de Devoción', 'Juramento de los Antiguos', 'Juramento de Gloria', 'Juramento de Venganza'],
    progression: [
      'Nvl 1: Imposición de Manos (reserva curativa 5×nvl), Conjuros desde nivel 1 y Maestría de Armas.',
      'Nvl 2: Estilo de Combate y Castigo Divino (Divine Smite: daño radiante extra al impactar).',
      'Nvl 3: Canalizar Divinidad y Subclase de Juramento.',
      'Nvl 5: Ataque Extra y Corcel Fiel. Nvl 6: Aura de Protección (+mod CAR a salvaciones).'
    ]
  },
  ranger: {
    role: 'Explorador Letal, Arquero o Cazador de Monstruos',
    primaryAttr: 'Destreza y Sabiduría',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Acechadores implacables de las tierras salvajes que combinan puntería marcial, trampas naturales y magia de rastreo.',
    subclasses: ['Señor de las Bestias', 'Cazador (Hunter)', 'Acechador de la Penumbra (Gloom Stalker)', 'Errante Feérico'],
    progression: [
      'Nvl 1: Enemigo Predilecto (Marca del Cazador gratis), Conjuros y Maestría de Armas.',
      'Nvl 2: Explorador Hábil (Pericia y 2 idiomas) y Estilo de Combate.',
      'Nvl 3: Subclase de Explorador.',
      'Nvl 5: Ataque Extra y conjuros de nivel 2.'
    ]
  },
  rogue: {
    role: 'Especialista en Sigilo, Infiltración y Daño Crítico Puntual',
    primaryAttr: 'Destreza e Inteligencia / Carisma',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Maestros del subterfugio y la precisión quirúrgica que explotan cualquier distracción para asestar un único golpe mortal.',
    subclasses: ['Bribón Arcano (Arcane Trickster)', 'Asesino (Assassin)', 'Alma Cuchillo (Soulknife)', 'Ladrón (Thief)'],
    progression: [
      'Nvl 1: Ataque Furtivo (+1d6 daño), Pericia en 2 habilidades, Jerga de Ladrones y Maestría.',
      'Nvl 2: Acción Astuta (Correr, Destrabarse o Esconderse como acción adicional).',
      'Nvl 3: Subclase de Pícaro y Apuntar Fijo (ventaja como acción adicional).',
      'Nvl 5: Golpe Astuto (Cunning Strike: derribar, envenenar o retirarse) y Esquiva Asombrosa.'
    ]
  },
  sorcerer: {
    role: 'Artillero Arcano con Metamagia para Alterar Conjuros',
    primaryAttr: 'Carisma y Constitución',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Portadores de magia innata en su sangre que moldean las reglas de los conjuros para lanzarlos más rápido, más lejos o con mayor poder.',
    subclasses: ['Hechicería Aberrante', 'Hechicería Mecánica (Clockwork)', 'Hechicería Dracónica', 'Magia Salvaje'],
    progression: [
      'Nvl 1: Lanzamiento de Conjuros (CAR) y Furia Hechicera (+1 CD y ventaja en ataques mágicos).',
      'Nvl 2: Fuente de Magia (Puntos de Hechicería) y Metamagia (2 opciones: Conjuro Acelerado, Gemelo, etc.).',
      'Nvl 3: Subclase de Hechicero.',
      'Nvl 5: Restauración Hechicera y conjuros de nivel 3 (Bola de Fuego, Contraconjuro).'
    ]
  },
  warlock: {
    role: 'Lanzador de Pacto, Invocaciones Personalizables y Daño a Distancia',
    primaryAttr: 'Carisma y Constitución / Destreza',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Ocultistas que sellan un pacto con una entidad sobrenatural a cambio de invocaciones permanentes y magia que se recarga en descansos cortos.',
    subclasses: ['Patrón Archihada', 'Patrón Celestial', 'Patrón Infernal (Fiend)', 'Patrón Primigenio (Great Old One)'],
    progression: [
      'Nvl 1: Magia del Pacto (recarga en descanso corto) e Invocaciones Sobrenaturales (Pacto del Tomo/Filo/Cadena).',
      'Nvl 2: Astucia Mágica (recupera la mitad de espacios de pacto en 1 minuto).',
      'Nvl 3: Subclase de Patrón Sobrenatural.',
      'Nvl 5: Espacios de nivel 3 y 5 Invocaciones activas.'
    ]
  },
  wizard: {
    role: 'Maestro Supremo del Conocimiento Arcano y Utilidad Ritual',
    primaryAttr: 'Inteligencia y Constitución / Destreza',
    book: "Player's Handbook (PHB 2024)",
    summary: 'Estudiosos de las artes arcanas cuyo libro de conjuros alberga el repertorio más amplio y destructivo del multiverso.',
    subclasses: ['Abjurador', 'Adivino (Portento)', 'Evocador (Esculpir Conjuros)', 'Ilusionista'],
    progression: [
      'Nvl 1: Libro de Conjuros (6 conjuros nvl 1, rituales sin preparar) y Recuperación Arcana.',
      'Nvl 2: Erudito (Pericia en una habilidad académica como Arcanos o Historia).',
      'Nvl 3: Subclase de Tradición Arcana.',
      'Nvl 5: Memorizar Conjuro (cambia un conjuro preparado tras descanso corto) y conjuros de nvl 3.'
    ]
  }
};

// DETALLES ADICIONALES DE LAS 10 ESPECIES / RAZAS OFICIALES
const DND_COMPENDIUM_SPECIES_EXTRAS = {
  human: { lineage: 'Diversos reinos de Faerûn y el Multiverso', book: 'PHB 2024', desc: 'Adaptables, ambiciosos y tenaces; destacan en cualquier clase gracias a su dote de origen extra y su inspiración diaria.' },
  elf: { lineage: 'Linajes: Alto Elfo (Prestidigitación/Paso Brumoso), Elfo del Bosque (35 pies/Pass Without Trace) y Drow (Visión 120 pies/Fuego Feérico)', book: 'PHB 2024', desc: 'Seres longevos de gracia feérica que meditan en trance 4 horas y poseen sentidos agudizados.' },
  dwarf: { lineage: 'Clanes de las montañas y fortalezas subterráneas', book: 'PHB 2024', desc: 'Forjadores robustos con visión en la oscuridad superior (120 pies), resistencia al veneno, +1 PG por nivel y sentido sísmico en roca.' },
  halfling: { lineage: 'Comunidades nómadas y valles apacibles', book: 'PHB 2024', desc: 'Pequeños aventureros protegidos por una suerte proverbial que les permite repetir los 1 naturales en el d20 y moverse entre enemigos grandes.' },
  gnome: { lineage: 'Linajes: Gnomo del Bosque (Ilusión Menor y Hablar con Animales) y Gnomo de las Rocas (Prestidigitación y artilugios mecánicos)', book: 'PHB 2024', desc: 'Inventores brillantes cuya mente resiste la magia con ventaja en salvaciones de INT, SAB y CAR.' },
  dragonborn: { lineage: 'Ancestros Cromáticos (Rojo, Azul, Verde, Negro, Blanco) y Metálicos (Oro, Plata, Bronce, Cobre, Latón)', book: 'PHB 2024', desc: 'Orgullosos herederos de la sangre de los dragones con aliento elemental en cono o línea y vuelo dracónico temporal a nivel 5.' },
  tiefling: { lineage: 'Legados: Infernal (Fuego/Reprensión Infernal), Abisal (Veneno/Rociada Venenosa) y Ctónico (Necrótico/Toque Helado)', book: 'PHB 2024', desc: 'Marcados por los Planos Inferiores, dominan magia innata y resistencias planares.' },
  orc: { lineage: 'Tribus guerreras y fronteras indómitas', book: 'PHB 2024', desc: 'Incansables en batalla; pueden correr como acción adicional ganando PG temporales y negarse a caer a 0 PG.' },
  goliath: { lineage: 'Ancestros Gigantes: Colina (Derribar), Piedra (Reducir daño), Escarcha (Frío), Fuego (Ígneo), Nube (Teletransporte) y Tormenta (Trueno)', book: 'PHB 2024', desc: 'Descendientes de los gigantes con velocidad de 35 pies capaces de crecer a tamaño Grande en combate.' },
  aasimar: { lineage: 'Revelaciones Celestiales: Alas Radiantes (Vuelo), Manto Necrótico o Resplandor Interior', book: 'PHB 2024', desc: 'Tocados por los Planos Superiores, sanan con el tacto y despliegan un aura celestial a partir de nivel 3.' }
};

// CONJUROS ADICIONALES NIVELES 1 AL 9 PARA COMPLETAR EL COMPENDIO
const DND_COMPENDIUM_EXTRA_SPELLS = [
  { level: 1, name: 'Dormir (Sleep)', school: 'Encantamiento', time: '1 Acción', range: '60 pies (Esfera 5p)', classes: 'Bardo, Hechicero, Mago', desc: 'Salvación de SAB; las criaturas afectadas quedan Incapacitadas y luego Inconscientes si fallan una segunda salvación.' },
  { level: 1, name: 'Detectar Magia (Detect Magic)', school: 'Adivinación (Ritual)', time: '1 Acción', range: 'Personal (30 pies)', classes: 'Bardo, Clérigo, Druida, Paladín, Explorador, Hechicero, Mago', desc: 'Concentración (10 min). Percibes la presencia y escuela de cualquier aura mágica a 30 pies.' },
  { level: 1, name: 'Fuego Feérico (Faerie Fire)', school: 'Evocación', time: '1 Acción', range: '60 pies (Cubo 20p)', classes: 'Bardo, Druida', desc: 'Concentración. Contornea criaturas con luz (salv. DES); ataques contra ellas tienen ventaja y no pueden ser invisibles.' },
  { level: 2, name: 'Arma Espiritual (Spiritual Weapon)', school: 'Evocación', time: '1 Acción Adicional', range: '60 pies', classes: 'Clérigo', desc: 'Concentración (1 min). Crea un arma espectral flotante que ataca como acción adicional infligiendo 1d8 + mod SAB de daño de fuerza.' },
  { level: 2, name: 'Inmovilizar Persona (Hold Person)', school: 'Encantamiento', time: '1 Acción', range: '60 pies', classes: 'Bardo, Clérigo, Druida, Hechicero, Brujo, Mago', desc: 'Concentración. Paraliza a un humanoide que falle salvación de Sabiduría (críticos automáticos cuerpo a cuerpo).' },
  { level: 2, name: 'Pasar sin Rastro (Pass without Trace)', school: 'Abjuración', time: '1 Acción', range: 'Personal (30 pies)', classes: 'Druida, Explorador', desc: 'Concentración (1 hora). Otorga un bono de +10 a las pruebas de Sigilo tuyas y de tus aliados cercanos.' },
  { level: 3, name: 'Espíritus Guardianes (Spirit Guardians)', school: 'Conjuración', time: '1 Acción', range: 'Personal (Emanación 15p)', classes: 'Clérigo', desc: 'Concentración (10 min). Espíritus reducen a la mitad la velocidad enemiga e infligen 3d8 de daño radiante o necrótico (salv. SAB mitad).' },
  { level: 3, name: 'Acelerar (Haste)', school: 'Transmutación', time: '1 Acción', range: '30 pies', classes: 'Hechicero, Mago', desc: 'Concentración (1 min). Duplica velocidad, otorga +2 a la CA, ventaja en salvaciones de DES y 1 acción adicional por turno.' },
  { level: 3, name: 'Disipar Magia (Dispel Magic)', school: 'Abjuración', time: '1 Acción', range: '120 pies', classes: 'Bardo, Clérigo, Druida, Paladín, Hechicero, Brujo, Mago', desc: 'Finaliza automáticamente conjuros de nivel 3 o inferior sobre el objetivo (prueba de característica para niveles 4+).' },
  { level: 4, name: 'Polimorfar (Polymorph)', school: 'Transmutación', time: '1 Acción', range: '60 pies', classes: 'Bardo, Druida, Hechicero, Mago', desc: 'Concentración (1 hora). Transforma a una criatura en una Bestia de CR igual o menor a su nivel, ganando PG temporales.' },
  { level: 4, name: 'Puerta Dimensional (Dimension Door)', school: 'Conjuración', time: '1 Acción', range: '500 pies', classes: 'Bardo, Hechicero, Brujo, Mago', desc: 'Te teletransportas tú y hasta un aliado dispuesto a cualquier punto dentro de 500 pies.' },
  { level: 4, name: 'Destierro (Banishment)', school: 'Abjuración', time: '1 Acción', range: '30 pies', classes: 'Clérigo, Paladín, Hechicero, Brujo, Mago', desc: 'Concentración (1 min). Envía a una criatura a un semiplano inofensivo o a su plano natal si falla salvación de Carisma.' },
  { level: 5, name: 'Cono de Frío (Cone of Cold)', school: 'Evocación', time: '1 Acción', range: 'Cono de 60 pies', classes: 'Druida, Hechicero, Mago', desc: 'Ráfaga glacial que inflige 8d8 de daño de frío en un cono de 60 pies (salvación de CON mitad).' },
  { level: 5, name: 'Restauración Mayor (Greater Restoration)', school: 'Abjuración', time: '1 Acción', range: 'Toque', classes: 'Bardo, Clérigo, Druida', desc: 'Elimina petrificación, maldiciones, agotamiento, hechizos o reducciones de característica/PG máximo.' },
  { level: 5, name: 'Muro de Fuerza (Wall of Force)', school: 'Evocación', time: '1 Acción', range: '120 pies', classes: 'Mago', desc: 'Concentración (10 min). Crea una barrera invisible e indestructible inmune a todo daño y a Disipar Magia.' },
  { level: 6, name: 'Desintegrar (Disintegrate)', school: 'Transmutación', time: '1 Acción', range: '60 pies', classes: 'Hechicero, Mago', desc: 'Rayo verde que inflige 10d6 + 40 de daño de fuerza (salv. DES niega). Si reduce a 0 PG, convierte al objetivo en polvo.' },
  { level: 6, name: 'Sanar (Heal)', school: 'Abjuración', time: '1 Acción', range: '60 pies', classes: 'Clérigo, Druida', desc: 'Restaura 70 Puntos de Golpe instantáneamente y elimina ceguera, sordera y enfermedades.' },
  { level: 7, name: 'Teletransportar (Teleport)', school: 'Conjuración', time: '1 Acción', range: '10 pies', classes: 'Bardo, Hechicero, Mago', desc: 'Transporta instantáneamente hasta a 8 criaturas dispuestas a un destino conocido en el mismo plano.' },
  { level: 8, name: 'Dominar Monstruo (Dominate Monster)', school: 'Encantamiento', time: '1 Acción', range: '60 pies', classes: 'Bardo, Hechicero, Brujo, Mago', desc: 'Concentración (1 hora). Controla telepáticamente a cualquier criatura que falle su salvación de Sabiduría.' },
  { level: 9, name: 'Deseo (Wish)', school: 'Conjuración', time: '1 Acción', range: 'Personal', classes: 'Hechicero, Mago', desc: 'El conjuro mortal más poderoso: duplica cualquier conjuro de nivel 8 o inferior sin componentes o altera la realidad misma.' },
  { level: 9, name: 'Tromba de Meteoritos (Meteor Swarm)', school: 'Evocación', time: '1 Acción', range: '1 milla (4 esferas de 40p)', classes: 'Hechicero, Mago', desc: '4 impactos titánicos que infligen 20d6 de daño de fuego + 20d6 de daño contundente (salvación de DES mitad).' },
  { level: 9, name: 'Palabra de Poder Mortal (Power Word Kill)', school: 'Encantamiento', time: '1 Acción', range: '60 pies', classes: 'Bardo, Hechicero, Brujo, Mago', desc: 'Si la criatura objetivo tiene 100 Puntos de Golpe o menos, muere instantáneamente; de lo contrario sufre 12d12 de daño psíquico.' }
];

// GUÍA OFICIAL DE LO QUE PUEDE HACER UN JUGADOR EN SU TURNO (ECONOMÍA DE ACCIONES 5.5e)
const DND_PLAYER_TURN_GUIDE = {
  overview: [
    { id: 'move', tag: 'MOVIMIENTO', title: 'Moverte hasta tu Velocidad', limit: 'Divisible antes y después de actuar', desc: 'Puedes recorrer tantos pies como indique tu Velocidad (normalmente 30 pies = 6 casillas). Puedes moverte 10 pies, atacar y luego moverte los 20 pies restantes. Levantarte del suelo (Derribado) cuesta la mitad de tu velocidad.' },
    { id: 'action', tag: '1 ACCIÓN PRINCIPAL', title: 'Tu Acción Central del Turno', limit: '1 por turno', desc: 'El corazón de tu turno: Atacar con un arma, Lanzar un conjuro de 1 Acción, Correr el doble, Esquivar, Destrabarse, Ayudar a un compañero, Esconderte o Utilizar un objeto.' },
    { id: 'bonus', tag: '1 ACCIÓN ADICIONAL', title: 'Acción Rápida (Bonus Action)', limit: 'Máx. 1 en tu turno (si tienes una habilidad que la otorgue)', desc: 'Solo disponible si un rasgo, dote o conjuro dice explícitamente "Acción Adicional" (ej. entrar en Furia, Palabra de Curación, Paso Brumoso, Inspiración Bárdica o atacar con arma ligera en la otra mano).' },
    { id: 'reaction', tag: '1 REACCIÓN', title: 'Respuesta Instantánea', limit: '1 por ronda (en tu turno o en el de otro)', desc: 'Se dispara ante un desencadenante específico: realizar un Ataque de Oportunidad cuando un enemigo sale de tu alcance sin Destrabarse, o lanzar el conjuro Escudo / Contraconjuro.' },
    { id: 'free', tag: 'INTERACCIÓN GRATUITA', title: 'Objeto y Comunicación', limit: '1 objeto gratis + hablar brevemente', desc: 'Desenvainar o envainar un arma durante tu ataque, abrir una puerta sin llave, sacar una poción de la mochila o gritar una advertencia táctica a tu grupo.' }
  ],
  mainActions: [
    { name: 'Atacar (Attack)', type: 'Combate Marcial', desc: 'Realizas un ataque cuerpo a cuerpo o a distancia con tu arma (o más si tienes Ataque Extra a nivel 5). Puedes sustituir un ataque por Agarrar (Grapple) o Empujar/Derribar (Shove), y activar la propiedad de Maestría de tu arma.' },
    { name: 'Magia (Magic / Cast a Spell)', type: 'Conjuros y Objetos', desc: 'Lanzas un truco o conjuro con tiempo de lanzamiento de 1 Acción, o activas un objeto mágico/pergamino. Recuerda: en 5.5e solo puedes gastar 1 espacio de conjuro por turno.' },
    { name: 'Correr (Dash)', type: 'Posicionamiento', desc: 'Ganas movimiento adicional para el turno actual igual a tu Velocidad (si tienes 30 pies, puedes moverte 60 pies en total este turno).' },
    { name: 'Destrabarse (Disengage)', type: 'Evasión Táctica', desc: 'Tu movimiento no provoca Ataques de Oportunidad de ningún enemigo durante el resto del turno actual.' },
    { name: 'Esquivar (Dodge)', type: 'Defensa Total', desc: 'Hasta tu próximo turno, cualquier tirada de ataque contra ti tiene Desventaja si puedes ver al atacante, y tienes Ventaja en salvaciones de Destreza.' },
    { name: 'Ayudar (Help)', type: 'Trabajo en Equipo', desc: 'Concedes Ventaja a la próxima prueba de característica de un aliado, o distraes a un enemigo a 5 pies para que el siguiente ataque de un aliado contra él tenga Ventaja.' },
    { name: 'Esconderse (Hide)', type: 'Sigilo', desc: 'Haces una prueba de Destreza (Sigilo) CD 15 mientras estés tras cobertura tres cuartos/total o fuera de línea de visión. Si tienes éxito, ganas el estado Invisible hasta que ataques o hagas ruido.' },
    { name: 'Preparar (Ready)', type: 'Reacción Programada', desc: 'Defines una condición ("Si el trasgo abre la puerta, disparo mi arco"). Cuando ocurra antes de tu próximo turno, gastas tu Reacción para ejecutar la acción preparada.' },
    { name: 'Utilizar (Utilize)', type: 'Objetos e Interacción', desc: 'Usas un objeto que requiere una acción (beber o administrar una Poción de Curación —también disponible como Acción Adicional en 5.5e—, usar un botiquín, activar una palanca o atar una cuerda).' },
    { name: 'Buscar (Search)', type: 'Percepción / Medicina', desc: 'Dedicas tu acción a examinar el entorno o buscar enemigos ocultos mediante una prueba de Sabiduría (Percepción, Perspicacia, Medicina o Supervivencia).' },
    { name: 'Estudiar (Study)', type: 'Conocimiento Analítico', desc: 'Analizas a un monstruo, trampa arcana o pista realizando una prueba de Inteligencia (Arcanos, Historia, Investigación, Naturaleza o Religión) para recordar sus debilidades.' },
    { name: 'Influenciar (Influence)', type: 'Interacción Social', desc: 'Intentas cambiar la actitud de un PNJ o criatura (Hostil, Indiferente o Amistoso) con una prueba de Carisma (Persuasión, Engaño o Intimidación) o Sabiduría (Trato con Animales).' }
  ],
  weaponMasteries: [
    { name: 'Cleave (Hender)', weapons: 'Alabarda, Gran hacha', desc: 'Al impactar con un arma cuerpo a cuerpo, puedes realizar un ataque adicional contra una segunda criatura a 5 pies de la primera (1/turno).' },
    { name: 'Graze (Rozar)', weapons: 'Mandoble, Glaive', desc: 'Si tu tirada de ataque falla contra una criatura, aun así le infliges daño igual a tu modificador de característica del ataque.' },
    { name: 'Nick (Mellar)', weapons: 'Daga, Cimitarra, Hoz', desc: 'El ataque adicional de la propiedad Ligera (dos armas) se realiza como parte de tu Acción de Ataque en vez de consumir tu Acción Adicional.' },
    { name: 'Push (Empujar)', weapons: 'Martillo de guerra, Pica, Ballesta pesada', desc: 'Al impactar a una criatura Grande o menor, la empujas hasta 10 pies en línea recta lejos de ti sin tirada de salvación.' },
    { name: 'Sap (Socavar)', weapons: 'Espada larga, Maza, Lucero del alba', desc: 'La criatura impactada tiene Desventaja en su próxima tirada de ataque antes del inicio de tu siguiente turno.' },
    { name: 'Slow (Ralentizar)', weapons: 'Arco largo, Ballesta ligera, Jabalina', desc: 'Al impactar y hacer daño, reduces la Velocidad del objetivo en 10 pies hasta el inicio de tu siguiente turno.' },
    { name: 'Topple (Derribar)', weapons: 'Bastón, Tridente, Lanza de caballería', desc: 'Obligas al objetivo impactado a superar una salvación de Constitución (CD 8 + comp + mod) o caer Derribado (Prone).' },
    { name: 'Vex (Hostigar)', weapons: 'Estoque, Espada corta, Arco corto, Ballesta de mano', desc: 'Al impactar y hacer daño a una criatura, obtienes Ventaja en tu próxima tirada de ataque contra ella antes del fin de tu siguiente turno.' }
  ]
};

if (typeof window !== 'undefined') {
  window.DND_COMPENDIUM_CLASS_EXTRAS = DND_COMPENDIUM_CLASS_EXTRAS;
  window.DND_COMPENDIUM_SPECIES_EXTRAS = DND_COMPENDIUM_SPECIES_EXTRAS;
  window.DND_COMPENDIUM_EXTRA_SPELLS = DND_COMPENDIUM_EXTRA_SPELLS;
  window.DND_PLAYER_TURN_GUIDE = DND_PLAYER_TURN_GUIDE;
}

