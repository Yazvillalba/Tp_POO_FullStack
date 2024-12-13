const bienvenida = 1000;
class Sesion {
    private saldoTotal: number;
    //tambien se podria usar la misma clase para chequear el jugador, etc
     
    constructor() {
      this.saldoTotal = bienvenida;
    }
  
    agregarSaldo(valor: number): void {
      this.saldoTotal += valor;
    }
  
    descontarSaldo(valor: number): void {
      this.saldoTotal -= valor;
    }
  
    getSaldoTotal(): number {
      return this.saldoTotal;
    }
  }
  