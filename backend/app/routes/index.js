module.exports = app => {
    require("./pasien.routes")(app);
    require("./dokter.routes")(app);
    require("./jadwalDokter.routes")(app);
    require("./appointment.routes")(app);
};