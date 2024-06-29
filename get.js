// Fungsi untuk mendapatkan parameter dari URL
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fungsi untuk decode Base64 dengan obfuscation
function decodeBase64Obfuscated(str) {
    // Misalnya kita menambahkan karakter tertentu pada setiap awal string base64
    const obfuscationPrefix = 'prefix_';
    if (str.startsWith(obfuscationPrefix)) {
        str = str.substring(obfuscationPrefix.length);
    }
    return decodeURIComponent(escape(atob(str)));
}

// Fungsi untuk encode Base64 dengan obfuscation
function encodeBase64Obfuscated(str) {
    const obfuscationPrefix = 'prefix_';
    const encodedStr = btoa(unescape(encodeURIComponent(str)));
    return obfuscationPrefix + encodedStr;
}

// Mengambil parameter 'src' dari URL
const srcParam = getParameterByName('src');

// Jika parameter 'src' ada, decode dan setel sebagai atribut src dari iframe
if (srcParam) {
    const decodedSrc = decodeBase64Obfuscated(srcParam);
    document.getElementById('main-iframe').src = decodedSrc;
}
