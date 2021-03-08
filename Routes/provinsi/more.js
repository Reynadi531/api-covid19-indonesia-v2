const { provData } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const rawData = await provData();
    let datamodified = (rawData.list_data).map((data) => {
        return {
            "provinsi": data.key,
            "kasus": data.jumlah_kasus,
            "dirawat": data.jumlah_dirawat,
            "sembuh": data.jumlah_sembuh,
            "meninggal": data.jumlah_meninggal,
            "last_date": rawData.last_date,
            "jenis_kelamin": {
                "laki-laki": data.jenis_kelamin[0].doc_count,
                "perempuan": data.jenis_kelamin[1].doc_count,
            },
            "kelompok_umur": (data.kelompok_umur).map(e => ({ [e.key]: e.doc_count })),
            "penambahan": {
                "positif": data.penambahan.positif,
                "sembuh": data.penambahan.sembuh,
                "meninggal": data.penambahan.meninggal,
            },
            "lokasi": {
                "lon": data.lokasi == null ? null : data.lokasi.lon,
                "lat": data.lokasi == null ? null : data.lokasi.lat
            }
        }
    });
    res.json(datamodified);
}