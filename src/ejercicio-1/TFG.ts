import { ElementoBibliografico } from "./ElementoBibliografico";

/**
 * Representa un Trabajo de Fin de Grado (TFG).
 *  
 * Extiende la clase {@link ElementoBibliografico} añadiendo
 * información específica como el nombre de la universidad.
 */
export class TFG extends ElementoBibliografico {

  /**
   * Crea una instancia de un trabajo de fin de grado.
   * 
   * @param titulo Título del trabajo.
   * @param autores Autor o autores.
   * @param palabrasClave Palabras clave.
   * @param resumen Resumen del trabajo.
   * @param fechaPublicacion Fecha de defensa o publicación.
   * @param paginas Número de páginas.
   * @param editorial Institución responsable.
   * @param universidad Universidad donde se presentó el trabajo.
   */
  constructor(
    titulo: string, 
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: Date, 
    paginas: number,
    editorial: string,
    public universidad: string
    ) { super(titulo, autores, palabrasClave, resumen, fechaPublicacion, paginas, editorial);}

  toIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," Bachelor thesis, ${this.universidad},  ${this.fechaPublicacion.toISOString().split("T")[0]}.`;
  }
}