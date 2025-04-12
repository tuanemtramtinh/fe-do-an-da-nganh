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
    const displayChapter1CalculateProcess = async (inputId) => {
      const stage1Response = await axios.post(
        `${API_URL}/calculate/chapter-1/stage-1`,
        {
          inputId,
        }
      );
      if (stage1Response.status === 200) {
        const suggestEngines = stage1Response.data.data.engines;
        const calculate = document.querySelector(".calculate");
        calculate.innerHTML = "";
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

                const calculateExportButton = document.createElement("div");
                calculateExportButton.classList.add(".calculate__export");
                calculateExportButton.innerHTML = `
                <div class="container"><a href="${API_URL}/export/chapter-1/${inputId}" class="calculate__export-button">Xuất Báo Cáo</a></div>
                `;
                calculate.append(calculateExportButton);
              }
            } catch (error) {
              console.log(error);
            }
          });
        });
      }
    };

    const displayChapter1Result = async (inputId, chapter1Result) => {
      const calculate = document.querySelector(".calculate");
      calculate.innerHTML = "";
      const calculateSuggest = document.createElement("div");
      calculateSuggest.classList.add("calculate-suggest");

      const engine = chapter1Result.engineId;

      calculateSuggest.innerHTML = `
      <div class="container">
          <div class="calculate-suggest__wrapper">
            <div class="calculate-suggest__title"><i class="fa-solid fa-circle-check"></i>
              <h2>Linh Kiện Phù Hợp</h2>
            </div>
            <div class="product-detail__wrapper">
              <div class="product-detail__image"><img src="/assets/images/engine.png" alt="">
              </div>
              <div class="product-detail__content">
                <div class="product-detail__title">${engine.kieu_dong_co}</div>
                <div class="product-detail__manufacturer">Nhà sản xuất</div>
                <div class="product-detail__suggest">
                    <i class="fa-solid fa-lightbulb"></i> <span>10 lượt gợi ý</span></div>
                <div class="product-detail__desc">
                  <div class="product-detail__detail"><span>Mã linh kiện: ${engine.kieu_dong_co}</div>
                  <div class="product-detail__detail"><span>Chỉnh sửa lần cuối:</span><span>XXXXXXX</span></div>
                </div>
                <div class="product-detail__param">
                  <div class="product-detail__param-title">Thông Số</div>
                  <div class="product-detail__parm-list"> 
                    <div class="product-detail__param-item">Công suất: ${engine.cong_suat_kW} kW</div>
                    <div class="product-detail__param-item">Vận tốc vòng quay: ${engine.van_toc_quay_vgph} vòng/phút</div>
                    <div class="product-detail__param-item">T<sub>K</sub> / T<sub>dn</sub>: ${engine.ti_so_momen}</div>
                    <div class="product-detail__param-item">Khối lượng: ${engine.khoi_luong_kg} kg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

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
                      <td>${chapter1Result.P_dc}</td>
                      <td>${chapter1Result.P_I}</td>
                      <td colspan="4">${chapter1Result.P_II}</td>
                      <td>${chapter1Result.P_III}</td>
                    </tr>
                    <tr>
                      <td>n (vg/phút)</td>
                      <td>${chapter1Result.n_dc}</td>
                      <td>${chapter1Result.n_I}</td>
                      <td colspan="4">${chapter1Result.n_II}</td>
                      <td>${chapter1Result.n_III}</td>
                    </tr>
                    <tr> 
                      <td>u </td>
                      <td>${chapter1Result.u_dc}</td>
                      <td colspan="3">${chapter1Result.u_I_II}</td>
                      <td colspan="3">${chapter1Result.u_II_III} </td>
                    </tr>
                    <tr> 
                      <td>T(N.mm)</td>
                      <td>${chapter1Result.T_dc}</td>
                      <td>${chapter1Result.T_I}</td>
                      <td colspan="4">${chapter1Result.T_II}</td>
                      <td>${chapter1Result.T_III}</td>
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

      const calculateExportButton = document.createElement("div");
      calculateExportButton.classList.add(".calculate__export");
      calculateExportButton.innerHTML = `
      <div class="container"><a href="${API_URL}/export/chapter-1/${inputId}" class="calculate__export-button">Xuất Báo Cáo</a></div>
      `;

      calculate.append(calculateSuggest);
      calculate.append(calculationResult);
      calculate.append(calculateExportButton);
    };

    const getChapter1Result = await axios.get(
      `${API_URL}/calculate/chapter-1?inputId=${inputId}`,
      { headers: { "Cache-Control": "no-cache", Pragma: "no-cache" } }
    );
    const getChapter1Data = getChapter1Result.data.data;
    if (getChapter1Data.status === "initial") {
      await displayChapter1CalculateProcess(inputId);
    } else {
      await displayChapter1Result(inputId, getChapter1Data);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleChapter2 = async (inputId) => {
  try {
    const displayBeltParamaters = (beltParameters) => {
      return `
      <div class="calculate-result__element">
        <h2>Bảng thông số của bộ truyền đai thang</h2>
        <table style="table-layout: fixed;">
          <thead> 
            <tr> 
              <th>Thông số</th>
              <th>Trị số</th>
            </tr>
          </thead>
          <tbody> 
            <tr> 
              <td> <span>Đường kính bánh đai nhỏ: d</span><sub>1 </sub><span>(mm)</span></td>
              <td>${beltParameters.d1}</td>
            </tr>
            <tr>
              <td> <span>Đường kính bánh đai nhỏ: d</span><sub>2 </sub><span>(mm)</span></td>
              <td>${beltParameters.d2}</td>
            </tr>
            <tr> 
              <td>Khoảng cách trục: a (mm)</td>
              <td>${beltParameters.a}</td>
            </tr>
            <tr> 
              <td>Chiều dài đai: L (mm)</td>
              <td>${beltParameters.L}</td>
            </tr>
            <tr> 
              <td>Góc ôm đai: (độ)</td>
              <td>${beltParameters.goc_om_dai}</td>
            </tr>
            <tr> 
              <td>Số đai: z</td>
              <td>${beltParameters.z}</td>
            </tr>
            <tr> 
              <td>Chiều rộng đai: B (mm)</td>
              <td>${beltParameters.B}</td>
            </tr>
            <tr> 
              <td><span>Lực căng ban đầu: F</span><sub>0 </sub><span>(N)</span></td>
              <td>${beltParameters.F0}</td>
            </tr>
            <tr> 
              <td><span>Lực căng ban đầu: F</span><sub>r</sub><span>(N)</span></td>
              <td>${beltParameters.Fr}</td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
    };

    const displayGearSpecification = (gearSpecification) => {
      return `
      <div class="calculate-result__element">
        <h2>Bảng thông số bánh răng</h2>
        <table>
          <thead> 
            <tr> 
              <th>Các thông số</th>
              <th>Bánh răng 1</th>
              <th>Bánh răng 2</th>
            </tr>
          </thead>
          <tbody> 
            <tr> 
              <td>Đường kính vòng chia</td>
              <td>d <sub>1</sub> = ${gearSpecification.d1} (mm)</td>
              <td>d <sub>2</sub> = ${gearSpecification.d2} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính vòng đỉnh</td>
              <td>d <sub>a1</sub> = ${gearSpecification.da1} (mm)</td>
              <td>d <sub>a2</sub> = ${gearSpecification.da2} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính vòng lăn</td>
              <td>d <sub>w1</sub> = ${gearSpecification.dw1} (mm)</td>
              <td>d <sub>w2</sub> = ${gearSpecification.dw2} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính vòng chân</td>
              <td>d <sub>f1</sub> = ${gearSpecification.df1} (mm)</td>
              <td>d <sub>f2</sub> = ${gearSpecification.df2} (mm)</td>
            </tr>
            <tr> 
              <td>Khoảng cách trục</td>
              <td colspan="2">a<sub>&omega;</sub> = a = ${gearSpecification.awx} (mm)</td>
            </tr>
            <tr> 
              <td>Chiều rộng vành răng</td>
              <td colspan="2">b<sub>&omega;</sub> = ${gearSpecification.bw} (mm)</td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
    };

    const displaySizeOfTranmission = (sizeOfTransmission) => {
      return `
      <div class="calculate-result__element">
        <h2>Xác định kích thước chính của bộ truyền</h2>
        <table style="table-layout: fixed;">
          <thead> 
            <tr> 
              <th>Thông số hình học</th>
              <th>Công thức</th>
            </tr>
          </thead>
          <tbody> 
            <tr> 
              <td colspan="2" style="text-align:center; font-weight:700;">Trục Vít</td>
            </tr>
            <tr>
              <td> <span>Đường kính vòng chia</span></td>
              <td>d<sub>1</sub> = ${sizeOfTransmission.truc_vit.d1} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính vòng đỉnh</td>
              <td>d<sub>a1</sub> = ${sizeOfTransmission.truc_vit.da1} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính vòng đáy</td>
              <td>d<sub>f1</sub> = ${sizeOfTransmission.truc_vit.df1} (mm)</td>
            </tr>
            <tr> 
              <td>Góc xoắn ốc vít</td>
              <td>&gamma; = ${sizeOfTransmission.truc_vit.y}&deg;</td>
            </tr>
            <tr> 
              <td>Chiều dài phần cắt ren trục vít</td>
              <td>
                  b<sub>1</sub> = ${sizeOfTransmission.truc_vit.b1} (mm)</td>
            </tr>
            <tr> 
              <td colspan="2" style="text-align:center; font-weight:700;">Bánh Vít</td>
              <tr></tr>
              <td> <span>Đường kính vòng chia</span></td>
              <td>d<sub>2</sub> = ${sizeOfTransmission.banh_vit.d2} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính vòng đỉnh</td>
              <td>d<sub>a2</sub> = ${sizeOfTransmission.banh_vit.da2} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính vòng đáy</td>
              <td>d<sub>f2</sub> = ${sizeOfTransmission.banh_vit.df2} (mm)</td>
            </tr>
            <tr> 
              <td>Khoảng cách trục</td>
              <td>a<sub>&omega;</sub> =  ${sizeOfTransmission.banh_vit.aw} (mm)</td>
            </tr>
            <tr> 
              <td>Đường kính lớn nhất của bánh vít</td>
              <td>d<sub>aM2</sub> = ${sizeOfTransmission.banh_vit.daM2} (mm)</td>
            </tr>
            <tr> 
              <td>Chiều rộng của bánh vít</td>
              <td>b<sub>2</sub> = ${sizeOfTransmission.banh_vit.b2} (mm)</td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
    };

    const calculate = document.querySelector(".calculate");
    calculate.innerHTML = "";

    const chapter2Result = await axios.get(
      `${API_URL}/calculate/chapter-2?inputId=${inputId}`
    );

    const data = chapter2Result.data.data;
    calculate.innerHTML = `
    <div class="calculate-result">
      <div class="container">
        <div class="calculate-result__wrapper">
          <div class="calculate-result__title"><span>2</span>
            <h3>Tính toán thiết kế các bộ truyền</h3>
          </div>
          <div class="calculate-result__body">
            ${displayBeltParamaters(data.beltParamaters)}
            ${displaySizeOfTranmission(data.sizeOfTranmission)}
            ${displayGearSpecification(data.gearSpecification)}
          </div>
        </div>
      </div>
    </div>
    `;

    const calculateExportButton = document.createElement("div");
    calculateExportButton.classList.add(".calculate__export");
    calculateExportButton.innerHTML = `
      <div class="container"><a href="${API_URL}/export/chapter-2/${inputId}" class="calculate__export-button">Xuất Báo Cáo</a></div>
      `;

    calculate.append(calculateExportButton);
  } catch (error) {
    console.log(error);
  }
};

