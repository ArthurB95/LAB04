import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Usuario",
    tableName: "usuario",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
        username: {
            type: "varchar",
            length: "100",
            unique: true,
            nullable: false,
        },
        password: {
            type: "varchar",
            length: "100",
            nullable: false,
        }
    }
});
