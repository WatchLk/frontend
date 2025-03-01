const baseUrl = "https://localhost:7002";

export const signIn = async (loginData) => {
  try {
    const res = await fetch(`${baseUrl}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    if (!data.succeeded) {
      const error = data.errors[0];
      throw new Error(error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const signUp = async (signupData) => {
  try {
    const res = await fetch(`${baseUrl}/api/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const data = await res.json();
    if (!data.succeeded) {
      const error = data.errors[0];
      throw new Error(error);
    }
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const signInWithGoogle = async (token) => {
  try {
    const res = await fetch(`${baseUrl}/api/Auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    const data = await res.json();
    if (!data.succeeded) {
      throw new Error(data.errors[0]);
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "An unknown error occurred");
  }
};
