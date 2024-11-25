module.exports = (mongoose) => {
    const JadwalDokter = mongoose.model(
        "jadwalDokter",
        mongoose.Schema(
            {
                dokter: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'dokter',
                    required: true
                },
                tanggal: {
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
                }
            },
            { timestamps: true }
        )
    );
    
    return JadwalDokter;
};