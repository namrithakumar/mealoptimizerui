import { DBSchema } from "idb";

export interface RequestDB extends DBSchema {
    'failed-request-store' : {
        key : string;
        value : any;
    };
}