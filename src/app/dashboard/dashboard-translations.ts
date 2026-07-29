import type { ListingLocale } from "@/lib/locales"

interface ProfileStrings {
  backToDashboard: string
  editProfileTitle: string
  avatarHint: string
  failedToSave: string
  changesSavedSuccess: string
  emailLabel: string
  emailCannotChange: string
  fullNamePlaceholder: string
  saving: string
  saveChanges: string
  privacyRightsTitle: string
  privacyRightsDesc: string
  requestMyData: string
  deleteMyAccount: string
}

interface MessagesListStrings {
  title: string
  unreadLabel: string
  noMessagesYet: string
  browseListings: string
  sellerFallback: string
}

interface MessageDetailStrings {
  writeMessage: string
  attachTitle: string
  openPdf: string
  translating: string
  translateTo: string
  showOriginal: string
}

export const PROFILE_T: Record<ListingLocale, ProfileStrings> = {
  en: { backToDashboard: "Back to Dashboard", editProfileTitle: "Edit Profile", avatarHint: "Click the avatar to change your photo", failedToSave: "Failed to save changes. Please try again.", changesSavedSuccess: "✓ Changes saved successfully", emailLabel: "Email", emailCannotChange: "Email cannot be changed here. Contact support if needed.", fullNamePlaceholder: "Your full name", saving: "Saving...", saveChanges: "Save Changes", privacyRightsTitle: "Your Privacy Rights", privacyRightsDesc: "Under GDPR you have the right to access, export, or delete your personal data at any time.", requestMyData: "Request My Data", deleteMyAccount: "Delete My Account" },
  de: { backToDashboard: "Zurück zum Dashboard", editProfileTitle: "Profil bearbeiten", avatarHint: "Klicken Sie auf den Avatar, um Ihr Foto zu ändern", failedToSave: "Änderungen konnten nicht gespeichert werden. Bitte versuchen Sie es erneut.", changesSavedSuccess: "✓ Änderungen erfolgreich gespeichert", emailLabel: "E-Mail", emailCannotChange: "Die E-Mail kann hier nicht geändert werden. Kontaktieren Sie bei Bedarf den Support.", fullNamePlaceholder: "Ihr vollständiger Name", saving: "Speichern...", saveChanges: "Änderungen speichern", privacyRightsTitle: "Ihre Datenschutzrechte", privacyRightsDesc: "Gemäß DSGVO haben Sie jederzeit das Recht, auf Ihre personenbezogenen Daten zuzugreifen, sie zu exportieren oder zu löschen.", requestMyData: "Meine Daten anfordern", deleteMyAccount: "Mein Konto löschen" },
  it: { backToDashboard: "Torna alla dashboard", editProfileTitle: "Modifica profilo", avatarHint: "Clicca sull'avatar per cambiare la tua foto", failedToSave: "Impossibile salvare le modifiche. Riprova.", changesSavedSuccess: "✓ Modifiche salvate con successo", emailLabel: "Email", emailCannotChange: "L'email non può essere modificata qui. Contatta l'assistenza se necessario.", fullNamePlaceholder: "Il tuo nome completo", saving: "Salvataggio...", saveChanges: "Salva modifiche", privacyRightsTitle: "I tuoi diritti sulla privacy", privacyRightsDesc: "Ai sensi del GDPR hai il diritto di accedere, esportare o eliminare i tuoi dati personali in qualsiasi momento.", requestMyData: "Richiedi i miei dati", deleteMyAccount: "Elimina il mio account" },
  fr: { backToDashboard: "Retour au tableau de bord", editProfileTitle: "Modifier le profil", avatarHint: "Cliquez sur l'avatar pour changer votre photo", failedToSave: "Échec de l'enregistrement. Veuillez réessayer.", changesSavedSuccess: "✓ Modifications enregistrées avec succès", emailLabel: "Email", emailCannotChange: "L'email ne peut pas être modifié ici. Contactez le support si nécessaire.", fullNamePlaceholder: "Votre nom complet", saving: "Enregistrement...", saveChanges: "Enregistrer les modifications", privacyRightsTitle: "Vos droits de confidentialité", privacyRightsDesc: "En vertu du RGPD, vous avez le droit d'accéder à vos données personnelles, de les exporter ou de les supprimer à tout moment.", requestMyData: "Demander mes données", deleteMyAccount: "Supprimer mon compte" },
  es: { backToDashboard: "Volver al panel", editProfileTitle: "Editar perfil", avatarHint: "Haz clic en el avatar para cambiar tu foto", failedToSave: "Error al guardar los cambios. Inténtalo de nuevo.", changesSavedSuccess: "✓ Cambios guardados correctamente", emailLabel: "Correo electrónico", emailCannotChange: "El correo electrónico no se puede cambiar aquí. Contacta con soporte si lo necesitas.", fullNamePlaceholder: "Tu nombre completo", saving: "Guardando...", saveChanges: "Guardar cambios", privacyRightsTitle: "Tus derechos de privacidad", privacyRightsDesc: "Según el RGPD, tienes derecho a acceder, exportar o eliminar tus datos personales en cualquier momento.", requestMyData: "Solicitar mis datos", deleteMyAccount: "Eliminar mi cuenta" },
  nl: { backToDashboard: "Terug naar dashboard", editProfileTitle: "Profiel bewerken", avatarHint: "Klik op de avatar om uw foto te wijzigen", failedToSave: "Wijzigingen opslaan mislukt. Probeer het opnieuw.", changesSavedSuccess: "✓ Wijzigingen succesvol opgeslagen", emailLabel: "E-mail", emailCannotChange: "E-mail kan hier niet worden gewijzigd. Neem contact op met support indien nodig.", fullNamePlaceholder: "Uw volledige naam", saving: "Opslaan...", saveChanges: "Wijzigingen opslaan", privacyRightsTitle: "Uw privacyrechten", privacyRightsDesc: "Onder de AVG heeft u het recht om op elk moment toegang te krijgen tot uw persoonsgegevens, deze te exporteren of te verwijderen.", requestMyData: "Mijn gegevens opvragen", deleteMyAccount: "Mijn account verwijderen" },
  pl: { backToDashboard: "Powrót do panelu", editProfileTitle: "Edytuj profil", avatarHint: "Kliknij awatar, aby zmienić zdjęcie", failedToSave: "Nie udało się zapisać zmian. Spróbuj ponownie.", changesSavedSuccess: "✓ Zmiany zapisane pomyślnie", emailLabel: "E-mail", emailCannotChange: "E-maila nie można tutaj zmienić. Skontaktuj się z pomocą techniczną, jeśli to konieczne.", fullNamePlaceholder: "Twoje imię i nazwisko", saving: "Zapisywanie...", saveChanges: "Zapisz zmiany", privacyRightsTitle: "Twoje prawa dotyczące prywatności", privacyRightsDesc: "Zgodnie z RODO masz prawo w dowolnym momencie uzyskać dostęp do swoich danych osobowych, wyeksportować je lub usunąć.", requestMyData: "Poproś o moje dane", deleteMyAccount: "Usuń moje konto" },
  pt: { backToDashboard: "Voltar ao painel", editProfileTitle: "Editar perfil", avatarHint: "Clique no avatar para alterar a sua foto", failedToSave: "Falha ao guardar as alterações. Tente novamente.", changesSavedSuccess: "✓ Alterações guardadas com sucesso", emailLabel: "Email", emailCannotChange: "O email não pode ser alterado aqui. Contacte o suporte se necessário.", fullNamePlaceholder: "O seu nome completo", saving: "A guardar...", saveChanges: "Guardar alterações", privacyRightsTitle: "Os seus direitos de privacidade", privacyRightsDesc: "Ao abrigo do RGPD, tem o direito de aceder, exportar ou eliminar os seus dados pessoais a qualquer momento.", requestMyData: "Solicitar os meus dados", deleteMyAccount: "Eliminar a minha conta" },
}

