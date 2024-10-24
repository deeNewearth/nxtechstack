import { Injectable } from "@nestjs/common";
import { MongoClient } from 'mongodb';

@Injectable()
export class DbService{
    private readonly _uri = process.env["MONGO_CONNECTION"] || 'mongodb://localhost/?directConnection=true';
    private readonly _connection = new MongoClient(this._uri);
    
    
    readonly db = this._connection.db("kisses");  
  

}