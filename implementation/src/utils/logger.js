class Logger {
    info(input, ...inputs) {
        return this.log(input, ...inputs);
    }

    log(input, ...inputs) {
        const dateAsString = new Date().toISOString().substring(0, 19).replace('T', ' ');
        console.log(`\x1b[2m${dateAsString}:`, input, ...inputs, "\x1b[0m");
    }

    error(input, ...inputs) {
        const dateAsString = new Date().toISOString().substring(0, 19).replace('T', ' ');
        console.error(`\x1b[31m${dateAsString}:`, input, ...inputs, "\x1b[0m");
    }

    success(input, ...inputs) {
        const dateAsString = new Date().toISOString().substring(0, 19).replace('T', ' ');
        console.error(`\x1b[32m${dateAsString}:`, input, ...inputs, "\x1b[0m");
    }
};

module.exports = new Logger();
