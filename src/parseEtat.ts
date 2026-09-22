import type { Etat } from "./types.js";

export function parseEtat(valeur: unknown): Etat {
  if (valeur === "posee" || valeur === "en_transit" || valeur === "retiree") {
    return valeur;
  }
  throw new Error(`etat invalide: ${String(valeur)}`);
}
