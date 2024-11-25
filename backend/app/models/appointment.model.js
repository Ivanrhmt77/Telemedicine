module.exports = (mongoose) => {
    const Appointment = mongoose.model(
        "appointment",
        mongoose.Schema(
            {
                pasien: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'pasien',
                    required: true
                },
                dokter: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'dokter',
                    required: true
                },
                tanggal_appointment: {
                    type: Date,
                    required: true
                },
                waktu_mulai: {
                    type: String,
                    required: true
                },
                waktu_selesai: {
                    type: String,
                    required: true
                },
                status: {
                    type: String,
                    enum: ['pending', 'confirmed', 'cancelled'],
                    default: 'pending'
                }
            },
            { timestamps: true }
        )
    );

    Appointment.createAppointment = async function(appointmentData, JadwalDokter) {
        try {
            const existingSchedule = await JadwalDokter.findOne({
                dokter: appointmentData.dokter,
                tanggal: {
                    $eq: new Date(appointmentData.tanggal_appointment.toDateString())
                },
                $or: [
                    {
                        waktu_mulai: { $lte: appointmentData.waktu_mulai },
                        waktu_selesai: { $gte: appointmentData.waktu_mulai }
                    },
                    {
                        waktu_mulai: { $lte: appointmentData.waktu_selesai },
                        waktu_selesai: { $gte: appointmentData.waktu_selesai }
                    }
                ]
            });

            if (existingSchedule) {
                throw new Error('Dokter tidak tersedia pada waktu tersebut. Silahkan pilih waktu lain.');
            }

            const appointment = new this(appointmentData);
            await appointment.save();

            await JadwalDokter.create({
                dokter: appointmentData.dokter,
                tanggal: appointmentData.tanggal_appointment,
                waktu_mulai: appointmentData.waktu_mulai,
                waktu_selesai: appointmentData.waktu_selesai
            });

            return appointment;

        } catch (error) {
            throw error;
        }
    };
    
    return Appointment;
};