const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose.connect(process.env.MONGODB_CNN, async (err) => {
    if (err) throw err;
    console.log("Bases de datos online");
  });
};

module.exports = {
  dbConnection,
};
