const iframe = document.getElementById('myIframe');
        const loader = document.getElementById('loader');
        const allowedOrigin = new URL(iframe.src).origin;
        let retryCount = 0;
        const maxRetries = 3;

        function showIframe() {
            loader.style.display = 'none';
            iframe.style.display = 'block';
            iframe.style.opacity = '1';
        }

        function handleIframeError() {
            console.warn('Iframe gagal dimuat!');
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Mencoba ulang... Percobaan ${retryCount}/${maxRetries}`);
                setTimeout(() => {
                    iframe.src = iframe.src;
                }, 3000);
            } else {
                alert('Gagal memuat iframe setelah beberapa kali percobaan.');
                loader.style.display = 'none';
            }
        }

        iframe.addEventListener('load', () => {
            try {
                const iframeOrigin = new URL(iframe.contentWindow.location.href).origin;
                if (iframeOrigin !== allowedOrigin) {
                    alert('Redirect dicegah: Iframe mencoba mengarahkan ke situs lain!');
                    iframe.contentWindow.location.href = allowedOrigin;
                }
            } catch (error) {
                console.warn('Tidak bisa mengakses konten iframe:', error);
            }
        });
