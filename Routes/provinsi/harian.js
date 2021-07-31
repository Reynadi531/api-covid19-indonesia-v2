const { periodicalProvData } = require('../../util/fetcher')
module.exports = async(req, res) => {

  var data = await periodicalProvData()
  data = data.list
  const date = req.query.date || undefined
  const month = req.query.month || undefined
  const year = req.query.year || undefined

  const filterFunction = async() =>{
    if(date){
      data =  data.filter(object => object.date.split(" ")[0] == date)
    }
    if(month){
      data = data.filter(object => object.date.split(" ")[1] == month)
    }
    if(year){
      data = data.filter(object => object.date.split(" ")[2] == year)
    }
  }

  await filterFunction().then(()=>{
    console.log(data)
    return res.json({
      ...data
    })
  })
}

