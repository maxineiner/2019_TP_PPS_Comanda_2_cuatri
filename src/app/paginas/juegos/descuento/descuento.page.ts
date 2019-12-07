import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';
import { AlertService } from 'src/app/servicios/alert.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { MesasService } from 'src/app/servicios/mesas.service';
import { MesaCliente } from 'src/app/interfaces/mesa-cliente';

@Component({
  selector: 'app-descuento',
  templateUrl: './descuento.page.html',
  styleUrls: ['./descuento.page.scss'],
})
export class DescuentoPage implements OnInit {
  public numSecreto: number;
  public respuesta: string;
  public contador: number;
  public respondio: boolean;
  private usuario;
  private mesaActual: MesaCliente;

  constructor(private alertServ: AlertService, private authServ: AuthService,
    private mesasServ: MesasService) {
      this.usuario = this.authServ.getUsuario();
      this.mesasServ.getMesasClientes().subscribe( (data) => {
        data.forEach(mc => {
          if (mc.idCliente === this.usuario.id && !mc.cerrada) {
            this.mesaActual = mc;
          }
        });
      });
    }

  ngOnInit() {
    this.numSecreto = 0;
    this.contador = 0;
    this.respondio = false;
    this.numSecreto = Math.floor(Math.random() * (10 - 1) + 1);
    console.log('Numero Secreto: ' + this.numSecreto);
  }
  public NuevoNumero() {
    this.numSecreto = Math.floor(Math.random() * (10 - 1) + 1);
    console.log('Numero Secreto: ' + this.numSecreto);
    this.respondio = false;
    this.contador = 0;
    this.respuesta = '';
    this.alertServ.mensaje('Nuevo número!', 'Suerte esta vez!');
  }

  public VerificarNumero() {
    const resp = Number.parseInt(this.respuesta, 10);
    const correctResp = Number.parseInt(this.numSecreto.toString(), 10);
    this.contador++;
    if (resp === correctResp) {
      this.respondio = true;
      if (this.contador === 1) {
        this.alertServ.mensaje('Adivinaste!', 'Y al primer intento te ganaste el 10% de descuento!!');
        this.mesaActual.juegoDescuento = 1;
      } else {
        this.alertServ.mensaje('Adivinaste!', 'Pero no ganaste el descuento!! ');
      }
    } else {
      this.alertServ.mensaje('Equivocado!', 'Intento nro: ' + this.contador);
      this.respondio = false;
      this.mesaActual.juegoDescuento = -1;
    }
    this.mesasServ.updateMesaCliente(this.mesaActual);
  }
}
