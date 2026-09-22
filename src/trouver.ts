export function trouver<T extends { id: number }>(liste: T[], id: number): T | undefined {// extends c est pour dire que T doit etre un type qui a un id de type number, on ne peut pas passer n'importe quel type, il faut que ce soit un type qui a un id de type number
  return liste.find((element) => element.id === id);//on retourne l'element de la liste qui a le meme id que celui passé en parametre

}
