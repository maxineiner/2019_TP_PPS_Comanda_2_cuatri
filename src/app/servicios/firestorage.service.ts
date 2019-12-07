import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private fireStorage: AngularFireStorage) { }

  async uploadFotoToFirebase(dataFoto: string) {
    const picName = (new Date()).getTime().toString();
    const respuesta = await this.fireStorage.storage.ref(picName).putString(dataFoto, 'base64', { contentType: 'image/jpeg' }).
    then((uploadFoto) => {
      return uploadFoto.ref.getDownloadURL().then(downloadLink => {
        return downloadLink.toString();
      });
    });

    return respuesta;
  }
}
