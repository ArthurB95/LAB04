const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Professor",
    tableName: "professor",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        nome: {
            type: "varchar",
        },
        cpf: {
            type: "varchar",
        },
        departamento: {
            type: "varchar",
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
    //     usuario: {
    //         name: "id_usuario",
    //         type: 'many-to-one',
    //         target: 'professor',
    //         joinColumn: true,
    //     },
    // },
};
