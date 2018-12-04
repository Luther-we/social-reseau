exports.connectDB = function(cb){
    if(this.mongoClient && this.mongoClient.isConnected()){
        const instance = client.db(this.mongoClient);
        cb(instance);
    }else{
        const MongoClient = require('mongodb').MongoClient;
        // const url = "mongodb://localhost:27017/user"
        // const dbName = 'test'
        const url = "mongodb://heroku_j7ckfmlg:fokty2-pevvih-quRkip@ds215093.mlab.com:15093/heroku_j7ckfmlg";
const dbName = 'heroku_rgz600fc';
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