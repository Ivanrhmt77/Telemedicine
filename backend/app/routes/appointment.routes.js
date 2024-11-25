module.exports = app => {
    const appointment = require("../controllers/appointment.controller.js");
    const router = require("express").Router();
    
    router.post("/", appointment.create);
    router.get("/", appointment.findAll);
    router.get("/pasien/:pasienId", appointment.findByPasien);
    router.get("/dokter/:dokterId", appointment.findByDokter);
    router.patch("/:id/status", appointment.updateStatus);
    router.delete("/:id", appointment.delete);

    app.use("/api/appointment", router);
};