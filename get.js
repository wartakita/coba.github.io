// Import library CryptoJS
const CryptoJS = require("crypto-js");

// Fungsi untuk mendapatkan parameter dari URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Kunci AES Anda (contoh, harus disimpan secara aman dan tidak diungkapkan)
const secretKey = "kunciRahasiaAnda123";

// Fungsi untuk melakukan enkripsi AES
function encryptAES(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}

// Mengambil parameter 'src' dari URL
const srcParam = getParameterByName('src');

// Jika parameter 'src' ada, decrypt dan setel sebagai atribut src dari iframe
if (srcParam) {
    const decodedSrc = decryptAES(srcParam, secretKey);
    if (decodedSrc) {
        const iframe = document.getElementById('main-iframe');
        if (iframe) {
            iframe.src = decodedSrc;
        } else {
            console.error('Elemen dengan id "main-iframe" tidak ditemukan.');
        }
    } else {
        console.error('Parameter src tidak valid.');
    }
} else {
    console.error('Tidak ada parameter src yang ditemukan di URL.');
}

// Fungsi untuk melakukan dekripsi AES
function decryptAES(ciphertext, key) {
    try {
        const bytes  = CryptoJS.AES.decrypt(ciphertext, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error('Gagal melakukan dekripsi AES:', e);
        return null;
    }
}
