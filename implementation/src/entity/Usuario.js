const EntitySchema = require("typeorm").EntitySchema;

module.exports = {
    name: "Usuario",
    tableName: "usuario",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            // generated: true
        },
        username: {
            type: "varchar",
            length: "100",
            unique: true,
            nullable: false,
        },
        senha: {
            type: "varchar",
            length: "100",
            nullable: false,
        }
    }
};
