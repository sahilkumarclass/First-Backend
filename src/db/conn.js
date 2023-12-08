const mongoose = require("mongoose");
mongoose.connect(process.env.SECRET_KEY_1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connection to MongoDB Successful`);
}).catch((error) => {
    console.log(`Connection to MongoDB failed: ${error}`);
});

// Example schema definition
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true, index: true }, // Index created for the "name" field
//     email: { type: String, required: true, unique: true, index: true } // Index created for the "email" field
// });

// Rest of your code...
