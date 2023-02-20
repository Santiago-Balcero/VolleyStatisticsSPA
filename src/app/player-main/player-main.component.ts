import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['./player-main.component.css']
})
export class PlayerMainComponent implements OnInit {

  playerId: string = localStorage.getItem("playerId");

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    console.log(this.playerId);
    this.playerService.getPlayerById(this.playerId).subscribe(
      (result: any) => {
        console.log(result);
      },
      (error: any) => {
        console.log(error);
      }
    );

  }

}
