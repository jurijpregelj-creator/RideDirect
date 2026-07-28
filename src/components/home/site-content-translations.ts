import type { ListingLocale } from "@/lib/translate-listing"

interface SiteContentStrings {
  nav: {
    browse: string
    sell: string
    contact: string
    postARide: string
    signOut: string
    myDashboard: string
    logIn: string
    signUpFree: string
  }
  footer: {
    description: string
    tagline: string
    marketplace: string
    sellers: string
    company: string
    browseAll: string
    majorRides: string
    familyRides: string
    inflatables: string
    sellWithUs: string
    createAccount: string
    sellerLogin: string
    contactUs: string
    about: string
    privacy: string
    terms: string
    copyright: string
    builtFor: string
  }
  hero: {
    badge: string
    title1: string
    title2: string
    title3: string
    subtitle: string
    viewListings: string
    sellWithUs: string
    trust1: string
    trust2: string
    trust3: string
  }
  categories: {
    title: string
    subtitle: string
  } & Record<
    | "major-rides" | "major-rides-desc"
    | "family-rides" | "family-rides-desc"
    | "kiddie-rides" | "kiddie-rides-desc"
    | "inflatables-soft-play" | "inflatables-soft-play-desc"
    | "arcade-coin-machines" | "arcade-coin-machines-desc"
    | "go-karts-track-attractions" | "go-karts-track-attractions-desc"
    | "event-mobile-attractions" | "event-mobile-attractions-desc"
    | "games-prize-booths" | "games-prize-booths-desc"
    | "indoor-parks-playgrounds" | "indoor-parks-playgrounds-desc"
    | "equipment-parts" | "equipment-parts-desc",
    string
  >
  howItWorks: {
    title: string
    subtitle: string
    step: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
  }
  marketplace: {
    title: string
    subtitle: string
    listingsFound_one: string
    listingsFound_other: string
    noListings: string
    noListingsDesc: string
  }
  featuredListings: {
    title: string
    subtitle: string
    viewAll: string
  }
  listingCard: {
    ceDocs: string
    inspection: string
  }
}

