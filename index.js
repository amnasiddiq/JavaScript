document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Spotify");
    let songIndex = 0;
    let audioElement = new Audio('songs/1.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');
    let gif = document.getElementById('gif');
    let masterSongName = document.getElementById('masterSongName');
    let songItem = document.querySelectorAll('.songItem');
    let songs = [
        { songName: "Beat it up", filePath: "songs/1.mp3", coverPath: "covers/7.jpg" },
        { songName: "Back in black", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
        { songName: "Black or white", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
        { songName: "Stairway to heaven", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
        { songName: "The man who sold the world", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }

    ]
    songItem.forEach((element, i) => {
        console.log(element, i);
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.querySelector('.songName').innerText = songs[i].songName;
    });
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    })
    audioElement.addEventListener('timeupdate', () => {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
        
    })
    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    })
    const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        })

    }
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            if (audioElement.src.includes(songs[parseInt(e.target.id)].filePath)) {
                if (audioElement.paused || audioElement.currentTime <= 0) {
                    audioElement.play();
                    e.target.classList.remove('fa-circle-play');
                    e.target.classList.add('fa-circle-pause');
                    gif.style.opacity = 1;
                    masterPlay.classList.remove('fa-circle-play');
                    masterPlay.classList.add('fa-circle-pause');

                } else {
                    audioElement.pause();
                    e.target.classList.remove('fa-circle-pause');
                    e.target.classList.add('fa-circle-play');
                    gif.style.opacity = 0;
                    masterPlay.classList.remove('fa-circle-pause');
                    masterPlay.classList.add('fa-circle-play');
                }
            } else {
                makeAllPlays();
                songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.src = songs[songIndex].filePath;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            }
        });
    });
    document.getElementById('next').addEventListener('click', () => {
        if (songIndex >= 4) {
            songIndex = 0;
        } else {
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
    document.getElementById('previous').addEventListener('click', () => {
        if (songIndex <= 0) {
            songIndex = 0;
        } else {
            songIndex -= 1;
        }
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})