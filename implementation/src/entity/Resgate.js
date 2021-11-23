const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Resgate",
    tableName: "resgate",
    columns: {
        codigo: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        id_aluno: {
            type: "uuid",
        },
        id_vantagem: {
            type: "uuid",
        },
    }
};
