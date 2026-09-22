import type { Etat, Machine } from "./types.js";
export declare class Installation {
    #private;
    constructor();
    deposer(machineId: number, chargeId: number): void;
    partir(chargeId: number, destinationId: number): void;
    arriver(chargeId: number): boolean;
    retirer(chargeId: number): void;
    etat(): ReadonlyArray<Readonly<Machine>>;
    compter(): Record<Etat, number>;
}
//# sourceMappingURL=installation.d.ts.map