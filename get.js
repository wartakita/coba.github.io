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
                return decodeURIComponent(escape(atob(str)));
            } catch (e) {
                console.error('Error decoding Base64 string:', e);
                return null;
            }
        }

        // Fungsi untuk mendekripsi AES
        function decryptAES(encrypted, key) {
            try {
                const bytes = CryptoJS.AES.decrypt(encrypted, key);
                return bytes.toString(CryptoJS.enc.Utf8);
            } catch (e) {
                console.error('Error decrypting AES string:', e);
                return null;
            }
        }

        // Mengambil parameter 'src' dari URL
        const srcParam = getParameterByName('src');
        const key = 'rajawalistreamid';  // Ganti dengan kunci enkripsi Anda

        // Jika parameter 'src' ada, decode dan dekripsi, lalu setel sebagai atribut src dari iframe
        if (srcParam) {
            const decodedSrc = decodeBase64(srcParam);
            if (decodedSrc) {
                const decryptedSrc = decryptAES(decodedSrc, key);
                if (decryptedSrc) {
                    const iframe = document.getElementById('main-iframe');
                    if (iframe) {
                        iframe.src = decryptedSrc;
                    } else {
                        console.error('Element with id "main-iframe" not found.');
                    }
                } else {
                    console.error('Decrypted src is invalid.');
                }
            } else {
                console.error('Decoded src is invalid.');
            }
        } else {
            console.error('Parameter "src" not found in URL.');
        }
