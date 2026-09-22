import { Installation } from "./installation.js";
function main() {
    const installation = new Installation();
    installation.deposer(1, 100);
    installation.deposer(2, 200);
    installation.partir(100, 3);
    installation.arriver(100);
    const doublon = installation.arriver(100);
    console.log(`deuxieme arrivee traitee: ${doublon}`);
    installation.partir(200, 3);
    try {
        installation.arriver(200);
    }
    catch (erreur) {
        if (erreur instanceof Error) {
            console.log(`transfert refuse: ${erreur.message}`);
        }
    }
    console.log(installation.compter());
    console.table(installation.etat());
}
main();
//# sourceMappingURL=index.js.map