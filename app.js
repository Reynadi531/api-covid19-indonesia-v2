const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { notFound, errorHandler } = require('./middlewares');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const indonesiaRoutes = require('./Routes/indonesia');

app.use('/api/indonesia', indonesiaRoutes);

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.get('/api', (req, res) => {
    res.json({
        "message": "Selamat Datang di API COVID-19 INDONESIA - Enjoy My Work",
        "projects source": "https://github.com/Reynadi531/api-covid19-indonesia-v2",
        "endpoints": [
            `${req.protocol}://${req.hostname}${req.hostname == 'localhost' ? `:${PORT}` : ''}/api/indonesia`,
            `${req.protocol}://${req.hostname}${req.hostname == 'localhost' ? `:${PORT}` : ''}/api/indonesia/harian`,
            `${req.protocol}://${req.hostname}${req.hostname == 'localhost' ? `:${PORT}` : ''}/api/indonesia/provinsi`,
        ]
    });
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));