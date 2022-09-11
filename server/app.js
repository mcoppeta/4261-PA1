const express = require('express')
const app = express()
app.use(express.static('public'))

app.get("/", function(req, res) {
    res.send("<h1>Entry Point</h1>")
})

app.listen(process.env.PORT || 3000, //necessary for deployment
    () => {
        console.log("Started Server")
    })