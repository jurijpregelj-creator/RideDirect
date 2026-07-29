import type { ListingLocale } from "@/lib/translate-listing"

interface ListingPageStrings {
  backToListings: string
  description: string
  details: string
  category: string
  country: string
  condition: string
  manufacturer: string
  year: string
  originalLanguage: string
  ceDocsAvailable: string
  inspectionAvailable: string
  yourListingNotice: string
  contactSeller: string
  yourName: string
  emailAddress: string
  phone: string
  phoneOptional: string
  message: string
  sendInquiry: string
  sending: string
  inquirySent: string
  inquirySentDesc: string
  privacyNote: string
  conditions: Record<"new" | "like_new" | "good" | "fair" | "parts_only", string>
  categories: Record<
    | "major-rides"
    | "family-rides"
    | "kiddie-rides"
    | "inflatables-soft-play"
    | "arcade-coin-machines"
    | "go-karts-track-attractions"
    | "event-mobile-attractions"
    | "games-prize-booths"
    | "indoor-parks-playgrounds"
    | "equipment-parts",
    string
  >
}

// Mirrors the "listing"/"categories" keys already in messages/{en,de,it}.json
// (reused verbatim for en/de/it) plus fr/es/nl/pl/pt, which aren't part of
// next-intl's routing.locales — this keeps the site-wide i18n config (cookie
// driven, en/de/it only) untouched while still letting these 5 extra locale
// listing pages render fully translated static labels.
export const LISTING_PAGE_T: Record<ListingLocale, ListingPageStrings> = {
  en: {
    backToListings: "Back to listings",
    description: "Description",
    details: "Listing Details",
    category: "Category",
    country: "Country",
    condition: "Condition",
    manufacturer: "Manufacturer",
    year: "Year",
    originalLanguage: "Original Language",
    ceDocsAvailable: "CE Documentation Available",
    inspectionAvailable: "Pre-purchase inspection possible",
    yourListingNotice: "This is your listing. Buyers will see a contact form here.",
    contactSeller: "Contact the Seller", yourName: "Your Name", emailAddress: "Email Address",
    phone: "Phone / WhatsApp", phoneOptional: "(optional)", message: "Message",
    sendInquiry: "Send Inquiry", sending: "Sending...", inquirySent: "Inquiry Sent!",
    inquirySentDesc: "The seller will be in touch with you shortly.",
    privacyNote: "Your details will only be shared with the seller of this listing.",
    conditions: { new: "New", like_new: "Like New", good: "Good", fair: "Fair", parts_only: "Parts Only" },
    categories: {
      "major-rides": "Major Rides",
      "family-rides": "Family Rides",
      "kiddie-rides": "Kiddie Rides",
      "inflatables-soft-play": "Inflatables & Soft Play",
      "arcade-coin-machines": "Arcade & Coin Machines",
      "go-karts-track-attractions": "Go-Karts & Track Attractions",
      "event-mobile-attractions": "Event & Mobile Attractions",
      "games-prize-booths": "Games & Prize Booths",
      "indoor-parks-playgrounds": "Indoor Parks & Playgrounds",
      "equipment-parts": "Equipment & Parts",
    },
  },
  de: {
    backToListings: "Zurück zu Inseraten",
    description: "Beschreibung",
    details: "Inseratdetails",
    category: "Kategorie",
    country: "Land",
    condition: "Zustand",
    manufacturer: "Hersteller",
    year: "Baujahr",
    originalLanguage: "Originalsprache",
    ceDocsAvailable: "CE-Dokumentation verfügbar",
    inspectionAvailable: "Vorbesichtigung möglich",
    yourListingNotice: "Dies ist Ihr Inserat. Käufer sehen hier ein Kontaktformular.",
    contactSeller: "Verkäufer kontaktieren", yourName: "Ihr Name", emailAddress: "E-Mail-Adresse",
    phone: "Telefon / WhatsApp", phoneOptional: "(optional)", message: "Nachricht",
    sendInquiry: "Anfrage senden", sending: "Wird gesendet...", inquirySent: "Anfrage gesendet!",
    inquirySentDesc: "Der Verkäufer wird sich in Kürze bei Ihnen melden.",
    privacyNote: "Ihre Daten werden nur mit dem Verkäufer dieses Inserats geteilt.",
    conditions: { new: "Neu", like_new: "Wie neu", good: "Gut", fair: "Akzeptabel", parts_only: "Nur Ersatzteile" },
    categories: {
      "major-rides": "Große Fahrgeschäfte",
      "family-rides": "Familienfahrgeschäfte",
      "kiddie-rides": "Kinderfahrgeschäfte",
      "inflatables-soft-play": "Hüpfburgen & Softplay",
      "arcade-coin-machines": "Arcade & Münzautomaten",
      "go-karts-track-attractions": "Go-Karts & Bahnattraktionen",
      "event-mobile-attractions": "Event & Mobile Attraktionen",
      "games-prize-booths": "Spiele & Gewinnbuden",
      "indoor-parks-playgrounds": "Indoor Parks & Spielplätze",
      "equipment-parts": "Ausrüstung & Ersatzteile",
    },
  },
  it: {
    backToListings: "Torna agli annunci",
    description: "Descrizione",
    details: "Dettagli annuncio",
    category: "Categoria",
    country: "Paese",
    condition: "Condizione",
    manufacturer: "Produttore",
    year: "Anno",
    originalLanguage: "Lingua originale",
    ceDocsAvailable: "Documentazione CE disponibile",
    inspectionAvailable: "Ispezione pre-acquisto possibile",
    yourListingNotice: "Questo è il tuo annuncio. Gli acquirenti vedranno qui un modulo di contatto.",
    contactSeller: "Contatta il venditore", yourName: "Il tuo nome", emailAddress: "Indirizzo email",
    phone: "Telefono / WhatsApp", phoneOptional: "(opzionale)", message: "Messaggio",
    sendInquiry: "Invia richiesta", sending: "Invio in corso...", inquirySent: "Richiesta inviata!",
    inquirySentDesc: "Il venditore ti contatterà a breve.",
    privacyNote: "I tuoi dati saranno condivisi solo con il venditore di questo annuncio.",
    conditions: { new: "Nuovo", like_new: "Come nuovo", good: "Buono", fair: "Discreto", parts_only: "Solo per pezzi" },
    categories: {
      "major-rides": "Grandi Attrazioni",
      "family-rides": "Attrazioni per Famiglie",
      "kiddie-rides": "Giostre per Bambini",
      "inflatables-soft-play": "Gonfiabili & Soft Play",
      "arcade-coin-machines": "Arcade & Giochi a Gettoni",
      "go-karts-track-attractions": "Go-Kart & Piste",
      "event-mobile-attractions": "Attrazioni Mobili & Eventi",
      "games-prize-booths": "Giochi & Bancarelle",
      "indoor-parks-playgrounds": "Parchi Indoor & Playground",
      "equipment-parts": "Attrezzature & Ricambi",
    },
  },
  fr: {
    backToListings: "Retour aux annonces",
    description: "Description",
    details: "Détails de l'annonce",
    category: "Catégorie",
    country: "Pays",
    condition: "État",
    manufacturer: "Fabricant",
    year: "Année",
    originalLanguage: "Langue d'origine",
    ceDocsAvailable: "Documentation CE disponible",
    inspectionAvailable: "Inspection avant achat possible",
    yourListingNotice: "Ceci est votre annonce. Les acheteurs verront un formulaire de contact ici.",
    contactSeller: "Contacter le vendeur", yourName: "Votre nom", emailAddress: "Adresse email",
    phone: "Téléphone / WhatsApp", phoneOptional: "(facultatif)", message: "Message",
    sendInquiry: "Envoyer la demande", sending: "Envoi en cours...", inquirySent: "Demande envoyée !",
    inquirySentDesc: "Le vendeur vous contactera prochainement.",
    privacyNote: "Vos coordonnées ne seront partagées qu'avec le vendeur de cette annonce.",
    conditions: { new: "Neuf", like_new: "Comme neuf", good: "Bon état", fair: "État correct", parts_only: "Pour pièces" },
    categories: {
      "major-rides": "Grandes Attractions",
      "family-rides": "Attractions Familiales",
      "kiddie-rides": "Manèges pour Enfants",
      "inflatables-soft-play": "Structures Gonflables & Soft Play",
      "arcade-coin-machines": "Bornes d'Arcade & Machines à Pièces",
      "go-karts-track-attractions": "Karting & Attractions sur Piste",
      "event-mobile-attractions": "Attractions Mobiles & Événementielles",
      "games-prize-booths": "Jeux & Stands de Prix",
      "indoor-parks-playgrounds": "Parcs Intérieurs & Aires de Jeux",
      "equipment-parts": "Équipement & Pièces Détachées",
    },
  },
  es: {
    backToListings: "Volver a los anuncios",
    description: "Descripción",
    details: "Detalles del anuncio",
    category: "Categoría",
    country: "País",
    condition: "Estado",
    manufacturer: "Fabricante",
    year: "Año",
    originalLanguage: "Idioma original",
    ceDocsAvailable: "Documentación CE disponible",
    inspectionAvailable: "Inspección previa a la compra posible",
    yourListingNotice: "Este es tu anuncio. Los compradores verán aquí un formulario de contacto.",
    contactSeller: "Contactar al vendedor", yourName: "Tu nombre", emailAddress: "Correo electrónico",
    phone: "Teléfono / WhatsApp", phoneOptional: "(opcional)", message: "Mensaje",
    sendInquiry: "Enviar consulta", sending: "Enviando...", inquirySent: "¡Consulta enviada!",
    inquirySentDesc: "El vendedor se pondrá en contacto contigo en breve.",
    privacyNote: "Tus datos solo se compartirán con el vendedor de este anuncio.",
    conditions: { new: "Nuevo", like_new: "Como nuevo", good: "Bueno", fair: "Aceptable", parts_only: "Solo piezas" },
    categories: {
      "major-rides": "Atracciones Principales",
      "family-rides": "Atracciones Familiares",
      "kiddie-rides": "Atracciones Infantiles",
      "inflatables-soft-play": "Inflables & Soft Play",
      "arcade-coin-machines": "Máquinas Recreativas & de Monedas",
      "go-karts-track-attractions": "Karts & Atracciones de Circuito",
      "event-mobile-attractions": "Atracciones Móviles & de Eventos",
      "games-prize-booths": "Juegos & Casetas de Premios",
      "indoor-parks-playgrounds": "Parques Interiores & Zonas de Juego",
      "equipment-parts": "Equipos & Repuestos",
    },
  },
  nl: {
    backToListings: "Terug naar advertenties",
    description: "Beschrijving",
    details: "Advertentiedetails",
    category: "Categorie",
    country: "Land",
    condition: "Staat",
    manufacturer: "Fabrikant",
    year: "Jaar",
    originalLanguage: "Oorspronkelijke taal",
    ceDocsAvailable: "CE-documentatie beschikbaar",
    inspectionAvailable: "Inspectie voor aankoop mogelijk",
    yourListingNotice: "Dit is uw advertentie. Kopers zien hier een contactformulier.",
    contactSeller: "Contact opnemen met verkoper", yourName: "Uw naam", emailAddress: "E-mailadres",
    phone: "Telefoon / WhatsApp", phoneOptional: "(optioneel)", message: "Bericht",
    sendInquiry: "Verstuur aanvraag", sending: "Versturen...", inquirySent: "Aanvraag verzonden!",
    inquirySentDesc: "De verkoper neemt binnenkort contact met u op.",
    privacyNote: "Uw gegevens worden alleen gedeeld met de verkoper van deze advertentie.",
    conditions: { new: "Nieuw", like_new: "Zo goed als nieuw", good: "Goed", fair: "Redelijk", parts_only: "Alleen onderdelen" },
    categories: {
      "major-rides": "Grote Attracties",
      "family-rides": "Familieattracties",
      "kiddie-rides": "Kinderattracties",
      "inflatables-soft-play": "Springkussens & Soft Play",
      "arcade-coin-machines": "Arcade- & Muntautomaten",
      "go-karts-track-attractions": "Botsauto's & Baanattracties",
      "event-mobile-attractions": "Mobiele & Evenementenattracties",
      "games-prize-booths": "Kermisspellen & Prijzenkramen",
      "indoor-parks-playgrounds": "Indoor Parken & Speeltuinen",
      "equipment-parts": "Onderdelen & Uitrusting",
    },
  },
  pl: {
    backToListings: "Powrót do ogłoszeń",
    description: "Opis",
    details: "Szczegóły ogłoszenia",
    category: "Kategoria",
    country: "Kraj",
    condition: "Stan",
    manufacturer: "Producent",
    year: "Rok produkcji",
    originalLanguage: "Język oryginalny",
    ceDocsAvailable: "Dostępna dokumentacja CE",
    inspectionAvailable: "Możliwa inspekcja przed zakupem",
    yourListingNotice: "To jest Twoje ogłoszenie. Kupujący zobaczą tutaj formularz kontaktowy.",
    contactSeller: "Skontaktuj się ze sprzedawcą", yourName: "Twoje imię", emailAddress: "Adres e-mail",
    phone: "Telefon / WhatsApp", phoneOptional: "(opcjonalnie)", message: "Wiadomość",
    sendInquiry: "Wyślij zapytanie", sending: "Wysyłanie...", inquirySent: "Zapytanie wysłane!",
    inquirySentDesc: "Sprzedawca wkrótce się z Tobą skontaktuje.",
    privacyNote: "Twoje dane zostaną udostępnione wyłącznie sprzedawcy tego ogłoszenia.",
    conditions: { new: "Nowy", like_new: "Jak nowy", good: "Dobry", fair: "Zadowalający", parts_only: "Tylko na części" },
    categories: {
      "major-rides": "Duże Atrakcje",
      "family-rides": "Atrakcje Rodzinne",
      "kiddie-rides": "Atrakcje Dziecięce",
      "inflatables-soft-play": "Dmuchańce & Soft Play",
      "arcade-coin-machines": "Automaty Arcade & na Monety",
      "go-karts-track-attractions": "Gokarty & Atrakcje Torowe",
      "event-mobile-attractions": "Atrakcje Mobilne & Eventowe",
      "games-prize-booths": "Gry & Stoiska z Nagrodami",
      "indoor-parks-playgrounds": "Parki Indoor & Place Zabaw",
      "equipment-parts": "Sprzęt & Części",
    },
  },
  pt: {
    backToListings: "Voltar aos anúncios",
    description: "Descrição",
    details: "Detalhes do anúncio",
    category: "Categoria",
    country: "País",
    condition: "Estado",
    manufacturer: "Fabricante",
    year: "Ano",
    originalLanguage: "Idioma original",
    ceDocsAvailable: "Documentação CE disponível",
    inspectionAvailable: "Inspeção antes da compra possível",
    yourListingNotice: "Este é o seu anúncio. Os compradores verão aqui um formulário de contacto.",
    contactSeller: "Contactar o vendedor", yourName: "O seu nome", emailAddress: "Endereço de email",
    phone: "Telefone / WhatsApp", phoneOptional: "(opcional)", message: "Mensagem",
    sendInquiry: "Enviar pedido", sending: "A enviar...", inquirySent: "Pedido enviado!",
    inquirySentDesc: "O vendedor entrará em contacto consigo em breve.",
    privacyNote: "Os seus dados serão partilhados apenas com o vendedor deste anúncio.",
    conditions: { new: "Novo", like_new: "Como novo", good: "Bom", fair: "Aceitável", parts_only: "Apenas peças" },
    categories: {
      "major-rides": "Grandes Atrações",
      "family-rides": "Atrações Familiares",
      "kiddie-rides": "Atrações Infantis",
      "inflatables-soft-play": "Insufláveis & Soft Play",
      "arcade-coin-machines": "Máquinas Arcade & de Moedas",
      "go-karts-track-attractions": "Karts & Atrações de Pista",
      "event-mobile-attractions": "Atrações Móveis & de Eventos",
      "games-prize-booths": "Jogos & Bancas de Prémios",
      "indoor-parks-playgrounds": "Parques Indoor & Recreativos",
      "equipment-parts": "Equipamento & Peças",
    },
  },
}

export function categorySlugFromName(name: string): keyof ListingPageStrings["categories"] | null {
  const map: Record<string, keyof ListingPageStrings["categories"]> = {
    "Major Rides": "major-rides",
    "Family Rides": "family-rides",
    "Kiddie Rides": "kiddie-rides",
    "Inflatables & Soft Play": "inflatables-soft-play",
    "Arcade & Coin Machines": "arcade-coin-machines",
    "Go-Karts & Track Attractions": "go-karts-track-attractions",
    "Event & Mobile Attractions": "event-mobile-attractions",
    "Games & Prize Booths": "games-prize-booths",
    "Indoor Parks & Playgrounds": "indoor-parks-playgrounds",
    "Equipment & Parts": "equipment-parts",
  }
  return map[name] ?? null
}
