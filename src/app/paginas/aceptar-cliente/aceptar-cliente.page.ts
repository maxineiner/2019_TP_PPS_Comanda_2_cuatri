import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Cliente } from 'src/app/interfaces/usuario';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { timer } from 'rxjs';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-aceptar-cliente',
  templateUrl: './aceptar-cliente.page.html',
  styleUrls: ['./aceptar-cliente.page.scss'],
})
export class AceptarClientePage implements OnInit {
  clientes: any= [];
  constructor( private clienteServe:AuthService,private emailComposer: EmailComposer, private alert:AlertService) {}

  ngOnInit() {
    this.clienteServe.GetUsuariosAceptar().then(clientes=>{
        this.clientes = clientes;
     timer(3000).subscribe(()=>{this.TomarUsuarios();})
      console.log(clientes)
    })

  }

  TomarUsuarios() {
    console.log("liufgasdoifgusidoau")
    if(this.clienteServe.getUsuario()['perfil']){
      this.clienteServe.GetUsuariosAceptar().then(clientes=>{
          this.clientes = clientes;
        console.log(clientes)
        timer(10000).subscribe(()=>{this.TomarUsuarios();})
      })
    }

  }

  AceptarCliente(cliente){
    cliente.activo = true;
    this.clienteServe.ModificarUsuario(cliente);
    this.SendAcceptedEmail(cliente);
    this.ngOnInit()

  }

  SendAcceptedEmail(cliente:Cliente) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send

      }
    });
    this.alert.mensaje("Cliente Aceptado","")
    let email:EmailComposerOptions = {
      to: cliente.mail,
      cc: '',
      bcc: [],
      attachments: [
      ],
      subject: 'Code for Food: Tu cuenta ha sido validada',
      body: 'Por favor entra a nuestra aplicacion para poder acceder a tu cuenta',
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email).then(ret => { console.log(ret) }).catch(err => { console.log(err); });

  }

  SendNotAcceptedEmail(cliente:Cliente) {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send

      }
    });
    let email:EmailComposerOptions = {
      to: cliente.mail,
      cc: '',
      bcc: [],
      attachments: [
      ],
      subject: 'Code for Food: Tu cuenta no ha sido validada',
      body: 'Usted no ha pasado la validacion del supervisor para poder acceder a este local.',
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email).then(ret => { console.log(ret) }).catch(err => { console.log(err); });

  }

  BorrarCliente(cliente){
    this.clienteServe.BorrarUsuario(cliente)
    this.alert.mensaje("Cliente Borrado","")
    this.ngOnInit()
    // console.log(this.clientes.findIndex(cliente))
  }
}
