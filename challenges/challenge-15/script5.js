const currentTags = ["React", "JavaScript", "CSS"];
const newTags = ["Node.js", "Vite", "Testing"];

function prepareTags(currentTags, newTags, removeIndex) {
    const combinedArray = currentTags.concat(newTags);

    console.log(combinedArray);

    // const filteredArray = combinedArray.filter(
    //     (item) => item !== combinedArray[removeIndex],
    // );

    const filteredArray = combinedArray.filter(
        (_, index) => index !== removeIndex,
    );

    const preview = filteredArray.slice(0, 3);

    const label = filteredArray.join(" | ");

    return {
        tags: filteredArray,
        preview,
        label,
    };
}

console.log(prepareTags(currentTags, newTags, 2));
