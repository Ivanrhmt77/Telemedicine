const db = require("../models");
const Appointment = db.appointment;

exports.create = async (req, res) => {
    try {
        console.log('Received appointment data:', req.body);
        
        // Validate dokter field
        if (!req.body.dokter) {
            return res.status(400).send({
                message: "Dokter ID is required"
            });
        }

        const appointmentData = {
            pasien: req.body.pasien,
            dokter: req.body.dokter,
            tanggal_appointment: new Date(req.body.tanggal_appointment),
            waktu_mulai: req.body.waktu_mulai,
            waktu_selesai: req.body.waktu_selesai,
            status: req.body.status || 'pending'
        };

        const appointment = await Appointment.createAppointment(appointmentData, db.jadwalDokter);
        res.status(201).send(appointment);
    } catch (err) {
        console.error('Full error:', err);
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat membuat appointment."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('pasien')
            .populate('dokter');
        res.send(appointments);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Terjadi kesalahan saat mengambil appointment."
        });
    }
};

exports.findByPasien = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            pasien: req.params.pasienId
        })
            .populate('pasien')
            .populate('dokter');
        res.send(appointments);
    } catch (err) {
        res.status(500).send({
            message: "Error mengambil appointment untuk pasien dengan id " + req.params.pasienId
        });
    }
};

exports.findByDokter = async (req, res) => {
    try {
        const appointments = await Appointment.find({
            dokter: req.params.dokterId
        })
            .populate('pasien')
            .populate('dokter');
        res.send(appointments);
    } catch (err) {
        res.status(500).send({
            message: "Error mengambil appointment untuk dokter dengan id " + req.params.dokterId
        });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        if (!['pending', 'confirmed', 'cancelled'].includes(req.body.status)) {
            return res.status(400).send({
                message: "Status tidak valid"
            });
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).send({
                message: "Appointment tidak ditemukan dengan id " + req.params.id
            });
        }

        res.send(updatedAppointment);
    } catch (err) {
        res.status(500).send({
            message: "Error mengupdate status appointment dengan id " + req.params.id
        });
    }
};

exports.delete = async (req, res) => {
    try {
        console.log("Attempting to delete Appointment with ID:", req.params.id);
        
        const result = await Appointment.deleteOne({ _id: req.params.id });
        
        console.log("Delete result:", result);
        
        if (result.deletedCount === 0) {
            return res.status(404).send({
                message: `Appointment dengan id ${req.params.id} tidak ditemukan`
            });
        }
        
        res.send({ 
            message: "Appointment berhasil dihapus!",
            result
        });
    } catch (err) {
        console.error("Error saat menghapus:", err);
        res.status(500).send({
            message: `Error saat menghapus: ${err.message}`
        });
    }
};