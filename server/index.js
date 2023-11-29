// vamos a levantar el servidor

const server = require("./src/server")
const {conn} = require("./src/db")

//establecemos en que puerto se debe levantar el servidor.

const PORT = 1030

server.listen( PORT, ()=>{
  conn.sync({force: false})
  console.log(`Listening on port ${PORT}`)
})
