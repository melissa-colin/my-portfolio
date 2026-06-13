// Date de naissance de Mélissa — source unique de vérité pour l'âge sur tout le site.
export const BIRTH_DATE = '2003-07-08';

/**
 * Calcule l'âge en années révolues à partir d'une date de naissance.
 * Se met à jour automatiquement : aucune valeur d'âge à maintenir à la main.
 * @param {string|Date} birthDate - Date ISO ou objet Date (défaut : BIRTH_DATE)
 * @returns {number} Âge en années
 */
export const getAge = (birthDate = BIRTH_DATE) => {
  const dob = new Date(birthDate);
  const now = new Date();

  let age = now.getFullYear() - dob.getFullYear();

  // Retire une année si l'anniversaire n'est pas encore passé cette année.
  const hasHadBirthdayThisYear =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
};

export default getAge;
