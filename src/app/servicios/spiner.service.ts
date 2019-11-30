import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinerService {
  constructor(private loadingCtrl: LoadingController) { }

  public async GetAllPageSpinner(messageSpinner) {
    const loader = await this.loadingCtrl.create({
      spinner: 'bubbles',
      keyboardClose: true,
      message: messageSpinner !== '' ? messageSpinner : undefined,
      showBackdrop: false
    });

    return loader;
  }
}