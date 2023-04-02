import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['./player-main.component.css']
})
export class PlayerMainComponent implements OnInit {

  player: any = {};

  constructor(private playerService: PlayerService, private router: Router) { }
    
  ngOnInit(): void {
    this.getPlayerData();
  }

  private getPlayerData(): void {
    this.playerService.getPlayerById().subscribe({
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
