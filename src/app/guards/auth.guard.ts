import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private router: Router, private tokenService: TokenService) { }
  
  canActivate(): boolean {
    if (this.tokenService.isValidToken()) {
      return true;
    }
    console.log('Guard working... unauthorized.');
    this.tokenService.clearData();
    this.router.navigate(['']);
    return false;
  }
  
}
