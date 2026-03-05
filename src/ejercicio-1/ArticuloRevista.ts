import { ElementoBibliografico } from "./ElementoBibliografico";

/**
 * Representa un artículo publicado en una revista científica.
 * 
 * Extiende la clase {@link ElementoBibliografico} añadiendo
 * información específica como el nombre de la revista,
 * el volumen y el número de la publicación.
 */
export class ArticuloRevista extends ElementoBibliografico {

  /**
   * Crea un nuevo artículo de revista.
   * 
   * @param titulo Título del artículo.
   * @param autores Lista de autores.
   * @param palabrasClave Palabras clave asociadas.
   * @param resumen Resumen del artículo.
   * @param fechaPublicacion Fecha de publicación.
   * @param paginas Número de páginas.
   * @param editorial Editorial responsable.
   * @param revista Nombre de la revista.
   * @param volumen Volumen de la revista.
   * @param numero Número dentro del volumen.
   */
  constructor(
    titulo: string, 
    autores: string[],
    palabrasClave: string[],
    resumen: string,
    fechaPublicacion: Date, 
    paginas: number,
    editorial: string,
    public revista: string,
    public volumen: number,
    public numero: number
  ) { super(titulo, autores, palabrasClave, resumen, fechaPublicacion, paginas, editorial);}

  toIEEE(): string {
    return `${this.autores.join(", ")}, "${this.titulo}," ${this.revista}, vol. ${this.volumen}, no. ${this.numero}, ${this.fechaPublicacion.toISOString().split("T")[0]}.`;
  }
}