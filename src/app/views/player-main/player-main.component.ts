import { Component, OnInit } from '@angular/core';
import { PlayerService } from '@services/player.service';
import { Router } from '@angular/router';
import { StarRatingService } from '../../services/star-rating.service';
import { labelConstants } from '@constants/labels.constants';
import { ModalService } from '@services/modal.service';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-player-main',
  templateUrl: './player-main.component.html',
  styleUrls: ['../../../styles.css']
})
export class PlayerMainComponent implements OnInit {
    
  player: any = null;
  newGameButtonLabel: string = '';
  newTeamButtonLabel: string = '';
  loading: boolean = false;

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private starService: StarRatingService,
    private modalService: ModalService,
    private menuService: MenuService
  ) { }
    
  ngOnInit(): void {
    this.loading = true;
    this.menuService.sendMenuData({currentView: 'main'});
    this.newGameButtonLabel = labelConstants.START_GAME_LBL;
    this.newTeamButtonLabel = labelConstants.NEW_TEAM_LBL;
    this.getPlayerData();
  }

  private getPlayerData(): void {
    this.playerService.getPlayerById().subscribe({
      next: (data) => {
        console.log('Data from player: ', data);
        this.player = data;
        this.starService.showStars(this.player.totalEffectiveness);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.modalService.showModal(error.error, 'error');
        this.router.navigate(['']);
      }
    });
  }

  editPlayer(): void {
    this.playerService.editPlayer(this.player);
    this.router.navigate(['/account']);
  }

  // DELETE
  ja() {
    this.player.totalEffectiveness -= 0.1
    this.starService.showStars(Math.round(this.player.totalEffectiveness * 100) / 100)
  }

}
