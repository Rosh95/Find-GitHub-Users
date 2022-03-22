const wrapper = document.querySelector('.wrapper');
const searchLine = document.querySelector('.search-line');
const searchInput = document.querySelector('.search-input');
const usersList = document.querySelector('.users');
const userItem = document.querySelector('.user-item');
const userDefenitionList = document.querySelector('.user-defenition-list');
const userDefItem = document.querySelector('.user-def-item');
const closeUserDef = document.querySelector('.x-img');

class Search {
  constructor(api) {
    this.api = api;
    searchInput.addEventListener('keyup', this.debounce(this.searchUsers.bind(this), 500));
  }
  closeUser() {
    userDefItem.innerHTML = '';
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }
  createUser(userData) {
    const userElement = this.createElement('li', 'user-item');
    userElement.innerHTML = `<div class = 'user-item-name'>${userData.login}</div>`;
    usersList.append(userElement);
    userElement.addEventListener('click', () => this.showUserDate(userData.login, userData.id));
  }
  showUserDate(login, id) {
    const userElement = this.createElement('ul', 'user-def-item');
    userElement.innerHTML = `<li class = 'user-property'>Name : ${login}</li>
                             <li class = 'user-property'>Id : ${id}</li>
                             <img class = "x-img" src="img/Vector 7.png"  alt = 'x'>
                             <img class = "x-img" src="img/Vector 8.png"  alt = 'x'> `;
    userDefenitionList.append(userElement);
    if (closeUserDef) {
      closeUserDef.addEventListener('click', () => this.closeUser());
    }
  }
  async searchUsers() {
    try {
      if (searchInput.value) {
        this.clearUsers();
        return await fetch(`https://api.github.com/search/users?q=${searchInput.value}&per_page=5&sort=created&order=asc`).then((res) => {
          if (res.ok) {
            res.json().then((res) => res.items.forEach((user) => this.createUser(user)));
          }
        });
      } else {
        this.clearUsers();
      }
    } catch (e) {
      console.log(e + 'Error');
    }
  }

  clearUsers() {
    usersList.innerHTML = '';
  }
  debounce = (fn, debounceTime) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), debounceTime);
    };
  };
}

new Search();
