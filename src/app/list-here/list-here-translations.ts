import type { ListingLocale } from "@/lib/locales"

interface ListHereStrings {
  metaTitle: string
  metaDescription: string
  badge: string
  heroTitle1: string
  heroTitleHighlight: string
  heroSub: string
  createFreeAccount: string
  postARide: string
  trust: { title: string; description: string }[]
  ctaTitle: string
  ctaSub: string
}

export const LIST_HERE_T: Record<ListingLocale, ListHereStrings> = {
  en: {
    metaTitle: "Selling on Facebook? List It Here Too",
    metaDescription: "Already listing your ride or attraction in Facebook groups? List it on RideDirect too — free, and reach buyers across Europe.",
    badge: "For sellers already listing on Facebook",
    heroTitle1: "Selling on Facebook?",
    heroTitleHighlight: "List it here too — free.",
    heroSub: "Takes less than 2 minutes. Reach serious B2B buyers across Europe, not just your local group.",
    createFreeAccount: "Create Free Account",
    postARide: "Post a Ride",
    trust: [
      { title: "Always free", description: "No listing fees, no commission, ever." },
      { title: "Sign up in one click", description: "Use your Google or Facebook account — no forms to fill in." },
      { title: "Europe-wide reach", description: "Buyers across 29 countries, not just your local area." },
    ],
    ctaTitle: "Ready in under 2 minutes",
    ctaSub: "Create your free account and list your ride, attraction, or equipment today.",
  },
  de: {
    metaTitle: "Verkaufen Sie auf Facebook? Listen Sie auch hier",
    metaDescription: "Bieten Sie Ihr Fahrgeschäft oder Ihre Attraktion bereits in Facebook-Gruppen an? Listen Sie es auch auf RideDirect — kostenlos, mit Käufern aus ganz Europa.",
    badge: "Für Verkäufer, die bereits auf Facebook anbieten",
    heroTitle1: "Verkaufen Sie auf Facebook?",
    heroTitleHighlight: "Listen Sie es auch hier — kostenlos.",
    heroSub: "Dauert weniger als 2 Minuten. Erreichen Sie ernsthafte B2B-Käufer aus ganz Europa, nicht nur Ihre lokale Gruppe.",
    createFreeAccount: "Kostenloses Konto erstellen",
    postARide: "Fahrgeschäft inserieren",
    trust: [
      { title: "Immer kostenlos", description: "Keine Inseratsgebühren, keine Provision, nie." },
      { title: "Mit einem Klick registrieren", description: "Nutzen Sie Ihr Google- oder Facebook-Konto — keine Formulare." },
      { title: "Reichweite in ganz Europa", description: "Käufer aus 29 Ländern, nicht nur aus Ihrer Region." },
    ],
    ctaTitle: "In unter 2 Minuten startklar",
    ctaSub: "Erstellen Sie Ihr kostenloses Konto und inserieren Sie Ihr Fahrgeschäft noch heute.",
  },
  it: {
    metaTitle: "Vendi su Facebook? Pubblica anche qui",
    metaDescription: "Stai già vendendo la tua attrazione nei gruppi Facebook? Pubblicala anche su RideDirect — gratis, con acquirenti in tutta Europa.",
    badge: "Per chi vende già su Facebook",
    heroTitle1: "Vendi su Facebook?",
    heroTitleHighlight: "Pubblica anche qui — gratis.",
    heroSub: "Bastano meno di 2 minuti. Raggiungi acquirenti B2B seri in tutta Europa, non solo nel tuo gruppo locale.",
    createFreeAccount: "Crea account gratuito",
    postARide: "Pubblica un'attrazione",
    trust: [
      { title: "Sempre gratuito", description: "Nessuna commissione, nessun costo di pubblicazione, mai." },
      { title: "Registrati in un clic", description: "Usa il tuo account Google o Facebook — niente moduli da compilare." },
      { title: "Portata in tutta Europa", description: "Acquirenti da 29 paesi, non solo dalla tua zona." },
    ],
    ctaTitle: "Pronto in meno di 2 minuti",
    ctaSub: "Crea il tuo account gratuito e pubblica oggi stesso la tua attrazione o attrezzatura.",
  },
  fr: {
    metaTitle: "Vous vendez sur Facebook ? Publiez ici aussi",
    metaDescription: "Vous vendez déjà votre attraction dans des groupes Facebook ? Publiez-la aussi sur RideDirect — gratuitement, avec des acheteurs dans toute l'Europe.",
    badge: "Pour les vendeurs déjà présents sur Facebook",
    heroTitle1: "Vous vendez sur Facebook ?",
    heroTitleHighlight: "Publiez ici aussi — gratuitement.",
    heroSub: "Moins de 2 minutes suffisent. Touchez de vrais acheteurs B2B dans toute l'Europe, pas seulement votre groupe local.",
    createFreeAccount: "Créer un compte gratuit",
    postARide: "Publier une attraction",
    trust: [
      { title: "Toujours gratuit", description: "Aucun frais de publication, aucune commission, jamais." },
      { title: "Inscription en un clic", description: "Utilisez votre compte Google ou Facebook — aucun formulaire à remplir." },
      { title: "Portée dans toute l'Europe", description: "Des acheteurs dans 29 pays, pas seulement dans votre région." },
    ],
    ctaTitle: "Prêt en moins de 2 minutes",
    ctaSub: "Créez votre compte gratuit et publiez votre attraction ou équipement dès aujourd'hui.",
  },
  es: {
    metaTitle: "¿Vendes en Facebook? Publícalo también aquí",
    metaDescription: "¿Ya vendes tu atracción en grupos de Facebook? Publícala también en RideDirect — gratis, con compradores de toda Europa.",
    badge: "Para vendedores que ya publican en Facebook",
    heroTitle1: "¿Vendes en Facebook?",
    heroTitleHighlight: "Publícalo también aquí — gratis.",
    heroSub: "Toma menos de 2 minutos. Llega a compradores B2B serios de toda Europa, no solo a tu grupo local.",
    createFreeAccount: "Crear cuenta gratis",
    postARide: "Publicar una atracción",
    trust: [
      { title: "Siempre gratis", description: "Sin comisiones ni cuotas de publicación, nunca." },
      { title: "Regístrate en un clic", description: "Usa tu cuenta de Google o Facebook — sin formularios que rellenar." },
      { title: "Alcance en toda Europa", description: "Compradores de 29 países, no solo de tu zona." },
    ],
    ctaTitle: "Listo en menos de 2 minutos",
    ctaSub: "Crea tu cuenta gratis y publica tu atracción o equipo hoy mismo.",
  },
  nl: {
    metaTitle: "Verkoopt u op Facebook? Plaats het ook hier",
    metaDescription: "Biedt u uw attractie al aan in Facebookgroepen? Plaats hem ook op RideDirect — gratis, met kopers uit heel Europa.",
    badge: "Voor verkopers die al op Facebook aanbieden",
    heroTitle1: "Verkoopt u op Facebook?",
    heroTitleHighlight: "Plaats het ook hier — gratis.",
    heroSub: "Duurt minder dan 2 minuten. Bereik serieuze zakelijke kopers in heel Europa, niet alleen uw lokale groep.",
    createFreeAccount: "Gratis account aanmaken",
    postARide: "Attractie plaatsen",
    trust: [
      { title: "Altijd gratis", description: "Geen plaatsingskosten, geen commissie, nooit." },
      { title: "Aanmelden met één klik", description: "Gebruik uw Google- of Facebook-account — geen formulieren." },
      { title: "Bereik in heel Europa", description: "Kopers uit 29 landen, niet alleen uit uw regio." },
    ],
    ctaTitle: "Klaar in minder dan 2 minuten",
    ctaSub: "Maak vandaag nog uw gratis account aan en plaats uw attractie of apparatuur.",
  },
  pl: {
    metaTitle: "Sprzedajesz na Facebooku? Dodaj ogłoszenie też tutaj",
    metaDescription: "Sprzedajesz już swoją atrakcję w grupach na Facebooku? Dodaj ją też na RideDirect — za darmo, z kupującymi z całej Europy.",
    badge: "Dla sprzedających już na Facebooku",
    heroTitle1: "Sprzedajesz na Facebooku?",
    heroTitleHighlight: "Dodaj ogłoszenie też tutaj — za darmo.",
    heroSub: "Zajmie mniej niż 2 minuty. Dotrzyj do prawdziwych kupujących B2B z całej Europy, nie tylko z Twojej lokalnej grupy.",
    createFreeAccount: "Załóż darmowe konto",
    postARide: "Dodaj ogłoszenie",
    trust: [
      { title: "Zawsze za darmo", description: "Żadnych opłat za ogłoszenie ani prowizji, nigdy." },
      { title: "Rejestracja jednym kliknięciem", description: "Użyj konta Google lub Facebook — bez wypełniania formularzy." },
      { title: "Zasięg w całej Europie", description: "Kupujący z 29 krajów, nie tylko z Twojej okolicy." },
    ],
    ctaTitle: "Gotowe w mniej niż 2 minuty",
    ctaSub: "Załóż darmowe konto i dodaj ogłoszenie swojej atrakcji lub sprzętu już dziś.",
  },
  pt: {
    metaTitle: "Vende no Facebook? Publique aqui também",
    metaDescription: "Já vende a sua atração em grupos do Facebook? Publique-a também no RideDirect — grátis, com compradores de toda a Europa.",
    badge: "Para quem já vende no Facebook",
    heroTitle1: "Vende no Facebook?",
    heroTitleHighlight: "Publique aqui também — grátis.",
    heroSub: "Demora menos de 2 minutos. Chegue a compradores B2B a sério em toda a Europa, não só ao seu grupo local.",
    createFreeAccount: "Criar conta grátis",
    postARide: "Publicar uma atração",
    trust: [
      { title: "Sempre grátis", description: "Sem taxas de publicação nem comissões, nunca." },
      { title: "Registo num clique", description: "Use a sua conta Google ou Facebook — sem formulários para preencher." },
      { title: "Alcance em toda a Europa", description: "Compradores de 29 países, não só da sua zona." },
    ],
    ctaTitle: "Pronto em menos de 2 minutos",
    ctaSub: "Crie a sua conta grátis e publique hoje mesmo a sua atração ou equipamento.",
  },
}
