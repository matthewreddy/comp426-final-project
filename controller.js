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

    editPostRequest() {
        return this.#model.editPostRequest();
    }

    async editPost(title, content, userID, postID) {
        return await this.#model.editPost(title, content, userID, postID);
    }

    async deletePost(id) {
        return await this.#model.deletePost(id);
    }

    async generatePost(keywords) {
        return await this.#model.generatePost(keywords);
    }

    createPostRequest() {
        return this.#model.createPostRequest();
    }

    async createPost(title, content, userID) {
        return await this.#model.createPost(title, content, userID);
    }

    async createUser(username, password) {
        return await this.#model.createUser(username, password);
    }

    async logout() {
        return await this.#model.logout();
    }
}