const express = require('express')
const app = express()
const productapi = require('./apis/products')
const cors=require('cors')

app.use(cors())
app.use(express.json())
app.use(productapi)








app.listen(8080,()=>{
    console.log('Server is running')
})