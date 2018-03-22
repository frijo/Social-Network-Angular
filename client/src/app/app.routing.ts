import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

//IMPORTAR SERVICIOS
import { UserGuard } from './services/user.guard';

const appRoutes: Routes =[
	
	{path: '',component: HomeComponent},
	{path: 'login',component: LoginComponent},
	{path: 'register',component: RegisterComponent},
	{path: 'home',component: HomeComponent},
	{path: 'mis-datos',component: UserEditComponent,canActivate:[UserGuard]},
	{path: 'gente',component: UsersComponent,canActivate:[UserGuard]},
	{path: 'gente/:page',component: UsersComponent,canActivate:[UserGuard]},
	{path: 'timeline',component: TimelineComponent,canActivate:[UserGuard]},
	{path: 'profile/:id',component: ProfileComponent,canActivate:[UserGuard]},
	{path: 'following/:id/:page',component: FollowingComponent,canActivate:[UserGuard]},
	{path: 'followed/:id/:page',component: FollowedComponent,canActivate:[UserGuard]},
	{path: '**',component: HomeComponent} //la ruta '**' significa cuando se digita cualquier ruta q no exista te redirije al Home
];
export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);