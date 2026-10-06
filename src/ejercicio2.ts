// ## Ejercicio 2 — Pedidos de un local de comidas

// **Temas:** interfaces, Singleton, Factory Method.

// Un local de comidas recibe pedidos para retirar o con envío a domicilio.

// 1. **Singleton** `ConfiguracionLocal`: constructor privado, método estático `obtenerInstancia()` y un atributo `readonly costoEnvio = 1500`.
// 2. Interfaz `Pedido` con el método `calcularTotal(subtotal: number): number`.
// 3. Dos clases que implementan `Pedido`:
//    - `PedidoRetiro`: devuelve el subtotal.
//    - `PedidoEnvio`: devuelve el subtotal más el `costoEnvio` **leído del Singleton**.
// 4. **Factory** `FabricaPedidos` con un método estático `crear(tipo: "retiro" | "envio"): Pedido`. Fuera de la fábrica nadie usa `new PedidoRetiro` ni `new PedidoEnvio`.

// **Salida esperada** (subtotal de $4000 en los dos pedidos):

// ```
// Mismo Singleton: true
// Retiro: $4000
// Envío: $5500
// ```
