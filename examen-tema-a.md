# Examen Parcial TLP IV — Parte práctica · Tema A

**Duración:** 1,5 horas · **Valor:** 60% de la nota final

Para aprobar la parte práctica hay que resolver correctamente **al menos 2 de los 3 ejercicios**. La parte práctica solo se corrige si la parte teórica está aprobada.

> **Hora de entrega:** se informa en clase. El **último commit** del repositorio no puede ser posterior a esa hora.

---

## Preparación del proyecto

Armá el proyecto desde cero en una carpeta llamada `parcial-tlp4-<apellido>`:

1. Generá el `package.json` y cambiá `"type"` a `"module"`.
2. Instalá TypeScript como dependencia de desarrollo (instalación local).
3. Creá el `tsconfig.json` con estas opciones: `strict`, `noEmit`, `erasableSyntaxOnly`, `allowImportingTsExtensions`, `skipLibCheck`, `target: es2022`, `module` y `moduleResolution` en `nodenext`.
4. Creá un `.gitignore` que excluya `node_modules/`.
5. Creá un archivo `ENTREGA.md` con tu apellido, nombre, DNI, **Tema A** y la URL del repositorio.

```
parcial-tlp4-<apellido>/
├── .gitignore
├── ENTREGA.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── src/
    ├── ejercicio1.ts
    ├── ejercicio2.ts
    └── ejercicio3.ts
```

---

## Git y GitHub

### Configuración del repositorio

1. Creá en GitHub un repositorio **privado** llamado `parcial-tlp4-<apellido>`.
2. Agregá a los cuatro profesores como colaboradores, invitándolos por correo desde **Settings → Collaborators → Add people**:
   - `alesanabri4@gmail.com`
   - `augustochavesfiore@gmail.com`
   - `agustinmcenturion@gmail.com`
   - `cristiand.gonzalez094@gmail.com`

Si el repositorio es público, o si falta algún profesor como colaborador, la entrega no se corrige.

### Puntos de control

Cada punto de control es un commit **con el mensaje exacto indicado**, seguido de `git push`. Podés hacer todos los commits intermedios que quieras.

| #   | Momento                                        | Mensaje del commit                    |
| --- | ---------------------------------------------- | ------------------------------------- |
| 0   | Proyecto configurado y `npx tsc` corriendo     | `chore: configuración inicial`        |
| 1   | Ejercicio 1 terminado                          | `feat(ej1): ejercicio 1 completo`     |
| 2   | Ejercicio 2 terminado                          | `feat(ej2): ejercicio 2 completo`     |
| 3   | Código original del ejercicio 3 copiado, antes de refactorizar | `chore(ej3): código original` |
| 4   | Ejercicio 3 terminado                          | `refactor(ej3): ejercicio 3 completo` |
| 5   | `ENTREGA.md` con los ejercicios resueltos      | `docs: entrega final`                 |

El orden de los puntos 1 a 4 es libre: podés empezar por el ejercicio que prefieras.

### Reglas de la entrega

- Solo se corrige lo que esté **subido a GitHub** en la rama `main`.
- El **último commit no puede superar la hora de entrega** informada en clase. Lo que se suba después no se tiene en cuenta.
- Un ejercicio sin su commit de punto de control se considera no entregado.
- No se aceptan entregas por otro medio.

---

## Reglas del código

- `npx tsc` tiene que terminar **sin errores**.
- Cada ejercicio se debe ejecutar correctamente y mostrar su salida por consola.
- No se permite usar `enum`, _parameter properties_ (`constructor(private x: string)`) ni `any`.
- Cada archivo termina con un bloque de prueba que reproduce la salida esperada.

Un ejercicio está **resuelto correctamente** cuando `npx tsc` está limpio, el archivo corre sin errores, cumple todos los requisitos y su commit de punto de control está en GitHub antes de la hora de entrega.

---

## Ejercicio 1 — Estacionamiento

**Temas:** clase abstracta, herencia, polimorfismo, `readonly`, `private`, `static`, getter.

