import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SessionDataService } from './session-data.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (private sessionDataService: SessionDataService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.sessionDataService.getToken();
    if (idToken) {
      const cloned = req.clone({headers: req.headers.set("Authorization", "Bearer " + idToken)});
      console.log("Interceptor for JWT");
      console.log(req);
      return next.handle(cloned);
    }
    else {
      console.log("Interceptor");
      return next.handle(req);
    }
  }
}