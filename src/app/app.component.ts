import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from "./servicios/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showSplash =true;
  notShowSplash=false;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private publicRouter:Router,
    private auth:AuthService
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=>{this.notShowSplash=true;})
      timer(3000).subscribe(()=>{this.showSplash=false;})
    });
  }
  home(){
    this.publicRouter.navigate(['/home'])

  }
  LogOut(){
    this.auth.LogOut();
    this.publicRouter.navigate(['/log-in'])
  }
}
