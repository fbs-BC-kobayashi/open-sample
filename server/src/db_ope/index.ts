import { response } from "express";

/**
 * class a
 */

export default class db_ope {
    constructor() { }
    mongoClient = require('mongodb').MongoClient;

    url_ = "mongodb://localhost/";

    public insert(data: any) {
        this.mongoClient.connect(this.url_, (err, client) => {
            console.log('Connected successfully to server');
            const db = client.db('Goods');
            var goods = [
                { goods_id: data.goods_id, name: data.name , size:data.size, amount: data.amount, note: data.note },
            ];
            db.collection("goods").insertMany(goods, function (err, res) {
                if (err) throw err;
                console.log("insert success!")
                client.close();
            });
            db.collection("goods").find().toArray(function (err, result) {
                if (err) throw err;
                console.log(result);
                client.close();
            });
        });
    };

    public find(): void{
        var goods_list;
        this.mongoClient.connect(this.url_, (err, client) => {
            console.log('find単体');
            const db = client.db('Goods');
            db.collection("goods").find().toArray(function (err, result) {
                if (err) throw err;
                
                client.close(); 
                console.log(result)
                return result
            });
        });
    };
}