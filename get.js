<!-- Pustaka CryptoJS dari CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
    
    <!-- Script untuk dekripsi dan pengaturan atribut src -->
    <script>
        // Fungsi untuk mendapatkan parameter dari URL
        function getParameterByName(name, url = window.location.href) {
            name = name.replace(/[\[\]]/g, '\\$&');
            let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

        // Fungsi untuk mendekripsi AES
        function decryptAES(ciphertext, passphrase) {
            try {
                const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                return decryptedData;
            } catch (e) {
                console.error('Error decrypting AES:', e);
                return null;
            }
        }

        // Fungsi untuk validasi URL
        function isValidURL(url) {
            try {
                new URL(url);
                return true;
            } catch (_) {
                return false;
            }
        }

        // Mengambil parameter 'src' dari URL
        const srcParam = getParameterByName('src');

        // Passphrase yang digunakan untuk enkripsi dan dekripsi AES
        const passphrase = 'your-passphrase-here';

        // Jika parameter 'src' ada, decode dan setel sebagai atribut src dari iframe
        if (srcParam) {
            const decodedSrc = decryptAES(srcParam, passphrase);
            if (decodedSrc && isValidURL(decodedSrc)) {
                const iframe = document.getElementById('main-iframe');
                if (iframe) {
                    iframe.src = decodedSrc;
                } else {
                    console.error('Element with ID "main-iframe" not found.');
                }
            } else {
                console.error('Invalid decoded URL or decryption failed.');
            }
        }
    </script>
