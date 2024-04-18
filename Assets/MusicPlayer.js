window.onSpotifyWebPlaybackSDKReady = async () => {
  const token = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace 'YOUR_SPOTIFY_ACCESS_TOKEN' with your actual access token
  const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);

      // Connect to Spotify
      player.connect().then(success => {
          if (success) {
              console.log('The Web Playback SDK successfully connected to Spotify!');
              // Play a track (replace 'YOUR_DEVICE_ID' and 'YOUR_TRACK_URI' with actual values)
              playTrack(device_id, 'YOUR_TRACK_URI');
          }
      });
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
  });

  // Toggle play/pause button
  document.getElementById('togglePlay').onclick = function () {
      player.togglePlay();
  };
};

function playTrack(device_id, track_uri) {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Ensure 'token' variable is in scope
      },
      body: JSON.stringify({
          uris: [track_uri]
      })
  })
      .then(response => response.json())
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error('Error playing track:', error);
      });
}
