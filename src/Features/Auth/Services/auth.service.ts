class AuthApi {
  static async Login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("data is required");
    }

    const response = await fetch("https://skillsensebeproduction.up.railway.app/api/v1/auth/login", {
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

    return data;
  }

  static async Register(user_name: string, email: string, password: string, avatar?: File) {
    if (!email || !password || !user_name) {
      throw new Error("data is required");
    }

    const formData = new FormData();
    formData.append("user_name", user_name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    const response = await fetch("https://skillsensebeproduction.up.railway.app/api/v1/auth/register", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  }

  static async GoogleLogin(email: string, user_name: string, avatar: string) {
    if (!email || !user_name) {
      throw new Error("data is required");
    }

    const response = await fetch("https://skillsensebeproduction.up.railway.app/api/v1/auth/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        user_name,
        avatar,
      }),
    });

    const data = await response.json();

    if (data.statusbar === "success") {
      await localStorage.setItem("user", JSON.stringify(data));
    }

    return data;
  }

  static async UpdateUser(user_id: string, user_name: string, avatar?: string | File) {
    if (!user_id || !user_name) {
      throw new Error("user_id and user_name are required");
    }

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("user_name", user_name);
    
    if (avatar instanceof File) {
      formData.append("avatar", avatar);
    } else if (typeof avatar === "string") {
      formData.append("avatar", avatar);
    }

    const response = await fetch("https://skillsensebeproduction.up.railway.app/api/v1/auth/update", {
      method: "PUT",
      body: formData,
    });

    const data = await response.json();

    if (data.statusbar === "success") {
      // Update local storage to reflect changes
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (currentUser.data) {
        currentUser.data = { ...currentUser.data, ...data.data };
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    }

    return data;
  }
}

export default AuthApi;
