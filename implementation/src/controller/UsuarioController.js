const logger = require("../utils/logger");
const uuid = require("../utils/uuid");

const Storage = require('../storage');
const storage = new Storage().getInstance();

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

        storage.setUser(usuarioRecord);
        await this.recuperarAluno(connection, usuarioRecord);
        await this.recuperarProfessor(connection, usuarioRecord);
        await this.recuperarEmpresa(connection, usuarioRecord);

        return usuarioRecord;
    }

    async recuperarAluno(connection, usuario) {
        const alunoRepository = connection.getRepository('Aluno');
        const alunoRecord = await alunoRepository.findOne({
            where: {
                id_usuario: usuario.id,
            },
        });

        if (alunoRecord) storage.setAluno(alunoRecord);
        else storage.setAluno(null);
    }

    async recuperarProfessor(connection, usuario) {
        const professorRepository = connection.getRepository('Professor');
        const professorRecord = await professorRepository.findOne({
            where: {
                id_usuario: usuario.id,
            },
        });

        if (professorRecord) storage.setProfessor(professorRecord);
        else storage.setProfessor(null);
    }

    async recuperarEmpresa(connection, usuario) {
        const empresaRepository = connection.getRepository('Empresa');
        const empresaRecord = await empresaRepository.findOne({
            where: {
                id_usuario: usuario.id,
            },
        });

        if (empresaRecord) storage.setEmpresa(empresaRecord);
        else storage.setEmpresa(null);
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
