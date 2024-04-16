console.log("hello world!");

// spotify api


async function getToken()  {
    console.log("Calling getToken!");
    const headersObj = {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(
        `b9bb37e8b2a54a508b6cb8940440243b:cbb8435b6fb84099825819fb12220fc8`
      ).toString("base64")}`,
      json: true,
    };
    return fetch(
      "https://accounts.spotify.com/api/token?grant_type=client_credentials",
      {
        method: "POST",
        headers: headersObj,
      }
    ).then(function (response) {
        console.log("Response:", response);
        return response.json();
      }).then(function (data) {
        console.log("Data", data);
         return result = data.access_token;
      });

  }
  
//   getToken();





// get artist
async function getArtist(){
    const token= await getToken();
    const search = 'artist:Drake';
    console.log('token', token)
fetch(`https://api.spotify.com/v1/search?q=${search}&type=artist&local=en-US`, {
   method:'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(function(response){
    console.log('response',response.json())
    return response.json()
}).then(function(data){
    console.log('data', data)
    return data 
})
}
 getArtist()

// create a form that retunts the 
// repeat the retuns and .then





// }

/*When selecting a song, the app should retrieve and display lyrics from MusiXMatch, if available. Create a JS function to get 
the lyrics from MusiXMatch using their API. If lyrics are not available, the site should indicate that they are not found. */

//root URL https://api.musixmatch.com/ws/1.1/

function getLyrics() {}

function displayLyrics() {
  //if no lyrics then return "Sorry, we were unable to retrieve lyrics for this song."
}

/*The site should provide options to play the selected song on Spotify directly. Need to create function to gather Spotify 
song audio from Spotify using their API.*/

function getAudio() {}

/*Upon searching, the app should fetch and display relevant results from Spotify. Create a JavaScript function to retrieve 
the song name and artist name.*/

// Function to search for artists and songs using the Spotify API
function searchSpotify(query) {
    // const accessToken = getToken();

    // // Encode the query string
    // const encodedQuery = encodeURIComponent(query);

    // // Spotify API endpoint for searching artists and tracks
    // const apiUrl = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=artist,track`;

    // // Fetch data from Spotify API
    // fetch(apiUrl, {
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     // Example: Display the first artist and track in the console
    //     if (data.artists && data.artists.items.length > 0) {
    //         console.log('Artist:', data.artists.items[0]);
    //     }
    //     if (data.tracks && data.tracks.items.length > 0) {
    //         console.log('Track:', data.tracks.items[0]);
    //     }
    // })
    // .catch(error => {
    //     // displays an error message when fail to fetch
    //     console.error('Error fetching data:', error);
    // });
}

// Example usage:
