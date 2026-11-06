/**
 * ============================================================================
 * D&D 5ª EDICIÓN - DATOS DE LA GUÍA OFICIAL (14 APARTADOS)
 * Define las explicaciones teóricas, ejemplos y lado seguro de la tarjeta.
 * ============================================================================
 */

window.DND_GUIDE_STEPS = [
  {
    id: 'header',
    page: 'page-1',
    selector: '.dnd-header-frame',
    side: 'bottom',
    category: 'Identidad del Aventurero',
    title: 'Cabecera e Identidad de tu Héroe',
    what: 'Aquí se define la identidad y el núcleo de tu personaje: <strong>Nombre</strong>, <strong>Clase y Nivel</strong> (determinan tus puntos de golpe, competencias y progresión marcial o mágica), <strong>Trasfondo</strong> (tu origen y oficio previo), <strong>Especie</strong> (humano, elfo, enano, tiflin, etc.), <strong>Alineamiento</strong> y <strong>Puntos de Experiencia</strong>.',
    example: 'Creas a <em>"Thorin"</em>, un Guerrero de Nivel 1, Enano de las Colinas con Trasfondo Soldado. Tu clase te da dominio de todas las armas y armaduras; tu especie te otorga resistencia al veneno y +1 PG por nivel; y tu trasfondo te concede la dote Alerta y rango militar.',
    tip: 'En las reglas 2024 (5.5e), los incrementos de atributos (+2/+1) provienen directamente de tu Trasfondo.'
  },
  {
    id: 'attributes',
    page: 'page-1',
    selector: '.attributes-strip',
    side: 'right',
    category: 'Atributos Base',
    title: 'Las 6 Puntuaciones de Atributo',
    what: 'Son el motor matemático de toda la ficha: <strong>Fuerza (STR)</strong>, <strong>Destreza (DEX)</strong>, <strong>Constitución (CON)</strong>, <strong>Inteligencia (INT)</strong>, <strong>Sabiduría (WIS)</strong> y <strong>Carisma (CHA)</strong>. Cada puntuación genera un <em>Modificador</em> derivado: <code>(Puntuación - 10) / 2</code>, que se suma a tiradas de d20.',
    example: 'Si tienes Fuerza 16, tu modificador es <strong>+3</strong>. Cada vez que golpees con tu hacha de guerra o intentes forzar una reja de hierro oxidada, tirarás <code>1d20 + 3</code>.',
    tip: 'Las puntuaciones impares (ej. 15) dan el mismo bono (+2) que las pares (14). Procura subir a números pares para ganar más modificador.'
  },
  {
    id: 'flags',
    page: 'page-1',
    selector: '.skills-and-saves-subcol .inspiration-flag, .skills-and-saves-subcol .proficiency-flag',
    targetSingle: '.inspiration-flag',
    side: 'right',
    category: 'Mecánicas Clave',
    title: 'Inspiración y Bonificador de Competencia (PB)',
    what: 'La <strong>Inspiración Heroica</strong> es una recompensa del DM que te permite repetir cualquier tirada de d20. El <strong>Bonificador de Competencia</strong> (inicia en +2 a nivel 1 y escala hasta +6) refleja el adiestramiento profesional de tu aventurero y se suma a todo aquello en lo que estés entrenado.',
    example: 'Lanzas un ataque crucial contra el jefe ogro y sacas un pésimo 3 en el d20. Gastas tu Inspiración Heroica para relanzar ese dado inmediatamente y obtienes un 19, logrando impactar.',
    tip: 'El PB depende de tu nivel total de personaje, no de una clase individual.'
  },
  {
    id: 'saves',
    page: 'page-1',
    selector: '.saves-box',
    side: 'right',
    category: 'Defensa Reactiva',
    title: 'Tiradas de Salvación',
    what: 'Miden tu resistencia ante peligros repentinos: esquivar una trampa de pinchos (Destreza), resistir un veneno (Constitución) o repeler un hechizo de control mental (Sabiduría). Si tu clase te otorga competencia en una salvación, sumas tu <em>Modificador + PB</em>.',
    example: 'Un dragón rojo escupe un cono de llamas ardientes. El DM exige una Salvación de Destreza CD 15. Si tu Pícaro tiene Destreza 16 (+3) y competencia (+2), tiras <code>1d20 + 5</code>. Al superar la tirada sufres solo la mitad de daño.',
    tip: 'Los fallos en salvaciones contra efectos de parálisis o veneno suelen aplicar estados perjudiciales.'
  },
  {
    id: 'skills',
    page: 'page-1',
    selector: '.skills-box',
    side: 'right',
    category: 'Habilidades de Rol',
    title: 'Las 18 Habilidades Oficiales',
    what: 'Cubren todas las acciones de exploración, investigación y diplomacia fuera del combate puro. Cada habilidad está vinculada a un atributo base. Si marcas la casilla redonda de <strong>Competencia</strong> sumas tu PB; si tu clase otorga <strong>Pericia</strong> (Expertise) sumas el doble de tu PB.',
    example: 'El grupo busca huellas en un pantano sombrío. El explorador realiza una prueba de <em>Supervivencia (Sabiduría)</em>. Con Sabiduría 14 (+2) y Competencia (+2), lanza <code>1d20 + 4</code> para rastrear a los goblins.',
    tip: 'El cálculo numérico de cada habilidad se actualiza automáticamente al cambiar tus atributos.'
  },
  {
    id: 'passive',
    page: 'page-1',
    selector: '.passive-perception-capsule',
    side: 'right',
    category: 'Sentidos y Alerta',
    title: 'Sabiduría Pasiva (Percepción Pasiva)',
    what: 'Representa tu estado de alerta permanente cuando no estás buscando activamente peligros. Su valor base es <code>10 + modificador de Sabiduría (+ PB si tienes competencia)</code>. El DM compara las tiradas de Sigilo de monstruos o trampas ocultas contra este valor sin que tengas que tirar dados.',
    example: 'Tres asesinos acechan en las sombras con un resultado de Sigilo de 13. Si tu Percepción Pasiva es 14, el DM te advierte que escuchas el crujido de una bota antes de que puedan emboscarte.',
    tip: 'Tener ventaja fija suma +5 al valor pasivo; tener desventaja resta 5.'
  },
  {
    id: 'prof_languages',
    page: 'page-1',
    selector: '.prof-languages-box',
    side: 'right',
    category: 'Equipo y Lenguas',
    title: 'Otras Competencias e Idiomas',
    what: 'Registra las categorías de <strong>Armaduras</strong> que sabes vestir sin penalización, las <strong>Armas</strong> que dominas, las <strong>Herramientas</strong> que sabes usar (útiles de ladrón, alquimia, instrumentos musicales, carretas) y los <strong>Idiomas</strong> que hablas y lees.',
    example: 'Encuentras un grimorio cerrado con una cerradura compleja. Como tienes competencia en <em>Herramientas de Ladrón</em>, puedes sumar tu PB al intentar abrirlo sin romper el mecanismo.',
    tip: 'Vestir armadura sin tener competencia te impide lanzar conjuros e impone desventaja en tiradas físicas.'
  },
  {
    id: 'combat_trio',
    page: 'page-1',
    selector: '.combat-trio-row',
    side: 'bottom',
    category: 'Tríada de Combate',
    title: 'Clase de Armadura (CA), Iniciativa y Velocidad',
    what: 'Tres estadísticas vitales al desenfundar armas: <strong>CA</strong> es la dificultad que los ataques enemigos deben igualar o superar para herirte; <strong>Iniciativa</strong> (modificador de Destreza) define el orden de turnos al inicio del combate; y <strong>Velocidad</strong> indica cuántos pies (habitualmente 30 ft = 9 metros) puedes moverte en tu turno.',
    example: 'Un orco te arroja una jabalina obteniendo un 16. Si llevas Cota de Malla y Escudo para una <strong>CA de 18</strong>, el ataque golpea tu escudo y no sufres daño.',
    tip: 'La iniciativa se vincula automáticamente a tu Destreza en esta ficha interactiva.'
  },
  {
    id: 'hp_block',
    page: 'page-1',
    selector: '.hp-main-box',
    side: 'left',
    category: 'Salud y Vitalidad',
    title: 'Puntos de Golpe (PG), Dados y Salvaciones de Muerte',
    what: 'Mide la supervivencia de tu héroe. Los <strong>PG Actuales / Máximos</strong> representan tu vida; los <strong>PG Temporales</strong> absorben daño antes de tocar tu salud real; los <strong>Dados de Golpe</strong> se gastan durante un Descanso Corto para curarte; y las <strong>Salvaciones de Muerte</strong> deciden si sobrevives al caer a 0 PG (3 éxitos para estabilizarte vs 3 fallos para perecer).',
    example: 'Un trasgo te deja a 0 PG. En tu turno tiras 1d20 de Muerte: sacas 14 (¡1er éxito!). Si acumulas 3 éxitos te estabilizas; pero si recibes daño mientras estás inconsciente, sufres fallos automáticos.',
    tip: 'Usa los botones de Descanso Corto y Largo en el menú lateral para curarte y recuperar dados con un clic.'
  },
  {
    id: 'attacks',
    page: 'page-1',
    selector: '.attacks-spellcasting-box',
    side: 'left',
    category: 'Arsenal Ofensivo',
    title: 'Ataques, Armas y Conjuros',
    what: 'Tu catálogo de combate. Anotas las armas y trucos que empuñas, el <strong>Bonificador de Ataque</strong> (Atributo + PB) y el <strong>Daño y Tipo</strong> (ej. 1d8+3 Cortante). También incluye el botón de <em>Compendio de Armas 5.5e</em> para agregar armas oficiales con sus propiedades especiales en un instante.',
    example: 'Con una Espada Larga a una mano y Fuerza 16 (+3) con PB +2, tu bonificador de ataque es <strong>+5</strong>. Si impactas, infliges <code>1d8 + 3</code> de daño cortante.',
    tip: 'Las armas sutiles (Finesse) te permiten elegir entre Fuerza o Destreza para atacar y dañar.'
  },
  {
    id: 'equipment',
    page: 'page-1',
    selector: '.equipment-box',
    side: 'left',
    category: 'Inventario y Riqueza',
    title: 'Equipo, Monedas y Capacidad de Carga',
    what: 'Gestiona tu bolsa de viaje y tu economía oficial: Cobre (CP), Plata (SP), Electro (EP), Oro (GP) y Platino (PP). Calcula automáticamente tu <strong>Capacidad de Carga Máxima</strong> (Fuerza × 15 lb) y suma el peso en libras de todo lo que llevas para evitar penalizaciones por sobrecarga.',
    example: 'Con Fuerza 12, tu capacidad de carga es de 180 lb. Llevas 85 lb entre armadura, mochila y raciones, quedándote 95 lb libres para transportar el botín de la mazmorra.',
    tip: '10 piezas de cobre equivalen a 1 de plata; 10 piezas de plata equivalen a 1 de oro.'
  },
  {
    id: 'features_traits',
    page: 'page-1',
    selector: '.features-traits-box',
    side: 'left',
    category: 'Poderes Especiales',
    title: 'Rasgos de Clase, Dotes y Facultades',
    what: 'Tus talentos heroicos y poderes únicos: <em>Acción Súbita</em>, <em>Furia Bárbara</em>, <em>Imposición de Manos</em>, <em>Ataque Furtivo</em> o <em>Canalizar Divinidad</em>. Es tu chuleta táctica para recordar qué habilidades puedes activar en tu turno.',
    example: 'En una ronda decisiva, tu Guerrero activa su rasgo <strong>Acción Súbita (Action Surge)</strong> para obtener una acción adicional completa y asestar dos mandobles consecutivos.',
    tip: 'Anota aquí también los usos por descanso (ej. 1/Descanso Corto).'
  },
  {
    id: 'page_2',
    page: 'page-2',
    selector: '#page-2 .p2-main-grid',
    side: 'bottom',
    category: 'Historia y Roleplay',
    title: 'Página 2: Biografía, Retrato, Aliados y Tesoros',
    what: 'El alma de tu personaje. Puedes subir un <strong>Retrato / Avatar</strong>, describir su aspecto (edad, altura, ojos), redactar su <strong>Historia Personal</strong>, registrar organizaciones o <strong>Aliados</strong> (con símbolo heráldico) y anotar gemas, reliquias y <strong>Tesoros</strong> mágicos.',
    example: 'Anotas que perteneces a la facción secreta de <em>Los Arpistas</em> y subes la imagen de su emblema de arpón de plata, lo que te permite conseguir posada gratis en ciudades del norte.',
    tip: 'Haz clic en el cuadro de retrato para subir cualquier imagen PNG o JPG desde tu ordenador.'
  },
  {
    id: 'page_3',
    page: 'page-3',
    selector: '#page-3 .spell-casting-layout',
    side: 'bottom',
    category: 'Grimorio Mágico',
    title: 'Página 3: Conjuros, Espacios y Magia 5.5e',
    what: 'El panel para hechiceros, clérigos, magos, druidas, paladines y exploradores. Calcula automáticamente tu <strong>CD de Salvación de Conjuros</strong> (8 + PB + Atributo) y tu <strong>Bono de Ataque de Conjuro</strong>. Gestiona tus espacios de nivel 1 al 9, trucos conocidos y compendio de hechizos 2024.',
    example: 'Un Clérigo con Sabiduría 16 (+3) y nivel 1 (PB +2) tiene una CD de <strong>13</strong>. Cuando lanza <em>Descarga Sagrada</em>, el objetivo debe igualar o superar 13 en una salvación de Destreza.',
    tip: 'Al hacer un Descanso Largo desde el menú lateral, todas tus casillas de conjuro gastadas se restauran al máximo.'
  }
];
