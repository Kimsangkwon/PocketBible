import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Meditation} from "../models/Meditation.model";

@Injectable({
  providedIn: 'root'
})
export class MeditationDALService {

  database = inject(DatabaseService)

  constructor() {

  }
  insert(meditation: Meditation): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Meditations"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const meditationStore = transaction.objectStore("Meditations");
      const req = meditationStore.add(meditation);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: mediation added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Meditation[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Meditations"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const mediationStore = transaction.objectStore("Meditations");

      const req = mediationStore.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };


    });
  }

  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Meditations"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const meditationStore = transaction.objectStore("Meditations");

      const req = meditationStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });

  }

  update(meditation: Meditation): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Meditations"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const meditationStore = transaction.objectStore("Meditations");

      const reqUpdate = meditationStore.put(meditation);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }

  delete(meditation: Meditation): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Meditations"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const meditationStore = transaction.objectStore("Meditations");
      if (meditation.id) {
        const reqDelete = meditationStore.delete(meditation.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("meditation does not have id")
      }

    });
  }
  deleteAll():Promise<any>{
    return new Promise((resolve, reject)=>{
      const transaction = this.database.db.transaction(["Meditations"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: deleteAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in deleteAll transaction: " + event);
      };
      const meditationStore = transaction.objectStore("Meditations");
      const req = meditationStore.clear();
      req.onsuccess = (event: any)=>{
        console.log("Success: All meditations deleted successfully");
        resolve(event);
      }
      req.onerror = (event: any)=>{
        console.log("Error: Error in Meditations deleteAll");
        reject(event);
      }
    })
  }
}
