const mongoose = require("mongoose");
const util = require('util');

const connectDB = async() => {
    mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
        const msgMapper = (m) => {
          return util.inspect(m, false, 10, true)
            .replace(/\n/g, '').replace(/\s{2,}/g, ' ');
        };
    });

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectDB;