import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TruequeComponent } from './pages/trueque/trueque.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { BtruequeComponent } from './pages/btrueque/btrueque.component';

import { FeniciaWsService } from './servicios/fenicia-ws.service';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    TruequeComponent,
    ComunidadComponent,
    BtruequeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FeniciaWsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
