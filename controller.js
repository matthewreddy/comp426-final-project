import {Model} from "./model.js";

export class Controller {
    #model;

    constructor(model) {
        this.#model = model;
    }

    #doAsync() {
        return new Promise(r => setTimeout(r, 0));
    }

    async doesUserExist(username) {
        return await this.#model.doesUserExist(username);
    }

    async validate(username, password) {
        return await this.#model.validate(username, password);
    }
}