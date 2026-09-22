import { trouver } from "./trouver.js";
export class Installation {
    #machines = [];
    #charges = [];
    constructor() {
        for (let i = 1; i <= 5; i++) {
            this.#machines.push({ id: i, nom: `M${i}` });
        }
    }
    #machine(id) {
        return trouver(this.#machines, id);
    }
    #charge(id) {
        return trouver(this.#charges, id);
    }
    deposer(machineId, chargeId) {
        const machine = this.#machine(machineId);
        if (!machine) {
            throw new Error(`machine inconnue: ${machineId}`);
        }
        if (machine.charge) {
            throw new Error(`machine occupee: ${machineId}`);
        }
        if (this.#charge(chargeId)) {
            throw new Error(`charge deja existante: ${chargeId}`);
        }
        const charge = { id: chargeId, etat: "posee", machine: machineId };
        this.#charges.push(charge);
        machine.charge = charge;
    }
    partir(chargeId, destinationId) {
        const charge = this.#charge(chargeId);
        if (!charge) {
            throw new Error(`charge inconnue: ${chargeId}`);
        }
        if (charge.etat === "posee") {
            throw new Error(`transition impossible: charge ${chargeId} n'est pas posee`);
        }
        if (!this.#machine(destinationId)) {
            throw new Error(`machine inconnue: ${destinationId}`);
        }
        const origine = this.#machine(charge.machine);
        if (origine) {
            delete origine.charge;
        }
        charge.etat = "en_transit";
        charge.destination = destinationId;
    }
    arriver(chargeId) {
        const charge = this.#charge(chargeId);
        if (!charge) {
            throw new Error(`charge inconnue: ${chargeId}`);
        }
        if (charge.etat === "posee") {
            return false;
        }
        if (charge.etat !== "en_transit" || charge.destination === undefined) {
            throw new Error(`transition impossible: charge ${chargeId} n'est pas en transit`);
        }
        const machine = this.#machine(charge.destination);
        if (!machine) {
            throw new Error(`machine inconnue: ${charge.destination}`);
        }
        if (machine.charge) {
            throw new Error(`machine occupee: ${charge.destination}`);
        }
        machine.charge = charge;
        charge.etat = "posee";
        charge.machine = charge.destination;
        delete charge.destination;
        return true;
    }
    retirer(chargeId) {
        const charge = this.#charge(chargeId);
        if (!charge) {
            throw new Error(`charge inconnue: ${chargeId}`);
        }
        if (charge.etat !== "posee") {
            throw new Error(`transition impossible: charge ${chargeId} n'est pas posee`);
        }
        const machine = this.#machine(charge.machine);
        if (machine) {
            delete machine.charge;
        }
        charge.etat = "retiree";
    }
    etat() {
        return this.#machines;
    }
    compter() {
        const total = { posee: 0, en_transit: 0, retiree: 0 };
        for (const charge of this.#charges) {
            total[charge.etat] += 1;
        }
        return total;
    }
}
//# sourceMappingURL=installation.js.map