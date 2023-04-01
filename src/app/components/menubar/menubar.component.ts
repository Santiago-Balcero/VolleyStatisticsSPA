import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { labelConstants } from '@constants/labels.constants';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SessionDataService } from '@services/session-data.service';

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
    private sessionDataService: SessionDataService) {
    this.location = location;
  }
  
  ngOnInit(): void {
    if(this.sessionDataService.getToken()) {
      this.buttonLabel = labelConstants.LOGOUT_BTN;
      this.items = [
        {label: labelConstants.HOME_LBL},
        {label: labelConstants.MY_TEAMS_LBL},
        {label: labelConstants.ABOUT_LBL}
      ];
    }
    else {
      this.buttonLabel = this.location.path() === '/register' ? labelConstants.LOGIN_BTN : labelConstants.REGISTER_BTN;
      this.items = [
        {label: labelConstants.HOME_LBL, routerLink: ['']},
        {label: labelConstants.ABOUT_LBL}
      ];
    }
  }

  onClick(): void {
    if(this.sessionDataService.getToken()) {
      this.sessionDataService.clearData();
      this.router.navigate(['']);
    }
    else if (this.location.path() === '/register') {
      this.router.navigate(['']);
    }
    else if (!this.sessionDataService.getToken()){
      this.router.navigate(['register'])
    }
  }

}
