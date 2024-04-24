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

        let usernamePasswordPrompt = document.createElement("p");
        usernamePasswordPrompt.textContent = "Enter your username and password.";

        let username = document.createElement("input");
        username.type = "text";
        username.placeholder = "Username";

        let br1 = document.createElement("br");

        let password = document.createElement("input");
        password.type = "password";
        password.placeholder = "Password";

        let br2 = document.createElement("br");

        let loginResult = document.createElement("p");
        loginResult.textContent = `Welcome back, ${this.#user.username}!`;

        let posts = await this.#controller.getAllPosts();
        posts.forEach(async p => {
            console.log(p);
            let postDiv = document.createElement("div");

            let postTitle = document.createElement("h4");
            postTitle.textContent = p.title;

            let postContent = document.createElement("p");
            postContent.textContent = p.content;

            let postUser = document.createElement("p");
            let user = await this.#controller.getUserByID(p.user_id);
            postUser.textContent = user.username;

            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.addEventListener("click", async () => {
                await this.#controller.deletePost(p.id);
            });

            postDiv.append(postTitle);
            postDiv.append(postContent);
            postDiv.append(postUser);
            if (user.username === this.#user.username) {
                postDiv.append(deleteBtn);
            }

            postDiv.classList.add("post");

            parent.append(postDiv);
        });

        parent.append(header);
        parent.append(loginResult);
    }


}