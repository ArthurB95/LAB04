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
        title: "Enviar Pontos para Aluno",
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
];

class ProfessorView {
    async selectOption(connection) {
        const selectedOption = await selectOption(options);
        if (selectedOption.entrypoint) await selectedOption.entrypoint(connection);
    }
};

module.exports = new ProfessorView();
