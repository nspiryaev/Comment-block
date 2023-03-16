const elForm = document.querySelector('.form');

elForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let userName = elForm.querySelector('#name'),
    commentText = elForm.querySelector('#textarea'),
    commentDate = elForm.querySelector('#date');

  if (!formValidation(userName, commentText)) return;

  addComment(userName, commentText, commentDate);
  likeComment();
  removeComment();

  userName.value = '';
  commentDate.value = '';
  commentText.value = '';
});

function addComment(userName, commentText, commentDate) {
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
  divDate.textContent = getDate(commentDate);
  divContent.append(divDate);

  const pComment = document.createElement('p');
  pComment.classList.add('wrapper__comment');
  pComment.textContent = commentText.value;
  divWrapper.append(pComment);

  const divIcons = document.createElement('div');
  divIcons.classList.add('wrapper__icons', 'icons');
  divIcons.innerHTML = ` <ul class="icons__list">
        <li class="icons__item">
          <svg width="32" height="32" viewBox="0 0 32 32" class="icons__heart" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 28.72C15.6045 28.721 15.2127 28.6437 14.8471 28.4927C14.4816 28.3417 14.1495 28.1198 13.87 27.84L3.57 17.54C2.75634 16.7175 2.11449 15.7413 1.68185 14.6683C1.2492 13.5952 1.03442 12.4469 1.05 11.29C1.05784 10.2298 1.27476 9.18164 1.68833 8.20544C2.10191 7.22925 2.70401 6.34423 3.46015 5.6011C4.21629 4.85796 5.11161 4.2713 6.09484 3.87473C7.07806 3.47815 8.12986 3.27945 9.19 3.29C10.2691 3.27913 11.3394 3.48507 12.3374 3.89562C13.3355 4.30617 14.2409 4.91296 15 5.68L16 6.68L16.82 5.86C18.2359 4.40657 20.1306 3.51551 22.1531 3.35187C24.1756 3.18823 26.1888 3.7631 27.82 4.97C28.7485 5.68505 29.514 6.58972 30.0656 7.62376C30.6171 8.6578 30.942 9.79748 31.0187 10.9669C31.0953 12.1363 30.9219 13.3087 30.51 14.4059C30.0982 15.503 29.4573 16.4999 28.63 17.33L18.13 27.84C17.8505 28.1198 17.5184 28.3417 17.1529 28.4927C16.7873 28.6437 16.3955 28.721 16 28.72ZM9.15 5.28C7.56052 5.27838 6.03276 5.89522 4.89 7C4.3074 7.56054 3.84409 8.23305 3.5279 8.97713C3.21171 9.72121 3.04915 10.5215 3.05 11.33C3.04124 12.2193 3.20909 13.1015 3.54382 13.9255C3.87855 14.7494 4.37351 15.4988 5 16.13L15.3 26.43C15.393 26.5237 15.5036 26.5981 15.6254 26.6489C15.7473 26.6997 15.878 26.7258 16.01 26.7258C16.142 26.7258 16.2727 26.6997 16.3946 26.6489C16.5164 26.5981 16.627 26.5237 16.72 26.43L27.23 15.91C27.8469 15.28 28.3236 14.5267 28.6286 13.6994C28.9337 12.8721 29.0602 11.9897 29 11.11C28.9466 10.2213 28.7018 9.35466 28.2824 8.56935C27.863 7.78404 27.2789 7.09862 26.57 6.56C25.3261 5.64289 23.7913 5.20925 22.2514 5.33988C20.7115 5.4705 19.2716 6.15648 18.2 7.27L16.71 8.8C16.617 8.89373 16.5064 8.96812 16.3846 9.01889C16.2627 9.06966 16.132 9.0958 16 9.0958C15.868 9.0958 15.7373 9.06966 15.6154 9.01889C15.4936 8.96812 15.383 8.89373 15.29 8.8L13.59 7.1C12.4191 5.93927 10.8387 5.28557 9.19 5.28H9.15Z"
              fill="white" />
          </svg>
          <span class="icons__sticker sticker">0</span>
        </li>
        <li class="icons__item">
          <img src="./img/icons/trash-bin.svg" alt="Иконка корзины" class="icons__trash-bin">
        </li>
    </ul>`;
  divWrapper.append(divIcons);
}

