const db = require("../models");
const Dokter = db.dokter;

exports.create = async (req, res) => {
    try {
        const dokter = new Dokter({
            nama: req.body.nama,
            tanggal_lahir: req.body.tanggal_lahir,
            jenis_kelamin: req.body.jenis_kelamin,
            alamat: req.body.alamat,
            no_telepon: req.body.no_telepon,
            email: req.body.email,
            spesialisasi: req.body.spesialisasi
        });

        const savedDokter = await dokter.save();
        res.status(201).send(savedDokter);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat membuat data dokter."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const dokters = await Dokter.find();
        res.send(dokters);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat mengambil data dokter."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const dokter = await Dokter.findById(req.params.id);
        if (!dokter) {
            return res.status(404).send({
                message: "Dokter tidak ditemukan dengan id " + req.params.id
            });
        }
        res.send(dokter);
    } catch (err) {
        res.status(500).send({
            message: "Error mengambil data dokter dengan id " + req.params.id
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedDokter = await Dokter.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedDokter) {
            return res.status(404).send({
                message: "Dokter tidak ditemukan dengan id " + req.params.id
            });
        }
        res.send(updatedDokter);
    } catch (err) {
        res.status(500).send({
            message: "Error mengupdate data dokter dengan id " + req.params.id
        });
    }
};

exports.delete = async (req, res) => {
    try {
        console.log("Attempting to delete Dokter with ID:", req.params.id);
        
        const result = await Dokter.deleteOne({ _id: req.params.id });
        
        console.log("Delete result:", result);
        
        if (result.deletedCount === 0) {
            return res.status(404).send({
                message: `Dokter dengan id ${req.params.id} tidak ditemukan`
            });
        }
        
        res.send({ 
            message: "Dokter berhasil dihapus!",
            result
        });
    } catch (err) {
        console.error("Error saat menghapus:", err);
        res.status(500).send({
            message: `Error saat menghapus: ${err.message}`
        });
    }
};