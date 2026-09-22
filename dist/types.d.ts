export type Etat = "posee" | "en_transit" | "retiree";
export interface Charge {
    id: number;
    etat: Etat;
    machine: number;
    destination?: number;
}
export interface Machine {
    id: number;
    nom: string;
    charge?: Charge;
}
//# sourceMappingURL=types.d.ts.map