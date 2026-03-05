
export abstract class Participante {
  constructor(
    private _id: number, 
    private _nombre: string, 
    private _pais: string, 
    private _fechaInscripcion: Date, 
    private _puntuacion: number) {
    if (_puntuacion < 0 || _nombre.length === 0 || _pais.length === 0 || _fechaInscripcion > new Date()) throw undefined;
  }

  get id() {return this._id;}
  get nombre() {return this._nombre;}
  get pais() {return this._pais;}
  get fechaInscripcion() {return this._fechaInscripcion;}
  get puntuacion() {return this._puntuacion;}
  
  set id(id) {this._id = id;}
  set nombre(nombre) {this._nombre = nombre;}
  set pais(pais) {this._pais = pais;}
  set fechaInscripcion(fechaInscripcion) {this._fechaInscripcion = fechaInscripcion;}
  set puntuacion(puntuacion) {this.puntuacion = puntuacion;}

  abstract perfil(): string;
}