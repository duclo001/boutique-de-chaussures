"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

// Définit la structure des données du formulaire.
type ContactFormData = {
  nom: string;
  courriel: string;
  message: string;
};

// Identifiants EmailJS lus depuis les variables d'environnement (.env.local).
// Voir dashboard.emailjs.com. Les valeurs NEXT_PUBLIC_ sont disponibles côté client.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_CONTACT = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT ?? "";
const TEMPLATE_AUTOREPLY = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_AUTOREPLY ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

// État de l'envoi utilisé pour afficher le message de retour à l'utilisateur.
type StatutEnvoi = "succes" | "erreur" | null;

export default function ContactForm() {
  const { t } = useTranslation(["contact", "common"]);
  // Initialise React Hook Form et récupère les outils nécessaires.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  // Message affiché après la tentative d'envoi (succès ou erreur).
  const [statut, setStatut] = useState<StatutEnvoi>(null);

  // Fonction exécutée lorsque le formulaire est valide.
  async function onSubmit(data: ContactFormData) {
    setStatut(null);

    // Les variables ci-dessous doivent correspondre aux {{champs}} des templates EmailJS.
    const parametres = {
      nom: data.nom,
      courriel: data.courriel,
      message: data.message,
    };

    try {
      // 1) Courriel envoyé à la boutique (contient le message du client).
      await emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, parametres, {
        publicKey: PUBLIC_KEY,
      });

      // 2) Courriel de confirmation automatique envoyé au client.
      await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, parametres, {
        publicKey: PUBLIC_KEY,
      });

      setStatut("succes");
      reset(); // vide les champs après un envoi réussi
    } catch (error) {
      console.error("Échec de l'envoi EmailJS :", error);
      setStatut("erreur");
    }
  }

  return (
    <form
      // Valide le formulaire avant d'appeler onSubmit.
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-[var(--color-text)]">{t("contact:form.title")}</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium">
            {t("contact:form.name.label")}
          </label>

          <input
            id="nom"
            type="text"
            placeholder={t("contact:form.name.placeholder")}
            // Enregistre le champ nom et applique ses règles de validation.
            {...register("nom", {
              required: t("contact:form.validation.nameRequired"),
              minLength: {
                value: 2,
                message: t("contact:form.validation.nameMinLength"),
              },
            })}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 outline-none focus:border-[var(--color-accent)]"
          />

          {/* Affiche l'erreur du nom si la validation échoue. */}
          {errors.nom && (
            <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="courriel" className="block text-sm font-medium">
            {t("contact:form.email.label")}
          </label>

          <input
            id="courriel"
            type="email"
            placeholder={t("contact:form.email.placeholder")}
            // Enregistre le courriel et vérifie son format.
            {...register("courriel", {
              required: t("contact:form.validation.emailRequired"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("contact:form.validation.emailInvalid"),
              },
            })}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 outline-none focus:border-[var(--color-accent)]"
          />

          {/* Affiche l'erreur du courriel si la validation échoue. */}
          {errors.courriel && (
            <p className="mt-1 text-sm text-red-600">
              {errors.courriel.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            {t("contact:form.message.label")}
          </label>

          <textarea
            id="message"
            rows={5}
            placeholder={t("contact:form.message.placeholder")}
            // Enregistre le message et impose un minimum de caractères.
            {...register("message", {
              required: t("contact:form.validation.messageRequired"),
              minLength: {
                value: 10,
                message: t("contact:form.validation.messageMinLength"),
              },
            })}
            className="mt-2 w-full resize-none rounded-xl border border-[var(--color-border)] px-4 py-3 outline-none focus:border-[var(--color-accent)]"
          />

          {/* Affiche l'erreur du message si la validation échoue. */}
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          // Désactive le bouton pendant l'envoi du formulaire.
          disabled={isSubmitting}
          className="w-full rounded-full bg-[var(--color-accent)] px-6 py-3 font-semibold text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? t("common:actions.sending")
            : t("common:actions.send")}
        </button>

        {/* Message de confirmation affiché après un envoi réussi. */}
        {statut === "succes" && (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-500/15 dark:text-green-300">
            {t("contact:form.status.success")}
          </p>
        )}

        {/* Message d'erreur affiché si l'envoi échoue. */}
        {statut === "erreur" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-500/15 dark:text-red-300">
            {t("contact:form.status.error")}
          </p>
        )}
      </div>
    </form>
  );
}
