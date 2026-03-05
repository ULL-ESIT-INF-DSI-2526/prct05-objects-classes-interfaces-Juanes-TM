import { Participante } from "./participante";

export class Jugador extends Participante {
  constructor(
    _id: number, 
    _nombre: string, 
    _pais: string, 
    _fechaInscripcion: Date, 
    _puntuacion: number, 
    private _gamertag: string,
    private _rango: string,
    private _numPartidas: number){
      super(_id, _nombre, _pais, _fechaInscripcion, _puntuacion);
  }

  get gamertag() {return this._gamertag;}
  get rango() {return this._rango;}
  get numPartidas() {return this._numPartidas;}

  set gamertag(gamertag) {this._gamertag = gamertag;}
  set rango(rango) {this._rango = rango;}
  set numPartidas(numPartidas) {this._numPartidas = numPartidas;}

  perfil(): string {return (`Jugador ${this.gamertag} con rango ${this.rango} y con ${this.numPartidas} partidas jugadas.`);};
}