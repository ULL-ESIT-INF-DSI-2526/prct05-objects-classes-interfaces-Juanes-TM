import { ElementoBibliografico } from "./ElementoBibliografico";

/**
 * Representa una contribución presentada en un congreso científico.
 *  
 * Extiende la clase {@link ElementoBibliografico} añadiendo
 * información específica como el nombre de la conferencia.
 */
export class ContribucionCongreso extends ElementoBibliografico {

  /**
   * Crea una nueva contribución a congreso.
   * 
   * @param titulo Título del trabajo.
   * @param autores Lista de autores.
   * @param palabrasClave Palabras clave.
   * @param resumen Resumen del trabajo.
   * @param fechaPublicacion Fecha de publicación.
   * @param paginas Número de páginas.
   * @param editorial Editorial o entidad organizadora.
   * @param conferencia Nombre del congreso o conferencia.
   */
  constructor(
    titulo: string, 
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: Date, 
    paginas: number,
    editorial: string,
    public conferencia: string
    ) { super(titulo, autores, palabrasClave, resumen, fechaPublicacion, paginas, editorial);}

  toIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," in ${this.conferencia}, ${this.fechaPublicacion.toISOString().split("T")[0]}.`;
  }
}