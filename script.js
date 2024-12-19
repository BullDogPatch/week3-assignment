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
  console.log(response);
};

getUpgrades();
