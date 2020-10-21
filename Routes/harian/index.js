const { updateData } = require('../../util/fetcher')

module.exports = async(req, res) => {
    let data = await updateData(false);
    let datamodified = data.harian.map(data => {
        return {
            "positif": data.jumlah_positif.value,
            "dirawat": data.jumlah_dirawat.value,
            "sembuh": data.jumlah_sembuh.value,
            "meninggal": data.jumlah_meninggal.value,
            "positif_kumulatif": data.jumlah_positif_kum.value,
            "dirawat_kumulatif": data.jumlah_dirawat_kum.value,
            "sembuh_kumulatif": data.jumlah_sembuh_kum.value,
            "meninggal_kumulatif": data.jumlah_meninggal_kum.value,
            "lastUpdate": data.key,
            "tanggal": data.key_as_string,
        }
    });
    res.json(datamodified);
}