import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db: any;

  constructor() { }
  initDatabase(){
    this.createDatabase().then(data=>{
      console.log("Database created successfully: " + data)
    }).catch(e=>{
      console.log("Error in database creation: " + e.message)
    })
  }
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MeditationDB", 2);

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
      };
    });
  }
}
