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

    async getAllUsers() {
        return await this.#model.getAllUsers();
    }

    async editUser(id, username, password, admin) {
        return await this.#model.editUser(id, username, password, admin);
    }

    async deleteUser(id) {
        return await this.#model.deleteUser(id);
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

    async createPost(title, content, userID) {
        return await this.#model.createPost(title, content, userID);
    }

    async createUser(username, password) {
        return await this.#model.createUser(username, password);
    }

}