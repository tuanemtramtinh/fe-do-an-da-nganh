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

//FilePond
FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation
);

const filePond = document.querySelector(".filepond");
if (filePond) {
  FilePond.create(filePond, {
    credits: null,
    allowImagePreview: true,
    imagePreviewHeight: 600, // Increase this for a larger preview
    imagePreviewUpscale: true, // Prevent downscaling
    allowImageFilter: false,
    allowImageExifOrientation: false,
    allowImageCrop: false,
    itemInsertLocation: "after",
    acceptedFileTypes: ["image/png", "image/jpg", "image/jpeg", "image/webp"],
    fileValidateTypeDetectType: (source, type) =>
      new Promise((resolve) => {
        if (source.name && source.name.toLowerCase().endsWith(".webp")) {
          resolve("image/webp");
        } else {
          resolve(type);
        }
      }),
    storeAsFile: true,
  });
}
//End FilePond

const getUrlParams = (param, defaultValue = null) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || defaultValue;
};

const handleChapter1 = async (inputId) => {
  try {
    const displayChapter1Input = () => {
      const calculateInput = document.createElement("div");
      calculateInput.classList.add("calculate-chapter-1-input");
      calculateInput.innerHTML = `
        <div class="container">
          <form class="calculate-chapter-1-input__wrapper">
            <div> 
              <label for="n_kn">Hiệu suất khớp nối (n_kn)</label>
              <input type="number" step="0.01" min="0" max="10" name="n_kn">
            </div>
            <div>
              <label for="n_d">Hiệu suất của bộ truyền đai (n_d)</label>
              <input type="number" step="0.01" min="0" max="10"  name="n_d">
            </div>
            <div>
              <label for="n_brt">Hiệu suất của bộ truyền bánh răng trụ (n_brt)</label>
              <input type="number" step="0.01" min="0" max="10"  name="n_brt">
            </div>
            <div>
              <label for="n_tv">Hiệu suất của bộ truyền trục vít (n_tv)</label>
              <input type="number" step="0.01" min="0" max="10"  name="n_tv">
            </div>
            <div>
              <label for="n_ol">Hiệu suất của một cặp ổ lăn (n_ol)</label>
              <input type="number" step="0.01" min="0" max="10"  name="n_ol">
            </div>
            <button type="submit">Lưu</button>
          </form>
        </div>
      `;
      return calculateInput;
    };

    const displayChapter1Result = async (inputId, chapter1Result) => {
      const calculate = document.querySelector(".calculate");
      // calculate.innerHTML = "";
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

    const response = await axios.get(
      `${API_URL}/calculate/chapter-1?inputId=${inputId}`,
      { headers: { "Cache-Control": "no-cache", Pragma: "no-cache" } }
    );
    const chapter1 = response.data.data;

    const calculate = document.querySelector(".calculate");
    calculate.innerHTML = "";

    calculate.appendChild(displayChapter1Input());

    const calculateInput = document.querySelector(
      ".calculate-chapter-1-input__wrapper"
    );

    if (chapter1.status === "initial") {
      calculateInput.addEventListener("submit", async (e) => {
        e.preventDefault();
        const n_kn = e.target[0].value;
        const n_d = e.target[1].value;
        const n_brt = e.target[2].value;
        const n_tv = e.target[3].value;
        const n_ol = e.target[4].value;

        const response = await axios.get(
          `${API_URL}/calculate/chapter-1?inputId=${inputId}&n_kn=${n_kn}&n_d=${n_d}&n_brt=${n_brt}&n_tv=${n_tv}&n_ol=${n_ol}`
        );
        const chapter1 = response.data.data;
        const suggestEngines = chapter1.engines;
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
              const response = await axios.get(
                `${API_URL}/calculate/chapter-1?inputId=${inputId}&engineId=${engineId}`
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
      });
    } else if (chapter1.status === "stage-1" || chapter1.status === "finish") {
      console.log(chapter1.n_kn);
      calculateInput.n_ol.value = chapter1.n_ol;
      calculateInput.n_tv.value = chapter1.n_tv;
      calculateInput.n_brt.value = chapter1.n_brt;
      calculateInput.n_d.value = chapter1.n_d;
      calculateInput.n_kn.value = chapter1.n_kn;
      calculateInput.n_ol.disabled = true;
      calculateInput.n_tv.disabled = true;
      calculateInput.n_brt.disabled = true;
      calculateInput.n_d.disabled = true;
      calculateInput.n_kn.disabled = true;
      const button = calculateInput.querySelector("button");
      button.style.display = "none";

      if (chapter1.status === "stage-1") {
        const suggestEngines = chapter1.engines;
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
              const response = await axios.get(
                `${API_URL}/calculate/chapter-1?inputId=${inputId}&engineId=${engineId}`
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
      } else if (chapter1.status === "finish") {
        displayChapter1Result(inputId, chapter1);
      }
    }
  } catch (error) {}
  // try {
  //   const displayChapter1CalculateProcess = async (inputId) => {
  //     const stage1Response = await axios.post(
  //       `${API_URL}/calculate/chapter-1/stage-1`,
  //       {
  //         inputId,
  //       }
  //     );
  //     if (stage1Response.status === 200) {
  //       const suggestEngines = stage1Response.data.data.engines;
  //       const calculate = document.querySelector(".calculate");
  //       calculate.innerHTML = "";
  //       const calculateSuggest = document.createElement("div");
  //       calculateSuggest.classList.add("calculate-suggest");

  //       const suggestEnginesHTML = suggestEngines.map(
  //         (engine) =>
  //           `<div class="calculate-suggest__item swiper-slide" engine-id="${engine._id}">
  //             <div class="calculate-suggest__item-name">${engine.kieu_dong_co}</div>
  //             <div class="calculate-suggest__item-manufacturer">
  //                 Nhà sản xuất: <span>HCMUT </span>
  //             </div>
  //             <div class="calculate-suggest__item-parameter">
  //               <div>
  //                 <span>Công suất: </span>
  //                 <span>${engine.cong_suat_kW}</span>
  //               </div>
  //               <div>
  //                 <span>Vận tốc vòng quay: </span>
  //                 <span>${engine.van_toc_quay_vgph}</div>
  //             </div>
  //             <div class="calculate-suggest__item-image"><img src="https://placehold.co/350x180?font=roboto&amp;text=Engine" alt=""></div>
  //             <button class="calculate-suggest__item-save" engine-id="${engine._id}">Lưu</button>
  //           </div>`
  //       );

  //       const suggestEngineList = `
  //         <div class="calculate-suggest__list">
  //           <div class="calculate-suggest__list-title">Động cơ</div>
  //           <div class="calculate-suggest__list-wrapper swiper mySwiper">
  //             <div class="swiper-wrapper">
  //               ${suggestEnginesHTML.join("\n")}
  //             </div>
  //             <div class="swiper-pagination"></div>
  //           </div>
  //         </div>
  //       `;

  //       calculateSuggest.innerHTML = `
  //        <div class="container">
  //           <div class="calculate-suggest__wrapper">
  //             <div class="calculate-suggest__title"><i class="fa-solid fa-circle-check"></i>
  //               <h2>Linh Kiện Phù Hợp</h2>
  //             </div>
  //             ${suggestEngineList}
  //           </div>
  //         </div>
  //       `;

  //       calculate.appendChild(calculateSuggest);
  //       var swiper = new Swiper(".mySwiper", {
  //         slidesPerView: 3,
  //         spaceBetween: 30,
  //         pagination: {
  //           el: ".swiper-pagination",
  //           clickable: true,
  //         },
  //       });
  //       //Handle Save Button
  //       const saveButtons = document.querySelectorAll(
  //         ".calculate-suggest__item-save"
  //       );
  //       saveButtons.forEach((button) => {
  //         button.addEventListener("click", async (e) => {
  //           try {
  //             const engineId = e.target.getAttribute("engine-id");
  //             const response = await axios.post(
  //               `${API_URL}/calculate/chapter-1/stage-2`,
  //               {
  //                 inputId,
  //                 engineId,
  //               }
  //             );
  //             if (response.status === 200) {
  //               button.classList.add("active");
  //               const engine = response.data.data;
  //               const calculationResult = document.createElement("div");
  //               calculationResult.classList.add("calculate-result");

  //               const table = `
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th>Thông số</th>
  //                     <th>Động cơ</th>
  //                     <th>Trục I</th>
  //                     <th colspan="2">Trục II</th>
  //                     <th colspan="2">Trục II</th>
  //                     <th>Trục III</th>
  //                   </tr>
  //                 </thead>
  //                 <tbody>
  //                   <tr>
  //                     <td>P(kw)</td>
  //                     <td>${engine.P_dc}</td>
  //                     <td>${engine.P_I}</td>
  //                     <td colspan="4">${engine.P_II}</td>
  //                     <td>${engine.P_III}</td>
  //                   </tr>
  //                   <tr>
  //                     <td>n (vg/phút)</td>
  //                     <td>${engine.n_dc}</td>
  //                     <td>${engine.n_I}</td>
  //                     <td colspan="4">${engine.n_II}</td>
  //                     <td>${engine.n_III}</td>
  //                   </tr>
  //                   <tr>
  //                     <td>u </td>
  //                     <td>${engine.u_dc}</td>
  //                     <td colspan="3">${engine.u_I_II}</td>
  //                     <td colspan="3">${engine.u_II_III} </td>
  //                   </tr>
  //                   <tr>
  //                     <td>T(N.mm)</td>
  //                     <td>${engine.T_dc}</td>
  //                     <td>${engine.T_I}</td>
  //                     <td colspan="4">${engine.T_II}</td>
  //                     <td>${engine.T_III}</td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //               `;

  //               calculationResult.innerHTML = `
  //               <div class="container">
  //                 <div class="calculate-result__wrapper">
  //                   <div class="calculate-result__title"><span>1</span>
  //                     <h3>Tính chọn động cơ điện</h3>
  //                   </div>
  //                   <div class="calculate-result__body">
  //                     ${table}
  //                   </div>
  //                 </div>
  //               </div>
  //               `;

  //               calculate.append(calculationResult);

  //               const calculateExportButton = document.createElement("div");
  //               calculateExportButton.classList.add(".calculate__export");
  //               calculateExportButton.innerHTML = `
  //               <div class="container"><a href="${API_URL}/export/chapter-1/${inputId}" class="calculate__export-button">Xuất Báo Cáo</a></div>
  //               `;
  //               calculate.append(calculateExportButton);
  //             }
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         });
  //       });
  //     }
  //   };

  // const displayChapter1Result = async (inputId, chapter1Result) => {
  //   const calculate = document.querySelector(".calculate");
  //   calculate.innerHTML = "";
  //   const calculateSuggest = document.createElement("div");
  //   calculateSuggest.classList.add("calculate-suggest");

  //   const engine = chapter1Result.engineId;

  //   calculateSuggest.innerHTML = `
  //   <div class="container">
  //       <div class="calculate-suggest__wrapper">
  //         <div class="calculate-suggest__title"><i class="fa-solid fa-circle-check"></i>
  //           <h2>Linh Kiện Phù Hợp</h2>
  //         </div>
  //         <div class="product-detail__wrapper">
  //           <div class="product-detail__image"><img src="/assets/images/engine.png" alt="">
  //           </div>
  //           <div class="product-detail__content">
  //             <div class="product-detail__title">${engine.kieu_dong_co}</div>
  //             <div class="product-detail__manufacturer">Nhà sản xuất</div>
  //             <div class="product-detail__suggest">
  //                 <i class="fa-solid fa-lightbulb"></i> <span>10 lượt gợi ý</span></div>
  //             <div class="product-detail__desc">
  //               <div class="product-detail__detail"><span>Mã linh kiện: ${engine.kieu_dong_co}</div>
  //               <div class="product-detail__detail"><span>Chỉnh sửa lần cuối:</span><span>XXXXXXX</span></div>
  //             </div>
  //             <div class="product-detail__param">
  //               <div class="product-detail__param-title">Thông Số</div>
  //               <div class="product-detail__parm-list">
  //                 <div class="product-detail__param-item">Công suất: ${engine.cong_suat_kW} kW</div>
  //                 <div class="product-detail__param-item">Vận tốc vòng quay: ${engine.van_toc_quay_vgph} vòng/phút</div>
  //                 <div class="product-detail__param-item">T<sub>K</sub> / T<sub>dn</sub>: ${engine.ti_so_momen}</div>
  //                 <div class="product-detail__param-item">Khối lượng: ${engine.khoi_luong_kg} kg</div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   `;

  //   const calculationResult = document.createElement("div");
  //   calculationResult.classList.add("calculate-result");

  //   const table = `
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>Thông số</th>
  //                   <th>Động cơ</th>
  //                   <th>Trục I</th>
  //                   <th colspan="2">Trục II</th>
  //                   <th colspan="2">Trục II</th>
  //                   <th>Trục III</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td>P(kw)</td>
  //                   <td>${chapter1Result.P_dc}</td>
  //                   <td>${chapter1Result.P_I}</td>
  //                   <td colspan="4">${chapter1Result.P_II}</td>
  //                   <td>${chapter1Result.P_III}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>n (vg/phút)</td>
  //                   <td>${chapter1Result.n_dc}</td>
  //                   <td>${chapter1Result.n_I}</td>
  //                   <td colspan="4">${chapter1Result.n_II}</td>
  //                   <td>${chapter1Result.n_III}</td>
  //                 </tr>
  //                 <tr>
  //                   <td>u </td>
  //                   <td>${chapter1Result.u_dc}</td>
  //                   <td colspan="3">${chapter1Result.u_I_II}</td>
  //                   <td colspan="3">${chapter1Result.u_II_III} </td>
  //                 </tr>
  //                 <tr>
  //                   <td>T(N.mm)</td>
  //                   <td>${chapter1Result.T_dc}</td>
  //                   <td>${chapter1Result.T_I}</td>
  //                   <td colspan="4">${chapter1Result.T_II}</td>
  //                   <td>${chapter1Result.T_III}</td>
  //                 </tr>
  //               </tbody>
  //             </table>
  //             `;

  //   calculationResult.innerHTML = `
  //             <div class="container">
  //               <div class="calculate-result__wrapper">
  //                 <div class="calculate-result__title"><span>1</span>
  //                   <h3>Tính chọn động cơ điện</h3>
  //                 </div>
  //                 <div class="calculate-result__body">
  //                   ${table}
  //                 </div>
  //               </div>
  //             </div>
  //             `;

  //   const calculateExportButton = document.createElement("div");
  //   calculateExportButton.classList.add(".calculate__export");
  //   calculateExportButton.innerHTML = `
  //   <div class="container"><a href="${API_URL}/export/chapter-1/${inputId}" class="calculate__export-button">Xuất Báo Cáo</a></div>
  //   `;

  //   calculate.append(calculateSuggest);
  //   calculate.append(calculationResult);
  //   calculate.append(calculateExportButton);
  // };

  //   const getChapter1Result = await axios.get(
  //     `${API_URL}/calculate/chapter-1?inputId=${inputId}`,
  //     { headers: { "Cache-Control": "no-cache", Pragma: "no-cache" } }
  //   );
  //   const getChapter1Data = getChapter1Result.data.data;
  //   if (getChapter1Data.status === "initial") {
  //     await displayChapter1CalculateProcess(inputId);
  //   } else {
  //     await displayChapter1Result(inputId, getChapter1Data);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
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
    // calculate.innerHTML = "";

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

const handleChapter3 = async (inputId) => {
  const displayFirstForm = () => {
    const div = document.createElement("div");
    div.classList.add("calculate-chapter-1-input");
    div.classList.add("first");
    div.innerHTML = `
      <div class="container">
        <form class="calculate-chapter-1-input__wrapper">
          <div> 
            <label for="lm12">Bánh đai (lm12) (mm)</label>
            <input type="number" id="lm12" name="lm12">
          </div>
          <div> 
            <label for="lm22">Bánh vít (lm22) (mm)</label>
            <input type="number" id="lm22" name="lm22">
          </div>
          <div> 
            <label for="lm23">Bánh răng trụ 1 (lm23) (mm)</label>
            <input type="number" id="lm23" name="lm23">
          </div>
          <div> 
            <label for="lm34">Bánh răng trụ 2 (lm34) (mm)</label>
            <input type="number" id="lm34" name="lm34">
          </div>
          <div> 
            <label for="lm33">Chiều dài mayor nửa khớp nối (lm33) (mm)</label>
            <input type="number" id="lm33" name="lm33">
          </div>
          <button type="submit">Lưu</button>
        </form>
      </div>
    `;
    return div;
  };

  const displaySecondForm = () => {
    const div = document.createElement("div");
    div.classList.add("calculate-chapter-1-input");
    div.classList.add("second");
    div.innerHTML = `
      <div class="container">
        <form class="calculate-chapter-1-input__wrapper">
          <div>
            <label for="F_nt">Lực nối trục (F<sub>nt</sub>) (N)</label>
            <div style="margin-top: 10px; margin-bottom: 10px;" id="F_nt_display">Value:</div>
            <input type="range" min="0" max="100" step="5" id="F_nt" name="F_nt">
          </div>
          <button type="submit">Lưu</button>
        </form>
      </div>
    `;
    return div;
  };

  const displayResult = (chapter3) => {
    const div = document.createElement("div");
    div.classList.add("calculate-result");
    div.innerHTML = `
      <div class="container">
        <div class="calculate-result__wrapper">
          <div class="calculate-result__title"><span>3</span>
            <h3>Thiết kế trục</h3>
          </div>
          <div class="calculate-result__body">
            <div class="calculate-result__element">
              <table style="table-layout: fixed;">
                <thead> 
                  <tr> 
                    <th>Tiết diện</th>
                    <th>Đường kính</th>
                    <th>Then bằng b.h</th>
                    <th>t1</th>
                    <th>W</th>
                    <th>
                        W <sub>0</sub></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>B</td>
                    <td>${chapter3.dsb1}</td>
                    <td>${chapter3.bB} x ${chapter3.hB}</td>
                    <td>${chapter3.t1B}</td>
                    <td>${chapter3.WB}</td>
                    <td>${chapter3.WB0}</td>
                  </tr>
                  <tr>
                    <td>F</td>
                    <td>${chapter3.dsb2}</td>
                    <td>${chapter3.bF} x ${chapter3.hF}</td>
                    <td>${chapter3.t1F}</td>
                    <td>${chapter3.WF}</td>
                    <td>${chapter3.WF0}</td>
                  </tr>
                  <tr>
                    <td>N</td>
                    <td>${chapter3.dsb3}</td>
                    <td>${chapter3.bN} x ${chapter3.hN}</td>
                    <td>${chapter3.t1N}</td>
                    <td>${chapter3.WN}</td>
                    <td>${chapter3.WN0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="calculate-result__element">
              <table style="table-layout: fixed;">
                <thead> 
                  <tr> 
                    <th>Tiết diện</th>
                    <th>σ<sub>a</sub>(MPa)</th>
                    <th>
                      σ<sub>m</sub>(MPa)</th>
                    <th>
                      τ<sub>a</sub>=
                      τ<sub>m</sub>(MPa)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>B</td>
                    <td>${chapter3.usaB}</td>
                    <td>0</td>
                    <td>${chapter3.taB}</td>
                  </tr>
                  <tr>
                    <td>F</td>
                    <td>${chapter3.usaF}</td>
                    <td>0</td>
                    <td>${chapter3.taF}</td>
                  </tr>
                  <tr>
                    <td>N</td>
                    <td>${chapter3.usaN}</td>
                    <td>0</td>
                    <td>${chapter3.taN}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="calculate-result__element">
              <table style="table-layout: fixed;">
                <thead> 
                  <tr>
                    <th>Tiết diện</th>
                    <th>d (mm)</th>
                    <th>ε<sub>σ</sub></th>
                    <th>ε<sub>τ</sub></th>
                    <th>K<sub>σ</sub> / (βε<sub>σ</sub>)</th>
                    <th>K<sub>τ</sub> / (βε<sub>τ</sub>)</th>
                    <th>S<sub>σ</sub></th>
                    <th>S<sub>τ</sub></th>
                    <th>S</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>B</td>
                    <td>${chapter3.dsb1}</td>
                    <td>${chapter3.eoB}</td>
                    <td>${chapter3.etB}</td>
                    <td>${chapter3.KoBEoB.toFixed(2)}</td>
                    <td>${chapter3.KtBEtB.toFixed(2)}</td>
                    <td>${chapter3.soB.toFixed(2)}</td>
                    <td>${chapter3.stB.toFixed(2)}</td>
                    <td>${chapter3.sB.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>F</td>
                    <td>${chapter3.dsb2}</td>
                    <td>${chapter3.eoF}</td>
                    <td>${chapter3.etF}</td>
                    <td>${chapter3.KoBEoF.toFixed(2)}</td>
                    <td>${chapter3.KtBEtF.toFixed(2)}</td>
                    <td>${chapter3.soF.toFixed(2)}</td>
                    <td>${chapter3.stF.toFixed(2)}</td>
                    <td>${chapter3.sF.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>N</td>
                    <td>${chapter3.dsb3}</td>
                    <td>${chapter3.eoN}</td>
                    <td>${chapter3.etN}</td>
                    <td>${chapter3.KoBEoN.toFixed(2)}</td>
                    <td>${chapter3.KtBEtN.toFixed(2)}</td>
                    <td>${chapter3.soN.toFixed(2)}</td>
                    <td>${chapter3.stN.toFixed(2)}</td>
                    <td>${chapter3.sN.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    return div;
  };

  const handleSecondForm = (calculate, chapter3) => {
    const rangeInput = document.querySelector("#F_nt");
    rangeInput.min = chapter3.Fnt_truoc;
    rangeInput.max = chapter3.Fnt_sau;
    rangeInput.step = 10;
    rangeInput.value = chapter3.Fnt_truoc;

    rangeInput.addEventListener("input", (e) => {
      const value = e.target.value;
      const display = document.querySelector("#F_nt_display");
      display.textContent = `Value: ${value}`;
    });

    const secondForm = document.querySelector(
      ".calculate-chapter-1-input.second .calculate-chapter-1-input__wrapper"
    );
    secondForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = e.submitter;
      submitButton.disabled = true;

      const F_nt = e.target.F_nt.value;
      const response = await axios.get(
        `${API_URL}/calculate/chapter-3?inputId=${inputId}&F_nt=${F_nt}`
      );
      const chapter3 = response.data.data;
      calculate.append(displayResult(chapter3));
      calculate.append(displaySaveButton());
    });
  };

  const handleFirstForm = (calculate) => {
    const firstForm = document.querySelector(
      ".calculate-chapter-1-input.first .calculate-chapter-1-input__wrapper"
    );
    firstForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitButton = e.submitter;
      submitButton.disabled = true;

      const lm12 = e.target.lm12.value;
      const lm22 = e.target.lm22.value;
      const lm23 = e.target.lm23.value;
      const lm34 = e.target.lm34.value;
      const lm33 = e.target.lm33.value;

      if (
        lm12 === "" ||
        lm22 === "" ||
        lm23 === "" ||
        lm34 === "" ||
        lm33 === ""
      ) {
        alert("Vui lòng nhập hết các trường");
        return;
      }

      const response = await axios.get(
        `${API_URL}/calculate/chapter-3?inputId=${inputId}&lm12=${lm12}&lm22=${lm22}&lm23=${lm23}&lm34=${lm34}&lm33=${lm33}`
      );
      const chapter3 = response.data.data;

      calculate.append(displaySecondForm());
      handleSecondForm(calculate, chapter3);
    });
  };

  const disableFirstForm = (firstForm, chapter3) => {
    firstForm.lm12.value = chapter3.lm12;
    firstForm.lm22.value = chapter3.lm22;
    firstForm.lm23.value = chapter3.lm23;
    firstForm.lm34.value = chapter3.lm34;
    firstForm.lm33.value = chapter3.lm33;
    firstForm.lm12.disabled = true;
    firstForm.lm22.disabled = true;
    firstForm.lm23.disabled = true;
    firstForm.lm34.disabled = true;
    firstForm.lm33.disabled = true;
    const button = firstForm.querySelector("button");
    button.style.display = "none";
  };

  const disableSecondForm = (secondForm, chapter3) => {
    secondForm.F_nt.value = chapter3.F_nt;
    secondForm.F_nt.disabled = true;
    const textContent = document.querySelector("#F_nt_display");
    textContent.textContent = `Value: ${chapter3.F_nt} N`;
    const button = secondForm.querySelector("button");
    button.style.display = "none";
  };

  const displaySaveButton = () => {
    const calculateExportButton = document.createElement("div");
    calculateExportButton.classList.add(".calculate__export");
    calculateExportButton.innerHTML = `
      <div class="container"><a href="${API_URL}/export/chapter-3/${inputId}" class="calculate__export-button">Xuất Báo Cáo</a></div>
      `;
    return calculateExportButton;
  };

  try {
    const response = await axios.get(
      `${API_URL}/calculate/chapter-3?inputId=${inputId}`,
      { headers: { "Cache-Control": "no-cache", Pragma: "no-cache" } }
    );

    const chapter3 = response.data.data;

    const calculate = document.querySelector(".calculate");

    calculate.innerHTML = "";

    calculate.append(displayFirstForm(calculate));

    if (chapter3.status === "initial") {
      handleFirstForm(calculate);
    } else if (chapter3.status === "stage-1") {
      if (
        !chapter3.lm12 ||
        !chapter3.lm22 ||
        !chapter3.lm23 ||
        !chapter3.lm34 ||
        !chapter3.lm33
      ) {
        handleFirstForm(calculate);
      }
    } else if (chapter3.status === "stage-2") {
      if (!chapter3.F_nt) {
        const firstForm = document.querySelector(
          ".calculate-chapter-1-input.first .calculate-chapter-1-input__wrapper"
        );
        disableFirstForm(firstForm, chapter3);
        calculate.append(displaySecondForm());
        handleSecondForm(calculate, chapter3);
      }
    } else {
      const firstForm = document.querySelector(
        ".calculate-chapter-1-input.first .calculate-chapter-1-input__wrapper"
      );
      disableFirstForm(firstForm, chapter3);
      calculate.append(displaySecondForm());
      const secondForm = document.querySelector(
        ".calculate-chapter-1-input.second .calculate-chapter-1-input__wrapper"
      );
      disableSecondForm(secondForm, chapter3);
      calculate.append(displayResult(chapter3));
      calculate.append(displaySaveButton());
    }
  } catch (error) {
    console.log(error);
  }
};

const handleChapter = async (chapter, inputId) => {
  switch (chapter) {
    case "1":
      await handleChapter1(inputId);
      break;
    case "2":
      await handleChapter2(inputId);
      break;
    case "3":
      await handleChapter3(inputId);
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

  //Take image Input
  const imageForm = document.querySelector(".section-3__form-image");
  if (imageForm) {
    imageForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const pond = FilePond.find(document.querySelector(".filepond"));
      const files = pond.getFiles();
      const file = files[0].file;

      const formData = new FormData();
      formData.append("image", file);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      try {
        imageForm.innerHTML = `<div class="ai-loader">
          <div class="spinner"></div>
          <p><i class="fa-solid fa-robot"></i> Đang được xử lý bới AI</p>
        </div>`;

        const response = await axios.post(`${API_URL}/calculate/ai`, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the server knows it's a file
          },
        });

        console.log(response);

        const data = response.data.data;

        imageForm.innerHTML = `<label for="image">Tải hình ảnh lên và cảm nhận sự kỳ diệu này nhé ! </label>
              <input class="filepond" type="file" name="image" id="image">
              <button type="submit">Tải ảnh lên</button>`;

        const filePond = document.querySelector(".filepond");
        if (filePond) {
          FilePond.create(filePond, {
            credits: null,
            allowImagePreview: true,
            imagePreviewHeight: 600, // Increase this for a larger preview
            imagePreviewUpscale: true, // Prevent downscaling
            allowImageFilter: false,
            allowImageExifOrientation: false,
            allowImageCrop: false,
            itemInsertLocation: "after",
            acceptedFileTypes: [
              "image/png",
              "image/jpg",
              "image/jpeg",
              "image/webp",
            ],
            fileValidateTypeDetectType: (source, type) =>
              new Promise((resolve) => {
                if (
                  source.name &&
                  source.name.toLowerCase().endsWith(".webp")
                ) {
                  resolve("image/webp");
                } else {
                  resolve(type);
                }
              }),
            storeAsFile: true,
          });
        }

        const inputChoice = document.querySelector(".section-3__choice span");

        inputChoice.click();

        const inputForm = document.querySelector(".section-3__form");
        inputForm.F.value = data.F;
        inputForm.L.value = data.L;
        inputForm.T1.value = data.T1;
        inputForm.T2.value = data.T2;
        inputForm.p.value = data.p;
        inputForm.t1.value = data.t1;
        inputForm.t2.value = data.t2;
        inputForm.z.value = data.z;
        inputForm.v.value = data.v;
      } catch (error) {
        console.log("Upload failed", error);
      }

      // console.log(file);
    });
  }
  //End Take image Input

  //Change Input
  const section3Choice = document.querySelector(".section-3__choice");
  if (section3Choice) {
    const [inputChoice, imageChoice] = section3Choice.querySelectorAll("span");

    const section3Body = document.querySelector(".section-3__body");
    const [inputForm, imageForm] = section3Body.querySelectorAll("form");

    inputChoice.addEventListener("click", (e) => {
      inputForm.style.display = "block";
      imageForm.style.display = "none";
      inputChoice.classList.add("active");
      imageChoice.classList.remove("active");
    });

    imageChoice.addEventListener("click", (e) => {
      inputForm.style.display = "none";
      imageForm.style.display = "flex";
      inputChoice.classList.remove("active");
      imageChoice.classList.add("active");
    });
    inputChoice.click();
  }
  //End Change Input

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
    // console.log(input);
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
