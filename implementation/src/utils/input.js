const prompt = require("prompt-async");

class Input {
    Input() {
        prompt.start();
    }

    async getString(question = "input") {
        const result = await prompt.get([question]);
        const input = result[question];
        return input;
    }

    async getNumber(question = "input") {
        const input = await this.getString(question);
        const number = parseInt(input);
        return number;
    }
};

module.exports = new Input();
