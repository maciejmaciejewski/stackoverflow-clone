const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config");
const fs = require("fs")
const https = require("https");

const connect = url => {
  return mongoose.connect(url, config.db.options);
};

if (require.main === module) {

  let opts = {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem")
  }

  https.createServer(opts, app).listen(config.port);

  connect(config.db.prod);
  mongoose.connection.on('error', console.log);
}

module.exports = { connect };

