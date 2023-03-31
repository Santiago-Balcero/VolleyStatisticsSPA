import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PlayerMainComponent } from './views/player-main/player-main.component';
import { RegisterFormComponent } from './views/register-form/register-form.component';

const routes: Routes = [
  {path: "", title: "Welcome to Volley Statistics", component: LoginComponent},
  {path: "player", title: "Player Main Dashboard", component: PlayerMainComponent},
  {path: "register", title: "Register to be part of Volley Statistics", component: RegisterFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
