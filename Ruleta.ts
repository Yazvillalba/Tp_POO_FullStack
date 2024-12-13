import { Juego } from "./Juego";
import { Sesion } from "./Sesion";

export class Ruleta extends Juego {
    private totalGanado: number;

    constructor(private sesion: Sesion) {
        super("Ruleta", 100, './instrucciones/Ruleta.txt');
        this.totalGanado = 0;
    }

    getTotalGanado(): number {
        return this.totalGanado;
    }

    jugar(apuesta: number, eleccion: string): string {
        if (!Number.isInteger(apuesta)) {
            return "La apuesta debe ser un número entero positivo.";
        }

        if (apuesta < this.valorMinimoApuesta) {
            return "La apuesta es menor al valor mínimo permitido.";
        }

        const numeros = Array.from({ length: 37 }, (_, i) => i); 
        const colores = ["rojo", "negro"];
        const numeroGanador = numeros[Math.floor(Math.random() * numeros.length)];
        const colorGanador = colores[Math.floor(Math.random() * colores.length)];

        console.log(`Número ganador: ${numeroGanador}, Color ganador: ${colorGanador}`);

        const partes = eleccion.split(" ").map(p => p.trim().toLowerCase());
        if (partes.length < 2) {
            return "Por favor, ingresa un número y un color separados por un espacio.";
        }

        const numeroElegido = parseInt(partes[0], 10);
        const colorElegido = partes[1];

        if (
            isNaN(numeroElegido) ||
            !Number.isInteger(numeroElegido) ||
            numeroElegido < 0 ||
            numeroElegido > 36
        ) {
            return "El número ingresado no es válido. Debe ser un número entero entre 0 y 36.";
        }

        if (!colores.includes(colorElegido)) {
            return "El color ingresado no es válido. Debe ser 'rojo' o 'negro'.";
        }

        let ganancia = 0;

        if (numeroElegido === numeroGanador && colorElegido === colorGanador) {
            ganancia = (apuesta * 35) + (apuesta *2);
        } else if (numeroElegido === numeroGanador) {
            ganancia = apuesta * 35;
        } else if (colorElegido === colorGanador) {
            ganancia = apuesta * 2;
        }

        if (ganancia > 0) {
            this.totalGanado += ganancia - apuesta;
            this.sesion.agregarSaldo(ganancia - apuesta);
            return `¡Felicidades! Ganaste ${ganancia}. Total acumulado: ${this.sesion.getSaldoTotal()}.`;
        } else {
            this.totalGanado -= apuesta;
            this.sesion.descontarSaldo(apuesta);
            return `Lo siento, no ganaste esta vez. Total acumulado: ${this.sesion.getSaldoTotal()}.`;
        }
    }
}