const logger = require("../utils/logger");
const uuid = require("../utils/uuid");

const Storage = require('../storage');
const storage = new Storage().getInstance();

class VantagemController {
    async cadastrar(connection, empresa, vantagem) {
        const vantagemRepository = connection.getRepository('Vantagem');

        if (vantagem.valor <= 0) {
            throw new Error('Valor da vantagem deve ser maior que zero.');
        }

        const newVantagem = await vantagemRepository.save({
            id: uuid(),
            id_empresa: empresa.id,
            ...vantagem,
        });

        logger.success(`Vantagem "${newVantagem.titulo}" (${newVantagem.id}) criada com sucesso!`);

        return newVantagem;
    }

    async listarVantagens(connection) {
        const vantagemRepository = connection.getRepository('Vantagem');

        const vantagens = await vantagemRepository.find({
            order: {
                titulo: "ASC",
            },
        });

        return vantagens;
    }
};

module.exports = new VantagemController();
