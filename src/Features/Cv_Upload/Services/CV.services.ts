class CV_API {
  static async UploadFile(user_id: string, file: File) {
    const formData = new FormData();

    formData.append("user_id", user_id);
    formData.append("cv", file);

    const response = await fetch("http://localhost:3000/api/v1/cv/upload", {
      method: "POST",
      body: formData,
    });

    const data = response.json();
    return data;
  }
}

export default CV_API;
