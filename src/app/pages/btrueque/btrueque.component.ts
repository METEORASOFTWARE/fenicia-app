import { Component, OnInit } from '@angular/core';
import { FeniciaWsService } from '../../servicios/fenicia-ws.service';
import { TruequeService } from 'src/app/servicios/trueque.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-btrueque',
  templateUrl: './btrueque.component.html'
})
export class BtruequeComponent implements OnInit {

  tipos:any
  token:any

  constructor(public tipo: FeniciaWsService, private truequeService:TruequeService,private authService:AuthService) {
  }

  	private async _getTrueque(){

		var tokenGenerated = await this.authService.generateToken();

		await this.truequeService.getTrueque().subscribe(
			response => {
				
				if( response.success ){

					this.tipos = response.data;
				}
				else{

					alert( 'la Api envío errores' );
				}
			},
			error => {
			  console.error(error);
			  alert('ocurrio un error inesperado');
			}
		  );
		// this.tipos=data;
	}

  ngOnInit(){
	console.log('OnInit');

	this._getTrueque();
  }
  ionViewDidLoad(){


/*     this.tipo.ObtenerToken()
    .subscribe(
      (data)=> { this.token=data;},
      (error)=> {console.log(error);}

    ) */

 /*    this.tipo.ObtenerTipos()
    .subscribe(
      (data)=> { this.tipos=data;},
      (error)=> {console.log(error);}

    ) */
  }
}