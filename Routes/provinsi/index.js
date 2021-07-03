const { provData } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const rawData = await provData()
    if(req.query.name)  {
        let datamodified = (rawData.list_data).filter(x => x.lokasi != null && x.key == req.query.name.split('_').join(' ').toUpperCase()).map(data => {
            return {
                "provinsi": data.key,
                "kasus": data.jumlah_kasus,
                "dirawat": data.jumlah_dirawat,
                "sembuh": data.jumlah_sembuh,
                "meninggal": data.jumlah_meninggal
            }
        })
        if(datamodified.length == 0) {
            res.status(404)
            return res.json({
                status: res.statusCode,
                message: "Provinsi not found"
            })
        }
        return res.json(datamodified)
    }

    let datamodified = (rawData.list_data).filter(x => x.lokasi != null).map(data => {
        return {
            "provinsi": data.key,
            "kasus": data.jumlah_kasus,
            "dirawat": data.jumlah_dirawat,
            "sembuh": data.jumlah_sembuh,
            "meninggal": data.jumlah_meninggal
        }
    })
    return res.json(datamodified);
}