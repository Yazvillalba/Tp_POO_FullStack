import { JokersJewels } from "./JokersJewels";
import { CongoCash } from "./CongoCash";
import { Ruleta } from "./Ruleta";
import { Dados } from './Dados';

export class Casino {
    private tragamonedas: Array<JokersJewels | CongoCash>;
    private ruleta: Ruleta;
    private dados: Dados;

    constructor() {
        this.tragamonedas = [
            new JokersJewels(),
            new CongoCash(),
        ];
        this.ruleta = new Ruleta();
        this.dados = new Dados();
    }


    mostrarJuegos(): void {
        console.log("--- JUEGOS DISPONIBLES ---");
        this.tragamonedas.forEach((juego, index) => {
            console.log(`${index + 1}. ${juego.getNombre()} (Tragamonedas)`);
        });
        console.log(`${this.tragamonedas.length + 1}. ${this.ruleta.getNombre()} (Ruleta)`);
        console.log(`${this.tragamonedas.length + 2}. ${this.dados.getNombre()} (Dados)`);
    }

    mostrarTragamonedas(): void {
        console.log("---Tragamonedas Disponibles ---");
        this.tragamonedas.forEach((juego, index) => {
            console.log(`${index + 1}. ${juego.getNombre()} (Tragamonedas)`);
        });
    
    }
    elegirJuego(numJuego: number): JokersJewels | CongoCash | Ruleta | Dados | null {
        if (numJuego <= this.tragamonedas.length) {
            return this.tragamonedas[numJuego - 1];
        } else if (numJuego === this.tragamonedas.length + 1) {
            return this.ruleta;
        } else if (numJuego === this.tragamonedas.length + 2) {
            return this.dados;
        }
        console.log("Número de juego inválido.");
        return null;
    }

    jugarJuego(juego: any, apuesta: number): void {
        if (apuesta <= 0 || isNaN(apuesta)) {
            console.log("La apuesta debe ser un número positivo.");
            return;
        }

        if (juego instanceof Ruleta) {
            this.jugarRuleta(juego, apuesta);
        } else if (juego instanceof Dados) {
            this.jugarDados(juego, apuesta);
        } else {
            this.jugarTragamonedas(juego, apuesta);
        }
    }
    private jugarRuleta(ruleta: Ruleta, apuesta: number): void {
        const readlineSync = require('readline-sync');
        const eleccion = readlineSync.question("Elige un número (1-36) o un color (rojo/negro): ");
        console.log(ruleta.jugar(apuesta, eleccion));
    }

    private jugarTragamonedas(tragamonedas: any, apuesta: number): void {
        console.log(tragamonedas.jugar(apuesta));
    }
    private jugarDados(dados: Dados, apuesta: number): void {
        const readlineSync = require("readline-sync");
        const prediccion = readlineSync.question("Ingresa tu predicción de la suma de los dados (2-12): ");
        console.log(dados.jugar(apuesta, prediccion));
    }
}
