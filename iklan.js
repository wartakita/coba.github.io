function getQueryParam(param) {
            var urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        var sourceURL = getQueryParam('video') || ''; // Ganti dengan URL default Anda
        var posterURL = getQueryParam('poster') || ''; // Ganti dengan URL default poster jika ada
        var watermarkURL = getQueryParam('watermark') || ''; // Ganti dengan URL default watermark jika ada

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
                onError: function (e) {
                    console.error("Terjadi kesalahan: ", e);
                },
                onPlay: function () {
                    console.log("Memutar");
                },
                onPause: function () {
                    console.log("Jeda");
                },
                onEnded: function () {
                    console.log("Video berakhir");
                },
                onTimeUpdate: function (currentTime) {
                    console.log("Waktu saat ini: ", currentTime);
                }
            }
        });
