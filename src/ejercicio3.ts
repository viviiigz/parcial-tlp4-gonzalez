// ## Ejercicio 3 — Refactorizar un sistema de cobros

// **Temas:** principios SOLID: Abierto/Cerrado (OCP) e Inversión de Dependencia (DIP).

// Este código funciona, pero tiene dos problemas: cada opción nueva obliga a agregar otro `if`, y la clase crea su propia dependencia concreta. Copialo en `src/ejercicio3.ts`, hacé el commit del punto de control 3 y después refactorizalo.

// ```ts
// class BaseDeDatosMySQL {
//   guardar(dato: string): void {
//     console.log(`[MySQL] ${dato}`);
//   }
// }

// class SistemaCobros {
//   cobrar(medio: string, monto: number): void {
//     let total = monto;
//     if (medio === "tarjeta") {
//       total = monto * 1.05;
//     }
//     const db = new BaseDeDatosMySQL();
//     db.guardar(`${medio}: $${total}`);
//   }
// }

// const sistema = new SistemaCobros();
// sistema.cobrar("efectivo", 1000);
// sistema.cobrar("tarjeta", 2000);
// ```

// 1. **OCP:** creá la interfaz `MedioDePago` (con `nombre` y `calcularTotal(monto: number): number`) y una clase por cada opción: `Efectivo` (devuelve el monto) y `Tarjeta` (monto + 5%). `SistemaCobros.cobrar` recibe un `MedioDePago` y no tiene ningún `if`.
// 2. **DIP:** `SistemaCobros` no crea `BaseDeDatosMySQL`. Recibe por constructor una interfaz `Repositorio`, con dos implementaciones: `RepositorioMySQL` (muestra `[MySQL] ...`) y `RepositorioArchivo` (muestra `[Archivo] ...`).
// 3. Arriba de cada interfaz nueva, un comentario de una línea indicando qué principio aplica.

// **Salida esperada:**

// ```
// [MySQL] Efectivo: $1000
// [MySQL] Tarjeta: $2100
// [Archivo] Efectivo: $500
// ```