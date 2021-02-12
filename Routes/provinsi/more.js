const { provData } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const rawData = await provData();
    let datamodified = (rawData.list_data).map(data => {
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
            "kelompok_umur": {
                "0-5_tahun": data.kelompok_umur[0].doc_count,
                "6-18_tahun": data.kelompok_umur[1].doc_count,
                "19-30_tahun": data.kelompok_umur[2].doc_count,
                "31-45_tahun": data.kelompok_umur[3].doc_count,
                "46-59_tahun": data.kelompok_umur[4].doc_count,
                "≥60_tahun": data.kelompok_umur[5].doc_count,
            },
            "penambahan": {
                "positif": data.penambahan.positif,
                "sembuh": data.penambahan.sembuh,
                "meninggal": data.penambahan.meninggal,
            },
            "lokasi": {
                "lon": data.lokasi.lon,
                "lat": data.lokasi.lat
            }
        }
    });
    res.json(datamodified);
}