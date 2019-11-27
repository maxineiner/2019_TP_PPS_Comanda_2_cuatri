import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//alfa
import { LoginComponent } from './componentes/login/login.component';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { MenuClienteComponent } from './componentes/menu-cliente/menu-cliente.component';
//beta
import { MenuJefeComponent } from './componentes/menu-jefe/menu-jefe.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { PedirMesaClienteComponent } from './componentes/pedir-mesa-cliente/pedir-mesa-cliente.component';
import { HacerPedidoClienteComponent } from './componentes/hacer-pedido-cliente/hacer-pedido-cliente.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'registro',component:AltaClienteComponent},
  {path:'menu-cliente',component:MenuClienteComponent, children:[
    {path:'pedir-mesa-cliente',component:PedirMesaClienteComponent},
    {path:'hacer-pedido-cliente',component:HacerPedidoClienteComponent},
  ]},
//beta
  {path : "menu-jefe" , component : MenuJefeComponent , children :[
    {path : "lista" , component : ListaComponent , pathMatch : "full"}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
