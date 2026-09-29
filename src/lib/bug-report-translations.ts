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
  errorHeading: string
  errorBody: string
  tryAgain: string
  reportProblem: string
  sendFailed: string
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
    errorHeading: "Something went wrong",
    errorBody: "This page ran into an error. Try again, and if it keeps happening, please tell us so we can fix it.",
    tryAgain: "Try again",
    reportProblem: "Report this problem",
    sendFailed: "Sending failed. Please try again, or email us at info@ridedirect.eu.",
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
    errorHeading: "Etwas ist schiefgelaufen",
    errorBody: "Auf dieser Seite ist ein Fehler aufgetreten. Versuchen Sie es erneut – wenn es wieder passiert, melden Sie es uns bitte.",
    tryAgain: "Erneut versuchen",
    reportProblem: "Problem melden",
    sendFailed: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an info@ridedirect.eu.",
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
    errorHeading: "Qualcosa è andato storto",
    errorBody: "Questa pagina ha avuto un errore. Riprova e, se succede ancora, segnalacelo così possiamo correggerlo.",
    tryAgain: "Riprova",
    reportProblem: "Segnala il problema",
    sendFailed: "Invio non riuscito. Riprova o scrivici a info@ridedirect.eu.",
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
    errorHeading: "Un problème est survenu",
    errorBody: "Cette page a rencontré une erreur. Réessayez et, si cela se reproduit, signalez-le-nous pour que nous puissions le corriger.",
    tryAgain: "Réessayer",
    reportProblem: "Signaler le problème",
    sendFailed: "L'envoi a échoué. Réessayez ou écrivez-nous à info@ridedirect.eu.",
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
    errorHeading: "Algo salió mal",
    errorBody: "Esta página tuvo un error. Inténtalo de nuevo y, si vuelve a pasar, avísanos para que podamos solucionarlo.",
    tryAgain: "Reintentar",
    reportProblem: "Informar del problema",
    sendFailed: "No se pudo enviar. Inténtalo de nuevo o escríbenos a info@ridedirect.eu.",
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
    errorHeading: "Er ging iets mis",
    errorBody: "Er is een fout opgetreden op deze pagina. Probeer het opnieuw en laat het ons weten als het blijft gebeuren.",
    tryAgain: "Opnieuw proberen",
    reportProblem: "Probleem melden",
    sendFailed: "Verzenden mislukt. Probeer het opnieuw of mail ons op info@ridedirect.eu.",
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
    errorHeading: "Coś poszło nie tak",
    errorBody: "Na tej stronie wystąpił błąd. Spróbuj ponownie, a jeśli to się powtórzy, zgłoś nam to, abyśmy mogli to naprawić.",
    tryAgain: "Spróbuj ponownie",
    reportProblem: "Zgłoś problem",
    sendFailed: "Wysyłanie nie powiodło się. Spróbuj ponownie lub napisz na info@ridedirect.eu.",
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
    errorHeading: "Algo correu mal",
    errorBody: "Esta página encontrou um erro. Tente novamente e, se voltar a acontecer, informe-nos para que possamos corrigir.",
    tryAgain: "Tentar novamente",
    reportProblem: "Reportar o problema",
    sendFailed: "O envio falhou. Tente novamente ou escreva-nos para info@ridedirect.eu.",
  },
}
