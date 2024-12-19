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
  upgrades.forEach((upgrade, idx) => {
    console.log(idx, upgrade.name);
    const li = document.createElement('li');
    li.textContent = upgrade.name;
    console.log(li);
  });
};

renderUpgrades();
