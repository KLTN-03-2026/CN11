export const validatePassword = (password: string) => password.length >= 6;
export const validatePhone = (phone: string) =>
  phone.length <= 10 && phone.length > 0;
export const validateName = (value: string) =>
  value.length <= 50 && value.length >= 2;
export const validateMessage = (value: string) => value.length >= 2;
export const validateEmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
