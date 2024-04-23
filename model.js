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
}