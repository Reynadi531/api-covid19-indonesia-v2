const express = require('express')
const router = express.Router();

router.get('/', require('./indonesia/index'));
router.get('/more', require('./indonesia/more'));
router.get('/harian', require('./harian/index'));
router.get('/provinsi', require('./provinsi/index'));
router.get('/provinsi/more', require('./provinsi/more'));
router.get('/provinsi/alt', require('./provinsi/alt'));

module.exports = router;
