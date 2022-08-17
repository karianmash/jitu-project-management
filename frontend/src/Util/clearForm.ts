export function clearForm(
  first_name: HTMLInputElement,
  last_name: HTMLInputElement,
  email: HTMLInputElement,
  password: HTMLInputElement
): void {
  first_name.value = "";
  last_name.value = "";
  email.value = "";
  password.value = "";
}
