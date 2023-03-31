import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { SessionDataService } from '../../services/session-data.service';

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['./player-main.component.css']
})
export class PlayerMainComponent implements OnInit {

  playerId: string;

  player: any = {};

  constructor(private playerService: PlayerService, private router: Router) {
    this.playerId = SessionDataService.getPlayerId();
    console.log('Player id: ', this.playerId);
    this.getPlayerData(this.playerId);
  }

  ngOnInit(): void {
  }

  private getPlayerData(playerId: string): void {
    this.playerService.getPlayerById(this.playerId).subscribe({
      next: (data) => {
        console.log('Data from player: ', data);
        this.player = data;
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['']);
      }
    });
  }

}
