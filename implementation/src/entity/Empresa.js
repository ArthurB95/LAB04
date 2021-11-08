import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Empresa",
    tableName: "empresa",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
    }
});
