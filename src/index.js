const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const getMeaning = require("./getMeaning")

app.use(cors())

app.get("/", async (req, res) => {
    const kelime = req.query["kelime"]
    await getMeaning(kelime)
        .then((result) => {
            res.json({ anlam: result.anlam, ornek: result.ornek })
            res.status(200)
        })
        .catch((err) => {
            if (err == "Sonuç Bulunamadı") {
                res.status(404)
            }
            res.json({ error: "Bulunamadı" })
        })
})

app.listen(process.env.PORT)
