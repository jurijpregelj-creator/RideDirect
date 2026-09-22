import type { ListingLocale } from "@/lib/locales"

interface BugReportStrings {
  buttonLabel: string
  heading: string
  placeholder: string
  emailPlaceholder: string
  attachTitle: string
  submit: string
  sending: string
  thanks: string
}

export const BUG_REPORT_T: Record<ListingLocale, BugReportStrings> = {
  en: {
    buttonLabel: "Report a bug",
    heading: "Found a bug? Have an idea?",
    placeholder: "Tell us what happened, or what would make RideDirect better...",
    emailPlaceholder: "Your email (optional, so we can follow up)",
    attachTitle: "Attach a screenshot",
    submit: "Send",
    sending: "Sending...",
    thanks: "Thanks! We'll look into it.",
  },
  de: {
    buttonLabel: "Fehler melden",
    heading: "Fehler gefunden? Idee für uns?",
    placeholder: "Beschreiben Sie, was passiert ist, oder was RideDirect besser machen würde...",
    emailPlaceholder: "Ihre E-Mail (optional, für Rückfragen)",
    attachTitle: "Screenshot anhängen",
    submit: "Senden",
    sending: "Wird gesendet...",
    thanks: "Danke! Wir schauen es uns an.",
  },
  it: {
    buttonLabel: "Segnala un problema",
    heading: "Hai trovato un problema? Un'idea?",
    placeholder: "Raccontaci cosa è successo, o cosa renderebbe RideDirect migliore...",
    emailPlaceholder: "La tua email (facoltativa, per ricontattarti)",
    attachTitle: "Allega uno screenshot",
    submit: "Invia",
    sending: "Invio in corso...",
    thanks: "Grazie! Ci daremo un'occhiata.",
  },
  fr: {
    buttonLabel: "Signaler un problème",
    heading: "Un bug ? Une idée ?",
    placeholder: "Dites-nous ce qui s'est passé, ou ce qui rendrait RideDirect meilleur...",
    emailPlaceholder: "Votre email (facultatif, pour vous recontacter)",
    attachTitle: "Joindre une capture d'écran",
    submit: "Envoyer",
    sending: "Envoi en cours...",
    thanks: "Merci ! Nous allons regarder ça.",
  },
  es: {
    buttonLabel: "Informar de un problema",
    heading: "¿Encontraste un error? ¿Tienes una idea?",
    placeholder: "Cuéntanos qué pasó, o qué mejoraría RideDirect...",
    emailPlaceholder: "Tu correo (opcional, para poder responderte)",
    attachTitle: "Adjuntar una captura de pantalla",
    submit: "Enviar",
    sending: "Enviando...",
    thanks: "¡Gracias! Le echaremos un vistazo.",
  },
  nl: {
    buttonLabel: "Bug melden",
    heading: "Bug gevonden? Idee voor ons?",
    placeholder: "Vertel ons wat er is gebeurd, of wat RideDirect zou verbeteren...",
    emailPlaceholder: "Uw e-mail (optioneel, om te reageren)",
    attachTitle: "Screenshot bijvoegen",
    submit: "Versturen",
    sending: "Versturen...",
    thanks: "Bedankt! We gaan ernaar kijken.",
  },
  pl: {
    buttonLabel: "Zgłoś błąd",
    heading: "Znalazłeś błąd? Masz pomysł?",
    placeholder: "Napisz, co się stało, albo co poprawiłoby RideDirect...",
    emailPlaceholder: "Twój e-mail (opcjonalnie, abyśmy mogli odpowiedzieć)",
    attachTitle: "Załącz zrzut ekranu",
    submit: "Wyślij",
    sending: "Wysyłanie...",
    thanks: "Dziękujemy! Sprawdzimy to.",
  },
  pt: {
    buttonLabel: "Reportar um problema",
    heading: "Encontrou um erro? Tem uma ideia?",
    placeholder: "Conte-nos o que aconteceu, ou o que tornaria o RideDirect melhor...",
    emailPlaceholder: "O seu email (opcional, para podermos responder)",
    attachTitle: "Anexar uma captura de ecrã",
    submit: "Enviar",
    sending: "A enviar...",
    thanks: "Obrigado! Vamos analisar.",
  },
}
