const express=require('express')
const app=express()
const port=4005
const path=require('path')
const hbs =require('hbs')
const shortner=require('./shortner')
const bodyParser=require('body-parser')


const viewsDir=path.join(__dirname,'/Templates/views')
const partialpath=path.join(__dirname,'/Templates/partials')
app.set('views',viewsDir)
app.set('view engine','hbs')
hbs.registerPartials(partialpath)

app.use(bodyParser.urlencoded({ extended: false }))
var jsonParser = bodyParser.json()

// parse application/json
app.use(express.json({limit:'1mb'}))


app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/exp',(req,res)=>{
    res.render('expand');
})

app.get('/short/:short',(req,res)=>{
    const code=req.params.short;
    shortner.expand(code).then((result)=>{
        res.send({
            short:result
        })
    }).catch((error)=>{
        console.log(error);
    })
    
})


app.get('/open/:short',(req,res)=>{
    const code=req.params.short;
    shortner.expand(code).then((result)=>{
        res.render('redirect')
        console.log(result)
    }).catch((error)=>{
        console.log(error);
    })
})

app.post('/expand',(req,res)=>{
    console.log(req.body.url)
    var url=""
    return res.send({url:shortner.shorten(req.body.url)})
    

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})