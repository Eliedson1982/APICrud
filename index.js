const express = require('express')
const fs = require('fs')
const server = express()
const dados = require("./src/data/dados.json")
const cors = require('cors')

server.use(cors())

server.use(express.json())

server.get("/users", (req, res) =>{
    return res.json(dados.User)
})

server.post("/users", (req, res) =>{
    const newuser = req.body
    if(!newuser.Nome || !newuser.Idade){
        return res.status(400).json({mensagem: "Os dados estão incompletos, favor arrumar."})
    }
    else{
        dados.User.push(newuser)
        savefiles(newuser)
        return res.status(201).json({mensagem: "Beleza"})
    }
})

server.put("/users/:id", (req, res) =>{
    const userId = parseInt(req.params.id)
    const updateUser = req.body
    const idUser = dados.User.findIndex(u => u.id === userId)
    if(idUser === -1){
        return res.status(404).json({mensagem: "Os dados não foram encontrados."})
    }
    else{
        dados.User[idUser].Nome = updateUser.Nome || dados.User[idUser].Nome
        dados.User[idUser].Idade = updateUser.Idade || dados.User[idUser].Idade
        savefiles(dados)
        return res.json({mensagem: "Usuário Atualizado!"})
    }
})

server.delete("/users/:id",(req, res) =>{
    const userId = parseInt(req.params.id)
    dados.User = dados.User.filter(u => u.id !== userId)
    savefiles(dados)
    return res.status(200).json({mensagem: "Usuário excluído com sucesso!"})
})

server.listen(3000, ()=>{
    console.log("tafunfano")
})

function savefiles(){
    fs.writeFileSync(__dirname + "/src/data/dados.json", JSON.stringify(dados, null, 2))
}

module.exports = { server, savefiles }