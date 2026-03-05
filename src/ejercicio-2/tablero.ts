/**
 * Representa la cuadrícula del juego (6 filas x 7 columnas).
 */
export class Tablero {
  /**
   * Matriz bidimensional que guarda el estado de cada celda del tablero.
   * "-" representa un espacio vacío, "0" el jugador 1 y "1" el jugador 2.
   */
  public table: string[][] = [
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-"],
  ];

  /**
   * Obtiene el valor (estado) de una celda específica.
   * @param pos1 - El índice de la fila.
   * @param pos2 - El índice de la columna.
   * @returns Un string con el estado de la celda ("-", "0", "1").
   */
  GetState(pos1: number, pos2: number): string {
    return this.table[pos1][pos2];
  }

  /**
   * Cambia el valor (estado) de una celda específica.
   * @param pos1 - El índice de la fila.
   * @param pos2 - El índice de la columna.
   * @param state - El nuevo estado a asignar ("0" o "1").
   */
  ChangeState(pos1: number, pos2: number, state: string): void {
    this.table[pos1][pos2] = state;
  }

  /**
   * Imprime el tablero actual en la consola.
   */
  print(): void {
    console.log("");
    console.log("1 2 3 4 5 6 7");
    for (let i = 0; i < this.table.length; i++) {
      console.log(this.table[i].join(" "));
    }
    console.log("");
  }
}