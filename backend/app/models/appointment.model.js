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

    // Fungsi untuk mengambil semua dokter yang tersedia
    Appointment.getAvailableDoctors = async function() {
        try {
            // Mengambil semua data dokter dari koleksi dokter
            const doctors = await mongoose.model('dokter').find();
            return doctors;
        } catch (error) {
            throw error;
        }
    };

    // Fungsi untuk membuat appointment
    Appointment.createAppointment = async function(appointmentData, JadwalDokter) {
        try {
            // Memeriksa apakah jadwal dokter sudah ada pada waktu yang tumpang tindih
            const existingSchedule = await JadwalDokter.findOne({
                dokter: appointmentData.dokter,
                tanggal: {
                    $eq: new Date(appointmentData.tanggal_appointment.toDateString()) // Mengambil tanggal saja
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

            // Jika ada jadwal yang tumpang tindih
            if (existingSchedule) {
                throw new Error('Dokter tidak tersedia pada waktu tersebut. Silakan pilih waktu lain.');
            }

            // Membuat appointment baru
            const appointment = new this(appointmentData);
            await appointment.save();

            // Menyimpan jadwal dokter terkait
            await JadwalDokter.create({
                dokter: appointmentData.dokter,
                tanggal: appointmentData.tanggal_appointment,
                waktu_mulai: appointmentData.waktu_mulai,
                waktu_selesai: appointmentData.waktu_selesai
            });

            return appointment;

        } catch (error) {
            throw error; // Lemparkan error agar bisa ditangani di luar fungsi ini
        }
    };

    return Appointment;
};
