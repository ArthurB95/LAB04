import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Vantagem",
    tableName: "vantagem",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
    }
});
