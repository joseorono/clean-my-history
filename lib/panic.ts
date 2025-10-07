import type { QueryFunctionContext } from "@tanstack/react-query";

export function panicQueryFn() {
  // Llama a varias funciones de promesas que se tarden un poquito y no hace resolve hasta que todas corran.
}
