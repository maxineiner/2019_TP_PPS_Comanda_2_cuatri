import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoLogInGuard } from './guard/no-log-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]},
  { path: 'alta', loadChildren: './pages/alta/alta.module#AltaPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [NoLogInGuard]},
  { path: 'lista-espera', loadChildren: './pages/lista-espera/lista-espera.module#ListaEsperaPageModule', canActivate: [AuthGuard] },
  { path: 'alta-productos', loadChildren: './pages/alta-productos/alta-productos.module#AltaProductosPageModule', canActivate: [AuthGuard]},
  { path: 'alta-mesa', loadChildren: './pages/alta-mesa/alta-mesa.module#AltaMesaPageModule', canActivate: [AuthGuard]},
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [NoLogInGuard] },
  { path: 'lista-espera-registro', loadChildren: './pages/lista-espera-registro/lista-espera-registro.module#ListaEsperaRegistroPageModule', canActivate: [AuthGuard] },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
