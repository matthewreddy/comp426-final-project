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
        loginResult.id = "loginResult";
        loginResult.textContent = `Welcome back, ${this.#user.username}!`;

        let createBtn = document.createElement("button");
        createBtn.id = "createButton";
        createBtn.innerText = "+";
        createBtn.addEventListener("click", () => {
            this.#controller.createPostRequest();
        });

        let logoutBtn = document.createElement("button");
        logoutBtn.id = "logoutButton";
        logoutBtn.innerText = "Logout";
        logoutBtn.addEventListener("click", async () => {
            await this.#controller.logout();
        });

        let currentUserMessage = document.createElement("div");
        let message = document.createElement("p");
        currentUserMessage.id = "currentUserMessage";
        message.append("Currently logged in")
        message.append(document.createElement("br"))
        message.append('as ' + this.#user.username)
        currentUserMessage.append(message);

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
        finalCreateBtn.innerText = "\u{2713}";
        finalCreateBtn.style.left = "10px";
        finalCreateBtn.addEventListener("click", async () => {
            await this.#controller.createPost(titleInput.value, contentInput.value, this.#user.id);
        });

        let cancelBtn = document.createElement("button");
        cancelBtn.innerText = "\u{292B}";
        cancelBtn.style.right = "10px"
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

        header.append(logoutBtn);
        header.append(currentUserMessage);
        parent.append(header);
        parent.append(loginResult);
        parent.append(createBtn);
        parent.append(createPostDiv);
        
        let posts = await this.#controller.getAllPosts();
        let currentPostID;
        for (let p of posts) {
            let postDiv = document.createElement("div");

            let postTitle = document.createElement("h4");
            postTitle.textContent = p.title;

            let postContent = document.createElement("p");
            postContent.textContent = p.content;

            let date = new Date(p.timestamp);
            let postUser = document.createElement("p");
            postUser.classList.add("postHeader");
            let user = await this.#controller.getUserByID(p.user_id);
            postUser.textContent = user.username + 
                " : " + 
                `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

            //let postDate = document.createElement("p");
            //postDate.textContent = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

            let editBtn = document.createElement("button");
            editBtn.classList.add("editButton");
            editBtn.innerText = "\u{270E}";
            editBtn.addEventListener("click", async () => {
                currentPostID = p.id;
                editTitle.value = p.title;
                editContent.value = p.content;
                this.#controller.editPostRequest();
            });

            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("deleteButton");
            deleteBtn.innerText = "\u{292B}";
            deleteBtn.addEventListener("click", async () => {
                await this.#controller.deletePost(p.id);
            });

            postDiv.append(postUser);
            postDiv.append(postTitle);
            postDiv.append(postContent);
            //postDiv.append(postDate);
            if (user.username === this.#user.username || this.#user.isAdmin) {
                postDiv.append(editBtn);
                postDiv.append(deleteBtn);
            }

            postDiv.classList.add("post");

            parent.append(postDiv);
        }
        let overlay = document.createElement("div")
        overlay.id = "overlay"
        parent.append(overlay);

        let editPostDiv = document.createElement("div");
        editPostDiv.classList.add("editPost");
        //editPostDiv.hidden = true;

        let editTitle = document.createElement("input");

        let editContent = document.createElement("textarea");

        let finalEditBtn = document.createElement("button");
        finalEditBtn.innerText = "\u{2713}";
        finalEditBtn.style.left = "10px";
        finalEditBtn.addEventListener("click", async () => {
            await this.#controller.editPost(editTitle.value, editContent.value, this.#user.id, currentPostID);
        });

        let cancelEditBtn = document.createElement("button");
        cancelEditBtn.innerText = "\u{292B}";
        cancelEditBtn.style.right = "10px"
        cancelEditBtn.addEventListener("click", () => {
            editPostDiv.style.display = "none";
            overlay.style.display = "none";
        });

        editPostDiv.append(editTitle);
        editPostDiv.append(editContent);
        editPostDiv.append(document.createElement("br"));
        editPostDiv.append(finalEditBtn);
        editPostDiv.append(cancelEditBtn);

        parent.append(editPostDiv);

        let weatherURL = 'https://api.weather.gov/points/35.911089,-79.047989'
        let sideContent = document.createElement("div");
        sideContent.id = "sideContent";

        await fetch(weatherURL)
            .then(response => {
                if (!response.ok) {
                throw new Error('Could not get weather data');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                let forecast = data.properties.forecast;
                fetch(forecast)
            .then(response => {
                if (!response.ok) {
                throw new Error('Could not get forecast data');
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                let forecastHeute = data;
                let weatherGreeting = document.createElement("p");

                weatherGreeting.append("Right now in Chapel Hill")
                sideContent.append(weatherGreeting);

                let heute = forecastHeute.properties.periods[0];

                let weather = document.createElement("p");

                weatherGreeting.append("Right now in Chapel Hill")
                sideContent.append(weatherGreeting);

                parent.append(sideContent);

            })
            .catch(error => {
                console.error('Error:', error);
            });
            })
            .catch(error => {
                console.error('Error:', error);
            });

        
        this.#model.addEventListener("createpost", () => {
            createPostDiv.hidden = false;
        });

        this.#model.addEventListener("editpost", () => {
            editPostDiv.style.display = "block";
            overlay.style.display = "block";
        });

        this.#model.addEventListener("refresh", () => {
            window.location.href = "index.html";
        });

        this.#model.addEventListener("logout", () => {
            window.location.href = "login.html";
        });

    }
}