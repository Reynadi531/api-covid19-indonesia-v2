const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const { notFound, errorHandler, cacheControl } = require('./middlewares');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(compression());


app.use(cacheControl);

const indonesiaRoutes = require('./Routes/indonesia');

app.use('/api/indonesia', indonesiaRoutes);

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.get('/api', (req, res) => {
    const url = `${req.protocol}://${req.hostname}${req.hostname == 'localhost' ? `:${PORT}` : ''}`;
    res.json({
        "message": "Selamat Datang di API COVID-19 INDONESIA - Enjoy My Work",
        "projects source": "https://github.com/Reynadi531/api-covid19-indonesia-v2",
        "endpoints": [
            `${url}/api/indonesia`,
            `${url}/api/indonesia/more`,
            `${url}/api/indonesia/harian`,
            `${url}/api/indonesia/provinsi`,
            `${url}/api/indonesia/provinsi/more`,
        ]
    });
});

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
