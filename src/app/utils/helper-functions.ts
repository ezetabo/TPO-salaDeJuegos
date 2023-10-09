import { Chats } from "../interfaces/chats.interface";
import { Ctg } from '../interfaces/ctg.interface';

export function getIdByCategory(nombre: string): number {
  const catg = nombre.split(':');
  let id = 0
  let ids: number[] = [];
  switch (catg[0]) {
    case 'Entretenimiento':
      ids = [10, 11, 12, 13, 14, 15, 16, 26, 29, 31, 32];
      id = ids[Math.floor(Math.random() * ids.length)];
      break;
    case 'Deportes':
      id = 21;
      break;
    case 'Geografía':
      id = 22;
      break;
    case 'Ciencia':
    case 'animales':
    case 'Ciencias':
    case 'Ciencia y naturaleza':
      ids = [17, 18, 19, 27, 30];
      id = ids[Math.floor(Math.random() * ids.length)];
      break;
    case 'Conocimientos generales':
    case 'Mitología':
    case 'Vehículos':
      ids = [9, 20, 28]
      id = ids[Math.floor(Math.random() * ids.length)];
      break;
    case 'Historia':
    case 'Política':
    case 'Historia y Politica':
      ids = [23, 24]
      id = ids[Math.floor(Math.random() * ids.length)];
      break;
    case 'Arte':
      id = 25;
      break;
  }
  return id
}

export function getCategoryById(id: number): string {
  let ctg: string;
  switch (id) {
    case 21:
      ctg = 'Deportes';
      break;
    case 22:
      ctg = 'Geografia';
      break;
    case 17: case 18: case 19: case 27: case 30:
      ctg = 'Ciencia y naturaleza';
      break;
    case 9: case 20: case 28:
      ctg = 'Conocimientos generales';
      break;
    case 23: case 24:
      ctg = 'Historia y Politica';
      break;
    case 25:
      ctg = 'Arte';
      break;
    default:
      ctg = 'Entretenimiento';
      break;
  }

  return ctg;
}

export function getCategorias(): Ctg[] {
  const ctg: Ctg[] = [
    { nombre: 'Deportes', ganada: false }, { nombre: 'Geografia', ganada: false },
    { nombre: 'Ciencia y naturaleza', ganada: false },
    { nombre: 'Conocimientos generales', ganada: false },
    { nombre: 'Historia y Politica', ganada: false },
    { nombre: 'Arte', ganada: false }, { nombre: 'Entretenimiento', ganada: false }
  ];
  return ctg;
}

export function generarOpciones(arr: string[], nuevoElemento: string): string[] {
  arr.push(nuevoElemento);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getTimeNow(): string {
  const date = new Date();
  const horaActual = date.toLocaleTimeString();
  return horaActual;
}

export function generarMensajes(cantidad: number): Chats[] {
  return Array.from({ length: cantidad }).map((_, i) => ({
    emisor: i % 2 === 0 ? 'Usuario 1' : 'Usuario 2',
    fecha: new Date().toISOString(),
    mensaje: `Mensaje #${i + 1}`,
  }));
}

