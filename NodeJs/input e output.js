const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Qual seu nome?', (name)=>{
    console.log('O nome do usuario é: '+name)
    rl.question('Qual sua idade?', (idade)=>{
        console.log('a idade do '+name+ ' é: '+idade)
    })
})
rl.on('close',()=>{
    console.log('adeus!')
    process.exit(0);
})