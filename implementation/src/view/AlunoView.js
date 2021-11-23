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
        title: "Selecionar Vantagem",
        entrypoint: null,
    },
    {
        title: "Consultar Saldo",
        entrypoint: null,
    },
    {
        title: "Consultar Extrato de Transações",
        entrypoint: null,
    },
    {
        title: "Listar Resgates do Aluno",
        entrypoint: null,
    },
];

class AlunoView {
    async selectOption(connection) {
        const selectedOption = await selectOption(options);
        if (selectedOption.entrypoint) await selectedOption.entrypoint(connection);
    }
};

module.exports = new AlunoView();
