// ===== SONGS DATA =====
// ===== SONGS DATA =====
// ===== SONGS DATA =====
const songs = [
    {
        title: "Midnight Lofi",
        artist: "Lofi Dreams",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300"
    },
    {
        title: "Rainy Café",
        artist: "Chill Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        img: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=300"
    },
    {
        title: "Tokyo Nights",
        artist: "LoFi City",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300"
    },
    {
        title: "Sunset Vibes",
        artist: "Chill Hop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300"
    },
    {
        title: "Coffee Morning",
        artist: "Morning Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300"
    },
    {
        title: "Dreamy Waves",
        artist: "Ocean Lofi",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=300"
    },
    {
        title: "Neon Lights",
        artist: "City Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        img: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=300"
    },
    {
        title: "Forest Rain",
        artist: "Nature Lofi",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=300"
    },
    {
        title: "Stargazing",
        artist: "Night Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300"
    },
    {
        title: "Lazy Sunday",
        artist: "Weekend Vibes",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300"
    },
    {
        title: "Purple Haze",
        artist: "Dream State",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        img: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=300"
    },
    {
        title: "Winter Chill",
        artist: "Snow Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        img: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=300"
    },
    {
        title: "Summer Breeze",
        artist: "Warm Lofi",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300"
    },
    {
        title: "Deep Focus",
        artist: "Study Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300"
    },
    {
        title: "Night Drive",
        artist: "Midnight Lofi",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300"
    }
];

// ===== STATE =====
let currentIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// ===== ELEMENTS =====
const audio = document.getElementById('audio');
const albumImg = document.getElementById('albumImg');
const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressFill = document.getElementById('progressFill');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const favoriteBtn = document.getElementById('favoriteBtn');
const visualizer = document.getElementById('visualizer');
const themeToggle = document.getElementById('themeToggle');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hide');
        loadSong(currentIndex);
        renderPlaylist();
        renderFavorites();
        renderRecent();
        // Open playlist by default
        togglePlaylist();
    }, 2500);
});

// ===== LOAD SONG =====
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumImg.src = song.img;
    audio.src = song.src;

    // Volume from localStorage
    const savedVolume = localStorage.getItem('volume') || 70;
    volumeSlider.value = savedVolume;
    audio.volume = savedVolume / 100;

    // Update favorite button
    updateFavoriteBtn();

    // Update active playlist item
    updateActivePlaylistItem();

    // Update recently played
    addToRecent(index);
}

// ===== PLAY/PAUSE =====
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    audio.play();
    isPlaying = true;
    playIcon.className = 'fas fa-pause';
    albumArt.classList.add('rotating');
    visualizer.classList.add('playing');
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playIcon.className = 'fas fa-play';
    albumArt.classList.remove('rotating');
    visualizer.classList.remove('playing');
}

// ===== NEXT/PREV =====
function nextSong() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex);
    if (isPlaying) playSong();
    renderPlaylist();
}

function prevSong() {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    if (isPlaying) playSong();
    renderPlaylist();
}

// ===== AUTO NEXT =====
audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

// ===== PROGRESS =====
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audio.currentTime = percent * audio.duration;
});

// ===== VOLUME =====
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    localStorage.setItem('volume', volumeSlider.value);
});

// ===== SHUFFLE =====
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
    showToast(isShuffle ? '🔀 Shuffle On' : '🔀 Shuffle Off');
});

// ===== REPEAT =====
repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    showToast(isRepeat ? '🔁 Repeat On' : '🔁 Repeat Off');
});

