import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionDataService } from '@services/session-data.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor (private router: Router, private sessionDataService: SessionDataService) { }
  
  canActivate(): boolean {
    if (this.sessionDataService.getToken()) {
      console.log('Guard working... session is active.');
      this.router.navigate(['main']);
      return false;
    }
    return true;
  }
  
}
