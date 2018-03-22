import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
	selector: 'users',
	templateUrl: './users.component.html',
	providers:[UserService,FollowService]

})
export class UsersComponent implements OnInit{
	
	public title:string;
	public token;
	public status: string;
	public identity;
	public url: string;
	public page;
	public next_page;
	public prev_page;
	public pages;
	public total;
	public users: User[];
	public follows;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _followService: FollowService
	){
		this.url = GLOBAL.url;
		this.title='Gente';
		this.identity =this._userService.getIdentity();
		this.token = this._userService.getToken();
	}
	ngOnInit(){
		console.log('Componete Users esta cargado...');
		this.actualpage();
	}
	actualpage(){
		this._route.params.subscribe(params =>{
			let page = +params['page']; // el + delante de parmans hace que el numero sea entero
			this.page = page;
			if(!params['page']){
				page =1;
			}
			if(!page){
				page =1;
			}else{
				this.next_page = page +1;
				this.prev_page = page-1;
				
				if(this.prev_page <=0){
					this.prev_page =1;
				}
			}
			this.getUsers(page);

			
		});
	}
	getUsers(page){
		this._userService.getUsers(page).subscribe(
			response =>{
				if(!response.users){
					this.status='error';
				}else{
					console.log(response);
					this.pages = response.pages;
					this.total = response.total;
					this.users = response.users;
					this.follows = response.users_following;

					console.log(this.follows);
					this.status= 'success';

					if(page > this.pages ){  //si las paginas que vienen x parametro son mayores( o simplemente no estan entre la cantidad de paginas)
					// a las paginas existentes se reenvia a la ruta gente a la pagina 1
						this._router.navigate(['/gente',1]);
					}
				}
			},
			error =>{
				
				var errorMessage = <any>error;
				console.log(errorMessage);
				
				if(errorMessage != null){
					this.status='error'
				}
			}
		);
	}
	public followUserOver;
	mouseEnter(user_id){
		this.followUserOver =user_id;
	}
	mouseLeave(user_id){
		this.followUserOver =0;
	}
	followUser(followed){
		var follow= new Follow('',this.identity._id,followed);
		this._followService.addFollow(this.token,follow).subscribe(
			response =>{
				if(!response.follow){
					this.status='error'
				}else{
					this.status='success';
					this.follows.push(followed);
					console.log('Se sigue usuario exitosamente');
				}
			},
			error=>{
				var errorMessage = <any>error;
				console.log(errorMessage);
				
				if(errorMessage != null){
					this.status='error'
				}	
			}
		);
	}
	unFollowUser(followed){
		this._followService.deleteFollow(this.token,followed).subscribe(
			response=>{
				var search = this.follows.indexOf(followed);//cuando indexOf no encuentra el objeto en el array manda el error como -1
				if(search !=-1){// si el resultado no es -1 quere decir que se encontro el objeto x lo que se sigue para quitar ese objeto del array
					this.follows.splice(search,1);// EL 1 QUIERE DECIR QUE SOLO SE VA A QUITAR UN ELEMENTO CON ESE VALOR(search) DEL ARRAY
				}
				this.status='success';
			},
			error=>{
				var errorMessage = <any>error;
				console.log(errorMessage);
				
				if(errorMessage != null){
					this.status='error'
				}
			});

	}	
}