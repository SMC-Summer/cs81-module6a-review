// A constructor function is a special function used to create and initialize an object.
// When called with the 'new' keyword, it creates a new empty object and assigns 'this' to that object.
// This constructor initializes a playlist with a given name, an empty array to hold songs,
// and sets the current song to null, as nothing is playing initially.
function Playlist(name) {
  // 'this' here refers to the new object instance being created.
  this.name = name; // Assigns the provided name to the new object's 'name' property.
  this.songs = []; // Initializes an empty array for the songs.
  this.currentSong = null; // Represents the song that is currently playing.
}

// Methods are added to the constructor's 'prototype' property.
// This is memory efficient because all Playlist objects will share a single instance of this method
// instead of each object having its own copy.
// This method adds a song title (string) to the end of the songs array.
Playlist.prototype.addSong = function(songTitle) {
  // 'this.songs' refers to the 'songs' array of the specific Playlist instance the method is called on.
  this.songs.push(songTitle);
};

// This method plays the first song in the playlist.
Playlist.prototype.playFirst = function() {
  // It checks if there are any songs in the playlist to avoid errors.
  if (this.songs.length > 0) {
    // 'this.currentSong' refers to the 'currentSong' property of the instance.
    // It's updated to the first element in the 'songs' array.
    this.currentSong = this.songs[0];
    // This output confirms to the user which song has started playing.
    console.log("Now playing:", this.currentSong);
  }
};

// This method removes the currently playing song and plays the next one.
Playlist.prototype.skipSong = function() {
  // It checks if there's more than one song, ensuring there's a "next" song to skip to.
  if (this.songs.length > 1) {
    // The shift() method removes the first element from an array and returns it.
    this.songs.shift();
    // 'this.currentSong' is updated to the new first song in the modified array.
    this.currentSong = this.songs[0];
    // This output shows the result of the skip action.
    console.log("Skipped! Now playing:", this.currentSong);
  } else {
    // This output handles the case where there are no more songs to play.
    console.log("No more songs to skip.");
  }
};

// This method displays the playlist's name and all the songs in it.
Playlist.prototype.listSongs = function() {
  // 'this.name' refers to the name of the playlist instance.
  console.log("Playlist:", this.name);
  // The join() method creates and returns a new string by concatenating all of the elements in an array.
  // This output provides a clean, comma-separated list of the songs.
  console.log("Songs:", this.songs.join(", "));
};

// --- NEW METHOD ---
// This new method shuffles the playlist and plays a random song.
Playlist.prototype.shuffleAndPlay = function() {
    if (this.songs.length > 0) {
        // A simple implementation of the Fisher-Yates shuffle algorithm to randomize the array.
        for (let i = this.songs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]]; // Swap elements
        }
        // After shuffling, play the new first song.
        this.playFirst();
        console.log("Playlist has been shuffled.");
    } else {
        console.log("No songs to shuffle.");
    }
}


// --- IMPROVEMENT SUGGESTION ---
// An improvement could be to prevent duplicate songs from being added.
// The addSong method could be modified to check if the song already exists in the 'this.songs' array
// using 'this.songs.includes(songTitle)' before pushing the new song.


// --- USAGE EXAMPLE ---

// A new Playlist object instance is created with the name "My Chill Mix".
let myMix = new Playlist("My Chill Mix");

// The addSong method is called on the 'myMix' instance to add three songs.
myMix.addSong("Lofi Study");
myMix.addSong("Chillhop Beats");
myMix.addSong("Evening Jazz");

// The playFirst method is called. Output: "Now playing: Lofi Study"
myMix.playFirst();

// The skipSong method is called. Output: "Skipped! Now playing: Chillhop Beats"
myMix.skipSong();

// The listSongs method is called.
// Output:
// Playlist: My Chill Mix
// Songs: Chillhop Beats, Evening Jazz
myMix.listSongs();
