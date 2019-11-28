import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule } from '@angular/forms';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { AltaClienteService } from './servicios/alta-cliente.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { config } from './firebase';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/servicios/login.service';
import { MenuClienteComponent } from './componentes/menu-cliente/menu-cliente.component';
//beta
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { MenuJefeComponent } from './componentes/menu-jefe/menu-jefe.component'
import { ListaComponent } from './componentes/lista/lista.component';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { PedirMesaClienteComponent } from './componentes/pedir-mesa-cliente/pedir-mesa-cliente.component';
import { MesaClienteService } from './servicios/mesa-cliente.service';
import { SplashComponent } from './componentes/splash/splash.component';
import { HacerPedidoClienteComponent } from './componentes/hacer-pedido-cliente/hacer-pedido-cliente.component';
import { PedidosClienteService } from './servicios/pedidos-cliente.service';

@NgModule({
  declarations: [AppComponent,
  LoginComponent,
  AltaClienteComponent,
  MenuClienteComponent,
  MenuJefeComponent,
  ListaComponent,
  NombreApellidoPipe,
  SplashComponent,
  PedirMesaClienteComponent,
  HacerPedidoClienteComponent,
],
  entryComponents: [],
  imports: [BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    RouterModule,
    AngularFireAuthModule
],
  providers: [
    StatusBar,
    Camera,
    SplashScreen,
    BarcodeScanner,
    AngularFirestore,
    AltaClienteService,
    AngularFireAuth,
    LoginService,
    MesaClienteService,
    PedidosClienteService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
