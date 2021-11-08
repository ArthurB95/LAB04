import { EntitySchema } from "typeorm";

module.exports = new EntitySchema({
    name: "Aluno",
    tableName: "aluno",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
    }
});
