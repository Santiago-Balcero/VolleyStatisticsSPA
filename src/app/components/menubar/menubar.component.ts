import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LabelConstants } from '../../utils/constants/labels.constants';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SessionDataService } from 'src/app/services/session-data.service';

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
  
  constructor(private router: Router, location: Location) {
    this.location = location;
  }
  
  ngOnInit(): void {
    if(SessionDataService.isAuth()) {
      this.buttonLabel = LabelConstants.LOGOUT_BTN;
      this.items = [
        {label: LabelConstants.HOME_LBL},
        {label: LabelConstants.MY_TEAMS_LBL},
        {label: LabelConstants.ABOUT_LBL}
      ];
    }
    else {
      this.buttonLabel = this.location.path() === '/register' ? LabelConstants.LOGIN_BTN : LabelConstants.REGISTER_BTN;
      this.items = [
        {label: LabelConstants.HOME_LBL, routerLink: ['']},
        {label: LabelConstants.ABOUT_LBL}
      ];
    }
  }

  onClick(): void {
    if(SessionDataService.isAuth()) {
      SessionDataService.clearData();
      console.log('Data from session was cleared.')
      this.router.navigate(['']);
    }
    if (this.location.path() === '/register') {
      this.router.navigate(['']);
    }
    else {
      this.router.navigate(['register'])
    }
  }

}
