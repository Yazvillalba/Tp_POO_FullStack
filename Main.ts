import { Casino } from './Casino';
import inquirer from 'inquirer';

const casino = new Casino();

async function mostrarMenu(): Promise<void> {
    const opcionesMenu = [
        { name: "1. Mostrar juegos disponibles", value: "1" },
        { name: "2. Leer instrucciones de un juego", value: "2" },
        { name: "3. Jugar un juego", value: "3" },
        { name: "4. Salir", value: "4" },
    ];

    const respuesta = await inquirer.prompt({
        type: "list",
        name: "opcion",
        message: "Seleccione una opción:",
        choices: opcionesMenu,
    });

    switch (respuesta.opcion) {
        case "1":
            await mostrarJuegos();
            break;
        case "2":
            await leerInstrucciones();
            break;
        case "3":
            await elegirJuego();
            break;
        case "4":
            console.log("¡Gracias por visitar el casino!");
            break;
        default:
            console.log("Opción inválida. Intente nuevamente.");
            await mostrarMenu();
            break;
    }
}

async function mostrarJuegos(): Promise<void> {
    casino.mostrarJuegos();
    await mostrarMenu();
}

async function leerInstrucciones(): Promise<void> {
    casino.mostrarJuegos();

    const respuesta = await inquirer.prompt({
        type: "input",
        name: "numJuego",
        message: "Ingrese el número del juego para leer las instrucciones:",
        validate: (input) => {
            return !isNaN(parseInt(input)) || "Debe ingresar un número válido.";
        },
    });

    const juego = casino.elegirJuego(parseInt(respuesta.numJuego));
    if (juego) {
        console.log("\n--- INSTRUCCIONES ---");
        console.log(juego.leerInstrucciones());
    } else {
        console.log("Número de juego inválido.");
    }
    await mostrarMenu();
}

async function elegirJuego(): Promise<void> {
    const opcionesJuego = [
        { name: "1. Jugar Tragamonedas", value: "1" },
        { name: "2. Jugar Ruleta", value: "2" },
        { name: "3. Jugar Dados", value: "3" },
        { name: "4. Volver al menú principal", value: "4" },
    ];

    const respuesta = await inquirer.prompt({
        type: "list",
        name: "opcion",
        message: "Seleccione el tipo de juego:",
        choices: opcionesJuego,
    });

    switch (respuesta.opcion) {
        case "1":
            await jugarTragamonedas();
            break;
        case "2":
            await jugarRuleta();
            break;
        case "3":
            await jugarDados();
            break;
        case "4":
            await mostrarMenu();
            break;
        default:
            console.log("Opción inválida. Intente nuevamente.");
            await elegirJuego();
            break;
    }
}

async function jugarTragamonedas(): Promise<void> {
    console.log("\n--- JUGAR TRAGAMONEDAS ---");
    casino.mostrarTragamonedas();

    const { numJuego } = await inquirer.prompt({
        type: "input",
        name: "numJuego",
        message: "Ingrese el número de la tragamonedas que desea jugar:",
        validate: (input) => {
            return !isNaN(parseInt(input)) || "Debe ingresar un número válido.";
        },
    });

    const juego = casino.elegirJuego(parseInt(numJuego));
    if (!juego) {
        console.log("Número de tragamonedas inválido. Inténtelo de nuevo.");
        return await elegirJuego();
    }

    const { apuesta } = await inquirer.prompt({
        type: "input",
        name: "apuesta",
        message: `Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}):`,
        validate: (input) => {
            const apuestaNum = parseFloat(input);
            if (isNaN(apuestaNum) || apuestaNum < juego.getValorMinimoApuesta()) {
                return `La apuesta debe ser al menos ${juego.getValorMinimoApuesta()}.`;
            }
            return true;
        },
    });

    const resultado = casino.jugarJuego(juego, parseFloat(apuesta));
    console.log(resultado);

    const { opcionFinal } = await inquirer.prompt({
        type: "list",
        name: "opcionFinal",
        message: "¿Qué desea hacer a continuación?",
        choices: [
            { name: "Volver a jugar", value: "1" },
            { name: "Volver al menú principal", value: "2" }
        ],
    });

    if (opcionFinal === "1") {
        await jugarTragamonedas(); 
    } else {
        await mostrarMenu(); 
    }
}


