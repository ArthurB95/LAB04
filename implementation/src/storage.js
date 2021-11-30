class LocalStorage {

    constructor() {
        this.user = null;
        this.aluno = null;
        this.professor = null;
    }

    setUser(user) {
        this.user = user;
    }

    setAluno(aluno) {
        this.aluno = aluno;
    }

    setProfessor(professor) {
        this.professor = professor;
    }

    getUser() {
        return this.user;
    }

    getAluno() {
        return this.aluno;
    }

    getProfessor() {
        return this.professor;
    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new LocalStorage();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

module.exports = Singleton;
