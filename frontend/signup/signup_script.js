import {Model} from "../model.js";
import {Controller} from "../controller.js";
import {SignupView} from "./signup_view.js";

let model = new Model();
let controller = new Controller(model);
let view = new SignupView(model, controller);

view.render(document.getElementById("main"));