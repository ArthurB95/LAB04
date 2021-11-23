const logger = require("../utils/logger");
const uuid = require("../utils/uuid");

class UsuarioController {
    async entrar(connection, username, senha) {
        const usuarioRepository = connection.getRepository('Usuario');
        const usuarioRecord = await usuarioRepository.findOne({
            where: {
                username: username,
            },
            select: ["id", "username", "senha"],
        });

        if (!usuarioRecord) throw new Error("Usuário não encontrado");
        if (usuarioRecord.senha !== senha) throw new Error("Senha inválida");

        usuarioRecord.senha = undefined;
        return usuarioRecord;
    }

    async cadastrarAluno(connection, username, senha, dados) {
        const usuarioRepository = connection.getRepository('Usuario');
        const alunoRepository = connection.getRepository('Aluno');

        const existingUsuarioRecord = await usuarioRepository.findOne({
            where: { username: username },
        });
        if (existingUsuarioRecord) throw new Error("Usuário já existe");

        const newUser = await usuarioRepository.save({
            id: uuid(),
            username,
            senha,
        });
        const newAluno = await alunoRepository.save({
            id: uuid(),
            id_usuario: newUser.id,
            ...dados,
        });

        logger.success(`Usuário: ${newUser.username} (${newUser.id})`);
        logger.success(`Aluno: ${newAluno.nome} (${newAluno.id})`);

        newUser.senha = undefined;
        return newUser;
    }

    async cadastrarEmpresa(connection, username, senha, dados) {
        const usuarioRepository = connection.getRepository('Usuario');
        const empresaRepository = connection.getRepository('Empresa');

        const existingUsuarioRecord = await usuarioRepository.findOne({
            where: { username: username },
        });
        if (existingUsuarioRecord) throw new Error("Usuário já existe");

        const newUser = await usuarioRepository.save({
            id: uuid(),
            username,
            senha,
        });
        const newEmpresa = await empresaRepository.save({
            id: uuid(),
            id_usuario: newUser.id,
            ...dados,
        });

        logger.success(`Usuário: ${newUser.username} (${newUser.id})`);
        logger.success(`Empresa: ${newEmpresa.nome} (${newEmpresa.id})`);

        newUser.senha = undefined;
        return newUser;
    }
};

module.exports = new UsuarioController();
