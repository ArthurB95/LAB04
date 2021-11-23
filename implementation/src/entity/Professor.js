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
        id_usuario: {
            type: "uuid",
        },
    }
};
