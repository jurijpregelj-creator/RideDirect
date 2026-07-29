import type { ListingLocale } from "@/lib/locales"

interface SellStrings {
  metaTitle: string
  metaDescription: string
  badge: string
  heroTitle1: string
  heroTitleHighlight: string
  heroSub: string
  startSellingFree: string
  talkToTeam: string
  whyTitle: string
  whySub: string
  benefits: { title: string; description: string }[]
  howTitle: string
  steps: { title: string; description: string }[]
  whatTitle: string
  whatSub: string
  ctaTitle: string
  ctaSub: string
  postARide: string
  createFreeAccount: string
}

export const SELL_T: Record<ListingLocale, SellStrings> = {
  en: {
    metaTitle: "Sell Your Amusement Rides | RideDirect",
    metaDescription: "List your amusement rides on RideDirect.eu and reach verified buyers across Europe.",
    badge: "Europe's dedicated amusement ride marketplace",
    heroTitle1: "Sell Your Amusement Rides", heroTitleHighlight: "Across Europe",
    heroSub: "RideDirect.eu connects you with serious, verified buyers across 29 European countries. List your rides for free and reach the entire European amusement industry.",
    startSellingFree: "Start Selling Free", talkToTeam: "Talk to Our Team",
    whyTitle: "Why Sell on RideDirect?", whySub: "The only marketplace built specifically for the European amusement industry.",
    benefits: [
      { title: "Pan-European Reach", description: "Reach buyers in 29 European countries. Your listing is visible to the entire European amusement industry." },
      { title: "Verified B2B Buyers", description: "Every inquiry comes from a verified business. No time-wasters — only serious industry professionals." },
      { title: "Fast Time-to-Sale", description: "Our targeted audience means faster deals. Sellers typically receive their first inquiries within days." },
      { title: "Full Control", description: "You manage your listing, set your price, and communicate directly with buyers. No middleman fees." },
    ],
    howTitle: "How to List Your Ride",
    steps: [
      { title: "Create your account", description: "Sign up for a free seller account. Verification takes less than 24 hours." },
      { title: "Create your listing", description: "Add photos, description, CE documentation, condition, price, and all relevant details." },
      { title: "Get approved", description: "Our team reviews each listing to ensure quality. Approval typically happens within 1 business day." },
      { title: "Receive inquiries", description: "Qualified buyers contact you directly. You negotiate and close the deal on your own terms." },
    ],
    whatTitle: "What You Can List", whatSub: "We accept all professional amusement equipment across these categories:",
    ctaTitle: "Ready to Sell Your Rides?", ctaSub: "Create your free account today and list your first ride in under 10 minutes.",
    postARide: "Post a Ride", createFreeAccount: "Create Free Account",
  },
  de: {
    metaTitle: "Verkaufen Sie Ihre Fahrgeschäfte | RideDirect",
    metaDescription: "Listen Sie Ihre Fahrgeschäfte auf RideDirect.eu und erreichen Sie verifizierte Käufer in ganz Europa.",
    badge: "Europas dedizierter Marktplatz für Fahrgeschäfte",
    heroTitle1: "Verkaufen Sie Ihre Fahrgeschäfte", heroTitleHighlight: "In ganz Europa",
    heroSub: "RideDirect.eu verbindet Sie mit seriösen, verifizierten Käufern in 29 europäischen Ländern. Listen Sie Ihre Fahrgeschäfte kostenlos und erreichen Sie die gesamte europäische Vergnügungsbranche.",
    startSellingFree: "Kostenlos verkaufen", talkToTeam: "Mit unserem Team sprechen",
    whyTitle: "Warum bei RideDirect verkaufen?", whySub: "Der einzige Marktplatz, der speziell für die europäische Vergnügungsbranche entwickelt wurde.",
    benefits: [
      { title: "Europaweite Reichweite", description: "Erreichen Sie Käufer in 29 europäischen Ländern. Ihr Inserat ist für die gesamte europäische Vergnügungsbranche sichtbar." },
      { title: "Verifizierte B2B-Käufer", description: "Jede Anfrage kommt von einem verifizierten Unternehmen. Keine Zeitverschwendung — nur ernsthafte Branchenprofis." },
      { title: "Schneller Verkauf", description: "Unser gezieltes Publikum bedeutet schnellere Geschäfte. Verkäufer erhalten in der Regel innerhalb weniger Tage erste Anfragen." },
      { title: "Volle Kontrolle", description: "Sie verwalten Ihr Inserat, legen Ihren Preis fest und kommunizieren direkt mit Käufern. Keine Vermittlergebühren." },
    ],
    howTitle: "So listen Sie Ihr Fahrgeschäft",
    steps: [
      { title: "Konto erstellen", description: "Registrieren Sie sich für ein kostenloses Verkäuferkonto. Die Verifizierung dauert weniger als 24 Stunden." },
      { title: "Inserat erstellen", description: "Fügen Sie Fotos, Beschreibung, CE-Dokumentation, Zustand, Preis und alle relevanten Details hinzu." },
      { title: "Genehmigung erhalten", description: "Unser Team prüft jedes Inserat auf Qualität. Die Genehmigung erfolgt in der Regel innerhalb eines Werktages." },
      { title: "Anfragen erhalten", description: "Qualifizierte Käufer kontaktieren Sie direkt. Sie verhandeln und schließen das Geschäft zu Ihren eigenen Bedingungen ab." },
    ],
    whatTitle: "Was Sie listen können", whatSub: "Wir akzeptieren professionelle Vergnügungsausrüstung in folgenden Kategorien:",
    ctaTitle: "Bereit, Ihre Fahrgeschäfte zu verkaufen?", ctaSub: "Erstellen Sie noch heute Ihr kostenloses Konto und listen Sie Ihr erstes Fahrgeschäft in weniger als 10 Minuten.",
    postARide: "Fahrgeschäft einstellen", createFreeAccount: "Kostenloses Konto erstellen",
  },
  it: {
    metaTitle: "Vendi le tue attrazioni | RideDirect",
    metaDescription: "Metti in vendita le tue attrazioni su RideDirect.eu e raggiungi acquirenti verificati in tutta Europa.",
    badge: "Il marketplace europeo dedicato alle attrazioni",
    heroTitle1: "Vendi le Tue Attrazioni", heroTitleHighlight: "In Tutta Europa",
    heroSub: "RideDirect.eu ti mette in contatto con acquirenti seri e verificati in 29 paesi europei. Pubblica gratuitamente i tuoi annunci e raggiungi l'intero settore europeo del divertimento.",
    startSellingFree: "Inizia a Vendere Gratis", talkToTeam: "Parla con il Nostro Team",
    whyTitle: "Perché Vendere su RideDirect?", whySub: "L'unico marketplace creato specificamente per il settore europeo del divertimento.",
    benefits: [
      { title: "Copertura Paneuropea", description: "Raggiungi acquirenti in 29 paesi europei. Il tuo annuncio è visibile all'intero settore europeo del divertimento." },
      { title: "Acquirenti B2B Verificati", description: "Ogni richiesta proviene da un'azienda verificata. Niente perdite di tempo — solo professionisti seri del settore." },
      { title: "Vendita Rapida", description: "Il nostro pubblico mirato significa affari più veloci. I venditori ricevono in genere le prime richieste entro pochi giorni." },
      { title: "Controllo Totale", description: "Gestisci il tuo annuncio, imposti il prezzo e comunichi direttamente con gli acquirenti. Nessuna commissione di intermediazione." },
    ],
    howTitle: "Come Pubblicare la Tua Attrazione",
    steps: [
      { title: "Crea il tuo account", description: "Registrati per un account venditore gratuito. La verifica richiede meno di 24 ore." },
      { title: "Crea il tuo annuncio", description: "Aggiungi foto, descrizione, documentazione CE, condizione, prezzo e tutti i dettagli rilevanti." },
      { title: "Ottieni l'approvazione", description: "Il nostro team esamina ogni annuncio per garantirne la qualità. L'approvazione avviene generalmente entro 1 giorno lavorativo." },
      { title: "Ricevi richieste", description: "Gli acquirenti qualificati ti contattano direttamente. Negozi e chiudi l'affare alle tue condizioni." },
    ],
    whatTitle: "Cosa Puoi Vendere", whatSub: "Accettiamo tutte le attrezzature professionali per il divertimento nelle seguenti categorie:",
    ctaTitle: "Pronto a Vendere le Tue Attrazioni?", ctaSub: "Crea oggi il tuo account gratuito e pubblica la tua prima attrazione in meno di 10 minuti.",
    postARide: "Pubblica un'Attrazione", createFreeAccount: "Crea Account Gratuito",
  },
  fr: {
    metaTitle: "Vendez vos attractions | RideDirect",
    metaDescription: "Mettez en vente vos attractions sur RideDirect.eu et touchez des acheteurs vérifiés dans toute l'Europe.",
    badge: "Le marketplace européen dédié aux attractions",
    heroTitle1: "Vendez Vos Attractions", heroTitleHighlight: "Dans Toute l'Europe",
    heroSub: "RideDirect.eu vous met en relation avec des acheteurs sérieux et vérifiés dans 29 pays européens. Publiez vos annonces gratuitement et touchez l'ensemble de l'industrie européenne du divertissement.",
    startSellingFree: "Commencer à Vendre Gratuitement", talkToTeam: "Parler à Notre Équipe",
    whyTitle: "Pourquoi Vendre sur RideDirect ?", whySub: "Le seul marketplace conçu spécifiquement pour l'industrie européenne du divertissement.",
    benefits: [
      { title: "Portée Paneuropéenne", description: "Touchez des acheteurs dans 29 pays européens. Votre annonce est visible par l'ensemble de l'industrie européenne du divertissement." },
      { title: "Acheteurs B2B Vérifiés", description: "Chaque demande provient d'une entreprise vérifiée. Pas de perte de temps — uniquement des professionnels sérieux du secteur." },
      { title: "Vente Rapide", description: "Notre audience ciblée signifie des transactions plus rapides. Les vendeurs reçoivent généralement leurs premières demandes en quelques jours." },
      { title: "Contrôle Total", description: "Vous gérez votre annonce, fixez votre prix et communiquez directement avec les acheteurs. Aucune commission d'intermédiaire." },
    ],
    howTitle: "Comment Publier Votre Attraction",
    steps: [
      { title: "Créez votre compte", description: "Inscrivez-vous pour un compte vendeur gratuit. La vérification prend moins de 24 heures." },
      { title: "Créez votre annonce", description: "Ajoutez des photos, une description, la documentation CE, l'état, le prix et tous les détails pertinents." },
      { title: "Obtenez l'approbation", description: "Notre équipe examine chaque annonce pour en garantir la qualité. L'approbation se fait généralement sous 1 jour ouvré." },
      { title: "Recevez des demandes", description: "Des acheteurs qualifiés vous contactent directement. Vous négociez et concluez l'affaire selon vos propres conditions." },
    ],
    whatTitle: "Ce Que Vous Pouvez Vendre", whatSub: "Nous acceptons tous les équipements professionnels de divertissement dans les catégories suivantes :",
    ctaTitle: "Prêt à Vendre Vos Attractions ?", ctaSub: "Créez votre compte gratuit dès aujourd'hui et publiez votre première attraction en moins de 10 minutes.",
    postARide: "Publier une Attraction", createFreeAccount: "Créer un Compte Gratuit",
  },
  es: {
    metaTitle: "Vende tus atracciones | RideDirect",
    metaDescription: "Publica tus atracciones en RideDirect.eu y llega a compradores verificados en toda Europa.",
    badge: "El marketplace europeo dedicado a las atracciones",
    heroTitle1: "Vende Tus Atracciones", heroTitleHighlight: "En Toda Europa",
    heroSub: "RideDirect.eu te conecta con compradores serios y verificados en 29 países europeos. Publica tus anuncios gratis y llega a toda la industria europea de atracciones.",
    startSellingFree: "Empieza a Vender Gratis", talkToTeam: "Habla con Nuestro Equipo",
    whyTitle: "¿Por Qué Vender en RideDirect?", whySub: "El único marketplace creado específicamente para la industria europea de atracciones.",
    benefits: [
      { title: "Alcance Paneuropeo", description: "Llega a compradores en 29 países europeos. Tu anuncio es visible para toda la industria europea de atracciones." },
      { title: "Compradores B2B Verificados", description: "Cada consulta proviene de una empresa verificada. Sin pérdidas de tiempo — solo profesionales serios del sector." },
      { title: "Venta Rápida", description: "Nuestra audiencia específica significa acuerdos más rápidos. Los vendedores suelen recibir sus primeras consultas en días." },
      { title: "Control Total", description: "Gestionas tu anuncio, fijas tu precio y te comunicas directamente con los compradores. Sin comisiones de intermediarios." },
    ],
    howTitle: "Cómo Publicar Tu Atracción",
    steps: [
      { title: "Crea tu cuenta", description: "Regístrate para obtener una cuenta de vendedor gratuita. La verificación tarda menos de 24 horas." },
      { title: "Crea tu anuncio", description: "Añade fotos, descripción, documentación CE, estado, precio y todos los detalles relevantes." },
      { title: "Obtén la aprobación", description: "Nuestro equipo revisa cada anuncio para garantizar su calidad. La aprobación suele producirse en 1 día laborable." },
      { title: "Recibe consultas", description: "Los compradores cualificados te contactan directamente. Negocias y cierras el trato en tus propios términos." },
    ],
    whatTitle: "Qué Puedes Vender", whatSub: "Aceptamos todo tipo de equipos profesionales de atracciones en estas categorías:",
    ctaTitle: "¿Listo para Vender Tus Atracciones?", ctaSub: "Crea tu cuenta gratuita hoy y publica tu primera atracción en menos de 10 minutos.",
    postARide: "Publicar una Atracción", createFreeAccount: "Crear Cuenta Gratuita",
  },
  nl: {
    metaTitle: "Verkoop uw attracties | RideDirect",
    metaDescription: "Plaats uw attracties op RideDirect.eu en bereik geverifieerde kopers in heel Europa.",
    badge: "De Europese marktplaats speciaal voor attracties",
    heroTitle1: "Verkoop Uw Attracties", heroTitleHighlight: "In Heel Europa",
    heroSub: "RideDirect.eu brengt u in contact met serieuze, geverifieerde kopers in 29 Europese landen. Plaats uw advertenties gratis en bereik de gehele Europese attractie-industrie.",
    startSellingFree: "Begin Gratis met Verkopen", talkToTeam: "Praat met Ons Team",
    whyTitle: "Waarom Verkopen op RideDirect?", whySub: "De enige marktplaats specifiek gebouwd voor de Europese attractie-industrie.",
    benefits: [
      { title: "Pan-Europees Bereik", description: "Bereik kopers in 29 Europese landen. Uw advertentie is zichtbaar voor de gehele Europese attractie-industrie." },
      { title: "Geverifieerde B2B-kopers", description: "Elke aanvraag komt van een geverifieerd bedrijf. Geen tijdverspilling — alleen serieuze branche-professionals." },
      { title: "Snelle Verkoop", description: "Ons gerichte publiek betekent snellere deals. Verkopers ontvangen doorgaans binnen enkele dagen hun eerste aanvragen." },
      { title: "Volledige Controle", description: "U beheert uw advertentie, bepaalt uw prijs en communiceert rechtstreeks met kopers. Geen tussenpersoonkosten." },
    ],
    howTitle: "Zo Plaatst u Uw Attractie",
    steps: [
      { title: "Maak uw account aan", description: "Meld u aan voor een gratis verkopersaccount. Verificatie duurt minder dan 24 uur." },
      { title: "Maak uw advertentie aan", description: "Voeg foto's, beschrijving, CE-documentatie, staat, prijs en alle relevante details toe." },
      { title: "Krijg goedkeuring", description: "Ons team beoordeelt elke advertentie op kwaliteit. Goedkeuring vindt doorgaans binnen 1 werkdag plaats." },
      { title: "Ontvang aanvragen", description: "Gekwalificeerde kopers nemen rechtstreeks contact met u op. U onderhandelt en sluit de deal op uw eigen voorwaarden." },
    ],
    whatTitle: "Wat u Kunt Plaatsen", whatSub: "Wij accepteren alle professionele attractie-apparatuur binnen deze categorieën:",
    ctaTitle: "Klaar om uw Attracties te Verkopen?", ctaSub: "Maak vandaag nog uw gratis account aan en plaats uw eerste attractie in minder dan 10 minuten.",
    postARide: "Attractie Plaatsen", createFreeAccount: "Gratis Account Aanmaken",
  },
  pl: {
    metaTitle: "Sprzedaj swoje atrakcje | RideDirect",
    metaDescription: "Wystaw swoje atrakcje na RideDirect.eu i dotrzyj do zweryfikowanych kupujących w całej Europie.",
    badge: "Europejski rynek dedykowany atrakcjom",
    heroTitle1: "Sprzedaj Swoje Atrakcje", heroTitleHighlight: "W Całej Europie",
    heroSub: "RideDirect.eu łączy Cię z poważnymi, zweryfikowanymi kupującymi w 29 krajach europejskich. Wystaw swoje ogłoszenia za darmo i dotrzyj do całej europejskiej branży rozrywkowej.",
    startSellingFree: "Zacznij Sprzedawać za Darmo", talkToTeam: "Porozmawiaj z Naszym Zespołem",
    whyTitle: "Dlaczego Sprzedawać na RideDirect?", whySub: "Jedyny rynek stworzony specjalnie dla europejskiej branży rozrywkowej.",
    benefits: [
      { title: "Zasięg Ogólnoeuropejski", description: "Dotrzyj do kupujących w 29 krajach europejskich. Twoje ogłoszenie jest widoczne dla całej europejskiej branży rozrywkowej." },
      { title: "Zweryfikowani Kupujący B2B", description: "Każde zapytanie pochodzi od zweryfikowanej firmy. Bez strat czasu — tylko poważni profesjonaliści z branży." },
      { title: "Szybka Sprzedaż", description: "Nasza ukierunkowana grupa odbiorców oznacza szybsze transakcje. Sprzedawcy zazwyczaj otrzymują pierwsze zapytania w ciągu kilku dni." },
      { title: "Pełna Kontrola", description: "Zarządzasz swoim ogłoszeniem, ustalasz cenę i komunikujesz się bezpośrednio z kupującymi. Bez prowizji pośrednika." },
    ],
    howTitle: "Jak Wystawić Swoją Atrakcję",
    steps: [
      { title: "Utwórz swoje konto", description: "Zarejestruj się, aby uzyskać bezpłatne konto sprzedawcy. Weryfikacja trwa mniej niż 24 godziny." },
      { title: "Utwórz swoje ogłoszenie", description: "Dodaj zdjęcia, opis, dokumentację CE, stan, cenę i wszystkie istotne szczegóły." },
      { title: "Uzyskaj zatwierdzenie", description: "Nasz zespół sprawdza każde ogłoszenie pod kątem jakości. Zatwierdzenie zwykle następuje w ciągu 1 dnia roboczego." },
      { title: "Otrzymuj zapytania", description: "Wykwalifikowani kupujący kontaktują się z Tobą bezpośrednio. Negocjujesz i zamykasz transakcję na własnych warunkach." },
    ],
    whatTitle: "Co Możesz Sprzedać", whatSub: "Akceptujemy cały profesjonalny sprzęt rozrywkowy w następujących kategoriach:",
    ctaTitle: "Gotowy, aby Sprzedać Swoje Atrakcje?", ctaSub: "Załóż bezpłatne konto już dziś i wystaw swoją pierwszą atrakcję w mniej niż 10 minut.",
    postARide: "Wystaw Atrakcję", createFreeAccount: "Utwórz Bezpłatne Konto",
  },
  pt: {
    metaTitle: "Venda as suas atrações | RideDirect",
    metaDescription: "Publique as suas atrações no RideDirect.eu e chegue a compradores verificados em toda a Europa.",
    badge: "O marketplace europeu dedicado às atrações",
    heroTitle1: "Venda as Suas Atrações", heroTitleHighlight: "Em Toda a Europa",
    heroSub: "O RideDirect.eu põe-no em contacto com compradores sérios e verificados em 29 países europeus. Publique os seus anúncios gratuitamente e chegue a toda a indústria europeia de diversão.",
    startSellingFree: "Comece a Vender Gratuitamente", talkToTeam: "Fale com a Nossa Equipa",
    whyTitle: "Porquê Vender no RideDirect?", whySub: "O único marketplace criado especificamente para a indústria europeia de diversão.",
    benefits: [
      { title: "Alcance Pan-Europeu", description: "Chegue a compradores em 29 países europeus. O seu anúncio é visível para toda a indústria europeia de diversão." },
      { title: "Compradores B2B Verificados", description: "Cada pedido vem de uma empresa verificada. Sem perdas de tempo — apenas profissionais sérios do setor." },
      { title: "Venda Rápida", description: "O nosso público-alvo significa negócios mais rápidos. Os vendedores costumam receber os primeiros pedidos em poucos dias." },
      { title: "Controlo Total", description: "Gere o seu anúncio, define o seu preço e comunica diretamente com os compradores. Sem comissões de intermediários." },
    ],
    howTitle: "Como Publicar a Sua Atração",
    steps: [
      { title: "Crie a sua conta", description: "Registe-se para uma conta de vendedor gratuita. A verificação demora menos de 24 horas." },
      { title: "Crie o seu anúncio", description: "Adicione fotos, descrição, documentação CE, condição, preço e todos os detalhes relevantes." },
      { title: "Obtenha aprovação", description: "A nossa equipa revê cada anúncio para garantir a qualidade. A aprovação ocorre normalmente dentro de 1 dia útil." },
      { title: "Receba pedidos", description: "Compradores qualificados contactam-no diretamente. Negoceia e fecha o negócio nos seus próprios termos." },
    ],
    whatTitle: "O Que Pode Vender", whatSub: "Aceitamos todo o equipamento profissional de diversão nestas categorias:",
    ctaTitle: "Pronto para Vender as Suas Atrações?", ctaSub: "Crie a sua conta gratuita hoje e publique a sua primeira atração em menos de 10 minutos.",
    postARide: "Publicar uma Atração", createFreeAccount: "Criar Conta Gratuita",
  },
}
