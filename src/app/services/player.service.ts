import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";


@Injectable({
  providedIn: "root"
})
export class PlayerService {
  
  constructor(private http: HttpClient) { }
  
  playersUrlApi: string = `${environment.API_URL}/players`;

  getPlayerById(playerId: string): Observable<any> {
    return this.http.get(`${this.playersUrlApi}/${playerId}`);
  }

  registerNewPlayer(newPlayerData: object): Observable<any> {
    return this.http.post(this.playersUrlApi, newPlayerData);
  }

}