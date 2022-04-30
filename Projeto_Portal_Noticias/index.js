const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const moongose = require('mongoose')

moongose.connect('mongodb+srv://danielRobertoDB:<password>@cluster0.rry3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true}).then(function() {
    console.log('conectado com sucesso');
}).catch(function(err) {
    console.log(err.message);
})

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