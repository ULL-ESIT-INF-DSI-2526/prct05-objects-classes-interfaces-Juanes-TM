import { ElementoBibliografico } from "./ElementoBibliografico";

/**
 * Representa un capítulo perteneciente a un libro.
 * 
 * Extiende la clase {@link ElementoBibliografico} añadiendo
 * información específica como el nombre del libro.
 */
export class CapituloLibro extends ElementoBibliografico {

  /**
   * Crea un nuevo capítulo de libro.
   * 
   * @param titulo Título del capítulo.
   * @param autores Lista de autores.
   * @param palabrasClave Palabras clave.
   * @param resumen Resumen del capítulo.
   * @param fechaPublicacion Fecha de publicación.
   * @param paginas Número de páginas.
   * @param editorial Editorial del libro.
   * @param tituloLibro Título del libro al que pertenece el capítulo.
   */
  constructor(
    titulo: string, 
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: Date, 
    paginas: number,
    editorial: string,
    public tituloLibro: string
    ) { super(titulo, autores, palabrasClave, resumen, fechaPublicacion, paginas, editorial);}

  toIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," in ${this.tituloLibro}, ${this.editorial},  ${this.fechaPublicacion.toISOString().split("T")[0]}.`;
  }
}