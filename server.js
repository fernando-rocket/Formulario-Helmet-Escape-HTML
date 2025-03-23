const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const path = require('path')
const escapeHtml = require('escape-html')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000
const DATABASE_LINK = process.env.DATABASE_LINK
// const PORT = 3000

//MIDLEWARE PARA DEFINIR CONTENT-SECURITY-POLICY
app.use(
    helmet({
        contentSecurityPolicy:{
            directives:{
                defaultSrc: ["'self'"],//APENAS RECURSOS DO PRÓPRIO DOMÍNIO
                scriptSrc: ["'self'"],//BLOQUEIA SCRIPTS INLINE E EXTERNOS
                styleSrc: ["'self'"],
                fontSrc: ["'self'"],
            }
        }
    })
)

app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static("public"))

let info = ""

app.post('/', (req, res) => {
    info = req.body.userform
    console.log(info)
    res.redirect('/test')
})

app.get('/test', (req, res) => {
    let escapedInfo = escapeHtml(info);
    res.send(`
        <!DOCTYPE html>
        <html lang="pt">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Teste de Segurança</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Teste de Segurança</h1>
            <p>Entrada original: ${info}</p>
            <p>Entrada tratada: ${escapedInfo}</p>
        </html>
    `);
})

mongoose.connect(DATABASE_LINK)
.then(() => console.log('Database Connected!'))
.catch(error => console.log(error.message));

app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})