import { Component,OnInit } from '@angular/core';	
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
	selector: 'login',
	templateUrl:'./login.component.html',
	providers:[UserService]

})
export class LoginComponent implements OnInit{
	public title:string;
	public user: User;
	public status: string;
	public indentity;
	public token;
	
	constructor( private _route: ActivatedRoute,
				 private _router: Router,
				 private _userService: UserService
	){
		this.title= 'Indentificate';
		this.user = new  User("","","","","","","","");

	}
	ngOnInit(){

		console.log('Componente de Login Cargado');
	}
	onSubmit(){

		//logear al ussario y conseguir sus datos

		this._userService.singup(this.user).subscribe(
			response =>{
				this.indentity = response.user;
				console.log(this.indentity);
				if(!this.indentity || !this.indentity._id){
					this.status = 'error';
				}else{
					//this.status = 'success';
					//PERSISTIR LOS DATOS DEL USUARIO
					localStorage.setItem('identity',JSON.stringify(this.indentity));
					//conseguir token

					this.getToken();
				}

		
			},error =>{
				var errorMessage =<any>error;
				console.log(errorMessage);
				if(errorMessage !=null){
					this.status = 'error';
				}
			}
		);
	}
	getToken(){
		this._userService.singup(this.user,'true').subscribe(
			response =>{
				this.token = response.token;
				console.log(this.token);
				if(this.token.length <=0 ){
					this.status = 'error';
				}else{
					//this.status = 'success';
					//PERSISTIR LOS DATOS DEL USUARIO
					localStorage.setItem('token',this.token);
					
					//conseguir los contadores o estadisticas del ususario
					this.getCounters();
				}

		
			},error =>{
				var errorMessage =<any>error;
				console.log(errorMessage);
				if(errorMessage !=null){
					this.status = 'error';
				}
			}
		);
	}
	getCounters(){
		this._userService.getCounters().subscribe(
			response =>{
				console.log(response);
				localStorage.setItem('stats',JSON.stringify(response));
				this.status= 'success';
				this._router.navigate(['/']);
			},
			error =>{
				console.log(<any>error);
			}
		);
	}
}