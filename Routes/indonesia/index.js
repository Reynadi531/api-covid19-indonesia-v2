const { updateData } = require('../../util/fetcher')
const utcConverter = require('../../util/utcConverter')

module.exports = async(req, res) => {
    const data = await updateData(false);
    const tanggal = data.penambahan.created.split(' ')[0]
    const waktu = data.penambahan.created.split(' ')[1].split(':')

    res.json({
        "positif": data.total.jumlah_positif,
        "dirawat": data.total.jumlah_dirawat,
        "sembuh": data.total.jumlah_sembuh,
        "meninggal": data.total.jumlah_meninggal,
        "lastUpdate": new Date(utcConverter(tanggal, waktu))
    });
}