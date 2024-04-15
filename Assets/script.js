const mApiKey = '363fa0717b84ce5037dd3d286985b633'; 


// Function to store data in localStorage if it doesn't already exist
function storeDataInLocalStorage(key, data) {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}

// Function to retrieve data from localStorage
function getDataFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

//Function to take user input for login
function login () {

}



/*When selecting a song, the app should retrieve and display lyrics from MusiXMatch, if available. Create a JS function to get 
the lyrics from MusiXMatch using their API. If lyrics are not available, the site should indicate that they are not found. */

//root URL https://api.musixmatch.com/ws/1.1/
function getTrackId(track, artist) {

const requestURL = `https://api.musixmatch.com/ws/1.1/track.search?&q_artist=${encodeURIComponent(artist)}&q_track=${encodeURIComponent(track)}&page_size=1&s_artist_rating=desc&apikey=${mApiKey}`; 

fetch (requestURL, { 
    mode: 'cors',
    method: 'GET',
})
    .then (response => {
        if (!response.ok) {
            console.log(response); 
            return;
        }
        return response.json();
    })
   /* .catch (error => {
        console.log('You have an error dumbie');
        console.log(error.message);
    })*/
    .then (data => {
        const trackId = data.message.body.track_list[0].track.track_id;
        console.log(data.message.body.track_list[0].track.track_id);
        return trackId;
    });
    return trackId;
}

getTrackId("physical", "dua lipa"); //used to test function 

function getLyrics() {

const requestURL = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${mApiKey}`;

fetch (requestURL, { 
    mode: 'cors',
    method: 'GET',
})
    .then (response => {
        if (!response.ok) {
            console.log(response); 
            return;
        }
        return response.json();
    })
   /* .catch (error => {
        console.log('You have an error dumbie');
        console.log(error.message);
    })*/
    .then (data => {
        console.log(data.message.body.lyrics.lyrics_body);
    });
}

getLyrics("194285001"); //Test function

function displayLyrics(lyrics) {
    console.log(lyrics);

    //if no lyrics then return "Sorry, we were unable to retrieve lyrics for this song."

}

/*The site should provide options to play the selected song on Spotify directly. Need to create function to gather Spotify 
song audio from Spotify using their API.*/ 

function getAudio() {

}

/*Upon searching, the app should fetch and display relevant results from Spotify. Create a JavaScript function to retrieve 
the song name and artist name.*/ 

function getSongName() {

}

function getArtistName() {

}

//Handles search functionality
async function handleSearch() {
    //take user input
    const artistName = '';
    const trackName= '';

    const trackId = await getTrackId(trackName, artistName);
    const lyrics = await getLyrics(trackId);
    displayLyrics(lyrics);

}