export const MESSAGES_LIST_T: Record<ListingLocale, MessagesListStrings> = {
  en: { title: "Messages", unreadLabel: "unread", noMessagesYet: "No messages yet.", browseListings: "Browse listings", sellerFallback: "Seller" },
  de: { title: "Nachrichten", unreadLabel: "ungelesen", noMessagesYet: "Noch keine Nachrichten.", browseListings: "Inserate durchsuchen", sellerFallback: "Verkäufer" },
  it: { title: "Messaggi", unreadLabel: "non letti", noMessagesYet: "Ancora nessun messaggio.", browseListings: "Sfoglia gli annunci", sellerFallback: "Venditore" },
  fr: { title: "Messages", unreadLabel: "non lu(s)", noMessagesYet: "Aucun message pour le moment.", browseListings: "Parcourir les annonces", sellerFallback: "Vendeur" },
  es: { title: "Mensajes", unreadLabel: "sin leer", noMessagesYet: "Aún no hay mensajes.", browseListings: "Ver anuncios", sellerFallback: "Vendedor" },
  nl: { title: "Berichten", unreadLabel: "ongelezen", noMessagesYet: "Nog geen berichten.", browseListings: "Advertenties bekijken", sellerFallback: "Verkoper" },
  pl: { title: "Wiadomości", unreadLabel: "nieprzeczytane", noMessagesYet: "Brak wiadomości.", browseListings: "Przeglądaj ogłoszenia", sellerFallback: "Sprzedawca" },
  pt: { title: "Mensagens", unreadLabel: "não lida(s)", noMessagesYet: "Ainda não há mensagens.", browseListings: "Ver anúncios", sellerFallback: "Vendedor" },
}

