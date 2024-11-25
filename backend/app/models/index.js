const dbConfig = require("../../config/db.config.js")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pasien = require("./pasien.model.js")(mongoose)
db.dokter = require("./dokter.model.js")(mongoose);
db.jadwalDokter = require("./jadwalDokter.model.js")(mongoose);
db.appointment = require("./appointment.model.js")(mongoose);

module.exports = db;