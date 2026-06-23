"use client";

import { useForm } from "react-hook-form";

// Définit la structure des données du formulaire.
type ContactFormData = {
  nom: string;
  courriel: string;
  motDePasse: string;
  confirmerMotDePasse: string;
  message: string;
};

export default function ContactForm() {
  // Initialise React Hook Form et récupère les outils nécessaires.
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  // Observe le mot de passe pour le comparer avec sa confirmation.
  const motDePasse = watch("motDePasse");

  // Fonction exécutée lorsque le formulaire est valide.
  function onSubmit(data: ContactFormData) {
    console.log("Données du formulaire :", data);
    reset();
  }

  return (
    <form
      // Valide le formulaire avant d'appeler onSubmit.
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-[var(--color-text)]">Contact</h2>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium">
            Nom
          </label>

          <input
            id="nom"
            type="text"
            placeholder="Votre nom"
            // Enregistre le champ nom et applique ses règles de validation.
            {...register("nom", {
              required: "Le nom est obligatoire.",
              minLength: {
                value: 2,
                message: "Le nom doit contenir au moins 2 caractères.",
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
            Courriel
          </label>

          <input
            id="courriel"
            type="email"
            placeholder="vous@exemple.com"
            // Enregistre le courriel et vérifie son format.
            {...register("courriel", {
              required: "Le courriel est obligatoire.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Entrez un courriel valide.",
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
          <label htmlFor="motDePasse" className="block text-sm font-medium">
            Mot de passe
          </label>

          <input
            id="motDePasse"
            type="password"
            placeholder="Créez un mot de passe"
            // Enregistre le mot de passe et impose une longueur minimale.
            {...register("motDePasse", {
              required: "Le mot de passe est obligatoire.",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères.",
              },
            })}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 outline-none focus:border-[var(--color-accent)]"
          />

          {/* Affiche l'erreur du mot de passe si la validation échoue. */}
          {errors.motDePasse && (
            <p className="mt-1 text-sm text-red-600">
              {errors.motDePasse.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmerMotDePasse"
            className="block text-sm font-medium"
          >
            Confirmer le mot de passe
          </label>

          <input
            id="confirmerMotDePasse"
            type="password"
            placeholder="Confirmez votre mot de passe"
            // Vérifie que la confirmation correspond au mot de passe.
            {...register("confirmerMotDePasse", {
              required: "La confirmation est obligatoire.",
              validate: (value) =>
                value === motDePasse ||
                "Les mots de passe ne correspondent pas.",
            })}
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] px-4 py-3 outline-none focus:border-[var(--color-accent)]"
          />

          {/* Affiche l'erreur de confirmation si la validation échoue. */}
          {errors.confirmerMotDePasse && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmerMotDePasse.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>

          <textarea
            id="message"
            rows={5}
            placeholder="Votre message"
            // Enregistre le message et impose un minimum de caractères.
            {...register("message", {
              required: "Le message est obligatoire.",
              minLength: {
                value: 10,
                message: "Le message doit contenir au moins 10 caractères.",
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
          className="w-full rounded-full bg-[var(--color-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}