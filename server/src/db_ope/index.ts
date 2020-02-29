import { response } from "express";

var mongoClient = require('mongodb').MongoClient;
var url_ = "mongodb://localhost/";

export default class db_ope {
    constructor() {
    }
    //登録
    public insert(data: any) {
        mongoClient.connect(url_, (err, client) => {
            console.log('Connected successfully to server');
            const db = client.db('Goods');
            var goods = [
                { goods_id: data.goods_id, name: data.name, size: data.size, amount: data.amount, note: data.note },
            ];
            db.collection("goods").insertMany(goods, function (err, res) {
                if (err) throw err;
                console.log("insert success!")
                client.close();
            });
        });
    };
    //更新
    public update(data: any) {
        mongoClient.connect(url_, (err, client) => {
            console.log('Connected successfully to server');
            const db = client.db('Goods');
            var goods = {
                goods_id: data.goods_id, name: data.name, size: data.size, amount: data.amount, note: data.note 
            };
            db.collection("goods").update({ goods_id:goods.goods_id }, 
                { $set:{ name:goods.name,size:goods.size, amount:goods.amount, note:goods.note,}}, function (err, res) {
                if (err) throw err;
                console.log("update success!")
                client.close();
            });
        });
    };
    //一覧取得
    public find(): Promise<string> {
        return new Promise(function (resolve, reject) {
            var goods_list;
            console.log('一覧取得');
            setTimeout(function () {
                mongoClient.connect(url_, (err, client) => {
                    const db = client.db('Goods');
                    db.collection("goods").find().toArray(function (err, result) {
                        if (err) throw err;
                        goods_list = JSON.stringify(result)
                        client.close();
                        resolve(goods_list)
                    })

                });
            });
        });
    };
    //詳細
    public find_one(goods_id:string): Promise<string> {
        return new Promise(function (resolve, reject) {
            var goods_detail;
            console.log('詳細取得');
            setTimeout(function () {
                mongoClient.connect(url_, (err, client) => {
                    const db = client.db('Goods');
                    db.collection("goods").findOne({goods_id:goods_id},function (err, result) {
                        if (err) throw err;
                        console.log(result)
                        goods_detail = JSON.stringify(result)
                        client.close();
                        resolve(goods_detail)
                    })

                });
            });
        });
    };

    //商品検索
    public serch(data: any): Promise<string> {
        return new Promise(function (resolve, reject) {
            //var key = "aaaa"
            var value = data.value
            var goods_list;
            setTimeout(function () {
                mongoClient.connect(url_, (err, client) => {
                    const db = client.db('Goods');
                    db.collection("goods").find({ $or: [ {"goods_id":value},{"name":value},{"size":value},{"amount":value},{"note":value} ] }).toArray(function (err, result) {
                        if (err) throw err;
                        console.log(result)
                        goods_list = JSON.stringify(result)
                        client.close();
                        resolve(goods_list)
                    })

                });
            });
        });
    };
        /*
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