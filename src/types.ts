export type Etat = "posee" | "en_transit" | "retiree";

export interface Charge {
  id: number;
  etat: Etat;
  machine: number;
  destination?: number;//? rend optionel le type
}

export interface Machine {
  id: number;
  nom: string;
  charge?: Charge;
}
