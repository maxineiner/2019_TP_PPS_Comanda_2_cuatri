import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ComandaServiceService } from 'src/app/services/comanda-service.service';
import { AlertController } from '@ionic/angular';
import { ActorTypeBase } from 'src/app/model/actorTypeBase';
import { ActorType } from 'src/app/model/actorType';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {
  myForm: FormGroup;
  image: string;
  actorType: ActorTypeBase;

  constructor(
    private comandaService: ComandaServiceService,
    public alertController: AlertController,
    public camera: Camera) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      cuil: new FormControl('', Validators.required),
    });
  }

  /** funcion para tomar la foto con @ionic-native/camera/ngx */
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
    };
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.image = `data:image/jpeg;base64,${imageData}`;
      }
     }, (err) => {
      this.presentAlert(err);
     });
  }

  save() {
    this.actorType = new ActorTypeBase(
      this.myForm.get('name').value,
      this.myForm.get('lastName').value,
      this.myForm.get('dni').value,
      this.myForm.get('cuil').value,
      this.image, 'E');

    this.comandaService.saveActorType(this.actorType);

  }

  async presentAlert(err) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Error',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  async login() {
    /*try {
      const response = await this.afAuth.auth.signInWithEmailAndPassword(this.myForm.get('user').value, this.myForm.get('password').value);
      if (response) {
        this.showSpinner = false;
        localStorage.setItem('user', this.myForm.get('user').value);
        this.navCtrl.navigateRoot('welcome');
      }
    } catch (error) {
      this.clearControls();
      this.navCtrl.navigateForward(['error/', error.message]);
      // this.presentModal();
    }*/
  }

}
