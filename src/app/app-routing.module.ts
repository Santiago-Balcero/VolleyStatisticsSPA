import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PlayerMainComponent } from './views/player-main/player-main.component';
import { RegisterFormComponent } from './views/register-form/register-form.component';
import { AuthGuard } from "@guards/auth.guard";
import { RedirectGuard } from '@guards/redirect.guard';
import { PlayerTeamsComponent } from './views/player-teams/player-teams.component';

const routes: Routes = [
  {path: "", title: "Welcome to Volley Statistics", component: LoginComponent, canActivate: [RedirectGuard]},
  {path: "main", title: "Player Main Dashboard", component: PlayerMainComponent, canActivate: [AuthGuard]},
  {path: "register", title: "Register to be part of Volley Statistics", component: RegisterFormComponent, canActivate: [RedirectGuard]},
  {path: "teams", title: "Player teams", component: PlayerTeamsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