async function jugarRuleta(): Promise<void> {
    console.log("\n--- JUGAR RULETA ---");
    const juego = casino.elegirJuego(3); 
    if (!juego) {
        console.log("Ocurrió un error al seleccionar la ruleta.");
        return await elegirJuego();
    }

    let apuesta;
    while (true) {
        const { apuestaInput } = await inquirer.prompt({
            type: "input",
            name: "apuestaInput",
            message: `Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}):`,
            validate: (input) => {
                const cleanedInput = input.replace(/[^0-9]/g, ''); 
                const apuestaNum = parseInt(cleanedInput, 10);

                if (isNaN(apuestaNum) || apuestaNum < juego.getValorMinimoApuesta()) {
                    return `La apuesta debe ser un número entero positivo y al menos ${juego.getValorMinimoApuesta()}.`;
                }
                return true; 
            },
        });

        apuesta = parseInt(apuestaInput.replace(/[^0-9]/g, ''), 10);
        if (apuesta >= juego.getValorMinimoApuesta()) {
            break; 
        }
    }

    const { eleccion } = await inquirer.prompt({
        type: "input",
        name: "eleccion",
        message: "Ingrese su predicción (número y color, separados por un espacio, ej. 5 rojo):",
        validate: (input) => {
            const partes = input.trim().toLowerCase().split(" ");
            if (partes.length < 2) {
                return "Por favor, ingresa un número y un color separados por un espacio.";
            }
            const numero = partes[0].replace(/[^0-9]/g, ''); 
            const color = partes[1];

            if (!numero || isNaN(parseInt(numero, 10)) || parseInt(numero, 10) < 0 || parseInt(numero, 10) > 36) {
                return "El número debe estar entre 0 y 36, sin comas ni puntos.";
            }

            if (color !== "rojo" && color !== "negro") {
                return "El color debe ser 'rojo' o 'negro'.";
            }
            return true;
        },
    });

    const resultado = juego.jugar(apuesta, eleccion);
    console.log(resultado);

    const { opcionFinal } = await inquirer.prompt({
        type: "list",
        name: "opcionFinal",
        message: "¿Qué desea hacer a continuación?",
        choices: [
            { name: "Volver a jugar", value: "1" },
            { name: "Volver al menú principal", value: "2" }
        ],
    });

    if (opcionFinal === "1") {
        await jugarRuleta(); 
    } else {
        await mostrarMenu(); 
    }
}


async function jugarDados(): Promise<void> {
    console.log("--- JUGAR DADOS ---");
    const juego = casino.elegirJuego(4);

    if (!juego) {
        console.log("Ocurrió un error al seleccionar los dados.");
        return await elegirJuego();
    }

    const { apuesta } = await inquirer.prompt({
        type: "input",
        name: "apuesta",
        message: `Ingrese su apuesta (mínimo ${juego.getValorMinimoApuesta()}):`,
        validate: (input) => {
            const apuestaNum = parseFloat(input);
            return (!isNaN(apuestaNum) && apuestaNum >= juego.getValorMinimoApuesta()) || `La apuesta debe ser al menos ${juego.getValorMinimoApuesta()}.`;
        },
    });

    const { prediccion } = await inquirer.prompt({
        type: "input",
        name: "prediccion",
        message: "Ingrese su predicción de la suma de los dos dados (de 2 a 12):",
        validate: (input) => {
            const value = parseInt(input, 10);
            return (!isNaN(value) && value >= 2 && value <= 12) || "La predicción debe estar entre 2 y 12.";
        },
    });

    const resultado = juego.jugar(parseFloat(apuesta), prediccion.trim());
    console.log(resultado);

    const { opcionFinal } = await inquirer.prompt({
        type: "list",
        name: "opcionFinal",
        message: "¿Qué desea hacer a continuación?",
        choices: [
            { name: "Volver a jugar", value: "1" },
            { name: "Volver al menú principal", value: "2" }
        ],
    });

    if (opcionFinal === "1") {
        await jugarDados(); 
    } else {
        await mostrarMenu();
    }
}


mostrarMenu();
