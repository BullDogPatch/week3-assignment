const gameState = JSON.parse(localStorage.getItem('game-data')) || {
  cookieCount: 0,
  cookiesPerSecond: 1,
};

const putInLocalStorage = () => {
  localStorage.setItem('game-data', JSON.stringify(gameState));
};

const upgradesShopContainer = document.querySelector('.upgrades-shop');
const actualCookieValue = document.querySelector('.actual-cookies');
const incrementCookies = document.querySelector('.cookie-incrementer');
const notEnoughCookiesMessage = document.querySelector('.not-enough-cookies');
const cps = document.querySelector('.cps');
const resetButton = document.querySelector('.reset');
const chooseTheme = document.querySelector('.choose-theme');

const updateCookieValuesOnScreen = () => {
  actualCookieValue.textContent = gameState.cookieCount;
  cps.textContent = gameState.cookiesPerSecond;
};
updateCookieValuesOnScreen();

incrementCookies.addEventListener('click', () => {
  const audio = new Audio('click-sound/pop-1-35897.mp3');
  audio.play();
  gameState.cookieCount++;
  actualCookieValue.textContent = gameState.cookieCount;
  putInLocalStorage();
});

const getUpgrades = async () => {
  try {
    const response = await fetch(
      'https://cookie-upgrade-api.vercel.app/api/upgrades'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Joe's API is borked");
  }
};

const renderUpgrades = async () => {
  const upgrades = await getUpgrades();
  const ul = document.createElement('ul');
  ul.className = 'upgrades';

  upgrades.forEach((upgrade) => {
    const li = document.createElement('li');
    const item = document.createElement('p');
    item.textContent = upgrade.name;
    li.appendChild(item);

    const price = document.createElement('p');
    price.textContent = `$C ${upgrade.cost}`;
    li.appendChild(price);

    const increasedBy = document.createElement('p');
    increasedBy.className = 'increase';
    increasedBy.textContent = `+${upgrade.increase}`;
    li.appendChild(increasedBy);

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', () => buyUpgradesHandler(upgrade));
    li.appendChild(buyButton);
    ul.appendChild(li);
  });
  upgradesShopContainer.appendChild(ul);
};

renderUpgrades();

const buyUpgradesHandler = (value) => {
  if (gameState.cookieCount >= value.cost) {
    gameState.cookieCount -= value.cost;
    gameState.cookiesPerSecond += Number(value.increase);
    updateCookieValuesOnScreen();
    putInLocalStorage();
    const audio = new Audio('click-sound/ka-ching.mp3');
    audio.play();
  } else {
    setTimeout(() => {
      notEnoughCookiesMessage.style.display = 'block';
    }, 100);

    setTimeout(() => {
      notEnoughCookiesMessage.style.display = 'none';
    }, 1000);
  }
};

// let gameTimer = setInterval(() => {
//   gameState.cookieCount++;
//   gameState.cookieCount += gameState.cookiesPerSecond;
//   updateCookieValuesOnScreen();
//   putInLocalStorage();
// }, 1000);

let gameTimer = setInterval(() => {
  gameState.cookieCount += gameState.cookiesPerSecond;
  updateCookieValuesOnScreen();
  putInLocalStorage();
}, 1000);

resetButton.addEventListener('click', () => {
  const audio = new Audio('click-sound/epic.swf.mp3');
  audio.play();
  clearInterval(gameTimer);
  gameState.cookieCount = 0;
  gameState.cookiesPerSecond = 1;
  actualCookieValue.textContent = 0;
  cps.textContent = 0;
  localStorage.removeItem('game-data');
  putInLocalStorage();
  gameTimer = setInterval(() => {
    gameState.cookieCount += gameState.cookiesPerSecond;
    updateCookieValuesOnScreen();
    putInLocalStorage();
  }, 1000);
});

// TRYING TO GET DARK MODE IN STORAGE

const body = document.querySelector('body');
let darkMode = localStorage.getItem('dark-mode');

const enableLightMode = () => {
  body.classList.add('light');
  localStorage.setItem('dark-mode', 'enabled');
};

const disableLightMode = () => {
  body.classList.remove('light');
  localStorage.setItem('dark-mode', 'disabled');
};

if (darkMode === 'enabled') {
  enableLightMode(); // set state of darkMode on page load
}

chooseTheme.addEventListener('click', (e) => {
  darkMode = localStorage.getItem('dark-mode'); // update darkMode when clicked
  if (darkMode === 'disabled') {
    enableLightMode();
    chooseTheme.textContent = 'Dark Mode';
  } else {
    disableLightMode();
    chooseTheme.textContent = 'Light Mode';
  }
});

// LINKS for theme toggler (I had to fiddle around with the code to change it how I need it, isnt this what developers do)
// https://javascript.plainenglish.io/build-a-dark-mode-toggle-with-javascript-and-localstorage-8022b492fb9e
// https://codepen.io/coderjay06/pen/WNEPVBv

/*
 TODOS:
  - Try to add some visuals, like a +1 or how much the upgrades cost 
  - TRY FIGURE OUT HOW TO NOT KEEP PLAYING RICK ROLL OVER EACH OTHER IF RESET IS SPAMMED
*/
