import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SmartAudioService } from './services/smart-audio.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { timer } from 'rxjs/internal/observable/timer';
import { SpinnerService } from './services/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash: Boolean = true;
  showSpinner: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private smartAudioService: SmartAudioService,
    private router: Router,
    private spinner: SpinnerService,
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(5000).subscribe( () => {
        this.showSplash = false;
      });

      if (this.platform.is('cordova')) {
        this.smartAudioService.preload('login', 'assets/sounds/login.mp3');
        this.smartAudioService.preload('error', 'assets/sounds/error-wooden.mp3');
        this.smartAudioService.preload('boop', 'assets/sounds/click.mp3');
        this.smartAudioService.preload('confirmation', 'assets/sounds/confirmation.mp3');
      } else {
        this.smartAudioService.preload('login', 'assets/sounds/login.mp3');
        this.smartAudioService.preload('error', 'assets/sounds/error-wooden.mp3');
        this.smartAudioService.preload('boop', 'assets/sounds/click.mp3');
        this.smartAudioService.preload('confirmation', 'assets/sounds/confirmation.mp3');
      }

      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
          if (urlAfterRedirects !== '/home' && urlAfterRedirects !== '/login') {
            this.smartAudioService.play('boop');
          }
        });
      });

      this.showSpinner = false;
      this.spinner.observableSpinner().subscribe( x => {
          this.showSpinner = x;
      });
  }
}
