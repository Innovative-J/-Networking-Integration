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
function login() {}

    async function getToken() {
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
            return data.access_token;
        });

    }


    //   getting tracks
//  const getTracks = async (getToken, tracksEnd Point);



    //   getToken();


    function getTrackId(track, artist) {

        const requestURL = `https://api.musixmatch.com/ws/1.1/track.search?&q_artist=${encodeURIComponent(artist)}&q_track=${encodeURIComponent(track)}&page_size=1&s_artist_rating=desc&apikey=${mApiKey}`;

        fetch(requestURL, {
            mode: 'cors',
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    return;
                }
                return response.json();
            })
            .catch(error => {
                console.log(error.message);
            })
            .then(data => {
                const trackId = data.message.body.track_list[0].track.track_id;
                return getLyrics(trackId);
            });
    }

    function getLyrics(trackId) {

const requestURL = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${mApiKey}`;

        fetch(requestURL, {
            mode: 'cors',
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    return;
                }
                return response.json();
            })
            .catch(error => {
                console.log(error.message);
            })
            .then(data => {
                const lyrics = data.message.body.lyrics.lyrics_body;
                displayLyrics(lyrics);
            });
    }

    function displayLyrics(lyrics) {
        const cleanedLyrics = lyrics.replace(/\(\d+\)/g, '');
        const formattedLyrics = cleanedLyrics.replace(/\n/g, '<br>');
        const bodyEl = document.getElementById('lyrics-text');
        bodyEl.innerHTML = formattedLyrics;

        bodyEl.style.fontSize = '18px';
        bodyEl.style.color = 'black';
        bodyEl.style.textAlign = 'center'
        
    }
        //if no lyrics then return "Sorry, we were unable to retrieve lyrics for this song."



/*The site should provide options to play the selected song on Spotify directly. Need to create function to gather Spotify 
song audio from Spotify using their API.*/ 
 //Gets and displays artist top 5 tracks
 function artistTopTracks (artist) {
    const requestURL = `https://api.musixmatch.com/ws/1.1/track.search?&q_artist=${encodeURIComponent(artist)}&s_artist_rating=desc&s_track_rating=desc&page_size=5&apikey=${mApiKey}`; 

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
            const bodyEl = document.getElementById('top-tracks');
            bodyEl.style.backgroundColor = 'white';
            bodyEl.style.fontSize = '20px';
            bodyEl.style.borderRadius = '10px';

            let tracksHTML = '';

            for (let i = 0; i < 5; i++) {
                const topTrack = data.message.body.track_list[i].track.track_name;
                tracksHTML += `<p>${i+1}: ${topTrack}</p><br>`;
            }
            bodyEl.innerHTML = tracksHTML;
        });
}  
/*
    function musicPlayerHTML() {
        const = document.getElementById('search-artist').value;
        const = document.getElementById('search-artist').value;
        bodyEl.innerHTML = lyrics;
        bodyEl.innerHTML = lyrics;
    }*/

    /*The site should provide options to play the selected song on Spotify directly. Need to create function to gather Spotify 
    song audio from Spotify using their API.*/

     


    //Handles search functionality
    function handleSearch() {
        //take user input
        const artistName = document.getElementById('search-artist').value;
        const trackName = document.getElementById('search-song').value;

        getTrackId(trackName, artistName);

        artistTopTracks(artistName);

        //Stores search inputs into local storage
        const searchData = {
            artist: artistName,
            song: trackName
        };
        storeDataInLocalStorage('mySearchData', searchData);

        //get audio

    }

