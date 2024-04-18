window.onSpotifyWebPlaybackSDKReady = async() => {
    const token = 'BQDwWpb49QYA0NLQC9uqgmMMNSRyntKBQLRX0hrEu8O7agLLUVkEiA2ngZT5YtT9vo1Vr6dU7n1UOJF_Notub1Q7JWMq3wRJF7HsrWxNAdh4MlSLtktuSgTIEs-nXG9BOcew5bKtc-Mj6qN8CE0T15hvf6_7VI-itOMyzduI79IkukviNksDMAa_ETAHLNPzYibNzivlOZBA';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // player.addListener('initialization_error', ({ message }) => {
    //     console.error(message);
    // });

    // player.addListener('authentication_error', ({ message }) => {
    //     console.error(message);
    // });

    // player.addListener('account_error', ({ message }) => {
    //     console.error(message);
    // });

    // document.getElementById('togglePlay').onclick = function() {
    //   player.togglePlay();
    // };

    player.connect();
}