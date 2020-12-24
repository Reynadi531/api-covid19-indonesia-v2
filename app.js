const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cacheControl = require('express-cache-controller');

const { notFound, errorHandler } = require('./middlewares');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cacheControl({ maxAge: 60, sMaxAge: 60 }));
app.use(compression());

const indonesiaRoutes = require('./Routes/index');
const indonesiaCSVRoutes = require('./Routes/csvRouter');

app.use('/api/indonesia', indonesiaRoutes);
app.use('/api/indonesia/csv', indonesiaCSVRoutes);

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.get('/api', (req, res) => {
    const url = `${req.protocol}://${req.hostname}${req.hostname == 'localhost' ? `:${PORT}` : ''}`;
    res.json({
        "message": "Selamat Datang di API COVID-19 INDONESIA - Enjoy My Work",
        "projects source": "https://github.com/Reynadi531/api-covid19-indonesia-v2",
        "endpoints": {
            "kumulatif": [
                `${url}/api/indonesia`,
                `${url}/api/indonesia/more`
            ],
            "harian": [
                `${url}/api/indonesia/harian`,
            ],
            "provinsi": [
                `${url}/api/indonesia/provinsi`,
                `${url}/api/indonesia/provinsi/alt`,
                `${url}/api/indonesia/provinsi/more`,
            ],
            "csv": {
                "kumulatif": [
                    `${url}/api/indonesia/csv`,
                ],
                "harian": [
                    `${url}/api/indonesia/csv/harian`,
                ],
                "provinsi": [
                    `${url}/api/indonesia/csv/provinsi`,
                    `${url}/api/indonesia/csv/provinsi/alt`,
                ]
            }
        }
    });
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
