const fromAmountElement = document.querySelector(".amount");
const convertedAmountElement = document.querySelector(".convertedAmount");
const fromCurrencyElement = document.querySelector(".fromCurrency");
const toCurrencyElement = document.querySelector(".toCurrency");
const resultElement = document.querySelector(".result");

// Array to populate the select tags with these countries 
const countries = [
    {code: "USD", name: "United States Dollar"},
    {code: "AED", name: "United Arab Emirates Dirham"},
    {code: "INR", name: "Indian Rupee"},
    {code: "ARS", name: "Argentine Peso"},
    {code: "AUD", name: "Australian Dollar"},
    {code: "BRL", name: "Brazilian Real"},
    {code: "CAD", name: "Canadian Dollar"},
    {code: "CHF", name: "Swiss Franc"},
    {code: "CLP", name: "Chilean Peso"},
    {code: "CNY", name: "Chinese Yuan"},
    {code: "COP", name: "Colombian Peso"},
    {code: "CZK", name: "Czech Koruna"},
    {code: "DKK", name: "Danish Krone"},
    {code: "EGP", name: "Egyptian Pound"},
    {code: "EUR", name: "Euro"},
    {code: "GBP", name: "British Pound Sterling"},
    {code: "HKD", name: "Hong Kong Dollar"},
    {code: "KRW", name: "South Korean Won"},
    {code: "MXN", name: "Mexican Peso"},
    {code: "MYR", name: "Malaysian Ringgit"},
    {code: "NOK", name: "Norwegian Krone"},
    {code: "NZD", name: "New Zealand Dollar"},
    {code: "PEN", name: "Peruvian Sol"},
    {code: "PHP", name: "Philippine Peso"},
    {code: "PLN", name: "Polish Zloty"},
    {code: "RON", name: "Romanian Leu"},
    {code: "RUB", name: "Russian Ruble"},
    {code: "SEK", name: "Swedish Krona"},
    {code: "SGD", name: "Singapore Dollar"},
    {code: "THB", name: "Thai Baht"},
    {code: "TRY", name: "Turkish Lira"},
    {code: "TWD", name: "Taiwan New Dollar"},
    {code: "UAH", name: "Ukrainian Hryvnia"},
    {code: "UYU", name: "Uruguayan Peso"},
    {code: "VND", name: "Vietnamese Dong"},
    {code: "ZAR", name: "South African Rand"},
];

// Populate select tags with countries
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;
    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);
});

// Set default values for select tags
fromCurrencyElement.value = "USD";
toCurrencyElement.value = "INR";

// Function to get exchange rate using API
const getExchangeRate = async () => {
    try {
        const amount = parseFloat(fromAmountElement.value);
        const fromCurrency = fromCurrencyElement.value;
        const toCurrency = toCurrencyElement.value;
        resultElement.textContent = "Fetching Exchange Rate...";

        // Fetch data from API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const conversionRate = data.rates[toCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        if(typeof conversionRate==='Undefined'){
            resultElement.textcontent="Exchange Rate dat is not availabe for seleted countries";
            convertedAmountElememt="";
        }
        else{
        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = ''; // Clear the status message
        }
        
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        resultElement.textContent = 'Error fetching exchange rate. Please try again later.';
    }
}

// Fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener('input', getExchangeRate);

// Fetching exchange rate when user changes currency
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);

// Fetch initial exchange rate on page load
window.addEventListener('load', getExchangeRate);
