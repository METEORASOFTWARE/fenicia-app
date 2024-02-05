import { Component } from '@angular/core';
import {fotosService} from './../../servicios/fotos.service';
import { TruequeService } from 'src/app/servicios/trueque.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-trueque',
  templateUrl: './trueque.component.html'
})
export class TruequeComponent {

  fotos: string[];
  nextId: number| null = null;
  nombreDelServicio: string = '';
  descripcionDelServicio: string = '';
  idCurrent:any;
  parFenicia:any;

  constructor (
    private fotosService: fotosService,
    private truequeService:TruequeService,
    private authService:AuthService,
    private loadingController:LoadingController,
    ) {
    this.fotos = this.fotosService.fotos;
    this.authService.generateToken();
  }

  _sendFotos(){
    debugger;
    this.fotos.map((f)=>{

    });
  }

  async tomarFoto () {
    await this.fotosService.agregarFoto();
  }

  async enviarFormulario() {

    var tokenGenerated = await this.authService.generateToken();
    this.presentLoading();
    this.createDataTruque();
  }

  createDataTruque(){

    this.truequeService.getNextId().subscribe(
      (respuesta) => {

        this.idCurrent = respuesta.data[0][""];
        this.idCurrent = this.idCurrent.toString().padStart(7, '0');
        this.authService.generateToken();
        
        this.truequeService.getPar().subscribe(
          (respuesta) => {
            const parData = respuesta.data[0];

            this.parFenicia = parData;

            var productData = new URLSearchParams();
            productData.append("codigo", parData.A29_PRE+this.idCurrent);
            productData.append("unidad", "U");
            productData.append("nombre", this.nombreDelServicio);
            productData.append("usuario", "FE-0000001");
            productData.append("descripcion", this.descripcionDelServicio);
            productData.append("agrextra", "224");

            this.authService.generateToken();

            this.truequeService.createProduct(productData).subscribe(
              (respuesta) => {
                console.log(respuesta);
                
                if(respuesta.success){
                  this._sendFotos();
                }
                else{
                  alert(respuesta.message);
                }
              },
              (error) => {
                console.error(error);
              }
            );
          },
          (error) => {
            console.error(error);
          }
        );

        this.loadingController.dismiss();
      },
      (error) => {
        console.error(error);

        this.loadingController.dismiss();
      }
    );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 3000
    });

    await loading.present();
  }
}
