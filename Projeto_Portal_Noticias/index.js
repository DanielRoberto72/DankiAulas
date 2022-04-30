const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { runInNewContext } = require('vm')

app.engine('html', require('ejs').renderFile)
app.set('view engine','html')
app.use('/public', express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'/pages'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/',(req,res)=>{
    console.log(req.query)

    if(req.query.busca == null){
        res.render('home',{})
    }else{
        res.render('busca',{})
    }
})

app.get('/:slug',(req,res)=>{
    // res.send(req.params.slug)
    res.render('single',{})
})

app.listen(5000,()=>{
    console.log('Servidor rodando com sucesso')
})