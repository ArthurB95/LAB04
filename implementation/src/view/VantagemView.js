const vantagemController = require('../controller/VantagemController');

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
        title: "Listar Vantagens",
        entrypoint: async (connection) => new VantagemView().listarTransacoes(connection),
    },
    {
        title: "Cadastrar Vantagem",
        entrypoint: async (connection) => new VantagemView().cadastrar(connection),
    },
];

class VantagemView {
    async selectOption(connection) {
        const selectedOption = await selectOption(options);
        if (selectedOption.entrypoint) await selectedOption.entrypoint(connection);
    }

    async cadastrar(connection) {
        const empresa = storage.getEmpresa();
        if (!empresa) {
            logger.error("O usuário atual não é uma empresa!");
            return;
        }

        const vantagem = {
            titulo: await input.getString("Título"),
            valor: await input.getNumber("Valor"),
        };

        try {
            await vantagemController.cadastrar(connection, empresa, vantagem);
        } catch (error) {
            logger.error(error);
        }

    }

    async listarTransacoes(connection) {
        const vantagens = await vantagemController.listarVantagens(connection);

        vantagens.forEach(vantagem => {
            output.line(`${vantagem.titulo} | ${vantagem.valor} pontos` +
                `\n\x1b[2m(${vantagem.id})\x1b[0m \n`
            );
        });
    }
};

module.exports = new VantagemView();
