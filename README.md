# API COVID-19 Indonesia v2

Ini adalah improvisasi dari versi [pertama](https://github.com/Reynadi531/api-covid19-indonesia). Dimana saya menggunakan updater, scrapper dan database, sekarang saya beralih untuk data ke https://data.covid19.go.id/public/api/prov.json dan https://data.covid19.go.id/public/api/update.json. Saya membuat data agar mudah dibaca dan cors compatible. Untuk API vaksin ada [disini](https://github.com/Reynadi531/vaksincovid19-api)

## Deployment
>[JSON API](https://apicovid19indonesia-v2.vercel.app/)<br>
>[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FReynadi531%2Fapi-covid19-indonesia-v2)
>[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/Reynadi531/api-covid19-indonesia-v2)

## Endpoints
* [/api/indonesia](http://apicovid19indonesia-v2.vercel.app/api/indonesia) 
   > Menampilkan data kumulatif terbaru
* [/api/indonesia/more](http://apicovid19indonesia-v2.vercel.app/api/indonesia/more) 
   > Menampilkan data kumulatif terbaru lebih detail
* [/api/indonesia/harian](http://apicovid19indonesia-v2.vercel.app/api/indonesia/harian) 
   > Menampilkan data harian sejak pasien awal <br>
   > Dapat menambahkan query `status` untuk menentukan umur data, contohnya `/api/indonesia/harian?status=latest` atau `/api/indonesia/harian?status=first`
* [/api/indonesia/provinsi](http://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi)
   > Menampilkan data setiap provinsi <br>
   > Dapat menambahkan query `name` untuk menentukan provinsi, contohnya `/api/indonesia/provinsi?name=dki_jakarta`
* [/api/indonesia/provinsi/alt](http://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/alt)
   > Menampilkan data alternative setiap provinsi
* [/api/indonesia/provinsi/more](http://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more)
   > Menampilkan data setiap provinsi lebih detail <br>
   > Dapat menambahkan query `name` untuk menentukan provinsi, contohnya `/api/indonesia/provinsi/more?name=dki_jakarta`
* [/api/indonesia/csv](http://apicovid19indonesia-v2.vercel.app/api/indonesia/csv)
   > Menampilkan data sama dengan /api/indonesia dalam bentuk csv
* [/api/indonesia/csv/harian](http://apicovid19indonesia-v2.vercel.app/api/indonesia/csv/harian)
   > Menampilkan data sama dengan /api/indonesia/harian dalam bentuk csv
* [/api/indonesia/csv/provinsi](http://apicovid19indonesia-v2.vercel.app/api/indonesia/csv/provinsi)
   > Menampilkan data sama dengan /api/indonesia/provinsi dalam bentuk csv
* [/api/indonesia/csv/provinsi/alt](http://apicovid19indonesia-v2.vercel.app/api/indonesia/csv/provinsi/alt)
   > Menampilkan data sama dengan /api/indonesia/provinsi/alt dalam bentuk csv

## Showcase

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

**[MIT license](http://opensource.org/licenses/mit-license.php)**
