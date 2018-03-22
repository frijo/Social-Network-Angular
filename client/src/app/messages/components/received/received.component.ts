import {Component, OnInit, DoCheck} from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { Follow } from '../../../models/follow';
import { FollowService } from '../../../services/follow.service';
import { GLOBAL } from '../../../services/global';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'received',
	templateUrl: './received.component.html',
	providers: [UserService, FollowService,MessageService]

})
export class ReceivedComponent implements OnInit{
	public title:string;
	public identity;
	public token;
	public url:string;
	public status: string;
	public follows: Follow;
	public messages: Message[];
	public page;
	public next_page;
	public prev_page;
	public pages;
	public total;
	
	constructor(
		private _followService: FollowService,
		private _messageService: MessageService, 
		private _router: Router,
		private _route: ActivatedRoute,
		private _userService: UserService
	){
		this.title = 'Mensajes Recibidos';
		this.identity= this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}
	ngOnInit(){
		console.log('Received Component cargado');
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
			this.getMessages(this.token,page);
					
		});
	}
	getMessages(token,page){
		this._messageService.getMyMessages(token,page).subscribe(
			response =>{
				
				if(!response.messages){
					this.status='error';
				}else{
					this.pages = response.pages;
					this.total = response.total;
					this.status='success';
					this.messages = response.messages;	
					console.log(this.messages);
				}
				
			},error=>{
				this.status='error';
				console.log(<any>error);
			}
		);
	}
}