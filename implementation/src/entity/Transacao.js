import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Transacao",
    tableName: "transacao",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
    }
});
