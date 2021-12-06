const logger = require("../utils/logger");
const uuid = require("../utils/uuid");

const Storage = require('../storage');
const storage = new Storage().getInstance();

class AlunoController {
    async consultarSaldo(connection) {
        const alunoRepository = connection.getRepository('Aluno');
        const usuario = storage.getUser();

        const aluno = await alunoRepository.findOne({
            where: {
                id_usuario: usuario.id
            }
        });

        return aluno.saldo;
    }

    async listarTransacoes(connection) {
        const transacaoRepository = connection.getRepository('Transacao');
        const aluno = storage.getAluno();

        const transacoes = await transacaoRepository.find({
            where: {
                id_aluno: aluno.id
            }
        });

        return transacoes;
    }

    async selecionarVantagem(connection, aluno, vantagemId) {
        const alunoRepository = connection.getRepository('Aluno');
        const vantagemRepository = connection.getRepository('Vantagem');
        const resgateRepository = connection.getRepository('Resgate');

        const alunoRecord = await alunoRepository.findOne({
            where: {
                id: aluno.id,
            }
        });

        const vantagemRecord = await vantagemRepository.findOne({
            where: {
                id: vantagemId,
            }
        });

        if (!vantagemRecord)
            throw new Error('A vantagem selecionada não existe');

        if (vantagemRecord.saldo > alunoRecord.saldo)
            throw new Error('Saldo insuficiente');

        const newResgate = await resgateRepository.insert({
            codigo: uuid(),
            id_aluno: aluno.id,
            id_vantagem: vantagemId,
        });

        alunoRecord.saldo -= vantagemRecord.saldo;
        await alunoRepository.update(aluno.id, alunoRecord);

        return newResgate;
    }

    async listarResgates(connection, aluno) {
        const resgateRepository = connection.getRepository('Resgate');

        const resgates = await resgateRepository.find({
            where: {
                id_aluno: aluno.id
            },
        });

        return resgates;
    }
}

module.exports = new AlunoController();
