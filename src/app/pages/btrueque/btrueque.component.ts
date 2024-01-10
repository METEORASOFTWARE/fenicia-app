import { Component, OnInit } from '@angular/core';
import { FeniciaWsService } from '../../servicios/fenicia-ws.service';

@Component({
  selector: 'app-btrueque',
  templateUrl: './btrueque.component.html'
})
export class BtruequeComponent implements OnInit {

  tipos:any
  token:any

  constructor(public tipo: FeniciaWsService) {
    console.log('constructo')

  }

 ngOnInit(){
   console.log('OnInit')
   this.tipo.obtenerServiceEjemplo().subscribe((data) =>{
     console.log(data)
     debugger;
     this.tipos=data;
   }) 
  /*   this.tipo.ObtenerTipicas().then((result:any) =>{
     console.log(result)
   })   */
/*   this.tipo.ObtenerTipicas()
    .subscribe(

      (data)=> { 
        console.log(data)
        // this.tipos=data;
      
      },
      (error)=> {console.log(error);}

    ) */
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
