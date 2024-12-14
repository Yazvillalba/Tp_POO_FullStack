const bienvenida = 1000;
export class Sesion {
    private saldoTotal: number;
    //tambien se podria usar la misma clase para chequear el jugador, etc
     
    constructor() {
      this.saldoTotal = bienvenida;
    }
  
    agregarSaldo(valor: number): number {
      this.saldoTotal += valor;
      return this.saldoTotal;
    }
  
    descontarSaldo(valor: number): number {
      this.saldoTotal -= valor;
      return this.saldoTotal;
    }
  
    getSaldoTotal(): number {
      return this.saldoTotal;
    }
  }
  