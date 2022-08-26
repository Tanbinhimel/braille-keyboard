import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {SHA256, enc} from "crypto-js";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {
  collectionName: string;

  constructor(private angularFirestore: AngularFirestore) {
    this.collectionName = `${environment.databasePath}`;
  }

  public setDataToFirestoreDatabase(name: string, data: any) {
    if(name === ''){
      return {status: 'failed'};
    }

    try {
      const uniqueId = SHA256(this.getCurrentDateTime() + name).toString(enc.Hex);
      this.angularFirestore.collection(this.collectionName).doc(uniqueId).set(data).then();
      return {status: 'success'}
    } catch (e) {
      return {status: 'failed'}
    }
  }

  private getCurrentDateTime() {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return `${date}_${time}`;
  }
}
