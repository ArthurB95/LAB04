const prompt = require("prompt");

class Input {
    Input() {
        prompt.start();
    }

    async getString(question = "input") {
        const result = await prompt.get([question]);
        const input = result[question];
        return input;
    }

    async getPassword(question = "input") {
        const result = await prompt.get([{
            name: question,
            hidden: true,
        },]);
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
