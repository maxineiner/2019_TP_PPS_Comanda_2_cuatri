import { Component, OnInit } from '@angular/core';
import { EncuestasService } from 'src/app/servicios/encuestas.service';
import { FirestorageService } from 'src/app/servicios/firestorage.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Empleado } from 'src/app/interfaces/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-encuesta-supervisor',
  templateUrl: './encuesta-supervisor.page.html',
  styleUrls: ['./encuesta-supervisor.page.scss'],
})
export class EncuestaSupervisorPage implements OnInit {
  empleado = '';
  empleados = [];
  public limpieza: number;
  public amabilidad: string;
  public rapido: boolean;
  public calidadBebida: boolean;
  public atencion: boolean;
  public destacado: boolean;
  public salonYAmbiente: boolean;
  public mal: string;
  public comentarios: string;
  public urlFoto1: string;
  public urlFoto2: string;
  public urlFoto3: string;
  public usuario: any;
  amabilidad_dest:any;
  velocidad_dest:any;
  puntualidad_dest:any;
  limpieza_dest:any;

  constructor(private encuestasService: EncuestasService, private firestorageService: FirestorageService, private auth: AuthService, private alertController: AlertController) {
    this.limpieza = 6;
    this.rapido = false;
    this.calidadBebida = false;
    this.atencion = false;
    this.destacado = false;
    this.salonYAmbiente = false;
    this.urlFoto1 = '';
    this.urlFoto2 = '';
    this.urlFoto3 = '';
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit() {
    this.tomarEmpleados()
  }

  tomarEmpleados() {
    this.auth.GetUsuarios().then(ret => {
      ret.forEach(usr => {
        let emp = usr.data() as Empleado;
        emp['id']=usr.id
        if (emp.activo && emp.cuil) {
          this.empleados.push(emp)
          console.log(this.empleados)
        }
      })
    })
  }

  EmpleadoSelect(){
    this.presentAlertRadio();
  }

  async presentAlertRadio() {
    let emp_mostrar = []

    this.empleados.forEach(emp => {
      emp_mostrar.push({
          name: emp['nombre'],
          type: 'radio',
          label: emp['nombre'] + " " +emp['apellido'],
          value: emp
        })
      }
    )

    const alert = await this.alertController.create({
      header: 'Selecciona un empleado?',
      inputs: emp_mostrar,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (empleado) => {
            this.empleado = empleado
          }
        }
      ]
    });

    await alert.present();
  }



  public enviarEncuesta() {
    console.log(this.empleado)
    this.encuestasService.addEncuestaDueño({
      idDueño: this.usuario.id,
      limpieza: this.limpieza,
      rapido: this.rapido,
      destacado: this.destacado,
      mal: this.mal === undefined ? null : this.mal === 'true' ? true : false,
      comentarios: this.comentarios === undefined ? null : this.comentarios,
      empleado: this.empleado['id'],
      amabilidad_dest:this.amabilidad_dest === undefined ? false : this.amabilidad_dest === 'true' ? true : false,
      velocidad_dest:this.amabilidad_dest === undefined ? false : this.amabilidad_dest === 'true' ? true : false,
      limpieza_dest:this.amabilidad_dest === undefined ? false : this.amabilidad_dest === 'true' ? true : false,
      puntualidad_dest:this.amabilidad_dest === undefined ? false : this.amabilidad_dest === 'true' ? true : false,
      fecha: new Date()
    }).then(() => {
      alert('Encuesta cargada exitosamente!');
    }).catch(error => { alert(error); });
  }

}
