import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {User} from "./user.mjs";
import {Post} from "./post.mjs";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// I'm not doing any validation right now. Can handle that later.

app.get("/users", async (req, res) => {
    res.json(await User.getAll());
});

app.get("/users/:id", async (req, res) => {
    let user = await User.findByID(req.params.id);
    if (!user) {
        res.status(404).send(`User not found with id = ${req.params.id}.`);
        return;
    }
    res.json(user.json());
});

app.get("/users/:username", async (req, res) => {
    let user = await User.findByUsername(req.params.username);
    if (!user) {
        res.status(404).send(`User not found with username = ${req.params.username}`);
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
        res.status(404).send(`User not found with id = ${req.params.id}.`);
        return;
    }
    let newUser = await user.update(req.body);
    res.status(200).json(newUser.json());
});

app.delete("/users/:id", async (req, res) => {
    let user = await User.findByID(req.params.id);
    if (!user) {
        res.status(404).send(`User not found with id = ${req.params.id}.`);
        return;
    }
    res.json(await User.deleteByID(req.params.id));
});

app.get("/posts", async (req, res) => {
    res.json(await Post.getAll());
});

app.get("/posts/:id", async (req, res) => {
    let post = await Post.findByID(req.params.id);
    if (!post) {
        res.status(404).send(`Post not found with id = ${req.params.id}.`);
        return;
    }
    res.json(post.json());
});

app.get("/posts/:user_id", async (req, res) => {
    let user = await User.findByID(req.params.user_id);
    if (!user) {
        res.status(404).send(`User not found with id = ${req.params.user_id}`);
        return;
    }
    res.json(await Post.getAllByUserID(req.params.user_id));
});

app.post("/posts", async (req, res) => {
    let post = await Post.create(req.body);
    if (!post) {
        res.status(400).send("Bad request.");
        return;
    }
    res.status(201).json(post.json());
});

app.put("/posts/:id", async (req, res) => {
    let post = await Post.findByID(req.params.id);
    if (!post) {
        res.status(404).send(`Post not found with id = ${req.params.id}.`);
        return;
    }
    let newPost = await post.update(req.body);
    res.status(200).json(newPost.json());
});

app.delete("/posts/:id", async (req, res) => {
    let post = await Post.findByID(req.params.id);
    if (!post) {
        res.status(404).send(`Post not found with id = ${req.params.id}.`);
        return;
    }
    res.json(await Post.deleteByID(req.params.id));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
})