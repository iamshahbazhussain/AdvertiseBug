const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect("mongodb+srv://Tefilah:66QxWU!wzyEiunC@cluster0.dvxs0.mongodb.net/myFirstDatabase2?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to Mongodb......')).catch((e)=>console.log("error with connecting to MongoDb!"+e));
}