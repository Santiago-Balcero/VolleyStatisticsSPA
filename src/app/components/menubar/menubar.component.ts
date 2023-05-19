import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { labelConstants } from '@constants/labels.constants';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { MenuService } from '@services/menu.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  items: MenuItem[] = [];
  buttonLabel: string = '';
  logged: boolean = false;
  dataView: any = {};
  
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private menuService: MenuService
    ) {
}

ngOnInit(): void {
  this.menuService.getMenuData().subscribe(
    data => {
      if (data) {
        console.log('Data received in menu:', data);
        this.dataView = data;
      }
      this.setMenuItems();
    }
  );
}

  private setMenuItems(): void {
    if (this.dataView.currentView === 'main') {
      this.logged = true;
      this.items = [
        {label: labelConstants.HOME_LBL, routerLink: '/main', icon: 'home'},
        {label: labelConstants.MY_TEAMS_LBL, routerLink: '/teams', icon: 'groups'},
        {label: labelConstants.MY_GAMES_LBL, routerLink: '/games', icon: 'sports_volleyball'},
        {label: labelConstants.ABOUT_LBL, icon: 'info'},
        {label: labelConstants.SETTINGS_LBL, icon: 'settings'}
      ];
    }
    else if (this.dataView.currentView === 'login' || this.dataView.currentView === 'register'){
      this.logged = false;
      this.buttonLabel = this.dataView.currentView === 'register' ? labelConstants.LOGIN_BTN : labelConstants.REGISTER_BTN;
      this.items = [
        {label: labelConstants.HOME_LBL, routerLink: '', icon: 'home'},
        {label: labelConstants.ABOUT_LBL, icon: 'info'}
      ];
    }
  }

  onClick(): void {
    if (this.dataView.currentView === 'main') {
      this.tokenService.clearData();
      this.router.navigate(['']);
    }
    else if (this.dataView.currentView === 'register') {
      this.router.navigate(['']);
    }
    else if (this.dataView.currentView === 'login'){
      this.router.navigate(['register'])
    }
  }

}
