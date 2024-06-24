const API_URL = "https://desafiobackend33-1.onrender.com"
//const LOGIN_URL = "https://desafio-backend-olsr.onrender.com";
   

export const login = async ({ email, password }) => {
    const response = await fetch(`${LOGIN_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    return data.data.token; // Suponiendo que el token está en data.token
  }