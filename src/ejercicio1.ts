// ## Ejercicio 1 — Estacionamiento

// **Temas:** clase abstracta, herencia, polimorfismo, `readonly`, `private`, `static`, getter.

// Un estacionamiento registra los vehículos que entran y calcula cuánto paga cada uno.

// 1. Clase abstracta `Vehiculo` con `patente: string` como `readonly` (se recibe en el constructor) y un método abstracto `calcularTarifa(horas: number): number`.
// 2. Dos subclases que extienden `Vehiculo`: `Auto` ($1000 por hora) y `Moto` ($500 por hora).
// 3. Clase `Estacionamiento` con:
//    - Un arreglo **privado** de `Vehiculo`.
//    - `ingresar(vehiculo: Vehiculo): void`: lo agrega al arreglo.
//    - Un atributo `static` que cuente cuántos ingresaron en total.
//    - Un getter `cantidad` que devuelva cuántos hay en el arreglo.
//    - `mostrarTarifas(horas: number): void`: recorre el arreglo y muestra cuánto paga cada uno, llamando al método de cada objeto (sin `if` por tipo).

// **Salida esperada** (un auto y una moto, 2 horas):

// ```
// AB123CD paga $2000
// XY987ZW paga $1000
// Vehículos estacionados: 2
// Total histórico de ingresos: 2
// ```
// cada vehiculo calcula su tarifa de forma distinta.
export abstract class Vehiculo {
  readonly patente: string;

  constructor(patente: string) { this.patente = patente; }

  abstract calcularTarifa(horas: number): number;
}

export class Auto extends Vehiculo {
  calcularTarifa(horas: number): number { return horas * 1000; }
}

export class Moto extends Vehiculo {
  calcularTarifa(horas: number): number { return horas * 500; }
}

export class Estacionamiento {
  private vehiculos: Vehiculo[] = [];
  // static comparte el contador entre todos los estacionametos
  static totalIngresos = 0;

  ingresar(vehiculo: Vehiculo): void {
    this.vehiculos.push(vehiculo);
    Estacionamiento.totalIngresos++;
  }

  get cantidad(): number {
    return this.vehiculos.length;
  }

  mostrarTarifas(horas: number): void {
    for (const vehiculo of this.vehiculos) {
      // se usa polimorfismo: cada vehiculo aplica su propia tarifa
      console.log(`${vehiculo.patente} paga $${vehiculo.calcularTarifa(horas)}`);
    }

    console.log(`Vehiculos estacionados: ${this.cantidad}`);
    console.log(`Total historico de ingresos: ${Estacionamiento.totalIngresos}`);
  }
}

const estacionamiento = new Estacionamiento();
estacionamiento.ingresar(new Auto("AB123CD"));
estacionamiento.ingresar(new Moto("XY987ZW"));
estacionamiento.mostrarTarifas(2);
