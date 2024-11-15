export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// J'ai ajouté +1 à la valeur de getMonth(), car getMonth() renvoie un index de 0 à 11 (0 pour janvier, 11 pour décembre).
// En ajoutant +1, j'aligne cet index sur les clés de l'objet MONTHS, qui vont de 1 à 12.
export const getMonth = (date) => MONTHS[date.getMonth() + 1];
