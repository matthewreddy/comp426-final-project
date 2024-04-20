import express from "express";
import bodyParser from "body-parser";
import {User} from "./user.mjs";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// I'm not doing any validation right now. Can handle that later.

app.get("/users", async (req, res) => {
    res.json(await User.getAll());
});

app.get("/users/:id", async (req, res) => {
    let user = await User.findByID(req.params.id);
    if (!user) {
        res.status(404).send("User not found.");
        return;
    }
    res.json(user.json());
});

app.post("/users", async (req, res) => {
    let user = await User.create(req.body);
    if (!user) {
        res.status(400).send("Bad request.");
        return;
    }
    res.status(201).json(user.json());
});

app.put("/users/:id", async (req, res) => {
    let user = await User.findByID(req.params.id);
    if (!user) {
        res.status(404).send("User not found.");
        return;
    }
    let newUser = await user.update(req.body);
    res.status(200).json(newUser.json());
});

app.delete("/users/:id", async (req, res) => {
    let user = await User.findByID(req.params.id);
    if (!user) {
        res.status(404).send("User not found.");
        return;
    }
    res.json(await User.deleteByID(req.params.id));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
})