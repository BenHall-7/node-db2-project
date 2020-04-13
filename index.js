const express = require("express");
const db = require("./data/dbConfig");

const server = express();
server.use(express.json());

// server.get("/cars", (req, res) => {
//     db("cars")
//         .then(res2 => {

//         })
//         .catch()
// })

server.listen(5000, () => {
    console.log("server listening at port 5000");
});