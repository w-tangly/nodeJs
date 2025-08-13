const express = require('express');
const { param } = require('express/lib/application');
const app = express();

//permitir receber dados em JSON
app.use(express.json());

//simula um "banco de dados" em memória
let produtos =[
    {id: 1, nome:"Mouse"},
    {id: 2, nome: "Teclado"}
]

//GET - lista todos os produtos
app.get('/api/produtos', (req,res)=>{
    res.json(produtos)
});

//POST
app.post('/api/produtos',(req,res)=>{
    const novoProduto ={
        id:produtos.length +1,
        nome:req.body.nome
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

//PUT
app.put('/api/produtos/:id', (req,res)=>{
    const id = parseInt(req.params.id, 10);
    const produto = produtos.find(p=> p.id === id);
    if(isNaN(id)){
        return res.status(400).json({ mensagem: 'O ID não é um número válido'});
    };
    if (!produto){
        return res.status(404).json({mensagem: 'Produto não encontrado'});
    };
    const novoNome = req.body.nome;
    if (!novoNome || novoNome.trim() === ''){
        return res.status(400).json({mensagem: 'O campo "nome" é obrigatório e não pode ser vazio'});
    };
    produto.nome = novoNome;
    res.json(produto);
});

//DELETE
app.delete('/api/produtos/:id', (req,res) =>{
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)){
        return res.status(400).json({mensagem: 'O ID fornecido não é um número válido'})
    };
    const tamanhoOriginal = produtos.length;
    produtos = produtos.filter(p => p.id !== id);
    if (tamanhoOriginal === produtos.length){
        return res.status(404).json({mensagem:'Produto não encontrado para exclusão'})
    };
    res.status(204).send();
});

//Rota Produtos
app.get('/produtos', (req,res)=>{
    res.send('Pagina Produtos')
});

//Rota Sobre
app.get('/sobre', (req,res)=>{
    res.send('Pagina Sobre')
});

//Rota principal
app.get('/', (req,res)=>{
    res.send('Olá, este é o Servidor com Express')
});

//Rota que retorna JSPN (simula API)
app.get('/api/produtos', (req, res)=>{
    const produtos=[
        {id: 1, nome: "Mouse"},
         {id: 2, nome: "Teclado"}
    ];
    res.json(produtos);
});

//Inicia o servidor na porta 3000
app.listen(3000, ()=>{
    console.log('Servidor rodando http://localhost:3000');
});

//node server.js