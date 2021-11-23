const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Aluno",
    tableName: "aluno",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        nome: {
            type: "varchar"
        },
        email: {
            type: "varchar"
        },
        cpf: {
            type: "varchar"
        },
        rg: {
            type: "varchar"
        },
        endereco: {
            type: "varchar"
        },
        curso: {
            type: "varchar"
        },
        id_usuario: {
            type: "uuid",
        },
    }
};
