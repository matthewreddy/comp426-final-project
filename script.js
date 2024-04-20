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
    // Joke functionality, just ensuring this works
    // Ideally, should be able to call on the app and verify the username and password
    loginResult.textContent = `Logged in as username "${username.value}"`;
});

parent.append(header);
parent.append(usernamePasswordPrompt);
parent.append(username);
parent.append(document.createElement("br"));
parent.append(password);
parent.append(document.createElement("br"));
parent.append(loginBtn);
parent.append(loginResult);
