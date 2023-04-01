import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionDataService } from '@services/session-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private router: Router, private sessionDataService: SessionDataService) { }
  
  canActivate(): boolean {
    if (this.sessionDataService.getToken()) {
      return true;
    }
    console.log('Guard working... unauthorized.');
    this.sessionDataService.clearData();
    this.router.navigate(['']);
    return false;
  }
  
}
