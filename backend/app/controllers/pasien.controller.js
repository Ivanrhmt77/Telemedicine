const db = require("../models");
const Pasien = db.pasien;

exports.create = async (req, res) => {
    try {
        const pasien = new Pasien({
            nama: req.body.nama,
            tanggal_lahir: req.body.tanggal_lahir,
            jenis_kelamin: req.body.jenis_kelamin,
            alamat: req.body.alamat,
            no_telepon: req.body.no_telepon,
            email: req.body.email,
            riwayat_penyakit: req.body.riwayat_penyakit,
            tinggi_badan: req.body.tinggi_badan,
            berat_badan: req.body.berat_badan
        });

        const savedPasien = await pasien.save();
        res.status(201).send(savedPasien);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat membuat data pasien."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const pasiens = await Pasien.find();
        res.send(pasiens);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat mengambil data pasien."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const pasien = await Pasien.findById(req.params.id);
        if (!pasien) {
            return res.status(404).send({
                message: "Pasien tidak ditemukan dengan id " + req.params.id
            });
        }
        res.send(pasien);
    } catch (err) {
        res.status(500).send({
            message: "Error mengambil data pasien dengan id " + req.params.id
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedPasien = await Pasien.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPasien) {
            return res.status(404).send({
                message: "Pasien tidak ditemukan dengan id " + req.params.id
            });
        }
        res.send(updatedPasien);
    } catch (err) {
        res.status(500).send({
            message: "Error mengupdate data pasien dengan id " + req.params.id
        });
    }
};

exports.delete = async (req, res) => {
    try {
        console.log("Attempting to delete Pasien with ID:", req.params.id);
        
        const result = await Pasien.deleteOne({ _id: req.params.id });
        
        console.log("Delete result:", result);
        
        if (result.deletedCount === 0) {
            return res.status(404).send({
                message: `Pasien dengan id ${req.params.id} tidak ditemukan`
            });
        }
        
        res.send({ 
            message: "Pasien berhasil dihapus!",
            result
        });
    } catch (err) {
        console.error("Error saat menghapus:", err);
        res.status(500).send({
            message: `Error saat menghapus: ${err.message}`
        });
    }
};