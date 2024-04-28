import {apiKey} from "./api_key.js";
const url = "https://api.textcortex.com/v1/texts/social-media-posts";

export class Model extends EventTarget {

    constructor() {
        super();
    }

    async doesUserExist(username) {
        // see if user exists
        try {
            let user = await fetch("http://localhost:3000/users/" + username);
            await user.json();
            return true;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    async validate(username, password) {
        // validate user password
        let validated = await fetch(`http://localhost:3000/users/${username}/${password}`);
        let validatedJson = await validated.json();
        if (validatedJson) {
            let user = await fetch("http://localhost:3000/users/" + username);
            let userJson = await user.json();
            this.dispatchEvent(new CustomEvent("login", {detail: userJson}));
            if (userJson.isAdmin) {
                this.dispatchEvent(new CustomEvent("adminlogin", {detail: userJson}));
            }
            return true;
        }
        return false;
    }

    async getAllPosts() {
        try {
            let allPosts = await fetch("http://localhost:3000/posts");
            return await allPosts.json();
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    async getUserByID(id) {
        try {
            let user = await fetch("http://localhost:3000/users/" + id);
            return await user.json();
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    async getAllUsers(){
        try{
            let allUsers = await fetch("http://localhost:3000/users/");
            return await allUsers.json();
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    async promoteUser(id, username, password, admin){
        let userStr = JSON.stringify({
            id: id,
            username: username,
            password: password,
            isAdmin: admin
        });
        let user = await fetch("http://localhost:3000/users/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: userStr
        });
        await user.json();
        this.dispatchEvent(new Event("refresh"));
    }

    async demoteUser(id, username, password, admin){
        let userStr = JSON.stringify({
            id: id,
            username: username,
            password: password,
            isAdmin: admin
        });
        let user = await fetch("http://localhost:3000/users/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: userStr
        });
        await user.json();
        this.dispatchEvent(new Event("refresh"));
    }

    async deleteUser(id){
        await fetch("http://localhost:3000/users/" + id, {method: "DELETE"});
        this.dispatchEvent(new Event("refresh"));
    }

    editPostRequest(){
        this.dispatchEvent(new Event("editpost"));
    }

    async editPost(title, content, userID, postID) {
        let postStr = JSON.stringify({
            title: title,
            content: content,
            user_id: userID
        });
        let post = await fetch("http://localhost:3000/posts/" + postID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: postStr
        });
        await post.json();
        this.dispatchEvent(new Event("refresh"));
    }

    async deletePost(id) {
        await fetch("http://localhost:3000/posts/" + id, {method: "DELETE"});
        this.dispatchEvent(new Event("refresh"));
    }

    async generatePost(keywords) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + apiKey
            },
            body: `{
                "context":"story",
                "keywords":[${keywords.split(",").map(w => `"${w}"`)}],
                "mode":"twitter"
            }`
        };

        let response = await fetch(url, options);
        let story_data = await response.json();

        this.dispatchEvent(new CustomEvent("generatepost", {detail: story_data.data.outputs[0].text}));
    }

    createPostRequest() {
        this.dispatchEvent(new Event("createpost"));
    }

    async createPost(title, content, userID) {
        let postStr = JSON.stringify({
            title: title,
            content: content,
            user_id: userID
        });
        let post = await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: postStr
        });
        await post.json();
        this.dispatchEvent(new Event("refresh"));
    }

    async createUser(username, password) {
        let userExists = await this.doesUserExist(username);
        if (userExists === false) {
            let userStr = JSON.stringify({
                username: username,
                password: password
            });
            let user = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userStr
            });
            let userJson = await user.json();
            this.dispatchEvent(new CustomEvent("createusersuccess", {detail: userJson}));
        } else {
            this.dispatchEvent(new Event("createuserfail"));
        }
    }

    async logout() {
        this.dispatchEvent(new CustomEvent("logout"));
    }

    async back() {
        this.dispatchEvent(new CustomEvent("back"));
    }
}