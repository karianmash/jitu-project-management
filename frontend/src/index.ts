import { Events } from "./Classes/eventHandler.js";
import { renderToDom } from "./Classes/renderDom.js";
import { loginBtn, signUpBtn } from "./Constants/htmlElements.js";

let render = new renderToDom();
let event = new Events();

signUpBtn.addEventListener("click", render.showRegisterForm);
loginBtn.addEventListener("click", render.showLoginForm);

window.onclick = event.closeModal;