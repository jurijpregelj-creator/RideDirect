import type { ListingLocale } from "@/lib/locales"

export const STATUS_LABELS: Record<ListingLocale, Record<string, string>> = {
  en: { pending: "Pending review", approved: "Active", rejected: "Rejected", expired: "Expired", draft: "Draft" },
  de: { pending: "Ausstehend", approved: "Aktiv", rejected: "Abgelehnt", expired: "Abgelaufen", draft: "Entwurf" },
  it: { pending: "In attesa", approved: "Attivo", rejected: "Rifiutato", expired: "Scaduto", draft: "Bozza" },
  fr: { pending: "En attente d'examen", approved: "Actif", rejected: "Refusé", expired: "Expiré", draft: "Brouillon" },
  es: { pending: "Pendiente de revisión", approved: "Activo", rejected: "Rechazado", expired: "Caducado", draft: "Borrador" },
  nl: { pending: "In afwachting van beoordeling", approved: "Actief", rejected: "Afgewezen", expired: "Verlopen", draft: "Concept" },
  pl: { pending: "Oczekuje na weryfikację", approved: "Aktywne", rejected: "Odrzucone", expired: "Wygasłe", draft: "Szkic" },
  pt: { pending: "Pendente de revisão", approved: "Ativo", rejected: "Rejeitado", expired: "Expirado", draft: "Rascunho" },
}
