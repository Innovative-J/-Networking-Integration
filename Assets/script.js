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


function getTrackId(track, artist) {

//artistTopTracks(artist);

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
    .catch (error => {
        console.log(error.message);
    })
    .then (data => {
        const trackId = data.message.body.track_list[0].track.track_id;
        return getLyrics(trackId);
    });
}

function getLyrics(trackId) {

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
    .catch (error => {
        console.log(error.message);
    })
    .then (data => {
        const lyrics = data.message.body.lyrics.lyrics_body;
        displayLyrics(lyrics);
    });
}

function displayLyrics(lyrics) {
    const bodyEl = document.getElementById('lyrics-text');
    bodyEl.innerHTML = lyrics;

    //if no lyrics then return "Sorry, we were unable to retrieve lyrics for this song."

}

/*
function artistTopTracks (artist) {
    const requestURL = `https://api.musixmatch.com/ws/1.1/track.search?&q_artist=${encodeURIComponent(artist)}&s_artist_rating=desc&page_size=5&apikey=${mApiKey}`; 

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
       .catch (error => {
            console.log(error.message);
        })
        .then (data => {
            const track = {
                name: 'data.message.body.track_list[i].track_name',
                song: '',
                albumArt: ''
            };
            const bodyEl = document.getElementById('top-tracks');
            bodyEl.innerHTML = data;
            console.log(data);
        });
}*/

/*The site should provide options to play the selected song on Spotify directly. Need to create function to gather Spotify 
song audio from Spotify using their API.*/ 

function getAudio() {

}


//Handles search functionality
function handleSearch() {
    //take user input
    const artistName = document.getElementById('search-artist').value;
    const trackName= document.getElementById('search-song').value;

    getTrackId(trackName, artistName);

    //get audio

}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);









