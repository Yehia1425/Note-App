import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { notAuthGuard } from './core/guards/notAuth/not-auth.guard';

export const routes: Routes = [
    {path:"", redirectTo:"home" , pathMatch:"full"},
    {path:"home" , canActivate:[authGuard]  , component:HomeComponent , title:"Home Page"},
    {path:"login" , canActivate:[notAuthGuard] , component:LoginComponent , title:"Login Page"},
    {path:"register" , component:RegisterComponent , title:"Register Page"},
    {path:"**" , component:NotFoundComponent , title:"Not Found Page"},
];
