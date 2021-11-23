const selectOption = require("../utils/selectOption");

const input = require("../utils/input");
const output = require("../utils/output");
const logger = require("../utils/logger");

const options = [
    {
        title: "<- Voltar",
        entrypoint: () => { },
    },
    {
        title: "Listar Vantagens",
        entrypoint: null,
    },
];

class VantagemView {
    async selectOption(connection) {
        const selectedOption = await selectOption(options);
        if (selectedOption.entrypoint) await selectedOption.entrypoint(connection);
    }
};

module.exports = new VantagemView();
