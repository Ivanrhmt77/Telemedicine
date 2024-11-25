module.exports = app => {
    const pasien = require("../controllers/pasien.controller.js");
    const router = require("express").Router();

    router.post("/", pasien.create);
    router.get("/", pasien.findAll);
    router.get("/:id", pasien.findOne);
    router.put("/:id", pasien.update);
    router.delete("/:id", pasien.delete);

    app.use("/api/pasien", router);
};