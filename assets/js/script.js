const API_URL = "http://localhost:3000";

//Authentication
const loginForm = document.querySelector(".auth__form.login");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();

      const username = e.target.username.value;
      const password = e.target.password.value;

      const response = await axios.post(`${API_URL}/user/login`);
    } catch (error) {
      const data = error.response.data;
    }
  });
}

const registerForm = document.querySelector(".auth__form.register");

if (registerForm) {
}
//End Authentication
