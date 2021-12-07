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
        addSpacing: true,
        entrypoint: () => { },
    },
    {
        title: "Selecionar Vantagem",
        addSpacing: true,
        entrypoint: async (connection) => new AlunoView().selecionarVantagem(connection),
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
        title: "Listar Resgates",
        entrypoint: async (connection) => new AlunoView().listarResgates(connection),
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

    async selecionarVantagem(connection) {
        const aluno = storage.getAluno();
        if (!aluno) {
            logger.error("O usuário atual não é um aluno!");
            return;
        }

        const vantagem = await input.getString("ID da Vantagem");

        try {
            await alunoController.selecionarVantagem(connection, aluno, vantagem);
            logger.success("Vantagem selecionada com sucesso!");
        } catch (error) {
            logger.error(error);
        }
    }

    async listarResgates(connection) {
        const aluno = storage.getAluno();
        if (!aluno) {
            logger.error("O usuário atual não é um aluno!");
            return;
        }

        const resgates = await alunoController.listarResgates(connection, aluno);

        resgates.forEach(resgate => {
            output.line(
                `\n===` +
                `\nCodigo (${resgate.codigo})` +
                `\nVantagem (${resgate.id_vantagem})` +
                `\nAluno (${resgate.id_aluno})` +
                `\n===`
            );
        });
    }
};

module.exports = new AlunoView();
