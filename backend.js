const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())
app.use(express.json())

app.use(cors())
app.use(express.json());


var connection

function kapcsolat()
{
    connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fogorvos_vizsga'
    })

    connection.connect()    
}

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/orvosAdatok', (req, res) => {
    kapcsolat()
    connection.query('SELECT * FROM orvosok INNER JOIN orvos_szakterulet ON orvosok.orvos_id = orvos_szakterulet.orvos_id INNER JOIN szakteruletek ON orvos_szakterulet.szakterulet_id = szakteruletek.szak_id WHERE orvosok.orvos_id = 1 GROUP BY orvosok.orvos_id', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
  })
//---------------------------------------Osszes szakterulet :D
app.get('/szakteruletek', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from szakteruletek', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
  })

//-----------------------------------------------------------------------------------Orvosok szakteruletenkent
  app.get('/orvosok', (req, res) => {
    kapcsolat()
    connection.query('SELECT * from orvos_szakterulet inner join szakteruletek on orvos_szakterulet.szakterulet_id = szakteruletek.szak_id inner join orvosok on orvosok.orvos_id = orvos_szakterulet.orvos_id', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
  })


  




//******************************************************
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})