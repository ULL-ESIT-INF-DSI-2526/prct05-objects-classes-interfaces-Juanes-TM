import { Tablero } from "./tablero";

export type coord = [number, number];

/**
 * Representa una ficha o pieza colocada por un jugador.
 */
export class Ficha {
  /**
   * Crea una nueva instancia de una ficha.
   * @param player - Identificador del jugador (false para Jugador 1/"0", true para Jugador 2/"1").
   * @param position - Coordenada inicial de la ficha (generalmente en la fila 0).
   */
  constructor(public readonly player: boolean, public position: coord) {}

  /**
   * Simula la caída por gravedad de la ficha en la columna correspondiente.
   * La ficha baja hasta chocar con el fondo del tablero o con otra ficha.
   * @param table - La instancia del tablero donde cae la ficha.
   */
  TakePosition(table: Tablero): void {
    let inPosition: boolean = false;
    while (inPosition === false) {
      // Si llega al fondo (fila 5)
      if (this.position[0] === 5) {
        inPosition = true;
        table.ChangeState(this.position[0], this.position[1], this.player ? "1" : "0");
      } else {
        // Verifica el espacio justo debajo
        let nextState: string = table.GetState(this.position[0] + 1, this.position[1]);
        if (nextState !== "-") {
          // Si hay otra ficha debajo, se queda en la posición actual
          inPosition = true;
          table.ChangeState(this.position[0], this.position[1], this.player ? "1" : "0");
        } else {
          // Si está vacío, sigue cayendo
          this.position[0] += 1;
        }
      }
    }
  }
}