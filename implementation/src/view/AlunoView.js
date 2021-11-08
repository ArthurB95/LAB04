const selectOption = require("../utils/selectOption");

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
    async selectOption() {
        const selectedOption = await selectOption(options);
        await selectedOption.entrypoint();
    }
};

module.exports = new AlunoView();
