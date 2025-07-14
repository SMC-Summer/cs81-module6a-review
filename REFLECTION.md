# Reflection

### What was the hardest part to understand?

The most abstract concept in this code is JavaScript's prototypal inheritance, specifically the line `Playlist.prototype.addSong`. It's not immediately obvious why the methods are attached to this `prototype` property instead of being defined directly within the `Playlist` function.

The key insight is that the `prototype` acts like a shared blueprint for all objects created by the `Playlist` constructor. Every new playlist (like `myMix`) gets its own `name`, `songs` array, and `currentSong`, but they all *share* a single copy of the methods (`addSong`, `playFirst`, etc.) from the blueprint. This is highly efficient. If we defined the methods inside the constructor with `this.addSong = function() {...}`, every single playlist object would have its own separate copy of every method, consuming unnecessary memory.

### How does this code use `this` to tie data and behavior together?

The `this` keyword is a dynamic pointer that refers to the object on which a method was called. It's the essential link that allows a generic, shared method (like `skipSong` on the prototype) to operate on the unique data of a specific object instance (like `myMix`).

Let's trace the call `myMix.skipSong()`:
1.  JavaScript looks for `skipSong` on the `myMix` object itself. It doesn't find it.
2.  It then looks up the prototype chain and finds `skipSong` on `Playlist.prototype`.
3.  When the `skipSong` function is executed, JavaScript sets the value of `this` *for that specific call* to be the object the method was called on—which is `myMix`.
4.  Therefore, inside the method, `this.songs.shift()` correctly modifies the `songs` array belonging to `myMix`, not some other playlist.

In short, `this` provides the context, ensuring that the behavior (the method's logic) correctly manipulates the data (the instance's properties).

### What would you do differently if you wrote this object from scratch?

While the provided code is functional, if I were building it from scratch with modern practices in mind, I would make several changes for clarity, robustness, and scalability.

1.  **Use ES6 `class` Syntax:** The first and most obvious change would be to use the `class` keyword. It's a cleaner, more modern syntax that accomplishes the same prototypal inheritance but is far more readable and less prone to errors.

2.  **Create a `Song` Class:** Instead of the playlist holding an array of simple strings, I would create a `Song` class. A `Song` object could hold more structured data, like `title`, `artist`, and `duration`. The `Playlist` would then manage an array of these `Song` objects, making the whole system more powerful.

    ```javascript
    class Song {
        constructor(title, artist, duration) {
            this.title = title;
            this.artist = artist;
            this.duration = duration;
        }
    }
    ```

3.  **Improve State Management:** I would add more explicit state properties. For example, a `status` property that could be 'playing', 'paused', or 'stopped', and a `currentIndex` property to track the position in the playlist instead of relying on `shift()` which destructively modifies the array. This makes the object's state easier to read and manage.

4.  **Add Error Handling:** The current methods fail silently. For instance, calling `playFirst()` on an empty playlist does nothing. I would add explicit error handling, perhaps throwing custom errors like `throw new Error("Playlist is empty.")`, to make the object's behavior more predictable and easier to debug.

