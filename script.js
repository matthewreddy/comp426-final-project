import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {View} from "./view.js";

let model = new Model();
let controller = new Controller(model);
let view = new View(model, controller);

view.render(document.getElementById("main"));