const handleChapter3 = () => {};

const handleChapter = async (chapter, inputId) => {
  switch (chapter) {
    case "1":
      await handleChapter1(inputId);
      break;
    case "2":
      await handleChapter2(inputId);
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
          const code = error.response.data.code;
          if (code && code === "expired_access_token") {
            // if (window.location.pathname !== "/login.html") {
            //   alert("Vui lòng đăng nhập lại");
            //   window.location.href = "/login.html";
            // }
            username.innerHTML += "Đăng Nhập";
          }
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
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Bạn cần đăng nhập để sử dụng tính năng này");
          window.location.href = "/login.html";
          return;
        }

        for (const [key, value] of Object.entries(data)) {
          const number = parseFloat(value);
          if (isNaN(number) || number < 0) {
            alert(
              `Đầu vào không hợp lệ với trường "${key}". Vui lòng nhập lại.`
            );
            e.target.reset();
            return;
          }
        }

        const response = await axios.post(`${API_URL}/calculate/input`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const inputId = response.data.data._id;
        window.location.href = `calculate.html?inputId=${inputId}`;
      } catch (error) {
        const code = error.response.data.code;
        if (code && code === "expired_access_token") {
          if (window.location.pathname !== "/login.html") {
            alert("Vui lòng đăng nhập lại");
            window.location.href = "/login.html";
          }
        }
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

    calculateProgressItem.forEach((item, index) => {
      item.addEventListener("click", async (e) => {
        calculateProgressItem.forEach((el) => el.classList.remove("active"));
        const currentChapter = item.getAttribute("chapter");
        item.classList.add("active");
        await handleChapter(currentChapter, inputId);
      });
    });

    calculateProgressItem[0].click();
  }

  const calculateInput = document.querySelector(".calculate-input");
  if (calculateInput) {
    const form = calculateInput.querySelector(".section-3__form-wrapper");
    const F = form.F;
    const p = form.p;
    const v = form.v;
    const L = form.L;
    const z = form.z;
    const T1 = form.T1;
    const T2 = form.T2;
    const t1 = form.t1;
    const t2 = form.t2;

    const inputId = getUrlParams("inputId");
    const response = await axios.get(
      `${API_URL}/calculate/input?inputId=${inputId}`
    );
    const input = response.data.data;
    console.log(input);
    F.value = input.F;
    p.value = input.p;
    v.value = input.v;
    L.value = input.L;
    z.value = input.z;
    T1.value = input.T1;
    T2.value = input.T2;
    t1.value = input.t1;
    t2.value = input.t2;
  }
  //End Calculate

  //History
  const historyList = document.querySelector(".history__list");
  if (historyList) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${API_URL}/user/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data.data;
          const historyItem = data.map(
            (item) => `
          <div class="history__item">
            <div class="history__item-date">${item.createdAt}</div>
            <div class="history__item-status success">Hoàn Thành</div><a class="history__item-detail" href="/calculate.html?inputId=${item.id}">Xem Chi Tiết</a>
          </div>
          `
          );
          historyList.innerHTML = historyItem.join("\n");
        }
      }
    } catch (error) {
      const code = error.response.data.code;
      if (code && code === "expired_access_token") {
        if (window.location.pathname !== "/login.html") {
          alert("Vui lòng đăng nhập lại");
          window.location.href = "/login.html";
        }
      }
    }
  }
  //End History

  //Product List
  const productList = document.querySelector(".product__list");
  if (productList) {
    try {
      const page = getUrlParams("page") ? parseInt(getUrlParams("page")) : 1;
      const response = await axios.get(`${API_URL}/engine?page=${page}`);
      const products = response.data.data.engines;
      const productsHtml = products.map(
        (product) => `
        <div class="product__item">
          <div class="product__item-image"><img src="/assets/images/engine.png" alt=""></div>
          <div class="product__item-desc"> 
            <div class="product__item-title">${product.kieu_dong_co}</div>
            <div class="product__item-content">Mô tả về động cơ ${product.kieu_dong_co}</div>
          </div><a class="product__item-detail" href="/product-detail.html?engineCode=${product.kieu_dong_co}">Xem Chi Tiết</a>
        </div>
        `
      );

      productList.innerHTML = `${productsHtml.join("\n")}`;

      //Pagination
      const productPagination = document.querySelector(".product__pagination");
      if (productPagination) {
        const totalPage = response.data.data.totalPage;
        const productPaginationArrow = productPagination.querySelectorAll(
          ".product__pagination-arrow"
        );
        const previous = productPaginationArrow[0];
        const next = productPaginationArrow[1];

        // Disable previous button on first page
        previous.disabled = page <= 1;

        // Disable next button on last page
        next.disabled = page >= totalPage;

        const productPaginationList = productPagination.querySelector(
          ".product__pagination-list"
        );

        // Logic for better pagination
        const pagination = [];
        const maxVisiblePages = 5; // Total number of page numbers to show
        const sidePages = Math.floor(maxVisiblePages / 2); // Pages to show on each side of current

        let startPage = Math.max(1, page - sidePages);
        let endPage = Math.min(totalPage, startPage + maxVisiblePages - 1);

        // Adjust startPage if we're at the end of the range
        if (endPage === totalPage) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Always show first page
        if (startPage > 1) {
          pagination.push(
            `<a class="product__pagination-item" href="/product.html?page=1">1</a>`
          );

          // Add ellipsis if there's a gap
          if (startPage > 2) {
            pagination.push(
              `<span class="product__pagination-ellipsis">...</span>`
            );
          }
        }

        // Add visible page numbers
        for (let i = startPage; i <= endPage; i++) {
          if (i === page) {
            pagination.push(
              `<a class="product__pagination-item active" href="/product.html?page=${i}">${i}</a>`
            );
          } else {
            pagination.push(
              `<a class="product__pagination-item" href="/product.html?page=${i}">${i}</a>`
            );
          }
        }

        // Always show last page
        if (endPage < totalPage) {
          // Add ellipsis if there's a gap
          if (endPage < totalPage - 1) {
            pagination.push(
              `<span class="product__pagination-ellipsis">...</span>`
            );
          }

          pagination.push(
            `<a class="product__pagination-item" href="/product.html?page=${totalPage}">${totalPage}</a>`
          );
        }

        productPaginationList.innerHTML = pagination.join("\n");
      }

      //End Pagination
    } catch (error) {}
  }
  //End Product List

  //Product Detail
  const productDetail = document.querySelector(".product-detail__wrapper");
  if (productDetail) {
    try {
      const engineCode = getUrlParams("engineCode");
      const response = await axios.get(`${API_URL}/engine/${engineCode}`);
      console.log(response);

      const engine = response.data.data;

      productDetail.innerHTML = `
      <div class="product-detail__image"><img src="/assets/images/engine.png" alt="">
      </div>
      <div class="product-detail__content">
        <div class="product-detail__title">${engine.kieu_dong_co}</div>
        <div class="product-detail__manufacturer">Nhà sản xuất</div>
        <div class="product-detail__suggest">
            <i class="fa-solid fa-lightbulb"></i> <span>10 lượt gợi ý</span></div>
        <div class="product-detail__desc">
          <div class="product-detail__detail"><span>Mã linh kiện: ${engine.kieu_dong_co}</div>
          <div class="product-detail__detail"><span>Chỉnh sửa lần cuối:</span><span>XXXXXXX</span></div>
        </div>
        <div class="product-detail__param">
          <div class="product-detail__param-title">Thông Số</div>
          <div class="product-detail__parm-list"> 
            <div class="product-detail__param-item">Công suất: ${engine.cong_suat_kW} kW</div>
            <div class="product-detail__param-item">Vận tốc vòng quay: ${engine.van_toc_quay_vgph} vòng/phút</div>
            <div class="product-detail__param-item">T<sub>K</sub> / T<sub>dn</sub>: ${engine.ti_so_momen}</div>
            <div class="product-detail__param-item">Khối lượng: ${engine.khoi_luong_kg} kg</div>
          </div>
        </div>
      </div>`;
    } catch (error) {}
  }
  //End Product Detail
};

main();
