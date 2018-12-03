exports.connectDB = function(cb){
    if(this.mongoClient && this.mongoClient.isConnected()){
        const instance = client.db(this.mongoClient);
        cb(instance);
    }else{
        const MongoClient = require('mongodb').MongoClient;
        const url = "mongodb://localhost:27017/user"
        const dbName = 'test'
        MongoClient.connect(url, {useNewUrlParser: true}, function(err, client){
            this.mongoClient = client;
            if(err){
                console.log('Erreur module db.js', err)
            }
            const instance = client.db(dbName);
            cb(instance);
        })
    }
}