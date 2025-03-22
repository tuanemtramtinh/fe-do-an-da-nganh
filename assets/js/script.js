const API_URL = "http://localhost:3000";

//Swiper
if (document.querySelector(".mySwiper")) {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
//End Swiper

const getUrlParams = (param, defaultValue = null) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || defaultValue;
};

const handleChapter1 = async (inputId) => {
  try {
    const stage1Response = await axios.post(
      `${API_URL}/calculate/chapter-1/stage-1`,
      {
        inputId,
      }
    );
    if (stage1Response.status === 200) {
      const suggestEngines = stage1Response.data.data.engines;
      const calculate = document.querySelector(".calculate");

      const calculateSuggest = document.createElement("div");
      calculateSuggest.classList.add("calculate-suggest");

      const suggestEnginesHTML = suggestEngines.map(
        (engine) =>
          `<div class="calculate-suggest__item swiper-slide" engine-id="${engine._id}">
            <div class="calculate-suggest__item-name">${engine.kieu_dong_co}</div>
            <div class="calculate-suggest__item-manufacturer">
                Nhà sản xuất: <span>HCMUT </span>
            </div>
            <div class="calculate-suggest__item-parameter">
              <div>
                <span>Công suất: </span>
                <span>${engine.cong_suat_kW}</span>
              </div>
              <div> 
                <span>Vận tốc vòng quay: </span>
                <span>${engine.van_toc_quay_vgph}</div>
            </div>
            <div class="calculate-suggest__item-image"><img src="https://placehold.co/350x180?font=roboto&amp;text=Engine" alt=""></div>
            <button class="calculate-suggest__item-save" engine-id="${engine._id}">Lưu</button>
          </div>`
      );

      const suggestEngineList = `
        <div class="calculate-suggest__list">
          <div class="calculate-suggest__list-title">Động cơ</div>
          <div class="calculate-suggest__list-wrapper swiper mySwiper">
            <div class="swiper-wrapper">
              ${suggestEnginesHTML.join("\n")}
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      `;

      calculateSuggest.innerHTML = `
       <div class="container">
          <div class="calculate-suggest__wrapper">
            <div class="calculate-suggest__title"><i class="fa-solid fa-circle-check"></i>
              <h2>Linh Kiện Phù Hợp</h2>
            </div>
            ${suggestEngineList}
          </div>
        </div>
      `;

      calculate.appendChild(calculateSuggest);
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      //Handle Save Button
      const saveButtons = document.querySelectorAll(
        ".calculate-suggest__item-save"
      );
      saveButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
          try {
            const engineId = e.target.getAttribute("engine-id");
            const response = await axios.post(
              `${API_URL}/calculate/chapter-1/stage-2`,
              {
                inputId,
                engineId,
              }
            );
            if (response.status === 200) {
              button.classList.add("active");
              const engine = response.data.data;
              const calculationResult = document.createElement("div");
              calculationResult.classList.add("calculate-result");

              const table = `
              <table> 
                <thead> 
                  <tr> 
                    <th>Thông số</th>
                    <th>Động cơ</th>
                    <th>Trục I</th>
                    <th colspan="2">Trục II</th>
                    <th colspan="2">Trục II</th>
                    <th>Trục III</th>
                  </tr>
                </thead>
                <tbody> 
                  <tr> 
                    <td>P(kw)</td>
                    <td>${engine.P_dc}</td>
                    <td>${engine.P_I}</td>
                    <td colspan="4">${engine.P_II}</td>
                    <td>${engine.P_III}</td>
                  </tr>
                  <tr>
                    <td>n (vg/phút)</td>
                    <td>${engine.n_dc}</td>
                    <td>${engine.n_I}</td>
                    <td colspan="4">${engine.n_II}</td>
                    <td>${engine.n_III}</td>
                  </tr>
                  <tr> 
                    <td>u </td>
                    <td>${engine.u_dc}</td>
                    <td colspan="3">${engine.u_I_II}</td>
                    <td colspan="3">${engine.u_II_III} </td>
                  </tr>
                  <tr> 
                    <td>T(N.mm)</td>
                    <td>${engine.T_dc}</td>
                    <td>${engine.T_I}</td>
                    <td colspan="4">${engine.T_II}</td>
                    <td>${engine.T_III}</td>
                  </tr>
                </tbody>
              </table>
              `;

              calculationResult.innerHTML = `
              <div class="container">
                <div class="calculate-result__wrapper">
                  <div class="calculate-result__title"><span>1</span>
                    <h3>Tính chọn động cơ điện</h3>
                  </div>
                  <div class="calculate-result__body">
                    ${table}
                  </div>
                </div>
              </div>
              `;

              calculate.append(calculationResult);
            }
          } catch (error) {
            console.log(error);
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleChapter2 = () => {};

const handleChapter3 = () => {};

const handleChapter = async (chapter, inputId) => {
  switch (chapter) {
    case "1":
      await handleChapter1(inputId);
      break;

    default:
      break;
  }
};

const main = async () => {
  //Authentication
  const loginForm = document.querySelector(".auth__form.login");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        const response = await axios.post(`${API_URL}/user/login`, {
          username,
          password,
        });
        // console.log(response);
        if (response.status === 200) {
          const token = response.data.data.accessToken;
          localStorage.setItem("token", token);
          alert("Đăng nhập thành công, bạn sẽ được chuyển hướng...");
          window.location.href = "/index.html";
        }
      } catch (error) {
        const data = error.response.data;
        console.log(data);
      }
    });
  }

  const registerForm = document.querySelector(".auth__form.register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        const firstName = e.target.firstname.value;
        const lastName = e.target.lastname.value;
        const fullname = `${lastName} ${firstName}`;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const response = await axios.post(`${API_URL}/user/register`, {
          fullname,
          username,
          password,
        });
        if (response.status === 200) {
          alert("Đăng ký thành công, bạn sẽ được chuyển hướng...");
          window.location.href = "/login.html";
        }
      } catch (error) {
        const data = error.response.data;
        console.log(data);
      }
    });
  }
  //End Authentication

  //Header
  const header = document.querySelector(".header");
  if (header) {
    const username = document.querySelector(".header__user a");
    const logout = document.querySelector(".header__user .logout");
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_URL}/user/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const user = response.data.data.username;
          username.innerHTML += user;
          username.href = "#";
          logout.classList.add("active");
          logout.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "/index.html";
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      username.innerHTML += "Đăng Nhập";
    }
  }
  //End Header

  //Take input
  const inputForm = document.querySelector(".section-3__form");
  if (inputForm) {
    inputForm.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();
        const data = {
          F: e.target.F.value,
          p: e.target.p.value,
          v: e.target.v.value,
          L: e.target.L.value,
          z: e.target.z.value,
          T1: e.target.T1.value,
          T2: e.target.T2.value,
          t1: e.target.t1.value,
          t2: e.target.t2.value,
        };
        console.log(data);
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Bạn cần đăng nhập để sử dụng tính năng này");
          window.location.href = "/login.html";
          return;
        }
        const response = await axios.post(`${API_URL}/calculate/input`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const inputId = response.data.data._id;
        window.location.href = `calculate.html?inputId=${inputId}`;
      } catch (error) {
        console.log(error);
      }
    });
  }
  //End Take input

  //Calculate
  const calculateProgressList = document.querySelector(
    ".calculate-progress__list"
  );
  if (calculateProgressList) {
    const calculateProgressItem = document.querySelectorAll(
      ".calculate-progress__item"
    );

    const inputId = getUrlParams("inputId");

    if (!inputId) {
      alert("Không tìm thấy dữ liệu");
      window.location.href = "/index.html";
    }

    calculateProgressItem.forEach((item) => {
      item.addEventListener("click", async (e) => {
        const currentChapter = item.getAttribute("chapter");
        item.classList.add("active");
        handleChapter(currentChapter, inputId);
      });
    });

    calculateProgressItem[0].click();
  }

  //End Calculate
};

main();
