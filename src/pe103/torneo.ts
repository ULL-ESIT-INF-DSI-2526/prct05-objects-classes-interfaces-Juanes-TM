import { Participante } from "./participante";
import { Jugador } from "./jugador";
import { Equipo } from "./equipo";

class Torneo {
  public participantes: Participante[] = []; 
  public PlazasJugadores: number = 0;
  public PlazasEquipos: number = 0;

  add(participante: Participante) {
    if (participante instanceof Jugador) {
      if (this.PlazasJugadores > 0) this.participantes.push(participante);
      else console.log("No hay cupos para jugadores.");
    }
    else if (participante instanceof Equipo) {
      if (this.PlazasEquipos > 0) this.participantes.push(participante);
      else console.log("No hay cupos para Equipos.");      
    }
  }


  BuscarID(Sid: number): Participante | undefined {
    this.participantes.forEach(item =>{ 
      if (item.id === Sid) return item;
    })
    return undefined;
  }

    BuscarTAG(gamertag: string): Jugador | undefined {
    this.participantes.forEach(item =>{ 
      if (item instanceof Jugador) {
        if (item.gamertag === gamertag) return item;
      }
    })
    return undefined;
  }
}