const axios = require('axios')
var fetcheddata;
const fetch = async() =>{
  const { data } = await axios.get("https://data.covid19.go.id/public/api/prov_time.json")
  fetcheddata = data
  console.log("Finished initial data fetch")
}
fetch()
setInterval(fetch, 60*60*1000)

module.exports = async(req, res) => {
  var data = fetcheddata
  if(!data){
    console.log("data cache not found. refreshing")
    await fetch()
    data = fetcheddata
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
    return res.json({
      data
    })
  })
}

