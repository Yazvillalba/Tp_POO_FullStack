import { Tragamonedas } from "./Tragamonedas";
import { Sesion } from "./Sesion";
import * as fs from "fs";

export class CongoCash extends Tragamonedas {
  private tiradasGratis: number = 0;
  private totalGanado: number = 0;

  constructor(private sesion: Sesion) {
    super("Congo Cash", 10, "./instrucciones/CongoCash.txt", "Tiradas Gratis");
  }

  jugar(apuesta: number): string {
    if (apuesta < this.valorMinimoApuesta && this.tiradasGratis <= 0) {
      return "La apuesta es menor al valor mínimo permitido y no tienes tiradas gratis.";
    }

    let ganancia = 0;

    if (this.tiradasGratis > 0) {
      console.log("Usando una tirada gratis...");
      this.tiradasGratis--; 
    } else {
      ganancia -= apuesta; 
    }

    const multiplicador = Math.floor(Math.random() * 5) + 1; 
    ganancia += apuesta * multiplicador;
    this.totalGanado += ganancia;

    if (ganancia === 300 && this.tiradasGratis === 0) {
      console.log("¡Ganaste un bono!");
      this.aplicarBono();
    }

    console.log(
      `Ganancia: ${ganancia}, Tiradas gratis restantes: ${this.tiradasGratis}, Total acumulado: ${this.sesion.agregarSaldo(ganancia)}`
    );

    return `Ganancia en esta jugada: ${ganancia}. Total acumulado en el juego: ${this.totalGanado}`;
  }

  aplicarBono(): string {
    this.tiradasGratis += 5; 
    console.log("¡Ganaste 5 tiradas gratis!");
    return "¡Ganaste 5 tiradas gratis!";
  }

}
