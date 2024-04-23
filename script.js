let parent = document.getElementById("main");

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
    // see if user exists
    let user = null;
    let userJson = null;
    try {
        user = await fetch("http://localhost:3000/users/" + username.value);
        userJson = await user.json();
    } catch (e) {
        loginResult.textContent = `No user found with username ${username.value}.`;
        return;
    }

    // validate user password
    let validated = await fetch(`http://localhost:3000/users/${username.value}/${password.value}`);
    let validatedJson = await validated.json();
    if (validatedJson === false) {
        loginResult.textContent = `Incorrect password given for user ${username.value}.`;
        return;
    }

    loginResult.textContent = `Welcome back, ${username.value}!`;
    usernamePasswordPrompt.hidden = true;
    username.hidden = true;
    br1.hidden = true;
    password.hidden = true;
    br2.hidden = true;
    loginBtn.hidden = true;

    let allPosts = await fetch("http://localhost:3000/posts");
    let postsJson = await allPosts.json();
    postsJson.forEach(async p => {
        console.log(p);
        let postDiv = document.createElement("div");

        let postTitle = document.createElement("h4");
        postTitle.textContent = p.title;

        let postContent = document.createElement("p");
        postContent.textContent = p.content;

        let postUser = document.createElement("p");
        let user = await fetch("http://localhost:3000/users/" + p.user_id);
        let userJson = await user.json();
        postUser.textContent = userJson.username;

        postDiv.append(postTitle);
        postDiv.append(postContent);
        postDiv.append(postUser);

        postDiv.classList.add("post");

        parent.append(postDiv);
    });

    if (userJson.isAdmin) {
        // Joke functionality for now. 
        // More just proof of concept for features appearing only for admins.
        let adminText = document.createElement("p");
        adminText.textContent = "You are an admin!";
        parent.append(adminText);
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