Un estacionamiento registra los vehículos que entran y calcula cuánto paga cada uno.

1. Clase abstracta `Vehiculo` con `patente: string` como `readonly` (se recibe en el constructor) y un método abstracto `calcularTarifa(horas: number): number`.
2. Dos subclases que extienden `Vehiculo`: `Auto` ($1000 por hora) y `Moto` ($500 por hora).
3. Clase `Estacionamiento` con:
   - Un arreglo **privado** de `Vehiculo`.
   - `ingresar(vehiculo: Vehiculo): void`: lo agrega al arreglo.
   - Un atributo `static` que cuente cuántos ingresaron en total.
   - Un getter `cantidad` que devuelva cuántos hay en el arreglo.
   - `mostrarTarifas(horas: number): void`: recorre el arreglo y muestra cuánto paga cada uno, llamando al método de cada objeto (sin `if` por tipo).

**Salida esperada** (un auto y una moto, 2 horas):

```
AB123CD paga $2000
XY987ZW paga $1000
Vehículos estacionados: 2
Total histórico de ingresos: 2
```

---

## Ejercicio 2 — Pedidos de un local de comidas

**Temas:** interfaces, Singleton, Factory Method.

Un local de comidas recibe pedidos para retirar o con envío a domicilio.

1. **Singleton** `ConfiguracionLocal`: constructor privado, método estático `obtenerInstancia()` y un atributo `readonly costoEnvio = 1500`.
2. Interfaz `Pedido` con el método `calcularTotal(subtotal: number): number`.
3. Dos clases que implementan `Pedido`:
   - `PedidoRetiro`: devuelve el subtotal.
   - `PedidoEnvio`: devuelve el subtotal más el `costoEnvio` **leído del Singleton**.
4. **Factory** `FabricaPedidos` con un método estático `crear(tipo: "retiro" | "envio"): Pedido`. Fuera de la fábrica nadie usa `new PedidoRetiro` ni `new PedidoEnvio`.

**Salida esperada** (subtotal de $4000 en los dos pedidos):

```
Mismo Singleton: true
Retiro: $4000
Envío: $5500
```

---

## Ejercicio 3 — Refactorizar un sistema de cobros

**Temas:** principios SOLID: Abierto/Cerrado (OCP) e Inversión de Dependencia (DIP).

Este código funciona, pero tiene dos problemas: cada opción nueva obliga a agregar otro `if`, y la clase crea su propia dependencia concreta. Copialo en `src/ejercicio3.ts`, hacé el commit del punto de control 3 y después refactorizalo.

```ts
class BaseDeDatosMySQL {
  guardar(dato: string): void {
    console.log(`[MySQL] ${dato}`);
  }
}

class SistemaCobros {
  cobrar(medio: string, monto: number): void {
    let total = monto;
    if (medio === "tarjeta") {
      total = monto * 1.05;
    }
    const db = new BaseDeDatosMySQL();
    db.guardar(`${medio}: $${total}`);
  }
}

const sistema = new SistemaCobros();
sistema.cobrar("efectivo", 1000);
sistema.cobrar("tarjeta", 2000);
```

1. **OCP:** creá la interfaz `MedioDePago` (con `nombre` y `calcularTotal(monto: number): number`) y una clase por cada opción: `Efectivo` (devuelve el monto) y `Tarjeta` (monto + 5%). `SistemaCobros.cobrar` recibe un `MedioDePago` y no tiene ningún `if`.
2. **DIP:** `SistemaCobros` no crea `BaseDeDatosMySQL`. Recibe por constructor una interfaz `Repositorio`, con dos implementaciones: `RepositorioMySQL` (muestra `[MySQL] ...`) y `RepositorioArchivo` (muestra `[Archivo] ...`).
3. Arriba de cada interfaz nueva, un comentario de una línea indicando qué principio aplica.

**Salida esperada:**

```
[MySQL] Efectivo: $1000
[MySQL] Tarjeta: $2100
[Archivo] Efectivo: $500
```

---
