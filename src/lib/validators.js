export const validateName = (name, index) => {
  if (name === "") {
    return index === 1 ? "Frist name is required!" : "Last name is required!";
  }
  return null;
};

export const validateEmail = (email) => {
    if (email === "") {
      return "Email is required!";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email is not valid!";
    }
    return null;
  };

export const validatePassword = (password) => {
  if (password === "") {
    return "Password is required!";
  }
  if (password.length < 8) {
    return "Password must be at least length of 8!";
  }
  return null;
};
