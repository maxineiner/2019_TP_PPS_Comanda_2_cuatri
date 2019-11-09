import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  constructor(
    private qrScanner: QRScanner,
    private comandaService: ComandaServiceService,
    private authService: AuthService,
    public navCtrl: NavController,
    public alertController: AlertController) { }

  ngOnInit() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            if (text === 'Lista_de_espera') {
              this.comandaService.addListaEspera(this.authService.currentUserEmail(), this.authService.currentUserId());
            } else {
              this.presentAlert();
            }

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El codigo qr no es valido.',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.navigateRoot('home');
        }
      }]
    });
    await alert.present();
  }

}
