const utcConverter = require('../../util/utcConverter');
const downloadCSV = require('../../util/csvDownloader');
const { updateData } = require('../../util/fetcher');

module.exports = async(req, res) => {
    const data = await updateData(false);
    let tanggal = data.penambahan.created.split(' ')[0]
    let waktu = data.penambahan.created.split(' ')[1].split(':')
    

    let datamodified = [
        {
            'positif': data.total.jumlah_positif,
            'dirawat': data.total.jumlah_dirawat,
            'sembuh': data.total.jumlah_sembuh,
            'meninggal': data.total.jumlah_meninggal,
            'lastUpdate': new Date(utcConverter(tanggal, waktu))
        },
    ]

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
            label: 'lastUpdate',
            value: 'lastUpdate'
        },
    ]

    downloadCSV(res, 'indonesia.csv', fields, datamodified);
}