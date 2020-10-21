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

module.exports = {
    updateData,
    provData
}