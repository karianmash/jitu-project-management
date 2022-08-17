import {
  loginContainer,
  modal,
  registerContainer,
} from "../Constants/htmlElements.js";
import { Events } from "./eventHandler.js";

let event = new Events();

export class renderToDom {
  constructor() {}

  // Display register form
  public showRegisterForm(): void {
    let form: string = `
        <form action="">
            <h3>Let's go!</h3>
            <!-- First Name -->
            <div class="first-name">
              <label for="">First Name</label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="eg, John"
                required
              />
            </div>

            <!-- Last Name -->
            <div class="last-name">
              <label for="">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="eg, Doe"
                required
              />
            </div>

            <!--  Email -->
            <div class="email">
              <label for="">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="eg, example@gmail.com"
                required
              />
            </div>

            <!--  Password -->
            <div class="password">
              <label for="">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password here..."
                required
              />
            </div>

            <!--  Submit -->
            <div class="submit">
              <input
                type="submit"
                id="submit"
                name="submit"
                value="Play with Mash"
              />
            </div>
            <!--  <p>Already Registered? <a href="#">Log in</a></p>  -->
          </form>
        `;

    registerContainer.innerHTML = form;
    registerContainer.style.display = "block";

    modal.style.display = "flex";

    let registerBtn = document.querySelector("#submit");

    registerBtn?.addEventListener("click", event.registerUser);
  }

  // Display login form
  public showLoginForm(): void {
    let form = `
          <form action="/">
            <h3>Welcome back!</h3>
            <!--  Email -->
            <div class="email">
              <label for="">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="eg, example@gmail.com"
                required
              />
            </div>
            <!--  Password -->
            <div class="password">
              <label for="">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password here..."
                required
              />
            </div>

            <!--  Submit -->
            <div class="submit">
              <input type="submit" id="submit" name="submit" value="Log In" />
            </div>

            <!--  <p>Don't have an account? <span id="sign-up1">Sign up</span></p>  -->
          </form>
        `;

    loginContainer.innerHTML = form;
    loginContainer.style.display = "block";

    modal.style.display = "flex";

    let loginBtn = document.querySelector("#submit");

    loginBtn?.addEventListener("click", event.loginUser);
  }

}
