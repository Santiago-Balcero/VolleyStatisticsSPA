import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUrlApi: string = `${environment.API_URL}/access/login`;

  login(loginData: FormData): Observable<any> {
    return this.http.post(this.loginUrlApi, loginData);
  }

}