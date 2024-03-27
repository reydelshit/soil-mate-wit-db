import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'

const app = express()
const port = 8800


app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soil_mate'
})

app.use(express.json())
app.use(cors())

let result = {}

app.post('/update', (req, res) => {
  result = req.body;

  console.log('Received data:', result);

  res.sendStatus(200);
});

app.get('/data', (req, res) => {
  res.json({ res: result }); // Replace {} with your actual data
});



// all books 
app.get("/plants", (req, res) => {
    const query = "SELECT * FROM plants"
    databaseConnection.query(query, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// all plants 
app.post("/plants/soil/:soil", (req, res) => {
    const query = "SELECT * FROM plants WHERE plants.soilMoistureMin <= ? AND plants.soilMoistureMax >= ?"
    const soil = [req.params.soil, req.params.soil]
        databaseConnection.query(query, soil, (err, data) => {
            if(err) return res.json(err)
            return res.json(data)
        })
})



// // specific books 
// app.get("/books/:id", (req, res) => {
//     const query = "SELECT * FROM books WHERE id = ?"
//     const id = req.params.id
//     databaseConnection.query(query, id, (err, data) => {
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })





app.post("/plants", (req, res) => {
    const query = "INSERT INTO plants (`plant_name`, `plant_image`, `plant_description`, `npk`, `phLevelMin`, `phLevelMax`,`soilMoistureMin`,`soilMoistureMax`,`temperatureMin`, `temperatureMax`) VALUES (?)"
    const values = [
        req.body.plant_name,
        req.body.plant_image,
        req.body.plant_description,
        req.body.npk,
        req.body.phLevelMin,
        req.body.phLevelMax,
        req.body.soilMoistureMin,
        req.body.soilMoistureMax,
        req.body.temperatureMin,
        req.body.temperatureMax
    ]

    databaseConnection.query(query, [values] , (err, data) => {
        if(err) return res.json(err)
        return res.json({
        ...data,
        message: "succesfully added"
        })
    })
})


app.delete("/books/:id", (req, res) => {
    const query = "DELETE FROM books WHERE id = ?"
    const id = req.params.id

    databaseConnection.query(query, id, (err, data) => {
        if(err) return res.json(err)
        return res.json('succesfully deleted')
    })
})


app.put(`/books/update/:id`, (req, res) => {
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?"
    const id = req.params.id
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ]

    databaseConnection.query(query, [...values, id] , (err, data) => {
        if(err) return res.json(err)
        return res.json({
        ...data,
        message: "succesfully updated"
        })
    })
})




app.listen(port, () => {
    console.log('Backend server is running!', port)
})