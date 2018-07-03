import { Pool, Client } from 'pg';

export class StormDatabase {
    databaseClient: Client;


    // constructor(host: string, user: string, password: string, database: string){
    // }

    constructor(host: string, user: string, password: string, database: string, port?: number) {
        if (port !== undefined) port = 5432;

        this.databaseClient = new Client({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port,
        });
    }

    connect = () => {
        this.databaseClient.connect();
    }

    query = (sql: string) => {
        this.databaseClient.query(sql);
    }


}