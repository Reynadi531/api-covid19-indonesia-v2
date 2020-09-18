const express = require('express')
const router = express.Router();
const axios = require('axios');

const url = 'https://data.covid19.go.id/public/api/update.json';

router.get('/', async(req, res) => {
    const response = await axios.get(url);
    res.json({
        "positif": response.data.update.total.jumlah_positif,
        "dirawat": response.data.update.total.jumlah_dirawat,
        "sembuh": response.data.update.total.jumlah_sembuh,
        "meninggal": response.data.update.total.jumlah_meninggal,
        "lastUpdate": new Date(response.data.update.penambahan.created)
    });
});

router.get('/harian', async(req, res) => {
    const response = await axios.get(url);
    let harian = response.data.update.harian;
    let data = [];
    
    for(let i=0; i < harian.length; i++) {
        let dataModif = {
            "positif": harian[i].jumlah_positif.value,
            "dirawat": harian[i].jumlah_dirawat.value,
            "sembuh": harian[i].jumlah_sembuh.value, 
            "meninggal": harian[i].jumlah_meninggal.value,
            "positif_kumulatif": harian[i].jumlah_positif_kum.value,
            "dirawat_kumulatif": harian[i].jumlah_dirawat_kum.value,
            "sembuh_kumulatif": harian[i].jumlah_sembuh_kum.value, 
            "meninggal_kumulatif": harian[i].jumlah_meninggal_kum.value,
            "lastUpdate": harian[i].key,
            "tanggal": harian[i].key_as_string
        }
        data.push(dataModif);
    }

    res.json(data);
});

router.get('/provinsi', async(req, res) => {
    const response = await axios.get('https://data.covid19.go.id/public/api/prov.json');
    let list_data = response.data.list_data;
    let data = [];

    for(let i=0; i < list_data.length; i++) {
        let datamodif = {
            "id": i+1,
            "provinsi": list_data[i].key,
            "kasus": list_data[i].jumlah_kasus,
            "dirawat": list_data[i].jumlah_dirawat,
            "sembuh": list_data[i].jumlah_sembuh,
            "meninggal": list_data[i].jumlah_meninggal,
        }
        data.push(datamodif);
    }
    res.json(data);
});

module.exports = router;