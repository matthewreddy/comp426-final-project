let parent = document.getElementById("main");

let header = document.createElement("h1");
header.textContent = "This project is a dub.";
header.classList.add("highlight");

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
    loginResult.textContent = `Logged in as username "${username.value}"`;
    let allPosts = await fetch("http://localhost:3000/posts");
    let postsJson = await allPosts.json();
    postsJson.forEach(p => {
        console.log(p);
        let postDiv = document.createElement("div");

        let postTitle = document.createElement("h4");
        postTitle.textContent = p.title;

        let postContent = document.createElement("p");
        postContent.textContent = p.content;

        let postUser = document.createElement("p");
        postUser.textContent = p.user_id;

        postDiv.append(postTitle);
        postDiv.append(postContent);
        postDiv.append(postUser);

        postDiv.classList.add("post");

        parent.append(postDiv);
    });
});

parent.append(header);
parent.append(usernamePasswordPrompt);
parent.append(username);
parent.append(document.createElement("br"));
parent.append(password);
parent.append(document.createElement("br"));
parent.append(loginBtn);
parent.append(loginResult);
