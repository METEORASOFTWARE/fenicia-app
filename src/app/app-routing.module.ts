import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TruequeComponent } from './pages/trueque/trueque.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { BtruequeComponent } from './pages/btrueque/btrueque.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'trueque',
    component: TruequeComponent
  },
  {
    path: 'btrueque',
    component: BtruequeComponent
  },
  {
    path: 'comunidad',
    component: ComunidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
