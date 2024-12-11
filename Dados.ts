import { Juego } from "./Juego";

export class Dados extends Juego {
    private totalGanado: number;

    constructor() {
        super("Dados", 50, './instrucciones/Dados.txt');
        this.totalGanado = 0;
    }

    getTotalGanado(): number {
        return this.totalGanado;
    }

    jugar(apuesta: number, prediccion: string): string {
        const dado1 = Math.ceil(Math.random() * 6);
        const dado2 = Math.ceil(Math.random() * 6);
        const suma = dado1 + dado2;

        if (prediccion === suma.toString()) {
            this.totalGanado += apuesta * 2;
            return `¡Ganaste! Los dados salieron ${dado1} y ${dado2} (Suma: ${suma}). Ganaste ${apuesta * 2}.`;
        } else {
            this.totalGanado -= apuesta;
            return `Perdiste. Los dados salieron ${dado1} y ${dado2} (Suma: ${suma}).`;
        }
    }
}
