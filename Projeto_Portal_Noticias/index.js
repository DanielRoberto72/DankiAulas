const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const moongose = require('mongoose')
const Posts = require('./Posts.js')
moongose.connect('mongodb+srv://danielRobertoDB:JVFHQss9BN3Sr8r5@cluster0.rry3x.mongodb.net/nodeJs?retryWrites=true&w=majority',{useNewUrlParser: true}).then(function() {
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
        Posts.find({}).sort({'_id': -1}).exec(function(err,posts){
            posts - posts.map(function(val){
                return{
                    titulo: val.titulo,
                    imagem: val.imagem,
                    categoria: val.categoria,
                    conteudo: val.conteudo,
                    slug: val.slug
                    
                }
            })
            res.render('home',{posts:posts})
        })
    }else{
        res.render('busca',{})
    }
})

app.get('/:slug',(req,res)=>{
    // res.send(req.params.slug)
    Posts.findOneAndUpdate({slug: req.params.slug},{$inc : {views: 1}}, {new: true}, function(err,resposta){
        //console.log(resposta)
        res.render('single',{noticia:resposta})
    }) 
})

app.listen(5000,()=>{
    console.log('Servidor rodando com sucesso')
})