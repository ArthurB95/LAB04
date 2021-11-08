import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Resgate",
    tableName: "resgate",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
    }
});
