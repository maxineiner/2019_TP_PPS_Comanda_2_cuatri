import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private alertCtrl: ToastController) { }

  public async MostrarErrorSoloLower(messageRecieved: string) {
    console.log('Ocurrio un error:', messageRecieved);

    const alert = await this.alertCtrl.create({
      message: messageRecieved,
      duration: 2000,
      position: 'bottom'
    });

    alert.present();
  }
}
