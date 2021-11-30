class Output {
    line(message) {
        console.log(message);
    }

    breakLine() {
        console.log();
    }

    title(message) {
        console.log("\n\n\n\x1b[1m", message, "\x1b[0m");
    }
};

module.exports = new Output();
