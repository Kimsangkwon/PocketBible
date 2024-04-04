import {inject, Injectable} from '@angular/core';
import {BibledatabaseService} from "./bibledatabase.service";
import {Bible} from "../models/Bible.model";

@Injectable({
  providedIn: 'root'
})
export class BibleDalService {
  database = inject(BibledatabaseService);

  constructor() { }
  selectAll(): Promise<Bible[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Bible"], "readonly"); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const bibleStore = transaction.objectStore("Bible");

      const req = bibleStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };


    });
  }
  select(name: string, chapter: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Bible"]);
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const bibleStore = transaction.objectStore("Bible");
      const index = bibleStore.index("nameAndChapter");

      const req = index.get([name, chapter]);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

}
