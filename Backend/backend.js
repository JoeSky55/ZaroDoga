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

  //Józsi végpontjai________________________________________________
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

//Robi végpontjai________________________________________________

app.get('/orvosAdatok2', (req, res) => {
  kapcsolat()
  connection.query(`SELECT orvosok.orvos_id, orvosok.nev, orvosok.telefon, GROUP_CONCAT(szakteruletek.szak_nev ORDER BY szakteruletek.szak_nev SEPARATOR ' , ') AS szakteruletek FROM orvosok INNER JOIN orvos_szakterulet ON orvosok.orvos_id = orvos_szakterulet.orvos_id INNER JOIN szakteruletek ON orvos_szakterulet.szakterulet_id = szakteruletek.szak_id GROUP BY orvosok.orvos_id, orvosok.nev, orvosok.telefon;`, (err, rows, fields) => {
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
app.get('/szakteruletAdatok', (req, res) => {
  kapcsolat()
  connection.query(`SELECT szakteruletek.szak_id, szakteruletek.szak_nev, GROUP_CONCAT(orvosok.nev ORDER BY orvosok.nev SEPARATOR ' , ') AS orvosok FROM szakteruletek INNER JOIN orvos_szakterulet ON orvos_szakterulet.szakterulet_id = szakteruletek.szak_id INNER JOIN orvosok ON orvos_szakterulet.orvos_id = orvosok.orvos_id GROUP BY szakteruletek.szak_id, szakteruletek.szak_nev;`, (err, rows, fields) => {
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

app.post('/szakteruletKeres', (req, res) => {
  kapcsolat()
  connection.query(`SELECT orvosok.orvos_id AS orvosId, szakteruletek.szak_id AS szakTeruletId, szakteruletek.szak_nev, orvosok.nev AS orvos FROM szakteruletek INNER JOIN orvos_szakterulet ON orvos_szakterulet.szakterulet_id = szakteruletek.szak_id INNER JOIN orvosok ON orvos_szakterulet.orvos_id = orvosok.orvos_id WHERE szakteruletek.szak_nev = "${req.body.bevitel1}"`, (err, rows, fields) => {
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

app.post('/foglaltIdopontok', (req, res) => {
  kapcsolat()
  connection.query(`SELECT * FROM idopont_foglalas INNER JOIN orvosok ON orvosok.orvos_id = idopont_foglalas.if_orvosid INNER JOIN szakteruletek ON szakteruletek.szak_id = idopont_foglalas.if_szakrendelesid WHERE orvosok.nev = "${req.body.bevitel1}" AND if_datum = "${req.body.bevitel2}" `, (err, rows, fields) => {
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

app.post('/betegFelvitel', (req, res) => {
    kapcsolat()
    connection.query(`INSERT INTO idopont_foglalas VALUES (NULL,?,?,?,?,?,?,?);
    `, [req.body.bevitel1, req.body.bevitel2, req.body.bevitel3, req.body.bevitel4, req.body.bevitel5, req.body.bevitel6, req.body.bevitel7],
    (err, rows, fields) => {
       if (err)    
       {
            console.log("Hiba")
            console.log(err)
            res.status(500).send("Hiba")
       }
       else
       {
            console.log("Sikeres felvitel!")
            res.status(200).send("Sikeres felvitel")
       }
      })
      
      connection.end()
  })

app.get('/idopontok', (req, res) => {
  kapcsolat()
  connection.query('SELECT * FROM idopont_foglalas INNER JOIN orvosok ON orvosok.orvos_id = idopont_foglalas.if_orvosid INNER JOIN szakteruletek ON szakteruletek.szak_id = idopont_foglalas.if_szakrendelesid;', (err, rows, fields) => {
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