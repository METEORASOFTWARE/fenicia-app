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

  constructor (
    private fotosService: fotosService,
    private truequeService:TruequeService,
    private authService:AuthService,
    private loadingController:LoadingController,
    ) {
    this.fotos = this.fotosService.fotos;
  }

  async tomarFoto () {
    await this.fotosService.agregarFoto();
    // console.log(this.fotos);
  }

  async enviarFormulario() {

    var tokenGenerated = await this.authService.generateToken();
    await this.presentLoading();

    this.createDataTruque();

  }

  createDataTruque(){
    
    this.truequeService.getNextId().subscribe(
      (respuesta) => {

        const nextId = respuesta.data[0][""];

        this.truequeService.getPar().subscribe(
          (respuesta) => {
            const parData = respuesta.data[0];
            const productData = {
              'codigo': parData.A29_PRE+nextId,
              'unidad':'U',
              'nombre': this.nombreDelServicio,
              'usuario':'FE-0000001',
              'descripcion': this.descripcionDelServicio,
              'agrextra': 224
            }

            console.log(productData);

            this.truequeService.createProduct(productData).subscribe(
              (respuesta) => {
                console.log(respuesta);
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
      duration: 3000 // Puedes ajustar la duración según tus necesidades
    });

    await loading.present();
  }
}
