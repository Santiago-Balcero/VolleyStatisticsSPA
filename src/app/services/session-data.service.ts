import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

  private static token: string = '';
  private static playerId: string = '';
  private static loggedIn: boolean = false;

  constructor() { }

  static setToken(token: string): void {
    SessionDataService.token = token;
  }

  static getToken(): string {
    return SessionDataService.token;
  }

  static setPlayerId(playerId: string): void {
    SessionDataService.playerId = playerId;
  }

  static getPlayerId(): string {
    return SessionDataService.playerId;
  }

  static auth(): void {
    SessionDataService.loggedIn = true;
  }
  
  static isAuth(): boolean {
    return SessionDataService.loggedIn;
  }

  static clearData(): void {
    SessionDataService.token = '';
    SessionDataService.playerId = '';
    SessionDataService.loggedIn = false;
  }

}
