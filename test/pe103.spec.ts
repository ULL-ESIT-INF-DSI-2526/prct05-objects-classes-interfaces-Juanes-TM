import { describe, test, expect, beforeEach, vi } from "vitest";

import { Participante } from "../src/pe103/participante";
import { Jugador } from "../src/pe103/jugador";
import { Equipo } from "../src/pe103/equipo";

describe("Participante", () => {

  describe("Inicialización", () => {

    test("Incorrecta jugador", () => {
      const fechaStr: Date = new Date("2025-03-05T10:00:00Z");
      expect(() => {const prueba = new Jugador(-1, "Juan", "España", fechaStr, 20, "Pepito333", "oro III", 100)
        ;}).toBeUndefined
    });

    test("Incorrecta equipo", () => {
      const fechaStr: Date = new Date("2025-03-05T10:00:00Z");
      expect(() => {const prueba = new Equipo(-1, "Xmasters", "España", fechaStr, 20, "cocacola", ["Juan", "Carlos"], 4, 2)
        ;}).toBeUndefined
    });

  });

});