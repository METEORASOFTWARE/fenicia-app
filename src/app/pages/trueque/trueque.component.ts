import { Component, OnInit } from '@angular/core';
import {fotosService} from './../../servicios/fotos.service';
import { TruequeService } from 'src/app/servicios/trueque.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoadingController } from '@ionic/angular';
import { Category } from 'src/app/interface/category.interface';
import { FeniciaWsService } from 'src/app/servicios/fenicia-ws.service';

@Component({
  selector: 'app-trueque',
  templateUrl: './trueque.component.html',
  styleUrls: ['./trueque.component.css']
})
export class TruequeComponent implements OnInit {

  fotos: string[];
  nextId: number| null = null;
  nombreDelServicio: string = '';
  descripcionDelServicio: string = '';
  idCurrent:any;
  parFenicia:any;
  categories: Category[] = [];
  categoriesMajor: Category[] = [];
  categoriesMajorCurrent:Number = 0;

  constructor (
    private fotosService: fotosService,
    private truequeService:TruequeService,
    private authService:AuthService,
    private loadingController:LoadingController,
    private feniciaWsService:FeniciaWsService
    ) {
    this.fotos = this.fotosService.fotos;
    this.authService.generateToken();
  }

  ngOnInit(){
	  console.log('OnInit');

	  this._getCategory();
  }

  private async _getCategory(){

		var tokenGenerated = await this.authService.generateToken();

		await this.truequeService.getTrueque().subscribe(
			response => {
				
				if( response.success ){
          
					this.categories = response.data;
          this.categoriesMajor = response.data;

          this.categories.forEach(category => category.isSelected = false);
				}
			},
			error => {
			  console.error(error);
        this._getCategory();
			  console.warn('ocurrio un error inesperado');
			}
		);
	}

  _sendFotos(){
    
    var m = 1;
    this.fotos.map((f)=>{
      var data = {
        "codigo": this.idCurrent,
        "consecutivo": m,
        "imagen": f
      };
      this.truequeService.storeImage(data);
      m++;
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
            this.idCurrent = parData.A29_PRE+this.idCurrent;

            var productData = new URLSearchParams();
            productData.append("codigo", this.idCurrent);
            productData.append("unidad", "U");
            productData.append("nombre", this.nombreDelServicio);
            productData.append("usuario", "FE-0000001");
            productData.append("descripcion", this.descripcionDelServicio);
            productData.append("agrextra", this.categoriesMajorCurrent.toString());

            this.authService.generateToken();

            this.truequeService.createProduct(productData).subscribe(
              (respuesta) => {
                console.log(respuesta);
                
                if(respuesta.success){
                  this._sendFotos();
                }
                else{
                  console.warn(respuesta.message);
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

  getSelectedCategories() {
    return this.categories.filter(category => category.isSelected);
  }

  selectCategoryPrincipal($event:any):void{
    var selectedCategory = $event.detail.value; // Aquí obtienes el valor de la categoría seleccionada
    
    if(selectedCategory){
      this.categoriesMajorCurrent = selectedCategory.COD_NIVEL;
      this.categories = this.categoriesMajor;

      this.categories = this.categories.filter(category => category.COD_NIVEL !== this.categoriesMajorCurrent);
    }
  }
}