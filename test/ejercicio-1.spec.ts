import { describe, test, expect, beforeEach, vi } from "vitest";

import { GestorBibliografico } from "../src/ejercicio-1/GestorBibliografico";
import { ArticuloRevista } from "../src/ejercicio-1/ArticuloRevista";
import { CapituloLibro } from "../src/ejercicio-1/CapituloLibro";
import { ContribucionCongreso } from "../src/ejercicio-1/ContribucionCongreso";
import { TFG } from "../src/ejercicio-1/TFG";
import { TFM } from "../src/ejercicio-1/TFM";

describe("GestorBibliografico completo", () => {

  let gestor: GestorBibliografico;

  beforeEach(() => {

    gestor = new GestorBibliografico();

    gestor.add(
      new ArticuloRevista(
        "Machine Learning for Energy Prediction",
        ["J. Smith", "A. Doe"],
        ["AI", "Energy"],
        "Study about ML in energy systems",
        new Date("2023-05-10"),
        12,
        "Elsevier",
        "Energy Reports",
        9,
        3
      )
    );

    gestor.add(
      new ContribucionCongreso(
        "AI Optimization for Smart Grids",
        ["L. Brown"],
        ["AI", "Smart Grid"],
        "Optimization techniques for smart grids",
        new Date("2022-07-15"),
        8,
        "IEEE",
        "IEEE SmartGrid Conference"
      )
    );

    gestor.add(
      new CapituloLibro(
        "Deep Learning Techniques in Energy Systems",
        ["M. White"],
        ["Deep Learning", "Energy"],
        "DL applications in energy systems",
        new Date("2021-03-20"),
        15,
        "Springer",
        "Advances in Energy Systems"
      )
    );

    gestor.add(
      new TFG(
        "Sistema de recomendación basado en IA",
        ["Carlos Pérez"],
        ["AI", "Recommender Systems"],
        "Recommendation system using machine learning",
        new Date("2022-06-30"),
        65,
        "Universidad de La Laguna",
        "Universidad de La Laguna"
      )
    );

    gestor.add(
      new TFM(
        "Deep Learning aplicado a predicción energética",
        ["Laura Gómez"],
        ["Deep Learning", "Energy Forecasting"],
        "Energy forecasting using neural networks",
        new Date("2023-08-10"),
        80,
        "Universidad de La Laguna",
        "Universidad de La Laguna"
      )
    );

  });

  describe("búsqueda por palabra clave", () => {

    test("debe encontrar múltiples elementos", () => {
      const resultados = gestor.buscarPorPalabraClave("AI");
      expect(resultados.length).toBe(3);
    });

    test("debe devolver lista vacía si no hay coincidencias", () => {
      const resultados = gestor.buscarPorPalabraClave("Blockchain");
      expect(resultados).toEqual([]);
    });

  });


  describe("filtros", () => {

    test("filtrar por título", () => {
      const lista = gestor.buscarPorPalabraClave("Energy");
      const resultados = gestor.filtrarPorTitulo(lista, "Prediction");

      expect(resultados.length).toBe(1);
      expect(resultados[0].titulo).toContain("Prediction");
    });

    test("filtrar por autor", () => {
      const lista = gestor.buscarPorPalabraClave("AI");
      const resultados = gestor.filtrarPorAutor(lista, "Smith");

      expect(resultados.length).toBe(1);
    });

    test("filtrar por año", () => {
      const lista = gestor.buscarPorPalabraClave("AI");
      const resultados = gestor.filtrarPorFecha(lista, 2023);

      expect(resultados.length).toBe(1);
    });

    test("filtrar por editorial", () => {
      const lista = gestor.buscarPorPalabraClave("Energy");
      const resultados = gestor.filtrarPorEditorial(lista, "Elsevier");

      expect(resultados.length).toBe(1);
    });

    test("encadenar filtros", () => {

      const r1 = gestor.buscarPorPalabraClave("AI");
      const r2 = gestor.filtrarPorAutor(r1, "Smith");
      const r3 = gestor.filtrarPorFecha(r2, 2023);

      expect(r3.length).toBe(1);
    });

  });


  describe("exportación IEEE", () => {

    test("exportIEEE debe devolver strings", () => {
      const lista = gestor.buscarPorPalabraClave("AI");
      const ieee = gestor.exportIEEE(lista);

      expect(typeof ieee[0]).toBe("string");
      expect(ieee.length).toBe(3);
    });

  });


  describe("toIEEE de cada clase", () => {

    test("ArticuloRevista", () => {

      const articulo = new ArticuloRevista(
        "Test",
        ["Autor"],
        ["AI"],
        "Resumen",
        new Date("2023-01-01"),
        10,
        "Elsevier",
        "Journal",
        1,
        1
      );

      const ref = articulo.toIEEE();

      expect(ref).toContain("Journal");
      expect(ref).toContain("vol.");
    });


    test("CapituloLibro", () => {

      const cap = new CapituloLibro(
        "Test",
        ["Autor"],
        ["AI"],
        "Resumen",
        new Date("2023-01-01"),
        10,
        "Springer",
        "Libro"
      );

      const ref = cap.toIEEE();

      expect(ref).toContain("in Libro");
    });


    test("ContribucionCongreso", () => {

      const conf = new ContribucionCongreso(
        "Test",
        ["Autor"],
        ["AI"],
        "Resumen",
        new Date("2023-01-01"),
        10,
        "IEEE",
        "Conferencia"
      );

      const ref = conf.toIEEE();

      expect(ref).toContain("Conferencia");
    });


    test("TFG", () => {

      const tfg = new TFG(
        "TFG Test",
        ["Autor"],
        ["AI"],
        "Resumen",
        new Date("2023-01-01"),
        20,
        "ULL",
        "Universidad de La Laguna"
      );

      const ref = tfg.toIEEE();

      expect(ref).toContain("Bachelor thesis");
    });


    test("TFM", () => {

      const tfm = new TFM(
        "TFM Test",
        ["Autor"],
        ["AI"],
        "Resumen",
        new Date("2023-01-01"),
        20,
        "ULL",
        "Universidad de La Laguna"
      );

      const ref = tfm.toIEEE();

      expect(ref).toContain("Master thesis");
    });

  });


  describe("print()", () => {

    test("print debe llamar a console.table", () => {

      const spy = vi.spyOn(console, "table").mockImplementation(() => {});

      gestor.print();

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });

  });


  describe("printResult()", () => {

    test("printResult debe llamar a console.table", () => {

      const spy = vi.spyOn(console, "table").mockImplementation(() => {});

      const lista = gestor.buscarPorPalabraClave("AI");

      gestor.printResult(lista);

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    });

  });

});