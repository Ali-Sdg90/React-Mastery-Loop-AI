const debounce = (fn, delay) => {
    let timer;

    return function (...arg) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...arg);
        }, delay);
    };
};

const search = debounce((text) => {
    console.log("Searching2:", text);
}, 500);

search("R");
search("Re");
search("Rea");
search("React");
