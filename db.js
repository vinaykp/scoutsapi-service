const mongoose = require('mongoose');
const uri = process.env.MONGODB_ATLAS_CLUSTER_URI;

module.exports = connectToDatabase = async function () {
    return await (mongoose.connect(uri, {
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // and MongoDB driver buffering
        useNewUrlParser: true 
    }));
}
