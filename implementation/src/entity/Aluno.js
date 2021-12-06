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
        saldo: {
            type: "float",
            default: 0
        },
        id_usuario: {
            type: "uuid",
        },
    },
    // relations: {
    //     resgate: {
    //         type: 'one-to-many',
    //         target: 'resgate',
    //         inverseSide: 'aluno',
    //         columnName: 'id_aluno',
    //     },
    // },
};
