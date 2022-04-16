const http= require('http')
const fs = require('fs')
const hostname = "192.168.50.12"
const port = "3000"

// Criando arquivos
// fs.writeFile('testeNode.txt','Teste NodeJs',(err)=>{
//     if(err) throw err;
//     console.log('O arquivo criado com sucesso')
// })

const server = http.createServer((req,res)=>{

    // Criando novo arquivo ou insere depois do que já tem
    if(req.url=='/Nodejs'){
        fs.readFile('index.html', function(err,data){
            fs.appendFile('testeNode.txt','\nrequisição na pagina',(err)=>{
                if(err) throw err;
                console.log('O arquivo editado com sucesso')
            })
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data)
            return res.end()
        })
    }else{
        return res.end()
    }
})

server.listen(port,hostname,()=>{
    console.log("Servidor conectado")
})