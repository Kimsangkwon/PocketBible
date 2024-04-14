import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Friend} from "../models/Friend.model";

@Injectable({
  providedIn: 'root'
})
export class FriendDALService {

  database = inject(DatabaseService)

  constructor() {

  }
  insert(friend: Friend): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Friends"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const friendStore = transaction.objectStore("Friends");
      const req = friendStore.add(friend);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: friend added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Friend[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Friends"]);

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const friendStore = transaction.objectStore("Friends");

      const req = friendStore.getAll();
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
      const transaction = this.database.db.transaction(["Friends"]);

      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const friendStore = transaction.objectStore("Friends");

      const req = friendStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });

  }

  update(friend: Friend): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Friends"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const friendStore = transaction.objectStore("Friends");

      const reqUpdate = friendStore.put(friend);

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

  delete(friend: Friend): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["Friends"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const friendStore = transaction.objectStore("Friends");
      if (friend.id) {
        const reqDelete = friendStore.delete(friend.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("friend does not have id")
      }

    });
  }
  deleteAll():Promise<any>{
    return new Promise((resolve, reject)=>{
      const transaction = this.database.db.transaction(["Friends"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: deleteAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in deleteAll transaction: " + event);
      };
      const friendStore = transaction.objectStore("Friends");
      const req = friendStore.clear();
      req.onsuccess = (event: any)=>{
        console.log("Success: All friends deleted successfully");
        resolve(event);
      }
      req.onerror = (event: any)=>{
        console.log("Error: Error in deleteAll");
        reject(event);
      }
    })
  }
}
