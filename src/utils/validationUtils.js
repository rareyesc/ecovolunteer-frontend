export function validateName(name) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return regex.test(name);
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  return regex.test(password);
}

export function validateCedula(cedula) {
  return /^\d+$/.test(cedula);
}

export function validatePhoneNumber(phoneNumber) {
  return /^\d{7,10}$/.test(phoneNumber);
}