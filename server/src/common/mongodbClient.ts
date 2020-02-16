import * as MongoDB from 'mongodb';

const url = 'mongodb://localhost/';
export const dbName = 'Goods';

export default function (callback: (err: MongoDB.MongoError, client: MongoDB.MongoClient, db: MongoDB.Db) => void) {
    const client = MongoDB.MongoClient;
    client.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            callback(err, null, null);
            return;
        }
        callback(null, client, client.db(dbName));
    });
}