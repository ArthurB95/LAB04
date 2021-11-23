const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Empresa",
    tableName: "empresa",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        id_usuario: {
            type: "uuid",
        },
        nome: {
            type: "varchar",
        },
    }
};
