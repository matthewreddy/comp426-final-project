export class SignupView {
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

        let usernameLabel = document.createElement("p");
        usernameLabel.textContent = "Provide a unique username.";

        let usernameInput = document.createElement("input");
        usernameInput.placeholder = "johndoe";

        let passwordLabel = document.createElement("p");
        passwordLabel.textContent = "Provide a password.";

        let passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.placeholder = "Str0ngP4ssw0rd123$!";

        let submitBtn = document.createElement("button");
        submitBtn.innerText = "Submit";
        submitBtn.addEventListener("click", async () => {
            await this.#controller.createUser(usernameInput.value, passwordInput.value);
        });

        let resultText = document.createElement("p");
        resultText.hidden = true;

        let returnLink = document.createElement("a");
        returnLink.textContent = "Return to login";
        returnLink.href = "login.html";

        let signUpContainer = document.createElement("div");
        signUpContainer.classList.add("loginContainer")

        parent.append(header);
        signUpContainer.append(usernameLabel);
        signUpContainer.append(usernameInput);
        signUpContainer.append(passwordLabel);
        signUpContainer.append(passwordInput);
        signUpContainer.append(document.createElement("br"));
        signUpContainer.append(submitBtn);
        signUpContainer.append(document.createElement("br"))
        signUpContainer.append(resultText);
        signUpContainer.append(returnLink);
        parent.append(signUpContainer);

        this.#model.addEventListener("createusersuccess", e => {
            resultText.hidden = false;
            resultText.textContent = `Account ${e.detail.username} successfully created!`;
        });

        this.#model.addEventListener("createuserfail", () => {
            resultText.hidden = false;
            resultText.textContent = `Username ${usernameInput.value} is already taken.`;
        });
    }
}