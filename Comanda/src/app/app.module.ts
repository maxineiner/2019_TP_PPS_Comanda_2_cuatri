import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Camera } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ZBar } from '@ionic-native/zbar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { MesasModalPage } from './modals/mesas-modal/mesas-modal.page';
import { DetallePedidoModalPage } from './modals/detalle-pedido-modal/detalle-pedido-modal.page';

const firebaseConfig = {
  apiKey: 'AIzaSyAWUuOEwKZrD3jBv6Jxq-DmQ-hZSdNupiw',
  authDomain: 'comanda-b3a06.firebaseapp.com',
  databaseURL: 'https://comanda-b3a06.firebaseio.com',
  projectId: 'comanda-b3a06',
  storageBucket: 'comanda-b3a06.appspot.com',
  messagingSenderId: '352992039655',
  appId: '1:352992039655:web:4f42327f3ecd44248b0842'
};

@NgModule({
  declarations: [AppComponent, MesasModalPage, DetallePedidoModalPage],
  entryComponents: [MesasModalPage, DetallePedidoModalPage],
  imports: [BrowserModule
    , IonicModule.forRoot()
    , AppRoutingModule
    , AngularFireModule.initializeApp(firebaseConfig)
    , AngularFireAuthModule
    , AngularFirestoreModule
    , NgxPermissionsModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    ZBar,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
