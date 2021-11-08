const selectOption = require("../utils/selectOption");

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
    async selectOption() {
        const selectedOption = await selectOption(options);
        await selectedOption.entrypoint();
    }
};

module.exports = new ProfessorView();
