import {View} from "./view.js";

export class LoginView {
    #model;
    #controller;

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
    }

    render(parent) {
        let header = document.createElement("h1");
        header.textContent = "This project is a dub.";
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

        // let redirect = document.createElement("a");
        // redirect.href = "index.html";

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

        // redirect.append(loginBtn);

        let loginContainer = document.createElement("div")
        loginContainer.classList.add("loginContainer")
        parent.append(header);
        loginContainer.append(usernamePasswordPrompt);
        loginContainer.append(username);
        loginContainer.append(br1);
        loginContainer.append(password);
        loginContainer.append(br2);
        loginContainer.append(loginBtn);
        parent.append(loginResult);
        parent.append(loginContainer)
        this.#model.addEventListener("login", e => {
            sessionStorage.setItem("user", JSON.stringify(e.detail));
            console.log(e.detail);
            window.location.href = "index.html";
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