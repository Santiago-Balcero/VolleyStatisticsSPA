import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "@environments/environment";
import { NewPlayer } from "@models/newPlayer.model";
import { checkToken } from "@interceptors/auth.interceptor";
import { Player } from '../models/player.model';


@Injectable({
  providedIn: "root"
})
export class PlayerService {
  
  private playerToEdit = new BehaviorSubject<any>({});
  
  constructor(private http: HttpClient) { }
  
  playersUrlApi: string = `${environment.API_URL}/players`;
  
  // Add {context: checkToken()} to every method on which token is needed
  getPlayerById(): Observable<any> {
    return this.http.get<{data: any, detail: any}>(`${this.playersUrlApi}/player`, {context: checkToken()}).pipe(
        map(response => (
            this.toFrontPlayer(response.data)
        ))
    );
  }

  registerNewPlayer(newPlayer: NewPlayer): Observable<any> {
    return this.http.post(this.playersUrlApi, this.toBackNewPlayer(newPlayer));
  }

  private toBackNewPlayer(newPlayer: NewPlayer): any {
    return {
        first_name: newPlayer.firstName,
        last_name: newPlayer.lastName,
        category: newPlayer.category,
        position: newPlayer.position,
        email: newPlayer.email,
        password: newPlayer.password
    }
  }

  private toFrontPlayer(p: any): Player {
    return {
        email: p.email,
        firstName: p.first_name,
        lastName: p.last_name,
        category: p.category,
        position: p.position,
        totalGames: p.total_games,
        attackPoints: p.attack_points,
        attackNeutrals: p.attack_neutrals,
        attackErrors: p.attack_errors,
        totalAttacks: p.total_attacks,
        attackEffectiveness: p.attack_effectiveness,
        blockPoints: p.block_points,
        blockNeutrals: p.block_neutrals,
        blockErrors: p.block_errors,
        totalBlocks: p.total_blocks,
        blockEffectiveness: p.block_effectiveness,
        servicePoints: p.service_points,
        serviceNeutrals: p.service_neutrals,
        serviceErrors: p.service_errors,
        totalServices: p.roral_services,
        serviceEffectiveness: p.service_effectiveness,
        defensePerfects: p.defense_perfects,
        defenseNeutrals: p.defense_neutrals,
        defenseErrors: p.defense_errors,
        totalDefenses: p.total_defenses,
        defenseEffectiveness: p.defense_effectiveness,
        receptionPerfects: p.reception_perfects,
        receptionNeutrals: p.reception_neutrals,
        receptionErrors: p.reception_errors,
        totalReceptions: p.total_receptions,
        receptionEffectiveness: p.reception_effectiveness,
        setPerfects: p.set_perfects,
        setNeutrals: p.set_neutrals,
        setErrors: p.set_errors,
        totalSets: p.total_sets,
        setEffectiveness: p.set_effectiveness,
        totalPoints: p.total_points,
        totalPerfects: p.total_perfects,
        totalNeutrals: p.total_neutrals,
        totalErrors: p.total_errors,
        totalActions: p.total_actions,
        totalEffectiveness: p.total_effectiveness,
        playerCreationDateTime: p.player_creation_date_time,
        teams: p.teams,
        totalTeams: p.total_teams,
    }
  }

  editPlayer(player: Player): void {
    this.playerToEdit.next({
      firstName: player.firstName,
      lastName: player.lastName,
      category: player.category,
      position: player.position,
      email: player.email
    })
  }

  getPlayerToUpdate(): Observable<any> {
    return this.playerToEdit.asObservable();
  }

}