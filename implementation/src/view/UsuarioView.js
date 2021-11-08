const selectOption = require("../utils/selectOption");

const options = [
    {
        title: "<- Voltar",
        entrypoint: () => { },
    },
    {
        title: "Fazer Login",
        entrypoint: null,
    },
];

class UsuarioView {
    async selectOption() {
        const selectedOption = await selectOption(options);
        await selectedOption.entrypoint();
    }
};

module.exports = new UsuarioView();
