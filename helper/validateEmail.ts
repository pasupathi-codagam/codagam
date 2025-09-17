"use server";
function validateEmail(email: string) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
  return regex.test(email);
}

export default validateEmail;