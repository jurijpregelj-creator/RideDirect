import type { ListingLocale } from "@/lib/locales"

interface AboutStrings {
  metaTitle: string
  metaDescription: string
  title: string
  subtitle: string
  missionTitle: string
  missionP1: string
  missionP2: string
  missionP3Pre: string
  missionP3Post: string
  howItWorksTitle: string
  steps: { title: string; description: string }[]
  whyTitle: string
  pillars: { title: string; description: string }[]
  browseListings: string
  getInTouch: string
}

export const ABOUT_T: Record<ListingLocale, AboutStrings> = {
  en: {
    metaTitle: "About Us",
    metaDescription: "Learn about RideDirect.eu, Europe's dedicated B2B marketplace for buying and selling amusement rides and funfair equipment.",
    title: "About RideDirect",
    subtitle: "The first dedicated European marketplace for buying and selling amusement rides — built by operators, for operators.",
    missionTitle: "Our Mission",
    missionP1: "Buying and selling amusement rides in Europe has always been a pain. Deals happened through WhatsApp groups, word of mouth, and industry contacts you had to already know. There was no central place to search, no way to reach the whole European market, and no professional standard for listings.",
    missionP2: "We built RideDirect to fix that. One platform, all of Europe, zero middlemen. Whether you're offloading a carousel after a season or hunting for a specific dark ride, this is where the deal starts.",
    missionP3Pre: "RideDirect is operated by",
    missionP3Post: ", a company based in Slovenia. We're a small team with direct ties to the amusement industry — we know this market because we've worked in it.",
    howItWorksTitle: "How It Works",
    steps: [
      { title: "List your ride", description: "Create a listing in minutes. Add photos, specs, asking price, and location. Your ride is instantly visible to buyers across Europe — no brokers, no commissions, no waiting." },
      { title: "Find what you need", description: "Browse or search the full catalogue. Filter by type, country, price, or condition. Every listing is from a verified business — no consumers, no time-wasters." },
      { title: "Connect directly", description: "Contact the seller straight from the listing. No hidden routing, no platform in the middle. You negotiate and close on your terms." },
    ],
    whyTitle: "Why RideDirect",
    pillars: [
      { title: "No middlemen", description: "Deals happen between buyer and seller — directly. We don't take a cut of transactions and we don't insert ourselves into negotiations." },
      { title: "Europe-wide reach", description: "Listings are visible across the entire European market from day one. No more being limited to your local network or a single country's Facebook group." },
      { title: "Professional community", description: "The platform is B2B only. Everyone on RideDirect is a business or professional in the amusement industry — that means serious inquiries and real deals." },
    ],
    browseListings: "Browse Listings", getInTouch: "Get in Touch",
  },
  de: {
    metaTitle: "Über uns",
    metaDescription: "Erfahren Sie mehr über RideDirect.eu, Europas dedizierten B2B-Marktplatz für den Kauf und Verkauf von Fahrgeschäften und Kirmesausrüstung.",
    title: "Über RideDirect",
    subtitle: "Der erste dedizierte europäische Marktplatz für den Kauf und Verkauf von Fahrgeschäften — von Betreibern für Betreiber.",
    missionTitle: "Unsere Mission",
    missionP1: "Der Kauf und Verkauf von Fahrgeschäften in Europa war schon immer mühsam. Geschäfte liefen über WhatsApp-Gruppen, Mundpropaganda und Branchenkontakte, die man bereits kennen musste. Es gab keinen zentralen Ort zum Suchen, keine Möglichkeit, den gesamten europäischen Markt zu erreichen, und keinen professionellen Standard für Inserate.",
    missionP2: "Wir haben RideDirect gebaut, um das zu ändern. Eine Plattform, ganz Europa, null Vermittler. Ob Sie nach einer Saison ein Karussell abstoßen oder eine bestimmte Geisterbahn suchen — hier beginnt das Geschäft.",
    missionP3Pre: "RideDirect wird betrieben von",
    missionP3Post: ", einem Unternehmen mit Sitz in Slowenien. Wir sind ein kleines Team mit direkten Verbindungen zur Vergnügungsbranche — wir kennen diesen Markt, weil wir selbst darin gearbeitet haben.",
    howItWorksTitle: "So funktioniert's",
    steps: [
      { title: "Fahrgeschäft einstellen", description: "Erstellen Sie ein Inserat in wenigen Minuten. Fügen Sie Fotos, technische Daten, Preisvorstellung und Standort hinzu. Ihr Fahrgeschäft ist sofort für Käufer in ganz Europa sichtbar — keine Makler, keine Provisionen, kein Warten." },
      { title: "Finden, was Sie brauchen", description: "Durchsuchen Sie den gesamten Katalog. Filtern Sie nach Typ, Land, Preis oder Zustand. Jedes Inserat stammt von einem verifizierten Unternehmen — keine Verbraucher, keine Zeitverschwendung." },
      { title: "Direkt in Kontakt treten", description: "Kontaktieren Sie den Verkäufer direkt über das Inserat. Keine versteckte Weiterleitung, keine Plattform dazwischen. Sie verhandeln und schließen zu Ihren eigenen Bedingungen ab." },
    ],
    whyTitle: "Warum RideDirect",
    pillars: [
      { title: "Keine Vermittler", description: "Geschäfte finden direkt zwischen Käufer und Verkäufer statt. Wir behalten keinen Anteil an Transaktionen ein und mischen uns nicht in Verhandlungen ein." },
      { title: "Europaweite Reichweite", description: "Inserate sind vom ersten Tag an im gesamten europäischen Markt sichtbar. Nicht mehr beschränkt auf Ihr lokales Netzwerk oder eine einzelne Facebook-Gruppe eines Landes." },
      { title: "Professionelle Community", description: "Die Plattform ist ausschließlich B2B. Jeder auf RideDirect ist ein Unternehmen oder Fachmann der Vergnügungsbranche — das bedeutet ernsthafte Anfragen und echte Geschäfte." },
    ],
    browseListings: "Inserate durchsuchen", getInTouch: "Kontakt aufnehmen",
  },
  it: {
    metaTitle: "Chi Siamo",
    metaDescription: "Scopri RideDirect.eu, il marketplace B2B europeo dedicato all'acquisto e alla vendita di attrazioni e attrezzature per luna park.",
    title: "Chi Siamo",
    subtitle: "Il primo marketplace europeo dedicato all'acquisto e alla vendita di attrazioni — costruito da operatori, per operatori.",
    missionTitle: "La Nostra Missione",
    missionP1: "Comprare e vendere attrazioni in Europa è sempre stato complicato. Gli affari avvenivano tramite gruppi WhatsApp, passaparola e contatti del settore che dovevi già conoscere. Non esisteva un luogo centrale dove cercare, nessun modo per raggiungere l'intero mercato europeo e nessuno standard professionale per gli annunci.",
    missionP2: "Abbiamo creato RideDirect per risolvere questo problema. Un'unica piattaforma, tutta l'Europa, zero intermediari. Che tu stia vendendo una giostra dopo una stagione o cercando un dark ride specifico, è qui che inizia l'affare.",
    missionP3Pre: "RideDirect è gestito da",
    missionP3Post: ", un'azienda con sede in Slovenia. Siamo un piccolo team con legami diretti con il settore del divertimento — conosciamo questo mercato perché ci abbiamo lavorato.",
    howItWorksTitle: "Come Funziona",
    steps: [
      { title: "Pubblica la tua attrazione", description: "Crea un annuncio in pochi minuti. Aggiungi foto, specifiche, prezzo richiesto e posizione. La tua attrazione è immediatamente visibile agli acquirenti in tutta Europa — nessun broker, nessuna commissione, nessuna attesa." },
      { title: "Trova ciò che ti serve", description: "Sfoglia o cerca nel catalogo completo. Filtra per tipo, paese, prezzo o condizione. Ogni annuncio proviene da un'azienda verificata — niente consumatori, niente perditempo." },
      { title: "Connettiti direttamente", description: "Contatta il venditore direttamente dall'annuncio. Nessun instradamento nascosto, nessuna piattaforma di mezzo. Negozi e chiudi l'affare alle tue condizioni." },
    ],
    whyTitle: "Perché RideDirect",
    pillars: [
      { title: "Nessun intermediario", description: "Gli affari avvengono direttamente tra acquirente e venditore. Non tratteniamo una percentuale sulle transazioni e non ci inseriamo nelle trattative." },
      { title: "Copertura in tutta Europa", description: "Gli annunci sono visibili in tutto il mercato europeo fin dal primo giorno. Non più limitati alla tua rete locale o a un singolo gruppo Facebook nazionale." },
      { title: "Community professionale", description: "La piattaforma è esclusivamente B2B. Chiunque su RideDirect è un'azienda o un professionista del settore del divertimento — questo significa richieste serie e affari reali." },
    ],
    browseListings: "Sfoglia gli Annunci", getInTouch: "Contattaci",
  },
  fr: {
    metaTitle: "À Propos",
    metaDescription: "Découvrez RideDirect.eu, le marketplace B2B européen dédié à l'achat et la vente d'attractions et d'équipements forains.",
    title: "À Propos de RideDirect",
    subtitle: "Le premier marketplace européen dédié à l'achat et la vente d'attractions — conçu par des professionnels, pour des professionnels.",
    missionTitle: "Notre Mission",
    missionP1: "Acheter et vendre des attractions en Europe a toujours été compliqué. Les transactions se faisaient via des groupes WhatsApp, le bouche-à-oreille et des contacts du secteur qu'il fallait déjà connaître. Il n'existait aucun endroit centralisé pour chercher, aucun moyen d'atteindre l'ensemble du marché européen, et aucune norme professionnelle pour les annonces.",
    missionP2: "Nous avons créé RideDirect pour résoudre ce problème. Une seule plateforme, toute l'Europe, zéro intermédiaire. Que vous cédiez un carrousel après une saison ou recherchiez un dark ride précis, c'est ici que l'affaire commence.",
    missionP3Pre: "RideDirect est exploité par",
    missionP3Post: ", une société basée en Slovénie. Nous sommes une petite équipe avec des liens directs avec l'industrie du divertissement — nous connaissons ce marché parce que nous y avons travaillé.",
    howItWorksTitle: "Comment Ça Marche",
    steps: [
      { title: "Publiez votre attraction", description: "Créez une annonce en quelques minutes. Ajoutez des photos, des caractéristiques, un prix demandé et un emplacement. Votre attraction est instantanément visible par des acheteurs dans toute l'Europe — sans courtier, sans commission, sans attente." },
      { title: "Trouvez ce dont vous avez besoin", description: "Parcourez ou recherchez dans le catalogue complet. Filtrez par type, pays, prix ou état. Chaque annonce provient d'une entreprise vérifiée — pas de particuliers, pas de perte de temps." },
      { title: "Connectez-vous directement", description: "Contactez le vendeur directement depuis l'annonce. Aucun acheminement caché, aucune plateforme intermédiaire. Vous négociez et concluez selon vos propres conditions." },
    ],
    whyTitle: "Pourquoi RideDirect",
    pillars: [
      { title: "Aucun intermédiaire", description: "Les transactions se déroulent directement entre acheteur et vendeur. Nous ne prélevons aucune commission sur les transactions et ne nous immisçons pas dans les négociations." },
      { title: "Portée à l'échelle européenne", description: "Les annonces sont visibles sur l'ensemble du marché européen dès le premier jour. Fini les limites de votre réseau local ou d'un seul groupe Facebook national." },
      { title: "Communauté professionnelle", description: "La plateforme est réservée au B2B. Tous les membres de RideDirect sont des entreprises ou des professionnels du secteur du divertissement — ce qui garantit des demandes sérieuses et de vraies affaires." },
    ],
    browseListings: "Parcourir les Annonces", getInTouch: "Nous Contacter",
  },
  es: {
    metaTitle: "Sobre Nosotros",
    metaDescription: "Conoce RideDirect.eu, el marketplace B2B europeo dedicado a la compra y venta de atracciones y equipos feriales.",
    title: "Sobre RideDirect",
    subtitle: "El primer marketplace europeo dedicado a la compra y venta de atracciones — creado por operadores, para operadores.",
    missionTitle: "Nuestra Misión",
    missionP1: "Comprar y vender atracciones en Europa siempre ha sido complicado. Los acuerdos se hacían a través de grupos de WhatsApp, el boca a boca y contactos del sector que ya tenías que conocer. No existía un lugar centralizado donde buscar, ninguna forma de llegar a todo el mercado europeo, ni un estándar profesional para los anuncios.",
    missionP2: "Creamos RideDirect para solucionar esto. Una sola plataforma, toda Europa, cero intermediarios. Ya sea que estés vendiendo un carrusel tras una temporada o buscando un dark ride específico, aquí es donde empieza el trato.",
    missionP3Pre: "RideDirect está operado por",
    missionP3Post: ", una empresa con sede en Eslovenia. Somos un equipo pequeño con vínculos directos con la industria de atracciones — conocemos este mercado porque hemos trabajado en él.",
    howItWorksTitle: "Cómo Funciona",
    steps: [
      { title: "Publica tu atracción", description: "Crea un anuncio en minutos. Añade fotos, especificaciones, precio y ubicación. Tu atracción es visible al instante para compradores de toda Europa — sin intermediarios, sin comisiones, sin esperas." },
      { title: "Encuentra lo que necesitas", description: "Explora o busca en el catálogo completo. Filtra por tipo, país, precio o estado. Cada anuncio proviene de una empresa verificada — nada de particulares, nada de pérdidas de tiempo." },
      { title: "Conecta directamente", description: "Contacta al vendedor directamente desde el anuncio. Sin intermediación oculta, sin plataforma en medio. Negocias y cierras el trato en tus propios términos." },
    ],
    whyTitle: "Por Qué RideDirect",
    pillars: [
      { title: "Sin intermediarios", description: "Los acuerdos ocurren directamente entre comprador y vendedor. No nos quedamos con ninguna comisión de las transacciones ni nos involucramos en las negociaciones." },
      { title: "Alcance en toda Europa", description: "Los anuncios son visibles en todo el mercado europeo desde el primer día. Ya no estás limitado a tu red local o a un solo grupo de Facebook nacional." },
      { title: "Comunidad profesional", description: "La plataforma es exclusivamente B2B. Todos en RideDirect son empresas o profesionales de la industria de atracciones — eso significa consultas serias y acuerdos reales." },
    ],
    browseListings: "Ver Anuncios", getInTouch: "Contáctanos",
  },
  nl: {
    metaTitle: "Over Ons",
    metaDescription: "Ontdek RideDirect.eu, de Europese B2B-marktplaats speciaal voor het kopen en verkopen van attracties en kermisuitrusting.",
    title: "Over RideDirect",
    subtitle: "De eerste toegewijde Europese marktplaats voor het kopen en verkopen van attracties — gebouwd door exploitanten, voor exploitanten.",
    missionTitle: "Onze Missie",
    missionP1: "Het kopen en verkopen van attracties in Europa was altijd al lastig. Deals kwamen tot stand via WhatsApp-groepen, mond-tot-mondreclame en branchecontacten die je al moest kennen. Er was geen centrale plek om te zoeken, geen manier om de hele Europese markt te bereiken en geen professionele standaard voor advertenties.",
    missionP2: "We hebben RideDirect gebouwd om dat op te lossen. Eén platform, heel Europa, geen tussenpersonen. Of u nu na een seizoen een draaimolen kwijt wilt of op zoek bent naar een specifieke spookrit — hier begint de deal.",
    missionP3Pre: "RideDirect wordt beheerd door",
    missionP3Post: ", een bedrijf gevestigd in Slovenië. We zijn een klein team met directe banden met de attractie-industrie — we kennen deze markt omdat we er zelf in hebben gewerkt.",
    howItWorksTitle: "Hoe Het Werkt",
    steps: [
      { title: "Plaats uw attractie", description: "Maak in enkele minuten een advertentie aan. Voeg foto's, specificaties, vraagprijs en locatie toe. Uw attractie is direct zichtbaar voor kopers in heel Europa — geen makelaars, geen commissies, geen wachten." },
      { title: "Vind wat u nodig heeft", description: "Blader door of doorzoek de volledige catalogus. Filter op type, land, prijs of staat. Elke advertentie komt van een geverifieerd bedrijf — geen consumenten, geen tijdverspilling." },
      { title: "Neem direct contact op", description: "Neem rechtstreeks vanuit de advertentie contact op met de verkoper. Geen verborgen doorverwijzing, geen platform ertussen. U onderhandelt en sluit de deal op uw eigen voorwaarden." },
    ],
    whyTitle: "Waarom RideDirect",
    pillars: [
      { title: "Geen tussenpersonen", description: "Deals vinden rechtstreeks plaats tussen koper en verkoper. Wij nemen geen deel van transacties en mengen ons niet in onderhandelingen." },
      { title: "Europese dekking", description: "Advertenties zijn vanaf dag één zichtbaar in de gehele Europese markt. Niet langer beperkt tot uw lokale netwerk of één nationale Facebook-groep." },
      { title: "Professionele community", description: "Het platform is uitsluitend B2B. Iedereen op RideDirect is een bedrijf of professional in de attractie-industrie — dat betekent serieuze aanvragen en echte deals." },
    ],
    browseListings: "Advertenties Bekijken", getInTouch: "Neem Contact Op",
  },
  pl: {
    metaTitle: "O Nas",
    metaDescription: "Poznaj RideDirect.eu, europejski rynek B2B dedykowany kupnu i sprzedaży atrakcji oraz wyposażenia wesołych miasteczek.",
    title: "O RideDirect",
    subtitle: "Pierwszy europejski rynek dedykowany kupnu i sprzedaży atrakcji — stworzony przez operatorów, dla operatorów.",
    missionTitle: "Nasza Misja",
    missionP1: "Kupowanie i sprzedawanie atrakcji w Europie zawsze było uciążliwe. Transakcje odbywały się przez grupy WhatsApp, pocztę pantoflową i kontakty branżowe, które trzeba było już znać. Nie istniało centralne miejsce do wyszukiwania, żaden sposób na dotarcie do całego europejskiego rynku ani profesjonalny standard ogłoszeń.",
    missionP2: "Stworzyliśmy RideDirect, aby to naprawić. Jedna platforma, cała Europa, zero pośredników. Niezależnie od tego, czy sprzedajesz karuzelę po sezonie, czy szukasz konkretnej ciemnej kolejki — tutaj zaczyna się transakcja.",
    missionP3Pre: "RideDirect jest prowadzony przez",
    missionP3Post: ", firmę z siedzibą w Słowenii. Jesteśmy małym zespołem z bezpośrednimi powiązaniami z branżą rozrywkową — znamy ten rynek, ponieważ w nim pracowaliśmy.",
    howItWorksTitle: "Jak To Działa",
    steps: [
      { title: "Wystaw swoją atrakcję", description: "Utwórz ogłoszenie w kilka minut. Dodaj zdjęcia, specyfikacje, cenę wywoławczą i lokalizację. Twoja atrakcja jest natychmiast widoczna dla kupujących w całej Europie — bez pośredników, bez prowizji, bez czekania." },
      { title: "Znajdź to, czego potrzebujesz", description: "Przeglądaj lub przeszukuj pełny katalog. Filtruj według typu, kraju, ceny lub stanu. Każde ogłoszenie pochodzi od zweryfikowanej firmy — bez konsumentów, bez straty czasu." },
      { title: "Połącz się bezpośrednio", description: "Skontaktuj się ze sprzedawcą bezpośrednio z ogłoszenia. Bez ukrytego pośrednictwa, bez platformy pomiędzy. Negocjujesz i zamykasz transakcję na własnych warunkach." },
    ],
    whyTitle: "Dlaczego RideDirect",
    pillars: [
      { title: "Bez pośredników", description: "Transakcje odbywają się bezpośrednio między kupującym a sprzedającym. Nie pobieramy żadnej prowizji od transakcji ani nie ingerujemy w negocjacje." },
      { title: "Zasięg w całej Europie", description: "Ogłoszenia są widoczne na całym europejskim rynku od pierwszego dnia. Koniec z ograniczeniem do lokalnej sieci kontaktów czy jednej krajowej grupy na Facebooku." },
      { title: "Profesjonalna społeczność", description: "Platforma jest wyłącznie B2B. Każdy na RideDirect to firma lub profesjonalista z branży rozrywkowej — to oznacza poważne zapytania i prawdziwe transakcje." },
    ],
    browseListings: "Przeglądaj Ogłoszenia", getInTouch: "Skontaktuj Się",
  },
  pt: {
    metaTitle: "Sobre Nós",
    metaDescription: "Conheça a RideDirect.eu, o marketplace B2B europeu dedicado à compra e venda de atrações e equipamento de feiras.",
    title: "Sobre a RideDirect",
    subtitle: "O primeiro marketplace europeu dedicado à compra e venda de atrações — criado por operadores, para operadores.",
    missionTitle: "A Nossa Missão",
    missionP1: "Comprar e vender atrações na Europa sempre foi complicado. Os negócios aconteciam através de grupos de WhatsApp, boca a boca e contactos do setor que já era preciso conhecer. Não havia um local central para pesquisar, nenhuma forma de chegar a todo o mercado europeu e nenhum padrão profissional para os anúncios.",
    missionP2: "Criámos a RideDirect para resolver isso. Uma única plataforma, toda a Europa, zero intermediários. Quer esteja a vender um carrossel após uma temporada ou à procura de um dark ride específico, é aqui que o negócio começa.",
    missionP3Pre: "A RideDirect é gerida pela",
    missionP3Post: ", uma empresa sediada na Eslovénia. Somos uma equipa pequena com ligações diretas à indústria de diversão — conhecemos este mercado porque já trabalhámos nele.",
    howItWorksTitle: "Como Funciona",
    steps: [
      { title: "Publique a sua atração", description: "Crie um anúncio em minutos. Adicione fotos, especificações, preço pretendido e localização. A sua atração fica imediatamente visível para compradores em toda a Europa — sem intermediários, sem comissões, sem esperas." },
      { title: "Encontre o que precisa", description: "Explore ou pesquise no catálogo completo. Filtre por tipo, país, preço ou condição. Cada anúncio vem de uma empresa verificada — sem consumidores, sem perdas de tempo." },
      { title: "Conecte-se diretamente", description: "Contacte o vendedor diretamente a partir do anúncio. Sem encaminhamento oculto, sem plataforma pelo meio. Negoceia e fecha o negócio nos seus próprios termos." },
    ],
    whyTitle: "Porquê a RideDirect",
    pillars: [
      { title: "Sem intermediários", description: "Os negócios acontecem diretamente entre comprador e vendedor. Não ficamos com nenhuma percentagem das transações nem nos envolvemos nas negociações." },
      { title: "Alcance em toda a Europa", description: "Os anúncios são visíveis em todo o mercado europeu desde o primeiro dia. Já não está limitado à sua rede local ou a um único grupo nacional do Facebook." },
      { title: "Comunidade profissional", description: "A plataforma é exclusivamente B2B. Todos na RideDirect são empresas ou profissionais da indústria de diversão — isso significa pedidos sérios e negócios reais." },
    ],
    browseListings: "Ver Anúncios", getInTouch: "Entre em Contacto",
  },
}
