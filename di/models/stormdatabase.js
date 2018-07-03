"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class StormDatabase {
    constructor(host, user, password, database, port) {
        this.connect = () => {
            this.databaseClient.connect();
        };
        if (port !== undefined)
            port = 5432;
        this.databaseClient = new pg_1.Client({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port,
        });
    }
}
exports.StormDatabase = StormDatabase;
//# sourceMappingURL=stormdatabase.js.map