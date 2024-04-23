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
}