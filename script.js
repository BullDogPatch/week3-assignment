const gameState = {
  cookieCount: 0,
  cookiesPerSecond: 0,
};

const upgradesShopContainer = document.querySelector('.upgrades-shop');
const actualCookieValue = document.querySelector('.actual-cookies');
const incrementCookies = document.querySelector('.cookie-incrementer');
const notEnoughCookiesMessage = document.querySelector('.not-enough-cookies');
const cps = document.querySelector('.cps');

incrementCookies.addEventListener('click', () => {
  gameState.cookieCount++;
  actualCookieValue.textContent = gameState.cookieCount;
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
    li.className = 'upgrade-item';
    const item = document.createElement('p');
    item.className = 'item';
    item.textContent = upgrade.name;
    li.appendChild(item);

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$C ${upgrade.cost}`;
    li.appendChild(price);

    const increasedBy = document.createElement('p');
    increasedBy.className = 'increase';
    increasedBy.textContent = `+${upgrade.increase}`;
    li.appendChild(increasedBy);

    const buyButton = document.createElement('button');
    buyButton.className = 'buy';
    buyButton.textContent = 'Buy';
    buyButton.addEventListener('click', () => buyUpgradesHandler(upgrade));
    li.appendChild(buyButton);
    ul.appendChild(li);
  });
  upgradesShopContainer.appendChild(ul);
};

renderUpgrades();

const buyUpgradesHandler = (value) => {
  console.log(value);
  if (gameState.cookieCount >= value.cost) {
    gameState.cookieCount -= value.cost;
    console.log(value.increase);
    gameState.co += Number(value.increase);
    actualCookieValue.textContent = gameState.cookieCount;
  } else {
    setTimeout(() => {
      notEnoughCookiesMessage.style.display = 'block';
    }, 100);

    setTimeout(() => {
      notEnoughCookiesMessage.style.display = 'none';
    }, 2000);
    console.log('You dont NOT have enough cookies');
  }
};

setInterval(() => {
  gameState.cookieCount++;
  gameState.cookieCount += gameState.cookiesPerSecond;
  actualCookieValue.textContent = gameState.cookieCount;
  cps.textContent = gameState.cookiesPerSecond;
}, 1000);
