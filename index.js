const addCard = document.querySelector("#addCard");
const desk = document.querySelector("#desk");
const form = document.querySelector("#form");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const btnModalClose = document.querySelector("#btnModalClose");
const btnModalApply = document.querySelector("#btnModalApply");
const inputTitle = document.querySelector("#modal-title");
const inputDescription = document.querySelector("#modal-description");

const date = new Date();

let storageIndex = 0;
let userData = [];
// Меньше глобальных переменных!

// Функция отрисовки карточки
const drawCards = () => {
  desk.innerHTML = ""; // Каждый раз пишем заново, исходя из массива
  userData.forEach((item) => {
    desk.innerHTML += `<div class="desk__card">
    <div class="desk__info"> 
    <p>Title: <span class="card__title">${item.title}</span></p>
    <p>Description: <span class="card__description">${
      item.description
    }</span></p>
    <p>Date: <span class="card__date">${date.getDate()}${
      date.getMonth() - 1
    }.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</span></p>
    <div class="buttons__card">
    <button id="btnDelete" class="button button__card">Delete</button>
    <button id="btnEdit" class="button button__card">Edit</button>
    </div>
    </div></div>`;
  });
};

// Функция добавления карточки
addCard.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;

  userData.push({ title: title, description: description });

  console.log(userData);

  drawCards();

  form.reset();
});

// Функция удаления
const deleteCard = (event) => {
  // Нужно найти заголовок и описание
  const card = event.target.closest(".desk__card");
  // найти внутри другого элемента
  const title = card.querySelector(".card__title").textContent;
  const description = card.querySelector(".card__description").textContent;

  // Далее: forEach либо findIndex (2 способа)
  // Способ findIndex
  // Находим индекс чтобы использовать splice
  const index = userData.findIndex(
    // findIndex - принимает calback первый элемент массива и дальше сравниваем
    (elem) => elem.title === title && elem.description === description
  );
  userData.splice(index, 1); // удаляем 1 элемент

  drawCards(); // отрисовываем
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

  inputTitle.value = title;
  inputDescription.value = description;

  storageIndex = userData.findIndex(
    (elem) => elem.title === title && elem.description === description
  );

  openModal();
};

const editApply = (event) => {
  event.preventDefault();

  userData.splice(storageIndex, 1, {
    title: inputTitle.value,
    description: inputDescription.value,
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
desk.addEventListener("click", (event) => {
  if (event.target.closest("#btnDelete")) {
    // delete func
    deleteCard(event);
  } else {
    editCard(event);
  }
});
