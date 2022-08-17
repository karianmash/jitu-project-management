import {
  loginContainer,
  modal,
  registerContainer,
} from "../Constants/htmlElements.js";
import { clearForm } from "../Util/clearForm.js";

export class Events {
  constructor() {}

  // Close modal
  closeModal(event: Event): void {
    if (event.target == modal) {
      modal.style.display = "none";

      loginContainer.style.display = "none";
      registerContainer.style.display = "none";
    }
  }

  // Close modal with button event
  closeModalBtn(): string {
    return (modal.style.display = "none");
  }

  // Validate form and register user
  registerUser(e: Event) {
    e.preventDefault();

    // Form elements
    let first_name = document.querySelector("#first-name") as HTMLInputElement;
    let last_name = document.querySelector("#last-name") as HTMLInputElement;
    let email = document.querySelector("#email") as HTMLInputElement;
    let password = document.querySelector("#password") as HTMLInputElement;

    let user = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    };

    if (user) {
      clearForm(first_name, last_name, email, password);

      setTimeout(() => location.reload(), 100);

      fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // SignIn user
  // Validate form and register user
  loginUser(e: Event) {
    e.preventDefault();

    // Form elements
    let email = document.querySelector("#email") as HTMLInputElement;
    let password = document.querySelector("#password") as HTMLInputElement;

    let user = {
      email: email.value,
      password: password.value,
    };

    if (user) {
      email.value = "";
      password.value = "";

      fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          if (data.message === "Auth failed!") {
            return;
          }

          let user = {
            token: data.token,
            user: data.user,
          };

          // Store user info into localStorage
          let user_payload =
            JSON.parse(localStorage.getItem("user_payload") as string) || [];

          if (user_payload) {
            localStorage.removeItem("user_payload");
          }

          localStorage.setItem("user_payload", JSON.stringify(user));

          // Redirect user
          if (data.user.user_role === "admin") {
            location.replace(
              "http://127.0.0.1:5500/frontend/public/admin-dashboard.html"
            );
          } else if (data.user.user_role === "user") {
            location.replace(
              "http://127.0.0.1:5500/frontend/public/user-dashboard.html"
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  // // Fetch user
  // getAllusers() {
  //   if (
  //     window.location.href ===
  //     "http://127.0.0.1:5500/frontend/public/add-project.html"
  //   ) {
  //     alert("Loaded...");
  //   }
  // }
}
