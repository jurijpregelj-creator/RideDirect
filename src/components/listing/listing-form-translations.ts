import type { ListingLocale } from "@/lib/locales"

interface ListingFormStrings {
  sectionBasicInfo: string
  sectionPricing: string
  sectionRideDetails: string
  sectionPhotos: string
  titleLabel: string
  titleLabelShort: string
  titlePlaceholder: string
  descriptionLabel: string
  descriptionPlaceholder: string
  categoryLabel: string
  categoryPlaceholder: string
  countryLabel: string
  countryPlaceholder: string
  priceLabel: string
  priceLabelShort: string
  pricePlaceholder: string
  currencyLabel: string
  conditionLabel: string
  conditionPlaceholder: string
  manufacturerLabel: string
  manufacturerPlaceholder: string
  yearLabel: string
  yearPlaceholder: string
  photosHint: string
  coverBadge: string
  addPhoto: string
  clickToUpload: string
  fileTypesHint: string
  submitting: string
  submit: string
  cancel: string
  reviewNote: string
  errorMaxImages: string
  errorRequiredFields: string
  errorGeneric: string
  errorCreateFailed: string
  // edit-page specific
  editTitle: string
  editSubtitle: string
  backToDashboard: string
  setCoverHint: string
  setCover: string
  newBadge: string
  maxImagesTotal: string
  savedRedirect: string
  saveFailed: string
  saving: string
  saveChanges: string
  // funnel-specific
  yourEmail: string
  emailPlaceholder: string
  emailHint: string
  noAccountNote: string
  errorMaxPhotos: string
}

