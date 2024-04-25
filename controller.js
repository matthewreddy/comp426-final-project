export class Controller {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async doesUserExist(username) {
        return await this.#model.doesUserExist(username);
    }

    async validate(username, password) {
        return await this.#model.validate(username, password);
    }

    async getAllPosts() {
        return await this.#model.getAllPosts();
    }

    async getUserByID(id) {
        return await this.#model.getUserByID(id);
    }

    async deletePost(id) {
        return await this.#model.deletePost(id);
    }

    createPostRequest() {
        return this.#model.createPostRequest();
    }

    async createPost(title, content, userID) {
        return await this.#model.createPost(title, content, userID);
    }
}