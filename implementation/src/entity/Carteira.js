const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Carteira",
    tableName: "carteira",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        saldo: {
            type: "float",
            default: 0
        },
        id_aluno: {
            type: "uuid",
        },
        id_professor: {
            type: "uuid",
        },
    }
};
