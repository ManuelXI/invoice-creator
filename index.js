const washBtn = document.getElementById("washBtn");
const mowBtn = document.getElementById("mowBtn");
const weedsBtn = document.getElementById("weedsBtn");
const invoiceBtn = document.getElementById("invoice-btn");

const removeOneBtn = document.getElementById("removeOneBtn");
const removeTwoBtn = document.getElementById("removeTwoBtn");
const removeThreeBtn = document.getElementById("removeThreeBtn");

const amountEl = document.getElementById("amount-el");
const tasksEl = document.getElementById("tasks-el");

const data = [
  {
    activity: "Wash Car",
    price: 10,
  },
  {
    activity: "Mow Lawn",
    price: 20,
  },
  {
    activity: "Pull Weeds",
    price: 30,
  },
];

let totalSum = 0;
let renderList = [];
amountEl.textContent = "$" + totalSum;
invoiceBtn.disabled = true;

washBtn.addEventListener("click", function () {
  washBtn.disabled = true;
  invoiceBtn.disabled = false;
  totalSum += data[0].price;
  renderList.push(
    `
      <div id="washCar" class="item-desc duration-2">
      <div class="item-desc-half">
        <p class="item-name">${data[0].activity}</p>
        <button onclick="removeItem(${data[0].price})" class="remove-btn">Remove</button>
      </div>
      <p class="item-price"><span class="dollar-sign">$</span>${data[0].price}</p>
    </div>
      `
  );
  renderItem(renderList, totalSum, data[0].price);
});
mowBtn.addEventListener("click", function () {
  mowBtn.disabled = true;
  invoiceBtn.disabled = false;

  totalSum += data[1].price;
  renderList.push(
    `
      <div id="mowLawn" class="item-desc duration-2">
      <div class="item-desc-half">
        <p class="item-name">${data[1].activity}</p>
        <button onclick="removeItem(${data[1].price})" class="remove-btn">Remove</button>
      </div>
      <p class="item-price"><span class="dollar-sign">$</span>${data[1].price}</p>
    </div>
      `
  );
  renderItem(renderList, totalSum, data[1].price);
});
weedsBtn.addEventListener("click", function () {
  weedsBtn.disabled = true;
  invoiceBtn.disabled = false;

  totalSum += data[2].price;
  renderList.push(
    `
      <div id="pullWeeds" class="item-desc duration-2">
      <div class="item-desc-half">
        <p class="item-name">${data[2].activity}</p>
        <button onclick="removeItem(${data[2].price})" class="remove-btn">Remove</button>
      </div>
      <p class="item-price"><span class="dollar-sign">$</span>${data[2].price}</p>
    </div>
      `
  );
  renderItem(renderList, totalSum, data[2].price);
});

invoiceBtn.addEventListener("click", function () {
  washBtn.disabled = false;
  mowBtn.disabled = false;
  weedsBtn.disabled = false;

  totalSum = 0;
  renderList = [];
  tasksEl.classList.toggle("increaseSize");
  setTimeout(() => {
    renderItem(renderList, totalSum);
    tasksEl.classList.toggle("increaseSize");
    invoiceBtn.disabled = true;
  }, 450);
});

function renderItem(arr, sum, singleSum = 0) {
  let stuffToRender = "";
  for (let i = 0; i < arr.length; i++) {
    stuffToRender += arr[i];
  }
  tasksEl.innerHTML = stuffToRender;

  amountEl.textContent = `$${sum}`;
  const washCar = document.getElementById("washCar");
  const mowLawn = document.getElementById("mowLawn");
  const pullWeeds = document.getElementById("pullWeeds");
  setTimeout(() => {
    if (singleSum) {
      if (singleSum === 10) {
        washCar.classList.toggle("fadeIn");
        if (mowLawn) mowLawn.classList.add("show");
        if (pullWeeds) pullWeeds.classList.add("show");
      } else if (singleSum === 20) {
        mowLawn.classList.toggle("fadeIn");
        if (washCar) washCar.classList.add("show");
        if (pullWeeds) pullWeeds.classList.add("show");
      } else if (singleSum === 30) {
        pullWeeds.classList.toggle("fadeIn");
        if (mowLawn) mowLawn.classList.add("show");
        if (washCar) washCar.classList.add("show");
      }
    } else {
      if (mowLawn) mowLawn.classList.toggle("fadeIn");
      if (washCar) washCar.classList.toggle("fadeIn");
      if (pullWeeds) pullWeeds.classList.toggle("fadeIn");
    }
  }, 0.01);
}

function removeItem(amount) {
  totalSum -= amount;
  for (let i = 0; i < renderList.length; i++) {
    if (renderList[i].includes(`${amount}`)) {
      renderList.splice(i, 1);
    }
  }
  const washCar = document.getElementById("washCar");
  const mowLawn = document.getElementById("mowLawn");
  const pullWeeds = document.getElementById("pullWeeds");
  if (amount === 10) {
    washCar.classList.toggle("fadeOut");
    if (mowLawn) mowLawn.classList.add("show");
    if (pullWeeds) pullWeeds.classList.add("show");
  } else if (amount === 20) {
    mowLawn.classList.toggle("fadeOut");
    if (washCar) washCar.classList.add("show");
    if (pullWeeds) pullWeeds.classList.add("show");
  } else if (amount === 30) {
    pullWeeds.classList.toggle("fadeOut");
    if (mowLawn) mowLawn.classList.add("show");
    if (washCar) washCar.classList.add("show");
  }
  setTimeout(() => {
    renderItem(renderList, totalSum);
  }, 400);
  if (amount === 10) {
    washBtn.disabled = false;
  } else if (amount === 20) {
    mowBtn.disabled = false;
  } else {
    weedsBtn.disabled = false;
  }
  //   if (mowLawn) mowLawn.classList.remove("fadeIn");
  //   if (washCar) washCar.classList.remove("fadeIn");
  //   if (pullWeeds) pullWeeds.classList.remove("fadeIn");
}
