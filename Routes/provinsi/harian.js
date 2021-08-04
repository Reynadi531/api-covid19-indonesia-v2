const NodeCache= require("node-cache")
const axios = require('axios')
const myCache = new NodeCache()

const fetch = async() =>{
  const { data } = await axios.get("https://data.covid19.go.id/public/api/prov_time.json")
  myCache.set("dailyProvData", data)
  console.log("Finished initial data fetch")

}
fetch()
setInterval(fetch, 60*60*1000)

module.exports = async(req, res) => {
  var data = await myCache.get("dailyProvData")
  if(!data){
    console.log("data cache not found. refreshing")
    await fetch()
    data = await myCache.get("dailyProvData")
  }
  data = data.list
  const date = req.query.date
  const month = req.query.month
  const year = req.query.year

  const filterFunction = async() =>{
    if(date){
      data =  data.filter(object => object.date.split(" ")[0] == date)
    }
    if(month){
      data = data.filter(object => object.date.split(" ")[1].toUpperCase() == month.toUpperCase())
    }
    if(year){
      data = data.filter(object => object.date.split(" ")[2] == year)
    }
  }

  await filterFunction().then(()=>{
    console.log(data)
    return res.json({
      data
    })
  })
}

