const amountInput = document.querySelector("#amount");
const fromCurrency = document.querySelector("#fromCurrency");
const swap = document.querySelector("#swap");
const toCurrency = document.querySelector("#toCurrency");
const result = document.querySelector("#result");
const conveert = document.querySelector("#conveert");

// latest / INR;
const apiKey = "215541e9b1357decc7dfb201";
const currencyAPI = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

async function loadCurrencies() {
  try {
    const res = await fetch(currencyAPI + "USD");
    const data = await res.json();
    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach((currency) => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = currency;
      option1.text = option2.text = currency;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
    // const currenciesdat = Object.entries(data.conversion_rates);

    // console.log(currenciesdat);
  } catch (error) {
    console.error("Error loading currencies:", error);
  }
}
// loadCurrencies();
async function convertCurrency() {
  const amount = parseInt(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const res = await fetch(currencyAPI + fromCurrency.value);
    const data = await res.json();
    const rate = data.conversion_rates[toCurrency.value];
    const convertedAmount = (amount * rate).toFixed(2);
    result.innerHTML = `${amount} ${fromCurrency.value}=${convertedAmount} ${toCurrency.value}`;
    // console.log(convertedAmount);
  } catch (error) {
    console.log(error);
  }
}

swap.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
});

conveert.addEventListener("click", convertCurrency);

document.addEventListener("DOMContentLoaded", loadCurrencies);