// Function to get parameter value from URL
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Here we pass our MPEG-DASH streaming source
    const src = {
        //dash: ' ',
        // For older devices and iOS where MPEG-DASH is not supported, we provide a HLS (or MP4) fallback
        hls: getParameterByName('hls') || ''
    };
    const settings = {
        licenseKey: 'Y2Vnc3NhbWFjbSEqXyUwdXZkNHZkNHYyK2NlZDBnZTcyeWVpP3JvbTVkYXNpczMwZGIwQSVfKg==',
        src: src,
        autoHeightMode: true,
        autoHeightModeRatio: 1.7777777778,
        autoplay: true,
        viewablePlayPause: false,
        preload: "auto",
        sharing: true,
        gaTrackingId: "UA-143545378-1",
        skin: "s2",
        // Here we need to state that MPEG-DASH is preferred over HLS, when both are available on the device
        dashFirst: true,
        shakaDrm: {
            servers: {
                //"com.widevine.alpha": 'https://drmwidevine.nontonbola.my.id/https://mrpw.ptmnc01.verspective.net/?deviceId=YzM0NDA0MTItMGYyMC0zNGQ0LTliMjMtNDY4MjE1ZjA5NmZj',
                //clearKeys: {
                //'5b9753643572b0c6c467793b50900029': 'ebeda1cf36dae2b0bdedf1065129ea93',
            }
        }
    };
    const rmp = new RadiantMP('rmp');
    rmp.init(settings);
