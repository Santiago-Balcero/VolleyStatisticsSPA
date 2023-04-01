import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  constructor() { }

  setToken(token: string): void {
    setCookie('token', token, {expires: 30, path: ''});
  }

  getToken(): string {
    return getCookie('token')!;
  }

  setPlayerId(playerId: string): void {
    setCookie('playerId', playerId, {expires: 30, path: ''});
  }

  getPlayerId(): string {
    return getCookie('playerId')!;
  }

  clearData(): void {
    removeCookie('token');
    removeCookie('playerId');
    console.log('Session cookies were cleared.');
  }

}
