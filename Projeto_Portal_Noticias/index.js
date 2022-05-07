const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const moongose = require('mongoose')
const Posts = require('./Posts.js')

moongose.connect('',{useNewUrlParser: true}).then(function() {
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
            Posts.find({}).sort({'views': -1}).limit(3).exec(function(err,postsTop){
                postsTop = postsTop.map(function(val){

                    return {
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricaoCurta: val.conteudo.substr(0,100),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                        views: val.views
                    }
            })
            res.render('home',{posts:posts,postsTop:postsTop});
            })
        })
    }else{
        Posts.find({titulo: {$regex: req.query.busca, $options: "i"}}, function(err, posts){
            // console.log(posts)
            res.render('busca',{posts:posts,contagem:posts.length})
        })
        
    }
})

app.get('/:slug',(req,res)=>{
    // res.send(req.params.slug)
    Posts.findOneAndUpdate({slug: req.params.slug},{$inc : {views: 1}}, {new: true}, function(err,resposta){
        if(resposta!= null){
            Posts.find({}).sort({'views': -1}).limit(3).exec(function(err,postsTop){
                postsTop = postsTop.map(function(val){

                    return {
                        titulo: val.titulo,
                        conteudo: val.conteudo,
                        descricaoCurta: val.conteudo.substr(0,100),
                        imagem: val.imagem,
                        slug: val.slug,
                        categoria: val.categoria,
                        views: val.views
                    }
            })
            res.render('single',{noticia:resposta,postsTop:postsTop});
            })  
        }else{
            res.redirect('/')
        }
        
    }) 
})

app.listen(5000,()=>{
    console.log('Servidor rodando com sucesso')
})
