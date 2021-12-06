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
    },
    // relations: {
    //     aluno: {
    //         type: 'many-to-one',
    //         target: 'aluno',
    //         joinColumn: true,
    //     },
    //     vantagem: {
    //         type: 'many-to-one',
    //         target: 'vantagem',
    //         joinColumn: true,
    //     },
    // },
};
