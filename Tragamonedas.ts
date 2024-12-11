import { Juego } from "./Juego";

export abstract class Tragamonedas extends Juego {
    protected tipoBono: string;

    constructor(nombre: string, valorMinimoApuesta: number, instruccionesPath: string, tipoBono: string) {
        super(nombre, valorMinimoApuesta, instruccionesPath);
        this.tipoBono = tipoBono;
    }

    getTipoBono(): string {
        return this.tipoBono;
    }

    abstract aplicarBono(): string;

    abstract jugar(apuesta: number): string;
}
