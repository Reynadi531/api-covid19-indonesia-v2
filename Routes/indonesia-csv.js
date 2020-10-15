const express = require('express');
const router = express.Router();
const axios = require('axios');
const { downloadCSV } = require('../util') 

router.get('/', async(req, res) => {
    const { data } = await axios.get('https://data.covid19.go.id/public/api/update.json')
    let finalTIME;
    let tanggal = data.update.penambahan.created.split(' ')[0]
    let waktu = data.update.penambahan.created.split(' ')[1].split(':')
    let jam = Number(waktu[0]) - 7;
    waktu.shift(1)
    waktu.unshift(jam)
    let waktuUTC = waktu.join(':');
    finalTIME = `${tanggal} ${waktuUTC}`;
    
    let datamodified = [
        {
            'positif': data.update.total.jumlah_positif,
            'dirawat': data.update.total.jumlah_dirawat,
            'sembuh': data.update.total.jumlah_sembuh,
            'meninggal': data.update.total.jumlah_meninggal,
            'lastUpdate': new Date(finalTIME)
        },
    ]
    
    const fields = [
        {
            label: 'positif',
            value: 'positif'
        },
        {
            label: 'dirawat',
            value: 'dirawat'
        },
        {
            label: 'sembuh',
            value: 'sembuh'
        },
        {
            label: 'meninggal',
            value: 'meninggal'
        },
        {
            label: 'lastUpdate',
            value: 'lastUpdate'
        },
    ]

    downloadCSV(res, 'indonesia.csv', fields, datamodified);
})

router.get('/harian', async(req,res) => {
    const response = await axios.get('https://data.covid19.go.id/public/api/update.json');
    let harian = response.data.update.harian;
    let datamodified = harian.map(data => {
        return {
            "positif": data.jumlah_positif.value,
            "dirawat": data.jumlah_dirawat.value,
            "sembuh": data.jumlah_sembuh.value,
            "meninggal": data.jumlah_meninggal.value,
            "positif_kumulatif": data.jumlah_positif_kum.value,
            "dirawat_kumulatif": data.jumlah_dirawat_kum.value,
            "sembuh_kumulatif": data.jumlah_sembuh_kum.value,
            "meninggal_kumulatif": data.jumlah_meninggal_kum.value,
            "lastUpdate": data.key,
            "tanggal": data.key_as_string,
        }
    });
    const fields = [
        {
            label: 'positif',
            value: 'positif'
        },
        {
            label: 'dirawat',
            value: 'dirawat'
        },
        {
            label: 'sembuh',
            value: 'sembuh'
        },
        {
            label: 'meninggal',
            value: 'meninggal'
        },
        {
            label: 'positif_kumulatif',
            value: 'positif_kumulatif'
        },
        {
            label: 'dirawat_kumulatif',
            value: 'dirawat_kumulatif'
        },
        {
            label: 'sembuh_kumulatif',
            value: 'sembuh_kumulatif'
        },
        {
            label: 'meninggal_kumulatif',
            value: 'meninggal_kumulatif'
        },
        {
            label: 'lastUpdate',
            value: 'lastUpdate'
        },
        {
            label: 'tanggal',
            value: 'tanggal'
        },
    ]
    downloadCSV(res, 'indonesia-harian.csv', fields, datamodified);
});

router.get('/provinsi', async(req, res) => {
    const response = await axios.get('https://data.covid19.go.id/public/api/prov.json');
    let list_data = response.data.list_data;
    let datamodified = list_data.map(data => {
        return {
            "provinsi": data.key,
            "kasus": data.jumlah_kasus,
            "dirawat": data.jumlah_dirawat,
            "sembuh": data.jumlah_sembuh,
            "meninggal": data.jumlah_meninggal
        }
    })
    const fields = [
        {
            label: 'provinsi',
            value: 'provinsi'
        },
        {
            label: 'kasus',
            value: 'kasus'
        },
        {
            label: 'dirawat',
            value: 'dirawat'
        },
        {
            label: 'sembuh',
            value: 'sembuh'
        },
        {
            label: 'meninggal',
            value: 'meninggal'
        }
    ]

    downloadCSV(res, 'indonesia-provinsi.csv', fields, datamodified)
})

module.exports = router