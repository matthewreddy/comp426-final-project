export class AdminView {
    #model;
    #controller;
    #user;

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
        this.#user = JSON.parse(sessionStorage.getItem("user"));
    }

    render(parent){
        let header = document.createElement("h1");
        header.textContent = "ExpressYourself";
        header.classList.add("header");

        let backBtn = document.createElement("button");
        backBtn.id = "backButton";
        backBtn.innerText = "↩ ";
        backBtn.addEventListener("click", async () => {
            window.location.href = "../index/index.html";
        });

        parent.append(header);
        parent.append(backBtn);

        let userExists = false;
        this.#controller.getAllUsers().then(users => {
            for (let u of users) {
                if (this.#user.username === u.username) userExists = true;
                if (this.#user.username === u.username && !u.isAdmin) window.location.href = "../index/index.html";
               
                let userDiv = document.createElement("div");

                let admin = document.createElement("p");
                if (u.isAdmin) {
                    admin.textContent = "Admin";
                } else {
                    admin.textContent = "User";
                }

                let usernameView = document.createElement("p");
                usernameView.classList.add("postHeader");
                usernameView.textContent = u.username;

                let promoteBtn = document.createElement("button");
                promoteBtn.innerText = "Promote";
                promoteBtn.id = "promoteUserButton"
                promoteBtn.addEventListener("click", async () => {
                    await this.#controller.editUser(u.id, u.username, u.password, true);
                });

                let demoteBtn = document.createElement("button");
                demoteBtn.innerText = "Demote";
                demoteBtn.addEventListener("click", async () => {
                    await this.#controller.editUser(u.id, u.username, u.password, false);
                });

                let deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Delete";
                deleteBtn.id = "deleteUserButton"
                deleteBtn.addEventListener("click", async () => {
                    await this.#controller.deleteUser(u.id);
                });

                userDiv.append(usernameView);
                userDiv.append(admin);
                if (u.username !== "super"){
                    if (u.isAdmin){
                        userDiv.append(demoteBtn);
                    } else {
                        userDiv.append(promoteBtn);
                    }
                    userDiv.append(deleteBtn);
                }
                userDiv.classList.add("user");
                userDiv.classList.add("post");
                
                parent.append(userDiv);
            }

            if (!userExists) {
                window.location.href = "../login/login.html";
            }
        })
        .catch(e => {
          console.error(e);
        });      

        this.#model.addEventListener("refresh", () => {
            window.location.href = "admin.html";
        });
        
    }
}