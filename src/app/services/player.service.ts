import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiConstants } from "../utils/constants/api.constants";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class PlayerService {
  
  constructor(private http: HttpClient) { }
  
  loginUrlApi: string = `${ApiConstants.API_URL}/players`;

  getPlayerById(playerId: string): Observable<any> {
    return this.http.get(`${this.loginUrlApi}/${playerId}`);
  }

}