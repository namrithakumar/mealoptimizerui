import { Injectable } from "@angular/core";
import { IDBPDatabase, openDB } from "idb";
import { RequestDB } from "./request-db";

@Injectable({ providedIn : 'root' })
export class IndexedDBService {

    private db : IDBPDatabase<RequestDB>;
    private dbName = 'request-db';

    private error;

    constructor() {
        this.connectToDB();
    }

    async connectToDB() {
        this.db = await openDB<RequestDB>(this.dbName, 1, {
            upgrade(db) {
                db.createObjectStore('failed-request-store');
            }
        });
    }

    //Called inside ConnectionLossInterceptor
    addFailedRequest(failedRequest:any, tag : string) {
        return this.db.put('failed-request-store', failedRequest, tag);
    }

    deleteRequest(tag : string) {
        return this.db.delete('failed-request-store', tag);
    }

    async getAllEntries() : Promise<Map<string, any>> {
        let entries : Map<string, any> = new Map();
        let request = this.db.transaction(['failed-request-store'], 'readonly')
                             .objectStore('failed-request-store')
                             .openCursor();
        await request.then((event) => {
            if (event) {
                let key = event.primaryKey;
                let value = event.value;
                entries.set(key, value);
                event.continue();
            }
        })
        .catch((err) => this.error = err);        
        
        return new Promise((resolve, reject) => {
            resolve(entries);
            reject(this.error);
        });
    }
}