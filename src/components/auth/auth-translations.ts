import type { ListingLocale } from "@/lib/locales"

interface AuthStrings {
  welcomeBack: string
  signInSubtitle: string
  almostThere: string
  signInToPublish: string
  continueWithGoogle: string
  continueWithFacebook: string
  agreeIntro: string
  termsOfService: string
  andWord: string
  privacyPolicy: string
  orSignInWithEmail: string
  emailAddress: string
  password: string
  forgotPassword: string
  signingIn: string
  signIn: string
  noAccount: string
  signUpFree: string
  createTitle: string
  createSubtitle: string
  fullName: string
  passwordHint: string
  orSignUpWithEmail: string
  country: string
  selectCountry: string
  preferredLanguage: string
  createAccount: string
  creating: string
  alreadyAccount: string
  termsCheckboxLabel: string
  marketingOptIn: string
  optional: string
  mustAcceptTerms: string
  checkEmail: string
  checkEmailDesc: string
  backToSignIn: string
}

// Same self-contained-dict rationale as everywhere else this session.
// en/de/it values are copied verbatim from messages/*.json's auth.login/
// auth.signup namespaces where they exist; the rest (OAuth disclaimer,
// checkbox label, marketing opt-in — all hardcoded in the original page,
// not actually wired to next-intl) are filled in fresh for all 8.
export const AUTH_T: Record<ListingLocale, AuthStrings> = {
  en: {
    welcomeBack: "Welcome back", signInSubtitle: "Sign in to your account",
    almostThere: "Almost there!", signInToPublish: "Sign in to publish your saved listing",
    continueWithGoogle: "Continue with Google", continueWithFacebook: "Continue with Facebook",
    agreeIntro: "By continuing, you agree to our", termsOfService: "Terms of Service", andWord: "and", privacyPolicy: "Privacy Policy",
    orSignInWithEmail: "or sign in with email", emailAddress: "Email Address", password: "Password",
    forgotPassword: "Forgot password?", signingIn: "Signing in...", signIn: "Sign In",
    noAccount: "Don't have an account?", signUpFree: "Sign up free",
    createTitle: "Create your account", createSubtitle: "Join Europe's amusement ride marketplace",
    fullName: "Full Name", passwordHint: "Min. 8 characters", orSignUpWithEmail: "or sign up with email",
    country: "Country", selectCountry: "Select your country", preferredLanguage: "Preferred Language",
    createAccount: "Create Free Account", creating: "Creating account...", alreadyAccount: "Already have an account?",
    termsCheckboxLabel: "I have read and agree to the",
    marketingOptIn: "I'd like to receive occasional product updates and industry news from RideDirect.",
    optional: "(Optional)", mustAcceptTerms: "You must accept the Terms of Service and Privacy Policy to continue.",
    checkEmail: "Check your email",
    checkEmailDesc: "We've sent a confirmation link to your email address. Click the link to activate your account.",
    backToSignIn: "Back to Sign In",
  },
  de: {
    welcomeBack: "Willkommen zurück", signInSubtitle: "Melden Sie sich bei Ihrem Konto an",
    almostThere: "Fast geschafft!", signInToPublish: "Melden Sie sich an, um Ihr gespeichertes Inserat zu veröffentlichen",
    continueWithGoogle: "Mit Google fortfahren", continueWithFacebook: "Mit Facebook fortfahren",
    agreeIntro: "Mit dem Fortfahren stimmen Sie unseren", termsOfService: "Nutzungsbedingungen", andWord: "und unserer", privacyPolicy: "Datenschutzrichtlinie",
    orSignInWithEmail: "oder per E-Mail anmelden", emailAddress: "E-Mail-Adresse", password: "Passwort",
    forgotPassword: "Passwort vergessen?", signingIn: "Anmelden...", signIn: "Anmelden",
    noAccount: "Noch kein Konto?", signUpFree: "Kostenlos registrieren",
    createTitle: "Konto erstellen", createSubtitle: "Europas Marktplatz für Fahrgeschäfte",
    fullName: "Vollständiger Name", passwordHint: "Min. 8 Zeichen", orSignUpWithEmail: "oder per E-Mail registrieren",
    country: "Land", selectCountry: "Land auswählen", preferredLanguage: "Bevorzugte Sprache",
    createAccount: "Kostenloses Konto erstellen", creating: "Konto wird erstellt...", alreadyAccount: "Bereits ein Konto?",
    termsCheckboxLabel: "Ich habe die",
    marketingOptIn: "Ich möchte gelegentlich Produkt-Updates und Branchennews von RideDirect erhalten.",
    optional: "(Optional)", mustAcceptTerms: "Sie müssen den Nutzungsbedingungen und der Datenschutzrichtlinie zustimmen, um fortzufahren.",
    checkEmail: "E-Mail prüfen",
    checkEmailDesc: "Wir haben einen Bestätigungslink an Ihre E-Mail-Adresse gesendet. Klicken Sie auf den Link, um Ihr Konto zu aktivieren.",
    backToSignIn: "Zurück zur Anmeldung",
  },
  it: {
    welcomeBack: "Bentornato", signInSubtitle: "Accedi al tuo account",
    almostThere: "Ci siamo quasi!", signInToPublish: "Accedi per pubblicare il tuo annuncio salvato",
    continueWithGoogle: "Continua con Google", continueWithFacebook: "Continua con Facebook",
    agreeIntro: "Continuando, accetti i nostri", termsOfService: "Termini di Servizio", andWord: "e la", privacyPolicy: "Privacy Policy",
    orSignInWithEmail: "o accedi con email", emailAddress: "Indirizzo email", password: "Password",
    forgotPassword: "Password dimenticata?", signingIn: "Accesso in corso...", signIn: "Accedi",
    noAccount: "Non hai un account?", signUpFree: "Registrati gratis",
    createTitle: "Crea il tuo account", createSubtitle: "Il marketplace europeo per le attrazioni",
    fullName: "Nome completo", passwordHint: "Min. 8 caratteri", orSignUpWithEmail: "o registrati con email",
    country: "Paese", selectCountry: "Seleziona il tuo paese", preferredLanguage: "Lingua preferita",
    createAccount: "Crea account gratuito", creating: "Creazione account...", alreadyAccount: "Hai già un account?",
    termsCheckboxLabel: "Ho letto e accetto i",
    marketingOptIn: "Vorrei ricevere occasionali aggiornamenti sui prodotti e novità del settore da RideDirect.",
    optional: "(Facoltativo)", mustAcceptTerms: "Devi accettare i Termini di Servizio e la Privacy Policy per continuare.",
    checkEmail: "Controlla la tua email",
    checkEmailDesc: "Abbiamo inviato un link di conferma al tuo indirizzo email. Clicca il link per attivare il tuo account.",
    backToSignIn: "Torna all'accesso",
  },
  fr: {
    welcomeBack: "Bon retour", signInSubtitle: "Connectez-vous à votre compte",
    almostThere: "Presque terminé !", signInToPublish: "Connectez-vous pour publier votre annonce enregistrée",
    continueWithGoogle: "Continuer avec Google", continueWithFacebook: "Continuer avec Facebook",
    agreeIntro: "En continuant, vous acceptez nos", termsOfService: "Conditions d'utilisation", andWord: "et notre", privacyPolicy: "Politique de confidentialité",
    orSignInWithEmail: "ou connectez-vous par email", emailAddress: "Adresse email", password: "Mot de passe",
    forgotPassword: "Mot de passe oublié ?", signingIn: "Connexion...", signIn: "Se connecter",
    noAccount: "Vous n'avez pas de compte ?", signUpFree: "Inscription gratuite",
    createTitle: "Créez votre compte", createSubtitle: "Rejoignez le marketplace européen des attractions",
    fullName: "Nom complet", passwordHint: "Min. 8 caractères", orSignUpWithEmail: "ou inscrivez-vous par email",
    country: "Pays", selectCountry: "Sélectionnez votre pays", preferredLanguage: "Langue préférée",
    createAccount: "Créer un compte gratuit", creating: "Création du compte...", alreadyAccount: "Vous avez déjà un compte ?",
    termsCheckboxLabel: "J'ai lu et j'accepte les",
    marketingOptIn: "Je souhaite recevoir occasionnellement des actualités et mises à jour de RideDirect.",
    optional: "(Facultatif)", mustAcceptTerms: "Vous devez accepter les Conditions d'utilisation et la Politique de confidentialité pour continuer.",
    checkEmail: "Vérifiez votre email",
    checkEmailDesc: "Nous avons envoyé un lien de confirmation à votre adresse email. Cliquez sur le lien pour activer votre compte.",
    backToSignIn: "Retour à la connexion",
  },
  es: {
    welcomeBack: "Bienvenido de nuevo", signInSubtitle: "Inicia sesión en tu cuenta",
    almostThere: "¡Casi listo!", signInToPublish: "Inicia sesión para publicar tu anuncio guardado",
    continueWithGoogle: "Continuar con Google", continueWithFacebook: "Continuar con Facebook",
    agreeIntro: "Al continuar, aceptas nuestros", termsOfService: "Términos de Servicio", andWord: "y", privacyPolicy: "Política de Privacidad",
    orSignInWithEmail: "o inicia sesión con email", emailAddress: "Correo electrónico", password: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?", signingIn: "Iniciando sesión...", signIn: "Iniciar sesión",
    noAccount: "¿No tienes una cuenta?", signUpFree: "Regístrate gratis",
    createTitle: "Crea tu cuenta", createSubtitle: "Únete al marketplace europeo de atracciones",
    fullName: "Nombre completo", passwordHint: "Mín. 8 caracteres", orSignUpWithEmail: "o regístrate con email",
    country: "País", selectCountry: "Selecciona tu país", preferredLanguage: "Idioma preferido",
    createAccount: "Crear cuenta gratuita", creating: "Creando cuenta...", alreadyAccount: "¿Ya tienes una cuenta?",
    termsCheckboxLabel: "He leído y acepto los",
    marketingOptIn: "Me gustaría recibir novedades y actualizaciones ocasionales de RideDirect.",
    optional: "(Opcional)", mustAcceptTerms: "Debes aceptar los Términos de Servicio y la Política de Privacidad para continuar.",
    checkEmail: "Revisa tu correo",
    checkEmailDesc: "Hemos enviado un enlace de confirmación a tu correo electrónico. Haz clic en el enlace para activar tu cuenta.",
    backToSignIn: "Volver a iniciar sesión",
  },
  nl: {
    welcomeBack: "Welkom terug", signInSubtitle: "Log in op uw account",
    almostThere: "Bijna klaar!", signInToPublish: "Log in om uw opgeslagen advertentie te publiceren",
    continueWithGoogle: "Doorgaan met Google", continueWithFacebook: "Doorgaan met Facebook",
    agreeIntro: "Door door te gaan, gaat u akkoord met onze", termsOfService: "Gebruiksvoorwaarden", andWord: "en het", privacyPolicy: "Privacybeleid",
    orSignInWithEmail: "of log in met e-mail", emailAddress: "E-mailadres", password: "Wachtwoord",
    forgotPassword: "Wachtwoord vergeten?", signingIn: "Inloggen...", signIn: "Inloggen",
    noAccount: "Nog geen account?", signUpFree: "Gratis registreren",
    createTitle: "Maak uw account aan", createSubtitle: "Word lid van de Europese marktplaats voor attracties",
    fullName: "Volledige naam", passwordHint: "Min. 8 tekens", orSignUpWithEmail: "of registreer met e-mail",
    country: "Land", selectCountry: "Selecteer uw land", preferredLanguage: "Voorkeurstaal",
    createAccount: "Gratis account aanmaken", creating: "Account wordt aangemaakt...", alreadyAccount: "Heeft u al een account?",
    termsCheckboxLabel: "Ik ga akkoord met de",
    marketingOptIn: "Ik ontvang graag af en toe productupdates en branchenieuws van RideDirect.",
    optional: "(Optioneel)", mustAcceptTerms: "U moet akkoord gaan met de Gebruiksvoorwaarden en het Privacybeleid om door te gaan.",
    checkEmail: "Controleer uw e-mail",
    checkEmailDesc: "We hebben een bevestigingslink naar uw e-mailadres gestuurd. Klik op de link om uw account te activeren.",
    backToSignIn: "Terug naar inloggen",
  },
  pl: {
    welcomeBack: "Witaj ponownie", signInSubtitle: "Zaloguj się do swojego konta",
    almostThere: "Już prawie!", signInToPublish: "Zaloguj się, aby opublikować zapisane ogłoszenie",
    continueWithGoogle: "Kontynuuj z Google", continueWithFacebook: "Kontynuuj z Facebook",
    agreeIntro: "Kontynuując, akceptujesz nasze", termsOfService: "Warunki korzystania z usługi", andWord: "i", privacyPolicy: "Politykę prywatności",
    orSignInWithEmail: "lub zaloguj się przez e-mail", emailAddress: "Adres e-mail", password: "Hasło",
    forgotPassword: "Nie pamiętasz hasła?", signingIn: "Logowanie...", signIn: "Zaloguj się",
    noAccount: "Nie masz konta?", signUpFree: "Zarejestruj się bezpłatnie",
    createTitle: "Utwórz swoje konto", createSubtitle: "Dołącz do europejskiego rynku atrakcji",
    fullName: "Imię i nazwisko", passwordHint: "Min. 8 znaków", orSignUpWithEmail: "lub zarejestruj się przez e-mail",
    country: "Kraj", selectCountry: "Wybierz swój kraj", preferredLanguage: "Preferowany język",
    createAccount: "Utwórz bezpłatne konto", creating: "Tworzenie konta...", alreadyAccount: "Masz już konto?",
    termsCheckboxLabel: "Przeczytałem/am i akceptuję",
    marketingOptIn: "Chciałbym/Chciałabym otrzymywać od czasu do czasu aktualizacje produktowe i nowości branżowe od RideDirect.",
    optional: "(Opcjonalnie)", mustAcceptTerms: "Aby kontynuować, musisz zaakceptować Warunki korzystania z usługi i Politykę prywatności.",
    checkEmail: "Sprawdź swoją skrzynkę e-mail",
    checkEmailDesc: "Wysłaliśmy link potwierdzający na Twój adres e-mail. Kliknij link, aby aktywować swoje konto.",
    backToSignIn: "Powrót do logowania",
  },
  pt: {
    welcomeBack: "Bem-vindo de volta", signInSubtitle: "Inicie sessão na sua conta",
    almostThere: "Quase lá!", signInToPublish: "Inicie sessão para publicar o seu anúncio guardado",
    continueWithGoogle: "Continuar com Google", continueWithFacebook: "Continuar com Facebook",
    agreeIntro: "Ao continuar, aceita os nossos", termsOfService: "Termos de Serviço", andWord: "e a", privacyPolicy: "Política de Privacidade",
    orSignInWithEmail: "ou inicie sessão com email", emailAddress: "Endereço de email", password: "Palavra-passe",
    forgotPassword: "Esqueceu a palavra-passe?", signingIn: "A iniciar sessão...", signIn: "Iniciar sessão",
    noAccount: "Não tem conta?", signUpFree: "Registo gratuito",
    createTitle: "Crie a sua conta", createSubtitle: "Junte-se ao marketplace europeu de atrações",
    fullName: "Nome completo", passwordHint: "Mín. 8 caracteres", orSignUpWithEmail: "ou registe-se com email",
    country: "País", selectCountry: "Selecione o seu país", preferredLanguage: "Idioma preferido",
    createAccount: "Criar conta gratuita", creating: "A criar conta...", alreadyAccount: "Já tem uma conta?",
    termsCheckboxLabel: "Li e aceito os",
    marketingOptIn: "Gostaria de receber ocasionalmente atualizações de produtos e novidades do setor da RideDirect.",
    optional: "(Opcional)", mustAcceptTerms: "Tem de aceitar os Termos de Serviço e a Política de Privacidade para continuar.",
    checkEmail: "Verifique o seu email",
    checkEmailDesc: "Enviámos um link de confirmação para o seu endereço de email. Clique no link para ativar a sua conta.",
    backToSignIn: "Voltar ao início de sessão",
  },
}
