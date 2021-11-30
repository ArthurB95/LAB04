const logger = require("../utils/logger");
const uuid = require("../utils/uuid");

const Storage = require('../storage');
const storage = new Storage().getInstance();

class ProfessorController {
    async consultarSaldo(connection) {
        const professorRepository = connection.getRepository('Professor');
        const usuario = storage.getUser();

        const professor = await professorRepository.findOne({
            where: {
                id_usuario: usuario.id
            }
        });

        return professor.saldo;
    }

    async transferirSaldo(connection, alunoUsername, valor, mensagem) {
        const usuarioRepository = connection.getRepository('Usuario');
        const professorRepository = connection.getRepository('Professor');
        const alunoRepository = connection.getRepository('Aluno');
        const transacaoRepository = connection.getRepository('Transacao');

        const usuario = storage.getUser();

        const professor = await professorRepository.findOne({
            where: {
                id_usuario: usuario.id
            }
        });

        const userAluno = await usuarioRepository.findOne({
            where: { username: alunoUsername }
        });
        if (!userAluno) throw new Error("O aluno não existe");

        const aluno = await alunoRepository.findOne({
            where: {
                id_usuario: userAluno.id
            }
        });
        if (!aluno) throw new Error("O usuário informado não é um aluno");

        if (valor <= 0) throw new Error("O valor deve ser maior que zero");
        if (professor.saldo < valor) throw new Error("Saldo insuficiente");

        professor.saldo -= valor;
        aluno.saldo += valor;

        await professorRepository.update(professor.id, professor);
        await alunoRepository.update(aluno.id, aluno);

        await transacaoRepository.insert({
            id: uuid(),
            id_professor: professor.id,
            id_aluno: aluno.id,
            valor: valor,
            mensagem: mensagem
        });
    }

    async listarTransacoes(connection) {
        const transacaoRepository = connection.getRepository('Transacao');
        const professor = storage.getProfessor();

        const transacoes = await transacaoRepository.find({
            where: {
                id_professor: professor.id
            }
        });

        return transacoes;
    }
}

module.exports = new ProfessorController();
