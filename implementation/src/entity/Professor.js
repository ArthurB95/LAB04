import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Professor",
    tableName: "professor",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
    }
});
