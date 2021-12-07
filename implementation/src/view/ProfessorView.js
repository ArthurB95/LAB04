const professorController = require('../controller/ProfessorController');

const selectOption = require("../utils/selectOption");

const input = require("../utils/input");
const output = require("../utils/output");
const logger = require("../utils/logger");

const options = [
    {
        title: "<- Voltar",
        addSpacing: true,
        entrypoint: () => { },
    },
    {
        title: "Enviar Pontos para Aluno",
        addSpacing: true,
        entrypoint: async (connection) => new ProfessorView().transferirSaldo(connection),
    },
    {
        title: "Consultar Saldo",
        entrypoint: async (connection) => new ProfessorView().consultarSaldo(connection),
    },
    {
        title: "Consultar Extrato de Transações",
        entrypoint: async (connection) => new ProfessorView().listarTransacoes(connection),
    },
];

class ProfessorView {
    async selectOption(connection) {
        const selectedOption = await selectOption(options);
        if (selectedOption.entrypoint) await selectedOption.entrypoint(connection);
    }

    async consultarSaldo(connection) {
        const saldo = await professorController.consultarSaldo(connection);
        output.line(`Saldo: ${saldo}`);
    }

    async transferirSaldo(connection) {
        const inputAluno = await input.getString("User do aluno");
        const inputValor = await input.getNumber("Valor");
        const inputMensagem = await input.getString("Mensagem");

        try {
            await professorController.transferirSaldo(connection, inputAluno, inputValor, inputMensagem);
            logger.success("Saldo transferido com sucesso!");
        } catch (error) {
            logger.error(error.message);
        }
    }

    async listarTransacoes(connection) {
        const transacoes = await professorController.listarTransacoes(connection);

        transacoes.forEach(transacao => {
            output.line(`${transacao.valor} pontos - ` +
                `${transacao.mensagem ? transacao.mensagem : "Sem mensagem"}
                (${transacao.id})
            `);
        });
    }
};

module.exports = new ProfessorView();
