const { Parser } = require('json2csv');
module.exports = (res, fileName, fields, data) => {
        const json2csv = new Parser({ fields });
        const csv = json2csv.parse(data);
        res.set('Content-Type', 'text/csv');
        res.attachment(fileName);
        return res.send(csv);
}