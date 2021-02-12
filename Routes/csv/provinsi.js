const downloadCSV = require('../../util/csvDownloader');
const { provData } = require('../../util/fetcher');

module.exports = async(req, res) => {
    let rawData = await provData();
    let datamodified = (rawData.list_data).map(data => {
        return {
            "provinsi": data.key,
            "kasus": data.jumlah_kasus,
            "dirawat": data.jumlah_dirawat,
            "sembuh": data.jumlah_sembuh,
            "meninggal": data.jumlah_meninggal
        }
    })
    const fields = [
        {
            label: 'provinsi',
            value: 'provinsi'
        },
        {
            label: 'kasus',
            value: 'kasus'
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
        }
    ]

    downloadCSV(res, 'indonesia-provinsi.csv', fields, datamodified)
}