const alunoController = require('../controller/AlunoController');

const selectOption = require("../utils/selectOption");

const input = require("../utils/input");
const output = require("../utils/output");
const logger = require("../utils/logger");

const Storage = require('../storage');
const storage = new Storage().getInstance();

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
        entrypoint: async (connection) => new AlunoView().consultarSaldo(connection),
    },
    {
        title: "Consultar Extrato de Transações",
        entrypoint: async (connection) => new AlunoView().listarTransacoes(connection),
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

    async consultarSaldo(connection) {
        const saldo = await alunoController.consultarSaldo(connection);
        output.line(`Saldo: ${saldo}`);
    }

    async listarTransacoes(connection) {
        const transacoes = await alunoController.listarTransacoes(connection);

        transacoes.forEach(transacao => {
            output.line(`${transacao.valor} pontos - ` +
                `${transacao.mensagem ? transacao.mensagem : "Sem mensagem"}
                (${transacao.id})
            `);
        });
    }
};

module.exports = new AlunoView();