export const MESSAGE_DETAIL_T: Record<ListingLocale, MessageDetailStrings> = {
  en: { writeMessage: "Write a message...", attachTitle: "Attach image or PDF", openPdf: "Open PDF", translating: "Translating...", translateTo: "Translate to", showOriginal: "Show original" },
  de: { writeMessage: "Nachricht schreiben...", attachTitle: "Bild oder PDF anhängen", openPdf: "PDF öffnen", translating: "Übersetzen...", translateTo: "Übersetzen nach", showOriginal: "Original anzeigen" },
  it: { writeMessage: "Scrivi un messaggio...", attachTitle: "Allega immagine o PDF", openPdf: "Apri PDF", translating: "Traduzione in corso...", translateTo: "Traduci in", showOriginal: "Mostra originale" },
  fr: { writeMessage: "Écrivez un message...", attachTitle: "Joindre une image ou un PDF", openPdf: "Ouvrir le PDF", translating: "Traduction...", translateTo: "Traduire en", showOriginal: "Afficher l'original" },
  es: { writeMessage: "Escribe un mensaje...", attachTitle: "Adjuntar imagen o PDF", openPdf: "Abrir PDF", translating: "Traduciendo...", translateTo: "Traducir a", showOriginal: "Mostrar original" },
  nl: { writeMessage: "Schrijf een bericht...", attachTitle: "Afbeelding of PDF bijvoegen", openPdf: "PDF openen", translating: "Vertalen...", translateTo: "Vertalen naar", showOriginal: "Origineel weergeven" },
  pl: { writeMessage: "Napisz wiadomość...", attachTitle: "Załącz zdjęcie lub PDF", openPdf: "Otwórz PDF", translating: "Tłumaczenie...", translateTo: "Przetłumacz na", showOriginal: "Pokaż oryginał" },
  pt: { writeMessage: "Escreva uma mensagem...", attachTitle: "Anexar imagem ou PDF", openPdf: "Abrir PDF", translating: "A traduzir...", translateTo: "Traduzir para", showOriginal: "Mostrar original" },
}
