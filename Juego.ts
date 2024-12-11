import { InstruccionesJuego } from "./InstruccionesJuego";
import * as fs from 'fs';

export abstract class Juego implements InstruccionesJuego {
    protected nombre: string;
    protected valorMinimoApuesta: number;
    instruccionesPath: string;

    constructor(nombre: string, valorMinimoApuesta: number, instruccionesPath: string) {
        this.nombre = nombre;
        this.valorMinimoApuesta = valorMinimoApuesta;
        this.instruccionesPath = instruccionesPath;
    }

    getNombre(): string {
        return this.nombre;
    }

    getValorMinimoApuesta(): number {
        return this.valorMinimoApuesta;
    }

    leerInstrucciones(): string {
        try {
            return fs.readFileSync(this.instruccionesPath, 'utf-8');
        } catch {
            return "No se pudieron cargar las instrucciones.";
        }
    }

    abstract jugar(...args: any[]): string;
}