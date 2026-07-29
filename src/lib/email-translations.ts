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
  },
}
