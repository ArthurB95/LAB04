const selectOption = require("../utils/selectOption");

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
    async selectOption() {
        const selectedOption = await selectOption(options);
        await selectedOption.entrypoint();
    }
};

module.exports = new VantagemView();
