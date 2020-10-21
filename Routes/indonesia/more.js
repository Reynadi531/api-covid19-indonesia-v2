const { updateData } = require('../../util/fetcher');
const utcConverter = require('../../util/utcConverter')

module.exports = async(req, res) => {
    const data = await updateData(false);
    const rootData = await updateData(true);
    let tanggal = data.penambahan.created.split(' ')[0]
    let waktu = data.penambahan.created.split(' ')[1].split(':')
    res.json({
        "total": {
            "positif": data.total.jumlah_positif,
            "dirawat": data.total.jumlah_dirawat,
            "sembuh": data.total.jumlah_sembuh,
            "meninggal": data.total.jumlah_meninggal,
            "lastUpdate": new Date(utcConverter(tanggal, waktu))
        },
        "penambahan": {
            "positif": data.penambahan.jumlah_positif,
            "dirawat": data.penambahan.jumlah_dirawat,
            "sembuh": data.penambahan.jumlah_sembuh,
            "meninggal": data.penambahan.jumlah_meninggal,
            "tanggal": data.penambahan.tanggal,
            "created": new Date(utcConverter(tanggal, waktu)),
        },
        "data": {
            "odp": rootData.data.jumlah_odp,
            "pdp": rootData.data.jumlah_pdp,
            "total_spesimen": rootData.data.total_spesimen,
            "total_spesimen_negatif": rootData.data.total_spesimen_negatif,
        }
    });
}