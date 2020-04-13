const express = require("express");
const status = require("http-status-codes");
const db = require("./data/dbConfig");

const server = express();
server.use(express.json());

server.get("/cars", (req, res) => {
    db("cars")
        .then(res2 => { res.status(status.OK).json(res2); })
        .catch(() => { res.status(status.INTERNAL_SERVER_ERROR).json(err); })
})

server.get("/cars/:vin", (req, res) => {
    db("cars").where({vin: req.params.vin}).limit(1)
        .then(res2 => {
            if (res2.length > 0) {
                res.status(status.OK).json(res2[0])
            } else {
                res.status(status.NOT_FOUND).json({error: "Car not found"})
            }
        })
        .catch(err => { res.status(status.INTERNAL_SERVER_ERROR).json(err); })
})

server.post("/cars", (req, res) => {
    db("cars").insert(req.body)
        .then(res2 => { res.sendStatus(status.CREATED); })
        .catch(err => { res.status(status.INTERNAL_SERVER_ERROR).json(err); })
})

server.delete("/cars/:vin", (req, res) => {
    db("cars").where({vin: req.params.vin}).del()
        .then(res2 => {
            console.log(res2);
            if (res2) {
                res.sendStatus(status.OK);
            } else {
                res.status(status.NOT_FOUND).json({error: "Car not found"});
            }
        })
        .catch(err => { res.status(status.INTERNAL_SERVER_ERROR).json(err); });
})

server.put("/cars/:vin", (req, res) => {
    db("cars").where({vin: req.params.vin}).update(req.body)
        .then(res2 => {
            console.log(res2);
            if (res2) {
                res.sendStatus(status.OK);
            } else {
                res.status(status.NOT_FOUND).json({error: "Car not found"});
            }
        })
        .catch(err => { res.status(status.INTERNAL_SERVER_ERROR).json(err); })
})

server.listen(5000, () => {
    console.log("server listening at port 5000");
});