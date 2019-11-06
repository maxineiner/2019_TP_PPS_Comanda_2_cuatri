import { Component, OnInit } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { SmartAudioService } from 'src/app/services/smart-audio.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Roles } from 'src/app/models/enums/roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  rolesEnum = Roles;

  validation_messages = {
    'mail': [
      { type: 'required', message: 'Debe ingresar un email.' },
      { type: 'email', message: 'Debe ingresar un email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Debe ingresar una contraseña.' }
    ]
  };

  constructor(/*private authService: AuthService,*/ private formBuilder: FormBuilder, private toastService: ToastService
    , private router: Router, private smartAudioService: SmartAudioService, private vibration: Vibration) {
    this.form = this.formBuilder.group({
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  /*onSubmitLogin() {
    this.authService.login(this.form.get('mail').value, this.form.get('password').value)
      .then(res => {
        console.log(res);
        this.smartAudioService.play('login');
        this.vibration.vibrate(500);
        this.router.navigate(['/main']);
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
          this.toastService.errorToast('Usuario no encontrado.');
        } else if (error.code === 'auth/wrong-password') {
          this.toastService.errorToast('Contraseña incorrecta.');
        } else {
          this.toastService.errorToast('Ocurrió un error, contáctese con el administrador.');
        }
      });
  }*/

  cargarDatos(rol: Roles) {
    switch (rol) {
      case Roles.admin:
        this.form.get('mail').setValue('admin@gmail.com');
        this.form.get('password').setValue('111111');
        break;
      case Roles.invitado:
        this.form.get('mail').setValue('invitado@gmail.com');
        this.form.get('password').setValue('222222');
        break;
        case Roles.usuario:
        this.form.get('mail').setValue('usuario@gmail.com');
        this.form.get('password').setValue('333333');
        break;
        case Roles.anonimo:
        this.form.get('mail').setValue('anonimo@gmail.com');
        this.form.get('password').setValue('444444');
        break;
        case Roles.tester:
        this.form.get('mail').setValue('tester@gmail.com');
        this.form.get('password').setValue('555555');
        break;
    }
  }
}
