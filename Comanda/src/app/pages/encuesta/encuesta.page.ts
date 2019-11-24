import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Encuesta } from 'src/app/model/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  form: FormGroup;

  preguntas = [
    { pregunta: 'De las siguientes opciones ¿cuales mejoraria?', tipo: 'checkbox', respuesta: '', opciones: ['Iluminación','Limpieza','Servicio de espera']},
    { pregunta: '¿Cuan satisfecho quedo con el servicio brindado?', tipo: 'radio', respuesta: '', opciones: ['Muy satisfecho','Poco satisfecho','Nada satisfecho']},
    { pregunta: 'Del 1 al 5 ¿cual es la posibilidad de que nos recomiende?', tipo: 'range', respuesta: '', opciones: [1,2,3,4,5]},
    { pregunta: '¿Quedo conforme con la variedad del menu?', tipo: 'select', respuesta: '', opciones: ['SI','NO']},
    { pregunta: '¿Que mejoraria, agregaria o quitaria al lugar?', tipo: 'input', respuesta: '', opciones: []}
  ]

  opcionesCheck = [
    { id: 1, opcion: 'Iluminación', checked: false },
    { id: 2, opcion: 'Limpieza', checked: false },
    { id: 3, opcion: 'Servicio de espera', checked: false }
  ];

  opcionesRadio = [
    { id: 1, opcion: 'Muy satisfecho', checked: false },
    { id: 2, opcion: 'Poco satisfecho', checked: false },
    { id: 3, opcion: 'Nada satisfecho', checked: false }
  ];

  selectedArray: Array<any> = [];
  rangeValue: any;

  constructor(
    private encuestaService: EncuestaService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      checkbox: new FormControl(this.selectedArray, [Validators.required]),
      radio: new FormControl(null, [Validators.required]),
      range: new FormControl(null, [Validators.required]),
      select: new FormControl(null, [Validators.required]),
      input: new FormControl(null, [Validators.required])
    });
  }

  selectOptionCheck(data) {
    let index = this.selectedArray.indexOf(data);
    if (index > -1) {
      this.selectedArray.splice(index, 1);
    } else {
      this.selectedArray.push(data.opcion);
    }
  }

  async register() {
    this.form.get('checkbox').setValue(this.selectedArray);

    this.preguntas.forEach(p => {
      p.tipo === 'checkbox' ? p.respuesta = this.form.controls['checkbox'].value
      : p.tipo === 'radio' ? p.respuesta = this.form.controls['radio'].value
        : p.tipo === 'range' ? p.respuesta = this.form.controls['range'].value
          : p.tipo === 'select' ? p.respuesta = this.form.controls['select'].value
            : p.respuesta = this.form.controls['input'].value
    });

    await this.encuestaService.save(this.preguntas);
    this.presentAlertSuccess('Muchas gracias por su opinion, su respuesta se registro con exito')
  }

  async presentAlertSuccess(mensaje) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensaje,
      buttons: [
        {
          text: '',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['home']);
          }
        }
      ]
    });

    await alert.present();
  }

}
