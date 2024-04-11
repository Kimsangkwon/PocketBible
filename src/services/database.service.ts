import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: any;

  constructor() { }
  initDatabase(){
    this.createDatabase().then(data=>{
      console.log("Meditation Database created successfully: " + data)
    }).catch(e=>{
      console.log("Error in Meditation database creation: " + e.message)
    })

  }
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("PocketBibleDB", 6);

      request.onerror = (event) => {
        console.error("Error in creating database!");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const meditationStore = this.db.createObjectStore("Meditations", {
          keyPath: "id",
          autoIncrement: true,
        });
        const friendStore = this.db.createObjectStore("Friends", {
          keyPath: "id",
          autoIncrement: true,
        });
      };
    });
  }
}
