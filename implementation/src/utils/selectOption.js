const input = require("./input");
const output = require("./output");
const logger = require("./logger");

async function selectOption(options, title = "Selecione uma opção:") {
    output.breakLine();
    output.line(title);
    output.breakLine();

    for (let index = 0; index < options.length; index++) {
        const option = options[index];
        output.line(`(${index + 1}) ${option.title}`);
        if (option.addSpacing) output.breakLine();
    }

    output.breakLine();
    const number = await input.getNumber("option");
    const selectedOption = options[number - 1];

    if (selectedOption) {
        output.breakLine();
        return selectedOption;
    } else {
        logger.error("Invalid option");
        return await selectOption(options, title);
    }
};

module.exports = selectOption;
