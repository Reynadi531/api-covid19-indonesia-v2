const { provData } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const Data = await provData()
    let datamodified = Data.map(data => {
        return {
            "provinsi": data.key,
            "kasus": data.jumlah_kasus,
            "dirawat": data.jumlah_dirawat,
            "sembuh": data.jumlah_sembuh,
            "meninggal": data.jumlah_meninggal
        }
    })
    res.json(datamodified);
}