import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { labelConstants } from '@constants/labels.constants';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  items: MenuItem[] = [];

  buttonLabel: string = '';

  logged: boolean = false;

  location: Location; 
  
  constructor(private router: Router, location: Location,
    private tokenService: TokenService) {
    this.location = location;
  }
  
  ngOnInit(): void {
    this.setLabels();
  }

  onClick(): void {
    if(this.tokenService.isValidToken()) {
      this.tokenService.clearData();
      this.router.navigate(['']);
    }
    else if (this.location.path() === '/register') {
      this.router.navigate(['']);
    }
    else if (!this.tokenService.isValidToken()){
      this.router.navigate(['register'])
    }
  }

  private setLabels(): void {
    if(this.tokenService.isValidToken()) {
      this.logged = true;
      this.buttonLabel = labelConstants.LOGOUT_BTN;
      this.items = [
        {label: labelConstants.HOME_LBL, routerLink: '/main', icon: 'home'},
        {label: labelConstants.MY_TEAMS_LBL, routerLink: '/teams', icon: 'groups'},
        {label: labelConstants.MY_GAMES_LBL, routerLink: '/games', icon: 'sports_volleyball'},
        {label: labelConstants.ABOUT_LBL, icon: 'info'},
        {label: labelConstants.SETTINGS_LBL, icon: 'settings'}
      ];
    }
    else {
      this.logged = false;
      this.buttonLabel = this.location.path() === '/register' ? labelConstants.LOGIN_BTN : labelConstants.REGISTER_BTN;
      this.items = [
        {label: labelConstants.HOME_LBL, routerLink: '', icon: 'home'},
        {label: labelConstants.ABOUT_LBL, icon: 'info'}
      ];
    }
  }

}
