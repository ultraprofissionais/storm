import { Client } from 'pg';
export declare class StormDatabase {
    databaseClient: Client;
    constructor(host: string, user: string, password: string, database: string, port?: number);
    connect: () => void;
}
