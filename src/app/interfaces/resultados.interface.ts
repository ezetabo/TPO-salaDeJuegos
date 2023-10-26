

export interface Resultados {
  id:string;
  usuario: string;
  ahorcado: Jugar
  mayorMenor: Jugar
  sodoku: Jugar
  preguntados: Preguntados;

}

export interface Jugar {
  partidas: number;
  ganadas: number;
  ultimaJugada: string;

}

export interface Preguntados {
  partidas: number;
  preguntas: number;
  ultimaJugada: string;
  correctas: number;
  deporte: number;
  geografia: number;
  ciencia: number;
  general: number;
  historia: number;
  arte: number;
  entretenimiento: number;
}
