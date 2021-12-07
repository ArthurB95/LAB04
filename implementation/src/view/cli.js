const output = require("../utils/output");
const askQuestion = require("../utils/askQuestion");
const selectOption = require("../utils/selectOption");

const alunoView = require("./AlunoView");
const professorView = require("./ProfessorView");
const usuarioView = require("./UsuarioView");
const vantagemView = require("./VantagemView");

const views = [
    {
        title: "Sair",
        addSpacing: true,
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
        output.clear();

        output.title("Sistema de Moeda Estudantil");
        const selectedView = await selectOption(views, "Selecione uma das views disponíveis:");

        output.clear();
        output.title("Sistema de Moeda Estudantil");
        output.title(`View: "${selectedView.title}"`);
        await selectedView.entrypoint(connection);

        await askQuestion("\nPressione enter para continuar...");
    }
};
