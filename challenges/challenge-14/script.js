function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const logInput = (input) => {
    console.log(input);
};

const search = debounce(logInput, 500);

search("R");
search("Re");
search("Rea");
search("React");
