import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "@environments/environment";
import { SessionDataService } from "@services/session-data.service";
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient, private sessionDataService: SessionDataService) { }

  loginUrlApi: string = `${environment.API_URL}/access/login`;

  login(email: string, password: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return this.http.post<{access_token: string}>(this.loginUrlApi, formData).pipe(
      // tap operator doesn't changes any workflow done with this observable,
      // it only makes an operation before sending data to subscribers
      tap(result => {
        console.log(result);
        this.sessionDataService.setToken(result.access_token);
        const tokenInfo: any = jwtDecode(result.access_token);
        this.sessionDataService.setPlayerId(tokenInfo.sub);
      })
    );
  }

}