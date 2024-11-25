const db = require("../models");
const JadwalDokter = db.jadwalDokter;

exports.create = async (req, res) => {
    try {
        const jadwal = new JadwalDokter({
            dokter: req.body.dokter,
            tanggal: req.body.tanggal,
            waktu_mulai: req.body.waktu_mulai,
            waktu_selesai: req.body.waktu_selesai
        });

        const savedJadwal = await jadwal.save();
        res.status(201).send(savedJadwal);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat membuat jadwal dokter."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const jadwals = await JadwalDokter.find().populate('dokter');
        res.send(jadwals);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat mengambil jadwal dokter."
        });
    }
};

exports.findByDokter = async (req, res) => {
    try {
        const jadwals = await JadwalDokter.find({
            dokter: req.params.dokterId
        }).populate('dokter');
        res.send(jadwals);
    } catch (err) {
        res.status(500).send({
            message: "Error mengambil jadwal dokter dengan id " + req.params.dokterId
        });
    }
};

exports.update = async (req, res) => {
    try {
        const updatedJadwal = await JadwalDokter.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedJadwal) {
            return res.status(404).send({
                message: "Jadwal tidak ditemukan dengan id " + req.params.id
            });
        }
        res.send(updatedJadwal);
    } catch (err) {
        res.status(500).send({
            message: "Error mengupdate jadwal dengan id " + req.params.id
        });
    }
};

exports.delete = async (req, res) => {
    try {
        console.log("Attempting to delete JadwalDokter with ID:", req.params.id);
        
        const result = await JadwalDokter.deleteOne({ _id: req.params.id });
        
        console.log("Delete result:", result);
        
        if (result.deletedCount === 0) {
            return res.status(404).send({
                message: `JadwalDokter dengan id ${req.params.id} tidak ditemukan`
            });
        }
        
        res.send({ 
            message: "JadwalDokter berhasil dihapus!",
            result
        });
    } catch (err) {
        console.error("Error saat menghapus:", err);
        res.status(500).send({
            message: `Error saat menghapus: ${err.message}`
        });
    }
};