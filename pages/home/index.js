const genderUl = document.querySelector(".genrer-type-wrapper");
const inputRange = document.querySelector(".input-range");
const recordsUl = document.querySelector(".records");
const maxValue = document.querySelector(".value-max");
const slider = document.querySelector(".slider")
const body = document.body;

let clickGender = "Todos";

function state(initialValue) {
  let value = initialValue;

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
  }

  return [getValue, setValue];
}

const [genrer, setGenrer] = state(categories);

function renderGenrer(products = genrer()) {
  products.forEach((element) => {
    let li = document.createElement("li");
    let p = document.createElement("p");

    li.classList.add("genrer");

    if (element === clickGender) {
      li.classList.add("selected-genrer");
    }
    p.innerText = element;

    li.appendChild(p);

    li.addEventListener("click", () => {
      clickGender = element;
      genderUl.innerHTML = "";
      recordsUl.innerHTML = "";
      renderGenrer();
      renderRecords();
    });

    genderUl.insertAdjacentElement("beforeend", li);
  });
}

const [productsData, setProductsData] = state(products);

function findGenderIndex(selectedGender, products = genrer()) {
  return products.findIndex((element) => {
    return element === selectedGender;
  });
}

function renderRecords(records = productsData()) {
  let currentIndex = findGenderIndex(clickGender);
  let counter = 0;
  records.forEach((element) => {
    if (currentIndex === 0 || element.category === currentIndex) {
      if (element.price <= inputRange.value) {
        counter++;
        recordsUl.insertAdjacentHTML(
          "beforeend",
          `<li class="product">
              <figure class="product-img-wrapper">
                 <img src="${element.img}" class="product-img">
              </figure>
              <div class="card-wrapper">
                 <span class="band-desc">
                    <p class="band-name">${element.band}</p>
                    <p class="band-year">${element.year}</p>
                 </span>
                 <h3 class="record-name">${element.title}</h3>
                 <span class="record-buy-section">
                    <p class="record-price">R$ ${element.price}.00</p>
                    <button class="record-buy-btn">Comprar</button>
                 </span>
              </div>
           </li>`
        );
      }
    }
  });
  if (counter === 0) {
    recordsUl.insertAdjacentHTML(
      "beforeend",
      `<p class="no-album">Nenhum album encontrado</p>`
    );
  }
}

function rangeToSlider(inputRange) {
  let percentageRange = ((inputRange/getMaxInputValue())*100) + 0.1
  return  `${percentageRange.toFixed(3)}%`
}

function getMaxInputValue(product = productsData()) {
  let maxValue = 0;
  product.forEach((element) => {
    element.price > maxValue ? (maxValue = element.price) : undefined;
  });
  return maxValue;
}

function events() {
  inputRange.addEventListener("mousemove", () => {
    recordsUl.innerHTML = "";
    maxValue.innerText = `Até R$ ${parseInt(inputRange.value)}`;
    slider.style.width = rangeToSlider(inputRange.value)
    renderRecords();
  });
}

function defs() {
  inputRange.max = getMaxInputValue();
  inputRange.value = getMaxInputValue() / 2;
  maxValue.innerText = `Até R$ ${inputRange.value}`;
  slider.style.width = rangeToSlider(inputRange.value)
}

defs();
events();
renderGenrer();
renderRecords();
