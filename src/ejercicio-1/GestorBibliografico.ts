import { ElementoBibliografico } from "./ElementoBibliografico";

/**
 * Clase encargada de gestionar una colección de elementos bibliográficos.
 * 
 * Permite almacenar referencias, realizar búsquedas, aplicar filtros
 * y exportar resultados en formato IEEE.
 */
export class GestorBibliografico {

  /**
   * Lista interna de elementos bibliográficos almacenados.
   */
  private elementos: ElementoBibliografico[] = [];

  /**
   * Añade un nuevo elemento bibliográfico al gestor.
   * 
   * @param item Elemento bibliográfico que se desea almacenar.
   */
  add(item: ElementoBibliografico) {
    this.elementos.push(item);
  }

  /**
   * Muestra todos los elementos almacenados en formato tabla.
   */
  print(): void {
    const tabla = this.elementos.map(e => ({
      titulo: e.titulo,
      autores: e.autores.join(", "),
      fecha: e.fechaPublicacion.toISOString().split("T")[0],
      paginas: e.paginas,
      editorial: e.editorial,
      tipo: e.constructor.name
    }));

    console.table(tabla);
  }

  /**
   * Muestra una lista de resultados en formato tabla.
   * 
   * @param resultados Lista de elementos bibliográficos a mostrar.
   */
  printResult(resultados: ElementoBibliografico[]): void {
    console.table(
      resultados.map(e => ({
        titulo: e.titulo,
        autores: e.autores.join(", "),
        fecha: e.fechaPublicacion.toISOString().split("T")[0],
        paginas: e.paginas,
        editorial: e.editorial,
        tipo: e.constructor.name
      }))
    );
  }

  /**
   * Busca elementos que contengan una palabra clave concreta.
   * 
   * @param keyword Palabra clave a buscar.
   * @returns Lista de elementos que contienen dicha palabra clave.
   */
  buscarPorPalabraClave(keyword: string): ElementoBibliografico[] {
    return this.elementos.filter(e =>
      e.palabrasClave.includes(keyword)
    );
  }

  /**
   * Filtra una lista de elementos por título.
   */
  filtrarPorTitulo(lista: ElementoBibliografico[], titulo: string): ElementoBibliografico[] {
    return lista.filter(e =>
      e.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }

  /**
   * Filtra una lista de elementos por autor.
   */
  filtrarPorAutor(lista: ElementoBibliografico[], autor: string): ElementoBibliografico[] {
    return lista.filter(e =>
      e.autores.some(a => a.toLowerCase().includes(autor.toLowerCase()))
    );
  }

  /**
   * Filtra una lista de elementos por año de publicación.
   */
  filtrarPorFecha(lista: ElementoBibliografico[], year: number): ElementoBibliografico[] {
    return lista.filter(e =>
      e.fechaPublicacion.getFullYear() === year
    );
  }

  /**
   * Filtra una lista de elementos por editorial.
   */
  filtrarPorEditorial(lista: ElementoBibliografico[], editorial: string): ElementoBibliografico[] {
    return lista.filter(e =>
      e.editorial.toLowerCase().includes(editorial.toLowerCase())
    );
  }

  /**
   * Exporta una lista de elementos bibliográficos en formato IEEE.
   * 
   * @param lista Lista de elementos a exportar.
   * @returns Lista de cadenas formateadas en IEEE.
   */
  exportIEEE(lista: ElementoBibliografico[]): string[] {
    return lista.map(e => e.toIEEE());
  }
}