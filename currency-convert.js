const axios = require('axios');


const getExchangeRate = (from, to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`).then((res) => {
        return res.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
        return res.data.map(country => country.name);
    });
};

const convertCurrency = (from, to, amount) => {
    let countries;

    return getCountries(to)
        .then((tempCountries) => {
            countries = tempCountries;

            return getExchangeRate(from, to);
        })
        .then((rate) => {
            const exchangedAmount = amount * rate;

            return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
        });
};

const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

// getExchangeRate('USD', 'EUR').then((rate) => {
//     console.log('Rate:', rate);
// });

// getCountries('CAD').then((countries) => {
//     console.log('Countries:', countries)
// });

// convertCurrency('USD', 'CAD', 100).then((status) => {
//     console.log(status);
// });

convertCurrencyAlt('USD', 'CAD', 100).then((status) => {
    console.log(status);
});