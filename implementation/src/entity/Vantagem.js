const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Vantagem",
    tableName: "vantagem",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        id_empresa: {
            type: "uuid",
        },
        titulo: {
            type: "varchar",
        },
        valor: {
            type: "float",
        },
    },
    // relations: {
    //     resgate: {
    //         type: 'one-to-many',
    //         target: 'resgate',
    //         inverseSide: 'vantagem',
    //         columnName: 'id_vantagem',
    //     },
    // },
};
