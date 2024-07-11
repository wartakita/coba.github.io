function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function decodeBase64(str) {
    try {
        return decodeURIComponent(atob(str).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    } catch (e) {
        console.error("Error decoding Base64 string: ", e);
        return '';
    }
}

var encryptedSourceURL = getQueryParam('video') || ''; // Ambil URL terenkripsi dari query parameter
var posterURL = getQueryParam('poster') || 'DEFAULT_POSTER_URL_HERE'; // Ganti dengan URL default poster jika ada

var sourceURL = encryptedSourceURL ? decodeBase64(encryptedSourceURL) : 'DEFAULT_VIDEO_URL_HERE'; // Dekripsi URL

var player = new Clappr.Player({
    source: sourceURL,
    height: '100%',
    width: '100%',
    poster: posterURL,
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
            console.error("Error occurred: ", e);
        },
        onPlay: function() {
            console.log("Playing");
        },
        onPause: function() {
            console.log("Paused");
        },
        onEnded: function() {
            console.log("Video ended");
        },
        onTimeUpdate: function(currentTime) {
            console.log("Current time: ", currentTime);
        }
    }
});
 // Function to update time in WIB
            function updateTime() {
                const now = new Date();
                const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const timeString = now.toLocaleTimeString('en-GB', options);
                document.getElementById('timeDisplay').textContent = `${timeString} WIB`;
            }

            // Update time every second
            setInterval(updateTime, 1000);
            updateTime();  // Initial call to set time immediately
        });
