import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class fotosService {

  fotos: string [] = [];

  constructor() { 
    console.log("mensaje: fotos.service")
  }

  async agregarFoto(){
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      height: 1000,
      quality: 10
    });
    if (foto.webPath) {
      this.fotos.unshift(foto.webPath);
    }
  }
}
