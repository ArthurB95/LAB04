const typeorm = require("typeorm");
const EntitySchema = require("typeorm").EntitySchema;

const dotenv = require("dotenv");
const logger = require("./utils/logger");

const cli = require("./view/cli");

let connection;

async function init() {
    await setup();
    await run();
}

async function setup() {
    dotenv.config(".env");
    connection = await typeorm.createConnection({
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        ssl: {
            rejectUnauthorized: false,
        },
        entities: [
            new EntitySchema(require("./entity/Aluno")),
            new EntitySchema(require("./entity/Carteira")),
            new EntitySchema(require("./entity/Empresa")),
            new EntitySchema(require("./entity/Professor")),
            new EntitySchema(require("./entity/Resgate")),
            new EntitySchema(require("./entity/Transacao")),
            new EntitySchema(require("./entity/Usuario")),
            new EntitySchema(require("./entity/Vantagem")),
        ]
    });

    logger.log("Connected to database");
}

async function run() {
    await cli(connection);
    process.exit(0);
}

init();
