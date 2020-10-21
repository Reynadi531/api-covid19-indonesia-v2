const downloadCSV = require('../../util/csvDownloader');
const { updateData } = require('../../util/fetcher');

module.exports = async(req, res) => {
    const data = await updateData(false);
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
    const fields = [
        {
            label: 'positif',
            value: 'positif'
        },
        {
            label: 'dirawat',
            value: 'dirawat'
        },
        {
            label: 'sembuh',
            value: 'sembuh'
        },
        {
            label: 'meninggal',
            value: 'meninggal'
        },
        {
            label: 'positif_kumulatif',
            value: 'positif_kumulatif'
        },
        {
            label: 'dirawat_kumulatif',
            value: 'dirawat_kumulatif'
        },
        {
            label: 'sembuh_kumulatif',
            value: 'sembuh_kumulatif'
        },
        {
            label: 'meninggal_kumulatif',
            value: 'meninggal_kumulatif'
        },
        {
            label: 'lastUpdate',
            value: 'lastUpdate'
        },
        {
            label: 'tanggal',
            value: 'tanggal'
        },
    ]
    downloadCSV(res, 'indonesia-harian.csv', fields, datamodified);
}