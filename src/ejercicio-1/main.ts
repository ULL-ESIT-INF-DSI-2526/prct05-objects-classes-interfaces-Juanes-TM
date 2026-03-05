import { ArticuloRevista } from "./ArticuloRevista";
import { CapituloLibro } from "./CapituloLibro";
import { ContribucionCongreso } from "./ContribucionCongreso";
import { TFG } from "./TFG";
import { TFM } from "./TFM";
import { GestorBibliografico } from "./GestorBibliografico";

const gestor = new GestorBibliografico();


// Crear elementos
const articulo = new ArticuloRevista(
  "Machine Learning for Energy Prediction",
  ["J. Smith", "A. Doe"],
  ["AI", "Energy"],
  "Study about ML in energy systems",
  new Date(2023, 4, 10),
  12,
  "Elsevier",
  "Energy Reports",
  9,
  3
);

const congreso = new ContribucionCongreso(
  "AI Optimization for Smart Grids",
  ["L. Brown"],
  ["AI", "Smart Grid"],
  "Optimization techniques for smart grids",
  new Date(2022, 6, 15),
  8,
  "IEEE",
  "IEEE SmartGrid Conference"
);

const capitulo = new CapituloLibro(
  "Deep Learning Techniques in Energy Systems",
  ["M. White"],
  ["Deep Learning", "Energy"],
  "DL applications in energy systems",
  new Date(2021, 2, 20),
  15,
  "Springer",
  "Advances in Energy Systems"
);

const tfg = new TFG(
  "Sistema de recomendación basado en IA",
  ["Carlos Pérez"],
  ["AI", "Recommender Systems"],
  "Recommendation system using machine learning",
  new Date(2022, 5, 30),
  65,
  "Universidad de La Laguna",
  "Universidad de La Laguna"
);

const tfm = new TFM(
  "Deep Learning aplicado a predicción energética",
  ["Laura Gómez"],
  ["Deep Learning", "Energy Forecasting"],
  "Energy forecasting using neural networks",
  new Date(2023, 7, 10),
  80,
  "Universidad de La Laguna",
  "Universidad de La Laguna"
);


// Añadir al gestor
gestor.add(articulo);
gestor.add(congreso);
gestor.add(capitulo);
gestor.add(tfg);
gestor.add(tfm);


// Mostrar inventario completo
console.log("\n=== Inventario completo ===");
gestor.print();


// Búsqueda por palabra clave
let resultados = gestor.buscarPorPalabraClave("AI");

resultados = gestor.filtrarPorAutor(resultados, "L. Brown");

console.log("\n=== Resultados búsqueda ===");

gestor.printResult(resultados);


// Exportación IEEE
console.log("\n=== Formato IEEE ===");

resultados.forEach(e => {
  console.log(e.toIEEE());
});