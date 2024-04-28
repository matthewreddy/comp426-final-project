import {db} from "./db.mjs";

export class User {
    #id;
    #username;
    #password;
    #isAdmin;

    constructor(id, username, password) {
        this.#id = id;
        this.#username = username;
        this.#password = password;
        this.#isAdmin = false;  // initially should not make all users admin
    }

    static async create(data) {
        /* 
        Creates a new user
        On success, returns the user. Otherwise, returns null
        */
        try {
            let result = await db.run("INSERT INTO User VALUES (NULL, ?, ?, ?)", data.username, data.password, 0);
            return new User(result.lastID, data.username, data.password);
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    static async getAll() {
        /*
        Get array of all users in JSON
        On success, returns array of all users. Otherwise, returns empty array
        */
        try {
            let allUsers = await db.all("SELECT * FROM User");
            return allUsers.map(u => {
                let user = new User(u.id, u.username, u.password);
                if (u.isAdmin === 1) user.#makeAdmin();
                return user.json();
            });
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    static async findByID(id) {
        /*
        Find specific user by ID
        On success, returns the user. If user not found or error occurs, returns null
        */
        try {
            let result = await db.get("SELECT * FROM User WHERE id = ?", id);
            if (!result) return null;
            let user = new User(result.id, result.username, result.password);
            if (result.isAdmin === 1) user.#makeAdmin();
            return user;
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    static async findByUsername(username) {
        /*
        Find a specific user by username (since usernames are forced to be unique)
        On success, returns the user. If user not found or error occurs, returns null
        */
        try {
            let result = await db.get("SELECT * FROM User WHERE username = ?", username);
            if (!result) return null;
            let user = new User(result.id, result.username, result.password);
            if (result.isAdmin === 1) user.#makeAdmin();
            return user;
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    static async validate(username, password) {
        /*
        Validate a given password for a specific user
        If given password matches stored password for user, returns true. Otherwise, returns false
        */
        try {
            let result = await db.get("SELECT * FROM User WHERE username = ?", username);
            if (!result) return false;
            return password === result.password;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    async update(data) {
        /*
        Update a specific user
        On success, returns the updated user. Otherwise, returns null
        */
        try {
            let newUsername = data.username !== undefined ? data.username : this.#username;
            let newPassword = data.password !== undefined ? data.password : this.#password;
            let newAdmin = data.isAdmin !== undefined ? data.isAdmin : this.#isAdmin;
            await db.run("UPDATE User SET username = ?, password = ?, isAdmin = ? WHERE id = ?", newUsername, newPassword, newAdmin, this.#id);
            this.#username = newUsername;
            this.#password = newPassword;
            this.#isAdmin = newAdmin;
            let user = new User(this.#id, this.#username, this.#password, this.#isAdmin);
            return user;
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    static async deleteByID(id) {
        /*
        Delete a user by its ID
        On success, returns true. Otherwise, returns false
        */
        try {
            await db.run("DELETE FROM User WHERE id = ?", id);
            return true;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    json() {
        /* Returns JSON representation of the user */
        return {
            id: this.#id,
            username: this.#username,
            password: this.#password,
            isAdmin: this.#isAdmin
        };
    }

    #makeAdmin() {
        this.#isAdmin = true;
    }
}