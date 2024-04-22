import {db} from "./db.mjs";

export class Post {
    #id;
    #title;
    #content;
    #user_id;

    constructor(id, title, content, user_id) {
        this.#id = id;
        this.#title = title;
        this.#content = content;
        this.#user_id = user_id;
    }

    static async create(data) {
        /*
        Creates a new post
        On success, returns the post. Otherwise, returns null
        */
        try {
            let result = await db.run("INSERT INTO Post VALUES (NULL, ?, ?, ?)", data.title, data.content, data.user_id);
            return new Post(result.lastID, data.title, data.content, data.user_id);
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    static async getAll() {
        /*
        Get array of all posts in JSON
        On success, returns array of all posts. Otherwise, returns empty array
        */
        try {
            let allPosts = await db.all("SELECT * FROM Post");
            return allPosts.map(p => {
                let post = new Post(p.id, p.title, p.content, p.user_id);
                return post.json();
            });
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    static async findByID(id) {
        /* 
        Find specific post by ID
        On success, returns the post. If post not found or error occurs, returns null
        */
        try {
            let result = await db.get("SELECT * FROM Post WHERE id = ?", id);
            if (!result) return null;
            return new Post(result.id, result.title, result.content, result.user_id);
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    async update(data) {
        /*
        Update a specific post
        On success, returns the updated post. Otherwise, returns null
        */
        try {
            let newTitle = data.title !== undefined ? data.title : this.#title;
            let newContent = data.content !== undefined ? data.content : this.#content;
            await db.run("UPDATE Post SET title = ?, content = ? WHERE id = ?", newTitle, newContent, this.#id);
            this.#title = newTitle;
            this.#content = newContent;
            return new Post(this.#id, this.#title, this.#content, this.#user_id);
        } catch (e) {
            console.error(e);
        }
        return null;
    }

    static async deleteByID(id) {
        /*
        Delete a post by its ID
        On success, returns true. Otherwise, returns false
        */
        try {
            await db.run("DELETE FROM Post WHERE id = ?", id);
            return true;
        } catch (e) {
            console.error(e);
        }
        return false;
    }

    json() {
        /* Returns JSON representation of the post */
        return {
            id: this.#id,
            title: this.#title,
            content: this.#content,
            user_id: this.#user_id
        };
    }
    
}