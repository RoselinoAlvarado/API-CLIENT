// Todas as constantes

const express = require('express')
/* const { Sequelize, DataTypes } = require('sequelize') */
const cors = require('cors')

const {Cliente,sequelize,Sequelize} = require('./models/index')
const morgan = require('morgan')
const app = express()
/* const sequelize = new Sequelize({ dialect: 'sqlite', storage: './cliente-list.db' }) */
const cliente = Cliente
/* const routes = require('./config/routes') */

app.use(cors())

// Morgan, log de requisições!
app.use(morgan('dev'))
// Determinar tipo de dato a receber JSON
app.use(express.json())
// Rotas!
/* app.use(routes) */

//Rotas

// List clientes
app.get('/cliente', async (req, res) => {
  const clienteList = await cliente.findAll()

  res.json(clienteList)
})

// Criar clientes
app.post('/cliente', async (req, res) => {
  await sequelize.sync()
  const body = req.body
  
  
  const pessoa = {
  nome: body.nome,
  cpf: body.cpf,
  telefone: body.telefone
  } 
  
  console.log(pessoa)

  const pessoas = await cliente.create(pessoa)

  res.json(cliente)
})

// Ver cliente por id
app.get('/cliente/:id', async (req, res) => {
  const clienteId = req.params.id
  const cliente = await Cliente.findByPk(clienteId)
  const body = req.body

  if (cliente) {
    await cliente.get ({ ...body })
    res.send({ cliente })
  } else {
    res.status(404)
    res.send({ message: 'cliente não encontrado' })
  }

  res.send({ cliente })

})

// Editar cliente
app.put('/cliente/:id', async (req, res) => {
  const clienteId = req.params.id
  const body = req.body
  const cliente = await Cliente.findByPk(clienteId)

  if (cliente) {
    await cliente.update({ ...body })
    res.send({ cliente })
  } else {
    res.status(404)
    res.send({ message: 'cliente não encontrado' })
  }
})

// Delete cliente
app.delete('/cliente/:id', async (req, res) => {
  const clienteId = req.params.id
  const cliente = await Cliente.findByPk(clienteId)

  if (cliente) {
    await cliente.destroy()
    res.send({ cliente })
  } else {
    res.status(404)
    res.send({ message: 'cliente não encontrado' })
  }
})

// Acesso ao servidor, ligar servidor
app.listen(8000, () => {
  console.log('ExpressJS iniciado em http://localhost:8000/cliente')
})
