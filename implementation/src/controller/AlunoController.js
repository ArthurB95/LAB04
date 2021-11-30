const logger = require("../utils/logger");

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
}

module.exports = new AlunoController();
