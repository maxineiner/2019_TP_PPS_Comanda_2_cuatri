import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AltaJefeComponent } from './componentes/alta-jefe/alta-jefe.component';
import { AltaMesaComponent } from './componentes/alta-mesa/alta-mesa.component';
import { SelectorComponent } from './componentes/selector/selector.component';

const routes: Routes = [
  {path : "altaJefe" , component : AltaJefeComponent},
  {path : "altaMesa" , component : AltaMesaComponent},
  {path : "" , component : SelectorComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
