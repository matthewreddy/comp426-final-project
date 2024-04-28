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

    async promoteUser(id, username, password, admin) {
        return await this.#model.promoteUser(id, username, password, admin);
    }

    async demoteUser(id, username, password, admin) {
        return await this.#model.demoteUser(id, username, password, admin);
    }

    async deleteUser(id) {
        return await this.#model.deleteUser(id);
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

    async back() {
        return await this.#model.back();
    }
}