import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Chat } from '../interfaces/chat';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore, private auth:AuthService) { }

  public SendMensaje(mensaje) {
      this.db.collection('chats').add(mensaje).then(ret => {
      }).catch(err => {
      });
  }

  GetChat() {
    return this.db.collection('chats').snapshotChanges().pipe(map(mesas => {
      return mesas.map(mesa => {
        const data = mesa.payload.doc.data() as Chat;
        data.lado = data.usuario == this.auth.getUsuario()['id']? 'end':'start';
        return data;
      });
    }));
    
  }

}
