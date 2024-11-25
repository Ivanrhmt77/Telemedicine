module.exports = (mongoose) => {
    const Pasien = mongoose.model(
        "pasien",
        mongoose.Schema(
            {
                nama: {
                    type: String,
                    required: true,
                    maxlength: 100
                },
                tanggal_lahir: {
                    type: Date,
                    required: true
                },
                jenis_kelamin: {
                    type: String,
                    required: true,
                    maxlength: 10
                },
                alamat: {
                    type: String,
                    maxlength: 255
                },
                no_telepon: {
                    type: String,
                    maxlength: 20
                },
                email: {
                    type: String,
                    maxlength: 100
                },
                riwayat_penyakit: {
                    type: String
                },
                tinggi_badan: {
                    type: Number,
                    min: 0
                },
                berat_badan: {
                    type: Number,
                    min: 0
                }
            },
            { timestamps: true }
        )
    );
    
    return Pasien;
};