//Load search result from local storage on page load
window.addEventListener('load', function () {
    const searchData = getDataFromLocalStorage('mySearchData');

    if(searchData) {
        const artistEl = document.getElementById('search-artist');
        const trackEl = document.getElementById('search-song');

        artistEl.value = searchData.artist;
        trackEl.value = searchData.song;

        this.localStorage.clear();
    }
});

    //Handles search functionality
    function handleSearch() {
        //take user input
        const artistName = document.getElementById('search-artist').value;
        const trackName = document.getElementById('search-song').value;

async function searchSpotifyArtist(artistName, accessToken) {
    const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`;
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await fetch(apiUrl, { headers });
        if (!response.ok) {
            throw new Error('Failed to retrieve artist details from Spotify API');
        }
        const data = await response.json();
        return data.artists.items;
    } catch (error) {
        console.error(error);
        return [];
    }
}
        getTrackId(trackName, artistName);

        artistTopTracks(artistName);

        //Stores search inputs into local storage
        const searchData = {
            artist: artistName,
            song: trackName
        };
        storeDataInLocalStorage('mySearchData', searchData);

        //get audio

    }

//Load search result from local storage on page load
window.addEventListener('load', function () {
    const searchData = getDataFromLocalStorage('mySearchData');

    if(searchData) {
        const artistEl = document.getElementById('search-artist');
        const trackEl = document.getElementById('search-song');

        artistEl.value = searchData.artist;
        trackEl.value = searchData.song;

        this.localStorage.clear();
    }
});



const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);



    

    function getArtistName() {

    }

    //Handles search functionality
    async function handleSearch() {
        //take user input
        const artistName = '';
        const trackName = '';

        const trackId = await getTrackId(trackName, artistName);
        const lyrics = await getLyrics(trackId);
        displayLyrics(lyrics);

    }
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

// basic function variables
let mpProgress = document.getElementById("mpProgress");
let mpSong = document.getElementById("mpSong");
let mpPlay = document.getElementById("mpPlay");
let mpBack = document.getElementById("mpBack")
let mpForward = document.getElementById("mpForward")

// function for song slider
mpSong.onloadedmetadata = function(){
    mpProgress.max = mpSong.duration;
    mpProgress.value = mpSong.currentTime;
    console.log(mpSong.currentTime);
}

// pause play function
function playPause() {
    console.log('mpPlay:', mpPlay);
    console.log('mpSong:', mpSong);
    
    if (mpPlay.classList.contains("fa-pause")) {
        mpSong.pause();
        mpPlay.classList.remove("fa-pause");
        mpPlay.classList.add("fa-play");
        console.log('Paused');
    } else {
        mpSong.play();
        mpPlay.classList.add("fa-pause");
        mpPlay.classList.remove("fa-play");
        console.log('Playing');
    }
}


// moving slider function
if(mpSong.play()) {
    setInterval(()=>{
        mpProgress.value = mpSong.currentTime
    },500);
}

mpProgress.onchange = function(){
    mpSong.play();
    mpSong.currentTime = mpProgress.value;
    mpPlay.classList.add("fa-pause");
    mpPlay.classList.remove("fa-play");
}

// fast forward function
function fastForward() {
    // Specify the amount of time to fast-forward in seconds
    const fastForwardTime = 10; // Change the value to adjust how much to fast forward

    // Calculate the new current time
    const newCurrentTime = mpSong.currentTime + fastForwardTime;

    // Ensure the new current time does not exceed the duration of the song
    if (newCurrentTime < mpSong.duration) {
        mpSong.currentTime = newCurrentTime;
        mpProgress.value = newCurrentTime;
    } else {
        // If the new current time exceeds the duration, set it to the end of the song
        mpSong.currentTime = mpSong.duration;
        mpProgress.value = mpSong.duration;
    }
}

// rewind function
// Define the amount to rewind (e.g., 10 seconds)
const rewindAmount = 10;

// Function to rewind the audio
function rewind() {
    // Calculate the new current time by subtracting the rewind amount
    let newTime = mpSong.currentTime - rewindAmount;
    // Ensure the new time does not go below 0
    if (newTime < 0) {
        newTime = 0;
    }
    // Set the current time of the audio to the new time
    mpSong.currentTime = newTime;
    // Update the progress slider to match the new current time
    mpProgress.value = mpSong.currentTime;
}

// modal functionality
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
  });