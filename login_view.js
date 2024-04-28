export class LoginView {
    #model;
    #controller;

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
    }

    render(parent) {
        let header = document.createElement("h1");
        header.textContent = "ExpressYourself";
        header.classList.add("header");

        let usernamePasswordPrompt = document.createElement("p");
        usernamePasswordPrompt.textContent = "Enter your username and password.";

        let username = document.createElement("input");
        username.type = "text";
        username.placeholder = "Username";

        let password = document.createElement("input");
        password.type = "password";
        password.placeholder = "Password";

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

        let createUser = document.createElement("p");
        createUser.innerHTML = `Don't have an account yet? <br> <a href="signup.html">Click here to sign up!</a>`;

        let loginContainer = document.createElement("div")
        loginContainer.classList.add("loginContainer")
        loginContainer.append(usernamePasswordPrompt);
        loginContainer.append(username);
        loginContainer.append(document.createElement("br"));
        loginContainer.append(password);
        loginContainer.append(document.createElement("br"));
        loginContainer.append(loginBtn);
        loginContainer.append(loginResult);
        loginContainer.append(createUser);

        parent.append(header);
        parent.append(loginContainer)

        this.#model.addEventListener("login", e => {
            sessionStorage.setItem("user", JSON.stringify(e.detail));
            window.location.href = "index.html";
        });

    }
}