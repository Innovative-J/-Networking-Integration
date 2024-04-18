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
function login() {

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
            return result = data.access_token;
        });

    }
}

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

        bodyEl.style.fontSize = '12px';
    }


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
                let tracksHTML = '';

                for (let i = 0; i < 5; i++) {
                    const topTrack = data.message.body.track_list[i].track.track_name;
                    tracksHTML += `<p>${i+1}: ${topTrack}</p>`;
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

    function getAudio() { }


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


const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);



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


