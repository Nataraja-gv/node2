const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      await mongoose.connect("mongodb+srv://natarajagv2025:FTJ27vaMFs4zbWt6@namstenodejs.1eo8q.mongodb.net/eCommerce")
   }
   catch (error) {
      handleError(error);
   }
}
module.exports = connectDB