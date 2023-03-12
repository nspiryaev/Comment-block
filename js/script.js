const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  let userName = form.querySelector('#name'),
    commentText = form.querySelector('#textarea'),
    commentDate = form.querySelector('#date');

  if (formValidation(this, userName, commentText) === true) {

    createComment(userName, commentText, commentDate);
    likeComment();
    deleteComment();

    userName.value = '';
    commentDate.value = '';
    commentText.value = '';

  }
});


function createComment(userName, commentText, commentDate) {
  const ul = document.querySelector('.comments__list');

  const li = document.createElement('li');
  li.classList.add('comments__item');
  ul.append(li);

  const divWrapper = document.createElement('div');
  divWrapper.classList.add('wrapper', 'comments__weapper');
  li.append(divWrapper);

  const divHeader = document.createElement('div');
  divHeader.classList.add('wrapper__header', 'header-comment');
  divWrapper.append(divHeader);

  const divContent = document.createElement('div');
  divContent.classList.add('header-comment__content');
  divHeader.append(divContent);

  const userImage = document.createElement('img');
  userImage.classList.add('header__img');
  userImage.src = './img/user.png';
  divHeader.append(userImage);

  const divUser = document.createElement('div');
  divUser.classList.add('header-comment__user');
  divUser.textContent = userName.value;
  divContent.append(divUser);

  const divDate = document.createElement('div');
  divDate.classList.add('header-comment__date', 'date');
  divContent.append(divDate);

  // Здесь должно быть создание span с датами

  const pComment = document.createElement('p');
  pComment.classList.add('wrapper__comment');
  pComment.textContent = commentText.value;
  divWrapper.append(pComment);

  const divIcons = document.createElement('div');
  divIcons.classList.add('wrapper__icons', 'icons');
  divIcons.innerHTML = ` <ul class="icons__list">
        <li class="icons__item">
        <img src="./img/icons/heart.svg" alt="Иконка сердца" class="icons__heart">
        </li>
        <li class="icons__item">
        <img src="./img/icons/trash-bin.svg" alt="Иконка корзины" class="icons__trash-bin">
        </li>
    </ul>`;
  divWrapper.append(divIcons);
}

function deleteComment() {
  let comments = document.querySelectorAll('.comments__item'),
    trashBins = document.querySelectorAll('.icons__trash-bin');

  for (let i = 0; i < trashBins.length; i++) {
    trashBins[i].onclick = function () {
      comments[i].remove();
    }
  }
}

function likeComment() {
  let hearts = document.querySelectorAll('.icons__heart');

  hearts.forEach((item) => {
    item.onclick = function () {
      if (this.src.indexOf('heart.svg') === -1) {
        this.src = './img/icons/heart.svg';
      } else {
        this.src = './img/icons/heart-like.svg';
      }
    }
  });
}

function formValidation(form, userName, commentText) {
  let result = true;
  const allInputs = [userName, commentText];

  for (let input of allInputs) {
    removeError(input);

    if (input.dataset.required === "true") {
      if (input.value === "") {
        createError(input, 'Поле не заполнено!');
        result = false;
      }
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement('label');

    errorLabel.classList.add('error-label');
    errorLabel.textContent = text;

    parent.classList.add('error');
    parent.append(errorLabel);

  }

  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains('error')) {
      parent.querySelector('.error-label').remove()
      parent.classList.remove('error')
    }
  }

  return result;
}
