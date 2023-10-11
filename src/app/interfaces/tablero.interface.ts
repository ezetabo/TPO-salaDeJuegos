// Generated by https://quicktype.io

export interface Tablero {
  newboard: Newboard;
}

export interface Newboard {
  grids:   Grid[];
  results: number;
  message: string;
}

export interface Grid {
  value:      Array<number[]>;
  solution?:   Array<number[]>;
  difficulty?: string;
}