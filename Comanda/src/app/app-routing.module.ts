import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoLogInGuard } from './guard/no-log-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'alta', loadChildren: './pages/alta/alta.module#AltaPageModule'},
  { path: 'lista-espera', loadChildren: './pages/lista-espera/lista-espera.module#ListaEsperaPageModule'},
  { path: 'alta-productos', loadChildren: './pages/alta-productos/alta-productos.module#AltaProductosPageModule'},
  { path: 'alta-mesa', loadChildren: './pages/alta-mesa/alta-mesa.module#AltaMesaPageModule'},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
  { path: 'lista-espera-registro', loadChildren: './pages/lista-espera-registro/lista-espera-registro.module#ListaEsperaRegistroPageModule'},
  { path: 'lista-espera-metre', loadChildren: './pages/lista-espera-metre/lista-espera-metre.module#ListaEsperaMetrePageModule'},
  { path: 'mesas-modal', loadChildren: './modals/mesas-modal/mesas-modal.module#MesasModalPageModule'},
  { path: 'encuesta', loadChildren: './pages/encuesta/encuesta.module#EncuestaPageModule'},
  { path: 'encuesta-respuesta', loadChildren: './pages/encuesta-respuesta/encuesta-respuesta.module#EncuestaRespuestaPageModule'},
  { path: 'hacer-pedido', loadChildren: './pages/hacer-pedido/hacer-pedido.module#HacerPedidoPageModule'},
  { path: 'lista-pedidos', loadChildren: './pages/lista-pedidos/lista-pedidos.module#ListaPedidosPageModule'},
  { path: 'detalle-pedido-modal', loadChildren: './modals/detalle-pedido-modal/detalle-pedido-modal.module#DetallePedidoModalPageModule'},
  { path: 'alert-modal', loadChildren: './modals/alert-modal/alert-modal.module#AlertModalPageModule' },
  { path: 'solicitar-cuenta', loadChildren: './pages/solicitar-cuenta/solicitar-cuenta.module#SolicitarCuentaPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
