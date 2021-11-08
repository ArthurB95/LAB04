const typeorm = require("typeorm");
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
    });

    logger.log("Connected to database");
}

async function run() {
    await cli(connection);
    process.exit(0);
}

init();
