class AuthApi {
  static async Login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("data is required");
    }

    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    await localStorage.setItem("user", JSON.stringify(data));
  }

  static async Register(user_name: string, email: string, password: string) {
    if (!email || !password || !user_name) {
      throw new Error("data is required");
    }

    const response = await fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name,
        email,
        password,
        avatar: "aksdkjasj",
      }),
    });

    const data = await response.json();

    return data;
  }
}

export default AuthApi;
