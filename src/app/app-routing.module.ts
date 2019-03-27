import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
 
const routes: Routes = [

    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'games',
        component: GamesComponent
    },
    {
        path: 'admin',
        component: AdminPanelComponent
    },
    {
        path: 'games/:id',
         component: GameDetailsComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }