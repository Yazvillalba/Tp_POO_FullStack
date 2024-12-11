import { CongoCash } from "./CongoCash";
import { JokersJewels } from "./JokerJewels";
import { Juego } from "./Juego";
import { Dados} from './Dados';
import {Ruleta } from './Ruleta';
export class Casino {
    private juegos: Array<Juego>;

    constructor() {
        this.juegos = [];
        this.agregarJuego(new CongoCash());
        this.agregarJuego(new JokersJewels());
        this.agregarJuego(new Ruleta());  

        this.agregarJuego(new Dados());  
    }

    agregarJuego(juego: Juego): void {
        this.juegos.push(juego);
    }

    mostrarJuegos(): void {
        console.log("--- JUEGOS DISPONIBLES ---");
        this.juegos.forEach((juego, index) => {
            console.log(`${index + 1}. ${juego.getNombre()}`);
        });
    }

    mostrarTragamonedas(): void {
        console.log("--- TRAGAMONEDAS DISPONIBLES ---");
        this.juegos
            .filter(juego => juego instanceof JokersJewels || juego instanceof CongoCash)
            .forEach((juego, index) => {
                console.log(`${index + 1}. ${juego.getNombre()}`);
            });
    }

    elegirJuego(numJuego: number): Juego | null {
        if (numJuego > 0 && numJuego <= this.juegos.length) {
            return this.juegos[numJuego - 1];
        }
        console.log("Número de juego inválido.");
        return null;
    }

    jugarJuego(juego: Juego, apuesta: number): void {
        if (apuesta <= 0 || isNaN(apuesta)) {
            console.log("La apuesta debe ser un número positivo.");
            return;
        }

        console.log(juego.jugar(apuesta));
    }
}
