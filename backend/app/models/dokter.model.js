module.exports = (mongoose) => {
    const Dokter = mongoose.model(
        "dokter",
        mongoose.Schema(
            {
                nama: {
                    type: String,
                    required: true,
                    maxlength: 100,
                },
                spesialisasi: {
                    type: String,
                    required: true,
                    maxlength: 100,
                },
                no_telepon: {
                    type: String,
                    required: true,
                    maxlength: 20,
                },
                email: {
                    type: String,
                    required: true,
                    maxlength: 100,
                },
                tanggal_lahir: {
                    type: Date,
                    required: false,
                },
                jenis_kelamin: {
                    type: String,
                    enum: ["Laki-laki", "Perempuan"],
                    required: false,
                },
                alamat: {
                    type: String,
                    maxlength: 255,
                    required: false,
                },
            },
            { timestamps: true }
        )
    );

    return Dokter;
};
