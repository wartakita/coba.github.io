// Fungsi untuk mendapatkan parameter dari URL
function getParameterByName(name, url = window.location.href) {
    if (!url) return null; // Memastikan URL ada
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fungsi untuk mencoba decode Base64
function decodeBase64(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        console.error('Error decoding Base64 string:', e);
        return null;
    }
}

// Fungsi untuk mengacak Base64 agar tidak bisa didecode
function obfuscateBase64(str) {
    return str.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');
}

// Mengambil parameter 'src' dari URL
const srcParam = getParameterByName('src');

// Jika parameter 'src' ada, obfuscate dan setel sebagai atribut src dari iframe
if (srcParam) {
    const obfuscatedSrc = obfuscateBase64(srcParam);
    const decodedSrc = decodeBase64(obfuscatedSrc);
    if (decodedSrc) {
        const iframe = document.getElementById('main-iframe');
        if (iframe) {
            iframe.src = decodedSrc;
        } else {
            console.error('Element with id "main-iframe" not found.');
        }
    } else {
        console.error('Decoded src is invalid or Base64 decoding failed.');
    }
} else {
    console.error('Parameter "src" not found in URL.');
}
