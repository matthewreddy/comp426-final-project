import {Model} from "./model.js";
import {Controller} from "./controller.js";

export class View {
    #model;
    #controller;
    #user;

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
        this.#user = JSON.parse(sessionStorage.getItem("user"));
    }

    async render(parent) {
        let header = document.createElement("h1");
        header.textContent = "ThisProjectIsADub.com";
        header.classList.add("header");

        let loginResult = document.createElement("p");
        loginResult.textContent = `Welcome back, ${this.#user.username}!`;

        let createBtn = document.createElement("button");
        createBtn.id = "createButton";
        createBtn.innerText = "+";
        createBtn.addEventListener("click", () => {
            this.#controller.createPostRequest();
        });

        let createPostDiv = document.createElement("div");
        createPostDiv.classList.add("newPost");
        createPostDiv.hidden = true;

        //let titleLabel = document.createElement("p");
        let titleInput = document.createElement("input");

        //titleLabel.textContent = "Title: ";
        titleInput.placeholder = "Title your amazing post";

        //let contentLabel = document.createElement("p");
        let contentInput = document.createElement("textarea");

        //contentLabel.textContent = "Content: ";
        contentInput.placeholder = "The main content of your post goes here!";

        let finalCreateBtn = document.createElement("button");
        finalCreateBtn.innerText = "Post!";
        finalCreateBtn.addEventListener("click", async () => {
            await this.#controller.createPost(titleInput.value, contentInput.value, this.#user.id);
        });

        let cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.addEventListener("click", () => {
            createPostDiv.hidden = true;
        });

        //createPostDiv.append(titleLabel);
        createPostDiv.append(titleInput);
        //createPostDiv.append(contentLabel);
        createPostDiv.append(contentInput);
        createPostDiv.append(document.createElement("br"));
        createPostDiv.append(finalCreateBtn);
        createPostDiv.append(cancelBtn);

        parent.append(header);
        parent.append(loginResult);
        parent.append(createBtn);
        parent.append(createPostDiv);
        
        let posts = await this.#controller.getAllPosts();
        for (let p of posts) {
            let postDiv = document.createElement("div");

            let postTitle = document.createElement("h4");
            postTitle.textContent = p.title;

            let postContent = document.createElement("p");
            postContent.textContent = p.content;

            let postUser = document.createElement("p");
            let user = await this.#controller.getUserByID(p.user_id);
            postUser.textContent = user.username;

            let postDate = document.createElement("p");
            let date = new Date(p.timestamp);
            postDate.textContent = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.addEventListener("click", async () => {
                await this.#controller.deletePost(p.id);
            });

            postDiv.append(postTitle);
            postDiv.append(postContent);
            postDiv.append(postUser);
            postDiv.append(postDate);
            if (user.username === this.#user.username || this.#user.isAdmin) {
                postDiv.append(deleteBtn);
            }

            postDiv.classList.add("post");

            parent.append(postDiv);
        }

        this.#model.addEventListener("createpost", () => {
            createPostDiv.hidden = false;
        });
    }




}