// ## Ejercicio 1 — Estacionamiento
//
// **Temas:** clase abstracta, herencia, polimorfismo, `readonly`, `private`, `static`, getter.
//
// Un estacionamiento registra los vehículos que entran y calcula cuánto paga cada uno.
//
// 1. Clase abstracta `Vehiculo` con `patente: string` como `readonly` (se recibe en el constructor) y un método abstracto `calcularTarifa(horas: number): number`.
// 2. Dos subclases que extienden `Vehiculo`: `Auto` ($1000 por hora) y `Moto` ($500 por hora).
// 3. Clase `Estacionamiento` con:
//    - Un arreglo **privado** de `Vehiculo`.
//    - `ingresar(vehiculo: Vehiculo): void`: lo agrega al arreglo.
//    - Un atributo `static` que cuente cuántos ingresaron en total.
//    - Un getter `cantidad` que devuelva cuántos hay en el arreglo.
//    - `mostrarTarifas(horas: number): void`: recorre el arreglo y muestra cuánto paga cada uno, llamando al método de cada objeto (sin `if` por tipo).
//
// **Salida esperada** (un auto y una moto, 2 horas):
//
// ```
// AB123CD paga $2000
// XY987ZW paga $1000
// Vehículos estacionados: 2
// Total histórico de ingresos: 2
// ```
