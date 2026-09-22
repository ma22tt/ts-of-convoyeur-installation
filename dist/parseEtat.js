export function parseEtat(valeur) {
    if (valeur === "posee" || valeur === "en_transit" || valeur === "retiree") {
        return valeur;
    }
    throw new Error(`etat invalide: ${String(valeur)}`);
}
//# sourceMappingURL=parseEtat.js.map