// ==========================================
// MUSIC PLAYER - CODEALPHA INTERNSHIP
// ==========================================

const songs = [
    {
        title: "Calm Morning",
        artist: "LAKSHMIDEVI GUVVA",
        file: "music/song1.mp3"
    },
    {
        title: "Dream Journey",
        artist: "LAKSHMIDEVI GUVVA",
        file: "music/song2.mp3"
    },
    {
        title: "Night Vibes",
        artist: "LAKSHMIDEVI GUVVA",
        file: "music/song3.mp3"
    }
];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const audioPlayer = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volumeBar");
const muteBtn = document.getElementById("muteBtn");

const playlist = document.getElementById("playlist");
const trackCount = document.getElementById("trackCount");

const artwork = document.getElementById("artwork");


// ==========================================
// CURRENT SONG
// ==========================================

let currentSongIndex = 0;


// ==========================================
// CREATE PLAYLIST
// ==========================================

function createPlaylist() {

    playlist.innerHTML = "";

    trackCount.textContent = `${songs.length} Songs`;

    songs.forEach((song, index) => {

        const item = document.createElement("div");

        item.className = "playlist-item";

        item.innerHTML = `
            <div class="track-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="track-info">
                <strong>${song.title}</strong>
                <span>${song.artist}</span>
            </div>

            <div class="track-icon">
                ♪
            </div>
        `;

        // CLICK SONG
        item.addEventListener("click", () => {

            loadSong(index);

            playSong();

        });

        playlist.appendChild(item);

    });

}


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    // Set audio file
    audioPlayer.src = song.file;

    // Update song information
    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    // Reset progress
    progressBar.value = 0;

    currentTime.textContent = "00:00";

    // Update active playlist item
    const playlistItems =
        document.querySelectorAll(".playlist-item");

    playlistItems.forEach((item, i) => {

        item.classList.toggle(
            "active",
            i === currentSongIndex
        );

    });

}


// ==========================================
// PLAY SONG
// ==========================================

function playSong() {

    audioPlayer.play()
        .then(() => {

            playBtn.textContent = "❚❚";

            playBtn.setAttribute(
                "aria-label",
                "Pause"
            );

            artwork.classList.add("playing");

        })
        .catch((error) => {

            console.error(
                "Audio could not play:",
                error
            );

        });

}


// ==========================================
// PAUSE SONG
// ==========================================

function pauseSong() {

    audioPlayer.pause();

    playBtn.textContent = "▶";

    playBtn.setAttribute(
        "aria-label",
        "Play"
    );

    artwork.classList.remove("playing");

}


// ==========================================
// PLAY / PAUSE BUTTON
// ==========================================

playBtn.addEventListener("click", () => {

    if (audioPlayer.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ==========================================
// NEXT SONG
// ==========================================

nextBtn.addEventListener("click", () => {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;

    }

    loadSong(currentSongIndex);

    playSong();

});


// ==========================================
// PREVIOUS SONG
// ==========================================

previousBtn.addEventListener("click", () => {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;

    }

    loadSong(currentSongIndex);

    playSong();

});


// ==========================================
// AUDIO TIME UPDATE
// ==========================================

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (audioPlayer.duration) {

            const progress =
                (audioPlayer.currentTime /
                    audioPlayer.duration) * 100;

            progressBar.value = progress;

            currentTime.textContent =
                formatTime(audioPlayer.currentTime);

        }

    }
);


// ==========================================
// SONG DURATION
// ==========================================

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audioPlayer.duration);

    }
);


// ==========================================
// PROGRESS BAR
// ==========================================

progressBar.addEventListener(
    "input",
    () => {

        if (audioPlayer.duration) {

            audioPlayer.currentTime =
                (progressBar.value / 100) *
                audioPlayer.duration;

        }

    }
);


// ==========================================
// AUTO NEXT SONG
// ==========================================

audioPlayer.addEventListener(
    "ended",
    () => {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }

        loadSong(currentSongIndex);

        playSong();

    }
);


// ==========================================
// VOLUME
// ==========================================

audioPlayer.volume = 0.8;

volumeBar.value = 0.8;

volumeBar.addEventListener(
    "input",
    () => {

        audioPlayer.volume =
            volumeBar.value;

    }
);


// ==========================================
// MUTE / UNMUTE
// ==========================================

muteBtn.addEventListener(
    "click",
    () => {

        audioPlayer.muted =
            !audioPlayer.muted;

        if (audioPlayer.muted) {

            muteBtn.textContent = "🔇";

        } else {

            muteBtn.textContent = "🔊";

        }

    }
);


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "00:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsPart =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secondsPart).padStart(2, "0")
    );

}


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener(
    "keydown",
    (event) => {

        // Space = Play/Pause
        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT"
        ) {

            event.preventDefault();

            if (audioPlayer.paused) {

                playSong();

            } else {

                pauseSong();

            }

        }

        // Right arrow = Next
        if (event.key === "ArrowRight") {

            nextBtn.click();

        }

        // Left arrow = Previous
        if (event.key === "ArrowLeft") {

            previousBtn.click();

        }

    }
);


// ==========================================
// START PLAYER
// ==========================================

createPlaylist();

loadSong(0);