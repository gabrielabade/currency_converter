const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

async function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;

  const currencyValueToConvert = document.querySelector(
    ".currency-value-to-convert"
  ); //valor em real
  const currencyValueConverted = document.querySelector(".currency-value"); //outras moedas

  const currencyValueInReal = parseFloat(
    inputCurrencyValue.replace(/[^\d,]/g, "").replace(",", ".")
  ); // converte string para float
  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currencyValueInReal);

  console.log(currencySelect.value);

  const usdbrlBid = await getUsdBrlBid();
  const dolarToday = usdbrlBid;

  const eurbrlBid = await getEurBrlBid();
  const euroToday = eurbrlBid;

  const gbpbrlBid = await getGbpBrlBid();
  const libraToday = gbpbrlBid;

  const btcbrlBid = await getBtcBrlBid();
  const bitcoinToday = btcbrlBid;

  if (currencySelect.value == "dolar") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(inputCurrencyValue / dolarToday);
  }
  if (currencySelect.value == "euro") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputCurrencyValue / euroToday);
  }

  if (currencySelect.value == "libra") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(inputCurrencyValue / libraToday);
  }

  if (currencySelect.value == "bitcoin") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BTC",
    }).format(inputCurrencyValue / bitcoinToday);
  }

  convertValues();
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".currency-img");

  if (currencySelect.value == "dolar") {
    currencyName.innerHTML = "Dólar americano";
    currencyImage.src = "./assets/dolar.png";
  }

  if (currencySelect.value == "euro") {
    currencyName.innerHTML = "Euro";
    currencyImage.src = "./assets/euro.png";
  }

  if (currencySelect.value == "libra") {
    currencyName.innerHTML = "Libra";
    currencyImage.src = "./assets/libra.png";
  }

  if (currencySelect.value == "bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImage.src = "./assets/bitcoin.png";
  }
}
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);


async function getUsdBrlBid() {
  const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
  const data = await response.json();
  return data['USDBRL']['bid'];
}

async function getEurBrlBid() {
  const response = await fetch('https://economia.awesomeapi.com.br/last/EUR-BRL');
  const data = await response.json();
  return data['EURBRL']['bid'];
}

async function getGbpBrlBid() {
  const response = await fetch('https://economia.awesomeapi.com.br/last/GBP-BRL');
  const data = await response.json();
  return data['GBPBRL']['bid'];
}

async function getBtcBrlBid() {
  const response = await fetch('https://economia.awesomeapi.com.br/last/BTC-BRL');
  const data = await response.json();
  return data['BTCBRL']['bid'];
}