// ===== FAVORITE =====
favoriteBtn.addEventListener('click', () => {
    const song = songs[currentIndex];
    const idx = favorites.findIndex(f => f.title === song.title);
    if (idx === -1) {
        favorites.push(song);
        showToast('❤️ Added to Favorites');
    } else {
        favorites.splice(idx, 1);
        showToast('💔 Removed from Favorites');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteBtn();
    renderFavorites();
});

function updateFavoriteBtn() {
    const song = songs[currentIndex];
    const isFav = favorites.some(f => f.title === song.title);
    favoriteBtn.classList.toggle('active', isFav);
    favoriteBtn.innerHTML = isFav
        ? '<i class="fas fa-heart"></i>'
        : '<i class="far fa-heart"></i>';
}

// ===== RECENTLY PLAYED =====
function addToRecent(index) {
    const song = songs[index];
    const exists = recentlyPlayed.findIndex(r => r.title === song.title);
    if (exists !== -1) recentlyPlayed.splice(exists, 1);
    recentlyPlayed.unshift(song);
    if (recentlyPlayed.length > 5) recentlyPlayed.pop();
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    renderRecent();
}

// ===== RENDER PLAYLIST =====
function renderPlaylist() {
    const playlist = document.getElementById('playlist');
    playlist.innerHTML = '';
    songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentIndex ? 'active' : ''}`;
        item.innerHTML = `
            <div class="playlist-thumb">
                <img src="${song.img}" alt="${song.title}">
            </div>
            <div class="playlist-info">
                <div class="playlist-title">${song.title}</div>
                <div class="playlist-artist">${song.artist}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            currentIndex = index;
            loadSong(currentIndex);
            playSong();
            renderPlaylist();
        });
        playlist.appendChild(item);
    });
}

// ===== RENDER FAVORITES =====
function renderFavorites() {
    const list = document.getElementById('favoritesList');
    if (favorites.length === 0) {
        list.innerHTML = '<p class="empty-msg">No favorite songs yet</p>';
        return;
    }
    list.innerHTML = '';
    favorites.forEach(song => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            <div class="playlist-thumb">
                <img src="${song.img}" alt="${song.title}">
            </div>
            <div class="playlist-info">
                <div class="playlist-title">${song.title}</div>
                <div class="playlist-artist">${song.artist}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            currentIndex = songs.findIndex(s => s.title === song.title);
            loadSong(currentIndex);
            playSong();
            renderPlaylist();
        });
        list.appendChild(item);
    });
}

// ===== RENDER RECENT =====
function renderRecent() {
    const list = document.getElementById('recentList');
    if (recentlyPlayed.length === 0) {
        list.innerHTML = '<p class="empty-msg">No recently played songs</p>';
        return;
    }
    list.innerHTML = '';
    recentlyPlayed.forEach(song => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            <div class="playlist-thumb">
                <img src="${song.img}" alt="${song.title}">
            </div>
            <div class="playlist-info">
                <div class="playlist-title">${song.title}</div>
                <div class="playlist-artist">${song.artist}</div>
            </div>
        `;
        item.addEventListener('click', () => {
            currentIndex = songs.findIndex(s => s.title === song.title);
            loadSong(currentIndex);
            playSong();
            renderPlaylist();
        });
        list.appendChild(item);
    });
}

// ===== UPDATE ACTIVE ITEM =====
function updateActivePlaylistItem() {
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
}

// ===== TOGGLE PANELS =====
function togglePlaylist() {
    togglePanel('playlistBody', 'playlistArrow');
}

function toggleRecent() {
    togglePanel('recentBody', 'recentArrow');
}

function toggleFavorites() {
    togglePanel('favoritesBody', 'favoritesArrow');
}

function togglePanel(bodyId, arrowId) {
    const body = document.getElementById(bodyId);
    const arrow = document.getElementById(arrowId);
    const header = arrow.closest('.panel-header');
    body.classList.toggle('open');
    header.classList.toggle('open');
}

// ===== THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    showToast(isDark ? '☀️ Light Mode' : '🌙 Dark Mode');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark'
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';

// ===== TOAST =====
let toastTimeout;
function showToast(message) {
    clearTimeout(toastTimeout);
    toastMsg.textContent = message;
    toast.classList.add('show');
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ===== FORMAT TIME =====
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowRight':
            nextSong();
            break;
        case 'ArrowLeft':
            prevSong();
            break;
        case 'ArrowUp':
            e.preventDefault();
            volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 5);
            audio.volume = volumeSlider.value / 100;
            localStorage.setItem('volume', volumeSlider.value);
            showToast(`🔊 Volume: ${volumeSlider.value}%`);
            break;
        case 'ArrowDown':
            e.preventDefault();
            volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 5);
            audio.volume = volumeSlider.value / 100;
            localStorage.setItem('volume', volumeSlider.value);
            showToast(`🔉 Volume: ${volumeSlider.value}%`);
            break;
    }
});

// ===== EVENT LISTENERS =====
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);