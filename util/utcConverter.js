module.exports = (tanggal, waktu) => {
    let jam = Number(waktu[0]) - 7;
    waktu.shift(1)
    waktu.unshift(jam)
    let waktuUTC = waktu.join(':');
    let finalTIME = `${tanggal} ${waktuUTC}`;
    return finalTIME
}