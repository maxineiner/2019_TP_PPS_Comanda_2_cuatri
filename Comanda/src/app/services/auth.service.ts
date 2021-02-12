import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/internal/operators/map';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth,private firestore: AngularFirestore ) { }

  logIn(email:string, password:string){

    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email,password).then(user => {
        resolve(user);
      }).catch(err =>rejected(err));
    });
    
  }

  currentUserId() {
    return this.AFauth.auth.currentUser.uid;
  }

  currentUserEmail() {
    return this.AFauth.auth.currentUser.email;
  }
  
  logOut(){
    this.AFauth.auth.signOut();
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(data => {
        resolve(data);
      }).catch(err => reject(err));
    });    
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData))
        .catch(err => reject(err));
    });
  }

    getRolwithEmail(idAuth:string)
    {    
      return this.firestore.collection('Rol_User').snapshotChanges().pipe(map((clientes) => {
          return clientes.map((a) => {
            
              const data = a.payload.doc.data();
              // data.id = a.payload.doc.id;
              return data;
            

          });
        }));
    }

}


