const { provData } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const rawData = await provData();
    if(req.query.name) {
        let datamodified = (rawData.list_data).filter(x => x.lokasi != null && x.key == req.query.name.split('_').join(' ').toUpperCase()).map((data) => {
            const jeniskelamin = {}
            data['jenis_kelamin'].forEach(x => {
                jeniskelamin[x['key'].toLowerCase()] = x['doc_count']
            })

            const kelompok_umur = {}
            data['kelompok_umur'].forEach(x => {
                kelompok_umur[x['key']] = x['doc_count']
            })

            return {
                "provinsi": data.key,
                "kasus": data.jumlah_kasus,
                "dirawat": data.jumlah_dirawat,
                "sembuh": data.jumlah_sembuh,
                "meninggal": data.jumlah_meninggal,
                "last_date": rawData.last_date,
                "jenis_kelamin": jeniskelamin,
                "kelompok_umur": kelompok_umur,
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
        return res.json(datamodified);
    }
    let datamodified = (rawData.list_data).filter(x => x.lokasi != null).map((data) => {
        const jeniskelamin = {}
        data['jenis_kelamin'].forEach(x => {
            jeniskelamin[x['key'].toLowerCase()] = x['doc_count']
        })

        const kelompok_umur = {}
        data['kelompok_umur'].forEach(x => {
            kelompok_umur[x['key']] = x['doc_count']
        })

        return {
            "provinsi": data.key,
            "kasus": data.jumlah_kasus,
            "dirawat": data.jumlah_dirawat,
            "sembuh": data.jumlah_sembuh,
            "meninggal": data.jumlah_meninggal,
            "last_date": rawData.last_date,
            "jenis_kelamin": jeniskelamin,
            "kelompok_umur": kelompok_umur,
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
    return res.json(datamodified);
}