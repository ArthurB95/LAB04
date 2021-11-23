const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Transacao",
    tableName: "transacao",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        mensagem: {
            type: "varchar",
        },
        valor: {
            type: "float",
        },
        id_professor: {
            type: "uuid",
        },
        id_aluno: {
            type: "uuid",
        },
    }
};
