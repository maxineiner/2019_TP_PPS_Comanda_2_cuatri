import { AlertService } from 'src/app/servicios/alert.service';
import { Component } from '@angular/core';
import { ReservasService } from 'src/app/servicios/reservas.service';
import { Reserva } from 'src/app/interfaces/reserva';

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.page.html',
  styleUrls: ['./confirmar-reserva.page.scss'],
})
export class ConfirmarReservaPage {
  public reservasPendientes: Reserva[];

  constructor(private reservasService: ReservasService, private alert: AlertService) {
    this.reservasService.getReservasPendientes().subscribe(reservasPend => { this.reservasPendientes = reservasPend; });
  }

  public confirmarReserva(reserva) {
    reserva.estado = 'confirmada';
    this.reservasService.updateReserva(reserva).then(() => {
      this.alert.mensaje('', 'Reserva confirmada!');
    }).catch(error => { this.alert.mensaje('ERROR', error); });
  }

  public rechazarReserva(reserva) {
    reserva.estado = 'rechazada';
    this.reservasService.updateReserva(reserva).then(() => {
      this.alert.mensaje('', 'Reserva rechazada!');
    }).catch(error => { this.alert.mensaje('ERROR', error); });
  }
}
