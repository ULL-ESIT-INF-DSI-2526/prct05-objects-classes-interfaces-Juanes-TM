import { Tablero } from "./tablero";
import { Ficha } from "./ficha";
import { coord } from "./ficha";
import * as readline from "readline";

/**
 * Clase que gestiona la lógica principal del juego Conecta 4.
 */
export class Juego {
  /**
   * Interfaz de lectura de consola para interactuar con los jugadores.
   * @private
   */
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  /**
   * Realiza una pregunta en la consola y devuelve la respuesta.
   * @param question - El texto de la pregunta a mostrar al usuario.
   * @returns Una promesa que se resuelve con la entrada del usuario.
   * @private
   */
  private ask(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  /**
   * Pide al usuario que introduzca una columna válida para insertar la ficha.
   * Valida que la entrada sea un número, esté dentro de los límites (1-7) y no esté llena.
   * @param table - La instancia actual del tablero.
   * @returns Una promesa que se resuelve con el número de la columna (1-7).
   * @private
   */
  private async pedirColumna(table: Tablero): Promise<number> {
    while (true) {
      const respuesta = await this.ask("Columna (1-7): ");
      const columna = Number(respuesta);
      // Validar que la columna exista y que la fila superior (0) no esté ocupada
      if (!isNaN(columna) && columna >= 1 && columna <= 7 && table.GetState(0, columna - 1) === "-") {
        return columna;
      }
      console.log("La columna indicada es inválida o esta llena. Intente otra vez.");
    }
  }

  /**
   * Comprueba si hay 4 fichas consecutivas del mismo jugador en posición horizontal.
   * @param tablero - La instancia del tablero donde se verifica.
   * @param ficha - La última ficha insertada.
   * @returns `true` si hay victoria horizontal, `false` en caso contrario.
   */
  checkHorizontal(tablero: Tablero, ficha: Ficha): boolean {
    const fila = ficha.position[0];
    const col = ficha.position[1];
    const estado = ficha.player ? "1" : "0";
    let contador = 1;
    // izquierda
    for (let c = col - 1; c >= 0; c--) {
      if (tablero.GetState(fila, c) === estado) contador++;
      else break;
    }
    // derecha
    for (let c = col + 1; c < 7; c++) {
      if (tablero.GetState(fila, c) === estado) contador++;
      else break;
    }
    return contador >= 4;
  }

  /**
   * Comprueba si hay 4 fichas consecutivas del mismo jugador en posición vertical.
   * @param tablero - La instancia del tablero donde se verifica.
   * @param ficha - La última ficha insertada.
   * @returns `true` si hay victoria vertical, `false` en caso contrario.
   */
  checkVertical(tablero: Tablero, ficha: Ficha): boolean {
    const fila = ficha.position[0];
    const col = ficha.position[1];
    const estado = ficha.player ? "1" : "0";
    let contador = 1;
    for (let f = fila + 1; f < 6; f++) {
      if (tablero.GetState(f, col) === estado) contador++;
      else break;
    }
    return contador >= 4;
  }

  /**
   * Comprueba si hay 4 fichas consecutivas del mismo jugador en la diagonal principal (Descendente).
   * @param tablero - La instancia del tablero donde se verifica.
   * @param ficha - La última ficha insertada.
   * @returns `true` si hay victoria en esta diagonal, `false` en caso contrario.
   */
  checkDiagonal1(tablero: Tablero, ficha: Ficha): boolean {
    const fila = ficha.position[0];
    const col = ficha.position[1];
    const estado = ficha.player ? "1" : "0";
    let contador = 1;
    // abajo derecha
    for (let i = 1; fila + i < 6 && col + i < 7; i++) {
      if (tablero.GetState(fila + i, col + i) === estado) contador++;
      else break;
    }
    // arriba izquierda
    for (let i = 1; fila - i >= 0 && col - i >= 0; i++) {
      if (tablero.GetState(fila - i, col - i) === estado) contador++;
      else break;
    }
    return contador >= 4;
  }

  /**
   * Comprueba si hay 4 fichas consecutivas del mismo jugador en la diagonal secundaria (Ascendente).
   * @param tablero - La instancia del tablero donde se verifica.
   * @param ficha - La última ficha insertada.
   * @returns `true` si hay victoria en esta diagonal, `false` en caso contrario.
   */
  checkDiagonal2(tablero: Tablero, ficha: Ficha): boolean {
    const fila = ficha.position[0];
    const col = ficha.position[1];
    const estado = ficha.player ? "1" : "0";
    let contador = 1;
    // abajo izquierda
    for (let i = 1; fila + i < 6 && col - i >= 0; i++) {
      if (tablero.GetState(fila + i, col - i) === estado) contador++;
      else break;
    }
    // arriba derecha
    for (let i = 1; fila - i >= 0 && col + i < 7; i++) {
      if (tablero.GetState(fila - i, col + i) === estado) contador++;
      else break;
    }
    return contador >= 4;
  }

  /**
   * Verifica todas las condiciones de victoria posibles para una ficha recién insertada.
   * @param tablero - La instancia actual del tablero.
   * @param ficha - La ficha que se acaba de colocar.
   * @returns `true` si el jugador ha ganado en ese turno, `false` de lo contrario.
   */
  checkWin(tablero: Tablero, ficha: Ficha): boolean {
    return (
      this.checkHorizontal(tablero, ficha) ||
      this.checkVertical(tablero, ficha) ||
      this.checkDiagonal1(tablero, ficha) ||
      this.checkDiagonal2(tablero, ficha)
    );
  }

  /**
   * Inicia el bucle principal del juego, alternando turnos y procesando jugadas
   * hasta que ocurra una victoria o un empate.
   * @returns Una promesa que se resuelve cuando el juego termina.
   */
  async Run(): Promise<void> {
    let ActualPlayer = false;
    let table = new Tablero();
    let tunrs: number = 0;
    while (true) {
      table.print();
      if (tunrs > 42) {
        console.log("Empate entre los jugadores.");
        break;
      }
      console.log(`Jugador ${ActualPlayer ? "2" : "1"} escoja una columna.`);
      const columna = await this.pedirColumna(table) - 1;
      console.log(`Jugador ${ActualPlayer ? "2" : "1"} eligió la columna ${columna + 1}`);
      
      let ficha = new Ficha(ActualPlayer, [0, columna]);
      ficha.TakePosition(table);
      
      if (this.checkWin(table, ficha)) {
        table.print();
        console.log(`Jugador ${ActualPlayer ? "2" : "1"} ha obtenido la victoria`);
        break;
      }
      ActualPlayer = !ActualPlayer;
      tunrs++;
    }
    // Cierra el readline al terminar el juego para evitar que el proceso se quede colgado.
    this.rl.close(); 
  }
}