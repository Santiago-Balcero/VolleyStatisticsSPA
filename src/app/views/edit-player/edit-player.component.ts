import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.css']
})
export class EditPlayerComponent implements OnInit {
  
  player: any = {};

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.playerService.getPlayerToUpdate().subscribe(
      data => {
        console.log('Player data received to accounts view:', data);
        this.player = data;
      }
    )
  }

}
