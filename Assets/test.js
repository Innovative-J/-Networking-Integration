// basic function variables

let mpProgress = document.getElementById("mpProgress");
let mpSong = document.getElementById("mpSong");
let mpPlay  = document.getElementById("mpPlay");

//function for song slider
mpSong.onloadedmetadata = function(){
    mpProgress.max = mpSong.duration;
    mpProgress.value = mpSong.currentTime;
}

// pause play function
function playPause(){
    if(mpPlay.classList.contains("fa-pause")){
        mpSong.pause();
        mpPlay.classList.remove("fa-pause");
        mpPlay.classList.add("fa-play");
    } else {
        mpSong.play();
        mpPlay.classList.add("fa-pause");
        mpPlay.classList.remove("fa-play");
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
