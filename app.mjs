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

// USERS

app.get("/users", async (req, res) => {
    res.json(await User.getAll());
});

app.get("/users/:identifier", async (req, res) => {
    // Identifier can be either the user's ID or username
    if (isNaN(+req.params.identifier)) {
        let user = await User.findByUsername(req.params.identifier);
        if (!user) {
            res.status(404).send(`User not found with username = ${req.params.identifier}.`);
            return;
        }
        res.json(user.json());
    } else {
        let user = await User.findByID(req.params.identifier);
        if (!user) {
            res.status(404).send(`User not found with id = ${req.params.identifier}.`);
            return;
        }
        res.json(user.json());
    }
});

app.get("/users/:username/:password", async (req, res) => {
    res.json(await User.validate(req.params.username, req.params.password));
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

// POSTS

app.get("/posts", async (req, res) => {
    if (req.query.user_id !== undefined) {  // /posts?user_id={some user ID}
        let user = await User.findByID(req.query.user_id);
        if (!user) {
            res.status(404).send(`User not found with id = ${req.query.user_id}.`);
            return;
        }
        res.json(await Post.getAllByUserID(req.query.user_id));
    } else {
        res.json(await Post.getAll());
    }
});

app.get("/posts/:id", async (req, res) => {
    let post = await Post.findByID(req.params.id);
    if (!post) {
        res.status(404).send(`Post not found with id = ${req.params.id}.`);
        return;
    }
    res.json(post.json());
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