import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['./player-main.component.css']
})
export class PlayerMainComponent implements OnInit {

  playerId: string;

  player: any = {};

  constructor(private playerService: PlayerService, private router: Router) {
    if (localStorage.getItem('playerId') != null) {
      this.playerId = localStorage.getItem('playerId')!;
      console.log('Player id: ', this.playerId);
      this.getPlayerData(this.playerId);
    }
    else {
      this.playerId = '';
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
  }

  private getPlayerData(playerId: string): void {
    this.playerService.getPlayerById(this.playerId).subscribe(
      (data: any) => {
        console.log('Data from player: ', data);
        this.player = data;
      },
      (error: any) => {
        console.log(error);
        this.router.navigate([''])
      }
    );
  }

}
