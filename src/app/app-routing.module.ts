import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerMainComponent } from './player-main/player-main.component';

const routes: Routes = [
  {path: "", title: "Welcome to Volley Statistics", component: LoginComponent},
  {path: "player", title: "Player Main Dashboard", component: PlayerMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
