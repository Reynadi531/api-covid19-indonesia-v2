const { provData } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const rawData = await provData()
    if(req.query.name)  {
        let datamodified = (rawData.list_data).filter(x => x.lokasi != null && x.key == req.query.name.split('_').join(' ').toUpperCase()).map(data => {
            return {
                "provinsi": data.key,
                "kasus": data.penambahan.positif,
                "sembuh": data.penambahan.sembuh,
                "meninggal": data.penambahan.meninggal
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
          "kasus": data.penambahan.positif,
          "sembuh": data.penambahan.sembuh,
          "meninggal": data.penambahan.meninggal
        }
    })
    return res.json(datamodified);
}