class nodeClass{
    constructor(){
        this.nome ='daniel'
        this.idade ='20'
        this.teste()
    }

    teste(){
        console.log(this.nome)
        console.log(this.idade)
    }
}

module.exports = nodeClass