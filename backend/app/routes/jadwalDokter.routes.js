module.exports = app => {
    const jadwalDokter = require("../controllers/jadwalDokter.controller.js");
    const router = require("express").Router();

    router.post("/", jadwalDokter.create);
    router.get("/", jadwalDokter.findAll);
    router.get("/dokter/:dokterId", jadwalDokter.findByDokter);
    router.put("/:id", jadwalDokter.update);
    router.delete("/:id", jadwalDokter.delete);

    app.use("/api/jadwalDokter", router);
};