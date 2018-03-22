import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { PublicationService } from '../../services/publication.service';

@Component({
	selector: 'publicationstemplate',
	templateUrl: './publications.component.html',
	providers:[UserService,PublicationService]

})
export class PublicationsComponent implements OnInit{
	public title:string;
	public identity;
	public token;
	public url:string;
	public status: string;
	public page;
	public total;
	public pages;
	public itemsPerPage;
	public publicationsArray: Publication[];
	@Input() user:string;

	constructor(private _userService: UserService,private _publicationService: PublicationService, private _router: Router, private _route: ActivatedRoute){
		this.title="Publications";
		this.identity= this._userService.getIdentity();
		this.token= this._userService.getToken();
		this.url = GLOBAL.url;
		this.page =1;
	}
	ngOnInit(){
		console.log('Publication component cargado');
		this.getUserPublications(this.user,this.page);
	}
	getUserPublications(user,page,adding =false){
		this._publicationService.getUserPublications(this.token,user,page).subscribe(
			response =>{
				console.log(response);
				if(response.publications){
					this.total= response.total_items;
					this.pages= response.pages;
					this.itemsPerPage = response.items_per_page;

					if(!adding){
						this.publicationsArray= response.publications;	
					}else{
						var ArrayA = this.publicationsArray;
						var ArrayB = response.publications;
						this.publicationsArray = ArrayA.concat(ArrayB);
						$("html, body").animate({scrollTop: $('html').prop("scrollHeight")},500);
					}
					
					this.status='success';

					if(page > this.pages){
						this._router.navigate(['/home']);
					}
				}else{
					this.status='error';
				}
			},
			error=>{
				var errorMessage=<any>error;
				console.log(errorMessage);
				if(errorMessage !=null){
					this.status ='error';
				}
			}
		);
	}
	public noMore =false;
	viewMore(){
		this.page +=1;
		if(this.page == this.pages){
			this.noMore= true;		
		}
		this.getUserPublications(this.user,this.page,true);
	}

}