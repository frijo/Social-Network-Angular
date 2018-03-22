import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
	@Component({
		selector: 'home',
		templateUrl: 'home.Component.html'
	})
export class HomeComponent implements OnInit{
	public title:string;
	public identity;
	constructor(private _userService: UserService){
		this.title = 'Bienvenido a NGSOCIAL';
		this.identity= this._userService.getIdentity();
	}
	ngOnInit(){
		console.log('Home Component cargado ...');
	}
}