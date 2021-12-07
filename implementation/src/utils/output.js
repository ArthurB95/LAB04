class Output {
    line(message) {
        console.log(message);
    }

    breakLine() {
        console.log();
    }

    title(message) {
        console.log("\n\x1b[1m", message, "\x1b[0m");
    }

    clear() {
        console.clear();
    }
};

module.exports = new Output();
