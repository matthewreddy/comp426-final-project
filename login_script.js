import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {LoginView} from "./login_view.js";

let model = new Model();
let controller = new Controller(model);
let view = new LoginView(model, controller);

view.render(document.getElementById("main"));