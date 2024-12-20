const gameState = {
  cookieCount: 0,
  cookiesPerSecond: 0,
};

const upgradesShopContainer = document.querySelector('.upgrades-shop');
const actualCookieValue = document.querySelector('.actual-cookies');
const incrementCookies = document.querySelector('.cookie-incrementer');
const notEnoughCookies = document.querySelector('.not-enough-cookies');

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

  upgrades.forEach((upgrade, idx) => {
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
    buyButton.addEventListener('click', () => buyUpgradesHandler(upgrade.cost));
    li.appendChild(buyButton);
    ul.appendChild(li);
  });
  upgradesShopContainer.appendChild(ul);
};

renderUpgrades();

const buyUpgradesHandler = (value) => {
  console.log(value);
  if (gameState.cookieCount >= value) {
    gameState.cookieCount -= value;
  } else {
    console.log('You dont NOT have enough cookies');
  }
};

setInterval(() => {
  gameState.cookieCount++;
  actualCookieValue.textContent = gameState.cookieCount;
}, 1000);
