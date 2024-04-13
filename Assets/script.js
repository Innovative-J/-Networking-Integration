console.log("hello world!");

// spotify api
function authenticate() {}

//Function to take user input for login

function login() {
    // const buffer = new ArrayBuffer()
    fetch('https://accounts.spotify.com/api/token',{
        method:'POST',
        body: `grant_type=client_credentials&client_id= `
    })



// remake #3 currently fixing the issues with token and uncaught promise.

    const authOption = {
        headers: {
            'Authorization': 'Basic' + (btoa('b9bb37e8b2a54a508b6cb8940440243b' + ':' + 'cbb8435b6fb84099825819fb12220fc8').toString('base64'))
        },
        form:{
        grant_type: 'client_credentials'
        },
        json: true
    }
    fetch('https://accounts.spotify.com/api/token', authOption,{
        method: 'POST'
    }).then(function(repsonse){
        return repsonse.json();
        }).then(function(data){
            console.log(data)
        })


// current api below was a remake of 1 and 2, its there for reference 
//   const qstring = {
//     response_type: "code",
//     client_id: "b9bb37e8b2a54a508b6cb8940440243b",
//     redirect_uri: "http://localhost:3000/callback",
//   };
//   fetch("https://accounts.spotify.com/authorize?" + JSON.stringify(qstring),{
//     mode:'no-cors'
//   }).then(function(response){
//     return response.json();
//   }).then(function(data){
//     console.log('spotifyData', data)
//   });

  // fetch('https://accounts.spotify.com/authorize?', {

  //     // getting info
  //     headers: {
  //         //
  //         'Accept': 'applications/json',
  //         'Content-Type': 'application/json',
  //         // 'Access-Control-Allow-Origin': '*',
  //         'response_type': 'code',
  //         'client_id':'b9bb37e8b2a54a508b6cb8940440243b',
  //         'redirect_uri': 'Http://localhost3000',

  //     }
  // }).then(function (response){
  //     return response.json()
  // }).then(function (data){
  //     console.log('spotify', data)
  // })
}
login();

// .then creating a promise will be excuted

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

function getSongName() {}

function getArtistName() {}

//Handles search functionality
function handleSearch() {}
