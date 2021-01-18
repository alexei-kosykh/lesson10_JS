// Пустой массив. При нажатии  кнопки push title и description. С помощью этого отрисовываем доску
// чтобы удалить узнать какое значение у title и description
// Всегда используется функция перерисовки
// У карточек один класс
// забрать title из карточки textContent забирает

// arr.push (title,descr) - здесь все карточки
// массив перебираем foreach(item) => desk.innerHTML += div class = card и находим
// closest (id card)

// чтобы удалить нужно найти карточку и затем отрисовать доску заново

const addCard = document.querySelector("#addCard");
const form = document.querySelector("#form");

let userData = [];

const pushData = (title, desc) => {
  userData.push({ title: title.value, description: desc.value });
};
//Создаём функционал для вывода информации из массива на доску. Каждый элемент массива должен добавляться на доску в виде блока с заголовком и описанием.  array.forEach((arr) => {});

const drawCard = () => {
  const desk = document.querySelector("#desk");
  let card = document.createElement("div");
  let cardInfo = document.createElement("div");
  let cardButton = document.createElement("div");
  let btnDelete = document.createElement("button");
  let btnEdit = document.createElement("button");
  let pTitle = document.createElement("p");
  let pDesc = document.createElement("p");
  let pDate = document.createElement("p");
  const choice = userData[userData.length - 1];

  card.className = "desk__card";
  cardInfo.className = "desk__info";

  cardButton.className = "buttons__card";
  btnDelete.className = "button button__card";
  btnDelete.id = "btnDelete";
  btnDelete.innerText = "Delete";

  btnEdit.className = "button button__card";
  btnEdit.id = "btnEdit";
  btnEdit.innerText = "Edit";

  var date = new Date(2014, 11, 31, 12, 30, 0);

  var options = {
    era: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  desk.append(card);
  card.append(cardInfo);
  pTitle.append("Title: ", choice.title);
  pDesc.append("Description: ", choice.description);
  pDate.append("Data: ", date.toLocaleString("ru", options));
  cardInfo.append(pTitle, pDesc, pDate);
  cardInfo.append(cardButton);
  cardButton.append(btnDelete, btnEdit);

  form.reset();
};

addCard.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  pushData(title, description);
  console.log(userData);

  drawCard(userData);
});
