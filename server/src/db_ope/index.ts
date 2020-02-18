import { response } from "express";

var mongoClient = require('mongodb').MongoClient;
var url_ = "mongodb://localhost/";

export default class db_ope {
    constructor() { }
    

    

    public insert(data: any) {
            mongoClient.connect(url_, (err, client) => {
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

    public find(): Promise<any>{
        var goods_list;
        var response=this.find_db(goods_list)
        console.log("res:"+response)
        return response
    }

    private find_db(goods_list:any): Promise<any>{
        return new Promise((resolve, reject) => {
            console.log('find単体');
            setTimeout(() => {
                mongoClient.connect(url_, (err, client) => {
                    const db = client.db('Goods');
                    db.collection("goods").find().toArray(function (err, result) {
                        if (err) throw err;
                        
                        client.close();
                        console.log("result:"+result)
                        return result
                    })

                });
            });
            if (goods_list){
                goods_list={"同期成功してなさそう":"どうするんだ"}
                resolve(goods_list)
                return goods_list
            }else{
                resolve({"error":"非同期失敗"});
            }
        });
    };
/*
    public asyncFunction(): Promise<string> {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            resolve('Async Hello World');
          })
        })
      }
    public find(): Promise<string> {
        return new Promise(function (resolve, reject) {
            var goods_list;
            console.log('find単体');
            setTimeout(function () {
                this.mongoClient.connect(this.url_, (err, client) => {
                    const db = client.db('Goods');
                    db.collection("goods").find().toArray(function (err, result) {
                        if (err) throw err;
                        goods_list = JSON.stringify(result)
                        client.close();
                        console.log(goods_list)
                        resolve(goods_list)
                    })

                });
            },5000);
        });
    };
       */
      
}

