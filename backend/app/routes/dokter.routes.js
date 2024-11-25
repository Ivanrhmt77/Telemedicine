module.exports = app => {
    const dokter = require("../controllers/dokter.controller.js");
    const router = require("express").Router();

    router.post("/", dokter.create);
    router.get("/", dokter.findAll);
    router.get("/:id", dokter.findOne);
    router.put("/:id", dokter.update);
    router.delete("/:id", dokter.delete);

    app.use("/api/dokter", router);
};