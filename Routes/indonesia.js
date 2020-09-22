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

router.get('/more', async(req, res) => {
    const response = await axios.get(url);
    res.json({
        "total": {
            "positif": response.data.update.total.jumlah_positif,
            "dirawat": response.data.update.total.jumlah_dirawat,
            "sembuh": response.data.update.total.jumlah_sembuh,
            "meninggal": response.data.update.total.jumlah_meninggal,
            "lastUpdate": new Date(response.data.update.penambahan.created)
        },
        "penambahan": {
            "positif": response.data.update.penambahan.jumlah_positif,
            "dirawat": response.data.update.penambahan.jumlah_dirawat,
            "sembuh": response.data.update.penambahan.jumlah_sembuh,
            "meninggal": response.data.update.penambahan.jumlah_meninggal,
            "tanggal": response.data.update.penambahan.tanggal,
            "created": new Date(response.data.update.penambahan.created),
        },
        "data": {
            "odp": response.data.data.jumlah_odp,
            "pdp": response.data.data.jumlah_pdp,
            "total_spesimen": response.data.data.total_spesimen,
            "total_spesimen_negatif": response.data.data.total_spesimen_negatif,
        }
    });
});

router.get('/harian', async(req, res) => {
    const response = await axios.get(url);
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
    res.json(datamodified);
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
    res.json(datamodified);
});

router.get('/provinsi/more', async(req, res) => {
    const response = await axios.get('https://data.covid19.go.id/public/api/prov.json');
    let list_data = response.data.list_data;
    let datamodified = list_data.map(data => {
        return {
            "provinsi": data.key,
            "kasus": data.jumlah_kasus,
            "dirawat": data.jumlah_dirawat,
            "sembuh": data.jumlah_sembuh,
            "meninggal": data.jumlah_meninggal,
            "jenis_kelamin": {
                "laki-laki": data.jenis_kelamin[0].doc_count,
                "perempuan": data.jenis_kelamin[1].doc_count,
            },
            "kelompok_umur": {
                "0-5_tahun" : data.kelompok_umur[0].doc_count, 
                "6-18_tahun" : data.kelompok_umur[1].doc_count, 
                "19-30_tahun" : data.kelompok_umur[2].doc_count, 
                "31-45_tahun" : data.kelompok_umur[3].doc_count, 
                "46-59_tahun" : data.kelompok_umur[4].doc_count, 
                "≥60_tahun" : data.kelompok_umur[5].doc_count, 
            },
            "penambahan": {
                "positif": data.penambahan.positif,
                "sembuh": data.penambahan.sembuh,
                "meninggal": data.penambahan.meninggal,
            },
            "lokasi": {
                "lon": data.lokasi.lon,
                "lat": data.lokasi.lat
            }
        }
    });
    res.json(datamodified);
})

module.exports = router;
