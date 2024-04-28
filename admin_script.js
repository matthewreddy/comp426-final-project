import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {AdminView} from "./admin_view.js";

let model = new Model();
let controller = new Controller(model);
let view = new AdminView(model, controller);

view.render(document.getElementById("main"));