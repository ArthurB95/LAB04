const usuarioController = require('../controller/UsuarioController');

const selectOption = require("../utils/selectOption");

const input = require("../utils/input");
const output = require("../utils/output");
const logger = require("../utils/logger");

const options = [
    {
        title: "<- Voltar",
        entrypoint: () => { },
    },
    {
        title: "Fazer Login",
        entrypoint: async (connection) => new UsuarioView().login(connection),
    },
    {
        title: "Cadastrar",
        entrypoint: async (connection) => new UsuarioView().cadastrar(connection),
    },
];

class UsuarioView {
    async selectOption(connection) {
        const selectedOption = await selectOption(options);
        if (selectedOption.entrypoint) await selectedOption.entrypoint(connection);
    }

    async login(connection) {
        const username = await input.getString("Username");
        const senha = await input.getPassword("Senha");

        logger.info("Fazendo login...");

        try {
            const usuario = await usuarioController.entrar(connection, username, senha);
            logger.success("Login realizado com sucesso!");
            logger.success(`Usuário: ${usuario.username} (${usuario.id})`);
        } catch (error) {
            logger.error(error.message);
        }
    }

    async cadastrar(connection) {
        const tipo = await input.getNumber("Tipo de Usuário: (1) Aluno, (2) Empresa");
        const username = await input.getString("Username");
        const senha = await input.getPassword("Senha");

        try {
            let usuario;
            if (tipo === 1) {
                logger.info("Cadastrando Aluno...");
                const dados = {
                    nome: await input.getString("nome"),
                    email: await input.getString("email"),
                    rg: await input.getString("rg"),
                    cpf: await input.getString("cpf"),
                    endereco: await input.getString("endereco"),
                    curso: await input.getString("curso"),
                };

                usuario = await usuarioController.cadastrarAluno(connection, username, senha, dados);
            }

            if (tipo === 2) {
                logger.info("Cadastrando Empresa...");
                const dados = {
                    nome: await input.getString("nome"),
                };

                usuario = await usuarioController.cadastrarEmpresa(connection, username, senha, dados);
            }

            logger.success("Usuário cadastrado com sucesso!");
        } catch (error) {
            logger.error(error.message);
        }
    }
};

module.exports = new UsuarioView();
