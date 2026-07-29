import type { ListingLocale } from "@/lib/locales"

interface ContactStrings {
  metaTitle: string
  metaDescription: string
  headerTitle: string
  headerSub: string
  getInTouchTitle: string
  getInTouchSub: string
  emailLabel: string
  emailDesc: string
  coverageLabel: string
  coverageValue: string
  coverageDesc: string
  languagesLabel: string
  languagesValue: string
  languagesDesc: string
  sendMessageTitle: string
  company: string
  companyPlaceholder: string
  subject: string
  selectATopic: string
  subjectOptions: {
    buying: string
    selling: string
    account: string
    listingIssue: string
    partnership: string
    other: string
  }
  message: string
  messagePlaceholder: string
  sending: string
  sendMessage: string
  messageSentTitle: string
  messageSentDesc: string
  errorGeneric: string
}

// languagesValue intentionally stays "English, German, Italian" across every
// locale — it describes the human support team's actual working languages,
// not the site's UI translation coverage, so it isn't part of this dict's
// per-locale rendering the same way the surrounding labels are.
export const CONTACT_T: Record<ListingLocale, ContactStrings> = {
  en: {
    metaTitle: "Contact Us",
    metaDescription: "Get in touch with the RideDirect.eu team about buying, selling, or listing amusement rides in Europe.",
    headerTitle: "Contact Us", headerSub: "Have questions about buying, selling, or listing on RideDirect? We're here to help.",
    getInTouchTitle: "Get in Touch", getInTouchSub: "Whether you're buying, selling, or just exploring — our team is ready to help.",
    emailLabel: "Email", emailDesc: "We reply within 1 business day",
    coverageLabel: "Coverage", coverageValue: "29 European Countries", coverageDesc: "Full European market coverage",
    languagesLabel: "Languages", languagesValue: "English, German, Italian", languagesDesc: "Multilingual support team",
    sendMessageTitle: "Send a Message",
    company: "Company", companyPlaceholder: "Your company name",
    subject: "Subject", selectATopic: "Select a topic",
    subjectOptions: { buying: "Buying a ride", selling: "Selling / listing a ride", account: "Account support", listingIssue: "Issue with a listing", partnership: "Partnership enquiry", other: "Other" },
    message: "Message", messagePlaceholder: "Tell us how we can help you...",
    sending: "Sending...", sendMessage: "Send Message",
    messageSentTitle: "Message Sent!", messageSentDesc: "Thank you for reaching out. We'll get back to you within 1 business day.",
    errorGeneric: "Something went wrong. Please email us directly at info@ridedirect.eu.",
  },
  de: {
    metaTitle: "Kontakt",
    metaDescription: "Kontaktieren Sie das RideDirect.eu-Team zu Kauf, Verkauf oder Inserierung von Fahrgeschäften in Europa.",
    headerTitle: "Kontakt", headerSub: "Haben Sie Fragen zum Kauf, Verkauf oder zur Auflistung auf RideDirect? Wir helfen Ihnen gerne.",
    getInTouchTitle: "Kontaktieren Sie uns", getInTouchSub: "Ob Sie kaufen, verkaufen oder einfach nur stöbern — unser Team ist bereit zu helfen.",
    emailLabel: "E-Mail", emailDesc: "Wir antworten innerhalb eines Werktages",
    coverageLabel: "Abdeckung", coverageValue: "29 europäische Länder", coverageDesc: "Vollständige europäische Marktabdeckung",
    languagesLabel: "Sprachen", languagesValue: "English, German, Italian", languagesDesc: "Mehrsprachiges Support-Team",
    sendMessageTitle: "Nachricht senden",
    company: "Unternehmen", companyPlaceholder: "Ihr Firmenname",
    subject: "Betreff", selectATopic: "Thema auswählen",
    subjectOptions: { buying: "Kauf eines Fahrgeschäfts", selling: "Verkauf / Inserat eines Fahrgeschäfts", account: "Kontosupport", listingIssue: "Problem mit einem Inserat", partnership: "Partnerschaftsanfrage", other: "Sonstiges" },
    message: "Nachricht", messagePlaceholder: "Erzählen Sie uns, wie wir Ihnen helfen können...",
    sending: "Wird gesendet...", sendMessage: "Nachricht senden",
    messageSentTitle: "Nachricht gesendet!", messageSentDesc: "Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb eines Werktages bei Ihnen.",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte schreiben Sie uns direkt an info@ridedirect.eu.",
  },
  it: {
    metaTitle: "Contattaci",
    metaDescription: "Contatta il team di RideDirect.eu per acquistare, vendere o pubblicare attrazioni in Europa.",
    headerTitle: "Contattaci", headerSub: "Hai domande sull'acquisto, la vendita o la pubblicazione su RideDirect? Siamo qui per aiutarti.",
    getInTouchTitle: "Mettiti in Contatto", getInTouchSub: "Che tu stia comprando, vendendo o semplicemente esplorando — il nostro team è pronto ad aiutarti.",
    emailLabel: "Email", emailDesc: "Rispondiamo entro 1 giorno lavorativo",
    coverageLabel: "Copertura", coverageValue: "29 Paesi Europei", coverageDesc: "Copertura completa del mercato europeo",
    languagesLabel: "Lingue", languagesValue: "English, German, Italian", languagesDesc: "Team di supporto multilingue",
    sendMessageTitle: "Invia un Messaggio",
    company: "Azienda", companyPlaceholder: "Nome della tua azienda",
    subject: "Oggetto", selectATopic: "Seleziona un argomento",
    subjectOptions: { buying: "Acquistare un'attrazione", selling: "Vendere / pubblicare un'attrazione", account: "Assistenza account", listingIssue: "Problema con un annuncio", partnership: "Richiesta di partnership", other: "Altro" },
    message: "Messaggio", messagePlaceholder: "Raccontaci come possiamo aiutarti...",
    sending: "Invio in corso...", sendMessage: "Invia Messaggio",
    messageSentTitle: "Messaggio Inviato!", messageSentDesc: "Grazie per averci contattato. Ti risponderemo entro 1 giorno lavorativo.",
    errorGeneric: "Qualcosa è andato storto. Scrivici direttamente a info@ridedirect.eu.",
  },
  fr: {
    metaTitle: "Contactez-nous",
    metaDescription: "Contactez l'équipe RideDirect.eu pour acheter, vendre ou publier des attractions en Europe.",
    headerTitle: "Contactez-nous", headerSub: "Des questions sur l'achat, la vente ou la publication sur RideDirect ? Nous sommes là pour vous aider.",
    getInTouchTitle: "Entrer en Contact", getInTouchSub: "Que vous achetiez, vendiez ou exploriez simplement — notre équipe est prête à vous aider.",
    emailLabel: "Email", emailDesc: "Nous répondons sous 1 jour ouvré",
    coverageLabel: "Couverture", coverageValue: "29 Pays Européens", coverageDesc: "Couverture complète du marché européen",
    languagesLabel: "Langues", languagesValue: "English, German, Italian", languagesDesc: "Équipe de support multilingue",
    sendMessageTitle: "Envoyer un Message",
    company: "Entreprise", companyPlaceholder: "Nom de votre entreprise",
    subject: "Sujet", selectATopic: "Sélectionnez un sujet",
    subjectOptions: { buying: "Acheter une attraction", selling: "Vendre / publier une attraction", account: "Support de compte", listingIssue: "Problème avec une annonce", partnership: "Demande de partenariat", other: "Autre" },
    message: "Message", messagePlaceholder: "Dites-nous comment nous pouvons vous aider...",
    sending: "Envoi...", sendMessage: "Envoyer le Message",
    messageSentTitle: "Message Envoyé !", messageSentDesc: "Merci de nous avoir contactés. Nous vous répondrons sous 1 jour ouvré.",
    errorGeneric: "Une erreur s'est produite. Veuillez nous écrire directement à info@ridedirect.eu.",
  },
  es: {
    metaTitle: "Contáctanos",
    metaDescription: "Ponte en contacto con el equipo de RideDirect.eu para comprar, vender o publicar atracciones en Europa.",
    headerTitle: "Contáctanos", headerSub: "¿Tienes preguntas sobre comprar, vender o publicar en RideDirect? Estamos aquí para ayudarte.",
    getInTouchTitle: "Ponte en Contacto", getInTouchSub: "Ya sea que compres, vendas o simplemente estés explorando — nuestro equipo está listo para ayudarte.",
    emailLabel: "Correo electrónico", emailDesc: "Respondemos en 1 día laborable",
    coverageLabel: "Cobertura", coverageValue: "29 Países Europeos", coverageDesc: "Cobertura completa del mercado europeo",
    languagesLabel: "Idiomas", languagesValue: "English, German, Italian", languagesDesc: "Equipo de soporte multilingüe",
    sendMessageTitle: "Enviar un Mensaje",
    company: "Empresa", companyPlaceholder: "Nombre de tu empresa",
    subject: "Asunto", selectATopic: "Selecciona un tema",
    subjectOptions: { buying: "Comprar una atracción", selling: "Vender / publicar una atracción", account: "Soporte de cuenta", listingIssue: "Problema con un anuncio", partnership: "Consulta de colaboración", other: "Otro" },
    message: "Mensaje", messagePlaceholder: "Cuéntanos cómo podemos ayudarte...",
    sending: "Enviando...", sendMessage: "Enviar Mensaje",
    messageSentTitle: "¡Mensaje Enviado!", messageSentDesc: "Gracias por contactarnos. Te responderemos en 1 día laborable.",
    errorGeneric: "Algo salió mal. Escríbenos directamente a info@ridedirect.eu.",
  },
  nl: {
    metaTitle: "Neem Contact Op",
    metaDescription: "Neem contact op met het RideDirect.eu-team over het kopen, verkopen of plaatsen van attracties in Europa.",
    headerTitle: "Neem Contact Op", headerSub: "Heeft u vragen over kopen, verkopen of adverteren op RideDirect? Wij helpen u graag.",
    getInTouchTitle: "Neem Contact Op", getInTouchSub: "Of u nu koopt, verkoopt of gewoon aan het rondkijken bent — ons team staat klaar om te helpen.",
    emailLabel: "E-mail", emailDesc: "Wij reageren binnen 1 werkdag",
    coverageLabel: "Dekking", coverageValue: "29 Europese Landen", coverageDesc: "Volledige Europese marktdekking",
    languagesLabel: "Talen", languagesValue: "English, German, Italian", languagesDesc: "Meertalig supportteam",
    sendMessageTitle: "Stuur een Bericht",
    company: "Bedrijf", companyPlaceholder: "Naam van uw bedrijf",
    subject: "Onderwerp", selectATopic: "Selecteer een onderwerp",
    subjectOptions: { buying: "Een attractie kopen", selling: "Een attractie verkopen / plaatsen", account: "Accountondersteuning", listingIssue: "Probleem met een advertentie", partnership: "Partnerschapsverzoek", other: "Overig" },
    message: "Bericht", messagePlaceholder: "Vertel ons hoe we u kunnen helpen...",
    sending: "Verzenden...", sendMessage: "Bericht Versturen",
    messageSentTitle: "Bericht Verzonden!", messageSentDesc: "Bedankt voor uw bericht. We nemen binnen 1 werkdag contact met u op.",
    errorGeneric: "Er is iets misgegaan. Stuur ons rechtstreeks een e-mail naar info@ridedirect.eu.",
  },
  pl: {
    metaTitle: "Skontaktuj się z Nami",
    metaDescription: "Skontaktuj się z zespołem RideDirect.eu w sprawie kupna, sprzedaży lub wystawiania atrakcji w Europie.",
    headerTitle: "Skontaktuj się z Nami", headerSub: "Masz pytania dotyczące kupna, sprzedaży lub wystawiania ogłoszeń na RideDirect? Jesteśmy tu, aby pomóc.",
    getInTouchTitle: "Skontaktuj się", getInTouchSub: "Niezależnie od tego, czy kupujesz, sprzedajesz, czy po prostu przeglądasz — nasz zespół jest gotowy do pomocy.",
    emailLabel: "E-mail", emailDesc: "Odpowiadamy w ciągu 1 dnia roboczego",
    coverageLabel: "Zasięg", coverageValue: "29 Krajów Europejskich", coverageDesc: "Pełny zasięg rynku europejskiego",
    languagesLabel: "Języki", languagesValue: "English, German, Italian", languagesDesc: "Wielojęzyczny zespół wsparcia",
    sendMessageTitle: "Wyślij Wiadomość",
    company: "Firma", companyPlaceholder: "Nazwa Twojej firmy",
    subject: "Temat", selectATopic: "Wybierz temat",
    subjectOptions: { buying: "Kupno atrakcji", selling: "Sprzedaż / wystawianie atrakcji", account: "Wsparcie konta", listingIssue: "Problem z ogłoszeniem", partnership: "Zapytanie o współpracę", other: "Inne" },
    message: "Wiadomość", messagePlaceholder: "Powiedz nam, jak możemy Ci pomóc...",
    sending: "Wysyłanie...", sendMessage: "Wyślij Wiadomość",
    messageSentTitle: "Wiadomość Wysłana!", messageSentDesc: "Dziękujemy za kontakt. Odpowiemy w ciągu 1 dnia roboczego.",
    errorGeneric: "Coś poszło nie tak. Napisz do nas bezpośrednio na info@ridedirect.eu.",
  },
  pt: {
    metaTitle: "Contacte-nos",
    metaDescription: "Entre em contacto com a equipa da RideDirect.eu sobre comprar, vender ou publicar atrações na Europa.",
    headerTitle: "Contacte-nos", headerSub: "Tem perguntas sobre comprar, vender ou publicar na RideDirect? Estamos aqui para ajudar.",
    getInTouchTitle: "Entre em Contacto", getInTouchSub: "Quer esteja a comprar, vender ou apenas a explorar — a nossa equipa está pronta para ajudar.",
    emailLabel: "Email", emailDesc: "Respondemos dentro de 1 dia útil",
    coverageLabel: "Cobertura", coverageValue: "29 Países Europeus", coverageDesc: "Cobertura total do mercado europeu",
    languagesLabel: "Idiomas", languagesValue: "English, German, Italian", languagesDesc: "Equipa de suporte multilingue",
    sendMessageTitle: "Enviar uma Mensagem",
    company: "Empresa", companyPlaceholder: "Nome da sua empresa",
    subject: "Assunto", selectATopic: "Selecione um tópico",
    subjectOptions: { buying: "Comprar uma atração", selling: "Vender / publicar uma atração", account: "Suporte de conta", listingIssue: "Problema com um anúncio", partnership: "Pedido de parceria", other: "Outro" },
    message: "Mensagem", messagePlaceholder: "Diga-nos como podemos ajudá-lo...",
    sending: "A enviar...", sendMessage: "Enviar Mensagem",
    messageSentTitle: "Mensagem Enviada!", messageSentDesc: "Obrigado pelo contacto. Responderemos dentro de 1 dia útil.",
    errorGeneric: "Algo correu mal. Contacte-nos diretamente em info@ridedirect.eu.",
  },
}
