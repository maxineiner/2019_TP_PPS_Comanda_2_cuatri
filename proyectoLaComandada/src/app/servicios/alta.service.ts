import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Entidad} from '../modals/entidad';
import { ToastController } from '@ionic/angular';
import { Mesa } from '../modals/mesa';
@Injectable({
  providedIn: 'root'
})
export class AltaService {

  refEntidad : AngularFirestoreCollection<Entidad>;
  refMesa : AngularFirestoreCollection<Mesa>;

  constructor(private bd : AngularFirestore,private auth : AngularFireAuth , private toastController: ToastController){ 
     this.refEntidad = this.bd.collection("entidades");
     this.refMesa = this.bd.collection("mesas");
  }


  async altaeEntidad(objeto : Entidad){

    try{
       let result = await this.auth.auth.createUserWithEmailAndPassword(objeto.correo,objeto.clave);
       if(result != null){
        try{
          this.refEntidad.add({nombre : objeto.nombre ,apellido : objeto.apellido , dni : objeto.dni , cuit : objeto.cuit , perfil : objeto.perfil , foto : objeto.foto , correo : objeto.correo , clave : objeto.clave});
          return true;
        }
        catch(e){
           alert(e);
          alert(e.message);
        }
       } 
       
    }
    catch(e){
      if(e.message == "The email address is badly formatted."){
        this.presentToast("Correo electronico inválido","primary");
      }
      else if(e.message == "The email address is already in use by another account."){
        this.presentToast("Correo electronico ya utilizado. Esta seguro de que no se registro?","primary");
      }
      else if(e.message == "Password should be at least 6 characters"){
        this.presentToast("Contraseña inválida. Su contraseña debe contener como minimo 6 caracteres","primary");
      }
      console.log(e);
      return false;
    }
  }
  async presentToast(msj : string , color : string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      color : color
    });
    toast.present();
  }
  altaMesa(mesa : Mesa){
     this.refMesa.add(mesa);
  }
  traerMesas(){
    return this.refMesa.valueChanges();
  }
}