function removeComment() {
  const elComments = document.querySelectorAll('.comments__item'),
    elTrashBins = document.querySelectorAll('.icons__trash-bin');

  for (let i = 0; i < elTrashBins.length; i++) {
    elTrashBins[i].onclick = function () {
      elComments[i].remove();
    }
  }
}

function likeComment() {
  const elLikeHearts = document.querySelectorAll('.icons__heart'),
    elLikeCounts = document.querySelectorAll('.sticker');

  elLikeHearts.forEach((heart, index) => {
    heart.onclick = function () {
      this.classList.toggle("is-active");
      const current = +elLikeCounts[index].innerHTML;
      const inc = heart.classList.contains("is-active") ? 1 : -1;
      elLikeCounts[index].innerHTML = current + inc;
      this.classList.contains("is-active") ? elLikeCounts[index].style.display = "flex" : elLikeCounts[index].style.display = "none";
    }
  });
}

function formValidation(userName, commentText) {
  let result = true;
  const allInputs = [userName, commentText];

  for (let input of allInputs) {
    removeError(input);

    if (input.dataset.minLength) {
      if (input.value.length < input.dataset.minLength) {
        removeError(input);
        createError(input, `Минимальное количество символов: ${input.dataset.minLength}`);
        result = false;
      }
    }

    if (input.dataset.maxLength) {
      if (input.value.length > input.dataset.maxLength) {
        removeError(input);
        createError(input, `Максимальное количество символов: ${input.dataset.maxLength}`);
        result = false;
      }
    }

    if (input.dataset.required === "true") {
      if (input.value === "") {
        removeError(input);
        createError(input, 'Поле не заполнено!');
        result = false;
      }
    }

    input.oninput = () => {
      if (input.value !== "") {
        removeError(input);
      }
    }
  }

  return result;
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

function getDate(commentDate) {
  let customDate = new Date(commentDate.value);
  const yesterday = new Date(Date.now() - 86400000),
    currentDate = new Date(),
    currentHour = currentDate.getHours(),
    currentMinute = currentDate.getMinutes(),
    currentSecond = currentDate.getSeconds(),
    userYears = customDate.getFullYear(),
    userMonth = customDate.getMonth(),
    userDate = customDate.getDate();

  commentDate.value ? customDate = new Date(userYears, userMonth, userDate, currentHour, currentMinute, currentSecond) : customDate = currentDate;

  if (Date.parse(customDate) === Date.parse(yesterday)) {
    return `Вчера | ${addLeadingZero(customDate.getHours())}:${addLeadingZero(customDate.getMinutes())}`;
  } else if (Date.parse(customDate) === Date.parse(currentDate)) {
    return `Сегодня | ${addLeadingZero(customDate.getHours())}:${addLeadingZero(customDate.getMinutes())}`;
  } else {
    return `${addLeadingZero(customDate.getDate())}.${addLeadingZero(customDate.getMonth() + 1)}.${customDate.getFullYear()} | ${addLeadingZero(customDate.getHours())}:${addLeadingZero(customDate.getMinutes())}`;
  }
}

function addLeadingZero(num) {
  return (num < 10) ? '0' + num : '' + num;
}


function submitOnEnter(event) {
  if (event.keyCode === 13) {
    if (!event.repeat) {
      const newEvent = new Event("submit", { cancelable: true });
      event.target.form.dispatchEvent(newEvent);
    }

    event.preventDefault();
  }
}

document.querySelector('#textarea').addEventListener('keypress', submitOnEnter);




