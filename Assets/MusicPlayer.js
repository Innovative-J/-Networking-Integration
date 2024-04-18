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

    // add button on play even listener
    document.getElementById('togglePlay').onclick = function() {
        player.togglePlay();
      };


    player.connect();
}

const device_id = device_id;

fetch("https://api.spotify.com/v1/me/player/play?device_id=" + device_id, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + ${getToken}
  },
  body: JSON.stringify({
    uris: ["spotify:track:5ya2gsaIhTkAuWYEMB0nw5"] 
  })
})
.then(response => response.json())
.then(data => {
  console.log(data); 
});