// Same rationale as the other *-translations.ts files this session: a
// self-contained dict for all 8 locales rather than extending next-intl's
// routing.locales, so create-listing-form.tsx, the edit page, and
// funnel-form.tsx can all share one translated vocabulary without forcing
// unrelated namespaces (auth/dashboard/etc.) to exist in 5 more languages.
export const LISTING_FORM_T: Record<ListingLocale, ListingFormStrings> = {
  en: {
    sectionBasicInfo: "Basic Information", sectionPricing: "Pricing", sectionRideDetails: "Ride Details", sectionPhotos: "Photos",
    titleLabel: "Listing Title *", titleLabelShort: "Title *",
    titlePlaceholder: "e.g. Zamperla Mini Jet — 12 Seats, Excellent Condition",
    descriptionLabel: "Description *",
    descriptionPlaceholder: "Describe the ride in detail: capacity, technical specs, history, condition notes, what's included in the sale...",
    categoryLabel: "Category *", categoryPlaceholder: "Select category",
    countryLabel: "Country *", countryPlaceholder: "Select country",
    priceLabel: "Asking Price *", priceLabelShort: "Price *", pricePlaceholder: "e.g. 25000",
    currencyLabel: "Currency *",
    conditionLabel: "Condition *", conditionPlaceholder: "Select condition",
    manufacturerLabel: "Manufacturer", manufacturerPlaceholder: "e.g. Zamperla, Huss, Bertazzon",
    yearLabel: "Year of Manufacture", yearPlaceholder: "e.g. 2015",
    photosHint: "Upload up to 8 photos. High-quality images significantly increase buyer interest.",
    coverBadge: "Cover", addPhoto: "Add",
    clickToUpload: "Click to upload photos", fileTypesHint: "JPG, PNG, WebP — max 8 files",
    submitting: "Submitting listing...", submit: "Submit for Review", cancel: "Cancel",
    reviewNote: "Your listing will be reviewed by our team and published within 24 hours.",
    errorMaxImages: "You can upload up to 8 images.",
    errorRequiredFields: "Please fill in all required fields.",
    errorGeneric: "Something went wrong. Please try again.",
    errorCreateFailed: "Failed to create listing",
    editTitle: "Edit Listing", editSubtitle: "Changes will be re-submitted for review before going live.",
    backToDashboard: "Back to Dashboard",
    setCoverHint: "Click an image to set it as the cover photo.", setCover: "Set cover", newBadge: "New",
    maxImagesTotal: "Maximum 8 images total.",
    savedRedirect: "✓ Saved! Redirecting to dashboard...", saveFailed: "Failed to save. Please try again.",
    saving: "Saving...", saveChanges: "Save Changes",
    yourEmail: "Your email *", emailPlaceholder: "you@company.com",
    emailHint: "So we can notify you when your listing goes live.",
    noAccountNote: "No account needed to submit. Your listing is saved before registration.",
    errorMaxPhotos: "Maximum 8 photos.",
  },
  de: {
    sectionBasicInfo: "Grundinformationen", sectionPricing: "Preis", sectionRideDetails: "Details zum Fahrgeschäft", sectionPhotos: "Fotos",
    titleLabel: "Inserattitel *", titleLabelShort: "Titel *",
    titlePlaceholder: "z. B. Zamperla Mini Jet — 12 Plätze, ausgezeichneter Zustand",
    descriptionLabel: "Beschreibung *",
    descriptionPlaceholder: "Beschreiben Sie das Fahrgeschäft im Detail: Kapazität, technische Daten, Historie, Zustand, was im Verkauf enthalten ist...",
    categoryLabel: "Kategorie *", categoryPlaceholder: "Kategorie auswählen",
    countryLabel: "Land *", countryPlaceholder: "Land auswählen",
    priceLabel: "Angebotspreis *", priceLabelShort: "Preis *", pricePlaceholder: "z. B. 25000",
    currencyLabel: "Währung *",
    conditionLabel: "Zustand *", conditionPlaceholder: "Zustand auswählen",
    manufacturerLabel: "Hersteller", manufacturerPlaceholder: "z. B. Zamperla, Huss, Bertazzon",
    yearLabel: "Baujahr", yearPlaceholder: "z. B. 2015",
    photosHint: "Bis zu 8 Fotos hochladen. Hochwertige Bilder steigern das Käuferinteresse deutlich.",
    coverBadge: "Titelbild", addPhoto: "Hinzufügen",
    clickToUpload: "Klicken, um Fotos hochzuladen", fileTypesHint: "JPG, PNG, WebP — max. 8 Dateien",
    submitting: "Inserat wird übermittelt...", submit: "Zur Prüfung einreichen", cancel: "Abbrechen",
    reviewNote: "Ihr Inserat wird von unserem Team geprüft und innerhalb von 24 Stunden veröffentlicht.",
    errorMaxImages: "Sie können bis zu 8 Bilder hochladen.",
    errorRequiredFields: "Bitte füllen Sie alle Pflichtfelder aus.",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    errorCreateFailed: "Inserat konnte nicht erstellt werden",
    editTitle: "Inserat bearbeiten", editSubtitle: "Änderungen werden vor der Veröffentlichung erneut geprüft.",
    backToDashboard: "Zurück zum Dashboard",
    setCoverHint: "Klicken Sie auf ein Bild, um es als Titelbild festzulegen.", setCover: "Als Titelbild", newBadge: "Neu",
    maxImagesTotal: "Maximal 8 Bilder insgesamt.",
    savedRedirect: "✓ Gespeichert! Weiterleitung zum Dashboard...", saveFailed: "Speichern fehlgeschlagen. Bitte versuchen Sie es erneut.",
    saving: "Wird gespeichert...", saveChanges: "Änderungen speichern",
    yourEmail: "Ihre E-Mail *", emailPlaceholder: "sie@firma.com",
    emailHint: "Damit wir Sie benachrichtigen können, wenn Ihr Inserat live geht.",
    noAccountNote: "Kein Konto zum Einreichen erforderlich. Ihr Inserat wird vor der Registrierung gespeichert.",
    errorMaxPhotos: "Maximal 8 Fotos.",
  },
  it: {
    sectionBasicInfo: "Informazioni di base", sectionPricing: "Prezzo", sectionRideDetails: "Dettagli dell'attrazione", sectionPhotos: "Foto",
    titleLabel: "Titolo annuncio *", titleLabelShort: "Titolo *",
    titlePlaceholder: "es. Zamperla Mini Jet — 12 posti, ottime condizioni",
    descriptionLabel: "Descrizione *",
    descriptionPlaceholder: "Descrivi l'attrazione in dettaglio: capacità, specifiche tecniche, storia, condizioni, cosa è incluso nella vendita...",
    categoryLabel: "Categoria *", categoryPlaceholder: "Seleziona categoria",
    countryLabel: "Paese *", countryPlaceholder: "Seleziona paese",
    priceLabel: "Prezzo richiesto *", priceLabelShort: "Prezzo *", pricePlaceholder: "es. 25000",
    currencyLabel: "Valuta *",
    conditionLabel: "Condizione *", conditionPlaceholder: "Seleziona condizione",
    manufacturerLabel: "Produttore", manufacturerPlaceholder: "es. Zamperla, Huss, Bertazzon",
    yearLabel: "Anno di produzione", yearPlaceholder: "es. 2015",
    photosHint: "Carica fino a 8 foto. Immagini di alta qualità aumentano notevolmente l'interesse degli acquirenti.",
    coverBadge: "Copertina", addPhoto: "Aggiungi",
    clickToUpload: "Clicca per caricare le foto", fileTypesHint: "JPG, PNG, WebP — max 8 file",
    submitting: "Invio annuncio in corso...", submit: "Invia per la revisione", cancel: "Annulla",
    reviewNote: "Il tuo annuncio sarà esaminato dal nostro team e pubblicato entro 24 ore.",
    errorMaxImages: "Puoi caricare fino a 8 immagini.",
    errorRequiredFields: "Compila tutti i campi obbligatori.",
    errorGeneric: "Qualcosa è andato storto. Riprova.",
    errorCreateFailed: "Impossibile creare l'annuncio",
    editTitle: "Modifica annuncio", editSubtitle: "Le modifiche saranno nuovamente esaminate prima della pubblicazione.",
    backToDashboard: "Torna alla Dashboard",
    setCoverHint: "Clicca su un'immagine per impostarla come copertina.", setCover: "Imposta come copertina", newBadge: "Nuovo",
    maxImagesTotal: "Massimo 8 immagini totali.",
    savedRedirect: "✓ Salvato! Reindirizzamento alla dashboard...", saveFailed: "Salvataggio non riuscito. Riprova.",
    saving: "Salvataggio in corso...", saveChanges: "Salva modifiche",
    yourEmail: "La tua email *", emailPlaceholder: "tu@azienda.com",
    emailHint: "Per avvisarti quando il tuo annuncio sarà online.",
    noAccountNote: "Non serve un account per inviare. Il tuo annuncio viene salvato prima della registrazione.",
    errorMaxPhotos: "Massimo 8 foto.",
  },
  fr: {
    sectionBasicInfo: "Informations de base", sectionPricing: "Tarification", sectionRideDetails: "Détails de l'attraction", sectionPhotos: "Photos",
    titleLabel: "Titre de l'annonce *", titleLabelShort: "Titre *",
    titlePlaceholder: "ex. Zamperla Mini Jet — 12 places, excellent état",
    descriptionLabel: "Description *",
    descriptionPlaceholder: "Décrivez l'attraction en détail : capacité, spécifications techniques, historique, état, ce qui est inclus dans la vente...",
    categoryLabel: "Catégorie *", categoryPlaceholder: "Sélectionner une catégorie",
    countryLabel: "Pays *", countryPlaceholder: "Sélectionner un pays",
    priceLabel: "Prix demandé *", priceLabelShort: "Prix *", pricePlaceholder: "ex. 25000",
    currencyLabel: "Devise *",
    conditionLabel: "État *", conditionPlaceholder: "Sélectionner l'état",
    manufacturerLabel: "Fabricant", manufacturerPlaceholder: "ex. Zamperla, Huss, Bertazzon",
    yearLabel: "Année de fabrication", yearPlaceholder: "ex. 2015",
    photosHint: "Téléchargez jusqu'à 8 photos. Des images de qualité augmentent considérablement l'intérêt des acheteurs.",
    coverBadge: "Couverture", addPhoto: "Ajouter",
    clickToUpload: "Cliquez pour télécharger des photos", fileTypesHint: "JPG, PNG, WebP — 8 fichiers max",
    submitting: "Envoi de l'annonce...", submit: "Soumettre pour révision", cancel: "Annuler",
    reviewNote: "Votre annonce sera examinée par notre équipe et publiée sous 24 heures.",
    errorMaxImages: "Vous pouvez télécharger jusqu'à 8 images.",
    errorRequiredFields: "Veuillez remplir tous les champs obligatoires.",
    errorGeneric: "Une erreur s'est produite. Veuillez réessayer.",
    errorCreateFailed: "Échec de la création de l'annonce",
    editTitle: "Modifier l'annonce", editSubtitle: "Les modifications seront réexaminées avant la mise en ligne.",
    backToDashboard: "Retour au tableau de bord",
    setCoverHint: "Cliquez sur une image pour en faire la photo de couverture.", setCover: "Définir comme couverture", newBadge: "Nouveau",
    maxImagesTotal: "Maximum 8 images au total.",
    savedRedirect: "✓ Enregistré ! Redirection vers le tableau de bord...", saveFailed: "Échec de l'enregistrement. Veuillez réessayer.",
    saving: "Enregistrement...", saveChanges: "Enregistrer les modifications",
    yourEmail: "Votre email *", emailPlaceholder: "vous@entreprise.com",
    emailHint: "Pour vous prévenir dès que votre annonce est en ligne.",
    noAccountNote: "Aucun compte requis pour soumettre. Votre annonce est enregistrée avant l'inscription.",
    errorMaxPhotos: "Maximum 8 photos.",
  },
  es: {
    sectionBasicInfo: "Información básica", sectionPricing: "Precio", sectionRideDetails: "Detalles de la atracción", sectionPhotos: "Fotos",
    titleLabel: "Título del anuncio *", titleLabelShort: "Título *",
    titlePlaceholder: "ej. Zamperla Mini Jet — 12 plazas, excelente estado",
    descriptionLabel: "Descripción *",
    descriptionPlaceholder: "Describe la atracción en detalle: capacidad, especificaciones técnicas, historial, estado, qué se incluye en la venta...",
    categoryLabel: "Categoría *", categoryPlaceholder: "Selecciona categoría",
    countryLabel: "País *", countryPlaceholder: "Selecciona país",
    priceLabel: "Precio solicitado *", priceLabelShort: "Precio *", pricePlaceholder: "ej. 25000",
    currencyLabel: "Moneda *",
    conditionLabel: "Estado *", conditionPlaceholder: "Selecciona estado",
    manufacturerLabel: "Fabricante", manufacturerPlaceholder: "ej. Zamperla, Huss, Bertazzon",
    yearLabel: "Año de fabricación", yearPlaceholder: "ej. 2015",
    photosHint: "Sube hasta 8 fotos. Las imágenes de alta calidad aumentan significativamente el interés de los compradores.",
    coverBadge: "Portada", addPhoto: "Añadir",
    clickToUpload: "Haz clic para subir fotos", fileTypesHint: "JPG, PNG, WebP — máx. 8 archivos",
    submitting: "Enviando anuncio...", submit: "Enviar para revisión", cancel: "Cancelar",
    reviewNote: "Tu anuncio será revisado por nuestro equipo y publicado en 24 horas.",
    errorMaxImages: "Puedes subir hasta 8 imágenes.",
    errorRequiredFields: "Completa todos los campos obligatorios.",
    errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
    errorCreateFailed: "No se pudo crear el anuncio",
    editTitle: "Editar anuncio", editSubtitle: "Los cambios volverán a revisarse antes de publicarse.",
    backToDashboard: "Volver al panel",
    setCoverHint: "Haz clic en una imagen para establecerla como portada.", setCover: "Establecer como portada", newBadge: "Nuevo",
    maxImagesTotal: "Máximo 8 imágenes en total.",
    savedRedirect: "✓ ¡Guardado! Redirigiendo al panel...", saveFailed: "Error al guardar. Inténtalo de nuevo.",
    saving: "Guardando...", saveChanges: "Guardar cambios",
    yourEmail: "Tu email *", emailPlaceholder: "tu@empresa.com",
    emailHint: "Para avisarte cuando tu anuncio esté publicado.",
    noAccountNote: "No se necesita cuenta para enviar. Tu anuncio se guarda antes del registro.",
    errorMaxPhotos: "Máximo 8 fotos.",
  },
  nl: {
    sectionBasicInfo: "Basisinformatie", sectionPricing: "Prijs", sectionRideDetails: "Details attractie", sectionPhotos: "Foto's",
    titleLabel: "Advertentietitel *", titleLabelShort: "Titel *",
    titlePlaceholder: "bijv. Zamperla Mini Jet — 12 zitplaatsen, uitstekende staat",
    descriptionLabel: "Beschrijving *",
    descriptionPlaceholder: "Beschrijf de attractie in detail: capaciteit, technische specificaties, geschiedenis, staat, wat is inbegrepen in de verkoop...",
    categoryLabel: "Categorie *", categoryPlaceholder: "Selecteer categorie",
    countryLabel: "Land *", countryPlaceholder: "Selecteer land",
    priceLabel: "Vraagprijs *", priceLabelShort: "Prijs *", pricePlaceholder: "bijv. 25000",
    currencyLabel: "Valuta *",
    conditionLabel: "Staat *", conditionPlaceholder: "Selecteer staat",
    manufacturerLabel: "Fabrikant", manufacturerPlaceholder: "bijv. Zamperla, Huss, Bertazzon",
    yearLabel: "Bouwjaar", yearPlaceholder: "bijv. 2015",
    photosHint: "Upload tot 8 foto's. Hoogwaardige afbeeldingen vergroten de interesse van kopers aanzienlijk.",
    coverBadge: "Omslag", addPhoto: "Toevoegen",
    clickToUpload: "Klik om foto's te uploaden", fileTypesHint: "JPG, PNG, WebP — max. 8 bestanden",
    submitting: "Advertentie wordt verzonden...", submit: "Indienen ter beoordeling", cancel: "Annuleren",
    reviewNote: "Uw advertentie wordt door ons team beoordeeld en binnen 24 uur gepubliceerd.",
    errorMaxImages: "U kunt tot 8 afbeeldingen uploaden.",
    errorRequiredFields: "Vul alle verplichte velden in.",
    errorGeneric: "Er is iets misgegaan. Probeer het opnieuw.",
    errorCreateFailed: "Advertentie kon niet worden aangemaakt",
    editTitle: "Advertentie bewerken", editSubtitle: "Wijzigingen worden opnieuw beoordeeld voordat ze live gaan.",
    backToDashboard: "Terug naar dashboard",
    setCoverHint: "Klik op een afbeelding om deze als omslagfoto in te stellen.", setCover: "Als omslag instellen", newBadge: "Nieuw",
    maxImagesTotal: "Maximaal 8 afbeeldingen in totaal.",
    savedRedirect: "✓ Opgeslagen! Doorverwijzen naar dashboard...", saveFailed: "Opslaan mislukt. Probeer het opnieuw.",
    saving: "Opslaan...", saveChanges: "Wijzigingen opslaan",
    yourEmail: "Uw e-mail *", emailPlaceholder: "u@bedrijf.com",
    emailHint: "Zodat we u kunnen laten weten wanneer uw advertentie live gaat.",
    noAccountNote: "Geen account nodig om in te dienen. Uw advertentie wordt opgeslagen vóór registratie.",
    errorMaxPhotos: "Maximaal 8 foto's.",
  },
  pl: {
    sectionBasicInfo: "Podstawowe informacje", sectionPricing: "Cena", sectionRideDetails: "Szczegóły atrakcji", sectionPhotos: "Zdjęcia",
    titleLabel: "Tytuł ogłoszenia *", titleLabelShort: "Tytuł *",
    titlePlaceholder: "np. Zamperla Mini Jet — 12 miejsc, doskonały stan",
    descriptionLabel: "Opis *",
    descriptionPlaceholder: "Opisz atrakcję szczegółowo: pojemność, dane techniczne, historię, stan, co jest wliczone w cenę sprzedaży...",
    categoryLabel: "Kategoria *", categoryPlaceholder: "Wybierz kategorię",
    countryLabel: "Kraj *", countryPlaceholder: "Wybierz kraj",
    priceLabel: "Cena wywoławcza *", priceLabelShort: "Cena *", pricePlaceholder: "np. 25000",
    currencyLabel: "Waluta *",
    conditionLabel: "Stan *", conditionPlaceholder: "Wybierz stan",
    manufacturerLabel: "Producent", manufacturerPlaceholder: "np. Zamperla, Huss, Bertazzon",
    yearLabel: "Rok produkcji", yearPlaceholder: "np. 2015",
    photosHint: "Prześlij do 8 zdjęć. Wysokiej jakości zdjęcia znacząco zwiększają zainteresowanie kupujących.",
    coverBadge: "Okładka", addPhoto: "Dodaj",
    clickToUpload: "Kliknij, aby przesłać zdjęcia", fileTypesHint: "JPG, PNG, WebP — maks. 8 plików",
    submitting: "Wysyłanie ogłoszenia...", submit: "Wyślij do weryfikacji", cancel: "Anuluj",
    reviewNote: "Twoje ogłoszenie zostanie sprawdzone przez nasz zespół i opublikowane w ciągu 24 godzin.",
    errorMaxImages: "Możesz przesłać do 8 zdjęć.",
    errorRequiredFields: "Wypełnij wszystkie wymagane pola.",
    errorGeneric: "Coś poszło nie tak. Spróbuj ponownie.",
    errorCreateFailed: "Nie udało się utworzyć ogłoszenia",
    editTitle: "Edytuj ogłoszenie", editSubtitle: "Zmiany zostaną ponownie zweryfikowane przed publikacją.",
    backToDashboard: "Powrót do panelu",
    setCoverHint: "Kliknij zdjęcie, aby ustawić je jako okładkę.", setCover: "Ustaw jako okładkę", newBadge: "Nowe",
    maxImagesTotal: "Maksymalnie 8 zdjęć łącznie.",
    savedRedirect: "✓ Zapisano! Przekierowanie do panelu...", saveFailed: "Nie udało się zapisać. Spróbuj ponownie.",
    saving: "Zapisywanie...", saveChanges: "Zapisz zmiany",
    yourEmail: "Twój e-mail *", emailPlaceholder: "ty@firma.com",
    emailHint: "Abyśmy mogli powiadomić Cię, gdy Twoje ogłoszenie będzie aktywne.",
    noAccountNote: "Konto nie jest wymagane do wysłania. Twoje ogłoszenie jest zapisywane przed rejestracją.",
    errorMaxPhotos: "Maksymalnie 8 zdjęć.",
  },
  pt: {
    sectionBasicInfo: "Informações básicas", sectionPricing: "Preço", sectionRideDetails: "Detalhes da atração", sectionPhotos: "Fotos",
    titleLabel: "Título do anúncio *", titleLabelShort: "Título *",
    titlePlaceholder: "ex. Zamperla Mini Jet — 12 lugares, excelente estado",
    descriptionLabel: "Descrição *",
    descriptionPlaceholder: "Descreva a atração em detalhe: capacidade, especificações técnicas, histórico, estado, o que está incluído na venda...",
    categoryLabel: "Categoria *", categoryPlaceholder: "Selecionar categoria",
    countryLabel: "País *", countryPlaceholder: "Selecionar país",
    priceLabel: "Preço pedido *", priceLabelShort: "Preço *", pricePlaceholder: "ex. 25000",
    currencyLabel: "Moeda *",
    conditionLabel: "Estado *", conditionPlaceholder: "Selecionar estado",
    manufacturerLabel: "Fabricante", manufacturerPlaceholder: "ex. Zamperla, Huss, Bertazzon",
    yearLabel: "Ano de fabrico", yearPlaceholder: "ex. 2015",
    photosHint: "Carregue até 8 fotos. Imagens de alta qualidade aumentam significativamente o interesse dos compradores.",
    coverBadge: "Capa", addPhoto: "Adicionar",
    clickToUpload: "Clique para carregar fotos", fileTypesHint: "JPG, PNG, WebP — máx. 8 ficheiros",
    submitting: "A enviar anúncio...", submit: "Enviar para revisão", cancel: "Cancelar",
    reviewNote: "O seu anúncio será revisto pela nossa equipa e publicado em 24 horas.",
    errorMaxImages: "Pode carregar até 8 imagens.",
    errorRequiredFields: "Preencha todos os campos obrigatórios.",
    errorGeneric: "Algo correu mal. Tente novamente.",
    errorCreateFailed: "Não foi possível criar o anúncio",
    editTitle: "Editar anúncio", editSubtitle: "As alterações serão novamente revistas antes de ficarem visíveis.",
    backToDashboard: "Voltar ao painel",
    setCoverHint: "Clique numa imagem para a definir como capa.", setCover: "Definir como capa", newBadge: "Novo",
    maxImagesTotal: "Máximo de 8 imagens no total.",
    savedRedirect: "✓ Guardado! A redirecionar para o painel...", saveFailed: "Falha ao guardar. Tente novamente.",
    saving: "A guardar...", saveChanges: "Guardar alterações",
    yourEmail: "O seu email *", emailPlaceholder: "voce@empresa.com",
    emailHint: "Para o avisarmos quando o seu anúncio estiver publicado.",
    noAccountNote: "Não é necessária conta para submeter. O seu anúncio é guardado antes do registo.",
    errorMaxPhotos: "Máximo de 8 fotos.",
  },
}

