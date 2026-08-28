import type { ListingLocale } from "@/lib/locales"

interface EmailStrings {
  newInquirySubject: (title: string) => string
  newInquiryHeading: string
  someoneInterested: string
  nameLabel: string
  emailLabel: string
  phoneLabel: string
  viewListingButton: string
  newMessageSubject: (name: string, title: string) => string
  newMessageHeading: (name: string) => string
  regarding: string
  viewConversationButton: string
  listingSubmittedSubject: (title: string) => string
  listingSubmittedHeading: string
  listingSubmittedBody: string
  listingApprovedSubject: (title: string) => string
  listingApprovedHeading: string
  listingApprovedBody: string
  viewYourListingButton: string
}

// Used server-side only (Resend email templates) — recipient locale comes
// from profiles.preferred_language, falling back to "en" for anonymous
// buyers who have no account/profile row.
export const EMAIL_T: Record<ListingLocale, EmailStrings> = {
  en: {
    newInquirySubject: (title) => `New inquiry for: ${title}`,
    newInquiryHeading: "New inquiry for your listing",
    someoneInterested: "Someone is interested in:",
    nameLabel: "Name", emailLabel: "Email", phoneLabel: "Phone",
    viewListingButton: "View in RideDirect",
    newMessageSubject: (name, title) => `New message from ${name}: ${title}`,
    newMessageHeading: (name) => `New message from ${name}`,
    regarding: "Regarding:",
    viewConversationButton: "View conversation",
    listingSubmittedSubject: (title) => `We received your listing: ${title}`,
    listingSubmittedHeading: "Thanks for listing on RideDirect",
    listingSubmittedBody: "We're reviewing it now and will email you as soon as it's live.",
    listingApprovedSubject: (title) => `Your listing is live: ${title}`,
    listingApprovedHeading: "Your listing is live!",
    listingApprovedBody: "Buyers across Europe can now see it.",
    viewYourListingButton: "View your listing",
  },
  de: {
    newInquirySubject: (title) => `Neue Anfrage für: ${title}`,
    newInquiryHeading: "Neue Anfrage für Ihr Inserat",
    someoneInterested: "Jemand interessiert sich für:",
    nameLabel: "Name", emailLabel: "E-Mail", phoneLabel: "Telefon",
    viewListingButton: "In RideDirect ansehen",
    newMessageSubject: (name, title) => `Neue Nachricht von ${name}: ${title}`,
    newMessageHeading: (name) => `Neue Nachricht von ${name}`,
    regarding: "Betreff:",
    viewConversationButton: "Unterhaltung ansehen",
    listingSubmittedSubject: (title) => `Wir haben Ihr Inserat erhalten: ${title}`,
    listingSubmittedHeading: "Danke für Ihr Inserat auf RideDirect",
    listingSubmittedBody: "Wir prüfen es jetzt und melden uns per E-Mail, sobald es live ist.",
    listingApprovedSubject: (title) => `Ihr Inserat ist live: ${title}`,
    listingApprovedHeading: "Ihr Inserat ist live!",
    listingApprovedBody: "Käufer aus ganz Europa können es jetzt sehen.",
    viewYourListingButton: "Inserat ansehen",
  },
  it: {
    newInquirySubject: (title) => `Nuova richiesta per: ${title}`,
    newInquiryHeading: "Nuova richiesta per il tuo annuncio",
    someoneInterested: "Qualcuno è interessato a:",
    nameLabel: "Nome", emailLabel: "Email", phoneLabel: "Telefono",
    viewListingButton: "Visualizza su RideDirect",
    newMessageSubject: (name, title) => `Nuovo messaggio da ${name}: ${title}`,
    newMessageHeading: (name) => `Nuovo messaggio da ${name}`,
    regarding: "Oggetto:",
    viewConversationButton: "Visualizza conversazione",
    listingSubmittedSubject: (title) => `Abbiamo ricevuto il tuo annuncio: ${title}`,
    listingSubmittedHeading: "Grazie per aver pubblicato su RideDirect",
    listingSubmittedBody: "Lo stiamo esaminando e ti scriveremo non appena sarà online.",
    listingApprovedSubject: (title) => `Il tuo annuncio è online: ${title}`,
    listingApprovedHeading: "Il tuo annuncio è online!",
    listingApprovedBody: "Gli acquirenti di tutta Europa possono ora vederlo.",
    viewYourListingButton: "Visualizza il tuo annuncio",
  },
  fr: {
    newInquirySubject: (title) => `Nouvelle demande pour : ${title}`,
    newInquiryHeading: "Nouvelle demande pour votre annonce",
    someoneInterested: "Quelqu'un est intéressé par :",
    nameLabel: "Nom", emailLabel: "Email", phoneLabel: "Téléphone",
    viewListingButton: "Voir sur RideDirect",
    newMessageSubject: (name, title) => `Nouveau message de ${name} : ${title}`,
    newMessageHeading: (name) => `Nouveau message de ${name}`,
    regarding: "Concernant :",
    viewConversationButton: "Voir la conversation",
    listingSubmittedSubject: (title) => `Nous avons bien reçu votre annonce : ${title}`,
    listingSubmittedHeading: "Merci d'avoir publié sur RideDirect",
    listingSubmittedBody: "Nous l'examinons et vous écrirons dès qu'elle sera en ligne.",
    listingApprovedSubject: (title) => `Votre annonce est en ligne : ${title}`,
    listingApprovedHeading: "Votre annonce est en ligne !",
    listingApprovedBody: "Les acheteurs de toute l'Europe peuvent désormais la voir.",
    viewYourListingButton: "Voir votre annonce",
  },
  es: {
    newInquirySubject: (title) => `Nueva consulta para: ${title}`,
    newInquiryHeading: "Nueva consulta para tu anuncio",
    someoneInterested: "Alguien está interesado en:",
    nameLabel: "Nombre", emailLabel: "Correo electrónico", phoneLabel: "Teléfono",
    viewListingButton: "Ver en RideDirect",
    newMessageSubject: (name, title) => `Nuevo mensaje de ${name}: ${title}`,
    newMessageHeading: (name) => `Nuevo mensaje de ${name}`,
    regarding: "Asunto:",
    viewConversationButton: "Ver conversación",
    listingSubmittedSubject: (title) => `Hemos recibido tu anuncio: ${title}`,
    listingSubmittedHeading: "Gracias por publicar en RideDirect",
    listingSubmittedBody: "Lo estamos revisando y te escribiremos en cuanto esté en línea.",
    listingApprovedSubject: (title) => `Tu anuncio ya está en línea: ${title}`,
    listingApprovedHeading: "¡Tu anuncio ya está en línea!",
    listingApprovedBody: "Compradores de toda Europa ya pueden verlo.",
    viewYourListingButton: "Ver tu anuncio",
  },
  nl: {
    newInquirySubject: (title) => `Nieuwe aanvraag voor: ${title}`,
    newInquiryHeading: "Nieuwe aanvraag voor uw advertentie",
    someoneInterested: "Iemand is geïnteresseerd in:",
    nameLabel: "Naam", emailLabel: "E-mail", phoneLabel: "Telefoon",
    viewListingButton: "Bekijk op RideDirect",
    newMessageSubject: (name, title) => `Nieuw bericht van ${name}: ${title}`,
    newMessageHeading: (name) => `Nieuw bericht van ${name}`,
    regarding: "Betreft:",
    viewConversationButton: "Bekijk gesprek",
    listingSubmittedSubject: (title) => `We hebben uw advertentie ontvangen: ${title}`,
    listingSubmittedHeading: "Bedankt voor uw advertentie op RideDirect",
    listingSubmittedBody: "We beoordelen deze nu en laten het u weten zodra hij live staat.",
    listingApprovedSubject: (title) => `Uw advertentie staat live: ${title}`,
    listingApprovedHeading: "Uw advertentie staat live!",
    listingApprovedBody: "Kopers uit heel Europa kunnen hem nu zien.",
    viewYourListingButton: "Bekijk uw advertentie",
  },
  pl: {
    newInquirySubject: (title) => `Nowe zapytanie o: ${title}`,
    newInquiryHeading: "Nowe zapytanie o Twoje ogłoszenie",
    someoneInterested: "Ktoś jest zainteresowany:",
    nameLabel: "Imię", emailLabel: "E-mail", phoneLabel: "Telefon",
    viewListingButton: "Zobacz na RideDirect",
    newMessageSubject: (name, title) => `Nowa wiadomość od ${name}: ${title}`,
    newMessageHeading: (name) => `Nowa wiadomość od ${name}`,
    regarding: "Dotyczy:",
    viewConversationButton: "Zobacz rozmowę",
    listingSubmittedSubject: (title) => `Otrzymaliśmy Twoje ogłoszenie: ${title}`,
    listingSubmittedHeading: "Dziękujemy za dodanie ogłoszenia na RideDirect",
    listingSubmittedBody: "Sprawdzamy je teraz i napiszemy, gdy tylko będzie widoczne.",
    listingApprovedSubject: (title) => `Twoje ogłoszenie jest już widoczne: ${title}`,
    listingApprovedHeading: "Twoje ogłoszenie jest już widoczne!",
    listingApprovedBody: "Kupujący z całej Europy mogą je teraz zobaczyć.",
    viewYourListingButton: "Zobacz swoje ogłoszenie",
  },
  pt: {
    newInquirySubject: (title) => `Novo pedido para: ${title}`,
    newInquiryHeading: "Novo pedido para o seu anúncio",
    someoneInterested: "Alguém está interessado em:",
    nameLabel: "Nome", emailLabel: "Email", phoneLabel: "Telefone",
    viewListingButton: "Ver no RideDirect",
    newMessageSubject: (name, title) => `Nova mensagem de ${name}: ${title}`,
    newMessageHeading: (name) => `Nova mensagem de ${name}`,
    regarding: "Assunto:",
    viewConversationButton: "Ver conversa",
    listingSubmittedSubject: (title) => `Recebemos o seu anúncio: ${title}`,
    listingSubmittedHeading: "Obrigado por publicar no RideDirect",
    listingSubmittedBody: "Estamos a analisá-lo e escrevemos assim que estiver online.",
    listingApprovedSubject: (title) => `O seu anúncio está online: ${title}`,
    listingApprovedHeading: "O seu anúncio está online!",
    listingApprovedBody: "Compradores de toda a Europa já podem vê-lo.",
    viewYourListingButton: "Ver o seu anúncio",
  },
}
