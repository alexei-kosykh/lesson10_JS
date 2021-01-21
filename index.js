const addCard = document.querySelector("#addCard");
const desk = document.querySelector("#desk");
const form = document.querySelector("#form");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const btnModalClose = document.querySelector("#btnModalClose");
const btnModalApply = document.querySelector("#btnModalApply");
const inputTitle = document.querySelector("#modal-title");
const inputDescription = document.querySelector("#modal-description");

let storageIndex = 0; // хранение индекса при открытии модалки
let userData = [];
let dateStorage = ""; // хранение даты при открытии модалки
let shadowDelete = 0; // для запоминания места добавления тени

// Функция отрисовки карточки
const drawCards = () => {
  desk.innerHTML = ""; // Каждый раз пишем заново, исходя из массива

  userData.forEach((item) => {
    desk.innerHTML += `<div class="desk__card">
    <div class="desk__info"> 
    <p class="desk__title">Title: <span class="card__title">${item.title}</span></p>
    <p class="desk__description">Description: <span class="card__description">${item.description}</span></p>
    <p>Date: <span class="card__date">${item.date}</span></p></div>
    <div class="buttons__card">
    <button id="btnDelete" class="button button__card">Delete</button>
    <button id="btnEdit" class="button button__card">Edit</button>
    </div></div>`;
  });
};

// Функция добавления карточки
addCard.addEventListener("click" || "keyup", (event) => {
  if (event.code === "Enter" || event.type === "click") {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    let date = new Date();

    date = `${date.getDate()}${
      date.getMonth() - 1
    }.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    userData.push({ title: title, description: description, date: date });

    console.log(userData);

    drawCards();

    form.reset();
  }
});

// Функция удаления
const deleteCard = (event) => {
  const card = event.target.closest(".desk__card");
  const title = card.querySelector(".card__title").textContent;
  const description = card.querySelector(".card__description").textContent;

  const index = userData.findIndex(
    // findIndex - принимает calback первый элемент массива и дальше сравниваем
    (elem) => elem.title === title && elem.description === description
  );
  userData.splice(index, 1);

  drawCards();
};

// =======================
// Все по модалке
const openModal = () => (modal.style.display = "block");

const closeModal = () => {
  modal.style.display = "none";
};
// ========================

// Функция редактирования
const editCard = (event) => {
  const card = event.target.closest(".desk__card");
  const title = card.querySelector(".card__title").textContent;
  const description = card.querySelector(".card__description").textContent;
  const date = card.querySelector(".card__date").textContent;

  inputTitle.value = title;
  inputDescription.value = description;
  dateStorage = date;

  storageIndex = userData.findIndex(
    (elem) =>
      elem.title === title &&
      elem.description === description &&
      elem.date === date
  );

  openModal();
};

const editApply = (event) => {
  event.preventDefault();

  userData.splice(storageIndex, 1, {
    title: inputTitle.value,
    description: inputDescription.value,
    date: dateStorage,
  });

  closeModal();

  drawCards();
};

modal.addEventListener("click", (event) => {
  if (event.target.closest("#btnModalApply")) {
    editApply(event);
  } else if (
    !event.target.closest(".modal__wrapper") ||
    event.target.closest("#btnModalClose")
  ) {
    event.preventDefault();
    closeModal();
  }
});

// Делегирование событий
desk.addEventListener("mouseover" || "click", (event) => {
  let target = event.target;
  if (event.type === "click") {
    if (target.closest("#btnDelete")) {
      // delete func
      deleteCard(event);
    } else if (target.closest("#btnEdit")) {
      editCard(event);
    }
  } else {
    if (
      target.closest(".desk__title") ||
      target.closest(".desk__description")
    ) {
      if (
        target.closest(".card__title") ||
        target.closest(".card__description")
      ) {
        target.classList.toggle("shadow");
        shadowDelete = target;
      }
    } else if (shadowDelete) {
      shadowDelete.classList.remove("shadow");
    }
  }
});
