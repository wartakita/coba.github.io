// Fungsi untuk mendapatkan parameter dari URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fungsi untuk decode Base64
function decodeBase64(str) {
    try {
        return decodeURIComponent(atob(str));
    } catch (e) {
        console.error('Invalid Base64 string:', e);
        return null;
    }
}

// Fungsi untuk encrypt dengan AES
function encryptBase64(base64Str, secretKey) {
    return CryptoJS.AES.encrypt(base64Str, secretKey).toString();
}

// Fungsi untuk decrypt AES
function decryptBase64(encryptedStr, secretKey) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedStr, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error('Failed to decrypt:', e);
        return null;
    }
}

// Fungsi untuk sanitasi URL (menghapus karakter berbahaya)
function sanitizeURL(url) {
    const element = document.createElement('a');
    element.href = url;
    return element.href; // Mengembalikan URL yang aman
}

// Kunci rahasia untuk enkripsi/dekripsi
const secretKey = 'mySecretKey123'; // Ganti dengan kunci rahasia Anda

// Mengambil parameter 'src' dari URL
const srcParam = getParameterByName('src');

// Jika parameter 'src' ada, decode dan setel sebagai atribut src dari iframe
if (srcParam) {
    const decryptedSrc = decryptBase64(srcParam, secretKey);
    if (decryptedSrc) {
        const sanitizedSrc = sanitizeURL(decryptedSrc); // Sanitasi URL sebelum disetel
        document.getElementById('main-iframe').src = sanitizedSrc;
    } else {
        console.error('Failed to decrypt the src parameter.');
    }
}

// Contoh untuk mengenkripsi Base64
const originalBase64 = btoa('https://example.com'); // Contoh data
const encryptedBase64 = encryptBase64(originalBase64, secretKey);
console.log('Encrypted Base64:', encryptedBase64);
