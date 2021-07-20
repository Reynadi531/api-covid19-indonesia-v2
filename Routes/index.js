const express = require('express')
const router = express.Router();

router.get('/', require('./indonesia/index'));
router.get('/more', require('./indonesia/more'));
router.get('/harian', require('./harian/index'));
router.get('/harian/latest', require('./harian/latest'));
router.get('/provinsi/:nama', require('./provinsi/index'));
router.get('/provinsi/:nama/latest/', require('./provinsi/latest'))
router.get('/provinsi/:nama/more/', require('./provinsi/more'));

module.exports = router;
