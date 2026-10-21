export const quizQuestions = [
  {
    id: 1,
    minute: "1'",
    stage: "Fischio d'Inizio",
    title: "Preparazione pre-partita nello spogliatoio",
    scenario: "Mancano venti minuti al calcio d'inizio. L'aria puzza di canfora, sudore e ansia da prestazione. Tu cosa stai facendo?",
    options: [
      {
        id: 'A',
        text: "Marlboro rossa fumata vicino alla finestra dei bagni, un sorso di caffè corretto grappa e allacciatura rapida della scarpa col buco.",
        effects: { tec: 10, ign: 25, not: 20, ego: -5, fol: 15, pro: 30 },
        vibe: "Tatanka Style"
      },
      {
        id: 'B',
        text: "Cuffie dorate con reggaeton a volume spacca-timpani, selfie allo specchio per le storie IG e balletto con la maglia slacciata.",
        effects: { tec: 15, ign: 0, not: 30, ego: 25, fol: 20, pro: -25 },
        vibe: "VIP Trapper"
      },
      {
        id: 'C',
        text: "Fisso il muro con la bava alla bocca, mi do due schiaffi da solo sulle guance e urlo al terzino: 'Oggi non esce vivo nessuno!'.",
        effects: { tec: -10, ign: 30, not: -15, ego: 10, fol: 25, pro: 15 },
        vibe: "Ringhio Assoluto"
      },
      {
        id: 'D',
        text: "Stretching millimetrico col preparatore, massaggio alle caviglie con crema svizzera e sguardo impassibile da eletto del destino.",
        effects: { tec: 25, ign: -20, not: -20, ego: 25, fol: -10, pro: -25 },
        vibe: "Galactico Puro"
      }
    ]
  },
  {
    id: 2,
    minute: "12'",
    stage: "Estetica & Divisa",
    title: "Look ed estetica sul rettangolo verde",
    scenario: "L'occhio vuole la sua parte, anche sul campo in terra battuta della periferia. Come ti presenti alla contesa?",
    options: [
      {
        id: 'A',
        text: "Barba incolta da boscaiolo, pantaloncino slargato del torneo dei bar 2008 e calzettoni bucati sui polpacci.",
        effects: { tec: 10, ign: 20, not: 15, ego: -10, fol: 15, pro: 30 },
        vibe: "Mosca DOC"
      },
      {
        id: 'B',
        text: "Scarpe rosa fluo comprate ieri a 280€, doppio cerchietto tra i capelli e parastinchi minuscoli da 3 centimetri.",
        effects: { tec: 20, ign: -10, not: 25, ego: 25, fol: 15, pro: -25 },
        vibe: "Bling Bling"
      },
      {
        id: 'C',
        text: "Maglietta a maniche lunghe tirata su con nastro adesivo da elettricista, gomitiere ruvide e tacchetti in ferro affilati con la lima.",
        effects: { tec: -10, ign: 30, not: -10, ego: 15, fol: 20, pro: 15 },
        vibe: "Spaccatibie"
      },
      {
        id: 'D',
        text: "Fascia frontale alla Gervinho o treccine fluorescenti: se non sembro un glitch di una PlayStation 2 non entro neanche.",
        effects: { tec: 15, ign: 10, not: 15, ego: 20, fol: 30, pro: 0 },
        vibe: "Bug Grafico"
      }
    ]
  },
  {
    id: 3,
    minute: "25'",
    stage: "Il Gioco Si Scalda",
    title: "Reazione a un tunnel subito dall'avversario",
    scenario: "Il numero 10 avversario, con la tipica aria da sbruffone, ti fa passare la palla tra le gambe e ride guardando la panchina. La tua contromossa:",
    options: [
      {
        id: 'A',
        text: "Alla prima azione utile gli entro a forbice all'altezza dello sterno, prendo il giallo e gli sussurro: 'Il prossimo lo prendi coi denti'.",
        effects: { tec: -15, ign: 35, not: -5, ego: 15, fol: 25, pro: 10 },
        vibe: "Montero Docet"
      },
      {
        id: 'B',
        text: "Fingo un improvviso crampo al polpaccio, mi accascio al suolo con le mani in faccia e chiedo il cambio per non subire l'onta.",
        effects: { tec: 5, ign: -15, not: 20, ego: -20, fol: 25, pro: -10 },
        vibe: "Dramma Teatrale"
      },
      {
        id: 'C',
        text: "Rido beffardo, vado a riprendere la palla e nell'azione successiva gli faccio un sombrero al volo seguito da cucchiaio d'esterno.",
        effects: { tec: 30, ign: -15, not: 10, ego: 25, fol: 15, pro: -15 },
        vibe: "Classe Vendicativa"
      },
      {
        id: 'D',
        text: "Gli do una pacca sulla spalla sincera e gli dico: 'Bello questo, ma al terzo tempo al bar devi pagarla tu la prima caraffa'.",
        effects: { tec: 10, ign: 5, not: 25, ego: -10, fol: 5, pro: 30 },
        vibe: "Spirito da Osteria"
      }
    ]
  },
  {
    id: 4,
    minute: "38'",
    stage: "Tattica & Corsa",
    title: "Rapporto con la corsa e la fase difensiva",
    scenario: "La squadra perde palla a centrocampo e gli avversari ripartono in contropiede 4 contro 2. Qual è il tuo contributo alla causa?",
    options: [
      {
        id: 'A',
        text: "Metto le mani sui fianchi, cammino ciondolando nella metà campo avversaria e urlo: 'Chiudete la diagonaleeee!'.",
        effects: { tec: 20, ign: 5, not: 20, ego: 25, fol: 15, pro: -15 },
        vibe: "Fantantonio Mode"
      },
      {
        id: 'B',
        text: "Scatto di 70 metri a perdifiato, salto sopra tre cartelloni pubblicitari e salvo il pallone sulla linea scivolando di sedere.",
        effects: { tec: -5, ign: 20, not: -20, ego: -15, fol: 10, pro: 25 },
        vibe: "Giaccherini Infinito"
      },
      {
        id: 'C',
        text: "Fallo tattico preventivo: aggancio la maglia del portatore di palla da dietro e cadiamo abbracciati come due innamorati.",
        effects: { tec: 0, ign: 25, not: -5, ego: 10, fol: 15, pro: 15 },
        vibe: "Chiellini Tattico"
      },
      {
        id: 'D',
        text: "Mi accorcio al centro, guardo il passaggio con tre secondi di anticipo e intercetto d'esterno collo senza sporcarmi i calzettoni.",
        effects: { tec: 25, ign: -20, not: 0, ego: 20, fol: -10, pro: -20 },
        vibe: "Maldini & Pirlo"
      }
    ]
  },
  {
    id: 5,
    minute: "45'",
    stage: "Fine Primo Tempo",
    title: "Colloquio col mister nell'intervallo",
    scenario: "Siete sotto 1-0. Il mister apre la lavagna tattica con i pennarelli colorati per spiegare i movimenti difensivi. Tu come reagisci?",
    options: [
      {
        id: 'A',
        text: "Lo interrompo dopo tre secondi: 'Mister, buttatemi la palla alta che ci penso io a fare a sportellate coi due centrali'.",
        effects: { tec: 5, ign: 25, not: 10, ego: 15, fol: 10, pro: 30 },
        vibe: "Ariete di Provincia"
      },
      {
        id: 'B',
        text: "Sto mangiando una crostatina alla marmellata e rispondo alle chat di gruppo delle ragazze per la serata di stasera.",
        effects: { tec: 10, ign: 0, not: 30, ego: 20, fol: 20, pro: -20 },
        vibe: "Bomber da Discoteca"
      },
      {
        id: 'C',
        text: "Prendo la parola io con gli occhi fuori dalle orbite: 'Chi non corre nel secondo tempo lo mangio vivo nello spogliatoio!'.",
        effects: { tec: -10, ign: 30, not: -10, ego: 25, fol: 30, pro: 20 },
        vibe: "Ciccio Graziani Show"
      },
      {
        id: 'D',
        text: "Ascolto con sguardo algido, correggo io la tattica al mister sulla lavagna e chiedo che la palla passi sempre e solo dai miei piedi.",
        effects: { tec: 25, ign: -15, not: -10, ego: 30, fol: -5, pro: -25 },
        vibe: "Zlatan & D10S"
      }
    ]
  },
  {
    id: 6,
    minute: "58'",
    stage: "Momento Clou",
    title: "Egoismo sotto porta vs Assist al compagno",
    scenario: "Ti trovi al vertice dell'area piccola. Il tuo compagno di reparto è completamente solo a porta spalancata. Tu cosa decidi?",
    options: [
      {
        id: 'A',
        text: "Ignoro qualsiasi forma di vita sul pianeta: tiro una bomba a occhi chiusi sperando di spaccare la traversa.",
        effects: { tec: 15, ign: 20, not: 10, ego: 30, fol: 20, pro: 0 },
        vibe: "Batigol Furioso"
      },
      {
        id: 'B',
        text: "Faccio una finta di corpo, giro su me stesso di 720 gradi a vuoto e poi tento una trivela impossibile da posizione cieca.",
        effects: { tec: 20, ign: 10, not: 15, ego: 25, fol: 35, pro: -15 },
        vibe: "Antony & Quaresma"
      },
      {
        id: 'C',
        text: "La passo col contagiri di piatto sinistro: l'assist morbido vale quanto un'opera d'arte al museo.",
        effects: { tec: 25, ign: -20, not: -5, ego: -10, fol: -10, pro: -10 },
        vibe: "Totti & Baggio"
      },
      {
        id: 'D',
        text: "Tiro di stinco sporco, la palla carambola su tre difensori ed entra rotolando lemme lemme. Gol è gol!",
        effects: { tec: 0, ign: 15, not: 10, ego: 15, fol: 20, pro: 25 },
        vibe: "Pippo Inzaghi Doc"
      }
    ]
  },
  {
    id: 7,
    minute: "70'",
    stage: "Il Rigore Decisivo",
    title: "Come batti il calcio di rigore decisivo",
    scenario: "Rigore al 70°. Il portiere avversario tocca la traversa e prova a deconcentrarti con mosse da ballerino. Come affronti il dischetto?",
    options: [
      {
        id: 'A',
        text: "Cucchiaio morbido e beffardo al centro della porta mentre il portiere vola all'angolino, seguito da sorrisetto sornione.",
        effects: { tec: 30, ign: 5, not: 10, ego: 25, fol: 20, pro: -15 },
        vibe: "Er Cucchiaio"
      },
      {
        id: 'B',
        text: "Rincorsa lunghissima da fuori area e sassata centrale a 130 km/h: se il portiere la tocca gli stacco i polsi.",
        effects: { tec: 10, ign: 30, not: 10, ego: 20, fol: 15, pro: 15 },
        vibe: "Adriano & Roberto Carlos"
      },
      {
        id: 'C',
        text: "Fisso il portiere negli occhi senza battere ciglio, respiro a 40 battiti al minuto e palla all'incrocio a mezza altezza.",
        effects: { tec: 25, ign: -15, not: -15, ego: 20, fol: -15, pro: -20 },
        vibe: "Cold Palmer & Sheva"
      },
      {
        id: 'D',
        text: "Piattone rasoterra angolato 'sicuro', poi corro ad abbracciare il guardalinee urlando frasi senza senso in dialetto.",
        effects: { tec: 10, ign: 15, not: 20, ego: -5, fol: 15, pro: 30 },
        vibe: "Cuore di Provincia"
      }
    ]
  },
  {
    id: 8,
    minute: "82'",
    stage: "L'Apoteosi",
    title: "L'esultanza dopo il gol della vita",
    scenario: "La palla si insacca all'angolino per il gol vittoria. Lo stadio esplode in un boato. Qual è la tua reazione istintiva?",
    options: [
      {
        id: 'A',
        text: "Corsa verso la panchina, afferro una bottiglia di birra dal frigo del magazziniere e stappo coi denti brindando alla curva.",
        effects: { tec: 10, ign: 20, not: 30, ego: 10, fol: 25, pro: 35 },
        vibe: "Big Mac & Moscardelli"
      },
      {
        id: 'B',
        text: "Mi tolgo la maglia mostrandola al pubblico avversario, salto a gambe aperte con urlo liberatorio 'SIUUUU!'.",
        effects: { tec: 15, ign: -5, not: 10, ego: 35, fol: 10, pro: -30 },
        vibe: "CR7 Supreme"
      },
      {
        id: 'C',
        text: "Apro le braccia a mo' di Airone planando sulla bandierina, oppure faccio roteare la mano intorno all'orecchio per sentire il boato.",
        effects: { tec: 15, ign: 10, not: 15, ego: 15, fol: 15, pro: 25 },
        vibe: "Toni & Caracciolo"
      },
      {
        id: 'D',
        text: "Cinque capriole e salto mortale all'indietro atterrando in scivolata sulle ginocchia con le braccia conserte sotto le ascelle.",
        effects: { tec: 20, ign: 5, not: 15, ego: 20, fol: 30, pro: -10 },
        vibe: "Martins & Mbappé"
      }
    ]
  },
  {
    id: 9,
    minute: "90'",
    stage: "Terzo Tempo",
    title: "Il terzo tempo al bar del campo",
    scenario: "Triplice fischio. Doccia rapida e tutti al bancone del bar sociale tra toast bruciati e noccioline. Cosa ordini?",
    options: [
      {
        id: 'A',
        text: "Bionda media alla spina, panino con salamella e cipolle caramellate, e discussione animata su chi doveva marcare sui corner.",
        effects: { tec: 0, ign: 25, not: 25, ego: -5, fol: 10, pro: 35 },
        vibe: "Trattoria del Calcetto"
      },
      {
        id: 'B',
        text: "Bottiglia di Champagne con le stelline pirotecniche al tavolo VIP, occhiali da sole anche se sono le dieci di sera e ritmo trap.",
        effects: { tec: 10, ign: -10, not: 35, ego: 30, fol: 20, pro: -35 },
        vibe: "Formentera & Ibiza"
      },
      {
        id: 'C',
        text: "Bevo solo acqua oligominerale a temperatura ambiente, controllo i dati del GPS con i battiti cardiaci e vado a letto alle 22:30.",
        effects: { tec: 20, ign: -25, not: -35, ego: 25, fol: -20, pro: -25 },
        vibe: "Cyborg Professionista"
      },
      {
        id: 'D',
        text: "Mi fermo a sfidare il barista a freccette scommettendo 50 euro, poi organizzo una trasferta improvvisata in riviera fino all'alba.",
        effects: { tec: 10, ign: 15, not: 35, ego: 15, fol: 35, pro: 10 },
        vibe: "Gazza & Dinho"
      }
    ]
  },
  {
    id: 10,
    minute: "94'+R",
    stage: "Maxi-Recupero",
    title: "Le scuse nel gruppo WhatsApp del calcetto il martedì dopo",
    scenario: "Ore 18:30 del martedì. Manca un uomo per il calcetto delle 20:00. Il tuo messaggio sul gruppo:",
    options: [
      {
        id: 'A',
        text: "'Ragazzi, c'ho la pubalgia infiammata da lunedì per colpa del campo duro... ma se andate a mangiare la pizza dopo passo direttamente al dolce'.",
        effects: { tec: 5, ign: 15, not: 30, ego: 0, fol: 20, pro: 30 },
        vibe: "Pancia Piena"
      },
      {
        id: 'B',
        text: "'Non gioco con certi scarpari se non mi mettono le palle giuste sui piedi. Trovatevi un altro rifinitore'.",
        effects: { tec: 25, ign: 5, not: 10, ego: 35, fol: 20, pro: -25 },
        vibe: "Divo Incompreso"
      },
      {
        id: 'C',
        text: "'Presente anche con 38 di febbre e caviglia sfasciata! Portate il ghiaccio spray che vi spezzo la tibia a tutti'.",
        effects: { tec: -10, ign: 35, not: -10, ego: 10, fol: 25, pro: 20 },
        vibe: "Guerriero Indomito"
      },
      {
        id: 'D',
        text: "Mando solo un vocale di 3 secondi con un rutto o una risata malefica con sottofondo di musica house da un aeroporto.",
        effects: { tec: 10, ign: 15, not: 30, ego: 20, fol: 35, pro: -10 },
        vibe: "Lord Del Caos"
      }
    ]
  }
];
