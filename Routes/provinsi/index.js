const { provData } = require('../../util/fetcher')
const { provDataAlt } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const rawData = await provData()

    if(req.params.nama == "alt"){
        const datacollection = await provDataAlt();
        const provData = datacollection.map(data => {
            return data.attributes
        })
        provData.length = 34;
        res.json(provData)
    }else if(req.params.nama == "all"){
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
    }else{
        let datamodified = (rawData.list_data).filter(x => x.lokasi != null && x.key == req.params.nama.split('_').join(' ').toUpperCase()).map(data => {
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

    
}