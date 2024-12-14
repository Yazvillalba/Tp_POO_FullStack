import { Tragamonedas } from "./Tragamonedas";
import { Sesion } from "./Sesion";
import * as fs from "fs";
import * as readlineSync from "readline-sync";

export class JokersJewels extends Tragamonedas {
  private totalGanado: number = 0;

  constructor(private sesion: Sesion) {
    super("Jokers Jewels", 20, "./instrucciones/JokersJewels.txt", "Elección de Color");
  }

  jugar(apuesta: number): string {
    if (apuesta < this.valorMinimoApuesta) {
      return "La apuesta es menor al valor mínimo permitido.";
    }

    const multiplicador = Math.floor(Math.random() * 5) + 1; 
    const ganancia = apuesta * multiplicador;
    this.totalGanado += ganancia - apuesta;

    console.log(`Resultado: Ganaste ${ganancia}. Total acumulado en el juego: ${this.totalGanado}.`);

    if (ganancia === 300) {
      console.log("¡Felicidades! Activaste el bono.");
      return this.aplicarBono();
    }

    return `Resultado: Ganaste ${ganancia}. Total acumulado: ${this.sesion.agregarSaldo(ganancia)}`;
  }

  aplicarBono(): string {
    const colores = ["rojo", "verde", "azul"];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    const colorElegido = readlineSync.question("Elige un color (rojo, verde, azul): ").toLowerCase();

    if (colorElegido === colorAleatorio) {
      const bono = 300 * (Math.floor(Math.random() * 4) + 5);
      this.totalGanado += bono;
      this.sesion.agregarSaldo(this.totalGanado);
      console.log(`¡Acertaste el color! Ganaste un bono de ${bono}. Total acumulado: ${this.sesion.agregarSaldo(bono)}`);
      return "¡GANASTE EL BONO!";
    } else {
      console.log(`No acertaste el color. Color correcto: ${colorAleatorio}. Total acumulado: ${this.sesion.getSaldoTotal()}`);
      return "No acertaste el bono.";
    }
  }
}
