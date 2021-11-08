const output = require("../utils/output");
const selectOption = require("../utils/selectOption");

const alunoView = require("./AlunoView");
const professorView = require("./ProfessorView");
const usuarioView = require("./UsuarioView");
const vantagemView = require("./VantagemView");

const views = [
    {
        title: "Sair",
        entrypoint: () => {
            process.exit(0);
        }
    },
    {
        title: "Usuario",
        entrypoint: usuarioView.selectOption,
    },
    {
        title: "Aluno",
        entrypoint: alunoView.selectOption,
    },
    {
        title: "Professor",
        entrypoint: professorView.selectOption,
    },
    {
        title: "Vantagem",
        entrypoint: vantagemView.selectOption,
    },
];

module.exports = async function (connection) {
    while (true) {
        output.title("Sistema de Moeda Estudantil");
        const selectedView = await selectOption(views, "Selecione uma das views disponíveis:");
        await selectedView.entrypoint(connection);
    }
};
