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

let userData = [];

const pushData = (title, desc) => {
  userData.push({ title: title.value, description: desc.value });
};
//Создаём функционал для вывода информации из массива на доску. Каждый элемент массива должен добавляться на доску в виде блока с заголовком и описанием.

// const drawCard = (array) => {

// }

addCard.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  pushData(title, description);
  console.log(userData);

  drawCard(userData);
});
