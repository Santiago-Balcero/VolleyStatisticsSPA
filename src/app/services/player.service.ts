import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { NewPlayer } from "@models/newPlayer.model";
import { checkToken } from "@interceptors/auth.interceptor";


@Injectable({
  providedIn: "root"
})
export class PlayerService {
  
  constructor(private http: HttpClient) { }
  
  playersUrlApi: string = `${environment.API_URL}/players`;
  
  // Add {context: checkToken()} to every method on which token is needed
  getPlayerById(): Observable<any> {
    return this.http.get(`${this.playersUrlApi}/player`, {context: checkToken()});
  }

  registerNewPlayer(newPlayerData: NewPlayer): Observable<any> {
    return this.http.post(this.playersUrlApi, newPlayerData);
  }

}