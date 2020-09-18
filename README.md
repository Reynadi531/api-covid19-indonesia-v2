# API COVID-19 Indonesia v2

Ini adalah improvisasi dari versi [pertama}(https://github.com/Reynadi531/api-covid19-indonesia). Dimana saya menggunakan updater, scrapper dan database, sekarang saya beralih untuk data dari https://data.covid19.go.id/public/api/prov.json dan https://data.covid19.go.id/public/api/update.json. Saya membuat data agar mudah dibaca dan cors compatible

## Deployment
>[JSON API](https://apicovid19indonesia-v2.vercel.app/)<br>
>[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2FReynadi531%2Fapi-covid19-indonesia)

## Endpoints
    * /api/indonesia 
        > Menampilkan data kumulatif terbaru
    * /api/indonesia/harian 
        > Menampilkan data harian sejak pasien awal
    * /api/indonesia/provinsi
        > Menampilkan data setiap provinsi

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

**[MIT license](http://opensource.org/licenses/mit-license.php)**
