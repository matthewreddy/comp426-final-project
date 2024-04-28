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
        header.textContent = "ExpressYourself";
        header.classList.add("header");

        let loginResult = document.createElement("p");
        loginResult.id = "loginResult";
        loginResult.textContent = `Welcome back, ${this.#user.username}!`;

        let createBtn = document.createElement("button");
        createBtn.id = "createButton";
        createBtn.innerText = "+";
        createBtn.addEventListener("click", () => {
            createPostDiv.hidden = false;
        });

        let logoutBtn = document.createElement("button");
        logoutBtn.id = "logoutButton";
        logoutBtn.innerText = "Logout";
        logoutBtn.addEventListener("click", async () => {
            window.location.href = "../login/login.html";
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

        let titleInput = document.createElement("input");
        titleInput.placeholder = "Title your amazing post";

        let contentInput = document.createElement("textarea");
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

        createPostDiv.append(titleInput);
        createPostDiv.append(contentInput);
        createPostDiv.append(document.createElement("br"));
        createPostDiv.append(finalCreateBtn);
        createPostDiv.append(cancelBtn);

        let generatePostDiv = document.createElement("div");
        generatePostDiv.classList.add("newPost");
        generatePostDiv.hidden = true;

        let openGeneratePostBtn = document.createElement("button");
        openGeneratePostBtn.innerText = "🤖";
        openGeneratePostBtn.id = "generatePostButton"
        openGeneratePostBtn.addEventListener("click", () => {
            generatePostDiv.hidden = false;
        });

        let adminSettings = document.createElement("button");
        adminSettings.id = "adminSettingsButton";
        adminSettings.append("\u{1F6E0}")
        adminSettings.addEventListener("click", () => {
            window.location.href = "../admin/admin.html";
        })


        let generateTitleInput = document.createElement("input");
        generateTitleInput.placeholder = "Title your amazing post";

        let postKeywordsInput = document.createElement("input");
        postKeywordsInput.placeholder = "Enter some keywords separated by commas";

        let generatePostResult = document.createElement("p");
        generatePostResult.textContent = "";
        
        let generatePostBtn = document.createElement("button");
        generatePostBtn.id = "generatePost";
        generatePostBtn.innerText = "🤖";
        generatePostBtn.addEventListener("click", async () => {
            await this.#controller.generatePost(postKeywordsInput.value);
        });

        let postGeneratedPostBtn = document.createElement("button");
        postGeneratedPostBtn.innerText = "\u{2713}";
        postGeneratedPostBtn.style.left = "10px";
        postGeneratedPostBtn.addEventListener("click", async () => {
            await this.#controller.createPost(generateTitleInput.value, generatePostResult.innerText, this.#user.id);
        });

        let cancelGenerateBtn = document.createElement("button");
        cancelGenerateBtn.innerText = "\u{292B}";
        cancelGenerateBtn.style.right = "10px";
        cancelGenerateBtn.addEventListener("click", () => {
            generatePostDiv.hidden = true;
        });

        generatePostDiv.append(generateTitleInput);
        generatePostDiv.append(postKeywordsInput);
        generatePostDiv.append(document.createElement("br"));
        generatePostDiv.append(generatePostBtn);
        generatePostDiv.append(generatePostResult);
        generatePostDiv.append(postGeneratedPostBtn);
        generatePostDiv.append(cancelGenerateBtn);

        header.append(logoutBtn);
        header.append(currentUserMessage);

        parent.append(header);
        parent.append(loginResult);
        parent.append(createBtn);
        parent.append(openGeneratePostBtn);

        let adminSearch = await this.#controller.getUserByID(this.#user.id);
        if (adminSearch.isAdmin) parent.append(adminSettings);
        parent.append(createPostDiv);
        parent.append(generatePostDiv);
        
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

            let editBtn = document.createElement("button");
            editBtn.classList.add("editButton");
            editBtn.innerText = "\u{270E}";
            editBtn.addEventListener("click", async () => {
                currentPostID = p.id;
                editTitle.value = p.title;
                editContent.value = p.content;
                editPostDiv.style.display = "block";
            });

            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("deleteButton");
            deleteBtn.innerText = "\u{292B}";
            deleteBtn.addEventListener("click", async () => {
                await this.#controller.deletePost(p.id);
            });

            let likeCount = document.createElement("p");
            likeCount.innerText = await this.#controller.getNumLikes(p.id);

            let likeBtn = document.createElement("button");
            likeBtn.innerText = "Like";
            likeBtn.addEventListener("click", async () => {
                let userHasNotLiked = await this.#controller.hasUserNotLikedPost(p.id, this.#user.id);
                if (userHasNotLiked) {
                    await this.#controller.like(p.id, this.#user.id);
                    likeCount.innerText = await this.#controller.getNumLikes(p.id);
                }
            });

            postDiv.append(postUser);
            postDiv.append(postTitle);
            postDiv.append(postContent);
            if (user.username === this.#user.username || this.#user.isAdmin) {
                postDiv.append(editBtn);
                postDiv.append(deleteBtn);
            }
            postDiv.append(likeBtn);
            postDiv.append(likeCount);

            postDiv.classList.add("post");

            parent.append(postDiv);
        }
        let overlay = document.createElement("div")
        overlay.id = "overlay"
        parent.append(overlay);

        let editPostDiv = document.createElement("div");
        editPostDiv.classList.add("editPost");

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



                for(let i=0; i<7; i++) {
                    let weather = document.createElement("p");
                    let heute = forecastHeute.properties.periods[i];
                    weather.append(heute.name + ": " + heute.shortForecast + ", " + heute.temperature + "°");
                    sideContent.append(weather);

                    let image = document.createElement("img");
                    image.src = heute.icon;
                    image.classList.add("weatherIcon");
                    sideContent.append(image);

                    // let iconURL = heute.icon;
                    // fetch(iconURL)
                    //     .then(response => {
                    //         if (!response.ok) {
                    //         throw new Error('Could not get weather data');
                    //         }
                    //         return response.json();
                    //     })
                    //     .then(data => {

                    //     });

                }

                parent.append(sideContent);

            })
            .catch(error => {
                console.error('Error:', error);
            });
            })
            .catch(error => {
                console.error('Error:', error);
        });

        this.#model.addEventListener("refresh", () => {
            window.location.href = "index.html";
        });

        this.#model.addEventListener("generatepost", e => {
            generatePostResult.textContent = e.detail;
        });

    }
}