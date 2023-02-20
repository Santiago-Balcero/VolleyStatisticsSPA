import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LabelConstants } from '../utils/constants/labels.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  items: MenuItem[];

  buttonLabel: string;

  logged: boolean;
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    if(localStorage.getItem("token")) {
      this.logged = true;
    }
    if(this.logged) {
      this.buttonLabel = LabelConstants.LOGOUT_BTN;
      this.items = [
        {label: LabelConstants.HOME_LBL},
        {label: LabelConstants.MY_TEAMS_LBL},
        {label: LabelConstants.ABOUT_LBL}
      ];
    }
    else {
      this.buttonLabel = LabelConstants.REGISTER_BTN;
      this.items = [
        {label: LabelConstants.ABOUT_LBL}
      ];
    }
  }

  onClick(): void {
    if(this.logged) {
      localStorage.clear();
      console.log("LocalStorage was cleared")
      this.router.navigate([""]);
    }
    else {
      console.log("Navigate to register form")
      // NAVIGATE TO REGISTER FORM
    }
  }

}
