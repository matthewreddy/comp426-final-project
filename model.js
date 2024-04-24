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

    async deletePost(id) {
        await fetch("http://localhost:3000/posts/" + id, {method: "DELETE"});
    }
}