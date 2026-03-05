/**
 * Clase abstracta que representa un elemento bibliográfico genérico.
 * 
 * Contiene la información común a todos los tipos de referencias
 * bibliográficas que pueden almacenarse en el gestor.
 * 
 * Esta clase sirve como base para otros tipos de elementos como
 * artículos de revista, contribuciones a congresos, capítulos de libro
 * o trabajos académicos.
 */
export abstract class ElementoBibliografico {

  /**
   * Crea una instancia de un elemento bibliográfico.
   * 
   * @param titulo Título del elemento bibliográfico.
   * @param autores Lista de autores del elemento.
   * @param palabrasClave Palabras clave asociadas al contenido.
   * @param resumen Breve descripción o resumen del contenido.
   * @param fechaPublicacion Fecha de publicación del elemento.
   * @param paginas Número de páginas del documento.
   * @param editorial Editorial responsable de la publicación.
   */
  constructor(
    public titulo: string, 
    public autores: string[],
    public palabrasClave: string[],
    public resumen: string,
    public fechaPublicacion: Date, 
    public paginas: number,
    public editorial: string
  ) {}

  abstract toIEEE(): string;
}