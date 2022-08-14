import { loginContainer, modal, registerContainer } from "../Constants/htmlElements.js";

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
}