// Self-contained, all 8 locales — mirrors the reasoning in
// listing-page-translations.ts: fr/es/nl/pl/pt aren't in next-intl's
// routing.locales (only en/de/it are), so site-wide i18n config stays
// untouched while these two "front door" pages still get full translation.
// en/de/it text is copied verbatim from messages/{en,de,it}.json's
// hero/categories/howItWorks/marketplace namespaces.
export const SITE_T: Record<ListingLocale, SiteContentStrings> = {
  en: {
    nav: {
      browse: "Browse Listings", sell: "Sell With Us", contact: "Contact", postARide: "Post a Ride",
      signOut: "Sign out", myDashboard: "My Dashboard", logIn: "Log in", signUpFree: "Sign up free",
    },
    footer: {
      description: "Europe's dedicated B2B marketplace for buying and selling amusement rides and attractions.",
      tagline: "The future of amusement ride trading starts here.",
      marketplace: "Marketplace", sellers: "Sellers", company: "Company",
      browseAll: "Browse All Listings", majorRides: "Major Rides", familyRides: "Family Rides",
      inflatables: "Inflatables & Soft Play", sellWithUs: "Sell With Us", createAccount: "Create Account",
      sellerLogin: "Seller Login", contactUs: "Contact Us", about: "About RideDirect",
      privacy: "Privacy Policy", terms: "Terms of Service", copyright: "All rights reserved.",
      builtFor: "Built for the European amusement industry.",
    },
    hero: {
      badge: "Europe's #1 Amusement Ride Marketplace",
      title1: "The European Marketplace for",
      title2: "Amusement Rides",
      title3: "& Attractions",
      subtitle: "Buy, sell, and discover funfair equipment across Europe. Connect directly with verified sellers and buyers in the amusement industry.",
      viewListings: "View Listings",
      sellWithUs: "Sell With Us",
      trust1: "Verified B2B sellers only",
      trust2: "29 European countries",
      trust3: "Free to list & browse",
    },
    categories: {
      title: "Browse by Category",
      subtitle: "Find exactly what you're looking for across all segments of the amusement industry.",
      "major-rides": "Major Rides",
      "major-rides-desc": "Roller coasters, ferris wheels, thrill rides & large attractions",
      "family-rides": "Family Rides",
      "family-rides-desc": "Carousels, ghost trains, family-friendly attractions",
      "kiddie-rides": "Kiddie Rides",
      "kiddie-rides-desc": "Small rides designed for young children",
      "inflatables-soft-play": "Inflatables & Soft Play",
      "inflatables-soft-play-desc": "Bouncy castles, inflatable slides, soft play equipment",
      "arcade-coin-machines": "Arcade & Coin Machines",
      "arcade-coin-machines-desc": "Arcade cabinets, redemption games, coin-operated machines",
      "go-karts-track-attractions": "Go-Karts & Track Attractions",
      "go-karts-track-attractions-desc": "Bumper cars, go-karts, dodgems, electric tracks",
      "event-mobile-attractions": "Event & Mobile Attractions",
      "event-mobile-attractions-desc": "Transportable rides, road trains, mobile attractions for events",
      "games-prize-booths": "Games & Prize Booths",
      "games-prize-booths-desc": "Fairground games, prize booths, shooting galleries",
      "indoor-parks-playgrounds": "Indoor Parks & Playgrounds",
      "indoor-parks-playgrounds-desc": "Trampoline parks, climbing walls, indoor play structures",
      "equipment-parts": "Equipment & Parts",
      "equipment-parts-desc": "Spare parts, motors, control systems, maintenance equipment",
    },
    howItWorks: {
      title: "How RideDirect Works",
      subtitle: "A streamlined process designed specifically for professionals in the amusement industry.",
      step: "Step",
      step1Title: "Browse & Discover",
      step1Desc: "Search amusement ride listings across Europe. Filter by category, country, price, and condition to find your perfect match.",
      step2Title: "Contact the Seller",
      step2Desc: "Send a direct inquiry to the seller. Get detailed information, arrange inspections, and request additional documentation.",
      step3Title: "Close the Deal",
      step3Desc: "Negotiate directly with verified B2B sellers. Complete the transaction and arrange logistics — all within the RideDirect network.",
    },
    marketplace: {
      title: "Browse Listings",
      subtitle: "Amusement rides and attractions for sale across Europe",
      listingsFound_one: "{count} listing found",
      listingsFound_other: "{count} listings found",
      noListings: "No listings found",
      noListingsDesc: "Try adjusting your filters or search terms to find what you're looking for.",
    },
    featuredListings: {
      title: "Latest Listings",
      subtitle: "Recently listed amusement rides available across Europe",
      viewAll: "View all listings",
    },
    listingCard: { ceDocs: "CE Docs", inspection: "Inspection" },
  },
  de: {
    nav: {
      browse: "Alle Inserate", sell: "Mit uns verkaufen", contact: "Kontakt", postARide: "Inserat aufgeben",
      signOut: "Abmelden", myDashboard: "Mein Dashboard", logIn: "Anmelden", signUpFree: "Kostenlos registrieren",
    },
    footer: {
      description: "Europas spezialisierter B2B-Marktplatz für den Kauf und Verkauf von Fahrgeschäften und Attraktionen.",
      tagline: "Die Zukunft des Fahrgeschäft-Handels beginnt hier.",
      marketplace: "Marktplatz", sellers: "Verkäufer", company: "Unternehmen",
      browseAll: "Alle Inserate durchsuchen", majorRides: "Große Fahrgeschäfte", familyRides: "Familienfahrgeschäfte",
      inflatables: "Hüpfburgen & Softplay", sellWithUs: "Mit uns verkaufen", createAccount: "Konto erstellen",
      sellerLogin: "Verkäufer-Login", contactUs: "Kontakt", about: "Über RideDirect",
      privacy: "Datenschutz", terms: "Nutzungsbedingungen", copyright: "Alle Rechte vorbehalten.",
      builtFor: "Für die europäische Vergnügungsbranche entwickelt.",
    },
    hero: {
      badge: "Europas führender Marktplatz für Fahrgeschäfte",
      title1: "Der europäische Marktplatz für",
      title2: "Fahrgeschäfte",
      title3: "& Attraktionen",
      subtitle: "Kaufen, verkaufen und entdecken Sie Fahrgeschäfte in ganz Europa. Verbinden Sie sich direkt mit verifizierten Verkäufern und Käufern in der Vergnügungsbranche.",
      viewListings: "Inserate anzeigen",
      sellWithUs: "Mit uns verkaufen",
      trust1: "Nur verifizierte B2B-Verkäufer",
      trust2: "29 europäische Länder",
      trust3: "Kostenlos inserieren & stöbern",
    },
    categories: {
      title: "Nach Kategorie stöbern",
      subtitle: "Finden Sie genau das, was Sie suchen, in allen Segmenten der Vergnügungsbranche.",
      "major-rides": "Große Fahrgeschäfte",
      "major-rides-desc": "Achterbahnen, Riesenräder, Thrillanlagen & große Attraktionen",
      "family-rides": "Familienfahrgeschäfte",
      "family-rides-desc": "Karussells, Geisterbahnen, familienfreundliche Attraktionen",
      "kiddie-rides": "Kinderfahrgeschäfte",
      "kiddie-rides-desc": "Kleine Fahrgeschäfte für junge Kinder",
      "inflatables-soft-play": "Hüpfburgen & Softplay",
      "inflatables-soft-play-desc": "Hüpfburgen, aufblasbare Rutschen, Softplay-Ausstattung",
      "arcade-coin-machines": "Arcade & Münzautomaten",
      "arcade-coin-machines-desc": "Arcade-Automaten, Gewinnspiele, münzbetriebene Maschinen",
      "go-karts-track-attractions": "Go-Karts & Bahnattraktionen",
      "go-karts-track-attractions-desc": "Autoscooter, Go-Karts, Elektrobahnen",
      "event-mobile-attractions": "Event & Mobile Attraktionen",
      "event-mobile-attractions-desc": "Transportable Fahrgeschäfte, Straßenbahnen, mobile Attraktionen",
      "games-prize-booths": "Spiele & Gewinnbuden",
      "games-prize-booths-desc": "Jahrmarktspiele, Schießbuden, Gewinnbuden",
      "indoor-parks-playgrounds": "Indoor Parks & Spielplätze",
      "indoor-parks-playgrounds-desc": "Trampolinparks, Kletterwände, Indoor-Spielanlagen",
      "equipment-parts": "Ausrüstung & Ersatzteile",
      "equipment-parts-desc": "Ersatzteile, Motoren, Steuerungssysteme, Wartungsausrüstung",
    },
    howItWorks: {
      title: "Wie RideDirect funktioniert",
      subtitle: "Ein optimierter Prozess, der speziell für Fachleute der Vergnügungsbranche entwickelt wurde.",
      step: "Schritt",
      step1Title: "Stöbern & Entdecken",
      step1Desc: "Durchsuchen Sie Inserate für Fahrgeschäfte in ganz Europa. Filtern Sie nach Kategorie, Land, Preis und Zustand.",
      step2Title: "Verkäufer kontaktieren",
      step2Desc: "Senden Sie eine direkte Anfrage an den Verkäufer. Erhalten Sie detaillierte Informationen, vereinbaren Sie Besichtigungen.",
      step3Title: "Deal abschließen",
      step3Desc: "Verhandeln Sie direkt mit verifizierten B2B-Verkäufern. Schließen Sie die Transaktion ab und arrangieren Sie die Logistik.",
    },
    marketplace: {
      title: "Alle Inserate",
      subtitle: "Fahrgeschäfte und Attraktionen zum Verkauf in ganz Europa",
      listingsFound_one: "{count} Inserat gefunden",
      listingsFound_other: "{count} Inserate gefunden",
      noListings: "Keine Inserate gefunden",
      noListingsDesc: "Versuchen Sie, Ihre Filter oder Suchbegriffe anzupassen.",
    },
    featuredListings: {
      title: "Neueste Inserate",
      subtitle: "Kürzlich inserierte Fahrgeschäfte in ganz Europa",
      viewAll: "Alle Inserate anzeigen",
    },
    listingCard: { ceDocs: "CE-Dok.", inspection: "Besichtigung" },
  },
  it: {
    nav: {
      browse: "Tutti gli annunci", sell: "Vendi con noi", contact: "Contatti", postARide: "Pubblica annuncio",
      signOut: "Esci", myDashboard: "Il mio dashboard", logIn: "Accedi", signUpFree: "Registrati gratis",
    },
    footer: {
      description: "Il marketplace B2B europeo dedicato alla compravendita di attrazioni e giostre.",
      tagline: "Il futuro del commercio di attrazioni inizia qui.",
      marketplace: "Marketplace", sellers: "Venditori", company: "Azienda",
      browseAll: "Tutti gli annunci", majorRides: "Grandi attrazioni", familyRides: "Attrazioni per famiglie",
      inflatables: "Gonfiabili & Soft Play", sellWithUs: "Vendi con noi", createAccount: "Crea account",
      sellerLogin: "Accesso venditori", contactUs: "Contattaci", about: "Chi siamo",
      privacy: "Privacy Policy", terms: "Termini di servizio", copyright: "Tutti i diritti riservati.",
      builtFor: "Costruito per il settore europeo delle attrazioni.",
    },
    hero: {
      badge: "Il marketplace n°1 in Europa per le attrazioni",
      title1: "Il marketplace europeo per",
      title2: "Attrazioni e Giostre",
      title3: "",
      subtitle: "Compra, vendi e scopri attrezzature per parchi divertimento in tutta Europa. Connettiti direttamente con venditori e acquirenti verificati.",
      viewListings: "Vedi annunci",
      sellWithUs: "Vendi con noi",
      trust1: "Solo venditori B2B verificati",
      trust2: "29 paesi europei",
      trust3: "Gratuito per inserire e navigare",
    },
    categories: {
      title: "Cerca per categoria",
      subtitle: "Trova esattamente quello che cerchi in tutti i segmenti del settore delle attrazioni.",
      "major-rides": "Grandi Attrazioni",
      "major-rides-desc": "Montagne russe, ruote panoramiche, attrazioni emozionanti",
      "family-rides": "Attrazioni per Famiglie",
      "family-rides-desc": "Giostre, treni fantasma, attrazioni per famiglie",
      "kiddie-rides": "Giostre per Bambini",
      "kiddie-rides-desc": "Piccole giostre progettate per bambini piccoli",
      "inflatables-soft-play": "Gonfiabili & Soft Play",
      "inflatables-soft-play-desc": "Castelli gonfiabili, scivoli gonfiabili, attrezzature soft play",
      "arcade-coin-machines": "Arcade & Giochi a Gettoni",
      "arcade-coin-machines-desc": "Cabine arcade, giochi a premi, macchine a monete",
      "go-karts-track-attractions": "Go-Kart & Piste",
      "go-karts-track-attractions-desc": "Autoscontro, go-kart, piste elettriche",
      "event-mobile-attractions": "Attrazioni Mobili & Eventi",
      "event-mobile-attractions-desc": "Giostre trasportabili, trenini, attrazioni mobili per eventi",
      "games-prize-booths": "Giochi & Bancarelle",
      "games-prize-booths-desc": "Giochi da fiera, bancarelle, gallerie di tiro",
      "indoor-parks-playgrounds": "Parchi Indoor & Playground",
      "indoor-parks-playgrounds-desc": "Parchi trampolino, pareti da arrampicata, strutture indoor",
      "equipment-parts": "Attrezzature & Ricambi",
      "equipment-parts-desc": "Pezzi di ricambio, motori, sistemi di controllo, attrezzature di manutenzione",
    },
    howItWorks: {
      title: "Come funziona RideDirect",
      subtitle: "Un processo ottimizzato progettato specificamente per i professionisti del settore.",
      step: "Passo",
      step1Title: "Cerca e Scopri",
      step1Desc: "Cerca annunci di attrazioni in tutta Europa. Filtra per categoria, paese, prezzo e condizione.",
      step2Title: "Contatta il Venditore",
      step2Desc: "Invia una richiesta diretta al venditore. Ottieni informazioni dettagliate, organizza ispezioni e richiedi documentazione.",
      step3Title: "Chiudi l'Affare",
      step3Desc: "Negozia direttamente con venditori B2B verificati. Completa la transazione e organizza la logistica.",
    },
    marketplace: {
      title: "Tutti gli annunci",
      subtitle: "Attrazioni e giostre in vendita in tutta Europa",
      listingsFound_one: "{count} annuncio trovato",
      listingsFound_other: "{count} annunci trovati",
      noListings: "Nessun annuncio trovato",
      noListingsDesc: "Prova a modificare i filtri o i termini di ricerca.",
    },
    featuredListings: {
      title: "Ultimi annunci",
      subtitle: "Attrazioni pubblicate di recente disponibili in tutta Europa",
      viewAll: "Vedi tutti gli annunci",
    },
    listingCard: { ceDocs: "Doc. CE", inspection: "Ispezione" },
  },
  fr: {
    nav: {
      browse: "Toutes les annonces", sell: "Vendre avec nous", contact: "Contact", postARide: "Publier une annonce",
      signOut: "Se déconnecter", myDashboard: "Mon tableau de bord", logIn: "Connexion", signUpFree: "Inscription gratuite",
    },
    footer: {
      description: "Le marketplace B2B européen dédié à l'achat et la vente d'attractions et de manèges.",
      tagline: "L'avenir du commerce des attractions commence ici.",
      marketplace: "Marketplace", sellers: "Vendeurs", company: "Entreprise",
      browseAll: "Voir toutes les annonces", majorRides: "Grandes Attractions", familyRides: "Attractions Familiales",
      inflatables: "Structures Gonflables & Soft Play", sellWithUs: "Vendre avec nous", createAccount: "Créer un compte",
      sellerLogin: "Connexion vendeur", contactUs: "Nous contacter", about: "À propos de RideDirect",
      privacy: "Politique de confidentialité", terms: "Conditions d'utilisation", copyright: "Tous droits réservés.",
      builtFor: "Conçu pour le secteur européen des attractions.",
    },
    hero: {
      badge: "Le marketplace n°1 des attractions en Europe",
      title1: "Le marketplace européen pour",
      title2: "les Attractions",
      title3: "et Manèges",
      subtitle: "Achetez, vendez et découvrez des équipements de fête foraine dans toute l'Europe. Connectez-vous directement avec des vendeurs et acheteurs vérifiés du secteur.",
      viewListings: "Voir les annonces",
      sellWithUs: "Vendre avec nous",
      trust1: "Uniquement des vendeurs B2B vérifiés",
      trust2: "29 pays européens",
      trust3: "Gratuit pour publier et parcourir",
    },
    categories: {
      title: "Parcourir par catégorie",
      subtitle: "Trouvez exactement ce que vous cherchez dans tous les segments du secteur des attractions.",
      "major-rides": "Grandes Attractions",
      "major-rides-desc": "Montagnes russes, grandes roues, sensations fortes & grandes attractions",
      "family-rides": "Attractions Familiales",
      "family-rides-desc": "Manèges, trains fantômes, attractions familiales",
      "kiddie-rides": "Manèges pour Enfants",
      "kiddie-rides-desc": "Petits manèges conçus pour les jeunes enfants",
      "inflatables-soft-play": "Structures Gonflables & Soft Play",
      "inflatables-soft-play-desc": "Châteaux gonflables, toboggans gonflables, équipement soft play",
      "arcade-coin-machines": "Bornes d'Arcade & Machines à Pièces",
      "arcade-coin-machines-desc": "Bornes d'arcade, jeux à prix, machines à pièces",
      "go-karts-track-attractions": "Karting & Attractions sur Piste",
      "go-karts-track-attractions-desc": "Autos tamponneuses, karts, pistes électriques",
      "event-mobile-attractions": "Attractions Mobiles & Événementielles",
      "event-mobile-attractions-desc": "Manèges transportables, trains routiers, attractions mobiles pour événements",
      "games-prize-booths": "Jeux & Stands de Prix",
      "games-prize-booths-desc": "Jeux de fête foraine, stands de prix, stands de tir",
      "indoor-parks-playgrounds": "Parcs Intérieurs & Aires de Jeux",
      "indoor-parks-playgrounds-desc": "Parcs de trampoline, murs d'escalade, structures de jeu intérieures",
      "equipment-parts": "Équipement & Pièces Détachées",
      "equipment-parts-desc": "Pièces détachées, moteurs, systèmes de contrôle, équipement d'entretien",
    },
    howItWorks: {
      title: "Comment fonctionne RideDirect",
      subtitle: "Un processus simplifié conçu spécifiquement pour les professionnels du secteur des attractions.",
      step: "Étape",
      step1Title: "Parcourir & Découvrir",
      step1Desc: "Recherchez des annonces d'attractions dans toute l'Europe. Filtrez par catégorie, pays, prix et état.",
      step2Title: "Contacter le Vendeur",
      step2Desc: "Envoyez une demande directe au vendeur. Obtenez des informations détaillées, organisez des inspections.",
      step3Title: "Conclure l'Affaire",
      step3Desc: "Négociez directement avec des vendeurs B2B vérifiés. Finalisez la transaction et organisez la logistique.",
    },
    marketplace: {
      title: "Toutes les annonces",
      subtitle: "Attractions et manèges à vendre dans toute l'Europe",
      listingsFound_one: "{count} annonce trouvée",
      listingsFound_other: "{count} annonces trouvées",
      noListings: "Aucune annonce trouvée",
      noListingsDesc: "Essayez d'ajuster vos filtres ou vos termes de recherche.",
    },
    featuredListings: {
      title: "Dernières annonces",
      subtitle: "Attractions récemment mises en vente dans toute l'Europe",
      viewAll: "Voir toutes les annonces",
    },
    listingCard: { ceDocs: "Docs CE", inspection: "Inspection" },
  },
  es: {
    nav: {
      browse: "Todos los anuncios", sell: "Vender con nosotros", contact: "Contacto", postARide: "Publicar anuncio",
      signOut: "Cerrar sesión", myDashboard: "Mi panel", logIn: "Iniciar sesión", signUpFree: "Registro gratis",
    },
    footer: {
      description: "El marketplace B2B europeo dedicado a la compra y venta de atracciones y ferias.",
      tagline: "El futuro del comercio de atracciones empieza aquí.",
      marketplace: "Marketplace", sellers: "Vendedores", company: "Empresa",
      browseAll: "Ver todos los anuncios", majorRides: "Atracciones Principales", familyRides: "Atracciones Familiares",
      inflatables: "Inflables & Soft Play", sellWithUs: "Vender con nosotros", createAccount: "Crear cuenta",
      sellerLogin: "Acceso vendedores", contactUs: "Contáctanos", about: "Sobre RideDirect",
      privacy: "Política de privacidad", terms: "Términos de servicio", copyright: "Todos los derechos reservados.",
      builtFor: "Creado para el sector europeo de atracciones.",
    },
    hero: {
      badge: "El marketplace nº1 de atracciones en Europa",
      title1: "El marketplace europeo de",
      title2: "Atracciones",
      title3: "y Ferias",
      subtitle: "Compra, vende y descubre equipamiento de feria en toda Europa. Conecta directamente con vendedores y compradores verificados del sector.",
      viewListings: "Ver anuncios",
      sellWithUs: "Vender con nosotros",
      trust1: "Solo vendedores B2B verificados",
      trust2: "29 países europeos",
      trust3: "Gratis publicar y explorar",
    },
    categories: {
      title: "Explorar por categoría",
      subtitle: "Encuentra exactamente lo que buscas en todos los segmentos del sector de atracciones.",
      "major-rides": "Atracciones Principales",
      "major-rides-desc": "Montañas rusas, norias, atracciones de emoción y grandes atracciones",
      "family-rides": "Atracciones Familiares",
      "family-rides-desc": "Carruseles, trenes fantasma, atracciones familiares",
      "kiddie-rides": "Atracciones Infantiles",
      "kiddie-rides-desc": "Pequeñas atracciones diseñadas para niños",
      "inflatables-soft-play": "Inflables & Soft Play",
      "inflatables-soft-play-desc": "Castillos hinchables, toboganes inflables, equipo soft play",
      "arcade-coin-machines": "Máquinas Recreativas & de Monedas",
      "arcade-coin-machines-desc": "Máquinas arcade, juegos de premios, máquinas de monedas",
      "go-karts-track-attractions": "Karts & Atracciones de Circuito",
      "go-karts-track-attractions-desc": "Coches de choque, karts, pistas eléctricas",
      "event-mobile-attractions": "Atracciones Móviles & de Eventos",
      "event-mobile-attractions-desc": "Atracciones transportables, trenes de carretera, atracciones móviles para eventos",
      "games-prize-booths": "Juegos & Casetas de Premios",
      "games-prize-booths-desc": "Juegos de feria, casetas de premios, galerías de tiro",
      "indoor-parks-playgrounds": "Parques Interiores & Zonas de Juego",
      "indoor-parks-playgrounds-desc": "Parques de trampolines, muros de escalada, estructuras de juego interior",
      "equipment-parts": "Equipos & Repuestos",
      "equipment-parts-desc": "Repuestos, motores, sistemas de control, equipo de mantenimiento",
    },
    howItWorks: {
      title: "Cómo funciona RideDirect",
      subtitle: "Un proceso optimizado diseñado específicamente para profesionales del sector.",
      step: "Paso",
      step1Title: "Explorar y Descubrir",
      step1Desc: "Busca anuncios de atracciones en toda Europa. Filtra por categoría, país, precio y estado.",
      step2Title: "Contactar al Vendedor",
      step2Desc: "Envía una consulta directa al vendedor. Obtén información detallada, organiza inspecciones.",
      step3Title: "Cerrar el Trato",
      step3Desc: "Negocia directamente con vendedores B2B verificados. Completa la transacción y organiza la logística.",
    },
    marketplace: {
      title: "Todos los anuncios",
      subtitle: "Atracciones y ferias en venta en toda Europa",
      listingsFound_one: "{count} anuncio encontrado",
      listingsFound_other: "{count} anuncios encontrados",
      noListings: "No se encontraron anuncios",
      noListingsDesc: "Intenta ajustar tus filtros o términos de búsqueda.",
    },
    featuredListings: {
      title: "Últimos anuncios",
      subtitle: "Atracciones publicadas recientemente en toda Europa",
      viewAll: "Ver todos los anuncios",
    },
    listingCard: { ceDocs: "Docs CE", inspection: "Inspección" },
  },
  nl: {
    nav: {
      browse: "Alle advertenties", sell: "Verkoop met ons", contact: "Contact", postARide: "Advertentie plaatsen",
      signOut: "Uitloggen", myDashboard: "Mijn dashboard", logIn: "Inloggen", signUpFree: "Gratis registreren",
    },
    footer: {
      description: "De Europese B2B-marktplaats voor de aan- en verkoop van attracties en kermisuitrusting.",
      tagline: "De toekomst van attractiehandel begint hier.",
      marketplace: "Marktplaats", sellers: "Verkopers", company: "Bedrijf",
      browseAll: "Alle advertenties bekijken", majorRides: "Grote Attracties", familyRides: "Familieattracties",
      inflatables: "Springkussens & Soft Play", sellWithUs: "Verkoop met ons", createAccount: "Account aanmaken",
      sellerLogin: "Verkoper login", contactUs: "Neem contact op", about: "Over RideDirect",
      privacy: "Privacybeleid", terms: "Gebruiksvoorwaarden", copyright: "Alle rechten voorbehouden.",
      builtFor: "Gebouwd voor de Europese attractiebranche.",
    },
    hero: {
      badge: "Europa's nr. 1 marktplaats voor attracties",
      title1: "De Europese marktplaats voor",
      title2: "Attracties",
      title3: "& Kermisattracties",
      subtitle: "Koop, verkoop en ontdek kermisuitrusting in heel Europa. Maak direct contact met geverifieerde verkopers en kopers in de attractiebranche.",
      viewListings: "Bekijk advertenties",
      sellWithUs: "Verkoop met ons",
      trust1: "Alleen geverifieerde B2B-verkopers",
      trust2: "29 Europese landen",
      trust3: "Gratis plaatsen & bekijken",
    },
    categories: {
      title: "Bekijk per categorie",
      subtitle: "Vind precies wat u zoekt in alle segmenten van de attractiebranche.",
      "major-rides": "Grote Attracties",
      "major-rides-desc": "Achtbanen, reuzenraden, spannende attracties & grote publiekstrekkers",
      "family-rides": "Familieattracties",
      "family-rides-desc": "Draaimolens, spookhuizen, gezinsvriendelijke attracties",
      "kiddie-rides": "Kinderattracties",
      "kiddie-rides-desc": "Kleine attracties speciaal voor jonge kinderen",
      "inflatables-soft-play": "Springkussens & Soft Play",
      "inflatables-soft-play-desc": "Springkussens, opblaasbare glijbanen, soft play uitrusting",
      "arcade-coin-machines": "Arcade- & Muntautomaten",
      "arcade-coin-machines-desc": "Arcadekasten, prijsautomaten, muntautomaten",
      "go-karts-track-attractions": "Botsauto's & Baanattracties",
      "go-karts-track-attractions-desc": "Botsauto's, gokarts, elektrische banen",
      "event-mobile-attractions": "Mobiele & Evenementenattracties",
      "event-mobile-attractions-desc": "Transportabele attracties, treintjes, mobiele attracties voor evenementen",
      "games-prize-booths": "Kermisspellen & Prijzenkramen",
      "games-prize-booths-desc": "Kermisspellen, prijzenkramen, schiettenten",
      "indoor-parks-playgrounds": "Indoor Parken & Speeltuinen",
      "indoor-parks-playgrounds-desc": "Trampolineparken, klimwanden, indoor speeltoestellen",
      "equipment-parts": "Onderdelen & Uitrusting",
      "equipment-parts-desc": "Onderdelen, motoren, besturingssystemen, onderhoudsuitrusting",
    },
    howItWorks: {
      title: "Hoe RideDirect werkt",
      subtitle: "Een gestroomlijnd proces speciaal ontworpen voor professionals in de attractiebranche.",
      step: "Stap",
      step1Title: "Bekijken & Ontdekken",
      step1Desc: "Doorzoek attractie-advertenties in heel Europa. Filter op categorie, land, prijs en staat.",
      step2Title: "Contact met Verkoper",
      step2Desc: "Stuur een directe aanvraag naar de verkoper. Ontvang gedetailleerde informatie, plan inspecties.",
      step3Title: "Deal Afronden",
      step3Desc: "Onderhandel rechtstreeks met geverifieerde B2B-verkopers. Rond de transactie af en regel de logistiek.",
    },
    marketplace: {
      title: "Alle advertenties",
      subtitle: "Attracties en kermisuitrusting te koop in heel Europa",
      listingsFound_one: "{count} advertentie gevonden",
      listingsFound_other: "{count} advertenties gevonden",
      noListings: "Geen advertenties gevonden",
      noListingsDesc: "Probeer uw filters of zoektermen aan te passen.",
    },
    featuredListings: {
      title: "Nieuwste advertenties",
      subtitle: "Recent geplaatste attracties beschikbaar in heel Europa",
      viewAll: "Bekijk alle advertenties",
    },
    listingCard: { ceDocs: "CE-docs", inspection: "Inspectie" },
  },
  pl: {
    nav: {
      browse: "Wszystkie ogłoszenia", sell: "Sprzedawaj z nami", contact: "Kontakt", postARide: "Dodaj ogłoszenie",
      signOut: "Wyloguj się", myDashboard: "Mój panel", logIn: "Zaloguj się", signUpFree: "Zarejestruj się bezpłatnie",
    },
    footer: {
      description: "Europejski rynek B2B dedykowany kupnu i sprzedaży atrakcji i karuzeli.",
      tagline: "Przyszłość handlu atrakcjami zaczyna się tutaj.",
      marketplace: "Rynek", sellers: "Sprzedawcy", company: "Firma",
      browseAll: "Zobacz wszystkie ogłoszenia", majorRides: "Duże Atrakcje", familyRides: "Atrakcje Rodzinne",
      inflatables: "Dmuchańce & Soft Play", sellWithUs: "Sprzedawaj z nami", createAccount: "Utwórz konto",
      sellerLogin: "Logowanie sprzedawcy", contactUs: "Skontaktuj się z nami", about: "O RideDirect",
      privacy: "Polityka prywatności", terms: "Regulamin", copyright: "Wszelkie prawa zastrzeżone.",
      builtFor: "Stworzone dla europejskiej branży rozrywkowej.",
    },
    hero: {
      badge: "Wiodący europejski rynek atrakcji rozrywkowych",
      title1: "Europejski rynek dla",
      title2: "Atrakcji",
      title3: "i Karuzeli",
      subtitle: "Kupuj, sprzedawaj i odkrywaj sprzęt rozrywkowy w całej Europie. Łącz się bezpośrednio ze zweryfikowanymi sprzedawcami i kupującymi w branży rozrywkowej.",
      viewListings: "Zobacz ogłoszenia",
      sellWithUs: "Sprzedawaj z nami",
      trust1: "Tylko zweryfikowani sprzedawcy B2B",
      trust2: "29 krajów europejskich",
      trust3: "Bezpłatne wystawianie i przeglądanie",
    },
    categories: {
      title: "Przeglądaj według kategorii",
      subtitle: "Znajdź dokładnie to, czego szukasz, we wszystkich segmentach branży rozrywkowej.",
      "major-rides": "Duże Atrakcje",
      "major-rides-desc": "Kolejki górskie, diabelskie młyny, atrakcje ekstremalne i duże atrakcje",
      "family-rides": "Atrakcje Rodzinne",
      "family-rides-desc": "Karuzele, pociągi widmo, atrakcje rodzinne",
      "kiddie-rides": "Atrakcje Dziecięce",
      "kiddie-rides-desc": "Małe atrakcje przeznaczone dla małych dzieci",
      "inflatables-soft-play": "Dmuchańce & Soft Play",
      "inflatables-soft-play-desc": "Dmuchane zamki, dmuchane zjeżdżalnie, sprzęt soft play",
      "arcade-coin-machines": "Automaty Arcade & na Monety",
      "arcade-coin-machines-desc": "Automaty arcade, gry z nagrodami, automaty na monety",
      "go-karts-track-attractions": "Gokarty & Atrakcje Torowe",
      "go-karts-track-attractions-desc": "Samochodziki zderzakowe, gokarty, tory elektryczne",
      "event-mobile-attractions": "Atrakcje Mobilne & Eventowe",
      "event-mobile-attractions-desc": "Atrakcje przewoźne, pociągi drogowe, mobilne atrakcje na eventy",
      "games-prize-booths": "Gry & Stoiska z Nagrodami",
      "games-prize-booths-desc": "Gry jarmarczne, stoiska z nagrodami, strzelnice",
      "indoor-parks-playgrounds": "Parki Indoor & Place Zabaw",
      "indoor-parks-playgrounds-desc": "Parki trampolin, ścianki wspinaczkowe, place zabaw pod dachem",
      "equipment-parts": "Sprzęt & Części",
      "equipment-parts-desc": "Części zamienne, silniki, systemy sterowania, sprzęt konserwacyjny",
    },
    howItWorks: {
      title: "Jak działa RideDirect",
      subtitle: "Usprawniony proces zaprojektowany specjalnie dla profesjonalistów w branży rozrywkowej.",
      step: "Krok",
      step1Title: "Przeglądaj i Odkrywaj",
      step1Desc: "Przeszukuj ogłoszenia atrakcji w całej Europie. Filtruj według kategorii, kraju, ceny i stanu.",
      step2Title: "Skontaktuj się ze Sprzedawcą",
      step2Desc: "Wyślij bezpośrednie zapytanie do sprzedawcy. Uzyskaj szczegółowe informacje, umów oględziny.",
      step3Title: "Sfinalizuj Transakcję",
      step3Desc: "Negocjuj bezpośrednio ze zweryfikowanymi sprzedawcami B2B. Sfinalizuj transakcję i zorganizuj logistykę.",
    },
    marketplace: {
      title: "Wszystkie ogłoszenia",
      subtitle: "Atrakcje i karuzele na sprzedaż w całej Europie",
      listingsFound_one: "Znaleziono {count} ogłoszenie",
      listingsFound_other: "Znaleziono {count} ogłoszeń",
      noListings: "Nie znaleziono ogłoszeń",
      noListingsDesc: "Spróbuj dostosować filtry lub wyszukiwane hasła.",
    },
    featuredListings: {
      title: "Najnowsze ogłoszenia",
      subtitle: "Niedawno wystawione atrakcje dostępne w całej Europie",
      viewAll: "Zobacz wszystkie ogłoszenia",
    },
    listingCard: { ceDocs: "Dok. CE", inspection: "Inspekcja" },
  },
  pt: {
    nav: {
      browse: "Todos os anúncios", sell: "Vender connosco", contact: "Contacto", postARide: "Publicar anúncio",
      signOut: "Terminar sessão", myDashboard: "O meu painel", logIn: "Iniciar sessão", signUpFree: "Registo gratuito",
    },
    footer: {
      description: "O marketplace B2B europeu dedicado à compra e venda de atrações e diversões.",
      tagline: "O futuro do comércio de atrações começa aqui.",
      marketplace: "Marketplace", sellers: "Vendedores", company: "Empresa",
      browseAll: "Ver todos os anúncios", majorRides: "Grandes Atrações", familyRides: "Atrações Familiares",
      inflatables: "Insufláveis & Soft Play", sellWithUs: "Vender connosco", createAccount: "Criar conta",
      sellerLogin: "Acesso vendedores", contactUs: "Contacte-nos", about: "Sobre a RideDirect",
      privacy: "Política de Privacidade", terms: "Termos de Serviço", copyright: "Todos os direitos reservados.",
      builtFor: "Criado para o setor europeu de atrações.",
    },
    hero: {
      badge: "O marketplace nº1 de atrações na Europa",
      title1: "O marketplace europeu para",
      title2: "Atrações",
      title3: "e Diversões",
      subtitle: "Compre, venda e descubra equipamento de feira em toda a Europa. Conecte-se diretamente com vendedores e compradores verificados do setor.",
      viewListings: "Ver anúncios",
      sellWithUs: "Vender connosco",
      trust1: "Apenas vendedores B2B verificados",
      trust2: "29 países europeus",
      trust3: "Gratuito para publicar e explorar",
    },
    categories: {
      title: "Explorar por categoria",
      subtitle: "Encontre exatamente o que procura em todos os segmentos do setor de atrações.",
      "major-rides": "Grandes Atrações",
      "major-rides-desc": "Montanhas-russas, rodas gigantes, atrações radicais e grandes atrações",
      "family-rides": "Atrações Familiares",
      "family-rides-desc": "Carrosséis, comboios fantasma, atrações familiares",
      "kiddie-rides": "Atrações Infantis",
      "kiddie-rides-desc": "Pequenas atrações concebidas para crianças pequenas",
      "inflatables-soft-play": "Insufláveis & Soft Play",
      "inflatables-soft-play-desc": "Castelos insufláveis, escorregas insufláveis, equipamento soft play",
      "arcade-coin-machines": "Máquinas Arcade & de Moedas",
      "arcade-coin-machines-desc": "Máquinas arcade, jogos de prémios, máquinas de moedas",
      "go-karts-track-attractions": "Karts & Atrações de Pista",
      "go-karts-track-attractions-desc": "Carros de choque, karts, pistas elétricas",
      "event-mobile-attractions": "Atrações Móveis & de Eventos",
      "event-mobile-attractions-desc": "Atrações transportáveis, comboios de estrada, atrações móveis para eventos",
      "games-prize-booths": "Jogos & Bancas de Prémios",
      "games-prize-booths-desc": "Jogos de feira, bancas de prémios, carrosséis de tiro",
      "indoor-parks-playgrounds": "Parques Indoor & Recreativos",
      "indoor-parks-playgrounds-desc": "Parques de trampolins, paredes de escalada, estruturas de jogo indoor",
      "equipment-parts": "Equipamento & Peças",
      "equipment-parts-desc": "Peças sobresselentes, motores, sistemas de controlo, equipamento de manutenção",
    },
    howItWorks: {
      title: "Como funciona a RideDirect",
      subtitle: "Um processo simplificado concebido especificamente para profissionais do setor de atrações.",
      step: "Passo",
      step1Title: "Explorar e Descobrir",
      step1Desc: "Pesquise anúncios de atrações em toda a Europa. Filtre por categoria, país, preço e estado.",
      step2Title: "Contactar o Vendedor",
      step2Desc: "Envie uma consulta direta ao vendedor. Obtenha informações detalhadas, agende inspeções.",
      step3Title: "Fechar o Negócio",
      step3Desc: "Negoceie diretamente com vendedores B2B verificados. Finalize a transação e organize a logística.",
    },
    marketplace: {
      title: "Todos os anúncios",
      subtitle: "Atrações e diversões à venda em toda a Europa",
      listingsFound_one: "{count} anúncio encontrado",
      listingsFound_other: "{count} anúncios encontrados",
      noListings: "Nenhum anúncio encontrado",
      noListingsDesc: "Tente ajustar os seus filtros ou termos de pesquisa.",
    },
    featuredListings: {
      title: "Últimos anúncios",
      subtitle: "Atrações recentemente publicadas disponíveis em toda a Europa",
      viewAll: "Ver todos os anúncios",
    },
    listingCard: { ceDocs: "Docs CE", inspection: "Inspeção" },
  },
}
