export class View {
    #model;
    #controller;

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
    }

    render(parent) {
        let header = document.createElement("h1");
        header.textContent = "This project is a dub.";
        header.classList.add("highlight");

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

        let loginBtn = document.createElement("button");
        loginBtn.innerText = "Login";
        loginBtn.addEventListener("click", async () => {
            let userExists = await this.#controller.doesUserExist(username.value);
            if (userExists === false) {
                loginResult.textContent = `No user found with username ${username.value}.`;
                return;
            }

            let validated = await this.#controller.validate(username.value, password.value);
            if (validated === false) {
                loginResult.textContent = `Incorrect password given for user ${username.value}.`;
                return;
            }

        });

        parent.append(header);
        parent.append(usernamePasswordPrompt);
        parent.append(username);
        parent.append(br1);
        parent.append(password);
        parent.append(br2);
        parent.append(loginBtn);
        parent.append(loginResult);

        this.#model.addEventListener("login", async e => {
            loginResult.textContent = `Welcome back, ${e.detail.username}!`;
            usernamePasswordPrompt.hidden = true;
            username.hidden = true;
            br1.hidden = true;
            password.hidden = true;
            br2.hidden = true;
            loginBtn.hidden = true;

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

                postDiv.append(postTitle);
                postDiv.append(postContent);
                postDiv.append(postUser);

                postDiv.classList.add("post");

                parent.append(postDiv);
            });
        });

        this.#model.addEventListener("adminlogin", async e => {
            // Joke functionality for now. 
            // More just proof of concept for features appearing only for admins.
            let adminText = document.createElement("p");
            adminText.textContent = `You are an admin, ${e.detail.username}!`;
            parent.append(adminText);
        });

    }
}