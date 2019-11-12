import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { MenuJefeComponent } from './componentes/menu-jefe/menu-jefe.component'
import { ListaComponent } from './componentes/lista/lista.component';
import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
const firebaseConfig = {
  apiKey: "AIzaSyC-UMfVeQNeMx1AQ2m9Mgktwf5w5o9YZAE",
  authDomain: "lacomanda-c1055.firebaseapp.com",
  databaseURL: "https://lacomanda-c1055.firebaseio.com",
  projectId: "lacomanda-c1055",
  storageBucket: "lacomanda-c1055.appspot.com",
  messagingSenderId: "503253383760",
  appId: "1:503253383760:web:755ebaceea1ba83ce2af55",
  measurementId: "G-FF8H5K31XZ"
}
@NgModule({
  declarations: [AppComponent,MenuJefeComponent,ListaComponent, NombreApellidoPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    RouterModule,
    AngularFireAuthModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
