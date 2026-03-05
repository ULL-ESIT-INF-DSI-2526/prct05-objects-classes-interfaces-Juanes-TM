import { Participante } from "./participante";

export class Equipo extends Participante {
    constructor(
    _id: number, 
    _nombre: string, 
    _pais: string, 
    _fechaInscripcion: Date, 
    _puntuacion: number, 
    private _sponsor: string,
    private _integrantes: string[],
    private _numMax: number,
    private _numMin: number){
      if (_integrantes.length < _numMin || _integrantes.length > _numMax) throw(undefined);
      super(_id, _nombre, _pais, _fechaInscripcion, _puntuacion);
  }

  get sponsor() {return this._sponsor;}
  get integrantes() {return this._integrantes;}
  get numMax() {return this._numMax;}
  get numMin() {return this._numMin;}

  set sponsor(sponsor) {this._sponsor = sponsor;}
  set integrantes(integrantes) {this._integrantes = integrantes;}
  set numMax(numMax) {this._numMax = numMax;}
  set numMin(numMin) {this._numMin = numMin;}

   perfil(): string {return (`Jugadores ${this.integrantes.join(", ")} patrocinados por ${this.sponsor}.`);};
}