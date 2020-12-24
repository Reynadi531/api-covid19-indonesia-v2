const express = require('express');
const router = express.Router();
const axios = require('axios');
const downloadCSV = require('../util/csvDownloader') 

router.get('/', require('./csv/indonesia'))
router.get('/harian', require('./csv/harian'));
router.get('/provinsi', require('./csv/provinsi'));
router.get('/provinsi/alt', require('./csv/provinsi-alt'));

module.exports = router