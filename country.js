const countryDetailsContainer = document.getElementById("country-details");

// Функция для получения параметра из URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Функция для загрузки информации о стране
async function fetchCountryDetails() {
    try {
        const countryName = getQueryParam("name");
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const country = (await response.json())[0];
        displayCountryDetails(country);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Функция для отображения информации о стране
function displayCountryDetails(country) {
    countryDetailsContainer.innerHTML = `
        <h1 class="Countryname" >${country.name.common}</h1>
        <img src="${country.flags.svg}" alt="Flag" class="flag" >
        <div class="info">
        <p><strong>Capital:</strong> ${country.capital }</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
        <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name} (${Object.keys(country.currencies)[0]})</p>
        <a target="_blank" class="map" href="${country.maps.googleMaps}">Map ${country.name.common}</a>
        </div>
    `;
}

// Функция для кнопки "Назад"
function goBack() {
    window.history.back();
}

// Загружаем данные о стране
fetchCountryDetails();
