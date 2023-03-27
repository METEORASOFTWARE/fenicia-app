import { Component } from '@angular/core';
import {fotosService} from './../../servicios/fotos.service';

@Component({
  selector: 'app-trueque',
  templateUrl: './trueque.component.html'
})
export class TruequeComponent {

  fotos: string[] = [];

  constructor (
    private fotosService: fotosService
  ) { 
    this.fotos = this.fotosService.fotos;
  }

  async tomarFoto () {
    await this.fotosService.agregarFoto();
  }
}
