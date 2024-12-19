const gameState = {
  cookieCount: 0,
  cookiesPerSecond: 0,
};

const upgradesShopContainer = document.querySelector('.upgrades-shop');
console.log(upgradesShopContainer);

const getUpgrades = async () => {
  const response = await fetch(
    'https://cookie-upgrade-api.vercel.app/api/upgrades'
  );
  const data = await response.json();
  console.log(data);
  return data;
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
    price.textContent = upgrade.cost;
    li.appendChild(price);

    const increasedBy = document.createElement('p');
    increasedBy.className = 'increase';
    increasedBy.textContent = upgrade.increase;
    li.appendChild(increasedBy);

    const buyButton = document.createElement('button');
    buyButton.className = 'buy';
    buyButton.textContent = 'Buy';
    li.appendChild(buyButton);
    console.log(li);
  });
};

renderUpgrades();
