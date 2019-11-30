import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/servicios/chat.service';
import { Chat } from 'src/app/interfaces/chat';
import { AuthService } from 'src/app/servicios/auth.service';
import { MesasService } from 'src/app/servicios/mesas.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  mensajes = [];
  msj='';
  usuario;
  @ViewChild(IonContent) content: IonContent;
  constructor(private chat:ChatService, private auth:AuthService) { }

  ngOnInit() {
    this.usuario = this.auth.getUsuario()
    this.chat.GetChat().subscribe(mensajes=>{
      this.mensajes = mensajes;
      this.ordenarMensajes()
    })

  }

  ordenarMensajes(){
    this.ScrollToBottom()
    console.log(this.mensajes.sort(compare))
    this.ScrollToBottom()
    
  }

  sendMessage(){
    let msj={};
    if(this.msj==''){
      return
    }
    msj['mensaje'] = this.msj;
    if(this.usuario['perfil'] == 'delivery'){
      msj['nombre']='DELIVERY: '+this.usuario['nombre']

    }
    else{
      msj['nombre']=this.usuario['apellido']+'  '+this.usuario['nombre']
    }
    const fecha = new Date();
    const anio = fecha.getFullYear().toString();
    const mes = fecha.getMonth().toString();
    let dia = fecha.getDate().toString();
    if(dia.length==1){
      dia = '0'+dia;
    }
    let hora = fecha.getHours().toString();
    if(hora.length==1){
      hora = '0'+hora;
    }
    let minuto = fecha.getMinutes().toString();
    if(minuto.length==1){
      minuto = '0'+minuto;
    }
    let seg = fecha.getSeconds().toString();
    if(seg.length==1){
      seg = '0'+seg;
    }
    msj['fecha'] = anio+' '+mes+' '+dia +' '+ hora+':'+ minuto+':'+ seg
    msj['usuario'] = this.usuario['id']
    this.chat.SendMensaje(msj)
    this.ScrollToBottom()
    this.msj = ''
  }

  ScrollToBottom(){
    this.content.scrollToBottom(100);
  }
  logScrollEnd(){
    console.log("logScrollEnd : When Scroll Ends");
  }
}


function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a.fecha.toUpperCase();
  const genreB = b.fecha.toUpperCase();

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}