export const CONDITION_VALUES = ["new", "like_new", "good", "fair", "parts_only"] as const

export const COUNTRY_NAMES: Record<ListingLocale, Record<string, string>> = {
  en: {
    Austria: "Austria", Belgium: "Belgium", Bulgaria: "Bulgaria", Croatia: "Croatia", "Czech Republic": "Czech Republic",
    Denmark: "Denmark", Estonia: "Estonia", Finland: "Finland", France: "France", Germany: "Germany", Greece: "Greece",
    Hungary: "Hungary", Ireland: "Ireland", Italy: "Italy", Latvia: "Latvia", Lithuania: "Lithuania", Luxembourg: "Luxembourg",
    Malta: "Malta", Netherlands: "Netherlands", Poland: "Poland", Portugal: "Portugal", Romania: "Romania", Slovakia: "Slovakia",
    Slovenia: "Slovenia", Spain: "Spain", Sweden: "Sweden", "United Kingdom": "United Kingdom", Switzerland: "Switzerland", Norway: "Norway",
  },
  de: {
    Austria: "Österreich", Belgium: "Belgien", Bulgaria: "Bulgarien", Croatia: "Kroatien", "Czech Republic": "Tschechien",
    Denmark: "Dänemark", Estonia: "Estland", Finland: "Finnland", France: "Frankreich", Germany: "Deutschland", Greece: "Griechenland",
    Hungary: "Ungarn", Ireland: "Irland", Italy: "Italien", Latvia: "Lettland", Lithuania: "Litauen", Luxembourg: "Luxemburg",
    Malta: "Malta", Netherlands: "Niederlande", Poland: "Polen", Portugal: "Portugal", Romania: "Rumänien", Slovakia: "Slowakei",
    Slovenia: "Slowenien", Spain: "Spanien", Sweden: "Schweden", "United Kingdom": "Vereinigtes Königreich", Switzerland: "Schweiz", Norway: "Norwegen",
  },
  it: {
    Austria: "Austria", Belgium: "Belgio", Bulgaria: "Bulgaria", Croatia: "Croazia", "Czech Republic": "Repubblica Ceca",
    Denmark: "Danimarca", Estonia: "Estonia", Finland: "Finlandia", France: "Francia", Germany: "Germania", Greece: "Grecia",
    Hungary: "Ungheria", Ireland: "Irlanda", Italy: "Italia", Latvia: "Lettonia", Lithuania: "Lituania", Luxembourg: "Lussemburgo",
    Malta: "Malta", Netherlands: "Paesi Bassi", Poland: "Polonia", Portugal: "Portogallo", Romania: "Romania", Slovakia: "Slovacchia",
    Slovenia: "Slovenia", Spain: "Spagna", Sweden: "Svezia", "United Kingdom": "Regno Unito", Switzerland: "Svizzera", Norway: "Norvegia",
  },
  fr: {
    Austria: "Autriche", Belgium: "Belgique", Bulgaria: "Bulgarie", Croatia: "Croatie", "Czech Republic": "République tchèque",
    Denmark: "Danemark", Estonia: "Estonie", Finland: "Finlande", France: "France", Germany: "Allemagne", Greece: "Grèce",
    Hungary: "Hongrie", Ireland: "Irlande", Italy: "Italie", Latvia: "Lettonie", Lithuania: "Lituanie", Luxembourg: "Luxembourg",
    Malta: "Malte", Netherlands: "Pays-Bas", Poland: "Pologne", Portugal: "Portugal", Romania: "Roumanie", Slovakia: "Slovaquie",
    Slovenia: "Slovénie", Spain: "Espagne", Sweden: "Suède", "United Kingdom": "Royaume-Uni", Switzerland: "Suisse", Norway: "Norvège",
  },
  es: {
    Austria: "Austria", Belgium: "Bélgica", Bulgaria: "Bulgaria", Croatia: "Croacia", "Czech Republic": "República Checa",
    Denmark: "Dinamarca", Estonia: "Estonia", Finland: "Finlandia", France: "Francia", Germany: "Alemania", Greece: "Grecia",
    Hungary: "Hungría", Ireland: "Irlanda", Italy: "Italia", Latvia: "Letonia", Lithuania: "Lituania", Luxembourg: "Luxemburgo",
    Malta: "Malta", Netherlands: "Países Bajos", Poland: "Polonia", Portugal: "Portugal", Romania: "Rumanía", Slovakia: "Eslovaquia",
    Slovenia: "Eslovenia", Spain: "España", Sweden: "Suecia", "United Kingdom": "Reino Unido", Switzerland: "Suiza", Norway: "Noruega",
  },
  nl: {
    Austria: "Oostenrijk", Belgium: "België", Bulgaria: "Bulgarije", Croatia: "Kroatië", "Czech Republic": "Tsjechië",
    Denmark: "Denemarken", Estonia: "Estland", Finland: "Finland", France: "Frankrijk", Germany: "Duitsland", Greece: "Griekenland",
    Hungary: "Hongarije", Ireland: "Ierland", Italy: "Italië", Latvia: "Letland", Lithuania: "Litouwen", Luxembourg: "Luxemburg",
    Malta: "Malta", Netherlands: "Nederland", Poland: "Polen", Portugal: "Portugal", Romania: "Roemenië", Slovakia: "Slowakije",
    Slovenia: "Slovenië", Spain: "Spanje", Sweden: "Zweden", "United Kingdom": "Verenigd Koninkrijk", Switzerland: "Zwitserland", Norway: "Noorwegen",
  },
  pl: {
    Austria: "Austria", Belgium: "Belgia", Bulgaria: "Bułgaria", Croatia: "Chorwacja", "Czech Republic": "Czechy",
    Denmark: "Dania", Estonia: "Estonia", Finland: "Finlandia", France: "Francja", Germany: "Niemcy", Greece: "Grecja",
    Hungary: "Węgry", Ireland: "Irlandia", Italy: "Włochy", Latvia: "Łotwa", Lithuania: "Litwa", Luxembourg: "Luksemburg",
    Malta: "Malta", Netherlands: "Holandia", Poland: "Polska", Portugal: "Portugalia", Romania: "Rumunia", Slovakia: "Słowacja",
    Slovenia: "Słowenia", Spain: "Hiszpania", Sweden: "Szwecja", "United Kingdom": "Wielka Brytania", Switzerland: "Szwajcaria", Norway: "Norwegia",
  },
  pt: {
    Austria: "Áustria", Belgium: "Bélgica", Bulgaria: "Bulgária", Croatia: "Croácia", "Czech Republic": "República Checa",
    Denmark: "Dinamarca", Estonia: "Estónia", Finland: "Finlândia", France: "França", Germany: "Alemanha", Greece: "Grécia",
    Hungary: "Hungria", Ireland: "Irlanda", Italy: "Itália", Latvia: "Letónia", Lithuania: "Lituânia", Luxembourg: "Luxemburgo",
    Malta: "Malta", Netherlands: "Países Baixos", Poland: "Polónia", Portugal: "Portugal", Romania: "Roménia", Slovakia: "Eslováquia",
    Slovenia: "Eslovénia", Spain: "Espanha", Sweden: "Suécia", "United Kingdom": "Reino Unido", Switzerland: "Suíça", Norway: "Noruega",
  },
}
