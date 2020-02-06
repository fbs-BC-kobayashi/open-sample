import * as MongoDB from 'mongodb';

const url = 'mongodb://localhost:27017';
export const dbName = 'nekoblog';

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