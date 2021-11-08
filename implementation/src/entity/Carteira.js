import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Carteira",
    tableName: "carteira",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
    }
});
