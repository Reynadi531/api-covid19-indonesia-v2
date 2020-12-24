const axios = require('axios');

const updateData = async(rootData) => {
    const { data } = await axios.get('https://data.covid19.go.id/public/api/update.json');
    let returnData;
    if(rootData == false) {
        returnData = data.update;
    }else {
        returnData = data;
    }
    return returnData
}

const provData = async() => {
    const { data } = await axios.get('https://data.covid19.go.id/public/api/prov.json');
    return data.list_data
}

const provDataAlt = async() => {
    const { data } = await axios.get('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json');
    return data.features
}

module.exports = {
    updateData,
    provData,
    provDataAlt
}