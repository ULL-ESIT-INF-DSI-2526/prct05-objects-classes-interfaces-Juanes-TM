import { describe, test, expect, beforeEach, vi, afterEach} from "vitest";
import { Juego } from "../src/ejercicio-2/juego";
import { Ficha } from "../src/ejercicio-2/ficha";
import { Tablero } from "../src/ejercicio-2/tablero";

describe("Tablero", () => {
  let tablero: Tablero;

  beforeEach(() => {
    tablero = new Tablero();
  });

  test("Debe inicializarse con un tablero vacío (6x7) lleno de '-'", () => {
    expect(tablero.table.length).toBe(6);
    expect(tablero.table[0].length).toBe(7);
    expect(tablero.GetState(0, 0)).toBe("-");
    expect(tablero.GetState(5, 6)).toBe("-");
  });

  test("Debe permitir cambiar y obtener el estado de una celda", () => {
    tablero.ChangeState(5, 0, "0"); // Jugador 1 en la esquina inferior izquierda
    expect(tablero.GetState(5, 0)).toBe("0");
    
    tablero.ChangeState(4, 0, "1"); // Jugador 2 justo encima
    expect(tablero.GetState(4, 0)).toBe("1");
  });

  test("Debe imprimir el tablero sin errores", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    tablero.print();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe("Ficha - Lógica de Gravedad (TakePosition)", () => {
  let tablero: Tablero;

  beforeEach(() => {
    tablero = new Tablero();
  });

  test("Una ficha debe caer hasta el fondo (fila 5) si la columna está vacía", () => {
    const ficha = new Ficha(false, [0, 0]); // Jugador 1 (false -> "0"), columna 0
    ficha.TakePosition(tablero);
    
    expect(ficha.position[0]).toBe(5); // Terminó en la fila 5
    expect(tablero.GetState(5, 0)).toBe("0");
  });

  test("Una ficha debe apilarse sobre otra si la columna ya tiene fichas", () => {
    const ficha1 = new Ficha(false, [0, 3]);
    ficha1.TakePosition(tablero); // Cae a la fila 5
    
    const ficha2 = new Ficha(true, [0, 3]); // Jugador 2 (true -> "1")
    ficha2.TakePosition(tablero); // Debe caer a la fila 4
    
    expect(ficha2.position[0]).toBe(4);
    expect(tablero.GetState(4, 3)).toBe("1");
    expect(tablero.GetState(5, 3)).toBe("0"); // La primera ficha sigue intacta
  });
});

describe("Juego - Condiciones de Victoria", () => {
  let juego: Juego;
  let tablero: Tablero;

  beforeEach(() => {
    juego = new Juego();
    tablero = new Tablero();
  });

  test("Debe detectar victoria Horizontal", () => {
    // Simulamos 4 fichas del Jugador 1 ("0") en la fila inferior
    tablero.ChangeState(5, 0, "0");
    tablero.ChangeState(5, 1, "0");
    tablero.ChangeState(5, 2, "0");
    
    const fichaGanadora = new Ficha(false, [0, 3]); // Se inserta en la col 3
    fichaGanadora.TakePosition(tablero); // Cae a (5,3)

    expect(juego.checkHorizontal(tablero, fichaGanadora)).toBe(true);
    expect(juego.checkWin(tablero, fichaGanadora)).toBe(true);
  });

  test("Debe detectar victoria Vertical", () => {
    // Simulamos 3 fichas del Jugador 2 ("1") apiladas en la columna 2
    tablero.ChangeState(5, 2, "1");
    tablero.ChangeState(4, 2, "1");
    tablero.ChangeState(3, 2, "1");
    
    const fichaGanadora = new Ficha(true, [0, 2]); 
    fichaGanadora.TakePosition(tablero); // Cae a (2,2)

    expect(juego.checkVertical(tablero, fichaGanadora)).toBe(true);
    expect(juego.checkWin(tablero, fichaGanadora)).toBe(true);
  });

  test("Debe detectar victoria Diagonal 1 (Abajo-Derecha a Arriba-Izquierda '\\')", () => {
    tablero.ChangeState(2, 0, "0");
    tablero.ChangeState(3, 1, "0");
    tablero.ChangeState(4, 2, "0");
    
    const fichaGanadora = new Ficha(false, [5, 3]); // Forzamos posición para el test
    tablero.ChangeState(5, 3, "0");

    expect(juego.checkDiagonal1(tablero, fichaGanadora)).toBe(true);
    expect(juego.checkWin(tablero, fichaGanadora)).toBe(true);
  });

  test("Debe detectar victoria Diagonal 2 (Abajo-Izquierda a Arriba-Derecha '/')", () => {
    tablero.ChangeState(5, 0, "1");
    tablero.ChangeState(4, 1, "1");
    tablero.ChangeState(3, 2, "1");
    
    const fichaGanadora = new Ficha(true, [2, 3]); // Forzamos posición para el test
    tablero.ChangeState(2, 3, "1");

    expect(juego.checkDiagonal2(tablero, fichaGanadora)).toBe(true);
    expect(juego.checkWin(tablero, fichaGanadora)).toBe(true);
  });

  test("No debe dar victoria si no se cumplen las condiciones", () => {
    const ficha = new Ficha(false, [0, 0]);
    ficha.TakePosition(tablero);
    expect(juego.checkWin(tablero, ficha)).toBe(false);
  });
});

describe("Juego - Bucle de Partida (Run)", () => {
  let juego: Juego;
  let consoleSpy: any;

  beforeEach(() => {
    juego = new Juego();
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    // Cerramos el readline forzadamente después de cada test para no colgar el proceso
    (juego as any).rl.close();
  });

  test("Debe terminar el juego si hay un ganador", async () => {
    // Burlamos el método privado 'pedirColumna' para simular una victoria vertical rápida
    const pedirColumnaMock = vi.spyOn(juego as any, "pedirColumna")
      .mockResolvedValueOnce(1) // J1 col 1
      .mockResolvedValueOnce(2) // J2 col 2
      .mockResolvedValueOnce(1) // J1 col 1
      .mockResolvedValueOnce(2) // J2 col 2
      .mockResolvedValueOnce(1) // J1 col 1
      .mockResolvedValueOnce(2) // J2 col 2
      .mockResolvedValueOnce(1); // J1 col 1 -> ¡VICTORIA!

    await juego.Run();

    expect(pedirColumnaMock).toHaveBeenCalledTimes(7);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Jugador 1 ha obtenido la victoria"));
  });

  test("Debe declarar empate si se superan los 42 turnos", async () => {
    // Mockeamos pedirColumna para que devuelva una columna arbitraria
    const pedirColumnaMock = vi.spyOn(juego as any, "pedirColumna").mockResolvedValue(1);
    
    // Evitamos que 'checkWin' detenga el juego prematuramente simulando que nadie gana
    vi.spyOn(juego, "checkWin").mockReturnValue(false);

    await juego.Run();

    // 43 turnos (del 0 al 42)
    expect(pedirColumnaMock).toHaveBeenCalledTimes(43);
    expect(consoleSpy).toHaveBeenCalledWith("Empate entre los jugadores.");
  });

  test("El método privado pedirColumna debe rechazar entradas inválidas", async () => {
    const askMock = vi.spyOn(juego as any, "ask")
      .mockResolvedValueOnce("a")    // Letra (inválido)
      .mockResolvedValueOnce("8")    // Fuera de rango (inválido)
      .mockResolvedValueOnce("3");   // Válido
    
    const tablero = new Tablero();
    
    // Al llamar a pedirColumna, internamente llamará a ask 3 veces antes de resolver
    const columna = await (juego as any).pedirColumna(tablero);

    expect(columna).toBe(3);
    expect(askMock).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenCalledWith("La columna indicada es inválida o esta llena. Intente otra vez.");
  });
});