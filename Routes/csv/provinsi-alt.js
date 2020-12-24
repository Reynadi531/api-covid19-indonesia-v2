const downloadCSV = require('../../util/csvDownloader');
const { provDataAlt } = require('../../util/fetcher');

module.exports = async (req, res) => {
    let list_data = await provDataAlt();
    let datamodified = list_data.map(data => {
        return data.attributes
    })
    datamodified.length = 34
    const fields = [
        {
            label: 'FID',
            value: 'FID'
        },
        {
            label: 'Kode_Provi',
            value: 'Kode_Provi'
        },
        {
            label: 'Provinsi',
            value: 'Provinsi'
        },
        {
            label: 'Kasus_Posi',
            value: 'Kasus_Posi'
        },
        {
            label: 'Kasus_Semb',
            value: 'Kasus_Semb'
        },
        {
            label: 'Kasus_Meni',
            value: 'Kasus_Meni'
        }
    ]

    downloadCSV(res, 'indonesia-provinsi-alt.csv', fields, datamodified)
}