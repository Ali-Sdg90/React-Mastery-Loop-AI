const playlist = ["Radiohead", "Coldplay", "Muse", "Keane", "Oasis"];

const newSongs = ["Arctic Monkeys", "The Strokes"];

function managePlaylist(playlist, newSongs, removeIndex) {
    if (!playlist && !newSongs && !removeIndex) {
        return null;
    }

    const combinedArray = playlist.concat(newSongs);
    const songs = [...combinedArray];

    const removed = combinedArray.splice(removeIndex, 1).toString();

    const preview = combinedArray.slice(
        combinedArray.length - 3,
        combinedArray.length,
    );

    const label = combinedArray.join(" → ");

    const reversed = combinedArray.reverse();

    return {
        songs,
        removed,
        preview,
        label,
        reversed,
    };
}

console.log(managePlaylist(playlist, newSongs, 2));
