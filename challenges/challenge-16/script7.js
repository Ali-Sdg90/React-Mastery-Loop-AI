const app = {
    name: "Fabrexa",
    version: "3.0",
    config: {
        language: "en",
        appearance: {
            theme: "light",
            fontSize: 14,
        },
    },
};

function updateTheme(app, newTheme) {
    return {
        ...app,
        config: {
            ...app.config,
            appearance: {
                ...app.config.appearance,
                theme: newTheme,
            },
        },
    };
}

console.log(updateTheme(app, "PINK"));
