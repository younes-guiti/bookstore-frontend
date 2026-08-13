export function isEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isRequired(value) {
  return value.trim() !== "";
}

export function minLength(value, length) {
  return value.length >= length;
}

export function isPhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}