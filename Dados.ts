import { Juego } from "./Juego";
import { Sesion } from "./Sesion";

export class Dados extends Juego {
    private totalGanado: number;

    constructor(private sesion: Sesion) {
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
        let ganancia=0

        if (prediccion === suma.toString()) {
            ganancia = apuesta * 2;
            this.totalGanado += ganancia;
            this.sesion.agregarSaldo(ganancia);
            return `¡Ganaste! Los dados salieron ${dado1} y ${dado2} (Suma: ${suma}). Ganaste ${ganancia}.`;
        } else {
            this.totalGanado -= apuesta;
            this.sesion.descontarSaldo(apuesta);
            return `Perdiste. Los dados salieron ${dado1} y ${dado2} (Suma: ${suma}).`;
        }
    }
}
