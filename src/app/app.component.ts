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
export class AppComponent{
  sound;
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
      this.sound = true;
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
    if(localStorage.getItem('Sonido') == 'true')
    {
      let audio = new Audio();
      audio.src = '../assets/fin.mp3';
      audio.load();
      audio.play();
    }
    this.auth.LogOut();
    this.publicRouter.navigate(['/log-in'])
  }

  sonido(bol){
    this.sound = bol;
    localStorage.setItem('Sonido', bol);
  }
}
