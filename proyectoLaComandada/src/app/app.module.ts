import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AltaJefeComponent} from './componentes/alta-jefe/alta-jefe.component'
import {AngularFireModule} from '@angular/fire';
// import {config} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { Camera } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AltaMesaComponent } from './componentes/alta-mesa/alta-mesa.component';
import { SelectorComponent } from './componentes/selector/selector.component';
const config = {
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
  declarations: [AppComponent,AltaJefeComponent,AltaMesaComponent,SelectorComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,
  AngularFireModule.initializeApp(config),
  AngularFirestoreModule,
  AngularFireAuthModule,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    Base64,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
