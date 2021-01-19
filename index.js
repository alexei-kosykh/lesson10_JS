// массив перебираем foreach(item) => desk.innerHTML += div class = card и находим
// closest (id card)

// чтобы удалить нужно найти карточку и затем отрисовать доску заново

const addCard = document.querySelector("#addCard");
const desk = document.querySelector("#desk");
const form = document.querySelector("#form");

let userData = [];

const pushData = (title, desc) => {
  userData.push("Title: " + title.value);
  userData.push("Description: " + desc.value);
  console.log(userData);
};
//Создаём функционал для вывода информации из массива на доску. Каждый элемент массива должен добавляться на доску в виде блока с заголовком и описанием.  array.forEach((arr) => {});

const drawCard = () => {
  let date = new Date();
  let drawCard = {
    card: document.createElement("div"),
    cardInfo: document.createElement("div"),
    cardButton: document.createElement("div"),
    btnDelete: document.createElement("button"),
    btnEdit: document.createElement("button"),
    pTitle: document.createElement("p"),
    pDesc: document.createElement("p"),
    pDate: document.createElement("p"),
  };

  drawCard.card.className = "desk__card";
  drawCard.cardInfo.className = "desk__info";

  drawCard.cardButton.className = "buttons__card";
  drawCard.btnDelete.className = "button button__card";
  drawCard.btnDelete.id = "btnDelete";
  drawCard.btnDelete.innerText = "Delete";

  drawCard.btnEdit.className = "button button__card";
  drawCard.btnEdit.id = "btnEdit";
  drawCard.btnEdit.innerText = "Edit";

  userData.forEach((elem, index) => {
    desk.append(drawCard.card);
    drawCard.card.append(drawCard.cardInfo);
    if (index % 2) {
      drawCard.pDesc.innerHTML = elem;
      drawCard.pDate.append(
        "Data: " +
          date.getDate() +
          "-" +
          date.getMonth() +
          1 +
          "-" +
          date.getFullYear() +
          ", " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()
      );
    } else {
      drawCard.pTitle.innerHTML = elem;
    }
    console.log(userData);
    drawCard.cardInfo.append(drawCard.pTitle, drawCard.pDesc, drawCard.pDate);
    drawCard.cardInfo.append(drawCard.cardButton);
    drawCard.cardButton.append(drawCard.btnDelete, drawCard.btnEdit);
  });

  form.reset();
};

addCard.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  pushData(title, description);

  drawCard();
});

desk.addEventListener("click", (event) => {
  event.preventDefault();

  console.log(event.target);
  if (event.target.closest("#btnDelete")) {
    const buttonsCard = event.target.parentElement;
    const cardInfo = buttonsCard.parentElement;
    const card = cardInfo.parentElement;

    const pTitle = cardInfo.children[0].innerText;
    const pDesc = cardInfo.children[1].innerText;
    let count = 0;

    userData.forEach((elem, index) => {
      if (pTitle === elem && pDesc === userData[index + 1]) {
        userData.splice(count, 2);

        return;
      }
      count += 1;
    });

    desk.innerHTML = "";
    desk.appendChild;

    drawCard();
  } else {
    console.log("Edit btn");
  }
});
