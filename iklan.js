function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

function displayErrorMessage(message) {
    var errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.querySelector('p').textContent = message;
    errorMessageDiv.style.display = 'block';
    setTimeout(function() {
        errorMessageDiv.style.opacity = 1;
    }, 10);
}

function logError(errorDetails) {
    // Contoh pengiriman log kesalahan ke server untuk analisis lebih lanjut
    fetch('https://www.example.com/log-error', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(errorDetails),
        })
        .then(response => response.json())
        .then(data => console.log('Log kesalahan berhasil:', data))
        .catch((error) => console.error('Gagal mengirim log kesalahan:', error));
}

var sourceURL = getQueryParam('video') || ''; // URL video default
var posterURL = getQueryParam('poster') || ''; // URL poster default
var watermarkURL = getQueryParam('watermark') || ''; // URL watermark default

if (!isValidURL(sourceURL)) {
    var errorMsg = "URL video tidak valid atau tidak ada. Silakan periksa URL dan coba lagi.";
    console.error(errorMsg);
    displayErrorMessage(errorMsg);
    logError({
        error: errorMsg,
        sourceURL: sourceURL
    });
} else {
    var player = new Clappr.Player({
        source: sourceURL,
        height: '100%',
        width: '100%',
        poster: posterURL,
        watermark: watermarkURL,
        position: 'bottom-right',
        autoPlay: true,
        mediacontrol: {
            seekbar: "#ffffff",
            buttons: "#ffffff",
        },
        plugins: [DashShakaPlayback, LevelSelector, ChromecastPlugin, ClapprPIPPlugin],
        chromecast: {
            appId: '9DFB77C0',
            contentType: 'video/mp4',
        },
        parentId: '#player',
        events: {
            onError: function(e) {
                console.error("Terjadi kesalahan: ", e);
                var errorMessage = "Terjadi kesalahan saat memutar video. Silakan coba lagi nanti.";
                if (e && e.code) {
                    switch (e.code) {
                        case 2: // NETWORK_ERROR
                            errorMessage = "Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.";
                            break;
                        case 3: // DECODE_ERROR
                            errorMessage = "Format video tidak didukung. Silakan coba dengan video lain.";
                            break;
                        default:
                            errorMessage = "Kesalahan tidak diketahui. Silakan coba lagi nanti.";
                    }
                }
                displayErrorMessage(errorMessage);
                logError({
                    error: errorMessage,
                    code: e.code,
                    details: e
                });
            },
            onPlay: function() {
                console.log("Memutar");
            },
            onPause: function() {
                console.log("Dijeda");
            },
            onEnded: function() {
                console.log("Video berakhir");
            },
            onTimeUpdate: function(currentTime) {
                console.log("Waktu saat ini: ", currentTime);
            }
        }
    });
}
