const { provDataAlt } = require('../../util/fetcher')

module.exports = async(req, res) => {
    const datacollection = await provDataAlt();
    const provData = datacollection.map(data => {
        return data.attributes
    })

    provData.length = 34;
    res.json(provData)
}