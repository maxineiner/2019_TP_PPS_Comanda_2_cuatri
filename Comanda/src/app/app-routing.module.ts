import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { NoLogInGuard } from './guard/no-log-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard]},
  { path: 'alta/:typeEmployed', loadChildren: './pages/alta/alta.module#AltaPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [NoLogInGuard]},
<<<<<<< HEAD
  { path: 'alta-productos', loadChildren: './pages/alta-productos/alta-productos.module#AltaProductosPageModule'},  { path: 'lista-espera', loadChildren: './pages/lista-espera/lista-espera.module#ListaEsperaPageModule' },
=======
  { path: 'alta-productos', loadChildren: './pages/alta-productos/alta-productos.module#AltaProductosPageModule', canActivate: [AuthGuard]},
  { path: 'alta-mesa', loadChildren: './pages/alta-mesa/alta-mesa.module#AltaMesaPageModule', canActivate: [AuthGuard]},  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'lista-espera-registro', loadChildren: './pages/lista-espera-registro/lista-espera-registro.module#ListaEsperaRegistroPageModule' },
>>>>>>> develop


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
