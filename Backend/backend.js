const express = require('express')
const mysql = require('mysql')
const nodemailer = require('nodemailer');

const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('kepek'))

app.use(cors())
app.use(express.json());


var connection

function kapcsolat()
{
    connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fogorvos_vizsga2'
    })

    connection.connect()    
}

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

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

app.get('/OrvosokSzakteruletei', (req, res) => {
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

app.get('/csak_orvosok', (req, res) => {
    kapcsolat()
    connection.query(`SELECT * FROM orvosok;`, (err, rows, fields) => {
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

app.get('/orvosAdatok2', (req, res) => {
  kapcsolat()
  connection.query(`SELECT orvosok.orvos_id, orvosok.nev, orvosok.telefon, orvosok.kep, orvosok.leiras, GROUP_CONCAT(szakteruletek.szak_nev ORDER BY szakteruletek.szak_nev SEPARATOR ' , ') AS szakteruletek FROM orvosok INNER JOIN orvos_szakterulet ON orvosok.orvos_id = orvos_szakterulet.orvos_id INNER JOIN szakteruletek ON orvos_szakterulet.szakterulet_id = szakteruletek.szak_id GROUP BY orvosok.orvos_id, orvosok.nev, orvosok.telefon;`, (err, rows, fields) => {
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

app.get('/csakOrvosokEsSzakteruletek', (req, res) => {
    kapcsolat()
    connection.query(`SELECT orvosok.nev, orvosok.telefon, GROUP_CONCAT(szakteruletek.szak_nev ORDER BY szakteruletek.szak_nev SEPARATOR ' , ') AS szakteruletek FROM orvosok INNER JOIN orvos_szakterulet ON orvosok.orvos_id = orvos_szakterulet.orvos_id INNER JOIN szakteruletek ON orvos_szakterulet.szakterulet_id = szakteruletek.szak_id GROUP BY orvosok.orvos_id, orvosok.nev, orvosok.telefon;`, (err, rows, fields) => {
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
          res.status(200).send("Hiba")
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
    connection.query(`SELECT * FROM idopont_foglalas WHERE if_orvosid=? AND if_datum=? AND if_idopont=?`,[req.body.bevitel2, req.body.bevitel3, req.body.bevitel4], (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            if (rows.length!=0) {
                res.status(200).send("Az időpont már foglalt!")
        } else {
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
            console.log("Sikeres felvitel!");
            //Email küldése funkció 
            const userEmail = req.body.bevitel6;
            if (userEmail) {
                sendConfirmationEmail(userEmail);
            }
            res.status(200).send("Sikeres felvitel!");
            }
            })
        }}
    })
    connection.end()
})
//Email küldő függvény
const sendConfirmationEmail = (recipientEmail) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'sunshinedentalfogaszat@gmail.com', 
            pass: 'opal lhvt wasb ocod' 
        }
    });
    let mailOptions = {
        from: 'sunshinedentalfogaszat@gmail.com',
        to: recipientEmail,
        subject: 'Időpontfoglalás visszaigazolás',
        text: 'Kedves páciens! Sikeresen lefoglalta az időpontját. Köszönjük, hogy minket választott!'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Email küldési hiba:", error);
        } else {
            console.log("Email elküldve: " + info.response);
        }
    });
};

app.get('/idopontok', (req, res) => {
  kapcsolat()
  connection.query('SELECT orvosok.nev, szakteruletek.szak_nev, idopont_foglalas.if_datum, idopont_foglalas.if_idopont, idopont_foglalas.if_nev, idopont_foglalas.if_email, idopont_foglalas.if_telefon FROM idopont_foglalas INNER JOIN orvosok ON orvosok.orvos_id = idopont_foglalas.if_orvosid INNER JOIN szakteruletek ON szakteruletek.szak_id = idopont_foglalas.if_szakrendelesid;', (err, rows, fields) => {
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

app.delete('/idopontTorles', (req, res) => {
kapcsolat()
connection.query(`DELETE FROM idopont_foglalas WHERE if_telefon = ${req.body.bevitel1}`,
(err, rows, fields) => {
    if (err)    
    {
        console.log("Hiba")
        console.log(err)
        res.status(500).send("Hiba")
    }
    else
    {
        console.log("Sikeres törlés!")
        res.status(200).send("Sikeres törlés")
    }
    })  
connection.end()
})


//******************************************************
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})